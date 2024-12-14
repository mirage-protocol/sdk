import { MoveResource } from '@aptos-labs/ts-sdk'

import { MoveToken, Perpetual } from '../../constants'
import { BaseEntities } from '../baseEntities'
import { LimitOrder } from './limitOrder'
import { Market } from './market'
import { Position, PositionSide } from './position'

export class MarketEntities extends BaseEntities {
  createPosition(
    positionObjectResources: MoveResource[],
    market: Market,
    objectAddress: string,
    limitOrderResourcesList: MoveResource[][],
  ): Position {
    return new Position(
      positionObjectResources,
      market,
      market.marginToken,
      market.marginToken,
      objectAddress,
      this.config,
      limitOrderResourcesList,
    )
  }

  createLimitOrder(
    limitOrderResources: MoveResource[],
    marginToken: MoveToken,
    perpetualAsset: Perpetual,
    positionSide: PositionSide,
    objectAddress: string,
  ): LimitOrder {
    return new LimitOrder(limitOrderResources, marginToken, perpetualAsset, positionSide, objectAddress, this.config)
  }

  createMarket(
    marketObjectResources: MoveResource[],
    marginCoin: MoveToken | string,
    perpetualAsset: Perpetual | string,
    objectAddress: string,
  ): Market {
    return new Market(marketObjectResources, marginCoin, perpetualAsset, objectAddress, this.config, this.network)
  }
}
