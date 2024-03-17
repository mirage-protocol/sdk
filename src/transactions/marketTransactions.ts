import { Network } from '@aptos-labs/ts-sdk'

import {
  assetInfo,
  getNetwork,
  getPriceFeed,
  getPriceFeedUpdateData,
  mirageAddress,
  moveAssetInfo,
  MoveCoin,
  MoveToken,
  Perpetual,
} from '../constants'
import { PositionSide } from '../entities'
import { EntryFunctionPayload, getDecimal8Argument, MoveType, Payload } from './'
import { getAssetAmountArgument } from './'

const type = 'entry_function_payload'

// Get the types for this market
export const getMarketTypeArguments = (margin: MoveToken | string, perpetual: Perpetual): Array<MoveType> => {
  return [moveAssetInfo(margin).type, assetInfo(perpetual).type]
}

/**
 * Open a position in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openPosition = async (
  marginCoin: MoveToken,
  perpetual: Perpetual,
  isInitialized: boolean,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desired_price: number,
  maxPriceSlippage: number,
  takeProfitPrice: number,
  stopLossPrice: number,
  triggerPaymentAmount: number,
  network: Network
): Promise<Payload> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  return {
    function: isInitialized
      ? `${mirageAddress()}::market::open_position`
      : `${mirageAddress()}::market_scripts::register_and_open_position`,
    type,
    arguments: [
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(desired_price),
      getDecimal8Argument(maxPriceSlippage),
      getDecimal8Argument(takeProfitPrice),
      getDecimal8Argument(stopLossPrice),
      getAssetAmountArgument(MoveCoin.APT, triggerPaymentAmount),
    ],
    type_arguments: getMarketTypeArguments(marginCoin, perpetual),
  }
}

/**
 * Close a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const closePosition = async (
  marginCoin: MoveToken,
  perpetual: Perpetual,
  network: Network
): Promise<Payload> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    type,
    function: `${mirageAddress()}::market::close_position`,
    arguments: [perpetualVaas, marginVaas],
    type_arguments: getMarketTypeArguments(marginCoin, perpetual),
  }
  return payload
}

/**
 * Place a limit order that can be trigger when the market price
 * of a long/short is below/above a trigger price
 * @returns payload promise for the transaction
 */
export const placeLimitOrder = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  isInitialized: boolean,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  triggerPrice: number,
  maxPriceSlippage: number,
  isIncrease: boolean,
  triggersAbove: boolean,
  triggerPaymentAmount: number,
  expiration: bigint, // in seconds
  network: Network
): Promise<Payload> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  return {
    type,
    function: isInitialized
      ? `${mirageAddress()}::market::place_limit_order`
      : `${mirageAddress()}::market_scripts::register_and_place_limit`,
    arguments: [
      perpetualVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      isIncrease,
      triggersAbove,
      getDecimal8Argument(triggerPaymentAmount),
      expiration.toString(), // sdk breaks for large non-string integers
    ],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
}

/**
 * Cancel a limit order
 * @returns payload promise for the transaction
 */
export const cancelLimitOrder = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  index: number
): Promise<Payload> => {
  const payload = {
    type,
    function: `${mirageAddress()}::market::cancel_limit_order`,
    arguments: [index],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
  return payload
}

export const updateTpsl = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  stop_loss_price: number,
  take_profit_price: number,
  trigger_amount: number,
  network: Network
): Promise<Payload> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    type,
    function: `${mirageAddress()}::market::update_tpsl`,
    arguments: [
      perpetualVaas,
      getDecimal8Argument(stop_loss_price),
      getDecimal8Argument(take_profit_price),
      getDecimal8Argument(trigger_amount),
    ],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
  return payload
}

/**
 * Update the margin of a position
 * @returns payload promise for the transaction
 */
export const updateMargin = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  newMarginAmount: number,
  network: Network
): Promise<Payload> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    type,
    function: `${mirageAddress()}::market::update_margin`,
    arguments: [perpetualVaas, marginVaas, getDecimal8Argument(newMarginAmount)],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
  return payload
}

/**
 * Update the position size of a position
 * @returns payload promise for the transaction
 */
export const updatePositionSize = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  newPositionSize: number,
  network: Network
): Promise<Payload> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    type,
    function: `${mirageAddress()}::market::update_position_size`,
    arguments: [perpetualVaas, marginVaas, getDecimal8Argument(newPositionSize)],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
  return payload
}

/**
 * Trigger a take profit or stop loss of the position at address to_trigger
 * @returns payload promise for the transaction
 */
export const triggerTpsl = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  toTrigger: string,
  perpetualVaas: number[],
  marginVaas: number[]
): Promise<EntryFunctionPayload> => {
  const payload = {
    function: `${mirageAddress()}::market::trigger_tpsl`,
    arguments: [toTrigger, perpetualVaas, marginVaas],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
  return payload
}

/**
 * Liquidate a position at address to_trigger
 * @returns payload promise for the transaction
 */
export const liquidatePosition = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  toTrigger: string,
  perpetualVaas: number[],
  marginVaas: number[]
): Promise<EntryFunctionPayload> => {
  const payload = {
    function: `${mirageAddress()}::market::liquidate_position`,
    arguments: [toTrigger, perpetualVaas, marginVaas],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
  return payload
}

/**
 * Trigger a limit order at the index at address to_trigger
 * @returns payload promise for the transaction
 */
export const triggerLimitOrder = async (
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  toTrigger: string,
  index: bigint,
  perpetualVaas: number[],
  marginVaas: number[]
): Promise<EntryFunctionPayload> => {
  const payload = {
    function: `${mirageAddress()}::market::trigger_limit_order`,
    arguments: [toTrigger, index, perpetualVaas, marginVaas],
    type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
  }
  return payload
}
