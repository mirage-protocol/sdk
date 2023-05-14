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
  OtherAsset,
} from '../constants'
import { getScriptBytecode } from '../constants/scripts'
import { TradeSide } from '../entities'
import { getBCSDecimal8Argument, getDecimal8Argument, MoveType, Payload, PayloadResult } from './'

const type = 'entry_function_payload'

// Get the types for this market
const getMarketTypeArguments = (base: MoveCoin | string, underlying: MoveCoin | string): MoveType[] => {
  return [coinInfo(base).type, assetInfo(underlying).type]
}

/**
 * Open a trade in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openTrade = async (
  marginType: MoveCoin | string,
  positionType: OtherAsset | string,
  isInitialized: boolean,
  marginAmount: number,
  positionSize: number,
  tradeSide: TradeSide,
  desired_price: number,
  maxSlippage: number,
  network: Network
): Promise<PayloadResult> => {
  const marginCoin = typeof marginType === 'string' ? MoveCoin[marginType] : marginType
  const positionAsset =
    typeof positionType === 'string' ? OtherAsset[positionType] || MoveCoin[positionType] : positionType

  const marginFeed = getPriceFeed(marginCoin, network)
  const positionfeed = getPriceFeed(positionAsset, network)

  const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(network)) : []
  const positionVaas = positionfeed ? await getPriceFeedUpdateData(positionfeed, getNetwork(network)) : []

  if (isInitialized) {
    return {
      natural: {
        function: `${mirageAddress()}::market::open_trade`,
        type,
        arguments: [
          positionVaas,
          marginVaas,
          getDecimal8Argument(marginAmount), // always 8 decimals
          getDecimal8Argument(positionSize),
          tradeSide == TradeSide.LONG ? true : false,
          getDecimal8Argument(desired_price),
          getDecimal8Argument(maxSlippage),
        ],
        type_arguments: getMarketTypeArguments(marginCoin, positionAsset),
      },
    }
  }
  return {
    bcs: new aptos.TxnBuilderTypes.TransactionPayloadScript(
      new aptos.TxnBuilderTypes.Script(
        getScriptBytecode('register_and_open_trade'),
        [
          new aptos.TxnBuilderTypes.TypeTagStruct(
            aptos.TxnBuilderTypes.StructTag.fromString(assetInfo(marginCoin).type)
          ),
          new aptos.TxnBuilderTypes.TypeTagStruct(
            aptos.TxnBuilderTypes.StructTag.fromString(assetInfo(positionAsset).type)
          ),
        ],
        [
          new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(positionVaas)),
          new aptos.TxnBuilderTypes.TransactionArgumentU8Vector(Uint8Array.from(marginVaas)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(marginAmount)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(positionSize)),
          new aptos.TxnBuilderTypes.TransactionArgumentBool(false),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(desired_price)),
          new aptos.TxnBuilderTypes.TransactionArgumentU64(getBCSDecimal8Argument(maxSlippage)),
        ]
      )
    ),
  }
}

/**
 * Close a trade in a market at the current price
 * @returns payload promise for the transaction
 */
export const closeTrade = async (
  base: MoveCoin | string,
  underlying: OtherAsset | string,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? OtherAsset[underlying] || MoveCoin[underlying] : underlying

  const baseFeed = getPriceFeed(baseCoin, network)
  const underlyingFeed = getPriceFeed(underlyingAsset, network)

  const baseVaas = baseFeed ? await getPriceFeedUpdateData(baseFeed, getNetwork(network)) : [[0]]
  const underlyingVaas = underlyingFeed ? await getPriceFeedUpdateData(underlyingFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::close_trade`,
    arguments: [underlyingVaas, baseVaas],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}

/**
 * Place a trade that can be trigger when the market price
 * of a long/short is below/above a trigger price
 * @returns payload promise for the transaction
 */
export const placeLimitOrder = async (
  base: MoveCoin | string,
  underlying: OtherAsset | string,
  marginAmount: number,
  positionSize: number,
  tradeSide: TradeSide,
  triggerPrice: number,
  take_profit_price: number,
  stop_loss_price: number,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? OtherAsset[underlying] || MoveCoin[underlying] : underlying

  const baseFeed = getPriceFeed(baseCoin, network)
  const underlyingFeed = getPriceFeed(underlyingAsset, network)

  const baseVaas = baseFeed ? await getPriceFeedUpdateData(baseFeed, getNetwork(network)) : [[0]]
  const underlyingVaas = underlyingFeed ? await getPriceFeedUpdateData(underlyingFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::place_limit_order`,
    arguments: [
      underlyingVaas,
      baseVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      tradeSide == TradeSide.LONG ? true : false,
      getDecimal8Argument(triggerPrice),
      getDecimal8Argument(take_profit_price),
      getDecimal8Argument(stop_loss_price),
    ],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}

export const updateTpsl = async (
  base: MoveCoin | string,
  underlying: OtherAsset | string,
  take_profit_price: number,
  stop_loss_price: number,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? OtherAsset[underlying] || MoveCoin[underlying] : underlying

  const underlyingFeed = getPriceFeed(underlyingAsset, network)
  const underlyingVaas = underlyingFeed ? await getPriceFeedUpdateData(underlyingFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::update_tpsl`,
    arguments: [underlyingVaas, getDecimal8Argument(take_profit_price), getDecimal8Argument(stop_loss_price)],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}

/**
 * Update the margin of a trade
 * @returns payload promise for the transaction
 */
export const updateMargin = async (
  base: MoveCoin | string,
  underlying: OtherAsset | string,
  newMarginAmount: number,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? OtherAsset[underlying] || MoveCoin[underlying] : underlying

  const baseFeed = getPriceFeed(baseCoin, network)
  const underlyingFeed = getPriceFeed(underlyingAsset, network)

  const baseVaas = baseFeed ? await getPriceFeedUpdateData(baseFeed, getNetwork(network)) : [[0]]
  const underlyingVaas = underlyingFeed ? await getPriceFeedUpdateData(underlyingFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::update_margin`,
    arguments: [underlyingVaas, baseVaas, getDecimal8Argument(newMarginAmount)],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}

/**
 * Update the position size of a trade
 * @returns payload promise for the transaction
 */
export const updatePositionSize = async (
  base: MoveCoin | string,
  underlying: OtherAsset | string,
  newPositionSize: number,
  network: Network
): Promise<Payload> => {
  const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  const underlyingAsset = typeof underlying === 'string' ? OtherAsset[underlying] || MoveCoin[underlying] : underlying

  const baseFeed = getPriceFeed(baseCoin, network)
  const underlyingFeed = getPriceFeed(underlyingAsset, network)

  const baseVaas = baseFeed ? await getPriceFeedUpdateData(baseFeed, getNetwork(network)) : [[0]]
  const underlyingVaas = underlyingFeed ? await getPriceFeedUpdateData(underlyingFeed, getNetwork(network)) : [[0]]

  const payload = {
    type,
    function: `${mirageAddress()}::market::close_trade`,
    arguments: [underlyingVaas, baseVaas, getDecimal8Argument(newPositionSize)],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
}
