import { MoveResource } from '@aptos-labs/ts-sdk'

import { MirageClientBase } from '../../client/base'
import { AirdropConfig } from './airdropConfig'
import { UserClaimDetails } from './userClaimDetails'

export class DistributorEntities extends MirageClientBase {
  createUserClaimDetails(userResources: MoveResource[]): UserClaimDetails {
    return new UserClaimDetails(userResources, this.config)
  }

  createAirdropConfig(moduleResource: MoveResource[]): AirdropConfig {
    return new AirdropConfig(moduleResource, this.config)
  }
}
