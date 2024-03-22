import BigNumber from 'bignumber.js'

import { getPriceFeed, INTEREST_PRECISION, PERCENT_PRECISION, SECONDS_PER_YEAR, ZERO } from '../../constants'
import { AccountResource, mirageAddress } from '../../constants/accounts'
import { balanceToUi, MoveAsset, MoveToken } from '../../constants/assetList'
import { Mirage } from '../mirage'
import { Rebase } from '../rebase'

/**
 * Represents a mirage-protocol VaultCollection.
 * Deposit collateral and borrow "mirage-assets".
 */
export class VaultCollection {
  /**
   * The collateral asset of the vault
   */
  public readonly collateral: MoveAsset
  /**
   * The borrow asset of the vault (a mirage asset e.g. mUSD)
   */
  public readonly borrow: MoveToken
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
   * The minimum a position must be collateralized in the vault to update vault position (remove collateral, borrow more) (percent)
   */
  public readonly maintenanceCollateralizationPercent: number
  /**
   * The minimum a position must be collateralized in the vault to avoid liquidation (percent)
   */
  public readonly liquidationCollateralizationPercent: number
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
   * If this collection is in an emergency and is frozen
   */
  public readonly isEmergency: boolean
  /**
   * The percent taken as a protocol/liquidator cut during a liquidation
   */
  public readonly liquidationPercent: number

  /**
   * A representation of the global mirage module
   */
  public readonly mirage: Mirage

  public readonly priceFeeds: {
    readonly collateral: string | undefined
    readonly borrow: string | undefined
  }

  /**
   * Construct an instance of VaultCollection
   * @param moduleResources resources for the VaultCollection account (MIRAGE_ACCOUNT)
   * @param collateral the collateral asset of the VaultCollection
   * @param borrow the borrow asset of the VaultCollection
   */
  constructor(moduleResources: AccountResource[], collateral: MoveToken | string, borrow: MoveToken | string) {
    this.collateral = collateral as MoveToken
    this.borrow = borrow as MoveToken
    this.mirage = new Mirage(moduleResources, this.borrow)

    const vaultCollectionType = `${mirageAddress()}::vault::VaultCollection`
    const vaultCollection = moduleResources.find((resource) => resource.type === vaultCollectionType)

    this.borrowFeePercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).borrow_fee)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0
    this.interestPerSecond = !!vaultCollection ? BigNumber((vaultCollection.data as any).interest_per_second) : ZERO
    this.liquidationCollateralizationPercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).liquidation_collateralization_rate)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0
    this.maintenanceCollateralizationPercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).maintenance_collateralization_rate)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0
    this.liquidationPercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).liquidation_multiplier)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0

    this.exchangeRate = !!vaultCollection ? BigNumber((vaultCollection.data as any).cached_exchange_rate) : ZERO

    this.totalBorrow = !!vaultCollection
      ? this.mirage.debtRebase.toElastic(BigNumber((vaultCollection.data as any).borrow.elastic), false)
      : ZERO
    this.totalCollateral = !!vaultCollection ? BigNumber((vaultCollection.data as any).total_collateral) : ZERO

    this.borrowRebase = !!vaultCollection
      ? new Rebase(
          BigNumber((vaultCollection.data as any).borrow.elastic),
          BigNumber((vaultCollection.data as any).borrow.base)
        )
      : new Rebase(ZERO, ZERO)

    this.isEmergency = !!vaultCollection ? (vaultCollection.data as any).is_emergency : false

    this.priceFeeds = {
      collateral: getPriceFeed(this.collateral),
      borrow: getPriceFeed(this.borrow),
    }
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

  /**
   * Get some amount of vault base in total coin by checking global debt state
   */
  public baseToCoin(baseAmount: BigNumber): BigNumber {
    return this.mirage.debtRebase.toElastic(this.borrowRebase.toElastic(baseAmount, true), false)
  }
}