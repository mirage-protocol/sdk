import { InputEntryFunctionData, MoveObjectType, Network } from '@aptos-labs/ts-sdk'

import {
  getNetwork,
  getPriceFeed,
  getPriceFeedUpdateData,
  mirageAddress,
  MODULES,
  MoveCoin,
  MoveToken,
  Perpetual,
} from '../constants'
import { PositionSide } from '../entities'
import { getAssetAmountArgument, getDecimal8Argument } from './'

// Get the types for this market
export const getMarketTypeArgument = (network: Network | string): Array<string> => {
  return [`${mirageAddress(network)}::market::Market`]
}
export const getPositionTypeArgument = (network: Network | string): Array<string> => {
  return [`${mirageAddress(network)}::market::Position`]
}
export const getLimitOrdersTypeArgument = (network: Network | string): Array<string> => {
  return [`${mirageAddress(network)}::market::LimitOrders`]
}

/**
 * Open a position in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openPosition = async (
  marketObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetual: Perpetual,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desired_price: number,
  maxPriceSlippage: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).mirage_scripts.address}::market_scripts::open_position_entry`,

    functionArguments: [
      marketObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(desired_price),
      getDecimal8Argument(maxPriceSlippage),
    ],
    typeArguments: getMarketTypeArgument(network),
  }
}

/**
 * Open a position in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openPositionWithTpsl = async (
  marketObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetual: Perpetual,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desired_price: number,
  maxPriceSlippage: number,
  takeProfitPrice: number,
  stopLossPrice: number,
  triggerPaymentAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).mirage_scripts.address}::market_scripts::open_position_entry_with_tpsl`,

    functionArguments: [
      marketObject,
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
    typeArguments: getMarketTypeArgument(network),
  }
}

/**
 * Close a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const closePosition = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetual: Perpetual,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::close_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * Place a limit order on a new position that can be trigger when the market price
 * of a long/short is below/above a trigger price
 * @returns payload promise for the transaction
 */
export const openPositionAndPlaceLimitOrder = async (
  marketObject: MoveObjectType,
  perpetualAsset: Perpetual,
  marginAmount: number,
  positionSize: number,
  triggerPrice: number,
  maxPriceSlippage: number,
  triggersAbove: boolean,
  triggerPaymentAmount: number,
  expiration: bigint, // in seconds,
  isLong: boolean,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).mirage_scripts.address}::market_scripts::create_position_and_place_limit_order`,
    functionArguments: [
      marketObject,
      perpetualVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      true, // always is increase when creating a new position
      triggersAbove,
      getDecimal8Argument(triggerPaymentAmount),
      expiration.toString(), // sdk breaks for large non-string integers
      isLong,
    ],
    typeArguments: getMarketTypeArgument(network),
  }
}

/**
 * Place a limit order that can be trigger when the market price
 * of a long/short is below/above a trigger price
 * @returns payload promise for the transaction
 */
export const placeLimitOrder = async (
  positionObject: MoveObjectType,
  perpetualAsset: Perpetual,
  marginAmount: number,
  positionSize: number,
  triggerPrice: number,
  maxPriceSlippage: number,
  isIncrease: boolean,
  triggersAbove: boolean,
  triggerPaymentAmount: number,
  expiration: bigint, // in seconds
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  return {
    function: `${MODULES(network).mirage_scripts.address}::market_scripts::place_limit_order_entry`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      isIncrease,
      triggersAbove,
      getDecimal8Argument(triggerPaymentAmount),
      expiration.toString(), // sdk breaks for large non-string integers
    ],
    typeArguments: getPositionTypeArgument(network),
  }
}

/**
 * Cancel a limit order
 * @returns payload promise for the transaction
 */
export const cancelLimitOrder = async (
  limitOrdersObject: MoveObjectType,
  index: number,
  network: Network | string,
): Promise<InputEntryFunctionData> => {
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::cancel_limit_order_entry` as `${string}::${string}::${string}`,
    functionArguments: [limitOrdersObject, index],
    typeArguments: getLimitOrdersTypeArgument(network),
  }
  return payload
}

export const updateTpsl = async (
  positionObject: MoveObjectType,
  perpetualAsset: Perpetual,
  take_profit_price: number,
  stop_loss_price: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function: `${mirageAddress(network)}::market::update_tpsl` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      getDecimal8Argument(take_profit_price),
      getDecimal8Argument(stop_loss_price),
    ],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

export const placeTpsl = async (
  positionObject: MoveObjectType,
  perpetualAsset: Perpetual,
  take_profit_price: number,
  stop_loss_price: number,
  trigger_amount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::place_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      getDecimal8Argument(take_profit_price),
      getDecimal8Argument(stop_loss_price),
      getDecimal8Argument(trigger_amount),
    ],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * Update the margin of a position
 * @returns payload promise for the transaction
 */
export const updateMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  oldMarginAmount: number,
  newMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const diff = newMarginAmount > oldMarginAmount ? newMarginAmount - oldMarginAmount : oldMarginAmount - newMarginAmount
  const functionName = newMarginAmount > oldMarginAmount ? 'increase' : 'decrease'
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::${functionName}_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * increase the margin of a position
 * @returns payload promise for the transaction
 */
export const increaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  increaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increaseMarginAmount)],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * increase the position size and increase the margin of a position
 * @returns payload promise for the transaction
 */
export const increaseSizeAndIncreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  increasePositionSize: number,
  increaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::increase_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(increasePositionSize),
      getDecimal8Argument(increaseMarginAmount),
    ],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * increase the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const increaseSizeAndDecreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  increasePositionSize: number,
  decreaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::increase_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(increasePositionSize),
      getDecimal8Argument(decreaseMarginAmount),
    ],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const decreaseSizeAndDecreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  decreasePositionSize: number,
  decreaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::decrease_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(decreasePositionSize),
      getDecimal8Argument(decreaseMarginAmount),
    ],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const decreaseSizeAndIncreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  decreasePositionSize: number,
  increaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::decrease_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(decreasePositionSize),
      getDecimal8Argument(increaseMarginAmount),
    ],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const decreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  decreaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreaseMarginAmount)],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * Update the position size of a position
 * @returns payload promise for the transaction
 */
export const updatePositionSize = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  oldPositionSize: number,
  newPositionSize: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const diff = newPositionSize > oldPositionSize ? newPositionSize - oldPositionSize : oldPositionSize - newPositionSize
  const functionName =
    newPositionSize > oldPositionSize
      ? 'market::increase_position_size'
      : 'market_scripts::decrease_position_size_entry'

  const payload = {
    function: `${
      newPositionSize > oldPositionSize ? mirageAddress(network) : MODULES(network).mirage_scripts.address
    }::${functionName}` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * increase the position size of a position
 * @returns payload promise for the transaction
 */
export const increasePositionSize = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  increasePositionSize: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function: `${mirageAddress(network)}::market::increase_position_size` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increasePositionSize)],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * decrease the position size of a position
 * @returns payload promise for the transaction
 */
export const decreasePositionSize = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  decreasePositionSize: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::decrease_position_size_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreasePositionSize)],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * Trigger a take profit or stop loss of the position at address to_trigger
 * @returns payload promise for the transaction
 */
export const triggerTpsl = async (
  triggererAddress: string,
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::trigger_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, positionObject, perpetualVaas, marginVaas],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * Liquidate a position at address to_trigger
 * @returns payload promise for the transaction
 */
export const liquidatePosition = async (
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::liquidate_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * Trigger a limit order at the index at address to_trigger
 * @returns payload promise for the transaction
 */
export const triggerLimitOrder = async (
  triggererAddress: string,
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  index: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::trigger_limit_order_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, positionObject, index, perpetualVaas, marginVaas],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}

/**
 * Trigger a limit order by id
 * @returns payload promise for the transaction
 */
export const triggerLimitOrderById = async (
  triggererAddress: string,
  positionObject: MoveObjectType,
  marginCoin: MoveToken,
  perpetualAsset: Perpetual,
  orderId: bigint,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::market_scripts::trigger_limit_order_by_id_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, positionObject, orderId, perpetualVaas, marginVaas],
    typeArguments: getPositionTypeArgument(network),
  }
  return payload
}
