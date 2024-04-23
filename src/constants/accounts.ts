import { HexString, Types } from 'aptos'
import mirageConfig from '../../mirage_config.json'

/**
 * An Aptos account
 */
export interface Account {
  readonly name: string
  address: HexString // allow other modules to override module address
}

/**
 * Represents one resource of an account
 */
export type AccountResource = Types.MoveResource

/**
 * Move modules that Mirage Protocol utilizes
 */
export enum MoveModules {
  MIRAGE = 'mirage',
  MIRAGE_SCRIPTS = 'mirage_scripts',
  MIRAGE_CORE = 'mirage_core',
  MIRAGE_ORACLE = 'mirage_oracle',
  MIRAGE_SWAP = 'mirage_swap',
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
export const getModuleAddress = (module: MoveModules | string): HexString => {
  return MODULES[module as MoveModules].address
}

/**
 * The account of Mirage Protocol
 */
export const mirageAccount = (): Account => {
  return MODULES['mirage']
}

/**
 * The address of Mirage Protocol
 */
export const mirageAddress = (): HexString => {
  return MODULES['mirage'].address
}

// Relevant modules
// NOTE: devUSDC is the same as mirage
export const MODULES: { readonly [module in MoveModules]: Account } = {
  ['mirage']: {
    name: 'mirage',
    address: new HexString(mirageConfig.modules.mirage),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString(mirageConfig.modules.mirage_scripts),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString(mirageConfig.modules.mirage_core),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString(mirageConfig.modules.mirage_oracle),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString(mirageConfig.modules.mirage_swap),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
