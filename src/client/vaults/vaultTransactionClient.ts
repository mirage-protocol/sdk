import { MoveObjectType, MoveVector, U8, TransactionPayloadEntryFunction } from '@aptos-labs/ts-sdk'

import {
  createAccrueInterestPayload,
  createAddCollateralAndBorrowPayload,
  createAddCollateralAndRepayDebt,
  createAddCollateralPayload,
  createBorrowPayload,
  createLiquidateVaultBankruptPayload,
  createLiquidateVaultWithPartPayload,
  createMergeVaultsPaylaod,
  createRemoveCollateralAndBorrow,
  createRemoveCollateralPayload,
  createRepayDebtAndRemoveCollateralPayload,
  createRepayDebtPartPayload,
  createVaultAndBorrowPayload,
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
  ): TransactionPayloadEntryFunction => {
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

  public getCreateVaultAndBorrowPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    collateralAmount: number,
    borrowAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)
    return this.getCreateVaultAndBorrowPayloadVaas(
      collateralSymbol,
      borrowSymbol,
      collateralAmount,
      borrowAmount,
      collateralVaas,
      borrowVaas,
    )
  }

  public getCreateVaultAndBorrowPayloadVaas = (
    collateralSymbol: string,
    borrowSymbol: string,
    collateralAmount: number,
    borrowAmount: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    const collectionAddress = this.base.getVaultCollectionAddress(collateralSymbol, borrowSymbol)
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    return createVaultAndBorrowPayload(
      collectionAddress,
      collateralAmount,
      borrowAmount,
      collateralCoinType,
      collateralDecimals,
      collateralVaa,
      borrowVaa,
      this.base.getDeployerAddress(),
    )
  }

  public getAddCollateralPayload = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    collateralAmount: number,
  ): TransactionPayloadEntryFunction => {
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)
    return createAddCollateralPayload(
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
    borrowAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return this.getBorrowPayloadVaas(vaultObjectAddress, borrowAmount, collateralVaas, borrowVaas)
  }

  public getBorrowPayloadVaas = (
    vaultObjectAddress: MoveObjectType,
    borrowAmount: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createBorrowPayload(
      vaultObjectAddress,
      borrowAmount,
      collateralVaa,
      borrowVaa,
      this.base.getDeployerAddress(),
    )
  }

  public getRemoveCollateralPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    removeAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return this.getRemoveCollateralPayloadVaas(
      collateralSymbol,
      vaultObjectAddress,
      removeAmount,
      collateralVaas,
      borrowVaas,
    )
  }

  public getRemoveCollateralPayloadVaas = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    removeAmount: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)
    return createRemoveCollateralPayload(
      vaultObjectAddress,
      removeAmount,
      collateralVaa,
      borrowVaa,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getRepayDebtPartPayload = (
    vaultObjectAddress: MoveObjectType,
    repayPartAmount: number,
  ): TransactionPayloadEntryFunction => {
    return createRepayDebtPartPayload(vaultObjectAddress, repayPartAmount, this.base.getDeployerAddress())
  }

  public getAddCollateralAndBorrowPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    addAmount: number,
    borrowAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaa = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaa = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return this.getAddCollateralAndBorrowPayloadVaas(
      collateralSymbol,
      vaultObjectAddress,
      addAmount,
      borrowAmount,
      collateralVaa,
      borrowVaa,
    )
  }

  public getAddCollateralAndBorrowPayloadVaas = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    addAmount: number,
    borrowAmount: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    return createAddCollateralAndBorrowPayload(
      vaultObjectAddress,
      addAmount,
      borrowAmount,
      collateralVaa,
      borrowVaa,
      collateralCoinType,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getRepayDebtAndRemoveCollateralPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    removeAmount: number,
    repayPartAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return this.getRepayDebtAndRemoveCollateralPayloadVaas(
      collateralSymbol,
      vaultObjectAddress,
      removeAmount,
      repayPartAmount,
      collateralVaas,
      borrowVaas,
    )
  }

  public getRepayDebtAndRemoveCollateralPayloadVaas = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    removeAmount: number,
    repayPartAmount: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    return createRepayDebtAndRemoveCollateralPayload(
      vaultObjectAddress,
      removeAmount,
      repayPartAmount,
      collateralVaa,
      borrowVaa,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getAddCollateralAndRepayDebtPayload = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    increaseAmount: number,
    repayPartAmount: number,
  ): TransactionPayloadEntryFunction => {
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)
    const collateralCoinType = this.base.getCollateralCoinType(collateralSymbol)

    return createAddCollateralAndRepayDebt(
      vaultObjectAddress,
      increaseAmount,
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
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaa = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaa = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return this.getRemoveCollateralAndBorrowPayloadVaas(
      collateralSymbol,
      vaultObjectAddress,
      removeAmount,
      borrowAmount,
      collateralVaa,
      borrowVaa,
    )
  }

  public getRemoveCollateralAndBorrowPayloadVaas = (
    collateralSymbol: string,
    vaultObjectAddress: MoveObjectType,
    removeAmount: number,
    borrowAmount: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    return createRemoveCollateralAndBorrow(
      vaultObjectAddress,
      removeAmount,
      borrowAmount,
      collateralVaa,
      borrowVaa,
      collateralDecimals,
      this.base.getDeployerAddress(),
    )
  }

  public getLiquidateVaultWithPartPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    partToLiquidate: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return this.getLiquidateVaultWithPartPayloadVaas(vaultObjectAddress, partToLiquidate, collateralVaas, borrowVaas)
  }

  public getLiquidateVaultWithPartPayloadVaas = (
    vaultObjectAddress: MoveObjectType,
    partToLiquidate: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createLiquidateVaultWithPartPayload(
      vaultObjectAddress,
      partToLiquidate,
      collateralVaa,
      borrowVaa,
      this.base.getDeployerAddress(),
    )
  }

  public getLiquidateVaultBankruptPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    vaultObjectAddress: MoveObjectType,
    debtAmountToLiquidate: number,
  ): Promise<TransactionPayloadEntryFunction> => {
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

  public getLiquidateVaultBankruptPayloadVaas = (
    vaultObjectAddress: MoveObjectType,
    debtAmountToLiquidate: number,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createLiquidateVaultBankruptPayload(
      vaultObjectAddress,
      debtAmountToLiquidate,
      collateralVaa,
      borrowVaa,
      this.base.getDeployerAddress(),
    )
  }

  public getAccrueInterestPayload = (collectionObjectAddress: MoveObjectType): TransactionPayloadEntryFunction => {
    return createAccrueInterestPayload(collectionObjectAddress, this.base.getDeployerAddress())
  }

  public getMergeVaultsPayload = async (
    collateralSymbol: string,
    borrowSymbol: string,
    dstVaultObjectAddress: MoveObjectType,
    srcVaultObjectAddress: MoveObjectType,
  ): Promise<TransactionPayloadEntryFunction> => {
    const collateralVaas = await this.base.getCollateralPriceFeedUpdate(collateralSymbol, borrowSymbol)
    const borrowVaas = await this.base.getBorrowPriceFeedUpdate(collateralSymbol, borrowSymbol)

    return this.getMergeVaultsPayloadVaas(dstVaultObjectAddress, srcVaultObjectAddress, collateralVaas, borrowVaas)
  }

  public getMergeVaultsPayloadVaas = (
    dstVaultObjectAddress: MoveObjectType,
    srcVaultObjectAddress: MoveObjectType,
    collateralVaa: MoveVector<U8>,
    borrowVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createMergeVaultsPaylaod(
      dstVaultObjectAddress,
      srcVaultObjectAddress,
      collateralVaa,
      borrowVaa,
      this.base.getDeployerAddress(),
    )
  }
}
