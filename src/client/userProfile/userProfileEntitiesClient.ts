import { MoveResource } from '@aptos-labs/ts-sdk'
import { UserProfileClientBase } from './userProfileClientBase'
import { UserProfile } from '@/src/entities/profile/userProfile'
import { UserProfileCollection } from '@/src/entities/profile/userProfileCollection'
import { UserReferral } from '@/src/entities'

export class UserProfileEntitiesClient {
  private readonly base: UserProfileClientBase

  constructor(base: UserProfileClientBase) {
    this.base = base
  }

  createUserProfileCollection(userProfileCollectionResources: MoveResource[]): UserProfileCollection {
    return new UserProfileCollection(userProfileCollectionResources, this.base.getDeployerAddress())
  }

  createUserProfile(userProfileResources: MoveResource[], userProfileCollection: UserProfileCollection): UserProfile {
    return new UserProfile(userProfileResources, userProfileCollection, this.base.getDeployerAddress())
  }

  createUserReferral(accountResources: MoveResource[]): UserReferral {
    return new UserReferral(accountResources, this.base.getDeployerAddress())
  }
}
