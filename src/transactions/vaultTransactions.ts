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
import { getBCSCoinAmountArgument, getCoinAmountArgument, MoveType, Payload, ScriptPayload } from './'

const type = 'entry_function_payload'

export const removeAndBorrowScript = (): Uint8Array => {
  return Uint8Array.from(
    Buffer.from(
      'a11ceb0b060000000601000203020e041004051417072b1f084a20000000010301020000000203010200000002010205060c03030a020a0200020900090104060c030a020a02057661756c741172656d6f76655f636f6c6c61746572616c06626f72726f7755105113b592d67a22f4216be9e1461ab8f3122305adcc101582b7703d7fc45302000000010b0a000b010a030a0438000b000b020b030b04380102',
      'hex'
    )
  )
}

const getVaultTypeArguments = (collateral: MoveCoin | string, borrow: MoveCoin | string): MoveType[] => {
  return [coinInfo(collateral).type, coinInfo(borrow).type]
}

/**
 * Build a payload to add collateral to a vault
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add to the vault, no precision
 * @returns payload promise for the transaction
 */
export const addCollateral = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  amount: number
): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::vault::add_collateral`,
    arguments: [getCoinAmountArgument(collateral, amount)],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}

/**
 * Build a payload to borrow mirage asset
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param borrowAmount the amount to add to the borrow from the vault, no precision
 * @param collateralFeedId the address of the collateral price feed
 * @param borrowFeedId the address of the borrow price feed
 * @returns payload promise for the transaction
 */
export const borrow = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  borrowAmount: number,
  network: Network | string = Network.MAINNET
): Promise<Payload> => {
  const collateralCoin = typeof collateral === 'string' ? MoveCoin[collateral] : collateral
  const borrowCoin = typeof borrow === 'string' ? MoveCoin[borrow] : borrow

  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return {
    type,
    function: `${mirageAddress()}::vault::borrow`,
    arguments: [getCoinAmountArgument(borrow, borrowAmount), collateralVaas, borrowVaas],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}

/**
 * Build a payload to remove collateral from a vault
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove from the vault, no precision
 * @param collateralFeedId the address of the collateral price feed
 * @param borrowFeedId the address of the borrow price feed
 * @returns payload promise for the transaction
 */
export const removeCollateral = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  removeAmount: number,
  network: Network
): Promise<Payload> => {
  const collateralCoin = typeof collateral === 'string' ? MoveCoin[collateral] : collateral
  const borrowCoin = typeof borrow === 'string' ? MoveCoin[borrow] : borrow

  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []
  return {
    type,
    function: `${mirageAddress()}::vault::remove_collateral`,
    arguments: [getCoinAmountArgument(collateral, removeAmount), collateralVaas, borrowVaas],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}

/**
 * Build a payload to repay a borrow of a mirage asset
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param repayAmount the amount to repay, no precision
 * @returns payload promise for the transaction
 */
export const repayDebt = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  repayAmount: number
): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::vault::repay`,
    arguments: [getCoinAmountArgument(borrow, repayAmount)],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add to vault, no precision
 * @param borrowAmount the amount to borrow, no precision
 * @param collateralFeedId the address of the collateral price feed
 * @param borrowFeedId the address of the borrow price feed
 * @returns payload promise for the transaction
 */
export const addCollateralAndBorrow = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  addAmount: number,
  borrowAmount: number,
  network: Network
): Promise<Payload> => {
  const collateralCoin = typeof collateral === 'string' ? MoveCoin[collateral] : collateral
  const borrowCoin = typeof borrow === 'string' ? MoveCoin[borrow] : borrow

  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []
  return {
    type,
    function: `${mirageAddress()}::vault::add_and_borrow`,
    arguments: [
      getCoinAmountArgument(collateral, addAmount),
      getCoinAmountArgument(borrow, borrowAmount),
      collateralVaas,
      borrowVaas,
    ],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param repayAmount the amount to repay, no precision
 * @param removeAmount the amount to remove, no precision
 * @param collateralFeedId the address of the collateral price feed
 * @param borrowFeedId the address of the borrow price feed
 * @returns payload promise for the transaction
 */
export const repayDebtAndRemoveCollateral = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  repayAmount: number,
  removeAmount: number,
  network: Network
): Promise<Payload> => {
  const collateralCoin = typeof collateral === 'string' ? MoveCoin[collateral] : collateral
  const borrowCoin = typeof borrow === 'string' ? MoveCoin[borrow] : borrow

  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []
  return {
    type,
    function: `${mirageAddress()}::vault::repay_and_remove`,
    arguments: [
      getCoinAmountArgument(collateral, removeAmount),
      getCoinAmountArgument(borrow, repayAmount),
      collateralVaas,
      borrowVaas,
    ],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param addAmount the amount to add, no precision
 * @param repayAmount the amount to repay, no precision
 * @returns payload promise for the transaction
 */
export const addCollateralAndRepayDebt = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  addAmount: number,
  repayAmount: number
): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::vault::add_and_repay`,
    arguments: [getCoinAmountArgument(collateral, addAmount), getCoinAmountArgument(borrow, repayAmount)],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param collateral the collateral of the vault (e.g APT)
 * @param borrow the borrow of the vault (e.g. mUSD)
 * @param removeAmount the amount to remove, no precision
 * @param borrowAmount the amount to borrow, no precision
 * @param collateralFeedId the address of the collateral price feed
 * @param borrowFeedId the address of the borrow price feed
 * @returns script promise for the transaction
 */
export const removeCollateralAndBorrow = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  removeAmount: number,
  borrowAmount: number,
  network: Network
): Promise<ScriptPayload> => {
  const collateralCoin = typeof collateral === 'string' ? MoveCoin[collateral] : collateral
  const borrowCoin = typeof borrow === 'string' ? MoveCoin[borrow] : borrow

  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : []

  return new aptos.TxnBuilderTypes.TransactionPayloadScript(
    new aptos.TxnBuilderTypes.Script(
      removeAndBorrowScript(),
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
