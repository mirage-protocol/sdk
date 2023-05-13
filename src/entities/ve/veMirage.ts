import BigNumber from 'bignumber.js'

import { balanceToUi, MoveCoin, ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'

/**
 * Represent VeMirage struct.
 * Stores info about the global vote-escrow lock data.
 */
export class VeMirage {
  /**
   * The total locked mirage tokens.
   */
  public readonly totalLocked: BigNumber
  /**
   * The total veMira supplied.
   */
  public readonly totalSupply: BigNumber
  /**
   * The maximum percentage unlock penalty for withdrawing early
   */
  public readonly maxUnlockPenalty: number
  /**
   * The minimum lock time (6 months)
   */
  public readonly minLockTime: number = 15780000
  /**
   * The maximum lock time (3 years)
   */
  public readonly maxLockTime: number = 94608000

  /**
   * The current percentage apr
   */
  public readonly baseApr: number

  /**
   * Construct an instance of UserInfo
   * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
   */
  constructor(moduleResources: AccountResource[]) {
    const veMirageType = `${mirageAddress()}::ve_mirage::VeMirage`
    const rewardsType = `${mirageAddress()}::ve_mirage::Rewards`

    console.debug(`attempting to get data for type: ${veMirageType}`)

    const veMirage = moduleResources.find((resource) => resource.type === veMirageType)
    const rewards = moduleResources.find((resource) => resource.type === rewardsType)

    console.debug(`found data: ${veMirage}`)

    this.totalLocked = !!veMirage ? BigNumber((veMirage.data as any).locked.value) : ZERO
    this.totalSupply = !!veMirage ? BigNumber((veMirage.data as any).total_supply) : ZERO

    this.maxUnlockPenalty = !!veMirage ? ((veMirage.data as any).max_unlock_penalty * 100) / 10000 : 0

    const rewardRate = !!rewards ? BigNumber((rewards.data as any).base_reward_rate) : ZERO

    if (rewardRate.gt(0)) {
      const rewardsPerYear = rewardRate.times(31536000)

      const apr = rewardsPerYear.div(this.totalLocked).toNumber()

      this.baseApr = apr * 100
    } else {
      this.baseApr = 0
    }
  }

  /**
   * Get the total locked Mirage supply (no precision)
   * @returns The ve supply divided by the precision
   */
  public getUiTotalLocked(): number {
    return balanceToUi(this.totalLocked, MoveCoin.MIRA)
  }

  /**
   * Get the total veMira supply (no precision)
   * @returns The ve supply divided by the precision
   */
  public getUiVeSupply(): number {
    return balanceToUi(this.totalSupply, MoveCoin.MIRA)
  }
}
