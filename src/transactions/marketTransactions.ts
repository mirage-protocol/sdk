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
import { TradeSide } from '../entities'
import { getDecimal8Argument, MoveType, Payload, ScriptPayload } from './'

const type = 'entry_function_payload'

export const registerAndOpenTradeCode = (): Uint8Array => {
  return Uint8Array.from(
    Buffer.from(
      '0xa11ceb0b060000000601000203020e041004051417072b1b084620000000010301020000000200010200000002010208060c0a0a020a0a02030301030300020900090101060c066d61726b65740872656769737465720a6f70656e5f7472616465a65fdd1605e24fd92f0a50e85d17d36ce32effbf80ea6941ad8531e06465296a02000000010c0a0038000b000b010b020b030b040b050b060b07380102',
      'hex'
    )
  )
}

// Get the types for this market
const getMarketTypeArguments = (base: MoveCoin | string, underlying: MoveCoin | string): MoveType[] => {
  return [coinInfo(base).type, assetInfo(underlying).type]
}

/**
 * Open a trade in a market at the current price and registers user resources if uninitialized
 * @returns script or payload promise for the transaction
 */
export const openTrade = async (
  _base: MoveCoin | string,
  _underlying: OtherAsset | string,
  _isInitialized: boolean,
  _marginAmount: number,
  _positionSize: number,
  _tradeSide: TradeSide,
  _desired_price: number,
  _max_slippage: number,
  _take_profit_price: number,
  _stop_loss_price: number,
  _network: Network
): Promise<ScriptPayload | null> => {
  // const baseCoin = typeof base === 'string' ? MoveCoin[base] : base
  // const underlyingAsset = typeof underlying === 'string' ? OtherAsset[underlying] || MoveCoin[underlying] : underlying

  // const baseFeed = getPriceFeed(baseCoin, network)
  // const underlyingFeed = getPriceFeed(underlyingAsset, network)

  // const baseVaas = baseFeed ? await getPriceFeedUpdateData(baseFeed, getNetwork(network)) : [[0]]
  // const underlyingVaas = underlyingFeed ? await getPriceFeedUpdateData(underlyingFeed, getNetwork(network)) : [[0]]

  // const payload = {
  //   type: 'script_payload',
  //   code: {
  //     bytecode: registerAndOpenTradeCode().toString(),
  //   },
  //   arguments: [
  //     underlyingVaas,
  //     baseVaas,
  //     getDecimal8Argument(marginAmount), // always 8 decimals
  //     getDecimal8Argument(positionSize),
  //     tradeSide == TradeSide.LONG ? true : false,
  //     getDecimal8Argument(desired_price),
  //     getDecimal8Argument(max_slippage),
  //   ],
  //   type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  // }
  // return payload
  return null
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
