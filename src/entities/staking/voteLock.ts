import BigNumber from 'bignumber.js'

import { aptosClient, getNetwork, Network, ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { VeMirage } from './veMirage'

/**
 * Represent VoteLock struct.
 * Stores info about the global vote-escrow lock data.
 */
export class VoteLock {
  private readonly userAddress: string
  private readonly network: Network
  /**
   * The base amount of MIRA the user has locked.
   */
  public readonly locked: BigNumber

  /**
   * The amount of Mirage locked initially.
   */
  public readonly initialLocked: BigNumber

  /**
   * The time when the user can withdraw entire all locked MIRA.
   */
  public readonly unlockTime: number

  /**
   * The time when the user initially locked MIRA.
   */
  public readonly lockTime: number

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
   * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
   */
  constructor(
    userAddress: string,
    userResources: AccountResource[],
    moduleResources: AccountResource[],
    network: Network | string = Network.MAINNET
  ) {
    this.userAddress = userAddress
    this.network = getNetwork(network)

    const voteLockType = `${mirageAddress()}::ve_mirage::VeMirage`

    console.debug(`attempting to get data for type: ${voteLockType}`)

    const voteLock = userResources.find((resource) => resource.type === voteLockType)

    console.debug(`found data: ${voteLock}`)

    this.veMirage = new VeMirage(moduleResources)

    this.locked =
      !!voteLock && !!this.veMirage
        ? this.veMirage.lock.toElastic(new BigNumber((voteLock.data as any).locked), true)
        : ZERO

    this.initialLocked = !!voteLock ? BigNumber((voteLock.data as any).initial_locked) : ZERO
    this.unlockTime = !!voteLock ? (voteLock.data as any).unlock_time : 0
    this.lockTime = !!voteLock ? (voteLock.data as any).lock_time : 0
    this.multiplier = !!voteLock ? BigNumber((voteLock.data as any).multiplier) : ZERO

    const now = Date.now() / 1000

    this.currentPenalty =
      !!voteLock && !!this.veMirage
        ? (this.veMirage.maxUnlockPenalty * (this.unlockTime - now)) / (this.unlockTime - this.lockTime)
        : 0
  }

  public async earnedRewards(): Promise<BigNumber> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::ve_mirage::earned_rewards`,
      type_arguments: [],
      arguments: [this.userAddress],
    })
    return BigNumber(ret[0] as any)
  }

  public async veBalance(): Promise<BigNumber> {
    const ret = await aptosClient(this.network).view({
      function: `${mirageAddress()}::ve_mirage::ve_balance`,
      type_arguments: [],
      arguments: [this.userAddress],
    })
    return BigNumber(ret[0] as any)
  }
}
