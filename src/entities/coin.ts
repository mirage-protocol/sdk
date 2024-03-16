import { InputViewRequestData, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { aptosClient, getNetwork, ZERO } from '../constants'
import { AccountResource } from '../constants/accounts'
import { moveAssetInfo, MoveCoin } from '../constants/assetList'

/**
 * Represents an on-chain CoinStore with a unique type and stores some metadata.
 * Holds the balance of a given user's resources.
 */
export class Coin {
  /**
   * The coin type
   */
  public readonly type: string
  /**
   * The coin represented by the class
   */
  public readonly coin: MoveCoin
  /**
   * The current network being used
   */
  private readonly network: Network
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
  constructor(
    resources: AccountResource[] | null | undefined,
    coin: MoveCoin | string,
    network: Network | string = Network.MAINNET
  ) {
    const { name, symbol, decimals, type } = moveAssetInfo(coin)

    const precision = BigNumber(10).pow(decimals)

    this.network = getNetwork(network)
    this.type = type
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
   * Get the coin's total supply (no precision)
   * @returns The coin's current supply
   */
  public async getTotalSupply(): Promise<BigNumber> {
    const payload: InputViewRequestData = {
      function: `0x1::coin::supply`,
      functionArguments: [],
    }
    const view = await aptosClient(this.network).view({ payload })
    const { vec } = view[0] as any
    return BigNumber(vec[0]).div(BigNumber(10).pow(this.decimals))
  }
}
