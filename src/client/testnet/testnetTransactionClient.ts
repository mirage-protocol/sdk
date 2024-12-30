import { InputEntryFunctionData } from '@aptos-labs/ts-sdk'

import { createClaimAirdropPayload } from '../../transactions'
import { MirageClientBase } from '../base'
import { VaultClient } from '../vaults/vaultClient'

export class MarketTransactionClient {
  private readonly base: MirageClientBase
  private readonly vaults: VaultClient

  constructor(base: MirageClientBase, vaultClient: VaultClient) {
    this.base = base
    this.vaults = vaultClient
  }

  public getClaimAirdropPayload = async (): Promise<InputEntryFunctionData> => {
    const collateralVaas = await this.vaults.getCollateralPriceFeedUpdate('tUSDC', 'mUSD')
    const borrowVaas = await this.vaults.getBorrowPriceFeedUpdate('tUSDC', 'mUSD')
    return createClaimAirdropPayload(collateralVaas, borrowVaas, this.base.getDeployerAddress())
  }
}
