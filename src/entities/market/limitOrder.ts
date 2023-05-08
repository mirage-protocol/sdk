import BigNumber from 'bignumber.js'

import { PRECISION_8 } from '../../constants'
import { ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { assetInfo, coinInfo, MoveCoin, OtherAsset } from '../../constants/coinList'
import { Market } from './market'
import { AptosTypes } from 'aptos'

export const U256_MAX = BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935')

export enum TradeSide {
  LONG = 0,
  SHORT = 1,
  UNKNOWN = 2,
}

/**
 * Represents a limit order in the a mirage-protocol market.
 */
export class LimitOrder {
  /**
   * The base asset of the market
   */
  public readonly base: MoveCoin
  /**
   * The underlying asset of the market
   */
  public readonly underlying: OtherAsset
  /**
   * The id of the trade, global across all markets
   */
  public readonly id: BigNumber
  /**
   * The opening price of the trade (0 if trade is resting)
   */
  public readonly openingPrice: BigNumber
  /**
   * The opening price of the trade (0 if trade is resting)
   */
  public readonly tradeSide: TradeSide
  /**
   * This trades margin
   */
  public readonly margin: BigNumber
  /**
   * Position size in mUSD
   */
  public readonly positionSize: BigNumber
  /**
   * maintenance margin in mUSD
   */
  public readonly maintenanceMargin: BigNumber
  /**
   * The liquidation price of the trade
   */
  public readonly liquidationPrice: BigNumber
  /**
   * The take profit price of the trade (0 if unused)
   */
  public readonly takeProfitPrice: BigNumber
  /**
   * The stop loss price of the trade (0 if unused)
   */
  public readonly stopLossPrice: BigNumber
  /**
   * An instance of the Market for this Trade
   */
  public readonly market: Market

  constructor(
    market: Market,
    limitOrderData: AptosTypes.MoveValue,
    base: MoveCoin | string,
    underlying: MoveCoin | OtherAsset | string
  ) {
    this.base = base as MoveCoin
    this.underlying = underlying as OtherAsset

    this.id = BigNumber(limitOrderData.id)

    this.openingPrice = BigNumber(limitOrderData.opening_price).div(PRECISION_8)

    this.tradeSide = !!limitOrderData
      ? Boolean(limitOrderData.long)
        ? TradeSide.LONG
        : TradeSide.SHORT
      : TradeSide.UNKNOWN

    this.margin = (this.tradeSide == TradeSide.LONG
            ? market.longMarginRebase.toElastic(new BigNumber(limitOrderData.margin_part), true)
            : market.shortMarginRebase.toElastic(new BigNumber(limitOrderData.margin_part), true)
          ).div(PRECISION_8)

    this.positionSize = !!limitOrderData ? BigNumber(limitOrderData.position_size).div(PRECISION_8) : ZERO
    this.maintenanceMargin = !!limitOrderData
      ? BigNumber((limitOrderData.data as any).maintenance_margin).div(PRECISION_8)
      : ZERO
    this.liquidationPrice = BigNumber(limitOrderData.liquidation_price).div(PRECISION_8)
    this.takeProfitPrice = BigNumber(limitOrderData.take_profit_price).div(PRECISION_8)
    this.stopLossPrice = BigNumber(limitOrderData.stop_loss_price).div(PRECISION_8)
  }
}

export class LimitOrders {
  /**
   * The limit order type
   */
  public readonly limitOrdersType: string
  /**
   * The base asset of the market
   */
  public readonly base: MoveCoin
  /**
   * The underlying asset of the market
   */
  public readonly underlying: OtherAsset
  /**
   * An instance of the Market for this Trade
   */
  public readonly market: Market
  /**
   * A users limit orders
   */
  public readonly limitOrders: LimitOrder[]

  constructor(
    userResource: AccountResource[],
    moduleResources: AccountResource[],
    base: MoveCoin | string,
    underlying: MoveCoin | OtherAsset | string
  ) {
    this.base = base as MoveCoin
    this.underlying = underlying as OtherAsset
    this.market = new Market(moduleResources, base, underlying)

    this.limitOrdersType = `${mirageAddress()}::market::LimitOrder<${coinInfo(base).type}, ${
      assetInfo(underlying).type
    }>`

    console.debug(`attempting to get data for type: ${this.limitOrdersType}`)

    const limitOrders = userResource.find((resource) => resource.type === this.limitOrdersType)

    console.debug(`found trade: ${JSON.stringify(limitOrders)}`)

    this.limitOrders = !!limitOrders && this.market ? (limitOrders.data as any).limit_orders.map(
        (limitOrderData: AptosTypes.MoveValue) => { return new LimitOrder(this.market, limitOrderData, base, underlying) }
    ) : []
  }
}
