import { Client as GqlClient } from 'urql'

import { allPositionByOwnerQuery, positionIdsByMarketAndOwnerQuery } from '../../views'
import { MarketClientBase } from './marketClientBase'

export class MarketQueriesClient {
  private readonly base: MarketClientBase
  private readonly aptosGqlClient: GqlClient

  constructor(base: MarketClientBase, aptosGqlClient: GqlClient) {
    this.base = base
    this.aptosGqlClient = aptosGqlClient
  }

  public queryOwnedPositionAddresses = async (owner: string): Promise<string[]> => {
    const allMarketAddresses = this.base.getAllMarketAddresses()
    return await allPositionByOwnerQuery(owner, allMarketAddresses, this.aptosGqlClient)
  }

  public queryOwnedPositionAddressesByMarket = async (
    perpSymbol: string,
    marginSymbol: string,
    owner: string,
  ): Promise<string[]> => {
    const marketAddress = this.base.getMarketAddress(perpSymbol, marginSymbol)
    return await positionIdsByMarketAndOwnerQuery(owner, marketAddress, this.aptosGqlClient)
  }
}
