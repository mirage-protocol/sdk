import { Types } from 'aptos'
import BigNumber from 'bignumber.js'

import {
  coinInfo,
  getNetwork,
  getPriceFeed,
  getPriceFeedUpdateData,
  mirageAddress,
  MoveCoin,
  Network,
} from './constants'

const type = 'entry_function_payload'

export type Payload = Types.TransactionPayload_EntryFunctionPayload
export type MoveType = Types.MoveType

// Get the proper payload amount
const getAmountArgument = (coin: MoveCoin | string, amount: number): string => {
  return BigNumber(amount)
    .times(BigNumber(10).pow(coinInfo(coin).decimals))
    .toFixed(0)
}

// Get the types for this vault
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
    arguments: [getAmountArgument(collateral, amount)],
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

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : [[0]]
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : [[0]]

  return {
    type,
    function: `${mirageAddress()}::vault::borrow`,
    arguments: [getAmountArgument(borrow, borrowAmount), collateralVaas, borrowVaas],
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

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : [[0]]
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : [[0]]
  return {
    type,
    function: `${mirageAddress()}::vault::remove_collateral`,
    arguments: [getAmountArgument(collateral, removeAmount), collateralVaas, borrowVaas],
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
    arguments: [getAmountArgument(borrow, repayAmount)],
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

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : [[0]]
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : [[0]]
  return {
    type,
    function: `${mirageAddress()}::vault::add_and_borrow`,
    arguments: [
      getAmountArgument(collateral, addAmount),
      getAmountArgument(borrow, borrowAmount),
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

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : [[0]]
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : [[0]]
  return {
    type,
    function: `${mirageAddress()}::vault::repay_and_remove`,
    arguments: [
      getAmountArgument(borrow, repayAmount),
      getAmountArgument(collateral, removeAmount),
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
    arguments: [getAmountArgument(collateral, addAmount), getAmountArgument(borrow, repayAmount)],
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
 * @returns payload promise for the transaction
 */
export const removeCollateralAndBorrow = async (
  collateral: MoveCoin | string,
  borrow: MoveCoin | string,
  removeAmount: number,
  borrowAmount: number,
  network: Network
): Promise<Payload> => {
  const collateralCoin = typeof collateral === 'string' ? MoveCoin[collateral] : collateral
  const borrowCoin = typeof borrow === 'string' ? MoveCoin[borrow] : borrow

  const collateralFeed = getPriceFeed(collateralCoin, network)
  const borrowFeed = getPriceFeed(borrowCoin, network)

  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, getNetwork(network)) : [[0]]
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, getNetwork(network)) : [[0]]
  return {
    type,
    function: `${mirageAddress()}::vault::remove_and_borrow`,
    arguments: [
      getAmountArgument(collateral, removeAmount),
      getAmountArgument(borrow, borrowAmount),
      collateralVaas,
      borrowVaas,
    ],
    type_arguments: getVaultTypeArguments(collateral, borrow),
  }
}
