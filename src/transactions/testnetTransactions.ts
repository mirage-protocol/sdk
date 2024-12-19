import { InputEntryFunctionData } from '@aptos-labs/ts-sdk'

import { getModuleAddress, getPriceFeed, getPriceFeedUpdateData, MoveModules, MoveToken } from '../constants'
import { BaseTransactions } from './baseTransactions'

export class TestnetTransactions extends BaseTransactions {
  /**
   * Claims testnet airdrop (creates vault if first claim, always deposits tusdc and borrows musd)
   * @returns payload for the transaction
   */
  async claimAirdrop(): Promise<InputEntryFunctionData> {
    const collateralFeed = getPriceFeed(MoveToken.tUSDC, this.network)
    const borrowFeed = getPriceFeed(MoveToken.mUSD, this.network)
    const collateralVaas = collateralFeed ? await getPriceFeedUpdateData(collateralFeed, this.network) : []
    const borrowVaas = borrowFeed ? await getPriceFeedUpdateData(borrowFeed, this.network) : []
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::testnet_airdropper::claim_airdrop`,
      functionArguments: [collateralVaas, borrowVaas],
      typeArguments: [],
    }
  }
}
