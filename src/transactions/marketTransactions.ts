import * as aptos from 'aptos'

import {
  assetInfo,
  coinInfo,
  getNetwork,
  getPriceFeed,
  getPriceFeedUpdateData,
  mirageAddress,
  MoveCoin,
  Network,
  Perpetual,
} from '../constants'
import { getScriptBytecode } from '../constants/scripts'
import { PositionSide } from '../entities'
import { getBCSCoinAmountArgument, getBCSDecimal8Argument, getDecimal8Argument, MoveType, Payload, PayloadResult } from './'
import { getCoinAmountArgument } from './'

const type = 'entry_function_payload'

// Get the types for this market
const getMarketTypeArguments = (margin: MoveCoin | string, perpetual: Perpetual): MoveType[] => {
  return [coinInfo(margin).type, assetInfo(perpetual).type]
}

/**
 * Open a position in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openPosition = async (
  marginCoin: MoveCoin,
  perpetual: Perpetual,
  isInitialized: boolean,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  desired_price: number,
  maxSlippage: number,
  takeProfitPrice: number,
  stopLossPrice: number,
  triggerPaymentAmount: number,
  network: Network
): Promise<PayloadResult> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetual, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  if (isInitialized) {
    return {
      natural: {
        function: `${mirageAddress()}::market::open_position`,
        type,
        arguments: [
          perpetualVaas,
          marginVaas,
          getDecimal8Argument(marginAmount), // always 8 decimals
          getDecimal8Argument(positionSize),
          side == PositionSide.LONG,
          getDecimal8Argument(desired_price),
          getDecimal8Argument(maxSlippage),
          getDecimal8Argument(takeProfitPrice),
          getDecimal8Argument(stopLossPrice),
          getCoinAmountArgument(MoveCoin.APT, triggerPaymentAmount),
        ],
        type_arguments: getMarketTypeArguments(marginCoin, perpetual),
      },
    }
  }
  return {
    bcs: new aptos.TxnBuilderTypes.TransactionPayloadScript(
      new aptos.TxnBuilderTypes.Script(
        getScriptBytecode('register_and_open_position'),
        [
          new aptos.TxnBuilderTypes.TypeTagStruct(
            aptos.TxnBuilderTypes.StructTag.fromString(assetInfo(marginCoin).type)
          ),
          new aptos.TxnBuilderTypes.TypeTagStruct(
            aptos.TxnBuilderTypes.StructTag.fromString(assetInfo(perpetual).type)
          ),
        ],
        [
          new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(perpetualVaas)),
          new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(marginVaas)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(marginAmount)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(positionSize)),
          new aptos.TxnBuilderTypes.TransactionArgumentBool(side == PositionSide.LONG),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(desired_price)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(maxSlippage)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(takeProfitPrice)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(stopLossPrice)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSCoinAmountArgument(MoveCoin.APT, triggerPaymentAmount)),
        ]
      )
    ),
  }
}

/**
 * Close a position in a market at the current price
 * @returns payload promise for the transaction
 */
export const closePosition = async (marginCoin: MoveCoin, perpetual: Perpetual, network: Network): Promise<Payload> => {
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
 * Place a position that can be trigger when the market price
 * of a long/short is below/above a trigger price
 * @returns payload promise for the transaction
 */
export const placeLimitOrder = async (
  marginCoin: MoveCoin,
  perpetualAsset: Perpetual,
  isInitialized: boolean,
  marginAmount: number,
  positionSize: number,
  side: PositionSide,
  triggerPrice: number,
  take_profit_price: number,
  stop_loss_price: number,
  network: Network
): Promise<PayloadResult> => {
  const marginFeed = getPriceFeed(marginCoin, network)
  const perpetualFeed = getPriceFeed(perpetualAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : []

  if (isInitialized) {
    return {
      natural: {
        type,
        function: `${mirageAddress()}::market::place_limit_order`,
        arguments: [
          perpetualVaas,
          marginVaas,
          getDecimal8Argument(marginAmount), // always 8 decimals
          getDecimal8Argument(positionSize),
          side == PositionSide.LONG ? true : false,
          getDecimal8Argument(triggerPrice),
          getDecimal8Argument(take_profit_price),
          getDecimal8Argument(stop_loss_price),
        ],
        type_arguments: getMarketTypeArguments(marginCoin, perpetualAsset),
      },
    }
  }

  return {
    bcs: new aptos.TxnBuilderTypes.TransactionPayloadScript(
      new aptos.TxnBuilderTypes.Script(
        getScriptBytecode('register_and_place_limit'),
        [
          new aptos.TxnBuilderTypes.TypeTagStruct(
            aptos.TxnBuilderTypes.StructTag.fromString(assetInfo(marginCoin).type)
          ),
          new aptos.TxnBuilderTypes.TypeTagStruct(
            aptos.TxnBuilderTypes.StructTag.fromString(assetInfo(perpetualAsset).type)
          ),
        ],
        [
          new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(perpetualVaas)),
          new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(marginVaas)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(marginAmount)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(positionSize)),
          new aptos.TxnBuilderTypes.TransactionArgumentBool(false),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(take_profit_price)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(stop_loss_price)),
        ]
      )
    ),
  }
}

export const updateTpsl = async (
  base: MoveCoin | string,
  underlying: Perpetual | string,
  take_profit_price: number,
  stop_loss_price: number,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? Perpetual[underlying] || MoveCoin[underlying] : underlying

  const perpetualFeed = getPriceFeed(underlyingAsset, network)
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::update_tpsl`,
    arguments: [perpetualVaas, getDecimal8Argument(take_profit_price), getDecimal8Argument(stop_loss_price)],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}

/**
 * Update the margin of a position
 * @returns payload promise for the transaction
 */
export const updateMargin = async (
  base: MoveCoin | string,
  underlying: Perpetual | string,
  newMarginAmount: number,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? Perpetual[underlying] || MoveCoin[underlying] : underlying

  const marginFeed = getPriceFeed(baseCoin, network)
  const perpetualFeed = getPriceFeed(underlyingAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : [[0]]
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::update_margin`,
    arguments: [perpetualVaas, marginVaas, getDecimal8Argument(newMarginAmount)],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}

/**
 * Update the position size of a position
 * @returns payload promise for the transaction
 */
export const updatePositionSize = async (
  base: MoveCoin | string,
  underlying: Perpetual | string,
  newPositionSize: number,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? Perpetual[underlying] || MoveCoin[underlying] : underlying

  const marginFeed = getPriceFeed(baseCoin, network)
  const perpetualFeed = getPriceFeed(underlyingAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : [[0]]
  const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::close_position`,
    arguments: [perpetualVaas, marginVaas, getDecimal8Argument(newPositionSize)],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}
