import { Aptos as AptosClient } from '@aptos-labs/ts-sdk'

import { numberOfClaimsAvailableView, timeUntilNextClaimView } from '../../views'
import { MirageClientBase } from '../base'

export class TestnetViewsClient {
  private readonly base: MirageClientBase
  private readonly aptosClient: AptosClient

  constructor(base: MirageClientBase, aptosClient: AptosClient) {
    this.base = base
    this.aptosClient = aptosClient
  }

  public getNumberOfClaimsAvailable = async (userAddress: string): Promise<number> => {
    return await numberOfClaimsAvailableView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getTimeUntilNextClaim = async (userAddress: string): Promise<number> => {
    return await timeUntilNextClaimView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }
}
