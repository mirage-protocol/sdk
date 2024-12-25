import { MarketClientBase } from './marketClientBase'
import { MarketEntitiesClient } from './marketEntities'
import { MarketQueriesClient } from './marketQueriesClient'
import { MarketTransactionClient } from './marketTransactionClient'
import { MarketViewsClient } from './marketViewsClient'

export class MarketClient extends MarketClientBase {
  public readonly transactions = new MarketTransactionClient(this)
  public readonly views = new MarketViewsClient(this, this.aptosClient)
  public readonly entities = new MarketEntitiesClient(this.config)
  public readonly queries = new MarketQueriesClient(this, this.aptosGraphqlClient)
}
