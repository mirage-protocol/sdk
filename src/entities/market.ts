import BigNumber from 'bignumber.js'

import { ZERO } from '../constants'
import { AccountResource, mirageAddress } from '../constants/accounts'
import { MoveCoin, OtherAsset } from '../constants/coinList'
import { assetInfo, coinInfo } from '../constants/coinList'
import { Rebase } from './rebase'

/**
 * Represents a mirage-protocol perpetuals market.
 */
export class Market {
  /**
   * The market type
   */
  public readonly marketType: string
  /**
   * The base asset of the market
   */
  public readonly base: MoveCoin
  /**
   * The underlying asset of the market
   */
  public readonly underlying: OtherAsset
  /**
   * All the margin actively being used in the market for longs & shorts
   */
  public readonly margin: BigNumber
  /**
   * Resting margin waiting for triggers
   */
  public readonly restingMargin: BigNumber
  /**
   * Maximum taker fee at the max_oi_imbalance
   */
  public readonly maxTakerFee: BigNumber
  /**
   * Minimum taker fee at equal oi
   */
  public readonly minTakerFee: BigNumber
  /**
   * Max maker fee at equal oi
   */
  public readonly maxMakerFee: BigNumber
  /**
   * Min maker fee at large oi imbalance
   */
  public readonly minMakerFee: BigNumber
  /**
   * The minimum funding rate
   */
  public readonly minFundingRate: BigNumber
  /**
   * The funding that will be taken next payment
   */
  public readonly nextFundingRate: BigNumber
  /**
   * The funding that will be taken next payment
   */
  public readonly nextFundingPos: boolean
  /**
   * The time of the last funding payment
   */
  public readonly lastFundingUpdate: BigNumber
  /**
   * The discount percent of the protocol on funding payments
   */
  public readonly poolFundingDiscount: BigNumber
  /**
   * The interval between funding payments
   */
  public readonly fundingInterval: BigNumber
  /**
   * A rebase representing all long margin (in C)
   * elastic = long margin, base = shares of long margin
   */
  public readonly longMargin: Rebase
  /**
   * A rebase representing all short margin (in C)
   * elastic = long margin, base = shares of short margin
   */
  public readonly shortMargin: Rebase

  /**
   * Construct an instance of Market
   * @param moduleResources resources for the market account (MIRAGE_ACCOUNT)
   * @param base the base asset of the market
   * @param underlying the underlying asset of the market
   */
  constructor(moduleResources: AccountResource[], base: MoveCoin | string, underlying: OtherAsset | string) {
    this.base = base as MoveCoin
    this.underlying = underlying as OtherAsset
    this.marketType = `${mirageAddress()}::market::Market<${coinInfo(base).type}, ${assetInfo(underlying).type}>`

    console.debug(`attempting to get data for type: ${this.marketType}`)

    const market = moduleResources.find((resource) => resource.type === this.marketType)

    console.debug(`found data: ${market}`)

    this.margin = !!market ? new BigNumber((market.data as any).margin.value) : ZERO
    this.restingMargin = !!market ? new BigNumber((market.data as any).resting_margin.value) : ZERO

    this.maxTakerFee = !!market ? new BigNumber((market.data as any).max_taker_fee) : ZERO
    this.minTakerFee = !!market ? new BigNumber((market.data as any).min_taker_fee) : ZERO
    this.maxMakerFee = !!market ? new BigNumber((market.data as any).max_maker_fee) : ZERO
    this.minMakerFee = !!market ? new BigNumber((market.data as any).min_maker_fee) : ZERO

    this.minFundingRate = !!market ? new BigNumber((market.data as any).min_funding_rate) : ZERO
    this.nextFundingRate = !!market ? new BigNumber((market.data as any).next_funding_rate) : ZERO
    this.nextFundingPos = !!market ? Boolean((market.data as any).next_funding_pos) : false
    this.lastFundingUpdate = !!market ? new BigNumber((market.data as any).last_funding_update) : ZERO
    this.poolFundingDiscount = !!market ? new BigNumber((market.data as any).last_funding_update) : ZERO
    this.fundingInterval = !!market ? new BigNumber((market.data as any).pool_funding_discount) : ZERO

    this.longMargin = !!market
      ? new Rebase(
          BigNumber((market.data as any).long_margin.elastic),
          BigNumber((market.data as any).long_margin.base)
        )
      : new Rebase(ZERO, ZERO)
    this.shortMargin = !!market
      ? new Rebase(
          BigNumber((market.data as any).short_margin.elastic),
          BigNumber((market.data as any).short_margin.base)
        )
      : new Rebase(ZERO, ZERO)
  }
}
