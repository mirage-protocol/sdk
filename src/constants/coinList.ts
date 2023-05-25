import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../transactions'
import { getModuleAddress, mirageAddress } from './accounts'

/**
 * All Coins relevant to the mirage-protocol ecosystem
 */
export enum MoveCoin {
  MIRA = 'MIRA', // Mirage coin
  APT = 'APT', // Aptos coin
  mAPT = 'mAPT', // mirage-Aptos
  mETH = 'mETH', // mirage-Ethereum
  mUSD = 'mUSD', // mirage-Usd
  zUSDC = 'zUSDC', // Layer-zero USDC
  devUSDC = 'devUSDC', // devnet USDC
  APT_MUSD_LP = 'APT_MUSD_LP', // APT/MUSD LP
}

/**
 * Other off-chain assets
 */
export enum Perpetual {
  BTCPERP = 'BTCPERP',
  ETHPERP = 'ETHPERP',
  APTPERP = 'APTPERP',
}

/**
 * All synthetic mirage assets
 */
export const MIRAGE_ASSETS: readonly MoveCoin[] = [MoveCoin.mAPT, MoveCoin.mUSD, MoveCoin.mETH]

export type AssetInfo = {
  readonly name: string
  readonly symbol: string
  readonly type: MoveType
}

/**
 * Info for a coin
 */
export type CoinInfo = AssetInfo & {
  readonly decimals: number
  readonly address: HexString
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
 * Get info about a specific asset
 * @param coin the MoveCoin to get info for
 * @returns the AssetInfo for the specific coin
 */
export const assetInfo = (asset: MoveCoin | Perpetual | string): AssetInfo => {
  if (typeof asset === 'string') {
    return mirageCoinList[MoveCoin[asset] || Perpetual[asset]]
  }
  return mirageCoinList[asset]
}

/**
 * Get info about a specific asset
 * @param coin the MoveCoin to get info for
 * @returns the CoinInfo for the specific coin
 */
export const coinInfo = (coin: MoveCoin | string): CoinInfo => {
  if (typeof coin === 'string') {
    return mirageCoinList[MoveCoin[coin]]
  }
  return <CoinInfo>mirageCoinList[coin]
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
const mirageCoinList: { readonly [coin in MoveCoin | Perpetual]: AssetInfo | CoinInfo } = {
  [MoveCoin.APT]: {
    name: 'Aptos Coin',
    symbol: 'APT',
    decimals: 8,
    address: new HexString('0x1'),
    type: '0x1::aptos_coin::AptosCoin',
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
  },
  [MoveCoin.devUSDC]: {
    name: 'Testnet USDC',
    symbol: 'devUSDC',
    decimals: 8,
    address: getModuleAddress('dev_usdc'),
    type: `${getModuleAddress('dev_usdc')}::devnet_coins::DevnetUSDC`,
  },
  [MoveCoin.APT_MUSD_LP]: {
    name: 'APT-MUSD LP Coin',
    symbol: 'musd-lp',
    decimals: 8,
    address: getModuleAddress('mirage_lp'),
    type: `${getModuleAddress('mirage_lp')}::mirage_lp::lp_coin`,
  },
  [Perpetual.ETHPERP]: {
    name: 'Ethereum Perpetuals Market',
    symbol: 'ETH',
    type: `${mirageAddress()}::market_types::ETHPERP`,
  },
  [Perpetual.BTCPERP]: {
    name: 'Bitcoin Perpetuals Market',
    symbol: 'BTC',
    type: `${mirageAddress()}::market_types::BTCPERP`,
  },
  [Perpetual.APTPERP]: {
    name: 'Aptos Perpetuals Market',
    symbol: 'APT',
    type: `${mirageAddress()}::market_types::APTPERP`,
  },
}
