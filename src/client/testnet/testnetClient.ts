import { InputEntryFunctionData } from '@aptos-labs/ts-sdk'

import { createClaimAirdropPayload } from '../../transactions'
import { MirageClientBase } from '../base'
import { VaultClient } from '../vaults/vaultClient'
import { TestnetViewsClient } from './testnetViewsClient'
import { MirageConfig } from '../../utils'

export class TestnetClient extends MirageClientBase {
  private readonly vaults: VaultClient
  public readonly views: TestnetViewsClient

  constructor(vaults: VaultClient, config: MirageConfig) {
    super(config)
    this.vaults = vaults
    this.views = new TestnetViewsClient(this, this.aptosClient)
  }

  getClaimAirdropPayload = async (): Promise<InputEntryFunctionData> => {
    const collateralPriceFeed = await this.vaults.getCollateralPriceFeedUpdate('tUSDC', 'mUSD')
    const borrowPriceFeed = await this.vaults.getBorrowPriceFeedUpdate('tUSDC', 'mUSD')

    return createClaimAirdropPayload(collateralPriceFeed, borrowPriceFeed, this.getDeployerAddress())
  }
}