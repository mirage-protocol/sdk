import { MoveResource, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { mirageAddress, ZERO } from '../../constants'

export class UserClaimDetails {
  public readonly lastClaimTimestamp: BigNumber

  constructor(userResource: MoveResource[], network: Network | string) {
    const type = `${mirageAddress(network)}::distributor::UserClaimDetails`
    const claim = userResource.find((resource) => resource.type === type)
    this.lastClaimTimestamp = !!claim ? new BigNumber((claim.data as any).last_claim_timestamp) : ZERO
  }
}
