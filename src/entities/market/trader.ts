import BigNumber from 'bignumber.js'

import {
  AccountResource,
  aptosClient,
  assetInfo,
  coinInfo,
  getNetwork,
  mirageAddress,
  MoveCoin,
  Network,
  Perpetual,
  PRECISION_8,
  ZERO,
} from '../../constants'
import { getMarketTypeArguments } from '../../transactions'
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

/**
 * Data for a user's position
 */
export type Position = {
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
 * Represents a trader on a specific Mirage Market
 */
export class Trader {
  /**
   * The user address of this trader
   */
  private readonly userAddress: string
  /**
   * The current network being used
   */
  private readonly network: Network
  /**
   * The margin asset of the position
   */
  public readonly marginCoin: MoveCoin
  /**
   * The perpetual asset being traded
   */
  public readonly perpetualAsset: Perpetual
  /**
   * The user's current position if one is open
   */
  public readonly position: Position | undefined
  /**
   * An instance of the Market this Trader is using
   */
  public readonly market: Market
  /**
   * A users limit orders
   */
  public readonly limitOrders: LimitOrder[]
  /**
   * The max position size for this Market and account
   */
  public readonly positionLimit: BigNumber
  /**
   * Is the trader registered
   */
  public readonly isRegistered: boolean

  /**
   * Construct an instance of a trader
   * @param userResource Resources for user account
   * @param moduleResources Resources for Market account
   * @param marginCoin The margin of the market
   * @param perpetualAsset The perpetual being traded
   */
  constructor(
    userAddress: string,
    userResource: AccountResource[],
    moduleResources: AccountResource[],
    marginCoin: MoveCoin | string,
    perpetualAsset: Perpetual | string,
    network: Network | string = Network.MAINNET
  ) {
    this.userAddress = userAddress
    this.marginCoin = marginCoin as MoveCoin
    this.perpetualAsset = perpetualAsset as Perpetual
    this.market = new Market(moduleResources, this.marginCoin, this.perpetualAsset)
    this.network = getNetwork(network)

    const userType = `${mirageAddress()}::market::Trader<${coinInfo(this.marginCoin).type}, ${
      assetInfo(this.perpetualAsset).type
    }>`

    const user = userResource.find((resource) => resource.type === userType)

    this.isRegistered = user !== undefined

    const tempTrade: Position = {
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

    tempTrade.id = !!user ? BigNumber((user.data as any).position.id) : BigNumber(0)
    tempTrade.openingPrice = !!user ? BigNumber((user.data as any).position.opening_price).div(PRECISION_8) : ZERO
    tempTrade.side = !!user
      ? Boolean((user.data as any).position.is_long)
        ? PositionSide.LONG
        : PositionSide.SHORT
      : PositionSide.UNKNOWN
    tempTrade.margin =
      !!user && !!this.market
        ? (tempTrade.side == PositionSide.LONG
            ? this.market.longMarginRebase.toElastic(BigNumber((user.data as any).position.margin_part.amount), true)
            : this.market.shortMarginRebase.toElastic(BigNumber((user.data as any).position.margin_part.amount), true)
          ).div(PRECISION_8)
        : ZERO
    tempTrade.positionSize = !!user ? BigNumber((user.data as any).position.position_size).div(PRECISION_8) : ZERO
    tempTrade.maintenanceMargin = !!user
      ? BigNumber((user.data as any).position.maintenance_margin).div(PRECISION_8)
      : ZERO
    tempTrade.takeProfitPrice = !!user
      ? BigNumber((user.data as any).position.tpsl.take_profit_price).div(PRECISION_8)
      : ZERO
    tempTrade.stopLossPrice = !!user
      ? BigNumber((user.data as any).position.tpsl.stop_loss_price).div(PRECISION_8)
      : ZERO
    tempTrade.triggerPayment = !!user
      ? BigNumber((user.data as any).position.tpsl.trigger_payment.value).div(PRECISION_8)
      : ZERO

    this.position = !tempTrade.positionSize.eq(0) ? tempTrade : undefined

    this.positionLimit = !!user ? BigNumber((user.data as any).position_limit) : ZERO

    const limitOrderType = `${mirageAddress()}::market::LimitOrders<${coinInfo(this.marginCoin).type}, ${
      assetInfo(this.perpetualAsset).type
    }>`

    const limitOrders = userResource.find((resource) => resource.type === limitOrderType)

    const ordersArr = !!limitOrders ? (limitOrders.data as any).orders : []
    const tempOrders: LimitOrder[] = []

    try {
      for (let index = 0; index < ordersArr.length; ++index) {
        tempOrders.push(new LimitOrder(ordersArr[index] as LimitOrderData, index, this.marginCoin, this.perpetualAsset))
      }
    } catch (error) {
      console.error(`Error deserializing limit order ${error}`)
    }

    this.limitOrders = tempOrders
  }

  /**
   * Get if the Trader has an active position
   * @returns If the trader has an open position now
   */
  public hasOpenPosition(): boolean {
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
  static getLeverage(position: Position, perpetualPrice: number, marginPrice: number): number {
    return (position.positionSize.div(position.margin).toNumber() * perpetualPrice) / marginPrice
  }

  /**
   * Estimates a positions pnl in terms of the margin type
   * @param position The position
   * @param perpetualPrice The perpetual price
   * @param marginPrice The margin price
   * @returns The amount of pnl in terms of the margin of the market
   */
  static estimatePnl(position: Position, perpetualPrice: number, marginPrice: number): number {
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
  static estimatePercentPnl(position: Position, perpetualPrice: number, marginPrice: number): number {
    return (Trader.estimatePnl(position, perpetualPrice, marginPrice) * 100) / position.margin.toNumber()
  }

  public async getLiqPrice(): Promise<number> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::market::liquidation_price`,
      type_arguments: getMarketTypeArguments(this.marginCoin, this.perpetualAsset),
      arguments: [this.userAddress],
    })
    return ret[0] as number
  }
}
