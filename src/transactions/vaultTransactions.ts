import {
  TypeTagVector,
  MoveVector,
  U8,
  AccountAddress,
  InputEntryFunctionData,
  MoveObjectType,
  TransactionPayloadEntryFunction,
  EntryFunctionABI,
  generateTransactionPayloadWithABI,
  objectStructTag,
  TypeTagStruct,
  TypeTagU64,
  parseTypeTag,
} from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../utils'
import { getAssetAmountArgument, getAssetAmountBCS, getDecimal8Argument, getDecimal8BCS } from './'
import { Vault, VaultCollection } from '../entities'

const getFunctionSuffix = (coinType: string | undefined): string => {
  return coinType ? 'coin_entry' : 'entry'
}

export const createVaultPayload = (
  collectionObjectAddress: MoveObjectType,
  collateralAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::create_vault_${getFunctionSuffix(collateralCoinType)}` as `${string}::${string}::${string}`
  const vaultCollectionType = VaultCollection.getVaultCollectionType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: collateralCoinType ? [{ constraints: [] }] : [],
    parameters: [new TypeTagStruct(objectStructTag(vaultCollectionType)), new TypeTagU64()],
  }

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [
      AccountAddress.fromString(collectionObjectAddress),
      getAssetAmountBCS(collateralAmount, collateralDecimals),
    ],
    typeArguments: collateralCoinType ? [parseTypeTag(collateralCoinType)] : [],
  })
}

export const createVaultAndBorrowPayload = (
  collectionObjectAddress: MoveObjectType,
  collateralAmount: number,
  borrowAmount: number,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8>,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::create_vault_and_borrow_${getFunctionSuffix(collateralCoinType)}` as `${string}::${string}::${string}`
  const vaultCollectionType = VaultCollection.getVaultCollectionType(deployerAddress)
  const abi: EntryFunctionABI = {
    typeParameters: collateralCoinType ? [{ constraints: [] }] : [],
    parameters: [
      new TypeTagStruct(objectStructTag(vaultCollectionType)),
      new TypeTagU64(),
      new TypeTagU64(),
      TypeTagVector.u8(),
      TypeTagVector.u8(),
    ],
  }

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [
      collectionObjectAddress,
      getAssetAmountBCS(collateralAmount, collateralDecimals),
      getDecimal8BCS(borrowAmount),
      collateralVaa,
      borrowVaa,
    ],
    typeArguments: collateralCoinType ? [parseTypeTag(collateralCoinType)] : [],
  })
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
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: collateralCoinType ? [{ constraints: [] }] : [],
    parameters: [new TypeTagStruct(objectStructTag(vaultType)), new TypeTagU64()],
  }

  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::add_collateral_${getFunctionSuffix(collateralCoinType)}` as `${string}::${string}::${string}`
  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [vaultObjectAddress, getAssetAmountBCS(collateralAmount, collateralDecimals)],
    typeArguments: collateralCoinType ? [parseTypeTag(collateralCoinType)] : [],
  })
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
  borrowVaa: MoveVector<U8>,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: [],
    parameters: [
      new TypeTagStruct(objectStructTag(vaultType)),
      new TypeTagU64(),
      TypeTagVector.u8(),
      TypeTagVector.u8(),
    ],
  }
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::borrow_entry` as `${string}::${string}::${string}`

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [vaultObjectAddress, getDecimal8BCS(borrowAmount), collateralVaa, borrowVaa],
    typeArguments: [],
  })
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
  borrowVaa: MoveVector<U8>,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: [],
    parameters: [
      new TypeTagStruct(objectStructTag(vaultType)),
      new TypeTagU64(),
      TypeTagVector.u8(),
      TypeTagVector.u8(),
    ],
  }
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::remove_collateral_entry` as `${string}::${string}::${string}`

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountBCS(removeAmount, collateralDecimals),
      collateralVaa,
      borrowVaa,
    ],
    typeArguments: [],
  })
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
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: [],
    parameters: [new TypeTagStruct(objectStructTag(vaultType)), new TypeTagU64()],
  }
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::repay_part_entry` as `${string}::${string}::${string}`

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [vaultObjectAddress, getDecimal8BCS(repayPartAmount)],
    typeArguments: [],
  })
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
  borrowVaa: MoveVector<U8>,
  collateralCoinType: string | undefined,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: [],
    parameters: [
      new TypeTagStruct(objectStructTag(vaultType)),
      new TypeTagU64(),
      new TypeTagU64(),
      TypeTagVector.u8(),
      TypeTagVector.u8(),
    ],
  }
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::add_and_borrow_${getFunctionSuffix(collateralCoinType)}` as `${string}::${string}::${string}`

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountBCS(addAmount, collateralDecimals),
      getDecimal8BCS(borrowAmount),
      collateralVaa,
      borrowVaa,
    ],
    typeArguments: collateralCoinType ? [parseTypeTag(collateralCoinType)] : [],
  })
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
  borrowVaa: MoveVector<U8>,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: [],
    parameters: [
      new TypeTagStruct(objectStructTag(vaultType)),
      new TypeTagU64(),
      new TypeTagU64(),
      TypeTagVector.u8(),
      TypeTagVector.u8(),
    ],
  }
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::repay_and_remove` as `${string}::${string}::${string}`

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountBCS(removeAmount, collateralDecimals),
      getDecimal8BCS(repayPartAmount),
      collateralVaa,
      borrowVaa,
    ],
    typeArguments: [],
  })
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
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: [],
    parameters: [new TypeTagStruct(objectStructTag(vaultType)), new TypeTagU64(), new TypeTagU64()],
  }
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::add_and_repay_${getFunctionSuffix(collateralCoinType)}` as `${string}::${string}::${string}`

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountArgument(addAmount, collateralDecimals),
      getDecimal8BCS(repayPartAmount),
    ],
    typeArguments: collateralCoinType ? [parseTypeTag(collateralCoinType)] : [],
  })
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
  borrowVaa: MoveVector<U8>,
  collateralDecimals: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const vaultType = Vault.getVaultType(deployerAddress)

  const abi: EntryFunctionABI = {
    typeParameters: [],
    parameters: [
      new TypeTagStruct(objectStructTag(vaultType)),
      new TypeTagU64(),
      new TypeTagU64(),
      TypeTagVector.u8(),
      TypeTagVector.u8(),
    ],
  }
  const functionName =
    `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::remove_and_borrow_entry` as `${string}::${string}::${string}`

  return generateTransactionPayloadWithABI({
    abi,
    function: functionName,
    functionArguments: [
      vaultObjectAddress,
      getAssetAmountBCS(removeAmount, collateralDecimals),
      getDecimal8BCS(borrowAmount),
      collateralVaa,
      borrowVaa,
    ],
    typeArguments: [],
  })
}

export const createLiquidateVaultWithPartPayload = (
  vaultObjectAddress: MoveObjectType,
  partToLiquidate: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8>,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::liquidate_entry`,
    functionArguments: [vaultObjectAddress, partToLiquidate, collateralVaa, borrowVaa],
  }
}

export const createLiquidateVaultBankruptPayload = (
  vaultObjectAddress: MoveObjectType,
  debtAmountToLiquidate: number,
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8>,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::vault_scripts::liquidate_bankrupt_entry`,
    functionArguments: [vaultObjectAddress, getDecimal8Argument(debtAmountToLiquidate), collateralVaa, borrowVaa],
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
  collateralVaa: MoveVector<U8>,
  borrowVaa: MoveVector<U8>,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::merge_vaults`,
    functionArguments: [dstVaultObjectAddress, srcVaultObjectAddress, collateralVaa, borrowVaa],
  }
}
