import * as aptos from 'aptos'

import {
  coinInfo,
  getNetwork,
  getPriceFeed,
  getPriceFeedUpdateData,
  mirageAddress,
  MoveCoin,
  Network,
} from '../constants'
import { getScriptBytecode } from '../constants/scripts'
import { getBCSCoinAmountArgument, getCoinAmountArgument, MoveType, Payload, ScriptPayload } from './'

const type = 'entry_function_payload'

const getVaultTypeArguments = (collateral: MoveCoin | string, borrow: MoveCoin | string): MoveType[] => {
  return [coinInfo(collateral).type, coinInfo(borrow).type]
}

/**
 * Build a payload to add collateral to a vault
 * @param collateralCoin the collateral of the vault (e.g APT)
 * @param borrowCoin the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add to the vault, no precision
 * @returns payload promise for the transaction
 */
export const addCollateral = async (
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  amount: number
): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::vault::add_collateral`,
    arguments: [getCoinAmountArgument(collateralCoin, amount)],
    type_arguments: getVaultTypeArguments(collateralCoin, borrowCoin),
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
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  borrowAmount: number,
  network: Network | string = Network.MAINNET
): Promise<Payload> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    type,
    function: `${mirageAddress()}::vault::borrow`,
    arguments: [getCoinAmountArgument(borrowCoin, borrowAmount), collateralVaas, borrowVaas],
    type_arguments: getVaultTypeArguments(collateralCoin, borrowCoin),
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
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  removeAmount: number,
  network: Network | string = Network.MAINNET
): Promise<Payload> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []
  return {
    type,
    function: `${mirageAddress()}::vault::remove_collateral`,
    arguments: [getCoinAmountArgument(collateralCoin, removeAmount), collateralVaas, borrowVaas],
    type_arguments: getVaultTypeArguments(collateralCoin, borrowCoin),
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
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  repayAmount: number
): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::vault::repay`,
    arguments: [getCoinAmountArgument(borrowCoin, repayAmount)],
    type_arguments: getVaultTypeArguments(collateralCoin, borrowCoin),
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
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  addAmount: number,
  borrowAmount: number,
  network: Network | string = Network.MAINNET
): Promise<ScriptPayload> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return new aptos.TxnBuilderTypes.TransactionPayloadScript(
    new aptos.TxnBuilderTypes.Script(
      getScriptBytecode('add_and_borrow'),
      [
        new aptos.TxnBuilderTypes.TypeTagStruct(
          aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(collateralCoin).type)
        ),
        new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(borrowCoin).type)),
      ],
      [
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, addAmount)),
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, borrowAmount)),
        new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(collateralVaas)),
        new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(borrowVaas)),
      ]
    )
  )
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
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  removeAmount: number,
  repayAmount: number,
  network: Network | string = Network.MAINNET
): Promise<ScriptPayload> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return new aptos.TxnBuilderTypes.TransactionPayloadScript(
    new aptos.TxnBuilderTypes.Script(
      getScriptBytecode('repay_and_remove'),
      [
        new aptos.TxnBuilderTypes.TypeTagStruct(
          aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(collateralCoin).type)
        ),
        new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(borrowCoin).type)),
      ],
      [
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, removeAmount)),
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, repayAmount)),
        new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(collateralVaas)),
        new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(borrowVaas)),
      ]
    )
  )
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
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  addAmount: number,
  repayAmount: number
): Promise<ScriptPayload> => {
  return new aptos.TxnBuilderTypes.TransactionPayloadScript(
    new aptos.TxnBuilderTypes.Script(
      getScriptBytecode('add_and_repay'),
      [
        new aptos.TxnBuilderTypes.TypeTagStruct(
          aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(collateralCoin).type)
        ),
        new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(borrowCoin).type)),
      ],
      [
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, addAmount)),
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, repayAmount)),
      ]
    )
  )
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
  collateralCoin: MoveCoin,
  borrowCoin: MoveCoin,
  removeAmount: number,
  borrowAmount: number,
  network: Network | string = Network.MAINNET
): Promise<ScriptPayload> => {
  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return new aptos.TxnBuilderTypes.TransactionPayloadScript(
    new aptos.TxnBuilderTypes.Script(
      getScriptBytecode('remove_and_borrow'),
      [
        new aptos.TxnBuilderTypes.TypeTagStruct(
          aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(collateralCoin).type)
        ),
        new aptos.TxnBuilderTypes.TypeTagStruct(aptos.TxnBuilderTypes.StructTag.fromString(coinInfo(borrowCoin).type)),
      ],
      [
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(collateralCoin, removeAmount)),
        new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(borrowCoin, borrowAmount)),
        new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(collateralVaas)),
        new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(borrowVaas)),
      ]
    )
  )
}
