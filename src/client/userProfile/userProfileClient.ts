import { UserProfileClientBase } from './userProfileClientBase'
import { UserProfileEntitiesClient } from './userProfileEntitiesClient'
import { UserProfileTransactionClient } from './userProfileTransactionClient'
import { UserProfileViewsClient } from './userProfileViewsClient'

export class UserProfileClient extends UserProfileClientBase {
  public readonly transactions = new UserProfileTransactionClient(this)
  public readonly views = new UserProfileViewsClient(this, this.aptosClient)
  public readonly entities = new UserProfileEntitiesClient(this)
}
