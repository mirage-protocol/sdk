import { VaultClientBase } from './vaultClientBase'
import { VaultEntitiesClient } from './vaultEntities'
import { VaultQueriesClient } from './vaultQueriesClient'
import { VaultTransactionClient } from './vaultTransactionClient'
import { VaultViewsClient } from './vaultViewsClient'

export class VaultClient extends VaultClientBase {
  public readonly entities = new VaultEntitiesClient(this, this.config)
  public readonly views = new VaultViewsClient(this, this.aptosClient)
  public readonly queries = new VaultQueriesClient(this, this.aptosGqlClient)
  public readonly transaction = new VaultTransactionClient(this)
}
