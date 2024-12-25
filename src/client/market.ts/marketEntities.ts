import { MoveResource } from '@aptos-labs/ts-sdk'

import { LimitOrder, Market, Position } from '../../entities'
import { MirageConfig } from '../../utils'

export class MarketEntitiesClient {
  private readonly config: MirageConfig

  constructor(config: MirageConfig) {
    this.config = config
  }

  createPosition(positionObjectResources: MoveResource[], market: Market, objectAddress: string): Position {
    return new Position(positionObjectResources, market, objectAddress, this.config)
  }

  createLimitOrder(
    limitOrderResources: MoveResource[],
    marginSymbol: string,
    perpetualSymbol: string,
    objectAddress: string,
  ): LimitOrder {
    return new LimitOrder(limitOrderResources, marginSymbol, perpetualSymbol, objectAddress, this.config)
  }

  createMarket(marketObjectResources: MoveResource[], objectAddress: string): Market {
    return new Market(marketObjectResources, objectAddress, this.config)
  }
}
