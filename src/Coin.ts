import BigNumber from 'bignumber.js'

import { ZERO } from './constants'
import { AccountResource } from './constants/accounts'
import { mirageCoinList, MoveCoin } from './constants/coinList'

export default class Coin {
  public readonly name: string
  public readonly symbol: string
  public readonly decimals: number

  public readonly balance: BigNumber
  public readonly coinType: MoveCoin
  public readonly precision: BigNumber

  constructor(resources: AccountResource[] | null | undefined, coinType: MoveCoin) {
    const { name, symbol, decimals, type } = mirageCoinList[coinType]

    const precision = BigNumber(10).pow(decimals)

    this.name = name
    this.symbol = symbol
    this.decimals = decimals
    this.coinType = coinType
    this.precision = precision
    this.balance = ZERO

    if (!!resources) {
      const coinStore = resources.find((resource) => resource.type == `0x1::coin::CoinStore<${type}>`)
      this.balance = !!coinStore ? new BigNumber((coinStore.data as any).coin.value).div(precision) : ZERO
    }
  }
}
