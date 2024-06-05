import { MoveResource, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { mirageAddress, MoveToken, Perpetual, PRECISION_8, ZERO } from '../../constants'
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

    const position = positionObjectResources.find((resource) => resource.type === positionType)
    if (position == undefined) throw new Error('position object not found')
    const tokenIdentifiers = positionObjectResources.find((resource) => resource.type === tokenIdsType)
    if (tokenIdentifiers == undefined) throw new Error('tokenIdentifiers object not found')
    this.id = !!tokenIdentifiers ? BigNumber((tokenIdentifiers.data as any).index.value) : ZERO

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
    return (
      ((position.positionSize.toNumber() * perpetualPrice -
        position.positionSize.toNumber() * position.openingPrice.toNumber()) /
        marginPrice) *
      (position.side == PositionSide.LONG ? 1 : -1)
    )
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
