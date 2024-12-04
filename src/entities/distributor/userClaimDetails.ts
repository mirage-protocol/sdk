import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { mirageAddress, MirageConfig, ZERO } from '../../constants'

export class UserClaimDetails {
  public readonly lastClaimTimestamp: BigNumber

  constructor(userResource: MoveResource[], config: MirageConfig) {
    const type = `${mirageAddress(config)}::distributor::UserClaimDetails`
    const claim = userResource.find((resource) => resource.type === type)
    this.lastClaimTimestamp = !!claim ? new BigNumber((claim.data as any).last_claim_timestamp) : ZERO
  }
}
