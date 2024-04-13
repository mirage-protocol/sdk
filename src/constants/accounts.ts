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
    address: new HexString('0xd6a262378c0e76b931433d85f4fa02a1529ac1fd16dd47ce0717fab7adb9f798'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0x18ff04b8da539e86e56fa8f9afa70269c08b09580d24e95582459b9c9b53a440'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0xa7e37f348dbba9e58ea8a2809c522136a2f44adfd9fefe7c8289a694c19ff0b3'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0xca2b80226d7344ec05702434808a4a42a069bc1f7b2bae397f7e1febb661140c'),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0xda061dab5e2ed4e62233f60ef1a29aa9d50960f4dec7fcfd3e6eaf00fe36a905'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
