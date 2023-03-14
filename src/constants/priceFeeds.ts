import { APTOS_NETWORK, PYTH_CLIENT } from '../constants/network'
import { ValidMoveCoin } from './types'

type CoinsWithPriceFeeds = ValidMoveCoin.APTOS | ValidMoveCoin.MIRAGE_APTOS | ValidMoveCoin.MIRAGE_ETHEREUM

export const PRICE_FEEDS: { readonly [coin in CoinsWithPriceFeeds]: string } = {
  [ValidMoveCoin.APTOS]:
    APTOS_NETWORK === 'mainnet'
      ? '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5'
      : '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  [ValidMoveCoin.MIRAGE_APTOS]:
    APTOS_NETWORK === 'mainnet'
      ? '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5'
      : '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  [ValidMoveCoin.MIRAGE_ETHEREUM]:
    APTOS_NETWORK === 'mainnet'
      ? '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'
      : '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
  // [ValidMoveCoin.DEV_USDC]:
  //   APTOS_NETWORK === 'mainnet'
  //     ? '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a'
  //     : '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
}

export function getPriceFeed(borrowCoin: ValidMoveCoin, collateralCoin: ValidMoveCoin): string {
  return PRICE_FEEDS[borrowCoin] || PRICE_FEEDS[collateralCoin]
}

export function getCollateralPriceFeed(collateralCoin: ValidMoveCoin): string | undefined {
  return PRICE_FEEDS[collateralCoin]
}

export function getBorrowPriceFeed(borrowCoin: ValidMoveCoin): string | undefined {
  return PRICE_FEEDS[borrowCoin]
}

export const getPriceFeedUpdateData = async (priceFeedId: string): Promise<number[][]> => {
  try {
    console.log('Attempting to get pyth vaas')
    const updateData = await PYTH_CLIENT.getPriceFeedsUpdateData([priceFeedId])
    return updateData
  } catch {
    console.log('Error while getting pyth vaas')
  }
}
