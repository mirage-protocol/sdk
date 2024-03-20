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
const MODULES: { readonly [module in MoveModules]: Account } = {
  ['mirage']: {
    name: 'mirage',
    address: new HexString('0x62c3fa6e1fb661f39aebc1270f3a3de46c719481dd6c6cafdf10b7e61dcc77f8'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0x1243645ffb02c09d70e9c658f2dcd34ce0b6518df62a67811cae205036f85309'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0x644bd0c30eb9fe5cd66cb47051919b5ac9cde1f7476511fcdb8ced222525a3fa'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0xaab0d32c2942693c76f7e22960a23381b5df3495c5ce3c6d366c59fd564b5979'),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0xe0eac9825daaa5bba07c58b5b31e347f1bc1efdb93c8bb270cbee0bd348d1863'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
