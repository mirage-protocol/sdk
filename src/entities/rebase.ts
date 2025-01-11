import BigNumber from 'bignumber.js'

import { PRECISION_8 } from '../utils'

/**
 * Represents an elastic rebase number
 * See: https://github.com/mirage-protocol/rebase
 */
export class Rebase {
  /**
   * The elastic part of the rebase
   */
  public readonly elastic: BigNumber
  /**
   * The base part of the rebase
   */
  public readonly base: BigNumber

  /**
   * Construct an instance of rebase
   * @param elastic the elastic part
   * @param base the base part
   */
  constructor(elastic: BigNumber, base: BigNumber) {
    this.elastic = elastic
    this.base = base
  }

  /**
   * Get a elastic value represented in terms of the current rebase.
   * @param base the base value to convert
   * @param roundUp should we roundup the division
   * @returns the converted elastic part
   */
  public toElastic(base: BigNumber, roundUp: boolean): BigNumber {
    if (this.base.isZero()) {
      return BigNumber(0)
    }
    const scaledBase = base.times(PRECISION_8)
    let elastic = scaledBase.times(this.elastic).div(this.base)
    if (roundUp) {
      elastic = elastic.integerValue(BigNumber.ROUND_CEIL)
    } else {
      elastic = elastic.integerValue(BigNumber.ROUND_FLOOR)
    }
    return elastic.div(1e8) // Convert back to normal scale by dividing by E8
  }

  /**
   * Get a base value represented in terms of the current rebase.
   * @param elastic the elastic value to convert
   * @param roundUp should we roundup the division
   * @returns the converted base part
   */
  toBase(elastic: BigNumber, roundUp: boolean): BigNumber {
    if (this.elastic.isZero()) {
      return BigNumber(0)
    }
    const scaledElastic = elastic.multipliedBy(PRECISION_8)
    let base = scaledElastic.times(this.base).div(this.elastic)
    if (roundUp) {
      base = base.integerValue(BigNumber.ROUND_CEIL)
    } else {
      base = base.integerValue(BigNumber.ROUND_FLOOR)
    }

    return base.div(PRECISION_8)
  }
}
