import { AccountAddress, createResourceAddress } from '@aptos-labs/ts-sdk'

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
export const getModuleAddress = (module: MoveModules | string, deployerAddress: AccountAddress): AccountAddress => {
  return MODULES(deployerAddress)[module as MoveModules].address
}

// Relevant modules
export const MODULES = (deployerAddress: AccountAddress): { readonly [module in MoveModules]: Account } => {
  return {
    [MoveModules.MIRAGE]: {
      address: createResourceAddress(deployerAddress, 'MIRAGE'),
      name: 'mirage',
    },
    [MoveModules.MIRAGE_SCRIPTS]: {
      address: createResourceAddress(deployerAddress, 'MIRAGE_SCRIPTS'),
      name: 'mirage_scripts',
    },
    [MoveModules.KEEPER_SCRIPTS]: {
      address: createResourceAddress(deployerAddress, 'MIRAGE_KEEPER_SCRIPTS'),
      name: 'keeper_scripts',
    },
    [MoveModules.MIRAGE_CORE]: {
      address: createResourceAddress(deployerAddress, 'MIRAGE_CORE'),
      name: 'mirage_core',
    },
    [MoveModules.MIRAGE_ORACLE]: {
      address: createResourceAddress(deployerAddress, 'MIRAGE_ORACLE'),
      name: 'mirage_oracle',
    },
    [MoveModules.MARKET]: {
      address: createResourceAddress(deployerAddress, 'MIRAGE_MARKET'),
      name: 'market',
    },
    [MoveModules.LAYER_ZERO]: {
      address: AccountAddress.from('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
      name: 'layer_zero',
    },
  }
}
