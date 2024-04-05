import { HexString, Types } from 'aptos'

/**
 * An Aptos account
 */
export interface Account {
  readonly name: string
  readonly address: HexString
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
    address: new HexString('0x5863671249399808a2b029a9cfdc59ef82f4545874c2f14fdc4c44055b8cb49c'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0xe894629192db1045cf74fa3615ff152b5dc12cf50232e29b34ee1180b017e0a1'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0x3b16e174b5261ae94f7813e70f08e5198987851ec45e3af2e81b7efa296bf34c  '),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0x4b929705cc031e0d51253223dc18aa9e265c875ccc37e07f799c048197b8cb51  '),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0x79bc479b285932c6487242df6a184ba2ffa2d8cd07208ac83c401a582b180cb0'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
