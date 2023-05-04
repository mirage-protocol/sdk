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
import { getDecimal8Argument, MoveType, Payload } from './'

const type = 'entry_function_payload'

// Get the types for this market
const getMarketTypeArguments = (base: MoveCoin | string, underlying: MoveCoin | string): MoveType[] => {
  return [coinInfo(base).type, assetInfo(underlying).type]
}

/**
 * Open a trade in a market at the current price
 * @returns payload promise for the transaction
 */
export const openTrade = async (
  base: MoveCoin | string,
  underlying: OtherAsset | string,
  marginAmount: number,
  positionSize: number,
  long: boolean,
  desired_price: number,
  max_slippage: number,
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
    function: `${mirageAddress()}::market::open_trade`,
    arguments: [
      underlyingVaas,
      baseVaas,
      getDecimal8Argument(marginAmount), // always 8 decimals
      getDecimal8Argument(positionSize),
      long,
      getDecimal8Argument(desired_price),
      getDecimal8Argument(max_slippage),
      getDecimal8Argument(take_profit_price),
      getDecimal8Argument(stop_loss_price),
    ],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  return payload
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
  long: boolean,
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
      long,
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
