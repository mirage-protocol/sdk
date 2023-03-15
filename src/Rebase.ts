import BigNumber from 'bignumber.js'

export default class Rebase {
  public readonly elastic: BigNumber
  public readonly base: BigNumber

  constructor(elastic: BigNumber, base: BigNumber) {
    this.elastic = elastic
    this.base = base
  }

  toElastic(base: BigNumber, roundUp: boolean): BigNumber {
    let elastic = BigNumber(0)
    if (this.base.isZero()) {
      elastic = this.base
    } else {
      elastic = base.times(this.elastic).div(this.base)
      if (roundUp && elastic.times(this.base).div(this.elastic).isLessThan(base)) {
        elastic.plus(1)
      }
    }
    return elastic
  }
}
