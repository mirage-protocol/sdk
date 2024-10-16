import { AccountAddress, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, mirageAddress, mirageConfigFromNetwork } from './accounts'

export const getAllVaultCollectionObjectAddresses = (network: string | Network): string[] => {
  const vaultCollectionAddresses: string[] = []

  Object.values(mirageConfigFromNetwork(network).vaults).forEach((vault) => {
    Object.values(vault).forEach((address) => {
      vaultCollectionAddresses.push(address)
    })
  })

  return vaultCollectionAddresses
}

export const getAllMarketObjectAddresses = (network: string | Network): string[] => {
  const marketAddresses: string[] = []

  Object.values(mirageConfigFromNetwork(network).markets).forEach((market) => {
    Object.values(market).forEach((address) => {
      marketAddresses.push(address)
    })
  })

  return marketAddresses
}

export const getPairFromMarketAddress = (
  marketObjectAddress: string,
  network: string | Network,
): { marginToken: MoveToken; perp: Perpetual } => {
  let usedAddr = marketObjectAddress
  while (usedAddr.length < 66) {
    usedAddr = usedAddr.replace('0x', '0x0')
  }
  const mirageConfig = mirageConfigFromNetwork(network)
  for (const marginToken in mirageConfig.markets) {
    for (const perp in mirageConfig.markets[marginToken]) {
      if (mirageConfig.markets[marginToken][perp] === usedAddr) {
        // Assuming Perpetual is a more complex type, you might need to instantiate it or fetch it from somewhere
        return { marginToken: getMoveAssetFromSymbol(marginToken) as MoveToken, perp: checkPerpSymbolUnSafe(perp) }
      }
    }
  }
  throw new Error(`no market pair found for object address ${marketObjectAddress}`)
}

export const getPairFromVaultCollectionAddress = (
  vaultObjectAddress: string,
  network: string | Network,
): { collateralAsset: MoveAsset; borrow: MoveToken } => {
  let usedAddr = vaultObjectAddress
  while (usedAddr.length < 66) {
    usedAddr = usedAddr.replace('0x', '0x0')
  }
  const mirageConfig = mirageConfigFromNetwork(network)
  for (const collateralAsset in mirageConfig.vaults) {
    for (const borrow in mirageConfig.vaults[collateralAsset]) {
      if (mirageConfig.vaults[collateralAsset][borrow] === usedAddr) {
        return {
          collateralAsset: getMoveAssetFromSymbol(collateralAsset) as MoveAsset,
          borrow: getMoveAssetFromSymbol(borrow) as MoveToken,
        }
      }
    }
  }
  throw new Error(`no vault pair found for object address ${vaultObjectAddress}`)
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
export const assetInfo = (asset: MoveAsset | Perpetual | string, network: Network | string): AssetInfo => {
  if (typeof asset === 'string') {
    return mirageAssetList(network)[MoveToken[asset] || Perpetual[asset] || MoveCoin[asset]]
  }
  return mirageAssetList(network)[asset]
}

/**
 * Get info about a specific asset
 * @param coin the MoveToken to get info for
 * @returns the MoveAssetInfo for the specific coin or token
 */
export const moveAssetInfo = (coin: MoveAsset | string, network: Network | string): MoveAssetInfo => {
  if (typeof coin === 'string') {
    return mirageAssetList(network)[MoveToken[coin]] ?? mirageAssetList(network)[MoveCoin[coin]]
  }
  return mirageAssetList(network)[coin]
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
  network: Network | string,
): BigNumber => {
  return balance.div(BigNumber(10).pow(moveAssetInfo(coin, network).decimals))
}

/**
 * Convert move token type to MoveToken
 * @param type the type of the perp
 * @returns a move token
 */
export const typeToMoveToken = (type: string, network: Network | string): MoveToken | undefined => {
  for (const asset in mirageAssetList(network)) {
    if (asset in MoveToken && mirageAssetList(network)[asset].type == type) {
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
export const typeToMoveCoin = (type: string, network: Network | string): MoveCoin | undefined => {
  for (const asset in mirageAssetList(network)) {
    if (asset in MoveCoin && mirageAssetList(network)[asset].type == type) {
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
export const typeToPerpetual = (type: string, network: Network | string): Perpetual | undefined => {
  for (const asset in mirageAssetList(network)) {
    if (asset in Perpetual && mirageAssetList(network)[asset].type == type) {
      return Perpetual[asset]
    }
  }
  return undefined
}

export const getCollectionIdForPerpPair = (
  marginToken: MoveToken,
  perp: Perpetual,
  network: Network | string,
): string => {
  const mirageConfig = mirageConfigFromNetwork(network)
  if (!(Perpetual[perp] in mirageConfig.markets[MoveToken[marginToken]])) throw new Error('Not a valid perp pair')
  return mirageConfig.markets[MoveToken[marginToken]][Perpetual[perp]]
}

export const getCollectionIdForVaultPair = (
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  network: Network | string,
): string => {
  const mirageConfig = mirageConfigFromNetwork(network)
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

export const getAssetTokenMetadata = (asset: MoveAsset, network: Network | string): string => {
  const mirageConfig = mirageConfigFromNetwork(network)
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
const mirageAssetList = (
  network: string | Network,
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
      address: mirageAddress(network),
      type: `${mirageAddress(network)}::mirage::Mirage`,
    },
    [MoveToken.mUSD]: {
      name: 'Mirage USD',
      symbol: 'mUSD',
      decimals: 8,
      address: mirageAddress(network),
      type: `${mirageAddress(network)}::mirage::MUSD`,
    },
    [MoveToken.mAPT]: {
      name: 'Mirage Aptos',
      symbol: 'mAPT',
      decimals: 8,
      address: mirageAddress(network),
      type: `${mirageAddress(network)}::mirage::MAPT`,
    },
    [MoveToken.mETH]: {
      name: 'Mirage Ethereum',
      symbol: 'mETH',
      decimals: 8,
      address: mirageAddress(network),
      type: `${mirageAddress(network)}::mirage::METH`,
    },
    [MoveCoin.zUSDC]: {
      name: 'Layer-Zero USDC',
      symbol: 'zUSDC',
      decimals: 6,
      address: getModuleAddress('layer_zero', network),
      type: `${getModuleAddress('layer_zero', network)}::asset::USDC`,
    },
    [MoveToken.tUSDC]: {
      name: 'Testnet USDC',
      symbol: 'tUSDC',
      decimals: 8,
      address: getModuleAddress('mirage', network),
      type: `${getModuleAddress('mirage', network)}::devUSDC::DevUSDC`,
    },
    [MoveToken.APT_MUSD_LP]: {
      name: 'APT-MUSD LP Coin',
      symbol: 'musd-lp',
      decimals: 8,
      // TODO FIX WITH MIRAGE SWAP
      address: getModuleAddress('mirage', network),
      type: `${getModuleAddress('mirage', network)}::devUSDC::DevUSDC`,
    },
    [Perpetual.APTPERP]: {
      name: 'Aptos Perpetuals Market',
      symbol: 'APT',
      type: `${mirageAddress(network)}::market_types::APTPERP`,
    },
    [Perpetual.ARBPERP]: {
      name: 'Arbitrum Perpetuals Market',
      symbol: 'ARB',
      type: `${mirageAddress(network)}::market_types::ARBPERP`,
    },
    [Perpetual.BTCPERP]: {
      name: 'Bitcoin Perpetuals Market',
      symbol: 'BTC',
      type: `${mirageAddress(network)}::market_types::BTCPERP`,
    },
    [Perpetual.ETHPERP]: {
      name: 'Ethereum Perpetuals Market',
      symbol: 'ETH',
      type: `${mirageAddress(network)}::market_types::ETHPERP`,
    },
    [Perpetual.OPPERP]: {
      name: 'Optimism Perpetuals Market',
      symbol: 'OP',
      type: `${mirageAddress(network)}::market_types::OPPERP`,
    },
    [Perpetual.PEPE1000PERP]: {
      name: '1000 Pepe Perpetuals Market',
      symbol: '1000PEPE',
      type: `${mirageAddress(network)}::market_types::PEPE1000PERP`,
    },
    [Perpetual.SOLPERP]: {
      name: 'Solana Perpetuals Market',
      symbol: 'SOL',
      type: `${mirageAddress(network)}::market_types::SOLPERP`,
    },
    [Perpetual.SUIPERP]: {
      name: 'Sui Perpetuals Market',
      symbol: 'SUI',
      type: `${mirageAddress(network)}::market_types::SUIPERP`,
    },
    [Perpetual.DOGEPERP]: {
      name: 'Doge Perpetuals Market',
      symbol: 'DOGE',
      type: `${mirageAddress(network)}::market_types::DOGEPERP`,
    },
    [Perpetual.AVAXPERP]: {
      name: 'Avax Perpetuals Market',
      symbol: 'AVAX',
      type: `${mirageAddress(network)}::market_types::AVAXPERP`,
    },
    [Perpetual.PYTHPERP]: {
      name: 'Pyth Perpetuals Market',
      symbol: 'PYTH',
      type: `${mirageAddress(network)}::market_types::PYTHPERP`,
    },
    [Perpetual.STXPERP]: {
      name: 'Stacks Perpetuals Market',
      symbol: 'STX',
      type: `${mirageAddress(network)}::market_types::STXPERP`,
    },
    [Perpetual.WIFPERP]: {
      name: 'Stacks Perpetuals Market',
      symbol: 'WIF',
      type: `${mirageAddress(network)}::market_types::WIFPERP`,
    },
    [Perpetual.MKRPERP]: {
      name: 'Maker Perpetuals Market',
      symbol: 'MKR',
      type: `${mirageAddress(network)}::market_types::MKRPERP`,
    },
    [Perpetual.MNTPERP]: {
      name: 'Mantle Perpetuals Market',
      symbol: 'MNT',
      type: `${mirageAddress(network)}::market_types::MNTPERP`,
    },
    [Perpetual.XAGPERP]: {
      name: 'Silver Perpetuals Market',
      symbol: 'XAG',
      type: `${mirageAddress(network)}::market_types::XAGPERP`,
    },
    [Perpetual.XAUPERP]: {
      name: 'Gold Perpetuals Market',
      symbol: 'XAU',
      type: `${mirageAddress(network)}::market_types::XAUPERP`,
    },
    [Perpetual.EURPERP]: {
      name: 'Euro Perpetuals Market',
      symbol: 'EUR',
      type: `${mirageAddress(network)}::market_types::EURPERP`,
    },
    [Perpetual.GBPPERP]: {
      name: 'British Pound Perpetuals Market',
      symbol: 'GBP',
      type: `${mirageAddress(network)}::market_types::GBPPERP`,
    },
    [Perpetual.JPYPERP]: {
      name: 'Japanese Yen Perpetuals Market',
      symbol: 'JPY',
      type: `${mirageAddress(network)}::market_types::JPYPERP`,
    },
  }
}
