import { MoveResource, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules, ZERO } from '../../constants'

export class UserClaimDetails {
  public readonly lastClaimTimestamp: BigNumber

  constructor(userResource: MoveResource[], network: Network) {
    const type = `${getModuleAddress(network, MoveModules.MIRAGE_SCRIPTS)}::distributor::UserClaimDetails`
    const claim = userResource.find((resource) => resource.type === type)
    this.lastClaimTimestamp = !!claim ? new BigNumber((claim.data as any).last_claim_timestamp) : ZERO
  }
}
