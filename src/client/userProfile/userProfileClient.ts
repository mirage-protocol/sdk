import { UserProfileClientBase } from './userProfileClientBase'
import { UserProfileTransactionClient } from './userProfileTransactionClient'
import { UserProfileViewsClient } from './userProfileViewsClient'

export class UserProfileClient extends UserProfileClientBase {
  public readonly transactions = new UserProfileTransactionClient(this)
  public readonly views = new UserProfileViewsClient(this, this.aptosClient)
}
