import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import {
  getNetwork,
  getPairFromVaultCollectionAddress,
  getPriceFeed,
  getPriceFeedUpdateData,
  getTypeFromMoveAsset,
  mirageAddress,
  MODULES,
  MoveAsset,
  MoveToken,
} from '../constants'
import { getAssetAmountArgument } from './'
import { BaseTransactions } from './baseTransactions'

// const type = 'entry_function_payload'

const getCoinTypeArgumentIfNeeded = (collateralAsset: MoveAsset): string[] => {
  switch (getTypeFromMoveAsset(collateralAsset)) {
    case 'MoveToken':
      return []
    case 'MoveCoin': // TODO update this when we support more than just APT for coins as collateral
      return ['0x1::aptos_coin::AptosCoin']
    default:
      return []
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

export class VaultTransactions extends BaseTransactions {
  async createVaultAndAddCollateral(collectionObject: MoveObjectType, amount: number): Promise<InputEntryFunctionData> {
    const collateralAsset = getPairFromVaultCollectionAddress(collectionObject, this.config).collateralAsset
    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::create_vault_${getFunctionSuffix(
        getTypeFromMoveAsset(collateralAsset),
      )}`,
      functionArguments: [collectionObject, getAssetAmountArgument(collateralAsset, amount, this.config)],
      typeArguments: getCoinTypeArgumentIfNeeded(collateralAsset),
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
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::create_vault_and_borrow_${getFunctionSuffix(
        getTypeFromMoveAsset(collateralAsset),
      )}`,
      functionArguments: [
        collectionObject,
        getAssetAmountArgument(collateralAsset, collateralAmount, this.config),
        getAssetAmountArgument(borrowToken, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getCoinTypeArgumentIfNeeded(collateralAsset),
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
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::add_collateral_${getFunctionSuffix(getTypeFromMoveAsset(collateralAsset))}`,
      functionArguments: [vaultObject, getAssetAmountArgument(collateralAsset, amount, this.config)],
      typeArguments: getCoinTypeArgumentIfNeeded(collateralAsset),
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
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::borrow_entry`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(borrowToken, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
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
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::remove_collateral_entry`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, removeAmount, this.config),
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
  async repayDebtPart(vaultObject: MoveObjectType, repayPartAmount: number): Promise<InputEntryFunctionData> {
    return {
      function: `${mirageAddress(this.config)}::vault::repay_part_entry`,
      functionArguments: [vaultObject, repayPartAmount],
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
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::add_and_borrow_${getFunctionSuffix(
        getTypeFromMoveAsset(collateralAsset),
      )}`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, addAmount, this.config),
        getAssetAmountArgument(borrowToken, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: getCoinTypeArgumentIfNeeded(collateralAsset),
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
  async repayDebtAndRemoveCollateral(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    removeAmount: number,
    repayPartAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::repay_and_remove`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, removeAmount, this.config),
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
  async addCollateralAndRepayDebt(
    vaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    addAmount: number,
    repayPartAmount: number,
  ): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::add_and_repay_${getFunctionSuffix(
        getTypeFromMoveAsset(collateralAsset),
      )}`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, addAmount, this.config),
        repayPartAmount,
      ],
      typeArguments: getCoinTypeArgumentIfNeeded(collateralAsset),
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
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::remove_and_borrow_entry`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(collateralAsset, removeAmount, this.config),
        getAssetAmountArgument(borrowToken, borrowAmount, this.config),
        collateralVaas,
        borrowVaas,
      ],
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

  async liquidateVaultBankrupt(
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
      function: `${MODULES(this.config).mirage_scripts.address}::vault_scripts::liquidate_bankrupt_entry`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(borrowToken, debtAmountToLiquidate, this.config),
        collateralVaas,
        borrowVaas,
      ],
    }
  }

  async accrueInterest(vaultCollectionObject: MoveObjectType): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::vault::accrue_interest`,
      functionArguments: [vaultCollectionObject],
    }
  }

  async mergeVaults(
    dstVaultObject: MoveObjectType,
    srcVaultObject: MoveObjectType,
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(collateralAsset, this.network)
    const borrowFeed = getPriceFeed(borrowToken, this.network)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []
    return {
      function: `${MODULES(this.config).mirage.address}::vault::merge_vaults`,
      functionArguments: [dstVaultObject, srcVaultObject, collateralVaas, borrowVaas],
    }
  }
}
