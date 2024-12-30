import { InputEntryFunctionData } from '@aptos-labs/ts-sdk'

import { createClaimAirdropPayload } from '../../transactions'
import { MirageClientBase } from '../base'
import { VaultClient } from '../vaults/vaultClient'

export class TestnetClient extends MirageClientBase {
  vaults: VaultClient

  constructor(vaults: VaultClient, ...params: ConstructorParameters<typeof MirageClientBase>) {
    super(...params)
    this.vaults = vaults
  }

  getClaimAirdropPayload = async (): Promise<InputEntryFunctionData> => {
    const collateralPriceFeed = await this.vaults.getCollateralPriceFeedUpdate('tUSDC', 'mUSD')
    const borrowPriceFeed = await this.vaults.getBorrowPriceFeedUpdate('tUSDC', 'mUSD')

    return createClaimAirdropPayload(collateralPriceFeed, borrowPriceFeed, this.getDeployerAddress())
  }
}
