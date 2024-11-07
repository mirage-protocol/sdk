import { AccountAddress, createResourceAddress, Network } from '@aptos-labs/ts-sdk'

import mirageConfigMainnet from '../../mirage_config_mainnet.json'
import mirageConfigMovementTestnet from '../../mirage_config_movement_testnet.json'
import mirageConfigTestnet from '../../mirage_config_testnet.json'
import { getDeployerAddress } from './network'

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
  MIRAGE = 'MIRAGE',
  MIRAGE_SCRIPTS = 'MIRAGE_SCRIPTS',
  KEEPER_SCRIPTS = 'KEEPER_SCRIPTS',
  MIRAGE_CORE = 'MIRAGE_CORE',
  MIRAGE_ORACLE = 'MIRAGE_ORACLE',
  MARKET = 'MARKET',
  LAYER_ZERO = 'LAYER_ZERO', // "asset",
  // swap
  // gov
  // deployer
}

/**
 * The address of Mirage Protocol
 */
export const mirageAddress = (network: Network): AccountAddress => {
  return getModuleAddress(network, MoveModules.MIRAGE)
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

// Relevant modules
// NOTE: devUSDC is the same as mirage
export const getModuleAddress = (network: Network, module: MoveModules): AccountAddress => {
  if (module == MoveModules.LAYER_ZERO) {
    // TODO: check mainnet/movement deployment address
    return AccountAddress.from('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa')
  }
  const deployer_address = getDeployerAddress(network)
  return createResourceAddress(deployer_address, module)
}
