import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../transactions'
import { getModuleAddress, mirageAddress } from './accounts'

const mirageConfig = {
  markets: {
    mUSD: {
      PEPE1000PERP: '0xa4c946644e03de33517782cc4374c923167f29ddb1d7e8c4a133f0e68a806745',
      APTPERP: '0x486616266789e2a7025355c0f093d137175c4d5755213af5d5e5fb012afefdca',
      ARBPERP: '0x016abbd192be59e704d2315b9d50dae1e9f90f376325a86d7ebe1358762fecb0',
      BTCPERP: '0x70815827877b0cfce7c28a8ea245f0290d38d31c5daebdbd7b0b7e16418d429c',
      ETHPERP: '0xbd0217255308302b45af2938bf4ab9c9d40f3a9797db517ae767b77bf08e7861',
      EURPERP: '0x9c1da8db9dd2313790a03c948c704396ce1470ae742340a88cfaf28881836fec',
      GBPPERP: '0x1b9edcd3005b4e7b6a9ee03b3193b106eb2cd1a0da9c18d974976a4bc2fbcb77',
      JPYPERP: '0x574c809d5824be8456ee11e0f12accca754ad65b4cc97e259a785404ecf77de3',
      OPPERP: '0x0312b202bbd62b96ef72aa5afc798d61042b4457fcc10552e699c2e2fa652dc5',
      SOLPERP: '0x3cf5461899fac4c75ca05d3d6f8ae64ada7e6a22292afc504eaaa865e4a48a4b',
      SUIPERP: '0x9475426cd47c615a919acb130586f79cdd0f6b72de73b0a7a5d7cfe5e9e22e68',
      XAGPERP: '0xbab169cb72fc0419300e853f2d9e6ae26b765e4daad1296b98e5cf0f13c71126',
      XAUPERP: '0xbf6bdad7c7a51452aa40a82c43b2228b8e452b1f488ecda709a400d0a7e28cf8',
    },
  },
  vaults: {
    APT: {
      mUSD: '0xd5781478b0805edcdceb4b5b85f002e9b99d1f6812e3be10b43862cd5ddaac87',
    },
    tUSDC: {
      mUSD: '0x32a44406e3303ec7d3bdcd7692582b7b4c3db53a0f5381900c96155f298598f7',
    },
  },
  tokens: {
    mUSD: '0xe51fefd5545bca1683540e398d11e9682c8ce1b3ec89700386e2c8169b5a1e56',
    APT: '0x42f36488d601a5fb47928fd83a3710eec881aa727b7e4e71a7d679c8b93ee528',
    tUSDC: '0xb37aea405cbea42141a6ad1c5d1155c357560c848409db3061616b90e8f5263a',
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
