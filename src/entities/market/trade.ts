import BigNumber from 'bignumber.js'

import { PRECISION_8 } from '../../constants'
import { ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { assetInfo, coinInfo, MoveCoin, OtherAsset } from '../../constants/coinList'
import { Market } from './market'

export const U256_MAX = BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935')

export enum TradeSide {
  LONG = 0,
  SHORT = 1,
  UNKNOWN = 2,
}

/**
 * Represents a trade in the a mirage-protocol market.
 */
export class Trade {
  /**
   * The trade type
   */
  public readonly tradeType: string
  /**
   * The base asset of the market
   */
  public readonly base: MoveCoin
  /**
   * The underlying asset of the market
   */
  public readonly underlying: OtherAsset
  /**
   * The id of the trade, global across all markets (MAX_U256 if inactive)
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
    userResource: AccountResource[],
    moduleResources: AccountResource[],
    base: MoveCoin | string,
    underlying: MoveCoin | OtherAsset | string
  ) {
    this.base = base as MoveCoin
    this.underlying = underlying as OtherAsset
    this.market = new Market(moduleResources, base, underlying)

    this.tradeType = `${mirageAddress()}::market::Trade<${coinInfo(base).type}, ${assetInfo(underlying).type}>`

    console.debug(`attempting to get data for type: ${this.tradeType}`)

    const trade = userResource.find((resource) => resource.type === this.tradeType)

    console.debug(`found trade: ${JSON.stringify(trade)}`)

    this.id = !!trade ? BigNumber((trade.data as any).id) : U256_MAX

    this.openingPrice = !!trade ? BigNumber((trade.data as any).opening_price).div(PRECISION_8) : ZERO

    this.tradeSide = !!trade
      ? Boolean((trade.data as any).long)
        ? TradeSide.LONG
        : TradeSide.SHORT
      : TradeSide.UNKNOWN

    this.margin =
      !!trade && !!this.market
        ? (this.tradeSide == TradeSide.LONG
            ? this.market.longMarginRebase.toElastic(new BigNumber((trade.data as any).margin_part), true)
            : this.market.shortMarginRebase.toElastic(new BigNumber((trade.data as any).margin_part), true)
          ).div(PRECISION_8)
        : ZERO

    this.positionSize = !!trade ? BigNumber((trade.data as any).position_size).div(PRECISION_8) : ZERO
    this.maintenanceMargin = !!trade ? BigNumber((trade.data as any).maintenance_margin).div(PRECISION_8) : ZERO
    this.liquidationPrice = !!trade ? BigNumber((trade.data as any).liquidation_price).div(PRECISION_8) : ZERO
    this.takeProfitPrice = !!trade ? BigNumber((trade.data as any).take_profit_price).div(PRECISION_8) : ZERO
    this.stopLossPrice = !!trade ? BigNumber((trade.data as any).stop_loss_price).div(PRECISION_8) : ZERO
  }

  public isActive(): boolean {
    // Inactive trades have an id of u256 max
    return this.id && !this.id.eq(U256_MAX)
  }
}
