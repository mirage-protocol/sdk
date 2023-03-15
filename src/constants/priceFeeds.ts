import { APTOS_NETWORK, PYTH_CLIENT } from '../constants/network'
import { MoveCoin } from './coinList'

type CoinsWithPriceFeeds = MoveCoin.APT | MoveCoin.mAPT | MoveCoin.mETH

export const PRICE_FEEDS: { readonly [coin in CoinsWithPriceFeeds]: string } = {
  [MoveCoin.APT]:
    APTOS_NETWORK === 'mainnet'
      ? '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5'
      : '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  [MoveCoin.mAPT]:
    APTOS_NETWORK === 'mainnet'
      ? '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5'
      : '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  [MoveCoin.mETH]:
    APTOS_NETWORK === 'mainnet'
      ? '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'
      : '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
  // [MoveCoin.DEV_USDC]:
  //   APTOS_NETWORK === 'mainnet'
  //     ? '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a'
  //     : '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
}

export function getPriceFeed(borrowCoin: MoveCoin, collateralCoin: MoveCoin): string {
  return PRICE_FEEDS[borrowCoin] || PRICE_FEEDS[collateralCoin]
}

export function getCollateralPriceFeed(collateralCoin: MoveCoin): string | undefined {
  return PRICE_FEEDS[collateralCoin]
}

export function getBorrowPriceFeed(borrowCoin: MoveCoin): string | undefined {
  return PRICE_FEEDS[borrowCoin]
}

export const getPriceFeedUpdateData = async (priceFeedId: string): Promise<number[][]> => {
  try {
    console.debug('Attempting to get pyth vaas')
    const updateData = await PYTH_CLIENT.getPriceFeedsUpdateData([priceFeedId])
    return updateData
  } catch (e) {
    console.error(`Error getting pyth vaas: ${e}`)
  }
}
