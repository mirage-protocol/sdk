import BigNumber from 'bignumber.js'

type LockedStakeData = {
  id: BigNumber
  start: number
  end: number
  liquidity: BigNumber
}

/**
 * Represents the Oasis LockedStake struct
 */
export class LockedStake {
  /**
   * The stake id
   */
  public readonly id: BigNumber
  /**
   * The start time of the lock
   */
  public readonly start: number
  /**
   * The end time of the lock
   */
  public readonly end: number
  /**
   * The liquidity in this lock
   */
  public readonly liquidity: BigNumber

  /**
   * Initialize a LockedStake
   * @param lockedStake a LockedStakeData object
   */
  constructor(lockedStake: LockedStakeData) {
    this.id = lockedStake.id
    this.start = lockedStake.start
    this.end = lockedStake.end
    this.liquidity = lockedStake.liquidity
  }
}
