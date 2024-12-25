import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { getModuleAddress, getNetwork, getPriceFeedUpdateData, MoveModules } from '../constants'
import { getAssetAmountArgument, getDecimal8Argument } from './'
import { BaseTransactions } from './baseTransactions'

// const type = 'entry_function_payload'

const getFunctionSuffix = (coinType: string): string => {
  return coinType ? 'entry' : 'coin_entry'
}

export class VaultTransactions extends BaseTransactions {
  async createVaultAndAddCollateral(
    collateralSymbol: string,
    borrowSymbol: string,
    amount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralType = this.config.getTokenCoinType(collateralSymbol)
    const collateralDecimals = this.config.tokens[collateralSymbol].decimals
    const collectionObject = this.config.getVaultAddress(collateralSymbol, borrowSymbol)
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::create_vault_${getFunctionSuffix(collateralType)}`,
      functionArguments: [collectionObject, getAssetAmountArgument(amount, collateralDecimals)],
      typeArguments: collateralType ? [collateralType] : [],
    }
  }

  async createVaultAndAddCollateralAndBorrow(
    collateralSymbol: string,
    borrowSymbol: string,
    collateralAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralType = this.config.getTokenCoinType(collateralSymbol)
    const collateralDecimals = this.config.tokens[collateralSymbol].decimals
    const collectionObject = this.config.getVaultAddress(collateralSymbol, borrowSymbol)

    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::create_vault_and_borrow_${getFunctionSuffix(collateralType)}`,
      functionArguments: [
        collectionObject,
        getAssetAmountArgument(collateralAmount, collateralDecimals),
        getDecimal8Argument(borrowAmount),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: collateralType ? [collateralType] : [],
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
    collateralSymbol: string,
    amount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralType = this.config.getTokenCoinType(collateralSymbol)
    const collateralDecimals = this.config.tokens[collateralSymbol].decimals

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::add_collateral_${getFunctionSuffix(collateralType)}`,
      functionArguments: [vaultObject, getAssetAmountArgument(amount, collateralDecimals)],
      typeArguments: collateralType ? [collateralType] : [],
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
    collateralSymbol: string,
    borrowSymbol: string,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::borrow_entry`,
      functionArguments: [vaultObject, getDecimal8Argument(borrowAmount), collateralVaas, borrowVaas],
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
    collateralSymbol: string,
    borrowSymbol: string,
    removeAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)
    const collateralDecimals = this.config.tokens[collateralSymbol].decimals

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::remove_collateral_entry`,
      functionArguments: [
        vaultObject,
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
  async repayDebtPart(vaultObject: MoveObjectType, repayPartAmount: number): Promise<InputEntryFunctionData> {
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::repay_part_entry`,
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
    collateralSymbol: string,
    borrowSymbol: string,
    addAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralType = this.config.getTokenCoinType(collateralSymbol)
    const collateralDecimals = this.config.tokens[collateralSymbol].decimals

    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::add_and_borrow_${getFunctionSuffix(collateralType)}`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(addAmount, collateralDecimals),
        getDecimal8Argument(borrowAmount),
        collateralVaas,
        borrowVaas,
      ],
      typeArguments: collateralType ? [collateralType] : [],
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
    collateralSymbol: string,
    borrowSymbol: string,
    removeAmount: number,
    repayPartAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralDecimals = this.config.tokens[collateralSymbol].decimals

    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::repay_and_remove`,
      functionArguments: [
        vaultObject,
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
  async addCollateralAndRepayDebt(
    vaultObject: MoveObjectType,
    collateralSymbol: string,
    addAmount: number,
    repayPartAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralType = this.config.getTokenCoinType(collateralSymbol)
    const collateralDecimals = this.config.tokens[collateralSymbol].decimals

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::add_and_repay_${getFunctionSuffix(collateralSymbol)}`,
      functionArguments: [vaultObject, getAssetAmountArgument(addAmount, collateralDecimals), repayPartAmount],
      typeArguments: collateralType ? [collateralType] : [],
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
    collateralSymbol: string,
    borrowSymbol: string,
    removeAmount: number,
    borrowAmount: number,
  ): Promise<InputEntryFunctionData> {
    const collateralDecimals = this.config.getTokenDecimals(collateralSymbol)

    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}, this.config.deployerAddress)}::vault_scripts::remove_and_borrow_entry`,
      functionArguments: [
        vaultObject,
        getAssetAmountArgument(removeAmount, collateralDecimals),
        getDecimal8Argument(borrowAmount),
        collateralVaas,
        borrowVaas,
      ],
    }
  }

  async liquidateVaultWithPart(
    vaultObject: MoveObjectType,
    collateralSymbol: string,
    borrowSymbol: string,
    partToLiquidate: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::liquidate_entry`,
      functionArguments: [vaultObject, partToLiquidate, collateralVaas, borrowVaas],
    }
  }

  async liquidateVaultBankrupt(
    vaultObject: MoveObjectType,
    collateralSymbol: string,
    borrowSymbol: string,
    debtAmountToLiquidate: number,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::vault_scripts::liquidate_bankrupt_entry`,
      functionArguments: [vaultObject, getDecimal8Argument(debtAmountToLiquidate), collateralVaas, borrowVaas],
    }
  }

  async accrueInterest(collateralSymbol: string, borrowSymbol: string): Promise<InputEntryFunctionData> {
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::accrue_interest`,
      functionArguments: [this.config.getVaultAddress(collateralSymbol, borrowSymbol)],
    }
  }

  async mergeVaults(
    dstVaultObject: MoveObjectType,
    srcVaultObject: MoveObjectType,
    collateralSymbol: string,
    borrowSymbol: string,
  ): Promise<InputEntryFunctionData> {
    const collateralFeed = this.config.getVaultCollateralPriceFeedId(collateralSymbol, borrowSymbol)
    const borrowFeed = this.config.getVaultBorrowPriceFeedId(collateralSymbol, borrowSymbol)

    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(this.network)) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(this.network)) : []
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::merge_vaults`,
      functionArguments: [dstVaultObject, srcVaultObject, collateralVaas, borrowVaas],
    }
  }
}
