import BigNumber from 'bignumber.js'

import { ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'

/**
 * Represent Rewards struct.
 * Stores info about the global vote-escrow rewards data.
 */
export class Rewards {
  /**
   * The base reward rate.
   */
  public readonly baseRewardRate: BigNumber
  /**
   * The last time rewards were updated.
   */
  public readonly lastUpdated: BigNumber

  /**
   * Construct an instance of UserInfo
   * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
   */
  constructor(moduleResources: AccountResource[]) {
    const moveType = `${mirageAddress()}::ve_mirage::Rewards`

    console.debug(`attempting to get data for type: ${moveType}`)

    const rewards = moduleResources.find((resource) => resource.type === moveType)

    console.debug(`found data: ${rewards}`)

    this.baseRewardRate = !!rewards ? BigNumber((rewards.data as any).baseRewardRate) : ZERO
    this.lastUpdated = !!rewards ? BigNumber((rewards.data as any).lastUpdated) : ZERO
  }
}
