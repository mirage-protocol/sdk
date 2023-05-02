import BigNumber from 'bignumber.js'

import { getPriceFeed, INTEREST_PRECISION, SECONDS_PER_YEAR, ZERO } from '../constants'
import { AccountResource, mirageAddress } from '../constants/accounts'
import { balanceToUi, coinInfo, MoveCoin } from '../constants/coinList'
import { Rebase } from './rebase'

/**
 * Represents a mirage-protocol Vault.
 * Deposit collateral and borrow "mirage-assets".
 */
export class Trade {
  /**
   * The vaults type
   */
  public readonly tradeType: string
  /**
   * The base asset of the market
   */
  public readonly base: MoveCoin
  /**
   * The underlying asset of the market
   */
  public readonly underlying: MoveCoin
  /**
  /// The opening price of the trade (0 if trade is resting)
  */
  public readonly openingPrice: BigNumber
   /**
  /// The opening price of the trade (0 if trade is resting)
  */
  public readonly long: boolean 


  constructor(moduleResources: AccountResource[], base: MoveCoin | string, underlying: MoveCoin | string) {
    this.base = underlying as MoveCoin
    this.underlying = base as MoveCoin

    this.tradeType = `${mirageAddress()}::market::Trade<${coinInfo(base).type}, ${coinInfo(underlying).type}>`

    console.debug(`attempting to get data for type: ${this.tradeType}`)

    const trade = moduleResources.find((resource) => resource.type === this.vaultType)

    console.debug(`found data: ${trade}`)

    this.openingPrice = !!trade ? BigNumber((trade.data as any).opening_price) : ZERO
    this.long = !!trade ? Boolean((trade.data as any).long) : false
    // this.margin = !!trade ? (100 * Number((vault.data as any).collateralization_rate)) / 10000 : 0
    // this.liquidationPercent = !!vault ? (100 * Number((vault.data as any).liquidation_multiplier)) / 10000 : 0


  }

}
