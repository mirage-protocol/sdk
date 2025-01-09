import { AccountAddress, InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../utils'
import { getAssetAmountArgument, getDecimal8Argument } from './'

// const type = 'entry_function_payload'

const getFunctionSuffix = (coinType: string | undefined): string => {
  return coinType ? 'coin_entry': 'entry'
}

export const createVaultPayload = (
  collectionObjectAddress: MoveObjectType,
  collateralAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::create_vault_${getFunctionSuffix(collateralCoinType)}`,
    functionArguments: [collectionObjectAddress, getAssetAmountArgument(collateralAmount, collateralDecimals)],
    typeArguments: collateralCoinType ? [collateralCoinType] : [],
  }
}

export const createVaultAndBorrowPayload = (
  collectionObjectAddress: MoveObjectType,
  collateralAmount: number,
  borrowAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  collateralVaas: number[],
  borrowVaas: number[],
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::create_vault_and_borrow${getFunctionSuffix(collateralCoinType)}`,
    functionArguments: [
      collectionObjectAddress,
      getAssetAmountArgument(collateralAmount, collateralDecimals),
      getDecimal8Argument(borrowAmount),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: collateralCoinType ? [collateralCoinType] : [],
  }
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
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::add_collateral_${getFunctionSuffix(collateralCoinType)}`,
    functionArguments: [vaultObjectAddress, getAssetAmountArgument(collateralAmount, collateralDecimals)],
    typeArguments: collateralCoinType ? [collateralCoinType] : [],
  }
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
  collateralVaas: number[],
  borrowVaas: number[],
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::borrow_entry`,
    functionArguments: [vaultObjectAddress, getDecimal8Argument(borrowAmount), collateralVaas, borrowVaas],
  }
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
  collateralVaas: number[],
  borrowVaas: number[],
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::remove_collateral_entry`,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountArgument(removeAmount, collateralDecimals),
      collateralVaas,
      borrowVaas,
    ],
  }
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
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::repay_part_entry`,
    functionArguments: [vaultObjectAddress, repayPartAmount],
  }
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
  collateralVaas: number[],
  borrowVaas: number[],
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::add_and_borrow_${getFunctionSuffix(collateralCoinType)}`,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountArgument(addAmount, collateralDecimals),
      getDecimal8Argument(borrowAmount),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: collateralCoinType ? [collateralCoinType] : [],
  }
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
  collateralVaas: number[],
  borrowVaas: number[],
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::repay_and_remove`,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountArgument(removeAmount, collateralDecimals),
      repayPartAmount,
      collateralVaas,
      borrowVaas,
    ],
  }
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
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::add_and_repay_${getFunctionSuffix(collateralCoinType)}`,
    functionArguments: [vaultObjectAddress, getAssetAmountArgument(addAmount, collateralDecimals), repayPartAmount],
    typeArguments: collateralCoinType ? [collateralCoinType] : [],
  }
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
  collateralVaas: number[],
  borrowVaas: number[],
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}, this.config.deployerAddress)}::vault_scripts::remove_and_borrow_entry`,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountArgument(removeAmount, collateralDecimals),
      getDecimal8Argument(borrowAmount),
      collateralVaas,
      borrowVaas,
    ],
  }
}

export const createLiquidateVaultWithPartPayload = (
  vaultObjectAddress: MoveObjectType,
  partToLiquidate: number,
  collateralVaas: number[],
  borrowVaas: number[],
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::liquidate_entry`,
    functionArguments: [vaultObjectAddress, partToLiquidate, collateralVaas, borrowVaas],
  }
}

export const createLiquidateVaultBankruptPayload = (
  vaultObjectAddress: MoveObjectType,
  debtAmountToLiquidate: number,
  collateralVaas: number[],
  borrowVaas: number[],
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::liquidate_bankrupt_entry`,
    functionArguments: [vaultObjectAddress, getDecimal8Argument(debtAmountToLiquidate), collateralVaas, borrowVaas],
  }
}

export const createAccrueInterestPayload = (
  collectionObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::accrue_interest`,
    functionArguments: [collectionObjectAddress],
  }
}

export const createMergeVaultsPaylaod = (
  dstVaultObjectAddress: MoveObjectType,
  srcVaultObjectAddress: MoveObjectType,
  collateralVaas: number[],
  borrowVaas: number[],
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::merge_vaults`,
    functionArguments: [dstVaultObjectAddress, srcVaultObjectAddress, collateralVaas, borrowVaas],
  }
}
