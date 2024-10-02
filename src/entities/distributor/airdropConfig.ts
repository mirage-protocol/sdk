import { MoveResource, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { mirageAddress, PRECISION_8, ZERO } from '../../constants'

export class AirdropConfig {
  public readonly claimAmount: BigNumber
  public readonly claimIntervalSeconds: BigNumber

  constructor(moduleResource: MoveResource[], network: Network | string) {
    const type = `${mirageAddress(network)}::distributor::AirdropConfig`
    const config = moduleResource.find((resource) => resource.type === type)
    this.claimAmount = !!config ? new BigNumber((config.data as any).claim_amount).div(PRECISION_8) : ZERO
    this.claimIntervalSeconds = !!config ? new BigNumber((config.data as any).claim_interval_seconds) : ZERO
  }
}
