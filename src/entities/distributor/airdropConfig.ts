import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { mirageAddress, MirageConfig, PRECISION_8, ZERO } from '../../constants'

export class AirdropConfig {
  public readonly claimAmount: BigNumber
  public readonly claimIntervalSeconds: BigNumber

  constructor(moduleResource: MoveResource[], config: MirageConfig) {
    const type = `${mirageAddress(config)}::distributor::AirdropConfig`
    const airdropConfigResource = moduleResource.find((resource) => resource.type === type)
    this.claimAmount = !!airdropConfigResource
      ? new BigNumber((airdropConfigResource.data as any).claim_amount).div(PRECISION_8)
      : ZERO
    this.claimIntervalSeconds = !!airdropConfigResource
      ? new BigNumber((airdropConfigResource.data as any).claim_interval_seconds)
      : ZERO
  }
}
