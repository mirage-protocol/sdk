import { InputEntryFunctionData, MoveObjectType, Network } from '@aptos-labs/ts-sdk'

import {
  getModuleAddress,
  getPriceFeed,
  getPriceFeedUpdateData,
  MirageModules,
  MoveFungibleAsset,
  Perpetual,
} from '../constants'
import { PositionSide } from '../entities'
import { getDecimal8Argument } from './'

/**
 * Open a position in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openPosition = async (
  marketObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
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

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  return {
    function: `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::open_position_entry`,
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
    typeArguments: [],
  }
}

/**
 * Open a position in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openPositionWithTpsl = async (
  marketObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetual: Perpetual,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desired_price: number,
  maxPriceSlippage: number,
  takeProfitPrice: number,
  stopLossPrice: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  return {
    function: `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::open_position_entry_with_tpsl`,

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
    ],
    typeArguments: [],
  }
}

/**
 * Close a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const closePosition = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetual: Perpetual,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::close_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas],
    typeArguments: [],
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
  expiration: bigint, // in seconds,
  isLong: boolean,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  return {
    function: `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::create_position_and_place_limit_order`,
    functionArguments: [
      marketObject,
      perpetualVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      true, // always is increase when creating a new position
      triggersAbove,
      expiration.toString(), // sdk breaks for large non-string integers
      isLong,
    ],
    typeArguments: [],
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
  expiration: bigint, // in seconds
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  return {
    function: `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::place_limit_order_entry`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      isIncrease,
      triggersAbove,
      expiration.toString(), // sdk breaks for large non-string integers
    ],
    typeArguments: [],
  }
}

/**
 * Cancel a limit order
 * @returns payload promise for the transaction
 */
export const cancelLimitOrder = async (
  limitOrderObject: MoveObjectType,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const payload = {
    function:
      `${getModuleAddress(MirageModules.Market, network)}::limit_order::cancel_limit_order` as `${string}::${string}::${string}`,
    functionArguments: [limitOrderObject],
    typeArguments: [],
  }
  return payload
}

export const updateTpsl = async (
  tpslObject: MoveObjectType,
  perpetualAsset: Perpetual,
  take_profit_price: number,
  stop_loss_price: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  const payload = {
    function:
      `${getModuleAddress(MirageModules.Market, network)}::tpsl::update_tpsl` as `${string}::${string}::${string}`,
    functionArguments: [
      tpslObject,
      perpetualVaas,
      getDecimal8Argument(take_profit_price),
      getDecimal8Argument(stop_loss_price),
    ],
    typeArguments: [],
  }
  return payload
}

export const placeTpsl = async (
  tpslObject: MoveObjectType,
  perpetualAsset: Perpetual,
  take_profit_price: number,
  stop_loss_price: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::place_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      tpslObject,
      perpetualVaas,
      getDecimal8Argument(take_profit_price),
      getDecimal8Argument(stop_loss_price),
    ],
    typeArguments: [],
  }
  return payload
}

/**
 * Update the margin of a position
 * @returns payload promise for the transaction
 */
export const updateMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  oldMarginAmount: number,
  newMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const diff = newMarginAmount > oldMarginAmount ? newMarginAmount - oldMarginAmount : oldMarginAmount - newMarginAmount
  const functionName = newMarginAmount > oldMarginAmount ? 'increase' : 'decrease'
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::${functionName}_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
    typeArguments: [],
  }
  return payload
}

/**
 * increase the margin of a position
 * @returns payload promise for the transaction
 */
export const increaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  increaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increaseMarginAmount)],
    typeArguments: [],
  }
  return payload
}

/**
 * increase the position size and increase the margin of a position
 * @returns payload promise for the transaction
 */
export const increaseSizeAndIncreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  increasePositionSize: number,
  increaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::increase_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(increasePositionSize),
      getDecimal8Argument(increaseMarginAmount),
    ],
    typeArguments: [],
  }
  return payload
}

/**
 * increase the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const increaseSizeAndDecreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  increasePositionSize: number,
  decreaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}:::market_scripts::increase_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(increasePositionSize),
      getDecimal8Argument(decreaseMarginAmount),
    ],
    typeArguments: [],
  }
  return payload
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const decreaseSizeAndDecreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  decreasePositionSize: number,
  decreaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::decrease_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(decreasePositionSize),
      getDecimal8Argument(decreaseMarginAmount),
    ],
    typeArguments: [],
  }
  return payload
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const decreaseSizeAndIncreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  decreasePositionSize: number,
  increaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::decrease_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObject,
      perpetualVaas,
      marginVaas,
      getDecimal8Argument(decreasePositionSize),
      getDecimal8Argument(increaseMarginAmount),
    ],
    typeArguments: [],
  }
  return payload
}

/**
 * decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const decreaseMargin = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  decreaseMarginAmount: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreaseMarginAmount)],
    typeArguments: [],
  }
  return payload
}

/**
 * Update the position size of a position
 * @returns payload promise for the transaction
 */
export const updatePositionSize = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  oldPositionSize: number,
  newPositionSize: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const diff = newPositionSize > oldPositionSize ? newPositionSize - oldPositionSize : oldPositionSize - newPositionSize
  const functionName = (
    newPositionSize > oldPositionSize
      ? `${getModuleAddress(MirageModules.Market, network)}::market::increase_position_size`
      : `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::decrease_position_size_entry`
  ) as `${string}::${string}::${string}`

  return {
    function: functionName,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
    typeArguments: [],
  }
}

/**
 * increase the position size of a position
 * @returns payload promise for the transaction
 */
export const increasePositionSize = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  increasePositionSize: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  const payload = {
    function:
      `${getModuleAddress(MirageModules.Market, network)}::market::increase_position_size` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increasePositionSize)],
    typeArguments: [],
  }
  return payload
}

/**
 * decrease the position size of a position
 * @returns payload promise for the transaction
 */
export const decreasePositionSize = async (
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  decreasePositionSize: number,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::decrease_position_size_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreasePositionSize)],
    typeArguments: [],
  }
  return payload
}

/**
 * Trigger tpslObject and deposit trigger payment at depositToAddr
 * @returns payload promise for the transaction
 */
export const triggerTpsl = async (
  depositToAddr: string,
  tpslObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []
  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::trigger_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [depositToAddr, tpslObject, perpetualVaas, marginVaas],
    typeArguments: [],
  }
  return payload
}

/**
 * Liquidate positionObject and deposit the trigger payment at depositToAddr
 * @returns payload promise for the transaction
 */
export const liquidatePosition = async (
  depositToAddr: string,
  positionObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::liquidate_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [depositToAddr, positionObject, perpetualVaas, marginVaas],
    typeArguments: [],
  }
  return payload
}

/**
 * Trigger a limitOrderObject and deposit trigger payment at depositToAddr
 * @returns payload promise for the transaction
 */
export const triggerLimitOrder = async (
  depositToAddr: string,
  limitOrderObject: MoveObjectType,
  marginCoin: MoveFungibleAsset,
  perpetualAsset: Perpetual,
  network: Network,
): Promise<InputEntryFunctionData> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)
  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, network) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, network) : []

  const payload = {
    function:
      `${getModuleAddress(MirageModules.MirageScripts, network)}::market_scripts::trigger_limit_order_entry` as `${string}::${string}::${string}`,
    functionArguments: [depositToAddr, limitOrderObject, perpetualVaas, marginVaas],
    typeArguments: [],
  }
  return payload
}
