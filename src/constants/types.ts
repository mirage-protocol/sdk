import { MIRAGE_FRAMEWORK_ACCOUNT } from '../constants/accounts'

export const moduleAddress = MIRAGE_FRAMEWORK_ACCOUNT.address

export enum ValidMoveCoins {
  MIRA = 'MIRA',
  APTOS = 'APT',
  DEV_USDC = 'devUSDC',
  MIRAGE_APTOS = 'mAPT',
  MIRAGE_ETHEREUM = 'mETH',
  MIRAGE_USD = 'mUSD',
  ZL_USD = 'zUSDC',
  PANCAKE_APT_MUSD_LP = 'CAKE_APT_MUSD',
}

export type CoinMap = { readonly [coin in ValidMoveCoins]: string }

export const checkTicker = (ticker: string) => {
  switch (ticker) {
    case ValidMoveCoins.MIRA:
      return ValidMoveCoins.MIRA
    case ValidMoveCoins.APTOS:
      return ValidMoveCoins.APTOS
    case ValidMoveCoins.DEV_USDC:
      return ValidMoveCoins.DEV_USDC
    case ValidMoveCoins.MIRAGE_APTOS:
      return ValidMoveCoins.MIRAGE_APTOS
    case ValidMoveCoins.MIRAGE_ETHEREUM:
      return ValidMoveCoins.MIRAGE_ETHEREUM
    case ValidMoveCoins.MIRAGE_USD:
      return ValidMoveCoins.MIRAGE_USD
    case ValidMoveCoins.ZL_USD:
      return ValidMoveCoins.ZL_USD
    case ValidMoveCoins.PANCAKE_APT_MUSD_LP:
      return ValidMoveCoins.PANCAKE_APT_MUSD_LP
    default:
      throw new TypeError('Not a valid Coin')
  }
}

enum OtherTickers {
  ETHEREUM = 'ETH',
  BITCOIN = 'BTC',
}

export type ValidTickers = ValidMoveCoins | OtherTickers

export const TYPES: CoinMap = {
  [ValidMoveCoins.APTOS]: '0x1::aptos_coin::AptosCoin',
  [ValidMoveCoins.MIRAGE_ETHEREUM]: `${moduleAddress}::synth::METH`,
  [ValidMoveCoins.MIRAGE_USD]: `${moduleAddress}::synth::MUSD`,
  [ValidMoveCoins.MIRAGE_APTOS]: `${moduleAddress}::synth::MAPT`,
  [ValidMoveCoins.MIRA]: `${moduleAddress}::mirage::Mirage`,
  [ValidMoveCoins.DEV_USDC]:
    '0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC',
  [ValidMoveCoins.ZL_USD]: '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC',
  [ValidMoveCoins.PANCAKE_APT_MUSD_LP]: '#####TODO######',
}

export const PRECISIONS: Record<ValidMoveCoins, number> = {
  APT: 8,
  mUSD: 8,
  mAPT: 8,
  mETH: 8,
  zUSDC: 6,
  devUSDC: 8,
  MIRA: 8,
  CAKE_APT_MUSD: 8, // TODO: no idea if this is right, just a placeholder
}
