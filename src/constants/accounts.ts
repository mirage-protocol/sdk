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
    address: new HexString('0x09ae41b4a8833992871f18d1b9e64e2e8f593797974e1aa03b6c33d1d0cad717'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0x7d13cdb84c3a7456139b9110abb4d3b7ef13a3c21b05eebfcfd98c446ccdc8c6'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0x12db8a5056842482a46c166fe3aa26e3eb679fa0b670e955f32ec8dc858d7436'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0x11fcea24a88c3f8e0dd266232fdcb0b243e7e852a7b4e3cc84c7ac4a61a98793'),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0x24b092110d32211e64371497e8b5d8ee098b85737b7938b0f03578ba9ccb6cab'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
