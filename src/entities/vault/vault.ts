import { AccountAddress, MoveResource, TypeTagStruct, StructTag, Identifier } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, integerToDecimal, MoveModules, PRECISION_8 } from '../../utils'
import { getPropertyMapSigned64, getPropertyMapU64 } from '../../utils'
import { VaultCollection } from './vaultCollection'

/**
 * Represents a Vault struct.
 * Stores info about a vault's deposits and borrows
 */
export class Vault {
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

  public readonly objectAddress: AccountAddress

  /**
   * Construct an instance of Vault
   * @param vaultObjectResources resources from vault token account
   * @param vaultCollection a vault collection entity
   * @param objectAddress the vault object address
   */
  constructor(vaultObjectResources: MoveResource[], vaultCollection: VaultCollection, deployerAddress: AccountAddress) {
    this.vaultCollection = vaultCollection

    const vaultType = Vault.getVaultType(deployerAddress).toString()
    const propertyMapType = `0x4::property_map::PropertyMap`

    const vault = vaultObjectResources.find((resource) => resource.type === vaultType)
    if (vault == undefined) throw new Error('Vault object not found')

    const propertyMap = vaultObjectResources.find((resource) => resource.type === propertyMapType)
    if (propertyMap == undefined) throw new Error('PropertyMap object not found')

    this.collateralAmount = integerToDecimal(
      BigNumber((vault.data as any).collateral_amount),
      this.vaultCollection.collateralDecimals,
    )

    this.objectAddress = AccountAddress.from((vault.data as any).burn_ref.inner as string)

    // need to use global debt rebase
    this.borrowAmount = this.vaultCollection.mirage.debtRebase.toElastic(
      this.vaultCollection.borrowRebase.toElastic(
        new BigNumber((vault.data as any).borrow_part.amount).div(PRECISION_8),
        true,
      ),
      false,
    )

    const realizedPnl = getPropertyMapSigned64('realized_pnl', propertyMap.data as any).div(PRECISION_8)
    const lastBorrowAmount = getPropertyMapU64('last_borrow_amount', propertyMap.data as any).div(PRECISION_8)
    this.feesPaid = getPropertyMapU64('fees_paid', propertyMap.data as any).div(PRECISION_8)
    this.pnl = realizedPnl.plus(lastBorrowAmount).minus(this.borrowAmount)
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

  public static getVaultType(deployerAddress: AccountAddress): TypeTagStruct {
    return new TypeTagStruct(
      new StructTag(
        getModuleAddress(MoveModules.MIRAGE, deployerAddress),
        new Identifier('vault'),
        new Identifier('Vault'),
        [],
      ),
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
