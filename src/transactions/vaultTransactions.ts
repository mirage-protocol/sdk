import { InputEntryFunctionData, MoveObjectType, Network } from '@aptos-labs/ts-sdk'

import { getNetwork, getPriceFeed, getPriceFeedUpdateData, mirageAddress, MoveAsset, MoveToken } from '../constants'
import { getAssetAmountArgument } from './'

// const type = 'entry_function_payload'

// const getVaultTypeArgument = (): MoveType => {
//   return `${mirageAddress()}::vault::Vault`
// }

/**
 * Build a payload to add collateral to a vault
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add to the vault, no precision
 * @returns payload promise for the transaction
 */
export const addCollateral = async (
  vault_object: MoveObjectType,
  collateralToken: MoveAsset,
  amount: number
): Promise<InputEntryFunctionData> => {
  return {
    function: `${mirageAddress()}::vault::add_collateral`,
    functionArguments: [vault_object, getAssetAmountArgument(collateralToken, amount)],
    // typeArguments: getVaultTypeArgument(),
  }
}

/**
 * Build a payload to borrow mirage asset
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param borrowAmount the amount to add to the borrow from the vault, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const borrow = async (
  collateralCoin: MoveToken,
  borrowCoin: MoveToken,
  borrowAmount: number,
  network: Network | string = Network.MAINNET
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${mirageAddress()}::vault::borrow`,
    functionArguments: [getAssetAmountArgument(borrowCoin, borrowAmount), collateralVaas, borrowVaas],
    // type_arguments: getVaultTypeArgument(collateralCoin, borrowCoin),
  }
}

/**
 * Build a payload to remove collateral from a vault
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove from the vault, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const removeCollateral = async (
  collateralCoin: MoveToken,
  borrowCoin: MoveToken,
  removeAmount: number,
  network: Network | string = Network.MAINNET
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []
  return {
    function: `${mirageAddress()}::vault::remove_collateral`,
    functionArguments: [getAssetAmountArgument(collateralCoin, removeAmount), collateralVaas, borrowVaas],
    // type_arguments: getVaultTypeArgument(collateralCoin, borrowCoin),
  }
}

/**
 * Build a payload to repay a borrow of a mirage asset
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param repayAmount the amount to repay, no precision
 * @returns payload promise for the transaction
 */
export const repayDebt = async (
  // collateralCoin: MoveToken,
  borrowCoin: MoveToken,
  repayAmount: number
): Promise<InputEntryFunctionData> => {
  return {
    function: `${mirageAddress()}::vault::repay`,
    functionArguments: [getAssetAmountArgument(borrowCoin, repayAmount)],
    // type_arguments: getVaultTypeArgument(collateralCoin, borrowCoin),
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add to vault, no precision
 * @param borrowAmount the amount to borrow, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const addCollateralAndBorrow = async (
  collateralCoin: MoveToken,
  borrowCoin: MoveToken,
  addAmount: number,
  borrowAmount: number,
  network: Network | string = Network.MAINNET
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${mirageAddress()}::vault_scripts::add_and_borrow`,
    functionArguments: [
      getAssetAmountArgument(collateralCoin, addAmount),
      getAssetAmountArgument(borrowCoin, borrowAmount),
      collateralVaas,
      borrowVaas,
    ],
    // type_arguments: getVaultTypeArgument(collateralCoin, borrowCoin),
  }

  // return new aptos.TxnBuilderTypes.TransactionPayloadScript(
  //   new aptos.TxnBuilderTypes.Script(
  //     getScriptBytecode('add_and_borrow'),
  //     [
  //       new aptos.TxnBuilderTypes.TypeTagStruct(
  //         aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(collateralCoin).type)
  //       ),
  //       new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(borrowCoin).type)),
  //     ],
  //     [
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, addAmount)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, borrowAmount)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(collateralVaas)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(borrowVaas)),
  //     ]
  //   )
  // )
}

/**
 * Build a payload to add collateral and borrow
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove, no precision
 * @param repayAmount the amount to repay, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const repayDebtAndRemoveCollateral = async (
  collateralCoin: MoveToken,
  borrowCoin: MoveToken,
  removeAmount: number,
  repayAmount: number,
  network: Network | string = Network.MAINNET
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${mirageAddress()}::vault_scripts::repay_and_remove`,
    functionArguments: [
      getAssetAmountArgument(collateralCoin, removeAmount),
      getAssetAmountArgument(borrowCoin, repayAmount),
      collateralVaas,
      borrowVaas,
    ],
    // type_arguments: getVaultTypeArgument(collateralCoin, borrowCoin),
  }

  // return new aptos.TxnBuilderTypes.TransactionPayloadScript(
  //   new aptos.TxnBuilderTypes.Script(
  //     getScriptBytecode('repay_and_remove'),
  //     [
  //       new aptos.TxnBuilderTypes.TypeTagStruct(
  //         aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(collateralCoin).type)
  //       ),
  //       new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(borrowCoin).type)),
  //     ],
  //     [
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, removeAmount)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, repayAmount)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(collateralVaas)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(borrowVaas)),
  //     ]
  //   )
  // )
}

/**
 * Build a payload to add collateral and borrow
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add, no precision
 * @param repayAmount the amount to repay, no precision
 * @returns payload promise for the transaction
 */
export const addCollateralAndRepayDebt = async (
  collateralCoin: MoveToken,
  borrowCoin: MoveToken,
  addAmount: number,
  repayAmount: number
): Promise<InputEntryFunctionData> => {
  return {
    function: `${mirageAddress()}::vault_scripts::add_and_repay`,
    functionArguments: [
      getAssetAmountArgument(collateralCoin, addAmount),
      getAssetAmountArgument(borrowCoin, repayAmount),
    ],
    // type_arguments: getVaultTypeArgument(collateralCoin, borrowCoin),
  }

  // return new aptos.TxnBuilderTypes.TransactionPayloadScript(
  //   new aptos.TxnBuilderTypes.Script(
  //     getScriptBytecode('add_and_repay'),
  //     [
  //       new aptos.TxnBuilderTypes.TypeTagStruct(
  //         aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(collateralCoin).type)
  //       ),
  //       new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(borrowCoin).type)),
  //     ],
  //     [
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, addAmount)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, repayAmount)),
  //     ]
  //   )
  // )
}

/**
 * Build a payload to add collateral and borrow
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove, no precision
 * @param borrowAmount the amount to borrow, no precision
 * @param network the network to process this transaction on
 * @returns payload promise for the transaction
 */
export const removeCollateralAndBorrow = async (
  collateralCoin: MoveToken,
  borrowCoin: MoveToken,
  removeAmount: number,
  borrowAmount: number,
  network: Network | string = Network.MAINNET
): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    function: `${mirageAddress()}::vault_scripts::remove_and_borrow`,
    functionArguments: [
      getAssetAmountArgument(collateralCoin, removeAmount),
      getAssetAmountArgument(borrowCoin, borrowAmount),
      collateralVaas,
      borrowVaas,
    ],
    // type_arguments: getVaultTypeArgument(collateralCoin, borrowCoin),
  }

  // return new aptos.TxnBuilderTypes.TransactionPayloadScript(
  //   new aptos.TxnBuilderTypes.Script(
  //     getScriptBytecode('remove_and_borrow'),
  //     [
  //       new aptos.TxnBuilderTypes.TypeTagStruct(
  //         aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(collateralCoin).type)
  //       ),
  //       new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(moveAssetInfo(borrowCoin).type)),
  //     ],
  //     [
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, removeAmount)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, borrowAmount)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(collateralVaas)),
  //       new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(borrowVaas)),
  //     ]
  //   )
  // )
}
