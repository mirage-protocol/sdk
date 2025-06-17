import {
  AccountAddress,
  MoveResource,
  StructTag,
  Identifier,
  TypeTagStruct,
  createObjectAddress,
} from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  EXCHANGE_RATE_PRECISION,
  getCollectionType,
  getModuleAddress,
  INTEREST_PRECISION,
  MoveModules,
  PRECISION_8,
  RATE_PRECISION,
  SECONDS_PER_YEAR,
} from '../../utils'
import { integerToDecimal } from '../../utils'
import { MirageAsset } from '../mirageAsset'
import { Rebase } from '../rebase'

/**
 * Represents a mirage-protocol VaultCollection.
 * Deposit collateral and borrow "mirage-assets".
 */
export class VaultCollection {
  /**
   * The collateral asset of the vault
   */
  public readonly collateralAddress: string
  /**
   * The borrow asset of the vault (a mirage asset e.g. mUSD)
   */
  public readonly borrowAddress: string
  /**
   * The borrow asset of the vault (a mirage asset e.g. mUSD)
   */
  public readonly borrowSymbol: string
  /**
   * The collateral asset of the vault (a mirage asset e.g. mUSD)
   */
  public readonly collateralSymbol: string
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
  public readonly initialCollateralizationPercent: number
  /**
   * The minimum a position must be collateralized in the vault to avoid liquidation (percent)
   */
  public readonly maintenanceCollateralizationPercent: number
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
   * The global debt
   */
  public readonly mirage: MirageAsset
  /**
   * The collateral pyth price feed id
   */
  public readonly collateralOracleAddress: string
  /**
   * The borrow pyth price feed id
   */
  public readonly borrowOracleAddress: string
  public readonly collateralDecimals: number
  public readonly minCollateralAmount: BigNumber
  public readonly maxCollectionDebtAmount: BigNumber
  /**
   * The vault collection object address
   */

  public readonly objectAddress: AccountAddress
  public readonly name: string

  /**
   * Construct an instance of VaultCollection
   * @param collectionObjectResources resources from the VaultCollection account
   * @param borrowTokenObjectResources resources from the borrow token and its debt store
   * @param objectAddress the address of the vault collection object
   * @param config mirage configuration
   */
  constructor(
    collectionObjectResources: MoveResource[],
    borrowTokenObjectResources: MoveResource[],
    collateralDecimals: number,
    deployerAddress: AccountAddress,
  ) {
    this.mirage = new MirageAsset(borrowTokenObjectResources, deployerAddress)

    const vaultCollectionType = VaultCollection.getVaultCollectionType(deployerAddress).toString()
    const collectionType = getCollectionType().toString()

    const vaultCollection = collectionObjectResources.find((resource) => resource.type === vaultCollectionType)
    if (vaultCollection == undefined) throw new Error('Vault object not found')

    const collection = collectionObjectResources.find((resource) => resource.type === collectionType)
    if (collection == undefined) throw new Error('Collection object not found')
    this.name = (collection.data as any).name as string
    this.objectAddress = VaultCollection.getVaultCollectionAddress(this.name, deployerAddress)
    this.collateralSymbol = this.name.split('/')[0]

    this.collateralAddress = (vaultCollection.data as any).collateral_token.inner as string
    this.borrowAddress = (vaultCollection.data as any).borrow_token.inner as string
    this.borrowSymbol = this.mirage.symbol
    this.collateralDecimals = collateralDecimals

    this.borrowFeePercent = BigNumber((vaultCollection.data as any).config.borrow_fee)
      .div(RATE_PRECISION)
      .times(100)
      .toNumber()
    this.interestPerSecond = BigNumber((vaultCollection.data as any).config.interest_per_second).div(INTEREST_PRECISION)
    this.initialCollateralizationPercent = BigNumber(
      (vaultCollection.data as any).config.initial_collateralization_rate,
    )
      .div(RATE_PRECISION)
      .times(100)
      .toNumber()
    this.maintenanceCollateralizationPercent = BigNumber(
      (vaultCollection.data as any).config.maintenance_collateralization_rate,
    )
      .div(RATE_PRECISION)
      .times(100)
      .toNumber()
    this.liquidationPercent = BigNumber((vaultCollection.data as any).config.liquidation_multiplier)
      .div(RATE_PRECISION)
      .times(100)
      .toNumber()

    this.exchangeRate = BigNumber((vaultCollection.data as any).cached_exchange_rate).div(EXCHANGE_RATE_PRECISION)

    this.borrowRebase = new Rebase(
      BigNumber((vaultCollection.data as any).borrow.elastic).div(PRECISION_8),
      BigNumber((vaultCollection.data as any).borrow.base).div(PRECISION_8),
    )
    this.totalBorrow = this.borrowRebase
      .toElastic(
        this.mirage.debtRebase.toElastic(BigNumber((vaultCollection.data as any).global_debt_part.amount), false),
        true,
      )
      .div(PRECISION_8)

    this.totalCollateral = integerToDecimal(
      BigNumber((vaultCollection.data as any).total_collateral),
      this.collateralDecimals,
    )
    this.isEmergency = (vaultCollection.data as any).is_emergency
    this.collateralOracleAddress = (vaultCollection.data as any).collateral_oracle.inner
    this.borrowOracleAddress = (vaultCollection.data as any).borrow_oracle.inner
    this.minCollateralAmount = BigNumber((vaultCollection.data as any).config.min_collateral_amount).div(
      collateralDecimals,
    )
    this.maxCollectionDebtAmount = BigNumber((vaultCollection.data as any).config.max_collection_debt_amount).div(
      PRECISION_8,
    )
  }

  public static getVaultCollectionType(deployerAddress: AccountAddress): TypeTagStruct {
    return new TypeTagStruct(
      new StructTag(
        getModuleAddress(MoveModules.MIRAGE, deployerAddress),
        new Identifier('vault'),
        new Identifier('VaultCollection'),
        [],
      ),
    )
  }

  /**
   * Get the vault collection annual interest rate
   * @returns the interest rate in a percent
   */
  public getInterestRatePercent(): number {
    return this.interestPerSecond.times(SECONDS_PER_YEAR).times(100).toNumber()
  }

  /**
   * Gets debt part for borrow token amount
   * @param borrowAmount amount of tokens
   * @returns debt part in global rebase
   */
  public borrowTokensToDebtPart(borrowAmount: number): number {
    const scaledVal = new BigNumber(borrowAmount).times(PRECISION_8)
    return this.mirage.debtRebase.toBase(this.borrowRebase.toBase(scaledVal, false), false).toNumber()
  }

  public static getVaultCollectionName(collateralSymbol: string, borrowSymbol: string): string {
    return `${collateralSymbol}/${borrowSymbol} CDP`
  }

  public static getVaultCollectionAddress(name: string, deployerAddress: AccountAddress): AccountAddress {
    const mirageModuleAddress = getModuleAddress(MoveModules.MIRAGE, deployerAddress)
    return createObjectAddress(mirageModuleAddress, name)
  }
}
