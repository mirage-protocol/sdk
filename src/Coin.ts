import BigNumber from 'bignumber.js'

import { PRECISIONS, Resource, TYPES, ValidMoveCoin } from './constants/types'

export default class Coin {
  balance: BigNumber
  coinType: ValidMoveCoin
  precision: BigNumber

  constructor(resources: Resource[] | null | undefined, coinType: ValidMoveCoin) {
    const precision = BigNumber(10).pow(PRECISIONS[coinType])
    this.precision = precision
    this.coinType = coinType
    if (!resources) this.balance = new BigNumber(0)
    else {
      const coinStore = resources.find((resource) => resource.type == `0x1::coin::CoinStore<${TYPES[coinType]}>`)
      this.balance = !!coinStore ? new BigNumber((coinStore.data as any).coin.value).div(precision) : new BigNumber(0)
    }
  }
}
