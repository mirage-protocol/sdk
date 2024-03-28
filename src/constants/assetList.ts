import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

import { MoveType } from '../transactions'
import { getModuleAddress, mirageAddress } from './accounts'

const mirageConfig = {
  markets: {
    mUSD: {
      PEPE1000PERP: '0x7712e115e3c47f3c14530a71c0a56a6a26d377f00a6e9849d195247e3f99ddc5',
      APTPERP: '0x7a65bd339ae5d1b31367a4b832c430bd99f468797850fe305c948408c8564a71',
      ARBPERP: '0x002f1b187c3e6e91d1f98cc960f41ac17f62dd7c3c990eb62ac220f8084fd128',
      BTCPERP: '0xb4c72b50d1a263054fbc47453cbe3de74f6cc60792de4f065ad3d5bb4a5f7f6a',
      ETHPERP: '0xf1b1318978d7a3d2216684f799e1b8540f8a2bc77b693c9034747299eca649f2',
      EURPERP: '0xc1e902dc3748a255c1747d6cf7eb10110a14633a4b0a65cd6eb383831dcb8c46',
      GBPPERP: '0x53c8678a0531c2fe2ceae680ef95cff4eb72229ee777ac84364842a11b64b133',
      JPYPERP: '0xc6099ff805323814a0ce57ddcc6add6b74960d8de26c476d6fd8e0ae21ff7897',
      OPPERP: '0xb5324dff8c9bb8b9e8a983257bae76e3ce3c9a1b70e96ef6b9b8b0f9e0a22803',
      SOLPERP: '0xc56d133c26fb1a416128fc83af1040b36f3bffc434873be8f21c6d673c5a152e',
      SUIPERP: '0xcd4ba75849788f47bdb92643eeb8f5095a49585d952f6d1b76164b382661e4af',
      XAGPERP: '0x28d760f507f16a8f93e622003a933bae72b99029f119605903b23a0b451ce335',
      XAUPERP: '0x7980c67b55cc75d5bab466364fdefa906424482692480042e0fd8e9f0631bc0a',
    },
  },
  vaults: {
    APT: {
      mUSD: '0x7d569cb6958a1767941aafb1302498f9059563beb581eac2e421d7e09a7c5f49',
    },
    tUSDC: {
      mUSD: '0xecc1d638b076cbfe297892267310800674a53ff83db0b9590bccb455ff46824a',
    },
  },
  tokens: {
    mUSD: '0x2cbe7a9934f26fcb210bb79bbdaaade72bf7d73abc9a4271676d84a564138975',
    APT: '0xd9fbaaea72d84b9cb5454a19a3a328467ac70fe571f9d6681410585cd90cea3e',
    tUSDC: '0xe205600757fe58ac11ad10c479df0c20e380f0c5a67d266f37d2823704cb3d63',
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

export const getPairFromMarketAddress = (marketObjectAddress: string): { marginToken: MoveToken; perp: Perpetual } => {
  for (const marginToken in mirageConfig.markets) {
    for (const perp in mirageConfig.markets[marginToken]) {
      if (mirageConfig.markets[marginToken][perp] === marketObjectAddress) {
        // Assuming Perpetual is a more complex type, you might need to instantiate it or fetch it from somewhere
        return { marginToken: getMoveAssetFromSymbol(marginToken) as MoveToken, perp: checkPerpSymbolUnSafe(perp) }
      }
    }
  }
  throw new Error('no pair found for address')
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

const checkPerpSymbolUnSafe = (symbol: string): Perpetual => {
  const perp = checkPerpSymbol(symbol)
  if (perp == undefined) {
    throw new Error(`perp not found for ${symbol}`)
  }
  return perp
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
