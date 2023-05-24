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
  MIRAGE_LP = 'mirage_lp',
  DEV_USDC = 'dev_usdc', // "devnet_coins",
  LAYER_ZERO = 'layer_zero', // "asset",
  PANCAKE = 'pancake', // "router"
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
const MODULES: { readonly [module in MoveModules]: Account } = {
  ['mirage']: {
    name: 'mirage',
    address: new HexString('0xb7c31720ccd11d81195684c5c7f1001c6870fe5646d365e06a8fcaaa8aab5a2f'),
  },
  ['mirage_lp']: {
    name: 'mirage_lp',
    address: new HexString('0xf12f80a44c52384fe514a558d6554a3125735a186ddcb5625c93853ca865f21c'),
  },
  ['dev_usdc']: {
    name: 'devnet_coins',
    address: new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68'),
  },
  ['layer_zero']: {
    name: 'asset',
    address: new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa'),
  },
  ['pancake']: {
    name: 'router',
    address: new HexString('c7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa'),
  },
}
