import { Network } from '@aptos-labs/ts-sdk'
import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { FEE_PRECISION, PRECISION_8 } from '../../constants'
import { PERCENT_PRECISION, ZERO } from '../../constants'
import { mirageAddress } from '../../constants/accounts'
import { MoveToken, Perpetual } from '../../constants/assetList'
/**
 * Represents a mirage-protocol perpetuals market.
 */
export class Market {
  /**
   * The base asset of the market
   */
  public readonly marginToken: MoveToken
  /**
   * The underlying asset of the market
   */
  public readonly perpetualAsset: Perpetual
  /**
   * The total long margin of a market
   */
  public readonly totalLongMargin: BigNumber
  /**
   * The total short margin of a market
   */
  public readonly totalShortMargin: BigNumber
  /**
   * Long open interest in musd
   */
  public readonly longOpenInterest: BigNumber
  /**
   * Short open interest in musd
   */
  public readonly shortOpenInterest: BigNumber
  /**
   * Long open interest in musd
   */
  public readonly longFundingAccumulated: BigNumber
  /**
   * Short open interest in musd
   */
  public readonly shortFundingAccumulated: BigNumber
  /**
   * The funding that will be taken next funding round
   */
  public readonly nextFundingRate: BigNumber
  /**
   * The time of the last funding round
   */
  public readonly lastFundingRound: Date
  /**
   * Whether long positions are close only
   */
  public readonly longCloseOnly: boolean
  /**
   * Whether short positions are close only
   */
  public readonly shortCloseOnly: boolean

  // FeeInfo

  /**
   * Minimum taker fee at equal oi
   */
  public readonly minTakerFee: number
  /**
   * Maximum taker fee at the max_oi_imbalance
   */
  public readonly maxTakerFee: number
  /**
   * Min maker fee at large oi imbalance
   */
  public readonly minMakerFee: number
  /**
   * Max maker fee at equal oi
   */
  public readonly maxMakerFee: number
  /**
   * The percent fee given to liquidators
   */
  public readonly liquidationFee: number

  // FundingInfo

  /**
   * The minimum funding rate
   */
  public readonly minFundingRate: number
  /**
   * The maximum funding rate
   */
  public readonly maxFundingRate: number
  /**
   * The maximum funding rate
   */
  public readonly baseFundingRate: number
  /**
   * The interval between funding payments
   */
  public readonly fundingInterval: BigNumber

  // MarketConfig

  /**
   * The max total oi allowed for the long & short sides
   */
  public readonly maxOpenInterest: BigNumber
  /**
   * The max allowed imbalance between long and short oi
   */
  public readonly maxOpenInterestImbalance: BigNumber
  /**
   * The base percent maintenance margin
   */
  public readonly maintenanceMargin: number
  /**
   * The max leverage for this market
   */
  public readonly maxLeverage: number
  /**
   * The min order size in mUSD for a trade
   */
  public readonly minOrderSize: BigNumber
  /**
   * The max order size in mUSD for a trade
   */
  public readonly maxOrderSize: BigNumber

  /**
   * The market collection address
   */
  public readonly objectAddress: string
  /**
   * The current network being used
   */
  public readonly network: Network

  /**
   * Construct an instance of Market
   * @param marketObjectResources resources from  the market token collection account
   * @param marginCoin the margin asset of the market
   * @param perpetualAsset the asset being traded
   */
  constructor(
    marketObjectResources: MoveResource[],
    marginCoin: MoveToken | string,
    perpetualAsset: Perpetual | string,
    network: Network,
    objectAddress: string,
  ) {
    this.marginToken = marginCoin as MoveToken
    this.perpetualAsset = perpetualAsset as Perpetual
    this.objectAddress = objectAddress
    this.network = network

    const marketType = `${mirageAddress()}::market::Market`

    const market = marketObjectResources.find((resource) => resource.type === marketType)

    this.totalLongMargin = !!market ? new BigNumber((market.data as any).totalLongMargin).div(PRECISION_8) : ZERO
    this.totalShortMargin = !!market ? new BigNumber((market.data as any).totalShortMargin).div(PRECISION_8) : ZERO
    this.longOpenInterest = !!market ? new BigNumber((market.data as any).long_oi).div(PRECISION_8) : ZERO
    this.shortOpenInterest = !!market ? new BigNumber((market.data as any).short_oi).div(PRECISION_8) : ZERO
    this.longFundingAccumulated = !!market
      ? new BigNumber((market.data as any).long_funding_accumulated_per_unit.magnitude)
          .times((market.data as any).long_funding_accumulated_per_unit.negative ? -1 : 1)
          .div(FEE_PRECISION)
          .div(PRECISION_8)
      : ZERO
    this.shortFundingAccumulated = !!market
      ? new BigNumber((market.data as any).short_funding_accumulated_per_unit.magnitude)
          .times((market.data as any).short_funding_accumulated_per_unit.negative ? -1 : 1)
          .div(FEE_PRECISION)
          .div(PRECISION_8)
      : ZERO
    this.nextFundingRate = !!market
      ? new BigNumber((market.data as any).next_funding_rate.magnitude)
          .times((market.data as any).next_funding_rate.negative ? -1 : 1)
          .div(FEE_PRECISION)
      : ZERO
    this.lastFundingRound = !!market
      ? new Date(new BigNumber((market.data as any).last_funding_round).times(1000).toNumber())
      : new Date(0)
    this.longCloseOnly = !!market ? Boolean((market.data as any).is_long_close_only) : false
    this.shortCloseOnly = !!market ? Boolean((market.data as any).is_short_close_only) : false
    // fees
    this.minTakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.min_taker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.maxTakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.max_taker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.minMakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.min_maker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.maxMakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.max_maker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.liquidationFee = !!market
      ? new BigNumber((market.data as any).config.fees.liquidation_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0

    // funding
    this.minFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.min_funding_rate).div(FEE_PRECISION).times(100).toNumber()
      : 0
    this.maxFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.max_funding_rate).div(FEE_PRECISION).times(100).toNumber()
      : 0
    this.baseFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.base_funding_rate).div(FEE_PRECISION).times(100).toNumber()
      : 0
    this.fundingInterval = !!market ? new BigNumber((market.data as any).config.funding.funding_interval) : ZERO

    // config
    this.maxOpenInterest = !!market ? new BigNumber((market.data as any).config.max_oi).div(PRECISION_8) : ZERO
    this.maxOpenInterestImbalance = !!market
      ? new BigNumber((market.data as any).config.max_oi_imbalance).div(PRECISION_8)
      : ZERO
    this.maintenanceMargin = !!market
      ? new BigNumber((market.data as any).config.maintenance_margin).div(PERCENT_PRECISION).toNumber()
      : 0
    this.maxLeverage = !!market
      ? new BigNumber((market.data as any).config.max_leverage).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.minOrderSize = !!market ? new BigNumber((market.data as any).config.min_order_size).div(PRECISION_8) : ZERO
    this.maxOrderSize = !!market ? new BigNumber((market.data as any).config.max_order_size).div(PRECISION_8) : ZERO
  }

  public calculate_fee(skew: BigNumber, is_taker: boolean): BigNumber {
    const max_skew = this.maxOpenInterestImbalance
    const new_skew_abs = skew.abs()
    if (is_taker) {
      const min = BigNumber(this.minTakerFee)
      const max = BigNumber(this.maxTakerFee)
      if (new_skew_abs.gte(BigNumber(max.minus(min)).times(max_skew).div(max))) {
        return max
      } else {
        const scaled = min.times(max_skew).div(max_skew.minus(new_skew_abs))
        if (scaled.lte(min)) {
          return min
        } else {
          return scaled
        }
      }
    } else {
      const min = BigNumber(this.minMakerFee)
      const max = BigNumber(this.maxMakerFee)
      if (max.times(new_skew_abs).div(max_skew).lte(min)) {
        // in the range closest to even skew, always pay max maker
        return max
      } else {
        // pay less fees in more skewed market, negative logarithm
        return min.times(max_skew).div(new_skew_abs)
      }
    }
  }
}
