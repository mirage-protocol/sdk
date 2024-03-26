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
    address: new HexString('0x6ae3bc6f557bdc446c4bfe6c01acea25a421f537d743d6ff1a973c8d583ffbfa'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0xcb9cc41f53315177a3b394ddb038ba103ce38798ee1037e45e908e7ba9697e75'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0xaa3eea360effc610f7208dea3de8b89aa3cf6b71faecaad06b764bc1aa7d8920'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0xb80398e811fc6a6a7b4f0834549c755bfdc530b170629a37fc51d5198c237c60  '),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0x34b7194c06c6d7f92ff24cf0a31785f89f979c2d476debcfeff1db9cbd1d7dcb'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
