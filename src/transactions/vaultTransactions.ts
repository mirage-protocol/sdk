import {
  AccountAddress,
  MoveObjectType,
  TransactionPayloadEntryFunction,
  parseTypeTag,
  EntryFunction,
  ModuleId,
  Identifier,
  MoveVector,
  U8,
} from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../utils'
import { getAssetAmountBCS, getDecimal8BCS } from './'

const getFunctionSuffix = (coinType: string | undefined): string => {
  return coinType ? 'coin_entry' : 'entry'
}

const emptyVaa = MoveVector.U8([])

export const createVaultPayload = (
  collectionObjectAddress: MoveObjectType,
  collateralAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier(`create_vault_${getFunctionSuffix(collateralCoinType)}`)
  const typeArguments = collateralCoinType ? [parseTypeTag(collateralCoinType)] : []
  const functionArguments = [
    AccountAddress.fromString(collectionObjectAddress),
    getAssetAmountBCS(collateralAmount, collateralDecimals),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createVaultAndBorrowPayload = (
  collectionObjectAddress: MoveObjectType,
  collateralAmount: number,
  borrowAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier(`create_vault_and_borrow_${getFunctionSuffix(collateralCoinType)}`)
  const typeArguments = collateralCoinType ? [parseTypeTag(collateralCoinType)] : []

  const functionArguments = [
    AccountAddress.fromString(collectionObjectAddress),
    getAssetAmountBCS(collateralAmount, collateralDecimals),
    getDecimal8BCS(borrowAmount),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to add collateral to a vault
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param addAmount the amount to add to the vault, no precision
 * @returns payload promise for the transaction
 */
export const createAddCollateralPayload = (
  vaultObjectAddress: MoveObjectType,
  collateralAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier(`add_collateral_${getFunctionSuffix(collateralCoinType)}`)
  const typeArguments = collateralCoinType ? [parseTypeTag(collateralCoinType)] : []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getAssetAmountBCS(collateralAmount, collateralDecimals),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to borrow mirage asset
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param borrowAmount the amount to add to the borrow from the vault, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const createBorrowPayload = (
  vaultObjectAddress: MoveObjectType,
  borrowAmount: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier('borrow_entry')
  const typeArguments = []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getDecimal8BCS(borrowAmount),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to remove collateral from a vault
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove from the vault, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const createRemoveCollateralPayload = (
  vaultObjectAddress: MoveObjectType,
  removeAmount: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier('remove_collateral_entry')
  const typeArguments = []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getAssetAmountBCS(removeAmount, collateralDecimals),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to repay a borrow of a mirage asset
 * @param vaultObject the address of the vault to interact with
 * @param repayPartAmount the amount to repay in rebase parts, no precision
 * @returns payload promise for the transaction
 */
export const createRepayDebtPartPayload = (
  vaultObjectAddress: MoveObjectType,
  repayPartAmount: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('vault'))
  const functionName = new Identifier('repay_part_entry')
  const typeArguments = []
  const functionArguments = [AccountAddress.fromString(vaultObjectAddress), getDecimal8BCS(repayPartAmount)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add to vault, no precision
 * @param borrowAmount the amount to borrow, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const createAddCollateralAndBorrowPayload = (
  vaultObjectAddress: MoveObjectType,
  addAmount: number,
  borrowAmount: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier(`add_and_borrow_${getFunctionSuffix(collateralCoinType)}`)
  const typeArguments = collateralCoinType ? [parseTypeTag(collateralCoinType)] : []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getAssetAmountBCS(addAmount, collateralDecimals),
    getDecimal8BCS(borrowAmount),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove, no precision
 * @param repayPartAmount the amount to repay, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const createRepayDebtAndRemoveCollateralPayload = (
  vaultObjectAddress: MoveObjectType,
  removeAmount: number,
  repayPartAmount: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier('repay_and_remove')
  const typeArguments = []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getAssetAmountBCS(removeAmount, collateralDecimals),
    getDecimal8BCS(repayPartAmount),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param addAmount the amount to add, no precision
 * @param repayPartAmount the amount to repay, no precision
 * @returns payload promise for the transaction
 */
export const createAddCollateralAndRepayDebt = (
  vaultObjectAddress: MoveObjectType,
  addAmount: number,
  repayPartAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier(`add_and_repay_${getFunctionSuffix(collateralCoinType)}`)
  const typeArguments = collateralCoinType ? [parseTypeTag(collateralCoinType)] : []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getAssetAmountBCS(addAmount, collateralDecimals),
    getDecimal8BCS(repayPartAmount),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove, no precision
 * @param borrowAmount the amount to borrow, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const createRemoveCollateralAndBorrow = (
  vaultObjectAddress: MoveObjectType,
  removeAmount: number,
  borrowAmount: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier('remove_and_borrow_entry')
  const typeArguments = []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getAssetAmountBCS(removeAmount, collateralDecimals),
    getDecimal8BCS(borrowAmount),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createLiquidateVaultWithPartPayload = (
  vaultObjectAddress: MoveObjectType,
  partToLiquidate: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('vault'))
  const functionName = new Identifier('liquidate_entry')
  const typeArguments = []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getDecimal8BCS(partToLiquidate),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createLiquidateVaultBankruptPayload = (
  vaultObjectAddress: MoveObjectType,
  debtAmountToLiquidate: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('vault_scripts'),
  )
  const functionName = new Identifier('liquidate_bankrupt_entry')
  const typeArguments = []
  const functionArguments = [
    AccountAddress.fromString(vaultObjectAddress),
    getDecimal8BCS(debtAmountToLiquidate),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createAccrueInterestPayload = (
  collectionObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('vault'))
  const functionName = new Identifier('accrue_interest')
  const typeArguments = []
  const functionArguments = [AccountAddress.fromString(collectionObjectAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createMergeVaultsPaylaod = (
  dstVaultObjectAddress: MoveObjectType,
  srcVaultObjectAddress: MoveObjectType,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8> | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('vault'))
  const functionName = new Identifier('merge_vaults')
  const typeArguments = []
  const functionArguments = [
    AccountAddress.fromString(dstVaultObjectAddress),
    AccountAddress.fromString(srcVaultObjectAddress),
    collateralVaa,
    borrowVaa ? borrowVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}
