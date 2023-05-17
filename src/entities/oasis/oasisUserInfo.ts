import { Network } from 'aptos'
import BigNumber from 'bignumber.js'

import { AccountResource, aptosClient, coinInfo, getNetwork, mirageAddress, MoveCoin, ZERO } from '../../constants'
import { LockedStake } from './lockedStake'
import { Oasis } from './oasis'

/**
 * Represents the Oasis UserInfo struct
 */
export class OasisUserInfo {
  /**
   * The user address for this VoteLock
   */
  private readonly userAddress: string
  /**
   * The current network being used
   */
  private readonly network: Network
  /**
   * The total liquidity this user has locked
   */
  public readonly totalLiquidity: BigNumber
  /**
   * The total weight of all the user's lock
   */
  public readonly totalWeight: BigNumber
  /**
   * The user's locked stakes
   */
  public readonly lockedStakes: LockedStake[]
  /**
   * First of the coins in the LP
   */
  public readonly coinOne: MoveCoin
  /**
   * Second of the coins in the LP
   */
  public readonly coinTwo: MoveCoin
  /**
   * The oasis the user is staking in
   */
  public readonly oasis: Oasis

  /**
   * Construct an instance of OasisUserInfo
   * @param userAddress the address of the userResources's account
   * @param userResources resources for the user account
   * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
   * @param network the current network, defaulting to mainnet
   */
  constructor(
    userAddress: string,
    userResources: AccountResource[],
    moduleResources: AccountResource[],
    coinOne: string,
    coinTwo: string,
    network: Network | string = Network.MAINNET
  ) {
    this.userAddress = userAddress
    this.network = getNetwork(network)

    const oasisUserType = `${mirageAddress()}::oasis::UserInfo`

    const userInfo = userResources.find((resource) => resource.type === oasisUserType)
    this.oasis = new Oasis(moduleResources, coinOne, coinTwo)

    this.coinOne = this.oasis.coinOne
    this.coinTwo = this.oasis.coinTwo

    this.totalLiquidity = !!userInfo ? BigNumber((userInfo.data as any).liquidity) : ZERO
    this.totalWeight = !!userInfo ? BigNumber((userInfo.data as any).weight) : ZERO

    const stakesArr = !!userInfo ? (userInfo.data as any).locked_stakes : []

    const tempStakes: LockedStake[] = []
    for (const lockedStake of stakesArr) {
      tempStakes.push(new LockedStake(lockedStake))
    }
    this.lockedStakes = tempStakes
  }

  /**
   * Get the current earned rewards of a user
   * @returns The amount of rewards pending (no precision)
   */
  public async getEarnedRewards(): Promise<number> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::oasis::earned`,
      type_arguments: [coinInfo(this.coinOne).type, coinInfo(this.coinTwo).type],
      arguments: [this.userAddress],
    })
    return BigNumber(ret[0] as any)
      .div(BigNumber(10).pow(8))
      .toNumber()
  }

  public async getVeForCurrLiqMaxBoost(): Promise<number> {
    return await this.oasis.getVeForMaxBoost(this.totalLiquidity)
  }

  public async getVeForAddedLiqMaxBoost(additional: BigNumber): Promise<number> {
    return await this.oasis.getVeForMaxBoost(this.totalLiquidity.plus(additional))
  }
}
