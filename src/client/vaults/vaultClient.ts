import { VaultClientBase } from './vaultClientBase'
import { VaultEntitiesClient } from './vaultEntities'
import { VaultViewsClient } from './vaultViewsClient'

export class VaultClient extends VaultClientBase {
  public readonly entities = new VaultEntitiesClient(this, this.config)
  public readonly views = new VaultViewsClient(this, this.aptosClient)
}
