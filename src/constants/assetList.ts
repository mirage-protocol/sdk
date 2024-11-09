import { AccountAddress, createObjectAddress, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, mirageConfigFromNetwork, MirageModules } from './accounts'
import { getDeployerAddress } from './network'

export const getAllVaultCollectionObjectAddresses = (network: Network): string[] => {
  const vaultCollectionAddresses: string[] = []

  Object.values(mirageConfigFromNetwork(network).vaults).forEach((vault) => {
    Object.values(vault).forEach((address) => {
      vaultCollectionAddresses.push(address)
    })
  })

  return vaultCollectionAddresses
}

export const getAllMarketObjectAddresses = (network: Network): string[] => {
  const marketAddresses: string[] = []

  Object.values(mirageConfigFromNetwork(network).markets).forEach((market) => {
    Object.values(market).forEach((address) => {
      marketAddresses.push(address)
    })
  })

  return marketAddresses
}

export const getPairFromMarketAddress = (
  marketObjectAddress: AccountAddress,
  network: Network,
): { marginToken: MoveFungibleAsset; perp: Perpetual } => {
  const mirageConfig = mirageConfigFromNetwork(network)
  for (const marginToken of Object.keys(mirageConfig.markets)) {
    for (const perp of Object.keys(mirageConfig.markets[marginToken])) {
      if (AccountAddress.from(mirageConfig.markets[marginToken][perp]).equals(marketObjectAddress)) {
        if (isMoveFungibleAsset(marginToken) && isPerpetual(perp)) {
          return {
            marginToken: MoveFungibleAsset[marginToken as keyof typeof MoveFungibleAsset],
            perp: Perpetual[perp as keyof typeof Perpetual]
          }
        }
      }
    }
  }
  throw new Error(`no market pair found for object address ${marketObjectAddress}`)
}

export const getPairFromVaultCollectionAddress = (
  vaultObjectAddress: AccountAddress,
  network: Network,
): { collateralAsset: MoveAsset; borrow: MoveFungibleAsset } => {
  const mirageConfig = mirageConfigFromNetwork(network)
  for (const collateralAsset of Object.keys(mirageConfig.vaults)) {
    for (const borrow of Object.keys(mirageConfig.vaults[collateralAsset])) {
      if (AccountAddress.from(mirageConfig.vaults[collateralAsset][borrow]).equals(vaultObjectAddress)) {
        if (isMoveFungibleAsset(borrow)) {
          return {
            collateralAsset: isMoveAsset(collateralAsset) 
              ? (MoveCoin[collateralAsset as keyof typeof MoveCoin] || MoveFungibleAsset[collateralAsset as keyof typeof MoveFungibleAsset])
              : MoveFungibleAsset.mUSD, // Default fallback
            borrow: MoveFungibleAsset[borrow as keyof typeof MoveFungibleAsset]
          }
        }
      }
    }
  }
  throw new Error(`no vault pair found for object address ${vaultObjectAddress}`)
}

/**
 * All Tokens relevant to the mirage-protocol ecosystem
 */
export enum MoveFungibleAsset {
  mUSD = 'mUSD', // mirage stablecoin
  tUSDC = 'tUSDC', // testnet USDC
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

// Type guards
export const isMoveFungibleAsset = (value: string): value is keyof typeof MoveFungibleAsset => {
  return value in MoveFungibleAsset
}

export const isMoveCoin = (value: string): value is keyof typeof MoveCoin => {
  return value in MoveCoin
}

export const isPerpetual = (value: string): value is keyof typeof Perpetual => {
  return value in Perpetual
}

export const isMoveAsset = (value: string): value is keyof typeof MoveCoin | keyof typeof MoveFungibleAsset => {
  return isMoveCoin(value) || isMoveFungibleAsset(value)
}

/**
 * All synthetic mirage assets
 */
export const MIRAGE_ASSETS: readonly MoveFungibleAsset[] = [MoveFungibleAsset.mUSD]

export type CoinInfo = {
  readonly name: string
  readonly symbol: string
  readonly decimals: number
  readonly type: `${string}::${string}::${string}`
}

export type FungibleAssetInfo = {
  readonly name: string
  readonly symbol: string
  readonly decimals: number
  readonly address: AccountAddress
}

export type PerpetualsInfo = {
  readonly name: string
  readonly symbol: string
  readonly address: AccountAddress
  readonly marginToken: MoveFungibleAsset
}

export type MoveAsset = MoveCoin | MoveFungibleAsset

export const getCoinType = (coin: MoveCoin, network: Network): `${string}::${string}::${string}` => {
  return coinList(network)[coin].type
}

export const getAssetName = (asset: MoveAsset | Perpetual, network: Network): string => {
  return assetList(network)[asset].name
}

export const getAssetSymbol = (asset: MoveAsset | Perpetual, network: Network): string => {
  return assetList(network)[asset].symbol
}

export const getMoveAssetFromSymbol = (symbol: string, network: Network): MoveAsset | undefined => {
  const assets = assetList(network)
  const found = Object.entries(assets).find(([_, value]) => value.symbol === symbol)
  if (!found) return undefined
  
  const [key] = found
  if (isMoveAsset(key)) {
    return key as MoveAsset
  }
  return undefined
}

export const getAssetDecimals = (asset: MoveAsset | Perpetual, network: Network): number => {
  if (asset in Perpetual) {
    return 8
  } else if (asset in MoveCoin) {
    return coinList(network)[asset].decimals
  } else {
    return fungibleAssetList(network)[asset].decimals
  }
}

/**

/**
 * Get the balance of a coin in a Ui friendly format
 * @param balance the balance to convert
 * @param coin the coin
 * @returns a human-readable balance value
 */
export const assetBalanceToDecimal = (
  balance: BigNumber,
  asset: MoveCoin | MoveFungibleAsset,
  network: Network,
): BigNumber => {
  return balance.div(BigNumber(10).pow(getAssetDecimals(asset, network)))
}

/**
 * Get the market address for a perpetual
 */
export const getMarketAddress = (perp: Perpetual, network: Network): AccountAddress => {
  if (!isPerpetual(perp)) {
    throw new Error(`Invalid perpetual: ${perp}`)
  }
  return perpetualList(network)[perp].address
}

/**
 * Get the collection ID for a vault pair
 */
export const getCollectionIdForVaultPair = (
  collateralAsset: MoveAsset,
  borrowToken: MoveFungibleAsset,
  network: Network,
): string => {
  const mirageConfig = mirageConfigFromNetwork(network)
  
  if (!isMoveAsset(collateralAsset)) {
    throw new Error(`Invalid collateral asset: ${collateralAsset}`)
  }
  
  if (!isMoveFungibleAsset(borrowToken)) {
    throw new Error(`Invalid borrow token: ${borrowToken}`)
  }
  
  if (!(collateralAsset in mirageConfig.vaults) || 
      !(borrowToken in mirageConfig.vaults[collateralAsset])) {
    throw new Error(`Invalid vault pair: ${collateralAsset}/${borrowToken}`)
  }
  
  return mirageConfig.vaults[collateralAsset][borrowToken]
}

/**
 * Get the fungible asset address for a given asset
 */
export const getFungibleAssetAddress = (
  asset: MoveFungibleAsset | string,
  network: Network
): AccountAddress => {
  if (!isMoveFungibleAsset(asset)) {
    throw new Error(`Invalid fungible asset: ${asset}`)
  }
  
  const assetList = fungibleAssetList(network)
  if (!(asset in assetList)) {
    throw new Error(`Fungible asset not found: ${asset}`)
  }
  
  return assetList[asset].address
}

/**
 * Get the perpetual market address
 */
export const getPerpMarketAddress = (
  perp: Perpetual | string,
  marginToken: MoveFungibleAsset,
  network: Network,
): AccountAddress => {
  if (!isPerpetual(perp)) {
    throw new Error(`Invalid perpetual: ${perp}`)
  }
  
  if (!isMoveFungibleAsset(marginToken)) {
    throw new Error(`Invalid margin token: ${marginToken}`)
  }
  
  const markets = perpetualList(network)
  if (!(perp in markets)) {
    throw new Error(`Market not found for perpetual: ${perp}`)
  }
  
  return markets[perp].address
}

export const coinList = (network: Network): { readonly [coin in MoveCoin]: CoinInfo } => {
  return {
    [MoveCoin.APT]: {
      name: 'Aptos Coin',
      symbol: 'APT',
      decimals: 8,
      type: '0x1::aptos_coin::AptosCoin',
    },
    [MoveCoin.zUSDC]: {
      name: 'Layer-Zero USDC',
      symbol: 'zUSDC',
      decimals: 6,
      type: `${getModuleAddress(MirageModules.LayerZero, network)}::asset::USDC`,
    },
  }
}

export const fungibleAssetList = (
  network: Network,
): { readonly [fungibleAsset in MoveFungibleAsset]: FungibleAssetInfo } => {
  const config = mirageConfigFromNetwork(network)
  const deployAddress = getDeployerAddress(network)

  return {
    [MoveFungibleAsset.mUSD]: {
      name: 'Mirage USD',
      symbol: 'mUSD',
      decimals: 8,
      address: AccountAddress.from(config.tokens['mUSD']),
    },
    [MoveFungibleAsset.tUSDC]: {
      name: 'Testnet USDC',
      symbol: 'tUSDC',
      decimals: 8,
      address: createObjectAddress(deployAddress, 'tUSDC'),
    },
  }
}

// A list of all coins and their info in the Mirage ecosystem
export const perpetualList = (network: Network): { readonly [perpetual in Perpetual]: PerpetualsInfo } => {
  const config = mirageConfigFromNetwork(network)
  return {
    [Perpetual.APTPERP]: {
      name: 'Aptos Perpetuals Market',
      symbol: 'APT',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.APTPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.ARBPERP]: {
      name: 'Arbitrum Perpetuals Market',
      symbol: 'ARB',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.ARBPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.BTCPERP]: {
      name: 'Bitcoin Perpetuals Market',
      symbol: 'BTC',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.BTCPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.ETHPERP]: {
      name: 'Ethereum Perpetuals Market',
      symbol: 'ETH',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.ETHPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.OPPERP]: {
      name: 'Optimism Perpetuals Market',
      symbol: 'OP',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.OPPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.PEPE1000PERP]: {
      name: '1000 Pepe Perpetuals Market',
      symbol: '1000PEPE',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.PEPE1000PERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.SOLPERP]: {
      name: 'Solana Perpetuals Market',
      symbol: 'SOL',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.SOLPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.SUIPERP]: {
      name: 'Sui Perpetuals Market',
      symbol: 'SUI',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.SUIPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.DOGEPERP]: {
      name: 'Doge Perpetuals Market',
      symbol: 'DOGE',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.DOGEPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.AVAXPERP]: {
      name: 'Avax Perpetuals Market',
      symbol: 'AVAX',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.AVAXPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.PYTHPERP]: {
      name: 'Pyth Perpetuals Market',
      symbol: 'PYTH',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.PYTHPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.STXPERP]: {
      name: 'Stacks Perpetuals Market',
      symbol: 'STX',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.STXPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.WIFPERP]: {
      name: 'Stacks Perpetuals Market',
      symbol: 'WIF',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.WIFPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.MKRPERP]: {
      name: 'Maker Perpetuals Market',
      symbol: 'MKR',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.MKRPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.MNTPERP]: {
      name: 'Mantle Perpetuals Market',
      symbol: 'MNT',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.MNTPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.XAGPERP]: {
      name: 'Silver Perpetuals Market',
      symbol: 'XAG',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.XAGPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.XAUPERP]: {
      name: 'Gold Perpetuals Market',
      symbol: 'XAU',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.XAUPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.EURPERP]: {
      name: 'Euro Perpetuals Market',
      symbol: 'EUR',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.EURPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.GBPPERP]: {
      name: 'British Pound Perpetuals Market',
      symbol: 'GBP',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.GBPPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
    [Perpetual.JPYPERP]: {
      name: 'Japanese Yen Perpetuals Market',
      symbol: 'JPY',
      address: AccountAddress.from(config.markets[MoveFungibleAsset.mUSD][Perpetual.JPYPERP]),
      marginToken: MoveFungibleAsset.mUSD,
    },
  }
}

export const assetList = (
  network: Network,
): { readonly [asset in Perpetual | MoveCoin]: PerpetualsInfo | CoinInfo | FungibleAssetInfo } => {
  return { ...perpetualList(network), ...coinList(network), ...fungibleAssetList(network) }
}
