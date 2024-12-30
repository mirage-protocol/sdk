import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import {
  createAccrueInterestPayload,
  createAddCollateralAndBorrowPayload,
  createAddCollateralAndRepayDebt,
  createBorrowPayload,
  createLiquidateVaultBankruptPayload,
  createLiquidateVaultWithPartPayload,
  createMergeVaultsPaylaod,
  createRemoveCollateralAndBorrow,
  createRepayDebtPartPayload,
  createVaultPayload,
} from '../../transactions'
import { VaultClientBase } from './vaultClientBase'

export class VaultTransactionClient {
  private readonly base: VaultClientBase

  constructor(base: VaultClientBase) {
    this.base = base
  }

  public getCreateVaultPayload = (
    collateralSymbol: string,
    borrowSymbol: string,
    collateralAmount: number,
  ): InputEntryFunctionData => {
    const collectionAddress = this.base.getVaultCollectionAddress(collateralSymbol, borrowSymbol)
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)
    return createVaultPayload(
      collectionAddress,
      collateralAmount,
      collateralCoinType,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getAddCollateralPayload = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    collateralAmount: number,
  ): InputEntryFunctionData => {
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)
    return createVaultPayload(
      vaultObjectAddress,
      collateralAmount,
      collateralCoinType,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getBorrowPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    collateralAmount: number,
  ): Promise<InputEntryFunctionData> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)
    return createBorrowPayload(
      vaultObjectAddress,
      collateralAmount,
      collateralVaas,
      borrowVaas,
      this.base.getDeployerAddress(),
    )
  }

  public getRemoveCollateralPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    removeAmount: number,
  ): Promise<InputEntryFunctionData> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)
    return createBorrowPayload(
      vaultObjectAddress,
      removeAmount,
      collateralVaas,
      borrowVaas,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getRepayDebtPartPayload = (
    vaultObjectAddress: MoveObjectType,
    repayPartAmount: number,
  ): InputEntryFunctionData => {
    return createRepayDebtPartPayload(vaultObjectAddress, repayPartAmount, this.base.getDeployerAddress())
  }

  public getAddCollateralAndBorrowPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    addAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> => {
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return createAddCollateralAndBorrowPayload(
      vaultObjectAddress,
      addAmount,
      borrowAmount,
      collateralVaas,
      borrowVaas,
      collateralCoinType,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getAddCollateralAndRepayDebtPayload = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    addAmount: number,
    repayPartAmount: number,
  ): InputEntryFunctionData => {
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    return createAddCollateralAndRepayDebt(
      vaultObjectAddress,
      addAmount,
      repayPartAmount,
      collateralCoinType,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getRemoveCollateralAndBorrowPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    removeAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> => {
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return createRemoveCollateralAndBorrow(
      vaultObjectAddress,
      removeAmount,
      borrowAmount,
      collateralVaas,
      borrowVaas,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getLiquidateVaultWithPartPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    partToLiquidate: number,
  ): Promise<InputEntryFunctionData> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return createLiquidateVaultWithPartPayload(
      vaultObjectAddress,
      partToLiquidate,
      collateralVaas,
      borrowVaas,
      this.base.getDeployerAddress(),
    )
  }

  public getLiquidateVaultBankruptPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    debtAmountToLiquidate: number,
  ): Promise<InputEntryFunctionData> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return createLiquidateVaultBankruptPayload(
      vaultObjectAddress,
      debtAmountToLiquidate,
      collateralVaas,
      borrowVaas,
      this.base.getDeployerAddress(),
    )
  }

  public getAccrueInterestPayload = (collectionObjectAddress: MoveObjectType): InputEntryFunctionData => {
    return createAccrueInterestPayload(collectionObjectAddress, this.base.getDeployerAddress())
  }

  public getMergeVaultsPaylaod = async (
    collateralSymbol: string,
    borrowSymbol: string,
    dstVaultObjectAddress: MoveObjectType,
    srcVaultObjectAddress: MoveObjectType,
  ): Promise<InputEntryFunctionData> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return createMergeVaultsPaylaod(
      dstVaultObjectAddress,
      srcVaultObjectAddress,
      collateralVaas,
      borrowVaas,
      this.base.getDeployerAddress(),
    )
  }
}
