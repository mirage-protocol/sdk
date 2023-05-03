import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../transactions'
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
export const assetInfo = (asset: MoveCoin | OtherAsset | string): AssetInfo => {
  if (typeof asset === 'string') {
    return mirageCoinList[OtherAsset[asset]] || mirageCoinList[MoveCoin[asset]]
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
const mirageCoinList: { readonly [coin in MoveCoin | OtherAsset]: AssetInfo | CoinInfo } = {
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
  // TODO
  [MoveCoin.APT_MUSD_LP]: {
    name: 'MUSD LP Coin',
    symbol: 'musd-lp',
    decimals: 8,
    address: getModuleAddress('pancake'),
    type: 'TODO',
  },
  [OtherAsset.ETH]: {
    name: 'Ethereum',
    symbol: 'ETH',
    type: `${mirageAddress()}::mirage::METH`,
  },
  [OtherAsset.BTC]: {
    name: 'Bitcoin',
    symbol: 'BTC',
    type: `${mirageAddress()}::mirage::MBTC`, // TODO: doesn't exist
  },
}
