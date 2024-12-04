import { AccountAddress, Network } from '@aptos-labs/ts-sdk'

import mirageConfigMainnet from '../../mirage_config_mainnet.json'
import mirageConfigMovementTestnet from '../../mirage_config_movement_testnet.json'
import mirageConfigTestnet from '../../mirage_config_testnet.json'
import { getNetwork } from './network'

/**
 * An Aptos account
 */
export interface Account {
  readonly name: string
  address: AccountAddress // allow other modules to override module address
}

/**
 * Move modules that Mirage Protocol utilizes
 */
export enum MoveModules {
  MIRAGE = 'mirage',
  MIRAGE_SCRIPTS = 'mirage_scripts',
  KEEPER_SCRIPTS = 'keeper_scripts',
  MIRAGE_CORE = 'mirage_core',
  MIRAGE_ORACLE = 'mirage_oracle',
  MIRAGE_SWAP = 'mirage_swap',
  MARKET = 'market',
  LAYER_ZERO = 'layer_zero', // "asset",
  // swap
  // gov
  // deployer
}

/**
 * Get the address of a module
 * @param module the module to get the address of, can pass type or string
 * @returns the module address if it was found
 */
export const getModuleAddress = (module: MoveModules | string, config: MirageConfig): AccountAddress => {
  return MODULES(config)[module as MoveModules].address
}

/**
 * The account of Mirage Protocol
 */
export const mirageAccount = (config: MirageConfig): Account => {
  return MODULES(config)['mirage']
}
/**
 * The address of Mirage Protocol
 */
export const mirageAddress = (config: MirageConfig): AccountAddress => {
  return MODULES(config)['mirage'].address
}

export type ModulesConfig = {
  mirage: string
  mirage_core: string
  mirage_oracle: string
  mirage_scripts: string
  mirage_swap: string
  keeper_scripts: string
  market: string
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
  modules: ModulesConfig
  markets: MarketsConfig
  vaults: VaultsConfig
  tokens: TokensConfig
}

export const mirageConfigFromNetwork = (network: Network | string): MirageConfig => {
  const n = getNetwork(network)
  switch (n) {
    case Network.MAINNET:
      return mirageConfigMainnet
    case Network.CUSTOM:
      return mirageConfigMovementTestnet
    default:
      return mirageConfigTestnet
  }
}

// Relevant modules
// NOTE: devUSDC is the same as mirage
export const MODULES = (config: MirageConfig): { readonly [module in MoveModules]: Account } => {
  return {
    ['mirage']: {
      name: 'mirage',
      address: AccountAddress.from(config.modules.mirage),
    },
    ['mirage_scripts']: {
      name: 'mirage_scripts',
      address: AccountAddress.from(config.modules.mirage_scripts),
    },
    ['mirage_core']: {
      name: 'mirage_core',
      address: AccountAddress.from(config.modules.mirage_core),
    },
    ['mirage_oracle']: {
      name: 'mirage_oracle',
      address: AccountAddress.from(config.modules.mirage_oracle),
    },
    ['mirage_swap']: {
      name: 'mirage_swap',
      address: AccountAddress.from(config.modules.mirage_swap),
    },
    ['keeper_scripts']: {
      name: 'keeper_scripts',
      address: AccountAddress.from(config.modules.keeper_scripts),
    },
    ['market']: {
      name: 'market',
      address: AccountAddress.from(config.modules.market),
    },
    // TODO is this right for all networks
    ['layer_zero']: {
      name: 'asset',
      address: AccountAddress.from('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
    },
  }
}
