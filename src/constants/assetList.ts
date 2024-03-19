import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../transactions'
import { getModuleAddress, mirageAddress } from './accounts'

/**
 * All Tokens relevant to the mirage-protocol ecosystem
 */
export enum MoveToken {
  MIRA = 'MIRA', // Mirage coin
  mAPT = 'mAPT', // mirage-Aptos
  mETH = 'mETH', // mirage-Ethereum
  mUSD = 'mUSD', // mirage-Usd
  devUSDC = 'devUSDC', // devnet USDC
  APT_MUSD_LP = 'APT_MUSD_LP', // APT/MUSD LP
}

/**
 * All Coins relevant to the mirage-protocol ecosystem
 */
export enum MoveCoin {
  APT = 'APT', // Aptos coin
  zUSDC = 'zUSDC', // Layer-zero USDC
}

/**
 * Other off-chain assets
 */
export enum Perpetual {
  // Crypto
  APTPERP = 'APTPERP',
  ARBPERP = 'ARBPERP',
  BTCPERP = 'BTCPERP',
  ETHPERP = 'ETHPERP',
  OPPERP = 'OPPERP',
  PEPE1000PERP = 'PEPE1000PERP',
  SOLPERP = 'SOLPERP',
  SUIPERP = 'SUIPERP',
  // Metals
  XAGPERP = 'XAGPERP',
  XAUPERP = 'XAUPERP',
  // FX
  EURPERP = 'EURPERP',
  GBPPERP = 'GBPPERP',
  JPYPERP = 'JPYPERP',
}

/**
 * All synthetic mirage assets
 */
export const MIRAGE_ASSETS: readonly MoveToken[] = [MoveToken.mAPT, MoveToken.mUSD, MoveToken.mETH]

export type AssetInfo = {
  readonly name: string
  readonly symbol: string
  readonly type: MoveType
}

/**
 * Info for a move asset
 */
export type MoveAssetInfo = AssetInfo & {
  readonly decimals: number
  readonly address: HexString
  readonly metadataAddress: string
}

export type MoveAsset = MoveCoin | MoveToken

export const getTypeFromMoveAsset = (asset: MoveAsset): string => {
  if (MoveToken[asset] != undefined) {
    return 'MoveToken'
  } else if (MoveCoin[asset] != undefined) {
    return 'MoveCoin'
  }
  throw new Error('Not a valid move asset!')
}

/**
 * Get the MoveToken or MoveCoin of a given symbol
 * @param symbol string symbol of coin
 * @returns the MoveToken or undefined if not valid
 */
export const getMoveAssetFromSymbol = (symbol: string): MoveAsset | undefined => {
  return MoveToken[symbol] ?? MoveCoin[symbol]
}

/**
 * Get the Perpetual of a given symbol
 * @param symbol string symbol of coin
 * @returns the Perpetual or undefined if not valid
 */
export const checkPerpSymbol = (symbol: string): Perpetual | undefined => {
  return Perpetual[symbol]
}

/**
 * Get info about a specific asset
 * @param coin the MoveToken to get info for
 * @returns the AssetInfo for the specific coin
 */
export const assetInfo = (asset: MoveAsset | Perpetual | string): AssetInfo => {
  if (typeof asset === 'string') {
    return mirageAssetList[MoveToken[asset] || Perpetual[asset]]
  }
  return mirageAssetList[asset]
}

/**
 * Get info about a specific asset
 * @param coin the MoveToken to get info for
 * @returns the MoveAssetInfo for the specific coin or token
 */
export const moveAssetInfo = (coin: MoveAsset | string): MoveAssetInfo => {
  if (typeof coin === 'string') {
    return mirageAssetList[MoveToken[coin]] ?? mirageAssetList[MoveCoin[coin]]
  }
  return mirageAssetList[coin]
}

/**
 * Get the balance of a coin in a Ui friendly format
 * @param balance the balance to convert
 * @param coin the coin
 * @returns a human-readable balance value
 */
export const balanceToUi = (balance: BigNumber, coin: MoveToken | string): number => {
  return balance.div(BigNumber(10).pow(moveAssetInfo(coin).decimals)).toNumber()
}

/**
 * Convert move token type to MoveToken
 * @param type the type of the perp
 * @returns a move token
 */
export const typeToMoveToken = (type: string): MoveToken | undefined => {
  for (const asset in mirageAssetList) {
    if (asset in MoveToken && mirageAssetList[asset].type == type) {
      return MoveToken[asset]
    }
  }
  return undefined
}

/**
 * Convert move Coin type to MoveCoin
 * @param type the type of the perp
 * @returns a move Coin
 */
export const typeToMoveCoin = (type: string): MoveCoin | undefined => {
  for (const asset in mirageAssetList) {
    if (asset in MoveCoin && mirageAssetList[asset].type == type) {
      return MoveCoin[asset]
    }
  }
  return undefined
}

/**
 * Convert perpetual move type to Perpetual
 * @param type the type of the perp
 * @returns a perpetual asset
 */
export const typeToPerpetual = (type: string): Perpetual | undefined => {
  for (const asset in mirageAssetList) {
    if (asset in Perpetual && mirageAssetList[asset].type == type) {
      return Perpetual[asset]
    }
  }
  return undefined
}

// A list of all coins and their info in the Mirage ecosystem
const mirageAssetList: { readonly [coin in MoveAsset | Perpetual]: AssetInfo | MoveAssetInfo } = {
  [MoveCoin.APT]: {
    name: 'Aptos Coin',
    symbol: 'APT',
    decimals: 8,
    address: new HexString('0x1'),
    type: '0x1::aptos_coin::AptosCoin',
    metadataAddress: '0x4a0a186b29e215b343ad3fa04a63afa030eba07f174ef63216022754c70acadd',
  },
  [MoveToken.MIRA]: {
    name: 'Mirage Coin',
    symbol: 'MIRA',
    decimals: 8,
    address: mirageAddress(),
    type: `${mirageAddress()}::mirage::Mirage`,
  },
  [MoveToken.mUSD]: {
    name: 'Mirage USD',
    symbol: 'mUSD',
    decimals: 8,
    address: mirageAddress(),
    type: `${mirageAddress()}::mirage::MUSD`,
    metadataAddress: '0xde6de53919dffb3e900c1cbc46f4a89bca26d809d6c1fabb27d20fe14fe6f1c',
  },
  [MoveToken.mAPT]: {
    name: 'Mirage Aptos',
    symbol: 'mAPT',
    decimals: 8,
    address: mirageAddress(),
    type: `${mirageAddress()}::mirage::MAPT`,
  },
  [MoveToken.mETH]: {
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
  [MoveToken.devUSDC]: {
    name: 'Testnet USDC',
    symbol: 'devUSDC',
    decimals: 8,
    address: getModuleAddress('mirage'),
    type: `${getModuleAddress('mirage')}::devUSDC::DevUSDC`,
  },
  [MoveToken.APT_MUSD_LP]: {
    name: 'APT-MUSD LP Coin',
    symbol: 'musd-lp',
    decimals: 8,
    // TODO FIX WITH MIRAGE SWAP
    address: getModuleAddress('mirage'),
    type: `${getModuleAddress('mirage')}::devUSDC::DevUSDC`,
  },
  [Perpetual.APTPERP]: {
    name: 'Aptos Perpetuals Market',
    symbol: 'APT',
    type: `${mirageAddress()}::market_types::APTPERP`,
  },
  [Perpetual.ARBPERP]: {
    name: 'Arbitrum Perpetuals Market',
    symbol: 'ARB',
    type: `${mirageAddress()}::market_types::ARBPERP`,
  },
  [Perpetual.BTCPERP]: {
    name: 'Bitcoin Perpetuals Market',
    symbol: 'BTC',
    type: `${mirageAddress()}::market_types::BTCPERP`,
  },
  [Perpetual.ETHPERP]: {
    name: 'Ethereum Perpetuals Market',
    symbol: 'ETH',
    type: `${mirageAddress()}::market_types::ETHPERP`,
  },
  [Perpetual.OPPERP]: {
    name: 'Optimism Perpetuals Market',
    symbol: 'OP',
    type: `${mirageAddress()}::market_types::OPPERP`,
  },
  [Perpetual.PEPE1000PERP]: {
    name: '1000 Pepe Perpetuals Market',
    symbol: '1000PEPE',
    type: `${mirageAddress()}::market_types::PEPE1000PERP`,
  },
  [Perpetual.SOLPERP]: {
    name: 'Solana Perpetuals Market',
    symbol: 'SOL',
    type: `${mirageAddress()}::market_types::SOLPERP`,
  },
  [Perpetual.SUIPERP]: {
    name: 'Sui Perpetuals Market',
    symbol: 'SUI',
    type: `${mirageAddress()}::market_types::SUIPERP`,
  },
  [Perpetual.XAGPERP]: {
    name: 'Silver Perpetuals Market',
    symbol: 'XAG',
    type: `${mirageAddress()}::market_types::XAGPERP`,
  },
  [Perpetual.XAUPERP]: {
    name: 'Gold Perpetuals Market',
    symbol: 'XAU',
    type: `${mirageAddress()}::market_types::XAUPERP`,
  },
  [Perpetual.EURPERP]: {
    name: 'Euro Perpetuals Market',
    symbol: 'EUR',
    type: `${mirageAddress()}::market_types::EURPERP`,
  },
  [Perpetual.GBPPERP]: {
    name: 'British Pound Perpetuals Market',
    symbol: 'GBP',
    type: `${mirageAddress()}::market_types::GBPPERP`,
  },
  [Perpetual.JPYPERP]: {
    name: 'Japanese Yen Perpetuals Market',
    symbol: 'JPY',
    type: `${mirageAddress()}::market_types::JPYPERP`,
  },
}
