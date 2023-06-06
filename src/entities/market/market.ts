import BigNumber from 'bignumber.js'

import {
  aptosClient,
  FUNDING_PRECISION,
  getNetwork,
  Network,
  PERCENT_PRECISION,
  PRECISION_8,
  ZERO,
} from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { MoveCoin, Perpetual } from '../../constants/coinList'
import { assetInfo, coinInfo } from '../../constants/coinList'
import { Rebase } from '../rebase'

/**
 * Represents a mirage-protocol perpetuals market.
 */
export class Market {
  /**
   * The base asset of the market
   */
  public readonly marginCoin: MoveCoin
  /**
   * The underlying asset of the market
   */
  public readonly perpetualAsset: Perpetual
  /**
   * The current network being used
   */
  private readonly network: Network
  /**
   * Maximum taker fee at the max_oi_imbalance
   */
  public readonly maxTakerFee: number
  /**
   * Minimum taker fee at equal oi
   */
  public readonly minTakerFee: number
  /**
   * Max maker fee at equal oi
   */
  public readonly maxMakerFee: number
  /**
   * Min maker fee at large oi imbalance
   */
  public readonly minMakerFee: number
  /**
   * The minimum funding rate
   */
  public readonly minFundingRate: number

  /**
   * The maximum funding rate
   */
  public readonly maxFundingRate: number
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
   * The total long margin of this market
   */
  public readonly longMargin: BigNumber
  /**
   * A rebase representing all long margin (in M)
   * elastic = long margin, base = shares of long margin
   */
  public readonly longMarginRebase: Rebase
  /**
   * The total short margin of this market
   */
  public readonly shortMargin: BigNumber
  /**
   * A rebase representing all short margin (in M)
   * elastic = short margin, base = shares of short margin
   */
  public readonly shortMarginRebase: Rebase
  /**
   * Long open interest in musd
   */
  public readonly longOpenInterest: BigNumber
  /**
   * Short open interest in musd
   */
  public readonly shortOpenInterest: BigNumber
  /**
   * The max total oi allowed for the long & short sides
   */
  public readonly maxOpenInterest: BigNumber
  /**
   * The max allowed imbalance between long and short oi
   */
  public readonly maxOpenInterestImbalance: BigNumber
  /**
   * The max leverage for this market
   */
  public readonly maxLeverage: number
  /**
   * The percent fee given to liquidators
   */
  public readonly liquidationFee: number
  /**
   * The base percent maintenance margin
   */
  public readonly baseMaintenanceMargin: number
  /**
   * The base mUSD position limit for a new trade
   */
  public readonly basePositionLimit: BigNumber
  /**
   * The max mUSD position limit for a new trade
   */
  public readonly maxPositionLimit: BigNumber
  /**
   * The exchange rate of the asset A
   */
  public readonly exchangeRate: BigNumber
  /**
   * The min mUSD order size for this market
   */
  public readonly minOrderSize: BigNumber
  /**
   * If the market is frozen
   */
  public readonly longCloseOnly: boolean
  /**
   * If the market is in an emergency
   */
  public readonly shortCloseOnly: boolean

  /**
   * Construct an instance of Market
   * @param moduleResources resources for the market account (MIRAGE_ACCOUNT)
   * @param marginCoin the margin asset of the market
   * @param perpetualAsset the asset being traded
   */
  constructor(
    moduleResources: AccountResource[],
    marginCoin: MoveCoin | string,
    perpetualAsset: Perpetual | string,
    network: Network | string = Network.MAINNET
  ) {
    this.marginCoin = marginCoin as MoveCoin
    this.perpetualAsset = perpetualAsset as Perpetual
    this.network = getNetwork(network)

    const marketType = `${mirageAddress()}::market::Market<${coinInfo(this.marginCoin).type}, ${
      assetInfo(this.perpetualAsset).type
    }>`
    const oracleType = `${mirageAddress()}::pyth_oracle::Oracle<$${assetInfo(this.perpetualAsset).type}>`

    const market = moduleResources.find((resource) => resource.type === marketType)
    const oracle = moduleResources.find((resource) => resource.type === oracleType)

    // fees
    this.maxTakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.max_taker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.minTakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.min_taker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.maxMakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.max_maker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.minMakerFee = !!market
      ? new BigNumber((market.data as any).config.fees.min_maker_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.liquidationFee = !!market
      ? new BigNumber((market.data as any).config.fees.liquidation_fee).div(PERCENT_PRECISION).times(100).toNumber()
      : 0

    // funding
    this.nextFundingRate = !!market
      ? new BigNumber((market.data as any).next_funding_rate).div(FUNDING_PRECISION)
      : ZERO
    this.nextFundingPos = !!market ? Boolean((market.data as any).next_funding_pos) : false
    this.lastFundingUpdate = !!market ? new BigNumber((market.data as any).last_funding_round) : ZERO
    this.fundingInterval = !!market ? new BigNumber((market.data as any).config.funding.funding_interval) : ZERO
    this.poolFundingDiscount = !!market
      ? new BigNumber((market.data as any).config.funding.pool_funding_discount)
      : ZERO
    this.minFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.min_funding_rate).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.maxFundingRate = !!market
      ? new BigNumber((market.data as any).config.funding.max_funding_rate).div(PERCENT_PRECISION).times(100).toNumber()
      : 0

    // margin
    this.longMarginRebase = !!market
      ? new Rebase(
          BigNumber((market.data as any).long_margin.elastic.value),
          BigNumber((market.data as any).long_margin.base)
        )
      : new Rebase(ZERO, ZERO)
    this.longMargin = this.longMarginRebase.elastic
    this.shortMarginRebase = !!market
      ? new Rebase(
          BigNumber((market.data as any).short_margin.elastic.value),
          BigNumber((market.data as any).short_margin.base)
        )
      : new Rebase(ZERO, ZERO)
    this.shortMargin = this.shortMarginRebase.elastic

    // open interest
    this.longOpenInterest = !!market ? new BigNumber((market.data as any).long_oi) : ZERO
    this.shortOpenInterest = !!market ? new BigNumber((market.data as any).short_io) : ZERO
    this.maxOpenInterest = !!market ? new BigNumber((market.data as any).config.max_oi) : ZERO
    this.maxOpenInterestImbalance = !!market ? new BigNumber((market.data as any).config.max_oi_imbalance) : ZERO

    // other params
    this.maxLeverage = !!market
      ? new BigNumber((market.data as any).config.max_leverage).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.baseMaintenanceMargin = !!market
      ? new BigNumber((market.data as any).config.base_maintenance_margin).div(PERCENT_PRECISION).times(100).toNumber()
      : 0
    this.basePositionLimit = !!market ? new BigNumber((market.data as any).config.base_position_limit) : ZERO
    this.maxPositionLimit = !!market ? new BigNumber((market.data as any).config.max_position_limit) : ZERO

    this.exchangeRate = !!oracle ? new BigNumber((oracle.data as any).last_parsed_rate) : ZERO

    this.minOrderSize = !!market ? new BigNumber((market.data as any).config.min_order_size) : ZERO

    this.longCloseOnly = !!market ? Boolean((market.data as any).long_close_only) : false
    this.shortCloseOnly = !!market ? Boolean((market.data as any).short_close_only) : false
  }

  /**
   * Get a Ui friendly long margin of the market
   * @returns the markets long margin
   */
  public getUiLongMargin(): number {
    return this.longMargin.div(PRECISION_8).toNumber()
  }

  /**
   * Get a Ui friendly short margin of the market
   * @returns the markets short margin
   */
  public getUiShortMargin(): number {
    return this.shortMargin.div(PRECISION_8).toNumber()
  }

  /**
   * Get an estimate of the current fee
   * @returns the fee in basis points
   */
  public async estimate_fee(
    positionSize: number,
    perpetualPrice: number,
    isLong: boolean,
    isClose: boolean
  ): Promise<number> {
    const size = new BigNumber(positionSize).times(BigNumber(10).pow(8))
    const price = new BigNumber(perpetualPrice).times(BigNumber(10).pow(8))
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::market::estimate_fee`,
      type_arguments: [coinInfo(this.marginCoin).type, assetInfo(this.perpetualAsset).type],
      arguments: [size, price, isLong, isClose],
    })
    return ret[0] as number
  }
}
