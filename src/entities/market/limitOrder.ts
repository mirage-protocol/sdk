import { AccountAddress, MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules, PRECISION_8, U64_MAX } from '../../utils'
import { PositionSide } from './position'

/**
 * LimitOrder struct data
 */
export type LimitOrderData = {
  is_decrease_only: boolean
  position_size: string
  is_long: boolean
  trigger_price: BigNumber
  triggers_above: boolean
  max_price_slippage: string
  expiration: string
}

/**
 * Represents a LimitOrder struct
 */
export class LimitOrder {
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

  public readonly marketObjectAddress: string
  public readonly positionObjectAddress: string
  public readonly objectAddress: string

  /**
   * Construct a LimitOrder instance
   * @param limitOrderData the data to parse
   */
  constructor(limitOrderResources: MoveResource[], objectAddress: string, deployerAddress: AccountAddress) {
    this.objectAddress = objectAddress

    const limitOrderType = `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::limit_order::LimitOrder`
    const findLimitOrder = limitOrderResources.find((resource) => resource.type === limitOrderType)
    if (findLimitOrder == undefined) throw new Error('LimitOrder object not found)
    const limitOrder = findLimitOrder.data as LimitOrderData
    const strategyType = `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::Strategy`
    const strategy = limitOrderResources.find((resource) => resource.type === strategyType)
    if (strategy == undefined) throw new Error('Strategy object not found)

    this.side = Boolean(limitOrder.is_long).valueOf() ? PositionSide.LONG : PositionSide.SHORT
    this.isDecreaseOnly = limitOrder.is_decrease_only
    this.positionSize = BigNumber(limitOrder.position_size).div(PRECISION_8)
    this.triggersAbove = Boolean(limitOrder.triggers_above)
    this.triggerPrice = BigNumber(limitOrder.trigger_price).div(PRECISION_8)
    this.maxPriceSlippage = BigNumber(limitOrder.max_price_slippage).div(PRECISION_8)
    this.expiration = BigInt(limitOrder.expiration)

    this.margin = BigNumber((strategy.data as any).strategy_margin_amount).div(PRECISION_8)
    this.positionObjectAddress = (strategy.data as any).position.inner as string
    this.marketObjectAddress = (strategy.data as any).market.inner as string
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
