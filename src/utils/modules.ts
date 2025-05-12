import { AccountAddress, createResourceAddress } from '@aptos-labs/ts-sdk'

/**
 * Move modules that Mirage Protocol utilizes
 */
export enum MoveModules {
  MIRAGE = 'mirage',
  MIRAGE_SCRIPTS = 'mirage_scripts',
  KEEPER_SCRIPTS = 'keeper_scripts',
  MIRAGE_CORE = 'mirage_core',
  MIRAGE_ORACLE = 'mirage_oracle',
  MARKET = 'market',
  // swap
  // gov
  // deployer
}

/**
 * Get the address of a module
 * @param module the module to get the address of, can pass type or string
 * @returns the module address if it was found
 */
export const getModuleAddress = (module: MoveModules | string, deployerAddress: AccountAddress): AccountAddress => {
  switch (module) {
    case MoveModules.MIRAGE:
      return createResourceAddress(deployerAddress, 'MIRAGE')
    case MoveModules.MIRAGE_SCRIPTS:
      return createResourceAddress(deployerAddress, 'MIRAGE_SCRIPTS')
    case MoveModules.KEEPER_SCRIPTS:
      return createResourceAddress(deployerAddress, 'MIRAGE_KEEPER_SCRIPTS')
    case MoveModules.MIRAGE_CORE:
      return createResourceAddress(deployerAddress, 'MIRAGE_CORE')
    case MoveModules.MIRAGE_ORACLE:
      return createResourceAddress(deployerAddress, 'MIRAGE_ORACLE')
    case MoveModules.MARKET:
      return createResourceAddress(deployerAddress, 'MIRAGE_MARKET')
    default:
      throw new Error('unrecognized module')
  }
}
