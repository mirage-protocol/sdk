import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  EXCHANGE_RATE_PRECISION,
  getPriceFeed,
  INTEREST_PRECISION,
  PERCENT_PRECISION,
  PRECISION_8,
  SECONDS_PER_YEAR,
  ZERO,
} from '../../constants'
import { mirageAddress } from '../../constants/accounts'
import { assetBalanceToDecimal, MoveAsset, MoveToken } from '../../constants/assetList'
import { MirageConfig } from '../../utils/config'
import { MirageAsset } from '../mirage_asset'
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
   * A representation of the global mirage module
   */
  public readonly mirage: MirageAsset

  public readonly priceFeeds: {
    readonly collateral: string | undefined
    readonly borrow: string | undefined
  }

  public readonly objectAddress: string

  /**
   * Construct an instance of VaultCollection
   * @param collectionObjectResources resources from the VaultCollection account
   * @param borrowTokenObjectResources resources from the borrow token and its debt store
   * @param collateral the collateral asset of the VaultCollection
   * @param borrow the borrow asset of the VaultCollection
   * @param objectAddress the address of the vault collection object
   */
  constructor(
    collectionObjectResources: MoveResource[],
    borrowTokenObjectResources: MoveResource[],
    collateral: MoveToken | string,
    borrow: MoveToken | string,
    objectAddress: string,
    config: MirageConfig,
  ) {
    this.collateral = collateral as MoveToken
    this.borrow = borrow as MoveToken
    this.mirage = new MirageAsset(borrowTokenObjectResources, this.borrow, config)
    this.objectAddress = objectAddress

    const vaultCollectionType = `${mirageAddress(config)}::vault::VaultCollection`
    const vaultCollection = collectionObjectResources.find((resource) => resource.type === vaultCollectionType)

    this.borrowFeePercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).config.borrow_fee)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0
    this.interestPerSecond = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).config.interest_per_second).div(INTEREST_PRECISION)
      : ZERO
    this.initialCollateralizationPercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).config.initial_collateralization_rate)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0
    this.maintenanceCollateralizationPercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).config.maintenance_collateralization_rate)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0
    this.liquidationPercent = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).config.liquidation_multiplier)
          .div(PERCENT_PRECISION)
          .times(100)
          .toNumber()
      : 0

    this.exchangeRate = !!vaultCollection
      ? BigNumber((vaultCollection.data as any).cached_exchange_rate).div(EXCHANGE_RATE_PRECISION)
      : ZERO

    this.borrowRebase = !!vaultCollection
      ? new Rebase(
          BigNumber((vaultCollection.data as any).borrow.elastic).div(PRECISION_8),
          BigNumber((vaultCollection.data as any).borrow.base).div(PRECISION_8),
        )
      : new Rebase(ZERO, ZERO)
    this.totalBorrow = !!vaultCollection
      ? this.borrowRebase
          .toElastic(
            this.mirage.debtRebase.toElastic(BigNumber((vaultCollection.data as any).global_debt_part.amount), false),
            true,
          )
          .div(PRECISION_8)
      : ZERO
    this.totalCollateral = !!vaultCollection
      ? assetBalanceToDecimal(BigNumber((vaultCollection.data as any).total_collateral), this.collateral, config)
      : ZERO

    this.isEmergency = !!vaultCollection ? (vaultCollection.data as any).is_emergency : false

    this.priceFeeds = {
      collateral: getPriceFeed(this.collateral),
      borrow: getPriceFeed(this.borrow),
    }
  }

  /**
   * Get the vault collection annual interest rate
   * @returns the interest rate in a percent
   */
  public getInterestRatePercent(): number {
    return this.interestPerSecond.times(SECONDS_PER_YEAR).times(100).toNumber()
  }
}
