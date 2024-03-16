import BigNumber from 'bignumber.js'

import { EXCHANGE_RATE_PRECISION, ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { balanceToUi, moveAssetInfo, MoveToken } from '../../constants/assetList'
import { Vault } from './vault'

/**
 * Represent an VaultUser struct.
 * Stores info about a user's deposits and borrows in a specific vault
 */
export class VaultUser {
  /**
   * The collateral asset of the vault
   */
  public readonly collateral: MoveToken
  /**
   * The borrow asset of the vault (a mirage asset e.g. mUSD)
   */
  public readonly borrow: MoveToken
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
   * An instance of the Vault for this VaultUser
   */
  public readonly vault: Vault

  /**
   * Construct an instance of VaultUser
   * @param userResources resources for specific user account
   * @param moduleResources resources for the vault account (MIRAGE_ACCOUNT)
   * @param collateral the collateral asset of the vault
   * @param borrow the borrow asset of the vault
   */
  constructor(
    userResources: AccountResource[],
    moduleResources: AccountResource[],
    collateral: MoveToken | string,
    borrow: MoveToken | string
  ) {
    this.collateral = collateral as MoveToken
    this.borrow = borrow as MoveToken
    this.vault = new Vault(moduleResources, this.collateral, this.borrow)

    const vaultUserType = `${mirageAddress()}::vault::VaultUser<${moveAssetInfo(collateral).type}, ${
      moveAssetInfo(borrow).type
    }>`

    const user = userResources.find((resource) => resource.type === vaultUserType)

    this.userCollateral = !!user ? new BigNumber((user.data as any).collateral.value) : ZERO

    // need to use global debt rebase
    this.userBorrow =
      !!user && !!this.vault
        ? this.vault.mirage.debtRebase.toElastic(
            this.vault.borrowRebase.toElastic(new BigNumber((user.data as any).borrow_part.amount), true),
            false
          )
        : ZERO

    this.liquidationPrice =
      !!user && !!this.vault
        ? this.userBorrow.div(this.userCollateral).times(this.vault.collateralizationPercent / 100)
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

  public calculateHypotheticalLiquidationPrice(borrow: BigNumber, collateral: BigNumber): BigNumber {
    return borrow.div(collateral).times(this.vault.collateralizationPercent / 100)
  }
}
