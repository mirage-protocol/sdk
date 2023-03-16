import BigNumber from 'bignumber.js'

import { EXCHANGE_RATE_PRECISION, ZERO } from './constants'
import { AccountResource, MIRAGE_ADDRESS } from './constants/accounts'
import { balanceToUi, coinInfo, MoveCoin } from './constants/coinList'
import Vault from './Vault'

/**
 * Represent an UserInfo struct.
 * Stores info about a user's deposits and borrows in a specific vault
 */
export default class UserInfo {
  /**
   * The UserInfo type for this vault
   */
  public readonly userInfoType: string
  /**
   * The collateral asset of the vault
   */
  public readonly collateral: MoveCoin
  /**
   * The borrow asset of the vault (a mirage asset e.g. mUSD)
   */
  public readonly borrow: MoveCoin
  /**
   * The amount of collateral the user has deposited
   */
  public readonly userCollateral: BigNumber
  /**
   * The amount the user has borrowed
   */
  public readonly userBorrow: BigNumber
  /**
   * The liquidation price of this user's position (precision: 1e8)
   */
  public readonly liquidationPrice: BigNumber
  /**
   * The user's max borrowable amount to still be solvent
   */
  public readonly remainingBorrowable: BigNumber
  /**
   * The user's max withdrawable amount to still be solvent
   */
  public readonly withdrawableAmount: BigNumber
  /**
   * A scale of how healthy the users position is (precision: 1e5)
   * Position health of 0 => the position can be liquidation
   */
  public readonly positionHealth: number // basis points
  /**
   * An instance of the Vault for this UserInfo
   */
  public readonly vault: Vault

  /**
   * Construct an instance of UserInfo
   * @param userResources resources for specific user account
   * @param moduleResources resources for the vault account (MIRAGE_ACCOUNT)
   * @param collateral the collateral asset of the vault
   * @param borrow the borrow asset of the vault
   */
  constructor(
    userResources: AccountResource[],
    moduleResources: AccountResource[],
    collateral: MoveCoin,
    borrow: MoveCoin
  ) {
    this.vault = new Vault(moduleResources, collateral, borrow)
    this.collateral = collateral
    this.borrow = borrow

    this.userInfoType = `${MIRAGE_ADDRESS}::vault::UserInfo<${coinInfo(collateral).type}, ${coinInfo(borrow).type}>`

    const user = userResources.find((resource) => resource.type == this.userInfoType)

    this.userCollateral = !!user ? new BigNumber((user.data as any).user_collateral) : ZERO
    this.userBorrow =
      !!user && !!this.vault
        ? this.vault.borrowRebase.toElastic(new BigNumber((user.data as any).user_borrow_part), true)
        : ZERO

    this.liquidationPrice =
      !!user && !!this.vault
        ? this.userBorrow
            .times(EXCHANGE_RATE_PRECISION)
            .div(this.userCollateral)
            .div(this.vault.collateralizationPercent)
            .div(100)
        : ZERO

    const maxBorrow =
      !!user && !!this.vault
        ? this.userCollateral
            .times(this.vault.exchangeRate)
            .div(EXCHANGE_RATE_PRECISION)
            .times(this.vault.collateralizationPercent)
            .div(100)
        : ZERO

    const maxCollateral =
      !!user && !!this.vault ? this.userCollateral.times(this.vault.collateralizationPercent).div(100) : ZERO

    const ratio =
      !!user && !!this.vault
        ? this.userBorrow
            .times(EXCHANGE_RATE_PRECISION)
            .div(this.vault.exchangeRate)
            .times(10000)
            .div(maxCollateral)
            .toNumber()
        : 0

    const minCollateral =
      !!user && !!this.vault
        ? this.userBorrow
            .times(EXCHANGE_RATE_PRECISION)
            .div(this.vault.exchangeRate)
            .div(this.vault.collateralizationPercent)
            .div(100)
        : ZERO

    this.positionHealth = ratio > 10000 ? 0 : 10000 - ratio
    this.remainingBorrowable = !!user ? maxBorrow.minus(this.userBorrow) : ZERO
    this.withdrawableAmount = !!user ? this.userCollateral.minus(minCollateral) : ZERO
  }

  /**
   * Get a Ui friendly total collateral of the user
   * @returns the users total collateral
   */
  public getUiUserCollateral(): number {
    return balanceToUi(this.userCollateral, this.collateral)
  }

  /**
   * Get a Ui friendly total borrow of the user
   * @returns the users total borrow
   */
  public getUiUserBorrow(): number {
    return balanceToUi(this.userBorrow, this.borrow)
  }

  /**
   * Checks if a user is solvent with a hypothetical exchange rate.
   * @param exchangeRate the rate to test the solvency of the user position against
   * @returns is the user solvent at this rate
   */
  public simulateIsSolvent(exchangeRate: BigNumber): boolean {
    return this.userCollateral
      .div(this.vault.collateralizationPercent)
      .times(exchangeRate)
      .times(100)
      .isGreaterThan(this.userBorrow)
  }
}
