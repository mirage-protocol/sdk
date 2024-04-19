import BigNumber from 'bignumber.js'

import { EXCHANGE_RATE_PRECISION, ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { balanceToUi, MoveAsset, MoveToken } from '../../constants/assetList'
import { VaultCollection } from './vaultCollection'

/**
 * Represents a Vault struct.
 * Stores info about a vault's deposits and borrows
 */
export class Vault {
  /**
   * The collateral asset of the vault
   */
  public readonly collateralAsset: MoveAsset
  /**
   * The borrow token of the vault (a mirage asset e.g. mUSD)
   */
  public readonly borrowToken: MoveToken
  /**
   * The amount of collateral deposited
   */
  public readonly collateralAmount: BigNumber
  /**
   * The amount borrowed
   */
  public readonly borrowAmount: BigNumber
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
   * An instance of the VaultCollection for this Vault
   */
  public readonly vaultCollection: VaultCollection

  public readonly objectAddress: string

  /**
   * Construct an instance of VaultUser
   * @param vaultObjectResources resources from vault token account
   * @param collectionObjectResources resources from the VaultCollection account
   * @param borrowTokenObjectResources resources from the borrow token and its debt store
   * @param collateral the collateral asset of the vault
   * @param borrow the borrow asset of the vault
   */
  constructor(
    vaultObjectResources: AccountResource[],
    vaultCollection: VaultCollection,
    collateral: MoveToken | string,
    borrow: MoveToken | string,
    objectAddress: string
  ) {
    this.collateralAsset = collateral as MoveToken
    this.borrowToken = borrow as MoveToken
    this.vaultCollection = vaultCollection
    this.objectAddress = objectAddress

    const vaultType = `${mirageAddress()}::vault::Vault`

    const vault = vaultObjectResources.find((resource) => resource.type === vaultType)

    this.collateralAmount = !!vault ? new BigNumber((vault.data as any).collateral_amount) : ZERO

    // need to use global debt rebase
    this.borrowAmount =
      !!vault && !!this.vaultCollection
        ? this.vaultCollection.mirage.debtRebase.toElastic(
            this.vaultCollection.borrowRebase.toElastic(new BigNumber((vault.data as any).borrow_part.amount), true),
            false
          )
        : ZERO

    this.liquidationPrice =
      !!vault && !!this.vaultCollection
        ? this.borrowAmount
            .div(this.collateralAmount)
            .times(this.vaultCollection.liquidationCollateralizationPercent / 100)
        : ZERO

    const maxBorrow =
      !!vault && !!this.vaultCollection
        ? this.collateralAmount
            .times(this.vaultCollection.exchangeRate)
            .div(EXCHANGE_RATE_PRECISION)
            .times(this.vaultCollection.liquidationCollateralizationPercent)
            .div(100)
        : ZERO

    const maxCollateral =
      !!vault && !!this.vaultCollection
        ? this.collateralAmount.times(this.vaultCollection.liquidationCollateralizationPercent).div(100)
        : ZERO

    const ratio =
      !!vault && !!this.vaultCollection
        ? this.borrowAmount
            .times(EXCHANGE_RATE_PRECISION)
            .div(this.vaultCollection.exchangeRate)
            .times(10000)
            .div(maxCollateral)
            .toNumber()
        : 0

    const minCollateral =
      !!vault && !!this.vaultCollection
        ? this.borrowAmount
            .times(EXCHANGE_RATE_PRECISION)
            .div(this.vaultCollection.exchangeRate)
            .div(this.vaultCollection.liquidationCollateralizationPercent)
            .div(100)
        : ZERO

    this.positionHealth = ratio > 10000 ? 0 : 10000 - ratio
    this.remainingBorrowable = !!vault ? maxBorrow.minus(this.borrowAmount) : ZERO
    this.withdrawableAmount = !!vault ? this.collateralAmount.minus(minCollateral) : ZERO
  }

  /**
   * Get a Ui friendly total collateral of the user
   * @returns the users total collateral
   */
  public getUiUserCollateral(): number {
    return balanceToUi(this.collateralAmount, this.collateralAsset)
  }

  /**
   * Get a Ui friendly total borrow of the user
   * @returns the users total borrow
   */
  public getUiUserBorrow(): number {
    return balanceToUi(this.borrowAmount, this.borrowToken)
  }

  /**
   * Checks if a user is solvent with a hypothetical exchange rate.
   * @param exchangeRate the rate to test the solvency of the user position against
   * @returns is the user solvent at this rate
   */
  public simulateIsSolvent(exchangeRate: BigNumber): boolean {
    return this.collateralAmount
      .div(this.vaultCollection.liquidationCollateralizationPercent)
      .times(exchangeRate)
      .times(100)
      .isGreaterThan(this.borrowAmount)
  }

  public calculateHypotheticalLiquidationPrice(borrow: BigNumber, collateral: BigNumber): BigNumber {
    return borrow.div(collateral).times(this.vaultCollection.liquidationCollateralizationPercent / 100)
  }
}
