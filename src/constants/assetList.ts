import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../transactions'
import { getModuleAddress, mirageAddress } from './accounts'

const mirageConfig = {
  markets: {
    mUSD: {
      PEPE1000PERP: '0x0ca7c97176121f307b0072513e435fd77e7e43b9891e371486ee7d5c554d8170',
      APTPERP: '0xfe3e05f40ad205c074626987c18533d6833513f517ac4924dde998a86b472680',
      ARBPERP: '0xc345c378ba2482dd5760054d69452742572d383f36ca1f7d4bdd1222383f12f2',
      BTCPERP: '0x59b5934e2ca3cf4055c144eb09144dee2c71fe51cc4d53e1155beb8058325a4c',
      ETHPERP: '0x2842528b2a01da8bac056671a0eabd5cc06ef748221f9bdc351f9675666fd69b',
      EURPERP: '0xea8f39d66538bceef804b9631ebbffee5f18b57ef89b3770db5d62af76065379',
      GBPPERP: '0x2e4b9632e494da8f4fac289419cab805d3cbda9ec5424f3d9905fccbd6e09f83',
      JPYPERP: '0x2f7b9828b62b17ce786fb6bddff5e8e3d9b4525a9c6432d73b9f02e7aeb4670a',
      OPPERP: '0x45a5a88dec9437268d8eb3b100c542e0627d57d508c47f603f52ce514ef46e1d',
      SOLPERP: '0xcc1b2faf53de7bb63f3ad7ae8d0c701a0584e1b81b9d9ce8d3da5ed88b17324e',
      SUIPERP: '0x501b3ec0372e6486fc746590fc520f18b61ec54695a1d65db5c877f3707abe9f',
      XAGPERP: '0x7d816fd40dfd70c06119d4766a58cc2c5fe44b6e300b6d82dc942805a959bb15',
      XAUPERP: '0x7bd1fb61ad56f8af4906679feeea115f4261f1b3b313a755623140dbd293b566',
    },
  },
  vaults: {
    APT: {
      mUSD: '0x99af39ba3f14da43ec85e26f285b4cb771833d6ef2c889bd125d0f77b228bd93',
    },
    tUSDC: {
      mUSD: '0x7fd5ae5befa88b90efebdc438bbdc01455ed49792abb6f3df1cbea59d576cd10',
    },
  },
  tokens: {
    mUSD: '0xf44da8c88daa9b65e78cf58dc634a69ce4b6eebe34269b29445963d17be6994e',
    APT: '0x9ecf4715e8e8b797828d3441bc64e23745af326fefc5112b8932c3c0a1cb6d06',
    tUSDC: '0xbe76f22d4b713dbf38673bc62ec4eee1243939a5747ccc50947cb6380d9faa03',
  },
}

export const getAllVaultCollectionObjectAddresses = (): string[] => {
  const vaultCollectionAddresses: string[] = []

  Object.values(mirageConfig.vaults).forEach((vault) => {
    Object.values(vault).forEach((address) => {
      vaultCollectionAddresses.push(address)
    })
  })

  return vaultCollectionAddresses
}

export const getAllMarketObjectAddresses = (): string[] => {
  const marketAddresses: string[] = []

  Object.values(mirageConfig.markets).forEach((market) => {
    Object.values(market).forEach((address) => {
      marketAddresses.push(address)
    })
  })

  return marketAddresses
}

/**
 * All Tokens relevant to the mirage-protocol ecosystem
 */
export enum MoveToken {
  MIRA = 'MIRA', // Mirage coin
  mAPT = 'mAPT', // mirage-Aptos
  mETH = 'mETH', // mirage-Ethereum
  mUSD = 'mUSD', // mirage-Usd
  tUSDC = 'tUSDC', // testnet USDC
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
    return mirageAssetList[MoveToken[asset] || Perpetual[asset] || MoveCoin[asset]]
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

export const getCollectionIdForPerpPair = (marginToken: MoveToken, perp: Perpetual): string => {
  if (!(Perpetual[perp] in mirageConfig.markets[MoveToken[marginToken]])) throw new Error('Not a valid perp pair')
  return mirageConfig.markets[MoveToken[marginToken]][Perpetual[perp]]
}

export const getCollectionIdForVaultPair = (collateralAsset: MoveAsset, borrowToken: MoveToken): string => {
  if (getTypeFromMoveAsset(collateralAsset) == 'MoveCoin') {
    if (!(MoveToken[borrowToken] in mirageConfig.vaults[MoveCoin[collateralAsset]]))
      throw new Error('Not a valid vault pair')
    return mirageConfig.vaults[MoveCoin[collateralAsset]][MoveToken[borrowToken]]
  } else if (getTypeFromMoveAsset(collateralAsset) == 'MoveToken') {
    if (!(MoveToken[borrowToken] in mirageConfig.vaults[MoveToken[collateralAsset]]))
      throw new Error('Not a valid vault pair')
    return mirageConfig.vaults[MoveToken[collateralAsset]][MoveToken[borrowToken]]
  }
  throw new Error('Not a valid vault pair')
}

export const getAssetTokenMetadata = (asset: MoveAsset): string => {
  if (getTypeFromMoveAsset(asset) == 'MoveCoin') {
    if (!(MoveCoin[asset] in mirageConfig.tokens)) throw new Error('token metadata not found')
    return mirageConfig.tokens[MoveCoin[asset]]
  } else if (getTypeFromMoveAsset(asset) == 'MoveToken') {
    if (!(MoveToken[asset] in mirageConfig.tokens)) throw new Error('token metadata not found')
    return mirageConfig.tokens[MoveToken[asset]]
  }
  throw new Error('token metadata not found')
}

// A list of all coins and their info in the Mirage ecosystem
const mirageAssetList: { readonly [coin in MoveAsset | Perpetual]: AssetInfo | MoveAssetInfo } = {
  [MoveCoin.APT]: {
    name: 'Aptos Coin',
    symbol: 'APT',
    decimals: 8,
    address: new HexString('0x1'),
    type: '0x1::aptos_coin::AptosCoin',
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
  [MoveToken.tUSDC]: {
    name: 'Testnet USDC',
    symbol: 'tUSDC',
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
