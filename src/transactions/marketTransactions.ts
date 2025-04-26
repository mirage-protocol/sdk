import { MoveVector, U8, AccountAddress, InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { PositionSide } from '../entities'
import { getModuleAddress, MoveModules } from '../utils'
import { getDecimal8Argument, getTpSlArgument } from './'

/**
 * Open a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createOpenPositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
  desired_price: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::close_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaa,
      marginVaa,
      getDecimal8Argument(desired_price),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}

export const createPositionAndPlaceLimitOrderPayload = (
  marketAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
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
      perpVaa,
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
  perpVaa: MoveVector<U8>,
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
      perpVaa,
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
  perpVaa: MoveVector<U8>,
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
      perpVaa,
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
  perpVaa: MoveVector<U8>,
  takeProfitPrice: number | undefined,
  stopLossPrice: number | undefined,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::tpsl::update_tpsl` as `${string}::${string}::${string}`,
    functionArguments: [tpslObjectAddress, perpVaa, getTpSlArgument(takeProfitPrice), getTpSlArgument(stopLossPrice)],
  }
}

export const createPlaceTpslPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  takeProfitPrice: number,
  stopLossPrice: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::place_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [
      positionObjectAddress,
      perpVaa,
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
  increaseMarginAmount: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::increase_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObject, getDecimal8Argument(increaseMarginAmount)],
  }
}

/**
 * decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createDecreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
  decreaseMarginAmount: number,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::decrease_margin_entry` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddress, perpVaa, marginVaa, getDecimal8Argument(decreaseMarginAmount)],
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
  triggererAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::trigger_tpsl_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, tpslObjectAddress, perpVaa, marginVaa],
  }
}

/**
 * Liquidate a position at address to_trigger
 * @returns payload promise for the transaction
 */
export const createLiquidatePositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
  triggererAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::liquidate_position_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, positionObjectAddress, perpVaa, marginVaa],
  }
}

/**
 * Trigger a limit order at the index at address to_trigger
 * @returns payload promise for the transaction
 */
export const createTriggerLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
  triggererAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::market_scripts::trigger_limit_order_entry` as `${string}::${string}::${string}`,
    functionArguments: [triggererAddress, limitOrderObjectAddress, perpVaa, marginVaa],
  }
}

/**
 * increase the position size and increase the margin of a position
 * @returns payload promise for the transaction
 */
export const createIncreaseSizeAndIncreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
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
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8>,
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
      perpVaa,
      marginVaa,
      getDecimal8Argument(positionSizeDecrease),
      getDecimal8Argument(marginAmountIncrease),
      getDecimal8Argument(desiredPrice),
      getDecimal8Argument(maxPriceSlippage),
    ],
  }
}
