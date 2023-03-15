import { HexString } from 'aptos'

import { DEV_USDC_ADDRESS, LZ_ADDRESS, MIRAGE_ADDRESS, PANCAKE_ADDRESS } from './accounts'

// All relevant coins for the protocol
export enum MoveCoin {
  MIRA,
  APT,
  mAPT,
  mETH,
  mUSD,
  zUSDC,
  devUSDC,
  PANCAKE_APT_MUSD_LP,
}

export const MIRAGE_ASSETS: MoveCoin[] = [MoveCoin.mAPT, MoveCoin.mUSD, MoveCoin.mETH]

export enum OtherAsset {
  BTC,
  ETH,
}

export type ValidAssets = MoveCoin | OtherAsset

type CoinInfo = {
  readonly name: string
  readonly symbol: string
  readonly decimals: number
  readonly address: HexString
  readonly type: string
  readonly logoUrl?: string
}

export const checkTicker = (symbol: string): MoveCoin => {
  if (!Object.values(MoveCoin).includes(symbol)) {
    throw new TypeError('Not a valid Coin')
  }
  return MoveCoin[symbol]
}

export const coinInfo = (coin: MoveCoin): CoinInfo => mirageCoinList[coin]

const mirageCoinList: { readonly [coin in MoveCoin]: CoinInfo } = {
  [MoveCoin.APT]: {
    name: 'Aptos Coin',
    symbol: 'APT',
    decimals: 8,
    address: new HexString('0x1'),
    type: '0x1::aptos_coin::AptosCoin',
    logoUrl: 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/APT.webp',
  },
  [MoveCoin.MIRA]: {
    name: 'Mirage Coin',
    symbol: 'MIRA',
    decimals: 8,
    address: MIRAGE_ADDRESS,
    type: `${MIRAGE_ADDRESS}::mirage::Mirage`,
  },
  [MoveCoin.mUSD]: {
    name: 'Mirage USD',
    symbol: 'MIRA',
    decimals: 8,
    address: MIRAGE_ADDRESS,
    type: `${MIRAGE_ADDRESS}::synth::MUSD`,
  },
  [MoveCoin.mAPT]: {
    name: 'Mirage Aptos',
    symbol: 'mAPT',
    decimals: 8,
    address: MIRAGE_ADDRESS,
    type: `${MIRAGE_ADDRESS}::synth::MAPT`,
  },
  [MoveCoin.mETH]: {
    name: 'Mirage Ethereum',
    symbol: 'mETH',
    decimals: 8,
    address: MIRAGE_ADDRESS,
    type: `${MIRAGE_ADDRESS}::synth::METH`,
  },
  [MoveCoin.zUSDC]: {
    name: 'Layer-Zero USDC',
    symbol: 'zUSDC',
    decimals: 6,
    address: LZ_ADDRESS,
    type: `${LZ_ADDRESS}::asset::USDC`,
    logoUrl: 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/USDC.svg',
  },
  [MoveCoin.devUSDC]: {
    name: 'Testnet USDC',
    symbol: 'devUSDC',
    decimals: 8,
    address: DEV_USDC_ADDRESS,
    type: `${DEV_USDC_ADDRESS}::devnet_coins::DevnetUSDC`,
    logoUrl: 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/USDC.svg',
  },
  // TODO
  [MoveCoin.PANCAKE_APT_MUSD_LP]: {
    name: 'MUSD LP Coin',
    symbol: 'musd-lp',
    decimals: 8,
    address: PANCAKE_ADDRESS,
    type: 'TODO',
  },
}
