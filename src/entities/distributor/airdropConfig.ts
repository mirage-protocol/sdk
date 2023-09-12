import BigNumber from 'bignumber.js'

import { AccountResource, mirageAddress, ZERO } from '../../constants'

export class AirdropConfig {
  public readonly claimAmount: BigNumber
  public readonly claimIntervalSeconds: BigNumber

  constructor(moduleResource: AccountResource[]) {
    const type = `${mirageAddress()}::distributor::AirdropConfig`
    const config = moduleResource.find((resource) => resource.type === type)
    this.claimAmount = !!config ? new BigNumber((config.data as any).claim_amount) : ZERO
    this.claimIntervalSeconds = !!config ? new BigNumber((config.data as any).claim_interval_seconds) : ZERO
  }
}
