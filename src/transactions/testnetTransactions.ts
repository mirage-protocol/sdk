import {
  MoveVector,
  U8,
  AccountAddress,
  TransactionPayloadEntryFunction,
  Identifier,
  ModuleId,
  EntryFunction,
} from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../utils'

/**
 * Claims testnet airdrop (creates vault if first claim, always deposits tusdc and borrows musd)
 * @returns payload for the transaction
 */
export const createClaimAirdropPayload = (
  tUSDCVaa: MoveVector<U8>,
  mUSDVaa: MoveVector<U8>,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  // const collateralFeed = this.config.getVaultCollateralPriceFeedId('tUSDC', 'mUSD')
  // const borrowFeed = this.config.getVaultBorrowPriceFeedId('tUSDC', 'mUSD')
  // const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, this.network) : []
  // const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, this.network) : []
  const moduleId = new ModuleId(
    getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress),
    new Identifier('testnet_airdropper'),
  )
  const functionName = new Identifier('claim_airdrop')
  const typeArguments = []

  const functionArguments = [tUSDCVaa, mUSDVaa]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}
