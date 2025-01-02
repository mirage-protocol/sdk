import { MoveResource } from '@aptos-labs/ts-sdk'

import { LimitOrder, Market, Position } from '../../entities'
import { MirageConfig } from '../../utils'

export class MarketEntitiesClient {
  private readonly config: MirageConfig

  constructor(config: MirageConfig) {
    this.config = config
  }

  createMarket(marketObjectResources: MoveResource[], objectAddress: string): Market {
    return new Market(marketObjectResources, objectAddress, this.config.deployerAddress)
  }

  createPosition(positionObjectResources: MoveResource[], market: Market, objectAddress: string): Position {
    return new Position(positionObjectResources, market, objectAddress, this.config.deployerAddress)
  }

  createLimitOrder(limitOrderResources: MoveResource[], objectAddress: string): LimitOrder {
    return new LimitOrder(limitOrderResources, objectAddress, this.config.deployerAddress)
  }
}
