import { Network } from '@aptos-labs/ts-sdk'
import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { FEE_PRECISION, PRECISION_8 } from '../../constants'
import { PERCENT_PRECISION, ZERO } from '../../constants'
import { mirageAddress } from '../../constants/accounts'
import { MoveToken, Perpetual } from '../../constants/assetList'
import { MirageConfig } from '../../utils/config'
import { PositionSide } from './position'
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
    objectAddress: string,
    config: MirageConfig,
    network: Network,
  ) {
    this.marginToken = marginCoin as MoveToken
    this.perpetualAsset = perpetualAsset as Perpetual
    this.objectAddress = objectAddress
    this.network = network

    const marketType = `${mirageAddress(config)}::market::Market`

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
      ? new BigNumber((market.data as any).config.fees.min_taker_fee).div(FEE_PRECISION).toNumber()
      : 0
    this.maxTakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.max_taker_fee).div(FEE_PRECISION).toNumber()
      : 0
    this.minMakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.min_maker_fee).div(FEE_PRECISION).toNumber()
      : 0
    this.maxMakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.max_maker_fee).div(FEE_PRECISION).toNumber()
      : 0

    // funding
    this.minFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.min_funding_rate).div(FEE_PRECISION).toNumber()
      : 0
    this.maxFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.max_funding_rate).div(FEE_PRECISION).toNumber()
      : 0
    this.baseFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.base_funding_rate).div(FEE_PRECISION).toNumber()
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

  public getOpenCloseFee(
    side: PositionSide,
    isClose: boolean,
    positionSize: BigNumber,
    perpPrice: BigNumber,
    marginPrice: BigNumber,
  ): BigNumber {
    const skew = this.getSkew(perpPrice, isClose)
    const positionSizeMUSD = positionSize.times(perpPrice)
    const fee = isClose ? this.getCloseFee(skew, side, positionSizeMUSD) : this.getOpenFee(skew, side, positionSizeMUSD)
    return fee.times(positionSizeMUSD).div(marginPrice)
  }

  public getCloseFee(currSkew: BigNumber, side: PositionSide, positionSizeMUSD: BigNumber): BigNumber {
    const skewedLong = currSkew.isPositive()
    const longAndLongSkew = side == PositionSide.LONG && skewedLong
    const shortAndShortSkew = side == PositionSide.SHORT && !skewedLong
    const additionalSkew = positionSizeMUSD.times(side ? 1 : -1)
    // calculate the new skew from this action
    const newSkew = currSkew.plus(additionalSkew)

    const taker = longAndLongSkew || shortAndShortSkew || skewedLong == newSkew.isNegative()
    return this.calculateFee(newSkew, taker)
  }

  public getOpenFee(currSkew: BigNumber, side: PositionSide, positionSizeMUSD: BigNumber): BigNumber {
    // get current skew
    const skewedLong = currSkew.isPositive()
    // define different states
    const longAndLongSkew = side == PositionSide.LONG && skewedLong
    const shortAndShortSkew = side == PositionSide.SHORT && !skewedLong

    const additionalSkew = positionSizeMUSD.times(side == PositionSide.LONG ? 1 : -1)
    // calculate the new skew from this action
    const newSkew = currSkew.plus(additionalSkew)

    // determine if this is a taker or maker position
    // 1) opening a trade in direction of prominent skew
    // 2) a trade resulting in a skew prominence reversal
    const taker = longAndLongSkew || shortAndShortSkew || skewedLong == newSkew.isNegative()

    const newSkewAbs = newSkew.abs()
    // enforce new_skew limit if it's a taker and an open, otherwise we let the skew change
    // 2 reasons:
    //
    // 1. We want users to always be able to close positions
    // 2. To avoid the situation where skew can go past max over time -> preventing even
    //    actions that reduce skew
    if (taker) {
      if (newSkewAbs.gte(this.maxOpenInterestImbalance)) {
        return BigNumber(NaN) // EOI_TOO_SKEWED
      }
    }

    // scale off the max fee based on the skew for makers and takers
    return this.calculateFee(newSkew, taker)
  }

  /// Get the the oi skew and if it skews long given a market price
  public getSkew(perpPrice: BigNumber, isClose: boolean): BigNumber {
    const maxOi = this.maxOpenInterestImbalance
    const longOi = this.longOpenInterest
    const shortOi = this.shortOpenInterest

    const longOiMUSD = longOi.times(perpPrice)
    const shortOiMUSD = shortOi.times(perpPrice)
    if (!isClose && (longOiMUSD.gte(maxOi) || shortOiMUSD.gte(maxOi))) {
      return BigNumber(NaN)
    }

    if (longOiMUSD.eq(shortOiMUSD)) {
      return ZERO
    } else if (longOiMUSD.gt(shortOiMUSD)) {
      return longOiMUSD.minus(shortOiMUSD)
    } else {
      return shortOiMUSD.minus(longOiMUSD)
    }
  }

  public calculateFee(skew: BigNumber, is_taker: boolean): BigNumber {
    const maxSkew = this.maxOpenInterestImbalance
    const newSkewAbs = skew.abs()
    if (is_taker) {
      const min = BigNumber(this.minTakerFee)
      const max = BigNumber(this.maxTakerFee)
      if (newSkewAbs.gte(BigNumber(max.minus(min)).times(maxSkew).div(max))) {
        return max
      } else {
        const scaled = min.times(maxSkew).div(maxSkew.minus(newSkewAbs))
        if (scaled.lte(min)) {
          return min
        } else {
          return scaled
        }
      }
    } else {
      const min = BigNumber(this.minMakerFee)
      const max = BigNumber(this.maxMakerFee)
      if (max.times(newSkewAbs).div(maxSkew).lte(min)) {
        // in the range closest to even skew, always pay max maker
        return max
      } else {
        // pay less fees in more skewed market, negative logarithm
        return min.times(maxSkew).div(newSkewAbs)
      }
    }
  }
}
