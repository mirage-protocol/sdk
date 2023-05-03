import BigNumber from 'bignumber.js'

import { ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { Rebase } from '../rebase'

/**
 * Represent VeMirage struct.
 * Stores info about the global vote-escrow lock data.
 */
export class VeMirage {
  /**
   * The rebase representing mirage locked and accrued rewards.
   */
  public readonly lock: Rebase
  /**
   * The total locked mirage tokens.
   */
  public readonly totalLocked: BigNumber
  /**
   * The total veMira supplied.
   */
  public readonly totalSupply: BigNumber

  /**
   * Construct an instance of UserInfo
   * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
   */
  constructor(moduleResources: AccountResource[]) {
    const veMirageType = `${mirageAddress()}::ve_mirage::VeMirage`

    console.debug(`attempting to get data for type: ${veMirageType}`)

    const veMirage = moduleResources.find((resource) => resource.type === veMirageType)

    console.debug(`found data: ${veMirage}`)

    this.lock = !!veMirage
      ? new Rebase(BigNumber((veMirage.data as any).lock.elastic), BigNumber((veMirage.data as any).lock.base))
      : new Rebase(ZERO, ZERO)

    this.totalLocked = !!veMirage ? BigNumber((veMirage.data as any).total_locked) : ZERO
    this.totalSupply = !!veMirage ? BigNumber((veMirage.data as any).total_supply) : ZERO
  }
}
