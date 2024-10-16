import { InputEntryFunctionData, MoveObjectType, Network } from '@aptos-labs/ts-sdk'

import {
  getNetwork,
  getPriceFeed,
  getPriceFeedUpdateData,
  getTypeFromMoveAsset,
  mirageAddress,
  MODULES,
  MoveAsset,
  MoveToken,
} from '../constants'
import { getAssetAmountArgument } from './'

// const type = 'entry_function_payload'

const getCollectionAndCoinTypeArgument = (collateralAsset: MoveAsset, network: Network | string): string[] => {
  switch (getTypeFromMoveAsset(collateralAsset)) {
    case 'MoveToken':
      return [`${mirageAddress(network)}::vault::VaultCollection`]
    case 'MoveCoin':
      return ['0x1::aptos_coin::AptosCoin', `${mirageAddress(network)}::vault::VaultCollection`]
    default:
      return [`${mirageAddress(network)}::vault::VaultCollection`]
  }
}
const getVaultAndCoinTypeArgument = (collateralAsset: MoveAsset, network: Network | string): string[] => {
  switch (getTypeFromMoveAsset(collateralAsset)) {
    case 'MoveToken':
      return [`${mirageAddress(network)}::vault::Vault`]
    case 'MoveCoin':
      return ['0x1::aptos_coin::AptosCoin', `${mirageAddress(network)}::vault::Vault`]
    default:
      return [`${mirageAddress(network)}::vault::Vault`]
  }
}

const getVaultTypeArgument = (network: Network | string): string[] => {
  return [`${mirageAddress(network)}::vault::Vault`]
}

const getScriptMiddle = (type: string): string => {
  switch (type) {
    case 'MoveToken':
      return ''
    case 'MoveCoin':
      return '_coin'
    default:
      return 'fail_case'
  }
}

const getFunctionSuffix = (type: string): string => {
  switch (type) {
    case 'MoveToken':
      return 'entry'
    case 'MoveCoin':
      return 'coin_entry'
    default:
      return 'fail_case'
  }
}

export const createVaultAndAddCollateral = async (
  collectionObject: MoveObjectType,
  collateralAsset: MoveAsset,
  amount: number,
  network: Network | string,
): Promise<InputEntryFunctionData> => {
  return {
    function: `${mirageAddress(network)}::vault::register_and_add_collateral_${getFunctionSuffix(
      getTypeFromMoveAsset(collateralAsset),
    )}`,
    functionArguments: [collectionObject, getAssetAmountArgument(collateralAsset, amount, network)],
    typeArguments: getCollectionAndCoinTypeArgument(collateralAsset, network),
  }
}

export const createVaultAndAddCollateralAndBorrow = async (
  collectionObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  collateralAmount: number,
  borrowAmount: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []
  return {
    function: `${MODULES(network).mirage_scripts.address}::vault_scripts::register_and_add${getScriptMiddle(
      getTypeFromMoveAsset(collateralAsset),
    )}_and_borrow_entry`,
    functionArguments: [
      collectionObject,
      getAssetAmountArgument(collateralAsset, collateralAmount, network),
      getAssetAmountArgument(collateralAsset, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: getCollectionAndCoinTypeArgument(collateralAsset, network),
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
  network: Network | string,
): Promise<InputEntryFunctionData> => {
  return {
    function: `${mirageAddress(network)}::vault::add_collateral_${getFunctionSuffix(getTypeFromMoveAsset(collateralAsset))}`,
    functionArguments: [vaultObject, getAssetAmountArgument(collateralAsset, amount, network)],
    typeArguments: getVaultAndCoinTypeArgument(collateralAsset, network),
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
  borrowToken: MoveToken,
  borrowAmount: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${mirageAddress(network)}::vault::borrow_entry`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(borrowToken, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: getVaultTypeArgument(network),
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
  borrowToken: MoveToken,
  removeAmount: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []
  return {
    function: `${mirageAddress(network)}::vault::remove_collateral_${getFunctionSuffix(
      getTypeFromMoveAsset(collateralAsset),
    )}`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, removeAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: getVaultAndCoinTypeArgument(collateralAsset, network),
  }
}

/**
 * Build a payload to repay a borrow of a mirage asset
 * @param vaultObject the address of the vault to interact with
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param repayAmount the amount to repay in rebase parts, no precision
 * @returns payload promise for the transaction
 */
export const repayDebt = async (
  vaultObject: MoveObjectType,
  borrowToken: MoveToken,
  repayAmount: number,
  network: Network | string,
): Promise<InputEntryFunctionData> => {
  return {
    function: `${mirageAddress(network)}::vault::repay_entry`,
    functionArguments: [vaultObject, getAssetAmountArgument(borrowToken, repayAmount, network)],
    typeArguments: getVaultTypeArgument(network),
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
  borrowToken: MoveToken,
  addAmount: number,
  borrowAmount: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).mirage_scripts.address}::vault_scripts::add${getScriptMiddle(
      getTypeFromMoveAsset(collateralAsset),
    )}_and_borrow`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, addAmount, network),
      getAssetAmountArgument(borrowToken, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: getVaultAndCoinTypeArgument(collateralAsset, network),
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove, no precision
 * @param repayAmount the amount to repay, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const repayDebtAndRemoveCollateral = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  removeAmount: number,
  repayAmount: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).mirage_scripts.address}::vault_scripts::remove${getScriptMiddle(
      getTypeFromMoveAsset(collateralAsset),
    )}_and_repay`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, removeAmount, network),
      getAssetAmountArgument(borrowToken, repayAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: getVaultAndCoinTypeArgument(collateralAsset, network),
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param vaultObject the address of the vault to interact with
 * @param collateralAsset the collateral of the vault (e.g APT)
 * @param borrowToken the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add, no precision
 * @param repayAmount the amount to repay, no precision
 * @returns payload promise for the transaction
 */
export const addCollateralAndRepayDebt = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  addAmount: number,
  repayAmount: number,
  network: Network | string,
): Promise<InputEntryFunctionData> => {
  return {
    function: `${MODULES(network).mirage_scripts.address}::vault_scripts::add${getScriptMiddle(
      getTypeFromMoveAsset(collateralAsset),
    )}_and_repay`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, addAmount, network),
      getAssetAmountArgument(borrowToken, repayAmount, network),
    ],
    typeArguments: getVaultAndCoinTypeArgument(collateralAsset, network),
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
  borrowToken: MoveToken,
  removeAmount: number,
  borrowAmount: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).mirage_scripts.address}::vault_scripts::remove${getScriptMiddle(
      getTypeFromMoveAsset(collateralAsset),
    )}_and_borrow`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(collateralAsset, removeAmount, network),
      getAssetAmountArgument(borrowToken, borrowAmount, network),
      collateralVaas,
      borrowVaas,
    ],
    typeArguments: getVaultAndCoinTypeArgument(collateralAsset, network),
  }
}

export const liquidateVaultWithPart = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  partToLiquidate: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${mirageAddress(network)}::vault::liquidate_entry`,
    functionArguments: [vaultObject, partToLiquidate, collateralVaas, borrowVaas],
  }
}

export const liquidateVaultWithTokens = async (
  vaultObject: MoveObjectType,
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  debtAmountToLiquidate: number,
  network: Network | string = Network.MAINNET,
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralAsset, network)
  const borrowFeed = getPriceFeed(borrowToken, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).keeper_scripts.address}::vault_scripts::liquidate_vault_with_tokens`,
    functionArguments: [
      vaultObject,
      getAssetAmountArgument(borrowToken, debtAmountToLiquidate, network),
      collateralVaas,
      borrowVaas,
    ],
  }
}
