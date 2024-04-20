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
    address: new HexString('0x6f6e1ccbf643631dea2952a3c3a902510fba0ae780ba5c40d7474e27d7c3ea16'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0x9f01f48af725dc39ec52805339054d201c53b4e15bc80c1646820b2ed6b365bf'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0x7a88c74e830c3df48fde968747e000c3f80384f7d085a8b675a56fda8b887b00'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0xfacf77e9a1b24c0022dd7a009426ebf3ab469a23f583decdb6f887788edc1fcd'),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0xc11c3f0bc24ed2122765fd0c7719e646e72992726e0acb588091308a4ff43b02'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
