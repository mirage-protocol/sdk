import { AccountAddress, InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { PositionSide } from '../entities'
import { getModuleAddress, MoveModules } from '../utils'
import { getDecimal8Argument, getTpSlArgument } from './'

/**
 * Open a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createOpenPositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::open_position_entry`,

    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}

/**
 * Open a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createOpenPositionWithTpslPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desiredPrice: number,
  maxPriceSlippage: number,
  takeProfitPrice: number | undefined,
  stopLossPrice: number | undefined,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::open_position_entry_with_tpsl_entry`,

    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
      getTpSlArgument(takeProfitPrice),
      getTpSlArgument(stopLossPrice),
    ],
  }
}

/**
/**
 * Open a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createAndOpenPositionPayload = (
  marketAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::create_and_open_position_entry`,

    functionArguments: [
      marketAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}

/**
 * Open a position in a market with tpsl at the current price
 * @returns payload promise for the transaction
 */

export const createAndOpenPositionWithTpslPayload = (
  marketAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desired_price: number,
  maxPriceSlippage: number,
  takeProfitPrice: number | undefined,
  stopLossPrice: number | undefined,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::create_and_open_position_with_tpsl_entry`,

    functionArguments: [
      marketAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(desired_price),
      getDecimal8Argument(maxPriceSlippage),
      getTpSlArgument(takeProfitPrice),
      getTpSlArgument(stopLossPrice),
    ],
  }
}

/**
 * Close a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createClosePositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  desired_price: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::close_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(desired_price),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}

export const createPositionAndPlaceLimitOrderPayload = (
  marketAddress: MoveObjectType,
  perpVaas: number[],
  marginAmount: number,
  positionSize: number,
  triggerPrice: number,
  maxPriceSlippage: number,
  triggersAbove: boolean,
  expiration: bigint, // in seconds,
  side: PositionSide,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::create_position_and_place_limit_order_entry`,
    functionArguments: [
      marketAddress,
      perpVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      triggersAbove,
      expiration.toString(), // sdk breaks for large non-string integers
      side == PositionSide.LONG,
    ],
  }
}

/**
 * Place a limit order on a new position that can be trigger when the market price
 * of a long/short is below/above a trigger price
 * @returns payload promise for the transaction
 */
export const createPlaceLimitOrderPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginAmount: number,
  positionSize: number,
  triggerPrice: number,
  maxPriceSlippage: number,
  triggersAbove: boolean,
  isDecreaseOnly: boolean,
  expiration: bigint, // in seconds
  side: PositionSide,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::place_limit_order_entry`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      triggersAbove,
      isDecreaseOnly,
      expiration.toString(), // sdk breaks for large non-string integers
    ],
  }
}

/**
 * Place a limit order that can be trigger when the market price
 * of a long/short is below/above a trigger price
 * @returns payload promise for the transaction
 */
export const createUpdateLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  perpVaas: number[],
  positionSize: number,
  side: PositionSide,
  triggerPrice: number,
  maxPriceSlippage: number,
  isDecreaseOnly: boolean,
  triggersAbove: boolean,
  expiration: bigint, // in seconds
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::limit_order::update_limit_order`,
    functionArguments: [
      limitOrderObjectAddress,
      perpVaas,
      getDecimal8Argument(positionSize),
      side == PositionSide.LONG,
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(maxPriceSlippage),
      isDecreaseOnly,
      triggersAbove,
      expiration.toString(), // sdk breaks for large non-string integers
    ],
  }
}

/**
 * Cancel a limit order
 * @returns payload promise for the transaction
 */
export const createCancelLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::limit_order::cancel_limit_order` as `${string}::${string}::${string}`,
    functionArguments: [limitOrderObjectAddress],
  }
}

export const createUpdateTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  perpVaas: number[],
  takeProfitPrice: number | undefined,
  stopLossPrice: number | undefined,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::tpsl::update_tpsl` as `${string}::${string}::${string}`,
    functionArguments: [tpslObjectAddress, perpVaas, getTpSlArgument(takeProfitPrice), getTpSlArgument(stopLossPrice)],
  }
}

export const createPlaceTpslPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  takeProfitPrice: number,
  stopLossPrice: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::place_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      getDecimal8Argument(takeProfitPrice),
      getDecimal8Argument(stopLossPrice),
    ],
  }
}

/**
 * Cancel a tpsl order
 * @returns payload for the transaction
 */
export const createCancelTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::tpsl::cancel_tpsl` as `${string}::${string}::${string}`,
    functionArguments: [tpslObjectAddress],
  }
}

/**
 * increase the margin of a position
 * @returns payload promise for the transaction
 */

export const createIncreaseMarginPayload = (
  positionObject: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  increaseMarginAmount: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, perpVaas, marginVaas, getDecimal8Argument(increaseMarginAmount)],
  }
}

/**
 * decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createDecreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  decreaseMarginAmount: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddress, perpVaas, marginVaas, getDecimal8Argument(decreaseMarginAmount)],
  }
}

/**
 * increase the margin of a limit order
 * @returns payload promise for the transaction
 */
export const createIncreaseLimitOrderMarginPayload = (
  limitOrderObjectAddress: MoveObjectType,
  marginIncreaseAmount: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::increase_limit_order_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [limitOrderObjectAddress, getDecimal8Argument(marginIncreaseAmount)],
  }
}

/**
 * decrease the margin of a limit order
 * @returns payload promise for the transaction
 */
export const createDecreaseLimitOrderMarginPayload = (
  limitOrderObjectAddress: MoveObjectType,
  marginDecreaseAmount: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::decrease_limit_order_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [limitOrderObjectAddress, getDecimal8Argument(marginDecreaseAmount)],
  }
}

/**
 * increase the position size of a position
 * @returns payload promise for the transaction
 */
export const createIncreasePositionSizePayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  positionSizeIncrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::increase_position_size` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(positionSizeIncrease),
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}

/**
 * decrease the position size of a position
 * @returns payload promise for the transaction
 */
export const createDecreasePositionSizePayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  decreasePositionSize: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::decrease_position_size_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(decreasePositionSize),
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
  return payload
}

/**
 * cleanup tpsl object for destroyed positions for gas refund
 * @returns payload promise for the transaction
 */
export const createCleanupTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::tpsl::cleanup_tpsl` as `${string}::${string}::${string}`,
    functionArguments: [tpslObjectAddress],
  }
}

/**
 * cleanup limit order object for destroyed positions for gas refund
 * @returns payload promise for the transaction
 */
export const createCleanupLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::limit_order::cleanup_limit_order` as `${string}::${string}::${string}`,
    functionArguments: [limitOrderObjectAddress],
  }
}

/**
 * Trigger a take profit or stop loss of the position at address to_trigger
 * @returns payload promise for the transaction
 */
export const createTriggerTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  triggererAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::trigger_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, tpslObjectAddress, perpVaas, marginVaas],
  }
}

/**
 * Liquidate a position at address to_trigger
 * @returns payload promise for the transaction
 */
export const createLiquidatePositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  triggererAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::liquidate_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, positionObjectAddress, perpVaas, marginVaas],
  }
}

/**
 * Trigger a limit order at the index at address to_trigger
 * @returns payload promise for the transaction
 */
export const createTriggerLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  triggererAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::trigger_limit_order_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, limitOrderObjectAddress, perpVaas, marginVaas],
  }
}

/**
 * increase the position size and increase the margin of a position
 * @returns payload promise for the transaction
 */
export const createIncreaseSizeAndIncreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  positionSizeIncrease: number,
  marginAmountIncrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::increase_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(positionSizeIncrease),
      getDecimal8Argument(marginAmountIncrease),
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}

/**
 * increase the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createIncreaseSizeAndDecreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  positionSizeIncrease: number,
  marginAmountDecrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::increase_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(positionSizeIncrease),
      getDecimal8Argument(marginAmountDecrease),
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
  return payload
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createDecreaseSizeAndDecreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  positionSizeDecrease: number,
  marginAmountDecrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::decrease_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(positionSizeDecrease),
      getDecimal8Argument(marginAmountDecrease),
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createDecreaseSizeAndIncreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaas: number[],
  marginVaas: number[],
  positionSizeDecrease: number,
  marginAmountIncrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::decrease_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaas,
      marginVaas,
      getDecimal8Argument(positionSizeDecrease),
      getDecimal8Argument(marginAmountIncrease),
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}
