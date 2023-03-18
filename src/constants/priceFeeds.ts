import { getNetwork, Network, pythClient } from '../constants/network'
import { MoveCoin } from './coinList'

const coinsWithPriceFeeds = [MoveCoin.APT, MoveCoin.mAPT, MoveCoin.mETH, MoveCoin.devUSDC] as const
/**
 * All coins with a price feed supported by mirage protocol
 */
export type CoinsWithPriceFeeds = (typeof coinsWithPriceFeeds)[number]

/**
 * Check if a coin has a price feed
 * @param coin the coin to check
 * @returns if a mirage protocol price feed exists for the coin
 */
export const hasPriceFeed = (coin: MoveCoin): boolean => {
  return (coinsWithPriceFeeds as any).indexOf(coin) != -1
}

/**
 * Get the price feed for a Coin
 * @param coin the coin to get a price feed for
 * @param network
 * @returns
 */
export const getPriceFeed = (coin: MoveCoin, network: Network | string = Network.MAINNET): string | undefined => {
  return PRICE_FEEDS[coin] ? PRICE_FEEDS[coin][getNetwork(network)] : undefined
}

/**
 * Gets a priceFeed update data promise from Pyth
 * @param priceFeedId the price feed id string
 * @param network the network, default mainnet
 * @returns the update data promise
 */
export const getPriceFeedUpdateData = async (
  priceFeedId: string,
  network: Network | string = Network.MAINNET
): Promise<number[][] | undefined> => {
  try {
    console.debug('Attempting to get pyth vaas')
    const updateData = await pythClient(getNetwork(network)).getPriceFeedsUpdateData([priceFeedId])
    return updateData
  } catch (e) {
    console.error(`Error getting pyth vaas: ${e}`)
    return undefined
  }
}

// Price feeds of coins by network
const PRICE_FEEDS: { readonly [coin: string]: { readonly [network in Network]: string } } = {
  [MoveCoin.APT]: {
    [Network.MAINNET]: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
    [Network.TESTNET]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  },
  [MoveCoin.mAPT]: {
    [Network.MAINNET]: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
    [Network.TESTNET]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  },
  [MoveCoin.mETH]: {
    [Network.MAINNET]: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    [Network.TESTNET]: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
  },
  //[MoveCoin.devUSDC]: {
  //  ['mainnet']: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
  //  ['testnet']: '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
  //},
}
