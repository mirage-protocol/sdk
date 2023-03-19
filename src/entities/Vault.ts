import BigNumber from 'bignumber.js'

import { INTEREST_PRECISION, SECONDS_PER_YEAR, ZERO } from '../constants'
import { AccountResource, mirageAddress } from '../constants/accounts'
import { balanceToUi, coinInfo, MoveCoin } from '../constants/coinList'
import { Rebase } from './rebase'

/**
 * Represents a mirage-protocol Vault.
 * Deposit collateral and borrow "mirage-assets".
 */
export class Vault {
  /**
   * The vaults type
   */
  public readonly vaultType: string
  /**
   * The collateral asset of the vault
   */
  public readonly collateral: MoveCoin
  /**
   * The borrow asset of the vault (a mirage asset e.g. mUSD)
   */
  public readonly borrow: MoveCoin
  /**
   * The rebase representing the total borrow in the vault
   */
  public readonly borrowRebase: Rebase
  /**
   * The total collateral deposited in this vault
   */
  public readonly totalCollateral: BigNumber
  /**
   * The total borrowed from this vault
   */
  public readonly totalBorrow: BigNumber
  /**
   * The interest rate of this vault (precision: 1e12)
   */
  public readonly interestPerSecond: BigNumber
  /**
   * The minimum a position must be collateralized in the vault (percent)
   */
  public readonly collateralizationPercent: number
  /**
   * The flat borrow fee for the vault (percent)
   */
  public readonly borrowFeePercent: number
  /**
   * The last cached exchange rate of the vault (precision: 1e8)
   * This price is collateral / borrow
   */
  public readonly exchangeRate: BigNumber
  /**
   * The percent taken as a protocol/liquidator cut during a liquidation
   */
  public readonly liquidationPercent: number

  /**
   * Construct an instance of Vault
   * @param moduleResources resources for the vault account (MIRAGE_ACCOUNT)
   * @param collateral the collateral asset of the vault
   * @param borrow the borrow asset of the vault
   */
  constructor(moduleResources: AccountResource[], collateral: MoveCoin | string, borrow: MoveCoin | string) {
    this.collateral = collateral as MoveCoin
    this.borrow = borrow as MoveCoin

    this.vaultType = `${mirageAddress()}::vault::Vault<${coinInfo(collateral).type}, ${coinInfo(borrow).type}>`

    const vault = moduleResources.find((resource) => resource.type == this.vaultType)

    this.borrowFeePercent = !!vault ? (100 * Number((vault.data as any).borrow_fee)) / 10000 : 0
    this.interestPerSecond = !!vault ? BigNumber((vault.data as any).interest_per_second) : ZERO
    this.collateralizationPercent = !!vault ? (100 * Number((vault.data as any).collateralization_rate)) / 10000 : 0
    this.liquidationPercent = !!vault ? (100 * Number((vault.data as any).liquidation_multiplier)) / 10000 : 0

    this.exchangeRate = !!vault ? BigNumber((vault.data as any).cached_exchange_rate) : ZERO

    this.totalBorrow = !!vault ? BigNumber((vault.data as any).borrow.elastic) : ZERO
    this.totalCollateral = !!vault ? BigNumber((vault.data as any).collateral.value) : ZERO

    this.borrowRebase = !!vault
      ? new Rebase(BigNumber((vault.data as any).borrow.elastic), BigNumber((vault.data as any).borrow.base))
      : new Rebase(ZERO, ZERO)
  }

  /**
   * Get a Ui friendly total collateral of the vault
   * @returns the vault's total collateral
   */
  public getUiTotalCollateral(): number {
    return balanceToUi(this.totalCollateral, this.collateral)
  }

  /**
   * Get a Ui friendly total borrow of the vault
   * @returns the vault's total borrow
   */
  public getUiTotalBorrow(): number {
    return balanceToUi(this.totalBorrow, this.borrow)
  }

  /**
   * Get a Ui friendly vault interest rate
   * @returns the interest rate in a percent
   */
  public getUiInterestRate(): number {
    return (Number(this.interestPerSecond) / Number(INTEREST_PRECISION)) * SECONDS_PER_YEAR * 100
  }

  /**
   * Get the rebase representing this vaults borrows
   * @returns the vault borrow elastic numbers
   */
  public getBorrowRebase(): Rebase {
    return this.borrowRebase
  }
}
