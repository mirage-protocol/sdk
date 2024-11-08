import { AccountAddress, createResourceAddress, Network } from '@aptos-labs/ts-sdk'

import mirageConfigMainnet from '../../mirage_config_mainnet.json'
import mirageConfigMovementTestnet from '../../mirage_config_movement_testnet.json'
import mirageConfigTestnet from '../../mirage_config_testnet.json'
import { getDeployerAddress } from './network'

/**
 * Move modules that Mirage Protocol utilizes
 */
export enum MirageModules {
  Mirage,
  MirageScripts,
  KeeperScripts,
  MirageCore,
  MirageOracle,
  Market,
  LayerZero, // "asset",
}

/**
 * The address of Mirage Protocol
 */
export const mirageAddress = (network: Network): AccountAddress => {
  return getModuleAddress(MirageModules.Mirage, network)
}

export type MarketsConfig = {
  [market: string]: {
    [pair: string]: string
  }
}

export type VaultsConfig = {
  [token: string]: {
    [denomination: string]: string
  }
}

export type TokensConfig = {
  [token: string]: string
}

export type MirageConfig = {
  markets: MarketsConfig
  vaults: VaultsConfig
  tokens: TokensConfig
}

export const mirageConfigFromNetwork = (network: Network): MirageConfig => {
  switch (network) {
    case Network.MAINNET:
      return mirageConfigMainnet
    case Network.CUSTOM:
      return mirageConfigMovementTestnet
    default:
      return mirageConfigTestnet
  }
}

const createModuleAddress = (seed: string, network: Network): AccountAddress => {
  const deployer_address = getDeployerAddress(network)
  return createResourceAddress(deployer_address, seed)
}

export const getModuleAddress = (module: MirageModules, network: Network): AccountAddress => {
  return modulesList(network)[module].address
}

export type ModuleInfo = {
  address: AccountAddress
}

export const modulesList = (network: Network): { readonly [module in MirageModules]: ModuleInfo } => {
  return {
    [MirageModules.Mirage]: {
      // NOTE: devUSDC is the same as mirage
      address: createModuleAddress('MIRAGE', network),
    },
    [MirageModules.MirageScripts]: {
      address: createModuleAddress('MIRAGE_SCRIPTS', network),
    },
    [MirageModules.KeeperScripts]: {
      address: createModuleAddress('KEEPER_SCRIPTS', network),
    },
    [MirageModules.MirageCore]: {
      address: createModuleAddress('MIRAGE_CORE', network),
    },
    [MirageModules.MirageOracle]: {
      address: createModuleAddress('MIRAGE_ORACLE', network),
    },
    [MirageModules.Market]: {
      address: createModuleAddress('MARKET', network),
    },
    [MirageModules.LayerZero]: {
      address: AccountAddress.from('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
    },
  }
}
