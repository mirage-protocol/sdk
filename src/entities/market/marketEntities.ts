import { MoveResource } from '@aptos-labs/ts-sdk'

import { MirageClientBase } from '../../client/base'
import { MoveToken, Perpetual } from '../../constants'
import { LimitOrder, LimitOrderData } from './limitOrder'
import { Market } from './market'
import { Position, PositionSide } from './position'

export class MarketEntities extends MirageClientBase {
  createPosition(
    positionObjectResources: MoveResource[],
    market: Market,
    marginCoin: MoveToken | string,
    perpetualAsset: Perpetual | string,
    objectAddress: string,
  ): Position {
    return new Position(positionObjectResources, market, marginCoin, perpetualAsset, objectAddress, this.config)
  }

  createLimitOrder(
    limitOrderData: LimitOrderData,
    marginToken: MoveToken,
    perpetualAsset: Perpetual,
    positionSide: PositionSide,
    objectAddress: string,
  ): LimitOrder {
    return new LimitOrder(limitOrderData, marginToken, perpetualAsset, positionSide, objectAddress)
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
