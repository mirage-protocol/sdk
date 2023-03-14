import { Types } from 'aptos'

import { MIRAGE_FRAMEWORK_ACCOUNT } from '../constants/accounts'

export const moduleAddress = MIRAGE_FRAMEWORK_ACCOUNT.address

export type Resource = Types.MoveResource

export enum ValidMoveCoin {
  MIRA = 'MIRA',
  APTOS = 'APT',
  DEV_USDC = 'devUSDC',
  MIRAGE_APTOS = 'mAPT',
  MIRAGE_ETHEREUM = 'mETH',
  MIRAGE_USD = 'mUSD',
  ZL_USD = 'zUSDC',
  PANCAKE_APT_MUSD_LP = 'CAKE_APT_MUSD',
}

export enum OtherAsset {
  ETHEREUM = 'ETH',
  BITCOIN = 'BTC',
}

export type ValidAssets = ValidMoveCoin | OtherAsset

export type CoinMap = { readonly [coin in ValidMoveCoin]: string }
export type AssetMap = { readonly [asset in ValidAssets]: string }

export const checkTicker = (ticker: string) => {
  switch (ticker) {
    case ValidMoveCoin.MIRA:
      return ValidMoveCoin.MIRA
    case ValidMoveCoin.APTOS:
      return ValidMoveCoin.APTOS
    case ValidMoveCoin.DEV_USDC:
      return ValidMoveCoin.DEV_USDC
    case ValidMoveCoin.MIRAGE_APTOS:
      return ValidMoveCoin.MIRAGE_APTOS
    case ValidMoveCoin.MIRAGE_ETHEREUM:
      return ValidMoveCoin.MIRAGE_ETHEREUM
    case ValidMoveCoin.MIRAGE_USD:
      return ValidMoveCoin.MIRAGE_USD
    case ValidMoveCoin.ZL_USD:
      return ValidMoveCoin.ZL_USD
    case ValidMoveCoin.PANCAKE_APT_MUSD_LP:
      return ValidMoveCoin.PANCAKE_APT_MUSD_LP
    default:
      throw new TypeError('Not a valid Coin')
  }
}

export const TYPES: CoinMap = {
  [ValidMoveCoin.APTOS]: '0x1::aptos_coin::AptosCoin',
  [ValidMoveCoin.MIRAGE_ETHEREUM]: `${moduleAddress}::synth::METH`,
  [ValidMoveCoin.MIRAGE_USD]: `${moduleAddress}::synth::MUSD`,
  [ValidMoveCoin.MIRAGE_APTOS]: `${moduleAddress}::synth::MAPT`,
  [ValidMoveCoin.MIRA]: `${moduleAddress}::mirage::Mirage`,
  [ValidMoveCoin.DEV_USDC]:
    '0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC',
  [ValidMoveCoin.ZL_USD]: '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC',
  [ValidMoveCoin.PANCAKE_APT_MUSD_LP]: '#####TODO######',
}

export const PRECISIONS: Record<ValidMoveCoin, number> = {
  APT: 8,
  mUSD: 8,
  mAPT: 8,
  mETH: 8,
  zUSDC: 6,
  devUSDC: 8,
  MIRA: 8,
  CAKE_APT_MUSD: 8, // TODO: no idea if this is right, just a placeholder
}
