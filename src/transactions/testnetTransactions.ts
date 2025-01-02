import { AccountAddress, InputEntryFunctionData } from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../utils'

/**
 * Claims testnet airdrop (creates vault if first claim, always deposits tusdc and borrows musd)
 * @returns payload for the transaction
 */
export const createClaimAirdropPayload = (
  tUSDCVaas: number[],
  mUSDVaas: number[],
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  // const collateralFeed = this.config.getVaultCollateralPriceFeedId('tUSDC', 'mUSD')
  // const borrowFeed = this.config.getVaultBorrowPriceFeedId('tUSDC', 'mUSD')
  // const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, this.network) : []
  // const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, this.network) : []
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::testnet_airdropper::claim_airdrop`,
    functionArguments: [tUSDCVaas, mUSDVaas],
    typeArguments: [],
  }
}
