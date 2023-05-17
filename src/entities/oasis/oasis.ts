import BigNumber from 'bignumber.js'

import {
  AccountResource,
  aptosClient,
  coinInfo,
  getNetwork,
  mirageAddress,
  MoveCoin,
  Network,
  ZERO,
} from '../../constants'
import { isSorted } from '../../utils'

/**
 * Represents Oasis and OasisConfig structs
 */
export class Oasis {
  /**
   * The current network being used
   */
  private readonly network: Network
  /**
   * The total liquidity locked in the Oasis
   */
  public readonly liquidity: BigNumber
  /**
   * First of the coins in the LP
   */
  public readonly coinOne: MoveCoin
  /**
   * Second of the coins in the LP
   */
  public readonly coinTwo: MoveCoin
  /**
   * The total weight of the pool
   */
  public readonly totalWeight: BigNumber
  /**
   * The reward rate of Mirage / sec
   */
  public readonly rewardRate: number
  /**
   * The max ve multiplier
   */
  public readonly maxVeMultiplier: number
  /**
   * The max time multiplier
   */
  public readonly maxTimeMultiplier: number
  /**
   * The oasis min lock time
   */
  public readonly minLockTime: number
  /**
   * The oasis max lock time
   */
  public readonly maxLockTime: number
  /**
   * Is the oasis in an all stakes unlocked mode
   */
  public readonly stakesUnlocked: boolean
  /**
   * Is the oasis in a paused state
   */
  public readonly stakingPaused: boolean
  /**
   * Is the oasis in a withdrawal paused state
   */
  public readonly withdrawalPaused: boolean
  /**
   * Is the oasis in a claiming paused state
   */
  public readonly claimingPaused: boolean

  /**
   * Construct an instance of Oasis.
   * @param moduleResources the mirage module account resources
   * @param coinOne the first coin in the LP pair
   * @param coinTwo the second coin in the LP pair
   */
  constructor(
    moduleResources: AccountResource[],
    coinOne: MoveCoin | string,
    coinTwo: MoveCoin | string,
    network: Network | string = Network.MAINNET
  ) {
    this.network = getNetwork(network)

    const correctSorting = isSorted(coinInfo(coinOne).type, coinInfo(coinTwo).type)

    this.coinOne = correctSorting ? (coinOne as MoveCoin) : (coinTwo as MoveCoin)
    this.coinTwo = correctSorting ? (coinTwo as MoveCoin) : (coinOne as MoveCoin)

    const oasisType = `${mirageAddress()}::oasis::Oasis<${coinInfo(coinOne).type}, ${coinInfo(coinTwo).type}>`
    const oasisConfigType = `${mirageAddress()}::oasis::OasisConfig<${coinInfo(coinOne).type}, ${
      coinInfo(coinTwo).type
    }>`

    const oasis = moduleResources.find((resource) => resource.type === oasisType)
    const oasisConfig = moduleResources.find((resource) => resource.type === oasisConfigType)

    // oasis
    this.liquidity = !!oasis ? BigNumber((oasis.data as any).lp.value) : ZERO
    this.totalWeight = !!oasis ? BigNumber((oasis.data as any).total_weight) : ZERO
    this.rewardRate = !!oasis ? Number((oasis.data as any).reward_rate) : 0

    // config
    this.maxVeMultiplier = !!oasisConfig ? Number((oasisConfig.data as any).max_ve_multiplier) : 0
    this.maxTimeMultiplier = !!oasisConfig ? Number((oasisConfig.data as any).max_time_multiplier) : 0
    this.minLockTime = !!oasisConfig ? Number((oasisConfig.data as any).min_lock_time) : 0
    this.maxLockTime = !!oasisConfig ? Number((oasisConfig.data as any).max_lock_time) : 0

    // emergencies
    this.stakesUnlocked = !!oasis ? Boolean((oasis.data as any).stakes_unlocked) : false
    this.stakingPaused = !!oasis ? Boolean((oasis.data as any).staking_paused) : false
    this.withdrawalPaused = !!oasis ? Boolean((oasis.data as any).withdrawal_paused) : false
    this.claimingPaused = !!oasis ? Boolean((oasis.data as any).claiming_paused) : false
  }

  /**
   * Get the amount of ve needed to maximally boost an amount of lp
   * @returns The amount of ve needed (no precision)
   */
  public async getVeForMaxBoost(lpAmount: BigNumber): Promise<number> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::oasis::max_ve_for_amount`,
      type_arguments: [coinInfo(this.coinOne).type, coinInfo(this.coinTwo).type],
      arguments: [lpAmount],
    })
    return BigNumber(ret[0] as any)
      .div(BigNumber(10).pow(8))
      .toNumber()
  }

  /**
   * Get the worth of the entire pool in usd
   * @returns The amount of usd (no precision)
   */
  public async getPoolUsd(): Promise<number> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::oasis_converter::convert`,
      type_arguments: [coinInfo(this.coinOne).type, coinInfo(this.coinTwo).type],
      arguments: [this.liquidity],
    })
    return BigNumber(ret[0] as any)
      .div(BigNumber(10).pow(8))
      .toNumber()
  }
}
