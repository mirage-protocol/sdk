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
import { getAmountArgument, MoveType, Payload } from './'

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
      baseVaas,
      underlyingVaas,
      getAmountArgument(baseCoin, marginAmount),
      getAmountArgument(MoveCoin.mUSD, positionSize),
      long,
      getAmountArgument(MoveCoin.mUSD, desired_price),
      getAmountArgument(MoveCoin.mUSD, max_slippage),
      getAmountArgument(MoveCoin.mUSD, take_profit_price),
      getAmountArgument(MoveCoin.mUSD, stop_loss_price),
    ],
    type_arguments: getMarketTypeArguments(baseCoin, underlyingAsset),
  }
  console.log(payload)
  return payload
}
