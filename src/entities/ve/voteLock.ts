import BigNumber from 'bignumber.js'

import { aptosClient, balanceToUi, getNetwork, MoveCoin, Network, ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { VeMirage } from './veMirage'

/**
 * Represent VoteLock struct.
 * Stores info about the global vote-escrow lock data.
 */
export class VoteLock {
  /**
   * The user address for this VoteLock
   */
  private readonly userAddress: string
  /**
   * The current network being used
   */
  private readonly network: Network
  /**
   * The base amount of MIRA the user has locked.
   */
  public readonly locked: BigNumber
  /**
   * The time when the user can withdraw entire all locked MIRA.
   */
  public readonly unlockTime: number
  /**
   * The time when the user initially locked MIRA.
   */
  public readonly lockTime: number
  /**
   * The length of the lock in seconds
   */
  public readonly lockLength: number
  /**
   * The users reward multiplier for lock time.
   */
  public readonly multiplier: BigNumber
  /**
   * The current percentage penalty for unlocking this stake early
   */
  public readonly currentPenalty: number
  /**
   * An instance of VeMirage for this VoteLock
   */
  public readonly veMirage: VeMirage

  /**
   * Construct an instance of UserInfo
   * @param userAddress the address of the userResources's account
   * @param userResources resources for the user account
   * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
   * @param network the current network, defaulting to mainnet
   */
  constructor(
    userAddress: string,
    userResources: AccountResource[],
    moduleResources: AccountResource[],
    network: Network | string = Network.MAINNET
  ) {
    this.userAddress = userAddress
    this.network = getNetwork(network)

    const voteLockType = `${mirageAddress()}::ve_mirage::VoteLock`

    console.debug(`attempting to get data for type: ${voteLockType}`)

    const voteLock = userResources.find((resource) => resource.type === voteLockType)

    console.debug(`found data: ${voteLock}`)

    this.veMirage = new VeMirage(moduleResources)

    this.locked = !!voteLock ? BigNumber((voteLock.data as any).locked) : ZERO
    this.unlockTime = !!voteLock ? (voteLock.data as any).unlock_time : 0
    this.lockTime = !!voteLock ? (voteLock.data as any).lock_time : 0
    this.multiplier = !!voteLock ? BigNumber((voteLock.data as any).multiplier) : ZERO
    this.lockLength = this.unlockTime - this.lockTime

    const now = Date.now() / 1000

    this.currentPenalty =
      !!voteLock && !!this.veMirage
        ? (this.veMirage.maxUnlockPenalty * (this.unlockTime - now)) / (this.unlockTime - this.lockTime)
        : 0
  }

  /**
   * Get whether or not the user has an open lock
   * @returns Whether the user has an open lock
   */
  public lockOpen(): boolean {
    return !this.locked.eq(ZERO)
  }

  /**
   * Get the user's locked amount (no precision)
   * @returns The ve supply divided by the precision
   */
  public getUiLocked(): number {
    return balanceToUi(this.locked, MoveCoin.MIRA)
  }

  /**
   * Get the remaining on the user's lock
   * @returns The time remaining in seconds
   */
  public getTimeRemaining(): number {
    const now = Date.now() / 1000
    if (this.unlockTime < now) return 0
    else return this.unlockTime - now
  }

  /**
   * Get the total earned rewards for this user's locked stake (no precision)
   * @returns The user's total earned rewards
   */
  public async earnedRewards(): Promise<number> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::ve_mirage::earned_rewards`,
      type_arguments: [],
      arguments: [this.userAddress],
    })
    return BigNumber(ret[0] as any)
      .div(BigNumber(10).pow(8))
      .toNumber()
  }

  /**
   * Get the user's current veMirage balance (no precision)
   * @returns The user's current veMirage balance
   */
  public async getVeBalance(): Promise<number> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::ve_mirage::ve_balance`,
      type_arguments: [],
      arguments: [this.userAddress],
    })
    return BigNumber(ret[0] as any)
      .div(BigNumber(10).pow(8))
      .toNumber()
  }
}
