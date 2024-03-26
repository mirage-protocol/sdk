import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../transactions'
import { getModuleAddress, mirageAddress } from './accounts'

const mirageConfig = {
  markets: {
    mUSD: {
      PEPE1000PERP: '0xe1b96d2f55c62a0172cd2f78d4861f9e3e5cc786285f00b07a9f6457974fbe44',
      APTPERP: '0xe989883d3eb1e55c3c708f5ba8150db7877ba4176853a9f7a01f4d153df56add',
      ARBPERP: '0xee0e4ec9727c57a9bd5949281e3e2c2dfbb81290f22b138b4c0f6aff33020746',
      BTCPERP: '0xabcf03c6b243348dc50d076e3c1aca8848440bdf4a9887564a0a02a167426c15',
      ETHPERP: '0x4f0fe3bbe329a140ca3305c0f9ddde5fc04b38bbf11123bd11122689008a021e',
      EURPERP: '0x26d5685ea0e6c9ecb768af0c182513075e4f0cc8756114b7f531a515745cd5e8',
      GBPPERP: '0x70f97a058647f567b0752dee51a1f61584fa688780dc22ec05c51079e5cbf9cf',
      JPYPERP: '0xb5c29821d799f00d072278391fb3f80b0a4330fdae3416aabbd2c3cbbf294a29',
      OPPERP: '0x94790488d9e8d39cbe870fa8e39315f0e7fcfd84edeff6f819c1c42d9e11afa7',
      SOLPERP: '0x8e614d7e91dfbfdb6c3d3dfe4e0fea775f16c13686f52bc5a8a06329da2a5ef3',
      SUIPERP: '0xcf1bd7eb837da7f994529e53eb9c34a7ed65a29125c5b5821d3ddec329e80d99',
      XAGPERP: '0xce669baad201e6ecd5b6c12576f6ce62c742333181dfd9a187c8e8439e264287',
      XAUPERP: '0x796d59260e01037ab3600266bc8d15a931f3f2114c2b794130d918b627f4d7bc',
    },
  },
  vaults: {
    APT: {
      mUSD: '0x891928ce14eb525e4feaad39014ac32d219645905451285990bf850bbb15ee19',
    },
    tUSDC: {
      mUSD: '0x741380d97dd7de756fc52348d3fd605a81dfcea4a2abede3cf631b485bdd9a84',
    },
  },
  tokens: {
    mUSD: '0x2ecc745ae9165ca23db8c194e59511235b4a126e9b00f7d17c9d34123a17777f',
    APT: '0x55995df143dfae5da0576c7f0e81e08fa7a695d5fc952751ee1afe8f08cba9d2',
    tUSDC: '0x993842edefb3dc0fbde5bfd2e76f422d4e3a2bfad0398491946cfd6593c3c080',
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
