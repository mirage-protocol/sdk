import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../payloads'
import { getModuleAddress, mirageAddress } from './accounts'

/**
 * All Coins relevant to the mirage-protocol ecosystem
 */
export enum MoveCoin {
  MIRA, // Mirage coin
  APT, // Aptos coin
  mAPT, // mirage-Aptos
  mETH, // mirage-Ethereum
  mUSD, // mirage-Usd
  zUSDC, // Layer-zero USDC
  devUSDC, // devnet USDC
  APT_MUSD_LP, // APT/MUSD LP
}

/**
 * Other off-chain assets
 */
export enum OtherAsset {
  BTC,
  ETH,
}

/**
 * All synthetic mirage assets
 */
export const MIRAGE_ASSETS: readonly MoveCoin[] = [MoveCoin.mAPT, MoveCoin.mUSD, MoveCoin.mETH]

/**
 * Info for a coin
 */
export type CoinInfo = {
  readonly name: string
  readonly symbol: string
  readonly decimals: number
  readonly address: HexString
  readonly type: MoveType
  readonly logoUrl?: string
}

/**
 * Get the MoveCoin of a given symbol
 * @param symbol string symbol of coin
 * @returns the MoveCoin or undefined if not valid
 */
export const checkSymbol = (symbol: string): MoveCoin | undefined => {
  return MoveCoin[symbol]
}

/**
 * Get info about a specific coin
 * @param coin the MoveCoin to get info for
 * @returns the CoinInfo for the specific coin
 */
export const coinInfo = (coin: MoveCoin | string): CoinInfo => {
  if (typeof coin === 'string') {
    return mirageCoinList[MoveCoin[coin]]
  }
  return mirageCoinList[coin]
}

/**
 * Get the balance of a coin in a Ui friendly format
 * @param balance the balance to convert
 * @param coin the coin
 * @returns a human-readable balance value
 */
export const balanceToUi = (balance: BigNumber, coin: MoveCoin | string): number => {
  return balance.div(BigNumber(10).pow(coinInfo(coin).decimals)).toNumber()
}

// A list of all coins and their info in the Mirage ecosystem
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
    address: mirageAddress(),
    type: `${mirageAddress()}::mirage::Mirage`,
  },
  [MoveCoin.mUSD]: {
    name: 'Mirage USD',
    symbol: 'mUSD',
    decimals: 8,
    address: mirageAddress(),
    type: `${mirageAddress()}::mirage::MUSD`,
  },
  [MoveCoin.mAPT]: {
    name: 'Mirage Aptos',
    symbol: 'mAPT',
    decimals: 8,
    address: mirageAddress(),
    type: `${mirageAddress()}::mirage::MAPT`,
  },
  [MoveCoin.mETH]: {
    name: 'Mirage Ethereum',
    symbol: 'mETH',
    decimals: 8,
    address: mirageAddress(),
    type: `${mirageAddress()}::mirage::METH`,
  },
  [MoveCoin.zUSDC]: {
    name: 'Layer-Zero USDC',
    symbol: 'zUSDC',
    decimals: 6,
    address: getModuleAddress('layer_zero'),
    type: `${getModuleAddress('layer_zero')}::asset::USDC`,
    logoUrl: 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/USDC.svg',
  },
  [MoveCoin.devUSDC]: {
    name: 'Testnet USDC',
    symbol: 'devUSDC',
    decimals: 8,
    address: getModuleAddress('dev_usdc'),
    type: `${getModuleAddress('dev_usdc')}::devnet_coins::DevnetUSDC`,
    logoUrl: 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/USDC.svg',
  },
  // TODO
  [MoveCoin.APT_MUSD_LP]: {
    name: 'MUSD LP Coin',
    symbol: 'musd-lp',
    decimals: 8,
    address: getModuleAddress('pancake'),
    type: 'TODO',
  },
}
