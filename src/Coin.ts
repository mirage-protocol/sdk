import * as Aptos from 'aptos'
import BigNumber from 'bignumber.js'

import { PRECISIONS, TYPES } from './constants/types'

export default class Coin {
  balance!: BigNumber

  constructor(resources: Aptos.Types.MoveResource[], ticker: string) {
    const coinStoreResource = resources.find((resource) => resource.type == `0x1::coin::CoinStore<${TYPES[ticker]}>`)

    this.balance = new BigNumber((coinStoreResource!.data as any).coin.value).times(
      BigNumber(10).pow(-PRECISIONS[ticker])
    )
  }
}
