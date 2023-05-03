import BigNumber from 'bignumber.js'

import { ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { assetInfo, coinInfo, MoveCoin, OtherAsset } from '../../constants/coinList'
import { Market } from './market'

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
   * The opening price of the trade (0 if trade is resting)
   */
  public readonly openingPrice: BigNumber
  /**
   * The opening price of the trade (0 if trade is resting)
   */
  public readonly long: boolean
  /**
   * This trades margin
   */
  public readonly margin: BigNumber
  /**
   * Position size in mUSD
   */
  public readonly positionSize: BigNumber
  /**
   * Maintenence margin in mUSD
   */
  public readonly maintenenceMargin: BigNumber
  /**
   * The liquidation price of the trade
   */
  public readonly liquidationPrice: BigNumber
  /**
   * The limit price of the trade (0 if unused)
   */
  public readonly limitPrice: BigNumber
  /**
   * Resting margin in limit order (0 if trade is open)
   */
  public readonly restingMargin: BigNumber
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
    moduleResources: AccountResource[],
    userResource: AccountResource[],
    base: MoveCoin | string,
    underlying: MoveCoin | OtherAsset | string
  ) {
    this.base = base as MoveCoin
    this.underlying = underlying as OtherAsset
    this.market = new Market(moduleResources, base, underlying)

    this.tradeType = `${mirageAddress()}::market::Trade<${coinInfo(base).type}, ${assetInfo(underlying).type}>`

    console.debug(`attempting to get data for type: ${this.tradeType}`)

    const trade = userResource.find((resource) => resource.type === this.tradeType)

    console.debug(`found data: ${trade}`)

    this.openingPrice = !!trade ? BigNumber((trade.data as any).opening_price) : ZERO

    this.long = !!trade ? Boolean((trade.data as any).long) : false
    this.margin =
      !!trade && !!this.market
        ? this.long
          ? this.market.longMargin.toElastic(new BigNumber((trade.data as any).margin_part), true)
          : this.market.shortMargin.toElastic(new BigNumber((trade.data as any).margin_part), true)
        : ZERO

    this.positionSize = !!trade ? BigNumber((trade.data as any).position_size) : ZERO
    this.maintenenceMargin = !!trade ? BigNumber((trade.data as any).maintenence_margin) : ZERO
    this.liquidationPrice = !!trade ? BigNumber((trade.data as any).liquidation_price) : ZERO
    this.limitPrice = !!trade ? BigNumber((trade.data as any).limit_price) : ZERO
    this.restingMargin = !!trade ? BigNumber((trade.data as any).resting_margin) : ZERO
    this.takeProfitPrice = !!trade ? BigNumber((trade.data as any).take_profit_price) : ZERO
    this.stopLossPrice = !!trade ? BigNumber((trade.data as any).stop_loss_price) : ZERO
  }
}
