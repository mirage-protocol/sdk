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
    address: new HexString('0xc82629078e8256abb72d2e3561a9e0b17c812f64ec222d5cf5bda68675f9ade2'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0x077895f892f1f192e7d9aaa40bd39a373cf83cd693a2d65382672e5711f91f22'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0x7d935c35a1756550fe8ea06ac06a243f58655ee5e1d127dae6e4018f9732d58e'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0x0c0801df42f5999f643b6cbb4c874430c53822d57a3f97aa571d9fe1e072652d'),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0xd3590267e3428d5ee14c01a4475a9028725a711cc91c1b9482d40f1c7f9ccb9d'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
