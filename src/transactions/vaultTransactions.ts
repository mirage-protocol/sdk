import { InputEntryFunctionData, MoveObjectType, Network } from '@aptos-labs/ts-sdk'

import {
  getCoinType,
  getModuleAddress,
  getPriceFeed,
  getPriceFeedUpdateData,
  mirageAddress,
  MoveAsset,
  MoveCoin,
  MoveFungibleAsset,
  MoveModules,
} from '../constants'
import { getAssetAmountArgument } from './'

export const createVault = async (
  collectionObject: MoveObjectType,
  collateralAsset: MoveAsset,
  amount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const isFA = collateralAsset in MoveCoin
  const functionName =
    `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::create_vault${isFA ? '' : '_coin'}_entry` as `${string}::${string}::${string}`
  const typeArguments = isFA ? [] : [getCoinType(collateralAsset as MoveCoin, network)]
  return {
    function: functionName,
    functionArguments: [collectionObject, getAssetAmountArgument(collateralAsset, amount, network)],
    typeArguments,
  }
}

export const createVaultAndBorrow = async (
  collectionObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  collateralAmount: number,
  borrowAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []

  const isFA = collateralAsset in MoveCoin
  const functionName =
    `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::create_and_borrow${isFA ? '' : '_coin'}_entry` as `${string}::${string}::${string}`
  const typeArguments = isFA ? [] : [getCoinType(collateralAsset as MoveCoin, network)]

  return {
    function: functionName,
    functionArguments: [
      collectionObject,
      getAssetAmountArgument(collateralAsset, collateralAmount, network),
      getAssetAmountArgument(collateralAsset, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments,
  }
}

/**
 * Build a payload to add collateral to a vault
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param addAmount the amount to add to the vault, no precision
 * @returns payload promise for the transaction
 */
export const addCollateral = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  amount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const isFA = collateralAsset in MoveCoin
  const functionName =
    `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::add_collateral${isFA ? '' : '_coin'}_entry` as `${string}::${string}::${string}`
  const typeArguments = isFA ? [] : [getCoinType(collateralAsset as MoveCoin, network)]

  return {
    function: functionName,
    functionArguments: [vaultObject, getAssetAmountArgument(collateralAsset, amount, network)],
    typeArguments,
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
export const borrow = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  borrowAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []

  return {
    function: `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::borrow_entry`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(borrowToken, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: [],
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
export const removeCollateral = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  removeAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []

  return {
    function: `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::remove_collateral_entry`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, removeAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: [],
  }
}

/**
 * Build a payload to repay a borrow of a mirage asset
 * @param vaultObject the address of the vault to interact with
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param repayPart the amount to repay in parts
 * @returns payload promise for the transaction
 */
export const repayDebt = async (
  vaultObject: MoveObjectType,
  borrowToken: MoveFungibleAsset,
  repayPart: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  return {
    function: `${mirageAddress(network)}::vault::repay_part_entry` as `${string}::${string}::${string}`,
    functionArguments: [vaultObject, getAssetAmountArgument(borrowToken, repayPart, network)],
    typeArguments: [],
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
export const addCollateralAndBorrow = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  addAmount: number,
  borrowAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []

  const isFA = collateralAsset in MoveCoin
  const functionName =
    `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::add_and_borrow${isFA ? '' : '_coin'}_entry` as `${string}::${string}::${string}`
  const typeArguments = isFA ? [] : [getCoinType(collateralAsset as MoveCoin, network)]

  return {
    function: functionName,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, addAmount, network),
      getAssetAmountArgument(borrowToken, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments,
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove, no precision
 * @param repayPart the amount to repay in parts
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const repayDebtAndRemoveCollateral = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  removeAmount: number,
  repayPart: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []
  const functionName =
    `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::repay_and_remove_entry` as `${string}::${string}::${string}`

  return {
    function: functionName,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, removeAmount, network),
      getAssetAmountArgument(borrowToken, repayPart, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: [],
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add, no precision
 * @param repayPart the amount to repay in parts
 * @returns payload promise for the transaction
 */
export const addCollateralAndRepayDebt = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  addAmount: number,
  repayPart: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const isFA = collateralAsset in MoveCoin
  const functionName =
    `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::add_and_repay${isFA ? '' : '_coin'}_entry` as `${string}::${string}::${string}`
  const typeArguments = isFA ? [] : [getCoinType(collateralAsset as MoveCoin, network)]

  return {
    function: functionName,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, addAmount, network),
      getAssetAmountArgument(borrowToken, repayPart, network),
    ],
    typeArguments,
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
export const removeCollateralAndBorrow = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  removeAmount: number,
  borrowAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []
  const functionName =
    `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::vault_scripts::remove_and_borrow` as `${string}::${string}::${string}`

  return {
    function: functionName,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, removeAmount, network),
      getAssetAmountArgument(borrowToken, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: [],
  }
}

export const liquidateVault = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  partToLiquidate: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []

  const functionName = `${mirageAddress(network)}::vault::liquidate_entry` as `${string}::${string}::${string}`
  return {
    function: functionName,
    functionArguments: [vaultObject, partToLiquidate, collateralVaas, borrowVaas],
  }
}
