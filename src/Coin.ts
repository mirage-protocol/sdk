import BigNumber from 'bignumber.js'

import { PRECISIONS, Resource, TYPES, ValidMoveCoin } from './constants/types'

export default class Coin {
  balance: BigNumber

  constructor(resources: Resource[], coin: ValidMoveCoin) {
    const coinStore = resources.find((resource) => resource.type == `0x1::coin::CoinStore<${TYPES[coin]}>`)

    this.balance = !!coinStore
      ? new BigNumber((coinStore.data as any).coin.value).div(BigNumber(10).pow(PRECISIONS[coin]))
      : new BigNumber(0)
  }
}
