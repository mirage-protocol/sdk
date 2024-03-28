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
    address: new HexString('0x606585552c42e1b4631a624079edf52d2a4b4170d97f7645c0d4a6eb441e61a0'),
  },
  ['mirage_scripts']: {
    name: 'mirage_scripts',
    address: new HexString('0xf37f4287ece9bd26390f262861c0a88d0443705bac2ce0e9746d0ed9df078aa4'),
  },
  ['mirage_core']: {
    name: 'mirage_core',
    address: new HexString('0x4954771a9caccc69221c97e507d2b7eb9b399a5619110cb91cf73c0e0808e981'),
  },
  ['mirage_oracle']: {
    name: 'mirage_oracle',
    address: new HexString('0xda45afee0259cbc0f5dbd39978750ce4c22229d701bd3c7c4b84fd67608c1438  '),
  },
  ['mirage_swap']: {
    name: 'mirage_swap',
    address: new HexString('0x1b3733381e4e9ac598a703662b0ccfe37fad365d32eb06fda5052cf5b39356c1'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
}
