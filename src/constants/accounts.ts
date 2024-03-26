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
    address: new HexString('0xd64cdbdc3304aed5b57585cdce87167c2656e2baf2ab900470ddc2f1b92d720e'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0x6cb9c3343a3f9bef844dfda6eff70124d62898a0a36b4694a0fcfca89551de74'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0x7b098e75e58b75892f550452543d6631e5472cae48e9f98cd3374823b328b0c1'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0xc2f8ace5c3ec5c1f765061cf74a3adce6bbe226b551b5ef45143d04c8d5e0c70'),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0xd4f485abdcaf0f51a6f44360cbf1031ba33af1d4fa75e68ab84b335ac4a6fdff'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
