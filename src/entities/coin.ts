import BigNumber from 'bignumber.js'

import { ZERO } from '../constants'
import { AccountResource } from '../constants/accounts'
import { balanceToUi, coinInfo, MoveCoin } from '../constants/coinList'

/**
 * Represents an on-chain CoinStore with a unique type and stores some metadata.
 * Holds the balance of a given user's resources.
 */
export class Coin {
  /**
   * The coin represented by the class
   */
  public readonly coin: MoveCoin
  /**
   * The name of the coin
   */
  public readonly name: string
  /**
   * The coin symbol
   */
  public readonly symbol: string
  /**
   * The number of decimals the coin uses
   */
  public readonly decimals: number
  /**
   * The balance of the CoinStore found in the given resources
   */
  public readonly balance: BigNumber
  /**
   * The precision of the coin (e.g. 8 decimals = 100,000,000)
   */
  public readonly precision: BigNumber

  /**
   * Constructs an instance of Coin
   * @param resources resources of some account
   * @param coin which coin to find data for
   */
  constructor(resources: AccountResource[] | null | undefined, coin: MoveCoin | string) {
    const { name, symbol, decimals, type } = coinInfo(coin)

    const precision = BigNumber(10).pow(decimals)

    this.name = name
    this.symbol = symbol
    this.decimals = decimals
    this.coin = coin as MoveCoin
    this.precision = precision
    this.balance = ZERO

    if (!!resources) {
      const coinStore = resources.find((resource) => resource.type === `0x1::coin::CoinStore<${type}>`)
      this.balance = !!coinStore ? new BigNumber((coinStore.data as any).coin.value).div(precision) : ZERO
    }
  }

  /**
   * Get a Ui friendly balance
   * @returns The balance divided by the precision
   */
  public getUiBalance(): number {
    return balanceToUi(this.balance, this.coin)
  }
}
