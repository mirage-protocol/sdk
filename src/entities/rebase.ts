import BigNumber from 'bignumber.js'

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
   * Get a base value represented in terms of the current rebase.
   * @param base the base value to convert
   * @param roundUp should we roundup the division
   * @returns the converted elastic part
   */
  public toElastic(base: BigNumber, roundUp: boolean): BigNumber {
    if (this.base.isZero() || this.elastic.isZero()) {
      return this.base
    } else {
      const elastic = base.times(this.elastic).div(this.base)
      if (!elastic.isZero() && roundUp && elastic.times(this.base).div(this.elastic).isLessThan(base)) {
        return elastic.plus(1)
      } else {
        return elastic
      }
    }
  }
}
