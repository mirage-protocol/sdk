import BigNumber from 'bignumber.js'

import { PRECISION_8 } from '../../constants'
import { TradeSide } from './trader'

/**
 * LimitOrder struct data
 */
export type LimitOrderData = {
  id: BigNumber
  is_long: boolean
  is_increase: boolean
  position_size: BigNumber
  margin: { value: BigNumber }
  trigger_price: BigNumber
  triggers_above: boolean
  trigger_payment: { payment: { value: BigNumber } }
  max_price_slippage: BigNumber
  expiration: number
}

/**
 * Represents a LimitOrder struct
 */
export class LimitOrder {
  /**
   * The id of the trade, global across all markets
   */
  public readonly id: BigNumber
  /**
   * The opening price of the trade (0 if trade is resting)
   */
  public readonly tradeSide: TradeSide

  /**
   * Is this a limit order to increase or decrease a position
   */
  public readonly isIncrease: boolean
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
   * The amount of Aptos Coin resting in the order to pay for a trigger
   */
  public readonly triggerPayment: BigNumber

  /**
   * The max price slippage on trigger for the order
   */
  public readonly maxPriceSlippage: BigNumber

  /**
   * The expiration time of the order
   */
  public readonly expiration: number

  /**
   * Construct a LimitOrder instance
   * @param limitOrderData the data to parse
   */
  constructor(limitOrderData: LimitOrderData) {
    this.id = BigNumber(limitOrderData.id)

    this.tradeSide = limitOrderData.is_long ? TradeSide.LONG : TradeSide.SHORT
    this.isIncrease = limitOrderData.is_increase
    this.positionSize = limitOrderData.position_size
    this.margin = limitOrderData.margin.value
    this.triggerPrice = limitOrderData.trigger_price
    this.triggersAbove = limitOrderData.triggers_above
    this.triggerPayment = limitOrderData.trigger_payment.payment.value
    this.maxPriceSlippage = limitOrderData.max_price_slippage
    this.expiration = limitOrderData.expiration
  }

  /**
   * Get position size
   * @returns Position size (no precision)
   */
  public getUiPositionSize(): number {
    return this.positionSize.div(PRECISION_8).toNumber()
  }

  /**
   * Get margin amount
   * @returns Margin amount (no precision)
   */
  public getUiMargin(): number {
    return this.margin.div(PRECISION_8).toNumber()
  }

  /**
   * Get trigger payment amount
   * @returns Trigger payment amount (no precision)
   */
  public getUiTriggerPayment(): number {
    return this.margin.div(PRECISION_8).toNumber()
  }

  /**
   * Get the percent slippage of the trade
   * @returns The percent slippage in basis points
   */
  public getPercentSlippage(): number {
    return this.maxPriceSlippage.div(this.triggerPrice).times(10000).toNumber()
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
