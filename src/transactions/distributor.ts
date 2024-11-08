import { InputEntryFunctionData, Network } from '@aptos-labs/ts-sdk'

import { getModuleAddress, getPriceFeed, getPriceFeedUpdateData, MirageModules, MoveFungibleAsset } from '../constants'

/**
 * Claims testnet airdrop (creates vault if first claim, always deposits tusdc and borrows musd)
 * @returns payload for the transaction
 */
export const claimAirdrop = async (network: Network): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(MoveFungibleAsset.tUSDC, network)
  const borrowFeed = getPriceFeed(MoveFungibleAsset.mUSD, network)
  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []
  return {
    function: `${getModuleAddress(MirageModules.MirageScripts, network)}::testnet_airdropper::claim_airdrop`,
    functionArguments: [collateralVaas, borrowVaas],
    typeArguments: [],
  }
}
