import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { mirageAddress, MoveToken, Perpetual, PRECISION_8, U64_MAX, ZERO } from '../../constants'
import { MirageConfig } from '../../utils'
import { PositionSide } from './position'

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
    limitOrderResources: MoveResource[],
    marginToken: MoveToken,
    perpetualAsset: Perpetual,
    positionSide: PositionSide,
    objectAddress: string,
    config: MirageConfig,
  ) {
    const limitOrderType = `${mirageAddress(config)}::market::LimitOrder`

    const limitOrder = limitOrderResources.find((resource) => resource.type === limitOrderType)

    this.marginToken = marginToken
    this.perpetualAsset = perpetualAsset

    this.objectAddress = objectAddress

    this.side = positionSide
    this.isDecreaseOnly = !!limitOrder ? (limitOrder.data as any).is_decrease_only : false
    this.positionSize = !!limitOrder ? BigNumber((limitOrder.data as any).position_size).div(PRECISION_8) : ZERO
    this.margin = !!limitOrder ? BigNumber((limitOrder.data as any).margin_amount).div(PRECISION_8) : ZERO
    this.triggerPrice = !!limitOrder ? BigNumber((limitOrder.data as any).trigger_price).div(PRECISION_8) : ZERO
    this.triggersAbove = !!limitOrder ? (limitOrder.data as any).triggers_above : false
    this.maxPriceSlippage = !!limitOrder
      ? BigNumber((limitOrder.data as any).max_price_slippage).div(PRECISION_8)
      : ZERO
    this.expiration = !!limitOrder ? BigInt((limitOrder.data as any).expiration) : BigInt(0)
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
