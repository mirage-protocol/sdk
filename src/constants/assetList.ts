import { AccountAddress } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, mirageAddress, MirageConfig } from './accounts'

export const getAllVaultCollectionObjectAddresses = (config: MirageConfig): string[] => {
  const vaultCollectionAddresses: string[] = []

  Object.values(config.vaults).forEach((vault) => {
    Object.values(vault).forEach((address) => {
      vaultCollectionAddresses.push(address)
    })
  })

  return vaultCollectionAddresses
}

export const getAllMarketObjectAddresses = (config: MirageConfig): string[] => {
  const marketAddresses: string[] = []

  Object.values(config.markets).forEach((market) => {
    Object.values(market).forEach((address) => {
      marketAddresses.push(address)
    })
  })

  return marketAddresses
}

export const getPairFromMarketAddress = (
  marketObjectAddress: string,
  config: MirageConfig,
): { marginToken: MoveToken; perp: Perpetual } => {
  let usedAddr = marketObjectAddress
  while (usedAddr.length < 66) {
    usedAddr = usedAddr.replace('0x', '0x0')
  }
  for (const marginToken in config.markets) {
    for (const perp in config.markets[marginToken]) {
      if (config.markets[marginToken][perp] === usedAddr) {
        // Assuming Perpetual is a more complex type, you might need to instantiate it or fetch it from somewhere
        return { marginToken: getMoveAssetFromSymbol(marginToken) as MoveToken, perp: checkPerpSymbolUnSafe(perp) }
      }
    }
  }
  throw new Error(`no market pair found for object address ${marketObjectAddress}`)
}

export const getPairFromVaultCollectionAddress = (
  vaultCollectionObjectAddress: string,
  config: MirageConfig,
): { collateralAsset: MoveAsset; borrow: MoveToken } => {
  let usedAddr = vaultCollectionObjectAddress
  while (usedAddr.length < 66) {
    usedAddr = usedAddr.replace('0x', '0x0')
  }
  for (const collateralAsset in config.vaults) {
    for (const borrow in config.vaults[collateralAsset]) {
      if (config.vaults[collateralAsset][borrow] === usedAddr) {
        return {
          collateralAsset: getMoveAssetFromSymbol(collateralAsset) as MoveAsset,
          borrow: getMoveAssetFromSymbol(borrow) as MoveToken,
        }
      }
    }
  }
  throw new Error(`no vault pair found for object address ${vaultCollectionObjectAddress}`)
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
  DOGEPERP = 'DOGEPERP',
  AVAXPERP = 'AVAXPERP',
  PYTHPERP = 'PYTHPERP',
  STXPERP = 'STXPERP',
  WIFPERP = 'WIFPERP',
  MKRPERP = 'MKRPERP',
  MNTPERP = 'MNTPERP',
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
  readonly type: string
}

/**
 * Info for a move asset
 */
export type MoveAssetInfo = AssetInfo & {
  readonly decimals: number
  readonly address: AccountAddress
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
export const assetInfo = (asset: MoveAsset | Perpetual | string, config: MirageConfig): AssetInfo => {
  if (typeof asset === 'string') {
    return mirageAssetList(config)[MoveToken[asset] || Perpetual[asset] || MoveCoin[asset]]
  }
  return mirageAssetList(config)[asset]
}

/**
 * Get info about a specific asset
 * @param coin the MoveToken to get info for
 * @returns the MoveAssetInfo for the specific coin or token
 */
export const moveAssetInfo = (coin: MoveAsset | string, config: MirageConfig): MoveAssetInfo => {
  if (typeof coin === 'string') {
    return mirageAssetList(config)[MoveToken[coin]] ?? mirageAssetList(config)[MoveCoin[coin]]
  }
  return mirageAssetList(config)[coin]
}

/**
 * Get the balance of a coin in a Ui friendly format
 * @param balance the balance to convert
 * @param coin the coin
 * @returns a human-readable balance value
 */
export const assetBalanceToDecimal = (
  balance: BigNumber,
  coin: MoveToken | string,
  config: MirageConfig,
): BigNumber => {
  return balance.div(BigNumber(10).pow(moveAssetInfo(coin, config).decimals))
}

/**
 * Convert move token type to MoveToken
 * @param type the type of the perp
 * @returns a move token
 */
export const typeToMoveToken = (type: string, config: MirageConfig): MoveToken | undefined => {
  for (const asset in mirageAssetList(config)) {
    if (asset in MoveToken && mirageAssetList(config)[asset].type == type) {
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
export const typeToMoveCoin = (type: string, config: MirageConfig): MoveCoin | undefined => {
  for (const asset in mirageAssetList(config)) {
    if (asset in MoveCoin && mirageAssetList(config)[asset].type == type) {
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
export const typeToPerpetual = (type: string, config: MirageConfig): Perpetual | undefined => {
  for (const asset in mirageAssetList(config)) {
    if (asset in Perpetual && mirageAssetList(config)[asset].type == type) {
      return Perpetual[asset]
    }
  }
  return undefined
}

export const getCollectionIdForPerpPair = (marginToken: MoveToken, perp: Perpetual, config: MirageConfig): string => {
  if (!(Perpetual[perp] in config.markets[MoveToken[marginToken]])) throw new Error('Not a valid perp pair')
  return config.markets[MoveToken[marginToken]][Perpetual[perp]]
}

export const getCollectionIdForVaultPair = (
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  config: MirageConfig,
): string => {
  if (getTypeFromMoveAsset(collateralAsset) == 'MoveCoin') {
    if (!(MoveToken[borrowToken] in config.vaults[MoveCoin[collateralAsset]])) throw new Error('Not a valid vault pair')
    return config.vaults[MoveCoin[collateralAsset]][MoveToken[borrowToken]]
  } else if (getTypeFromMoveAsset(collateralAsset) == 'MoveToken') {
    if (!(MoveToken[borrowToken] in config.vaults[MoveToken[collateralAsset]]))
      throw new Error('Not a valid vault pair')
    return config.vaults[MoveToken[collateralAsset]][MoveToken[borrowToken]]
  }
  throw new Error('Not a valid vault pair')
}

export const getAssetTokenMetadata = (asset: MoveAsset, config: MirageConfig): string => {
  if (getTypeFromMoveAsset(asset) == 'MoveCoin') {
    if (!(MoveCoin[asset] in config.tokens)) throw new Error('token metadata not found')
    return config.tokens[MoveCoin[asset]]
  } else if (getTypeFromMoveAsset(asset) == 'MoveToken') {
    if (!(MoveToken[asset] in config.tokens)) throw new Error('token metadata not found')
    return config.tokens[MoveToken[asset]]
  }
  throw new Error('token metadata not found')
}

// A list of all coins and their info in the Mirage ecosystem
export const mirageAssetList = (
  config: MirageConfig,
): { readonly [coin in MoveAsset | Perpetual]: AssetInfo | MoveAssetInfo } => {
  return {
    [MoveCoin.APT]: {
      name: 'Aptos Coin',
      symbol: 'APT',
      decimals: 8,
      address: AccountAddress.ONE,
      type: '0x1::aptos_coin::AptosCoin',
    },
    [MoveToken.MIRA]: {
      name: 'Mirage Coin',
      symbol: 'MIRA',
      decimals: 8,
      address: mirageAddress(config),
      type: `${mirageAddress(config)}::mirage::Mirage`,
    },
    [MoveToken.mUSD]: {
      name: 'Mirage USD',
      symbol: 'mUSD',
      decimals: 8,
      address: mirageAddress(config),
      type: `${mirageAddress(config)}::mirage::MUSD`,
    },
    [MoveToken.mAPT]: {
      name: 'Mirage Aptos',
      symbol: 'mAPT',
      decimals: 8,
      address: mirageAddress(config),
      type: `${mirageAddress(config)}::mirage::MAPT`,
    },
    [MoveToken.mETH]: {
      name: 'Mirage Ethereum',
      symbol: 'mETH',
      decimals: 8,
      address: mirageAddress(config),
      type: `${mirageAddress(config)}::mirage::METH`,
    },
    [MoveCoin.zUSDC]: {
      name: 'Layer-Zero USDC',
      symbol: 'zUSDC',
      decimals: 6,
      address: getModuleAddress('layer_zero', config),
      type: `${getModuleAddress('layer_zero', config)}::asset::USDC`,
    },
    [MoveToken.tUSDC]: {
      name: 'Testnet USDC',
      symbol: 'tUSDC',
      decimals: 8,
      address: getModuleAddress('mirage', config),
      type: `${getModuleAddress('mirage', config)}::devUSDC::DevUSDC`,
    },
    [MoveToken.APT_MUSD_LP]: {
      name: 'APT-MUSD LP Coin',
      symbol: 'musd-lp',
      decimals: 8,
      // TODO FIX WITH MIRAGE SWAP
      address: getModuleAddress('mirage', config),
      type: `${getModuleAddress('mirage', config)}::devUSDC::DevUSDC`,
    },
    [Perpetual.APTPERP]: {
      name: 'Aptos Perpetuals Market',
      symbol: 'APT',
      type: `${mirageAddress(config)}::market_types::APTPERP`,
    },
    [Perpetual.ARBPERP]: {
      name: 'Arbitrum Perpetuals Market',
      symbol: 'ARB',
      type: `${mirageAddress(config)}::market_types::ARBPERP`,
    },
    [Perpetual.BTCPERP]: {
      name: 'Bitcoin Perpetuals Market',
      symbol: 'BTC',
      type: `${mirageAddress(config)}::market_types::BTCPERP`,
    },
    [Perpetual.ETHPERP]: {
      name: 'Ethereum Perpetuals Market',
      symbol: 'ETH',
      type: `${mirageAddress(config)}::market_types::ETHPERP`,
    },
    [Perpetual.OPPERP]: {
      name: 'Optimism Perpetuals Market',
      symbol: 'OP',
      type: `${mirageAddress(config)}::market_types::OPPERP`,
    },
    [Perpetual.PEPE1000PERP]: {
      name: '1000 Pepe Perpetuals Market',
      symbol: '1000PEPE',
      type: `${mirageAddress(config)}::market_types::PEPE1000PERP`,
    },
    [Perpetual.SOLPERP]: {
      name: 'Solana Perpetuals Market',
      symbol: 'SOL',
      type: `${mirageAddress(config)}::market_types::SOLPERP`,
    },
    [Perpetual.SUIPERP]: {
      name: 'Sui Perpetuals Market',
      symbol: 'SUI',
      type: `${mirageAddress(config)}::market_types::SUIPERP`,
    },
    [Perpetual.DOGEPERP]: {
      name: 'Doge Perpetuals Market',
      symbol: 'DOGE',
      type: `${mirageAddress(config)}::market_types::DOGEPERP`,
    },
    [Perpetual.AVAXPERP]: {
      name: 'Avax Perpetuals Market',
      symbol: 'AVAX',
      type: `${mirageAddress(config)}::market_types::AVAXPERP`,
    },
    [Perpetual.PYTHPERP]: {
      name: 'Pyth Perpetuals Market',
      symbol: 'PYTH',
      type: `${mirageAddress(config)}::market_types::PYTHPERP`,
    },
    [Perpetual.STXPERP]: {
      name: 'Stacks Perpetuals Market',
      symbol: 'STX',
      type: `${mirageAddress(config)}::market_types::STXPERP`,
    },
    [Perpetual.WIFPERP]: {
      name: 'Stacks Perpetuals Market',
      symbol: 'WIF',
      type: `${mirageAddress(config)}::market_types::WIFPERP`,
    },
    [Perpetual.MKRPERP]: {
      name: 'Maker Perpetuals Market',
      symbol: 'MKR',
      type: `${mirageAddress(config)}::market_types::MKRPERP`,
    },
    [Perpetual.MNTPERP]: {
      name: 'Mantle Perpetuals Market',
      symbol: 'MNT',
      type: `${mirageAddress(config)}::market_types::MNTPERP`,
    },
    [Perpetual.XAGPERP]: {
      name: 'Silver Perpetuals Market',
      symbol: 'XAG',
      type: `${mirageAddress(config)}::market_types::XAGPERP`,
    },
    [Perpetual.XAUPERP]: {
      name: 'Gold Perpetuals Market',
      symbol: 'XAU',
      type: `${mirageAddress(config)}::market_types::XAUPERP`,
    },
    [Perpetual.EURPERP]: {
      name: 'Euro Perpetuals Market',
      symbol: 'EUR',
      type: `${mirageAddress(config)}::market_types::EURPERP`,
    },
    [Perpetual.GBPPERP]: {
      name: 'British Pound Perpetuals Market',
      symbol: 'GBP',
      type: `${mirageAddress(config)}::market_types::GBPPERP`,
    },
    [Perpetual.JPYPERP]: {
      name: 'Japanese Yen Perpetuals Market',
      symbol: 'JPY',
      type: `${mirageAddress(config)}::market_types::JPYPERP`,
    },
  }
}
