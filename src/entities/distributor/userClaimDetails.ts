import BigNumber from 'bignumber.js'

import { AccountResource, mirageAddress, ZERO } from '../../constants'

export class UserClaimDetails {
  public readonly lastClaimTimestamp: BigNumber

  constructor(userResource: AccountResource[]) {
    const type = `${mirageAddress()}::distributor::UserClaimDetails`
    const claim = userResource.find((resource) => resource.type === type)
    this.lastClaimTimestamp = !!claim ? new BigNumber((claim.data as any).last_claim_timestamp) : ZERO
  }
}
