import BigNumber from 'bignumber.js'

import { MoveToken, Perpetual, PRECISION_8, U64_MAX } from '../../constants'
import { PositionSide } from './position'

/**
 * LimitOrder struct data
 */
export type LimitOrderData = {
  is_long: boolean
  is_decrease_only: boolean
  position_size: BigNumber
  margin_amount: BigNumber
  trigger_price: BigNumber
  triggers_above: boolean
  max_price_slippage: BigNumber
  expiration: number
}

/**
 * Represents a LimitOrder struct
 */
export class LimitOrder {
  /**
   * The base asset of the market
   */
  public readonly marginToken: MoveToken
  /**
   * The underlying asset of the market
   */
  public readonly perpetualAsset: Perpetual
  /**
   * The side of the order
   */
  public readonly side: PositionSide

  /**
   * Is this a limit order only to decrease a position
   */
  public readonly isDecreaseOnly: boolean
  /**
   * Position size in units of the asset
   */
  public readonly positionSize: BigNumber
  /**
   * This trades margin amount
   */
  public readonly margin: BigNumber
  /**
   * The price this order gets triggered
   */
  public readonly triggerPrice: BigNumber
  /**
   * Will this order trigger above or below the triggerPrice
   */
  public readonly triggersAbove: boolean

  /**
   * The max price slippage on trigger for the order
   */
  public readonly maxPriceSlippage: BigNumber

  /**
   * The expiration time of the order
   */
  public readonly expiration: bigint

  public readonly objectAddress: string

  /**
   * Construct a LimitOrder instance
   * @param limitOrderData the data to parse
   */
  constructor(
    limitOrderData: LimitOrderData,
    marginToken: MoveToken,
    perpetualAsset: Perpetual,
    positionSide: PositionSide,
    objectAddress: string,
  ) {
    this.marginToken = marginToken
    this.perpetualAsset = perpetualAsset

    this.objectAddress = objectAddress

    this.side = positionSide
    this.isDecreaseOnly = limitOrderData.is_decrease_only
    this.positionSize = BigNumber(limitOrderData.position_size).div(PRECISION_8)
    this.margin = BigNumber(limitOrderData.margin_amount).div(PRECISION_8)
    this.triggerPrice = BigNumber(limitOrderData.trigger_price).div(PRECISION_8)
    this.triggersAbove = limitOrderData.triggers_above
    this.maxPriceSlippage = BigNumber(limitOrderData.max_price_slippage).div(PRECISION_8)
    this.expiration = BigInt(limitOrderData.expiration)
  }

  // Good-til-cancelled expiration (U64_MAX)
  static gtcExpiration(): bigint {
    return BigInt(U64_MAX)
  }

  // Whether this order has an expiration or is good-til-cancelled
  isGtc(): boolean {
    return this.expiration == LimitOrder.gtcExpiration()
  }

  /**
   * Turn a percentage slippage into a price slippage
   * @param triggerPrice The trigger price of the trade
   * @param percentSlippage The allowed slippage in basis points
   * @returns The amount of price slippage allowed
   */
  static percentSlippageToPriceSlippage(triggerPrice: BigNumber, percentSlippage: number): BigNumber {
    return triggerPrice.times(percentSlippage).div(10000)
  }
}
