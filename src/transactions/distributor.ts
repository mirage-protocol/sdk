import { InputEntryFunctionData, Network } from '@aptos-labs/ts-sdk'

import { getPriceFeed, getPriceFeedUpdateData, MODULES, MoveToken } from '../constants'

/**
 * Claims testnet airdrop (creates vault if first claim, always deposits tusdc and borrows musd)
 * @returns payload for the transaction
 */
export const claimAirdrop = async (): Promise<InputEntryFunctionData> => {
  const collateralFeed = getPriceFeed(MoveToken.tUSDC, Network.TESTNET)
  const borrowFeed = getPriceFeed(MoveToken.mUSD, Network.TESTNET)
  const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, Network.TESTNET) : []
  const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, Network.TESTNET) : []
  return {
    function: `${MODULES.mirage_scripts.address}::testnet_airdropper::claim_airdrop`,
    functionArguments: [collateralVaas, borrowVaas],
    typeArguments: [],
  }
}
