import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules, PRECISION_8, U64_MAX } from '../../constants'
import { MirageConfig } from '../../utils'
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
  public readonly marginSymbol: string
  /**
   * The underlying asset of the market
   */
  public readonly perpSymbol: string
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
    limitOrderResources: MoveResource[],
    marginSymbol: string,
    perpSymbol: string,
    objectAddress: string,
    config: MirageConfig,
  ) {
    this.marginSymbol = marginSymbol
    this.perpSymbol = perpSymbol

    this.objectAddress = objectAddress

    const limitOrderType = `${getModuleAddress(MoveModules.MARKET, config.deployerAddress)}::limit_order::LimitOrder`
    const limitOrder = limitOrderResources.find((resource) => resource.type === limitOrderType)
    if (limitOrder == undefined) throw new Error('LimitOrder object not found')
    const strategyType = `${getModuleAddress(MoveModules.MARKET, config.deployerAddress)}::market::Strategy`
    const strategy = limitOrderResources.find((resource) => resource.type === strategyType)
    if (strategy == undefined) throw new Error('Strategy object not found')

    this.side = Boolean((limitOrder.data as any).is_long).valueOf() ? PositionSide.LONG : PositionSide.SHORT
    this.isDecreaseOnly = Boolean((limitOrder.data as any).is_decrease_only)
    this.positionSize = BigNumber((limitOrder.data as any).position_size).div(PRECISION_8)
    this.positionSize = BigNumber((limitOrder.data as any).trigger_price).div(PRECISION_8)
    this.triggersAbove = Boolean((limitOrder.data as any).triggers_above)
    this.triggerPrice = BigNumber((limitOrder.data as any).trigger_price).div(PRECISION_8)
    this.maxPriceSlippage = BigNumber((limitOrder.data as any).maxPriceSlippage).div(PRECISION_8)
    this.expiration = BigInt((limitOrder.data as any).expiration)

    this.margin = BigNumber((strategy.data as any).strategy_margin_amount).div(PRECISION_8)
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
