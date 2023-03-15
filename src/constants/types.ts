import { Types } from 'aptos'

import { MIRAGE_FRAMEWORK_ACCOUNT } from '../constants/accounts'

export const moduleAddress = MIRAGE_FRAMEWORK_ACCOUNT.address

export type Resource = Types.MoveResource

export enum ValidMoveCoin {
  MIRA,
  APT,
  mAPT,
  mETH,
  mUSD,
  zUSDC,
  devUSDC,
  PANCAKE_APT_MUSD_LP,
}

export enum OtherAsset {
  BTC,
  ETH,
}

export type ValidAssets = ValidMoveCoin | OtherAsset

export type CoinMap = { readonly [coin in ValidMoveCoin]: string }
export type AssetMap = { readonly [asset in ValidAssets]: string }
export type PrecisionMap = { readonly [coin in ValidMoveCoin]: number }

export const checkTicker = (symbol: string): ValidMoveCoin => {
  if (!Object.values(ValidMoveCoin).includes(symbol)) {
    throw new TypeError('Not a valid Coin')
  }
  return ValidMoveCoin[symbol]
}

export const TYPES: CoinMap = {
  [ValidMoveCoin.APT]: '0x1::aptos_coin::AptosCoin',
  [ValidMoveCoin.mETH]: `${moduleAddress}::synth::METH`,
  [ValidMoveCoin.mUSD]: `${moduleAddress}::synth::MUSD`,
  [ValidMoveCoin.mAPT]: `${moduleAddress}::synth::MAPT`,
  [ValidMoveCoin.MIRA]: `${moduleAddress}::mirage::Mirage`,
  [ValidMoveCoin.devUSDC]:
    '0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68::devnet_coins::DevnetUSDC',
  [ValidMoveCoin.zUSDC]: '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC',
  [ValidMoveCoin.PANCAKE_APT_MUSD_LP]: '#####TODO######',
} as const

export const PRECISIONS: PrecisionMap = {
  [ValidMoveCoin.APT]: 8,
  [ValidMoveCoin.mETH]: 8,
  [ValidMoveCoin.mUSD]: 8,
  [ValidMoveCoin.mAPT]: 8,
  [ValidMoveCoin.MIRA]: 8,
  [ValidMoveCoin.devUSDC]: 8,
  [ValidMoveCoin.zUSDC]: 6,
  [ValidMoveCoin.PANCAKE_APT_MUSD_LP]: 8, // TODO: no idea if this is right, just a placeholder
}
