import { AccountAddress, MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  EXCHANGE_RATE_PRECISION,
  getModuleAddress,
  INTEREST_PRECISION,
  MoveModules,
  PERCENT_PRECISION,
  PRECISION_8,
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
  /**
   * The vault collection object address
   */
  public readonly objectAddress: string

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
    objectAddress: string,
    collateralSymbol: string,
    collateralDecimals: number,
    deployerAddress: AccountAddress,
  ) {
    this.mirage = new MirageAsset(borrowTokenObjectResources, deployerAddress)
    this.objectAddress = objectAddress

    const vaultCollectionType = `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::VaultCollection`
    const vaultCollection = collectionObjectResources.find((resource) => resource.type === vaultCollectionType)
    if (vaultCollection == undefined) throw new Error('Vault object not found)

    this.collateralAddress = (vaultCollection.data as any).collateral.inner as string
    this.borrowAddress = (vaultCollection.data as any).borrow.inner as string
    this.borrowSymbol = this.mirage.symbol
    this.collateralSymbol = collateralSymbol
    this.collateralDecimals = collateralDecimals

    this.borrowFeePercent = BigNumber((vaultCollection.data as any).config.borrow_fee)
      .div(PERCENT_PRECISION)
      .times(100)
      .toNumber()
    this.interestPerSecond = BigNumber((vaultCollection.data as any).config.interest_per_second).div(INTEREST_PRECISION)
    this.initialCollateralizationPercent = BigNumber(
      (vaultCollection.data as any).config.initial_collateralization_rate,
    )
      .div(PERCENT_PRECISION)
      .times(100)
      .toNumber()
    this.maintenanceCollateralizationPercent = BigNumber(
      (vaultCollection.data as any).config.maintenance_collateralization_rate,
    )
      .div(PERCENT_PRECISION)
      .times(100)
      .toNumber()
    this.liquidationPercent = BigNumber((vaultCollection.data as any).config.liquidation_multiplier)
      .div(PERCENT_PRECISION)
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
    this.collateralOracleAddress = (vaultCollection.data as any).collateralOracle.inner.address
    this.borrowOracleAddress = (vaultCollection.data as any).borrowOracle.inner.address
  }

  /**
   * Get the vault collection annual interest rate
   * @returns the interest rate in a percent
   */
  public getInterestRatePercent(): number {
    return this.interestPerSecond.times(SECONDS_PER_YEAR).times(100).toNumber()
  }
}
