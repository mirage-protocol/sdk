import { AccountAddress } from '@aptos-labs/ts-sdk'

import { MirageClientBase } from '../base'
import { UserProfile } from '@/src/entities/profile/userProfile'
import { UserProfileCollection } from '@/src/entities/profile/userProfileCollection'

export class UserProfileClientBase extends MirageClientBase {
  public getUserProfileAddress = (userAddress: AccountAddress): AccountAddress => {
    return UserProfile.getUserProfileAddress(userAddress, this.getDeployerAddress())
  }

  public getUserProfileCollectionAddress = (): AccountAddress => {
    return UserProfileCollection.getUserProfileCollectionAddress(this.getDeployerAddress())
  }
}
