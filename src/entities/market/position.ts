import { Deserializer, MoveResource, Network } from '@aptos-labs/ts-sdk'
import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import {
  FEE_PRECISION,
  mirageAddress,
  MoveToken,
  PERCENT_PRECISION,
  Perpetual,
  PRECISION_8,
  ZERO,
} from '../../constants'
import { getLiquidationPrice, getPositionMaintenanceMarginMusd } from '../../views'
import { LimitOrder, LimitOrderData } from './limitOrder'
import { Market } from './market'

/**
 * Direction of a position
 */
export enum PositionSide {
  LONG = 0,
  SHORT = 1,
  UNKNOWN = 2,
}

export const stringToPositionSide = (str: string): PositionSide => {
  str = str.toLowerCase()
  if (str == 'l' || str == 'long') return PositionSide.LONG
  else if (str == 's' || str == 'short') return PositionSide.SHORT
  return PositionSide.UNKNOWN
}

const getPropertyMapU64 = (key: string, data): BigNumber => {
  const property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == key
  })
  const de = new Deserializer(new HexString(property.value.value).toUint8Array())
  return BigNumber(de.deserializeU64().toString())
}

const getPropertyMapSigned64 = (key: string, data): BigNumber => {
  const magnitude_property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == `${key}_magnitude`
  })
  const negative_property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == `${key}_negative`
  })
  let de = new Deserializer(new HexString(magnitude_property.value.value).toUint8Array())
  const magnitude = BigNumber(de.deserializeU64().toString())

  de = new Deserializer(new HexString(negative_property.value.value).toUint8Array())
  const negative = de.deserializeBool()

  return magnitude.times(negative ? -1 : 1)
}

/**
 * Data for a user's position
 */
export type PositionData = {
  openingPrice: BigNumber
  side: PositionSide
  margin: BigNumber
  positionSize: BigNumber
  fundingAccrued: BigNumber
  maintenanceMargin: BigNumber
  liquidationPrice: BigNumber
  tpslExists: boolean
  takeProfitPrice: BigNumber
  stopLossPrice: BigNumber
  triggerPayment: BigNumber
}

/**
 * Represents a position on a specific Mirage Market
 */
export class Position {
  /**
   * The token id of the position
   */
  id: BigNumber
  /**
   * The margin asset of the position
   */
  public readonly marginToken: MoveToken
  /**
   * The perpetual asset being traded
   */
  public readonly perpetualAsset: Perpetual
  /**
   * The user's current position if one is open
   */
  public readonly position: PositionData | undefined
  /**
   * The market for this position
   */
  public readonly market: Market
  /**
   * The positions limit orders
   */
  public readonly limitOrders: LimitOrder[]

  /**
   * The fees paid by this position in margin token
   */
  public readonly fees_paid: BigNumber
  /**
   * The funding paid by this position in margin token
   */
  public readonly funding_paid: BigNumber
  /**
   * The realized pnl of this position in margin token
   */
  public readonly realized_pnl: BigNumber
  /**
   * The positions initial leverage
   */
  public readonly leverage: BigNumber

  public readonly objectAddress: string

  /**
   * The current network being used
   */
  public readonly network: Network
  // /**
  //  * The max position size for this Market and account
  //  */
  // public readonly positionLimit: BigNumber

  /**
   * Construct an instance of a trader
   * @param positionObjectResources Resources from position object account
   * @param marketObjectResources Resources from market object account
   * @param marginCoin The margin of the market
   * @param perpetualAsset The perpetual being traded
   * @param objectAddress the address of the vault collection object
   */
  constructor(
    // userAddress: string,
    positionObjectResources: MoveResource[],
    market: Market,
    marginCoin: MoveToken | string,
    perpetualAsset: Perpetual | string,
    objectAddress: string,
  ) {
    // this.userAddress = userAddress
    this.marginToken = marginCoin as MoveToken
    this.perpetualAsset = perpetualAsset as Perpetual
    this.market = market
    this.objectAddress = objectAddress
    this.network = market.network

    const positionType = `${mirageAddress()}::market::Position`
    const tokenIdsType = '0x4::token::TokenIdentifiers'
    const propertyMapType = `0x4::property_map::PropertyMap`

    const position = positionObjectResources.find((resource) => resource.type === positionType)
    if (position == undefined) throw new Error('Position object not found')
    const tokenIdentifiers = positionObjectResources.find((resource) => resource.type === tokenIdsType)
    if (tokenIdentifiers == undefined) throw new Error('TokenIdentifiers object not found')
    this.id = !!tokenIdentifiers ? BigNumber((tokenIdentifiers.data as any).index.value) : ZERO
    const propertyMap = positionObjectResources.find((resource) => resource.type === propertyMapType)
    if (propertyMap == undefined) throw new Error('PropertyMap object not found')

    this.fees_paid = !!propertyMap ? getPropertyMapU64('fees_paid', propertyMap.data as any).div(PRECISION_8) : ZERO
    this.funding_paid = !!propertyMap
      ? getPropertyMapSigned64('funding_paid', propertyMap.data as any).div(PRECISION_8)
      : ZERO
    this.realized_pnl = !!propertyMap
      ? getPropertyMapSigned64('realized_pnl', propertyMap.data as any).div(PRECISION_8)
      : ZERO
    this.leverage = !!propertyMap ? getPropertyMapU64('leverage', propertyMap.data as any).div(PERCENT_PRECISION) : ZERO

    const openingPrice = !!position ? BigNumber((position.data as any).opening_price).div(PRECISION_8) : ZERO
    const side = !!position
      ? Boolean((position.data as any).is_long)
        ? PositionSide.LONG
        : PositionSide.SHORT
      : PositionSide.UNKNOWN

    const margin = !!position ? BigNumber((position.data as any).margin_amount).div(PRECISION_8) : ZERO
    const positionSize = !!position ? BigNumber((position.data as any).position_size).div(PRECISION_8) : ZERO

    // funding accrued is (market_funding_accumulated - last_funding_accumulated) * position_size
    const marketFundingAccumulated = !!position
      ? side == PositionSide.LONG
        ? market.longFundingAccumulated
        : market.shortFundingAccumulated
      : ZERO
    const lastPositionFunding = !!position
      ? BigNumber((position.data as any).last_funding_accumulated.magnitude)
          .times((position.data as any).last_funding_accumulated.negative ? -1 : 1)
          .div(FEE_PRECISION)
          .div(PRECISION_8)
      : ZERO
    const fundingAccrued = !!position ? marketFundingAccumulated.minus(lastPositionFunding).times(positionSize) : ZERO

    const tpslType = `${mirageAddress()}::market::TpSl`
    const tpsl = positionObjectResources.find((resource) => resource.type === tpslType)
    const tpslExists = !!tpsl
    const takeProfitPrice = tpslExists ? BigNumber((tpsl as any).data.take_profit_price).div(PRECISION_8) : ZERO
    const stopLossPrice = tpslExists ? BigNumber((tpsl as any).data.stop_loss_price).div(PRECISION_8) : ZERO
    const triggerPayment = tpslExists ? BigNumber((tpsl as any).data.trigger_payment_amount).div(PRECISION_8) : ZERO

    this.position = !!position
      ? {
          openingPrice,
          side,
          margin,
          fundingAccrued,
          maintenanceMargin: margin.div(2), // TODO: compute
          positionSize,
          liquidationPrice: BigNumber(69420),
          tpslExists,
          takeProfitPrice,
          stopLossPrice,
          triggerPayment,
        }
      : undefined

    const limitOrderType = `${mirageAddress()}::market::LimitOrders`

    const limitOrders = positionObjectResources.find((resource) => resource.type === limitOrderType)

    const ordersArr = !!limitOrders ? (limitOrders.data as any).orders : []
    const tempOrders: LimitOrder[] = []

    try {
      for (let index = 0; index < ordersArr.length; index++) {
        tempOrders.push(
          new LimitOrder(
            ordersArr[index] as LimitOrderData,
            index,
            this.marginToken,
            this.perpetualAsset,
            side,
            this.objectAddress,
          ),
        )
      }
    } catch (error) {
      console.error(`Error deserializing limit order ${error}`)
    }

    this.limitOrders = tempOrders
    console.log('done', this)
  }

  /**
   * Returns bool on if the position is open
   * @returns If the position is open
   */
  public isOpen(): boolean {
    // Inactive trades have an id of u64 max
    return this.position ? this.position.positionSize && !this.position.positionSize.eq(0) : false
  }

  /**
   * Calculates the leverage of a position given the prices
   * @param position The position
   * @param perpetualPrice The perpetual price
   * @param marginPrice The margin price
   * @returns The leverage, where 1 == 1x leverage
   */
  static getLeverage(position: PositionData, perpetualPrice: number, marginPrice: number): number {
    return (position.positionSize.div(position.margin).toNumber() * perpetualPrice) / marginPrice
  }

  /**
   * Estimates a positions pnl in terms of the margin type
   * @param position The position
   * @param perpetualPrice The perpetual price
   * @param marginPrice The margin price
   * @returns The amount of pnl in terms of the margin of the market
   */
  static estimatePnl(position: PositionData, perpetualPrice: number, marginPrice: number): number {
    return BigNumber(perpetualPrice)
      .minus(position.openingPrice)
      .times(position.positionSize)
      .div(marginPrice)
      .minus(position.fundingAccrued)
      .times(position.side == PositionSide.LONG ? 1 : -1)
      .toNumber()
  }

  /**
   * Estimates a positions percent pnl in terms of the margin
   * @param position The position
   * @param perpetualPrice The perpetual price
   * @param marginPrice The margin price
   * @returns The percent pnl in terms of the margin of the market
   */
  static estimatePercentPnl(position: PositionData, perpetualPrice: number, marginPrice: number): number {
    return (Position.estimatePnl(position, perpetualPrice, marginPrice) * 100) / position.margin.toNumber()
  }

  public async getLiqPrice(perpetualPrice: number, marginPrice: number): Promise<number> {
    return await getLiquidationPrice(this.objectAddress, perpetualPrice, marginPrice, this.network)
  }

  public async getMaintenanceMargin(perpetualPrice: number, marginPrice: number): Promise<number> {
    return await getPositionMaintenanceMarginMusd(this.objectAddress, perpetualPrice, marginPrice, this.network)
  }
}
