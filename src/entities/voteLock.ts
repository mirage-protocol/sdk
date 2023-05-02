import BigNumber from 'bignumber.js'

import { ZERO } from '../constants'
import { AccountResource, mirageAddress } from '../constants/accounts'
import { VeMirage } from './veMirage'

/**
 * Represent VoteLock struct.
 * Stores info about the global vote-escrow lock data.
 */
export class VoteLock {
  /**
   * The amount of MIRA the user has locked.
   */
  public readonly locked: BigNumber
  /**
   * The amount time multiplier.
   */
  public readonly scaledAmount: BigNumber
  /**
   * The time when the user can withdraw entire all locked MIRA.
   */
  public readonly unlockTime: BigNumber
  /**
   * The time when the user initially locked MIRA.
   */
  public readonly lockTime: BigNumber
  /**
   * The users reward multiplier for lock time.
   */
  public readonly multiplier: BigNumber

  /**
   * An instance of VeMirage for this VoteLock
   */
  public readonly veMirage: VeMirage

  /**
   * Construct an instance of UserInfo
   * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
   */
  constructor(userResources: AccountResource[], moduleResources: AccountResource[]) {
    const voteLockType = `${mirageAddress()}::ve_mirage::VeMirage`

    console.debug(`attempting to get data for type: ${voteLockType}`)

    const voteLock = userResources.find((resource) => resource.type === voteLockType)

    console.debug(`found data: ${voteLock}`)

    this.veMirage = new VeMirage(moduleResources)

    this.locked =
      !!voteLock && !!this.veMirage
        ? this.veMirage.lock.toElastic(new BigNumber((voteLock.data as any).locked), true)
        : ZERO

    this.scaledAmount = !!voteLock ? BigNumber((voteLock.data as any).scaledAmount) : ZERO
    this.unlockTime = !!voteLock ? BigNumber((voteLock.data as any).unlockTime) : ZERO
    this.lockTime = !!voteLock ? BigNumber((voteLock.data as any).lockTime) : ZERO
    this.multiplier = !!voteLock ? BigNumber((voteLock.data as any).multiplier) : ZERO
  }
}
