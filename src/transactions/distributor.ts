import { InputEntryFunctionData, Network } from '@aptos-labs/ts-sdk'

import { getPriceFeed, getPriceFeedUpdateData, MODULES, MoveToken } from '../constants'

/**
 * Claims testnet airdrop (creates vault if first claim, always deposits tusdc and borrows musd)
 * @returns payload for the transaction
 */
export const claimAirdrop = async (network: Network | string): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(MoveToken.tUSDC, network)
  const borrowFeed = getPriceFeed(MoveToken.mUSD, network)
  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, network) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, network) : []
  return {
    function: `${MODULES(network).mirage_scripts.address}::testnet_airdropper::claim_airdrop`,
    functionArguments: [collateralVaas, borrowVaas],
    typeArguments: [],
  }
}
