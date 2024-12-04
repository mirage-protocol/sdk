import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { MirageClientBase } from '../client/base'
import {
  getNetwork,
  getPairFromVaultCollectionAddress,
  getPriceFeed,
  getPriceFeedUpdateData,
  getTypeFromMoveAsset,
  mirageAddress,
  MirageConfig,
  MODULES,
  MoveAsset,
  MoveToken,
} from '../constants'
import { getAssetAmountArgument } from './'

// const type = 'entry_function_payload'

const getCollectionAndCoinTypeArgument = (collateralAsset: MoveAsset, config: MirageConfig): string[] => {
  switch (getTypeFromMoveAsset(collateralAsset)) {
    case 'MoveToken':
      return [`${mirageAddress(config)}::vault::VaultCollection`]
    case 'MoveCoin':
      return ['0x1::aptos_coin::AptosCoin', `${mirageAddress(config)}::vault::VaultCollection`]
    default:
      return [`${mirageAddress(config)}::vault::VaultCollection`]
  }
}
const getVaultAndCoinTypeArgument = (collateralAsset: MoveAsset, config: MirageConfig): string[] => {
  switch (getTypeFromMoveAsset(collateralAsset)) {
    case 'MoveToken':
      return [`${mirageAddress(config)}::vault::Vault`]
    case 'MoveCoin':
      return ['0x1::aptos_coin::AptosCoin', `${mirageAddress(config)}::vault::Vault`]
    default:
      return [`${mirageAddress(config)}::vault::Vault`]
  }
}

const getVaultTypeArgument = (config: MirageConfig): string[] => {
  return [`${mirageAddress(config)}::vault::Vault`]
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

export class VaultTransactions extends MirageClientBase {
  async createVaultAndAddCollateral(collectionObject: MoveObjectType, amount: number): Promise<InputEntryFunctionData> {
    const collateralAsset = getPairFromVaultCollectionAddress(collectionObject, this.config).collateralAsset
    return {
      function: `${mirageAddress(this.config)}::vault::register_and_add_collateral_${getFunctionSuffix(
        getTypeFromMoveAsset(collateralAsset),
      )}`,
      functionArguments: [collectionObject, getAssetAmountArgument(collateralAsset, amount, this.config)],
      typeArguments: getCollectionAndCoinTypeArgument(collateralAsset, this.config),
    }
  }

  async createVaultAndAddCollateralAndBorrow(
    collectionObject: MoveObjectType,
    collateralAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const { collateralAsset, borrow: borrowToken } = getPairFromVaultCollectionAddress(collectionObject, this.config)
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []
    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::register_and_add${getScriptMiddle(
        getTypeFromMoveAsset(collateralAsset),
      )}_and_borrow_entry`,
      functionArguments: [
        collectionObject,
        getAssetAmountArgument(collateralAsset, collateralAmount, this.config),
        getAssetAmountArgument(collateralAsset, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getCollectionAndCoinTypeArgument(collateralAsset, this.config),
    }
  }

  /**
   * Build a payload to add collateral to a vault
   * @param vaultObject the address of the vault to interact with
   * @param collateralAsset the collateral of the vault (e.g APT)
   * @param addAmount the amount to add to the vault, no precision
   * @returns payload promise for the transaction
   */
  async addCollateral(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    amount: number,
  ): Promise<InputEntryFunctionData> {
    return {
      function: `${mirageAddress(this.config)}::vault::add_collateral_${getFunctionSuffix(getTypeFromMoveAsset(collateralAsset))}`,
      functionArguments: [vaultObject, getAssetAmountArgument(collateralAsset, amount, this.config)],
      typeArguments: getVaultAndCoinTypeArgument(collateralAsset, this.config),
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
  async borrow(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${mirageAddress(this.config)}::vault::borrow_entry`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(borrowToken, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getVaultTypeArgument(this.config),
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
  async removeCollateral(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    removeAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []
    return {
      function: `${mirageAddress(this.config)}::vault::remove_collateral_${getFunctionSuffix(
        getTypeFromMoveAsset(collateralAsset),
      )}`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, removeAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getVaultAndCoinTypeArgument(collateralAsset, this.config),
    }
  }

  /**
   * Build a payload to repay a borrow of a mirage asset
   * @param vaultObject the address of the vault to interact with
   * @param borrowToken the borrow of the vault (e.g. mUSD)
   * @param repayAmount the amount to repay in rebase parts, no precision
   * @returns payload promise for the transaction
   */
  async repayDebt(
    vaultObject: MoveObjectType,
    borrowToken: MoveToken,
    repayAmount: number,
  ): Promise<InputEntryFunctionData> {
    return {
      function: `${mirageAddress(this.config)}::vault::repay_entry`,
      functionArguments: [vaultObject, getAssetAmountArgument(borrowToken, repayAmount, this.config)],
      typeArguments: getVaultTypeArgument(this.config),
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
  async addCollateralAndBorrow(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    addAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::add${getScriptMiddle(
        getTypeFromMoveAsset(collateralAsset),
      )}_and_borrow`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, addAmount, this.config),
        getAssetAmountArgument(borrowToken, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getVaultAndCoinTypeArgument(collateralAsset, this.config),
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
  async repayDebtAndRemoveCollateral(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    removeAmount: number,
    repayAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::remove${getScriptMiddle(
        getTypeFromMoveAsset(collateralAsset),
      )}_and_repay`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, removeAmount, this.config),
        getAssetAmountArgument(borrowToken, repayAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getVaultAndCoinTypeArgument(collateralAsset, this.config),
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
  async addCollateralAndRepayDebt(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    addAmount: number,
    repayAmount: number,
  ): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::add${getScriptMiddle(
        getTypeFromMoveAsset(collateralAsset),
      )}_and_repay`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, addAmount, this.config),
        getAssetAmountArgument(borrowToken, repayAmount, this.config),
      ],
      typeArguments: getVaultAndCoinTypeArgument(collateralAsset, this.config),
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
  async removeCollateralAndBorrow(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    removeAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::remove${getScriptMiddle(
        getTypeFromMoveAsset(collateralAsset),
      )}_and_borrow`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, removeAmount, this.config),
        getAssetAmountArgument(borrowToken, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getVaultAndCoinTypeArgument(collateralAsset, this.config),
    }
  }

  async liquidateVaultWithPart(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    partToLiquidate: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${mirageAddress(this.config)}::vault::liquidate_entry`,
      functionArguments: [vaultObject, partToLiquidate, collateralVaas, borrowVaas],
    }
  }

  async liquidateVaultWithTokens(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    debtAmountToLiquidate: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).keeper_scripts.address}::vault_scripts::liquidate_vault_with_tokens`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(borrowToken, debtAmountToLiquidate, this.config),
        collateralVaas,
        borrowVaas,
      ],
    }
  }
}
