import { InputViewRequestData } from '@aptos-labs/ts-sdk'
import { Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { AccountResource, aptosClient, mirageAddress, MoveToken, Perpetual, PRECISION_8, ZERO } from '../../constants'
import { getPositionTypeArgument } from '../../transactions'
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
  id: BigNumber
  openingPrice: BigNumber
  side: PositionSide
  margin: BigNumber
  positionSize: BigNumber
  maintenanceMargin: BigNumber
  liquidationPrice: BigNumber
  takeProfitPrice: BigNumber
  stopLossPrice: BigNumber
  triggerPayment: BigNumber
}

/**
 * Represents a position on a specific Mirage Market
 */
export class Position {
  /**
   * The user address of the owner of this position
   */
  // private readonly userAddress: string
  /**
   * The current network being used
   */
  // private readonly network: Network
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
   * An instance of the Market this Trader is using
   */
  public readonly market: Market
  /**
   * A users limit orders
   */
  public readonly limitOrders: LimitOrder[]

  public readonly objectAddress: string

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
   */
  constructor(
    // userAddress: string,
    positionObjectResources: AccountResource[],
    market: Market,
    marginCoin: MoveToken | string,
    perpetualAsset: Perpetual | string,
    objectAddress: string
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
    const tokenIdentifiers = positionObjectResources.find((resource) => resource.type === tokenIdsType)

    const tempTrade: PositionData = {
      id: ZERO,
      openingPrice: ZERO,
      side: PositionSide.UNKNOWN,
      margin: ZERO,
      positionSize: ZERO,
      maintenanceMargin: ZERO,
      liquidationPrice: ZERO,
      takeProfitPrice: ZERO,
      stopLossPrice: ZERO,
      triggerPayment: ZERO,
    }

    tempTrade.id = !!tokenIdentifiers ? BigNumber((tokenIdentifiers.data as any).index.value) : ZERO
    tempTrade.openingPrice = !!position
      ? BigNumber((position.data as any).position.opening_price).div(PRECISION_8)
      : ZERO
    tempTrade.side = !!position
      ? Boolean((position.data as any).position.is_long)
        ? PositionSide.LONG
        : PositionSide.SHORT
      : PositionSide.UNKNOWN
    tempTrade.margin = !!position ? BigNumber((position.data as any).margin_amount) : ZERO
    tempTrade.positionSize = !!position ? BigNumber((position.data as any).position_size).div(PRECISION_8) : ZERO

    // TODO
    tempTrade.maintenanceMargin = !!position
      ? BigNumber((position.data as any).position.maintenance_margin).div(PRECISION_8)
      : ZERO

    const tpslType = `${mirageAddress()}::market::TpSl`
    const tpsl = positionObjectResources.find((resource) => resource.type === tpslType)
    tempTrade.takeProfitPrice = !!position ? BigNumber((tpsl as any).take_profit_price).div(PRECISION_8) : ZERO
    tempTrade.stopLossPrice = !!position ? BigNumber((tpsl as any).stop_loss_price).div(PRECISION_8) : ZERO
    tempTrade.triggerPayment = !!position ? BigNumber((tpsl as any).trigger_payment_amount).div(PRECISION_8) : ZERO

    this.position = !tempTrade.positionSize.eq(0) ? tempTrade : undefined

    // TODO unused in frontend - needed?
    // this.positionLimit = !!position ? BigNumber((position.data as any).position_limit) : ZERO

    const limitOrderType = `${mirageAddress()}::market::LimitOrders`

    const limitOrders = positionObjectResources.find((resource) => resource.type === limitOrderType)

    const ordersArr = !!limitOrders ? (limitOrders.data as any).orders : []
    const tempOrders: LimitOrder[] = []

    try {
      for (let index = 0; index < ordersArr.length; ++index) {
        tempOrders.push(
          new LimitOrder(ordersArr[index] as LimitOrderData, index, this.marginToken, this.perpetualAsset)
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

  public async getLiqPrice(): Promise<number> {
    return await getLiqPrice(this.objectAddress, this.network)
  }
}

export const getLiqPrice = async (positionObjectAddress: string, network: Network): Promise<number> => {
  const payload: InputViewRequestData = {
    function: `${mirageAddress()}::market::get_liquidation_price`,
    typeArguments: getPositionTypeArgument() as `${string}::${string}::${string}`[],
    functionArguments: [positionObjectAddress],
  }
  const ret = await aptosClient(network).view({ payload })
  return ret[0] as number
}
