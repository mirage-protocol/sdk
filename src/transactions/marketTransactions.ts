import {
  Bool,
  MoveVector,
  U8,
  AccountAddress,
  MoveObjectType,
  TransactionPayloadEntryFunction,
  ModuleId,
  Identifier,
  EntryFunction,
  U64,
} from '@aptos-labs/ts-sdk'

import { PositionSide } from '../entities'
import { getModuleAddress, MoveModules } from '../utils'
import { getDecimal8BCS, getTpSlArgument } from './'

const emptyVaa = MoveVector.U8([])

/**
 * Open a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createOpenPositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('open_position_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(marginAmount), // always 8 decimals
    getDecimal8BCS(positionSize),
    new Bool(side == PositionSide.LONG),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Open a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createOpenPositionWithTpslPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desiredPrice: number,
  maxPriceSlippage: number,
  takeProfitPrice: number | undefined,
  stopLossPrice: number | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('open_position_entry_with_tpsl_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(marginAmount), // always 8 decimals
    getDecimal8BCS(positionSize),
    new Bool(side == PositionSide.LONG),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
    getTpSlArgument(takeProfitPrice),
    getTpSlArgument(stopLossPrice),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
/**
 * Open a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createAndOpenPositionPayload = (
  marketAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('create_and_open_position_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(marketAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(marginAmount), // always 8 decimals
    getDecimal8BCS(positionSize),
    new Bool(side == PositionSide.LONG),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Open a position in a market with tpsl at the current price
 * @returns payload promise for the transaction
 */

export const createAndOpenPositionWithTpslPayload = (
  marketAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desired_price: number,
  maxPriceSlippage: number,
  takeProfitPrice: number | undefined,
  stopLossPrice: number | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('create_and_open_position_with_tpsl_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(marketAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(marginAmount), // always 8 decimals
    getDecimal8BCS(positionSize),
    new Bool(side == PositionSide.LONG),
    getDecimal8BCS(desired_price),
    getDecimal8BCS(maxPriceSlippage),
    getTpSlArgument(takeProfitPrice),
    getTpSlArgument(stopLossPrice),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Close a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const createClosePositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  desired_price: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('close_position_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(desired_price),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
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
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('create_position_and_place_limit_order_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(marketAddress),
    perpVaa,
    getDecimal8BCS(marginAmount), // always 8 decimals
    getDecimal8BCS(positionSize),
    getDecimal8BCS(triggerPrice),
    getDecimal8BCS(maxPriceSlippage),
    new Bool(triggersAbove),
    new U64(expiration), // sdk breaks for large non-string integers
    new Bool(side == PositionSide.LONG),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
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
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('place_limit_order_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    getDecimal8BCS(marginAmount), // always 8 decimals
    getDecimal8BCS(positionSize),
    new Bool(side == PositionSide.LONG),
    getDecimal8BCS(triggerPrice),
    getDecimal8BCS(maxPriceSlippage),
    new Bool(triggersAbove),
    new Bool(isDecreaseOnly),
    new U64(expiration), // sdk breaks for large non-string integers
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
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
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MARKET, deployerAddress), new Identifier('limit_order'))
  const functionName = new Identifier('update_limit_order')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(limitOrderObjectAddress),
    perpVaa,
    getDecimal8BCS(positionSize),
    new Bool(side == PositionSide.LONG),
    getDecimal8BCS(triggerPrice),
    getDecimal8BCS(maxPriceSlippage),
    new Bool(isDecreaseOnly),
    new Bool(triggersAbove),
    new U64(expiration), // sdk breaks for large non-string integers
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Cancel a limit order
 * @returns payload promise for the transaction
 */
export const createCancelLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MARKET, deployerAddress), new Identifier('limit_order'))
  const functionName = new Identifier('cancel_limit_order')
  const typeArguments = []

  const functionArguments = [AccountAddress.fromString(limitOrderObjectAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createUpdateTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  takeProfitPrice: number | undefined,
  stopLossPrice: number | undefined,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MARKET, deployerAddress), new Identifier('tpsl'))
  const functionName = new Identifier('update_tpsl')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(tpslObjectAddress),
    perpVaa,
    getTpSlArgument(takeProfitPrice),
    getTpSlArgument(stopLossPrice),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createPlaceTpslPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  takeProfitPrice: number,
  stopLossPrice: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('place_tpsl_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    getDecimal8BCS(takeProfitPrice),
    getDecimal8BCS(stopLossPrice),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Cancel a tpsl order
 * @returns payload for the transaction
 */
export const createCancelTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MARKET, deployerAddress), new Identifier('tpsl'))
  const functionName = new Identifier('cancel_tpsl')
  const typeArguments = []

  const functionArguments = [AccountAddress.fromString(tpslObjectAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * increase the margin of a position
 * @returns payload promise for the transaction
 */
export const createIncreaseMarginPayload = (
  positionObject: MoveObjectType,
  increaseMarginAmount: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('increase_margin_entry')
  const typeArguments = []

  const functionArguments = [AccountAddress.fromString(positionObject), getDecimal8BCS(increaseMarginAmount)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createDecreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  decreaseMarginAmount: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('decrease_margin_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(decreaseMarginAmount),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * increase the margin of a limit order
 * @returns payload promise for the transaction
 */
export const createIncreaseLimitOrderMarginPayload = (
  limitOrderObjectAddress: MoveObjectType,
  marginIncreaseAmount: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('increase_limit_order_margin_entry')
  const typeArguments = []

  const functionArguments = [AccountAddress.fromString(limitOrderObjectAddress), getDecimal8BCS(marginIncreaseAmount)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * decrease the margin of a limit order
 * @returns payload promise for the transaction
 */
export const createDecreaseLimitOrderMarginPayload = (
  limitOrderObjectAddress: MoveObjectType,
  marginDecreaseAmount: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('decrease_limit_order_margin_entry')
  const typeArguments = []

  const functionArguments = [AccountAddress.fromString(limitOrderObjectAddress), getDecimal8BCS(marginDecreaseAmount)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * increase the position size of a position
 * @returns payload promise for the transaction
 */
export const createIncreasePositionSizePayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  positionSizeIncrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MARKET, deployerAddress), new Identifier('market'))
  const functionName = new Identifier('increase_position_size')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(positionSizeIncrease),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * decrease the position size of a position
 * @returns payload promise for the transaction
 */
export const createDecreasePositionSizePayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  decreasePositionSize: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('decrease_position_size_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(decreasePositionSize),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * cleanup tpsl object for destroyed positions for gas refund
 * @returns payload promise for the transaction
 */
export const createCleanupTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MARKET, deployerAddress), new Identifier('tpsl'))
  const functionName = new Identifier('cleanup_tpsl')
  const typeArguments = []

  const functionArguments = [AccountAddress.fromString(tpslObjectAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * cleanup limit order object for destroyed positions for gas refund
 * @returns payload promise for the transaction
 */
export const createCleanupLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MARKET, deployerAddress), new Identifier('limit_order'))
  const functionName = new Identifier('cleanup_limit_order')
  const typeArguments = []

  const functionArguments = [AccountAddress.fromString(limitOrderObjectAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Trigger a take profit or stop loss of the position at address to_trigger
 * @returns payload promise for the transaction
 */
export const createTriggerTpslPayload = (
  tpslObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  triggererAddress: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('trigger_tpsl_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(triggererAddress),
    AccountAddress.fromString(tpslObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Liquidate a position at address to_trigger
 * @returns payload promise for the transaction
 */
export const createLiquidatePositionPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  triggererAddress: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('liquidate_position_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(triggererAddress),
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Trigger a limit order at the index at address to_trigger
 * @returns payload promise for the transaction
 */
export const createTriggerLimitOrderPayload = (
  limitOrderObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  triggererAddress: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('trigger_limit_order_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(triggererAddress),
    AccountAddress.fromString(limitOrderObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * increase the position size and increase the margin of a position
 * @returns payload promise for the transaction
 */
export const createIncreaseSizeAndIncreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  positionSizeIncrease: number,
  marginAmountIncrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('increase_position_size_and_increase_margin_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(positionSizeIncrease),
    getDecimal8BCS(marginAmountIncrease),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * increase the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createIncreaseSizeAndDecreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  positionSizeIncrease: number,
  marginAmountDecrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('increase_position_size_and_decrease_margin_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(positionSizeIncrease),
    getDecimal8BCS(marginAmountDecrease),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createDecreaseSizeAndDecreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  positionSizeDecrease: number,
  marginAmountDecrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('decrease_position_size_and_decrease_margin_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(positionSizeDecrease),
    getDecimal8BCS(marginAmountDecrease),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * decrease the position size and decrease the margin of a position
 * @returns payload promise for the transaction
 */
export const createDecreaseSizeAndIncreaseMarginPayload = (
  positionObjectAddress: MoveObjectType,
  perpVaa: MoveVector<U8>,
  marginVaa: MoveVector<U8> | undefined,
  positionSizeDecrease: number,
  marginAmountIncrease: number,
  desiredPrice: number,
  maxPriceSlippage: number,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('market_scripts'),
  )
  const functionName = new Identifier('decrease_position_size_and_increase_margin_entry')
  const typeArguments = []

  const functionArguments = [
    AccountAddress.fromString(positionObjectAddress),
    perpVaa,
    marginVaa ? marginVaa : emptyVaa,
    getDecimal8BCS(positionSizeDecrease),
    getDecimal8BCS(marginAmountIncrease),
    getDecimal8BCS(desiredPrice),
    getDecimal8BCS(maxPriceSlippage),
  ]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}
