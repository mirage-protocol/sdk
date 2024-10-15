import { MoveResource, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { PRECISION_8, ZERO } from '../../constants'
import { mirageAddress } from '../../constants/accounts'
import { assetBalanceToDecimal, MoveAsset, MoveToken } from '../../constants/assetList'
import { getPropertyMapSigned64, getPropertyMapU64 } from '../../utils'
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
   * The vaults pnl in the borrow token
   */
  public readonly pnl: BigNumber
  /**
   * The vaults fees in the borrow token
   */
  public readonly feesPaid: BigNumber

  /**
   * An instance of the VaultCollection for this Vault
   */
  public readonly vaultCollection: VaultCollection

  public readonly objectAddress: string

  /**
   * Construct an instance of Vault
   * @param vaultObjectResources resources from vault token account
   * @param collectionObjectResources resources from the VaultCollection account
   * @param borrowTokenObjectResources resources from the borrow token and its debt store
   * @param collateral the collateral asset of the vault
   * @param borrow the borrow asset of the vault
   */
  constructor(
    vaultObjectResources: MoveResource[],
    vaultCollection: VaultCollection,
    collateral: MoveToken | string,
    borrow: MoveToken | string,
    objectAddress: string,
    network: Network | string,
  ) {
    this.collateralAsset = collateral as MoveToken
    this.borrowToken = borrow as MoveToken
    this.vaultCollection = vaultCollection
    this.objectAddress = objectAddress

    const vaultType = `${mirageAddress(network)}::vault::Vault`
    const propertyMapType = `0x4::property_map::PropertyMap`

    const vault = vaultObjectResources.find((resource) => resource.type === vaultType)
    const propertyMap = vaultObjectResources.find((resource) => resource.type === propertyMapType)

    this.collateralAmount = !!vault
      ? assetBalanceToDecimal(BigNumber((vault.data as any).collateral_amount), this.collateralAsset, network)
      : ZERO

    // need to use global debt rebase
    this.borrowAmount =
      !!vault && !!this.vaultCollection
        ? this.vaultCollection.mirage.debtRebase.toElastic(
            this.vaultCollection.borrowRebase.toElastic(
              new BigNumber((vault.data as any).borrow_part.amount).div(PRECISION_8),
              true,
            ),
            false,
          )
        : ZERO

    const realizedPnl = !!propertyMap
      ? getPropertyMapSigned64('realized_pnl', propertyMap.data as any).div(PRECISION_8)
      : ZERO
    const lastBorrowAmount = !!propertyMap
      ? getPropertyMapU64('last_borrow_amount', propertyMap.data as any).div(PRECISION_8)
      : ZERO
    this.feesPaid = !!propertyMap ? getPropertyMapU64('fees_paid', propertyMap.data as any).div(PRECISION_8) : ZERO
    this.pnl = realizedPnl.plus(lastBorrowAmount).minus(this.borrowAmount)

    // const maxBorrow =
    //   !!vault && !!this.vaultCollection
    //     ? this.collateralAmount
    //         .times(this.vaultCollection.exchangeRate)
    //         .times(this.vaultCollection.initialCollateralizationPercent)
    //         .div(100)
    //     : ZERO

    // const minCollateral =
    //   !!vault && !!this.vaultCollection
    //     ? this.borrowAmount
    //         .div(this.vaultCollection.exchangeRate)
    //         .div(this.vaultCollection.initialCollateralizationPercent)
    //         .div(100)
    //     : ZERO

    // this.remainingBorrowable = !!vault ? maxBorrow.minus(this.borrowAmount) : ZERO
    // this.withdrawableAmount = !!vault ? this.collateralAmount.minus(minCollateral) : ZERO
  }

  public getHealth(collateralPrice: BigNumber, borrowPrice: BigNumber): number {
    return calculateVaultHealth(
      this.collateralAmount,
      this.borrowAmount,
      this.vaultCollection.maintenanceCollateralizationPercent,
      collateralPrice,
      borrowPrice,
    )
  }
}

export function calculateVaultHealth(
  collateralAmount: BigNumber,
  borrowAmount: BigNumber,
  maintenanceCollateralizationPercent: number,
  collateralPrice: BigNumber,
  borrowPrice: BigNumber,
): number {
  const exchangeRate = collateralPrice.div(borrowPrice)
  const ratio = collateralAmount
    .times(exchangeRate)
    .div(maintenanceCollateralizationPercent / 100)
    .div(borrowAmount)
  return ratio.minus(1).times(100).toNumber()
}
