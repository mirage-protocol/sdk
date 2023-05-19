import BigNumber from 'bignumber.js'

import {
  AccountResource,
  assetInfo,
  coinInfo,
  mirageAddress,
  MoveCoin,
  Perpetual,
  PRECISION_8,
  ZERO,
} from '../../constants'
import { LimitOrder, LimitOrderData } from './limitOrder'
import { Market } from './market'

/**
 * Direction of a trade
 */
export enum TradeSide {
  LONG = 0,
  SHORT = 1,
  UNKNOWN = 2,
}

/**
 * Data for a user's position
 */
export type Trade = {
  id: BigNumber
  openingPrice: BigNumber
  tradeSide: TradeSide
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
   * The margin asset of the trade
   */
  public readonly marginAsset: MoveCoin
  /**
   * The perpetual asset being traded
   */
  public readonly perpetualAsset: Perpetual
  /**
   * The user's current trade if one is open
   */
  public readonly trade: Trade | undefined
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

  constructor(
    userResource: AccountResource[],
    moduleResources: AccountResource[],
    marginAsset: MoveCoin | string,
    perpetualAsset: MoveCoin | Perpetual | string
  ) {
    this.marginAsset = marginAsset as MoveCoin
    this.perpetualAsset = perpetualAsset as Perpetual
    this.market = new Market(moduleResources, this.marginAsset, this.perpetualAsset)

    const userType = `${mirageAddress()}::market::User<${coinInfo(this.marginAsset).type}, ${
      assetInfo(this.perpetualAsset).type
    }>`
    const user = userResource.find((resource) => resource.type === userType)

    const tempTrade: Trade = {
      id: ZERO,
      openingPrice: ZERO,
      tradeSide: TradeSide.UNKNOWN,
      margin: ZERO,
      positionSize: ZERO,
      maintenanceMargin: ZERO,
      liquidationPrice: ZERO,
      takeProfitPrice: ZERO,
      stopLossPrice: ZERO,
      triggerPayment: ZERO,
    }

    tempTrade.id = !!user ? BigNumber((user.data as any).trade.id) : BigNumber(0)
    tempTrade.openingPrice = !!user ? BigNumber((user.data as any).trade.opening_price).div(PRECISION_8) : ZERO
    tempTrade.tradeSide = !!user
      ? Boolean((user.data as any).trade.is_long)
        ? TradeSide.LONG
        : TradeSide.SHORT
      : TradeSide.UNKNOWN
    tempTrade.margin =
      !!user && !!this.market
        ? (tempTrade.tradeSide == TradeSide.LONG
            ? this.market.longMarginRebase.toElastic(BigNumber((user.data as any).trade.margin_part.amount), true)
            : this.market.shortMarginRebase.toElastic(BigNumber((user.data as any).trade.margin_part.amount), true)
          ).div(PRECISION_8)
        : ZERO
    tempTrade.positionSize = !!user ? BigNumber((user.data as any).trade.position_size).div(PRECISION_8) : ZERO
    tempTrade.maintenanceMargin = !!user
      ? BigNumber((user.data as any).trade.maintenance_margin).div(PRECISION_8)
      : ZERO
    tempTrade.liquidationPrice = !!user ? BigNumber((user.data as any).trade.liquidation_price).div(PRECISION_8) : ZERO
    tempTrade.takeProfitPrice = !!user
      ? BigNumber((user.data as any).trade.tpsl.take_profit_price).div(PRECISION_8)
      : ZERO
    tempTrade.stopLossPrice = !!user ? BigNumber((user.data as any).trade.tpsl.stop_loss_price).div(PRECISION_8) : ZERO
    tempTrade.triggerPayment = !!user ? BigNumber((user.data as any).trade.tpsl.stop_loss_price).div(PRECISION_8) : ZERO

    this.trade = !tempTrade.positionSize.eq(0) ? tempTrade : undefined

    this.positionLimit = !!user ? BigNumber((user.data as any).position_limit) : ZERO

    const ordersArr = !!user ? (user.data as any).limit_orders : []
    const tempOrders: LimitOrder[] = []

    for (const restingOrder of ordersArr) {
      tempOrders.push(new LimitOrder(restingOrder as LimitOrderData))
    }
    this.limitOrders = tempOrders
  }

  /**
   * Get if the Trader has an active position
   * @returns If the trader has an open position now
   */
  public hasOpenPosition(): boolean {
    // Inactive trades have an id of u64 max
    return this.trade ? this.trade.positionSize && !this.trade.positionSize.eq(0) : false
  }

  // TODO:
  // getLeverage()
  //
  // pnl calculator implementation
  // getCurrentLongFee()
  // getCurrentShortFee() => gets as close as possible
  //
}
