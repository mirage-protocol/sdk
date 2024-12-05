import { MoveObjectType, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { MirageClientBase } from '../client/base'
import {
  defaultAptosClient,
  getAllMarketObjectAddresses,
  getCollectionIdForPerpPair,
  mirageAddress,
  MODULES,
  MoveToken,
  Perpetual,
  PRECISION_8,
} from '../constants'
import {
  GetTokenIdsFromCollectionByOwnerDocument,
  GetTokenIdsFromCollectionByOwnerQueryVariables,
  GetTokenIdsFromCollectionsByOwnerDocument,
  GetTokenIdsFromCollectionsByOwnerQueryVariables,
} from '../generated/aptos/graphql'
import { getDecimal8Argument } from '../transactions'

export type AllPositionInfo = {
  marketObjectAddress: string
  openingPrice: number
  isLong: boolean
  marginAmount: number
  positionSize: number
  outstandingFunding: number
  liquidationPrice: number
  maintenanceMarginUsd: number
}

export class MarketViews extends MirageClientBase {
  //TODO delete? function no longer exists and is uncalled in interface - could also chain calls with get_market_from_position if this is needed
  // async getMarginTokenFromPosition(positionObjectAddress: string): Promise<string> {
  //   return (
  //     await this.aptosClient.view({
  //       payload: {
  //         function: `${mirageAddress(this.config)}::market::position_margin_token`,
  //         functionArguments: [positionObjectAddress],
  //       },
  //     })
  //   )[0] as MoveObjectType
  // }

  async getAllPositionIdsByOwner(owner: string): Promise<string[]> {
    const variables: GetTokenIdsFromCollectionsByOwnerQueryVariables = {
      COLLECTIONS: getAllMarketObjectAddresses(this.config),
      OWNER: owner,
    }
    try {
      const result = await this.aptosGraphqlClient
        .query(GetTokenIdsFromCollectionsByOwnerDocument, variables)
        .toPromise()
      if (result.error) {
        console.error('GraphQL Error:', result.error)
        throw new Error(`GraphQL Error: ${result.error.message}`)
      }

      if (!result.data) {
        throw new Error('No data returned from GraphQL query')
      }

      const tokenIds = result.data.current_token_datas_v2.map((tokenData) => tokenData.token_data_id)
      return tokenIds
    } catch (error) {
      return []
    }
  }

  async getPositionIdsByMarketAndOwner(marginToken: MoveToken, perp: Perpetual, owner: string): Promise<string[]> {
    const variables: GetTokenIdsFromCollectionByOwnerQueryVariables = {
      COLLECTION: getCollectionIdForPerpPair(marginToken, perp, this.config),
      OWNER: owner,
    }
    try {
      const result = await this.aptosGraphqlClient
        .query(GetTokenIdsFromCollectionByOwnerDocument, variables)
        .toPromise()

      if (result.error) {
        console.error('GraphQL Error:', result.error)
        throw new Error(`GraphQL Error: ${result.error.message}`)
      }

      if (!result.data) {
        throw new Error('No data returned from GraphQL query')
      }

      // Assuming 'current_token_datas_v2' is the correct field name based on your GraphQL query
      const tokenIds = result.data.current_token_datas_v2.map((tokenData) => tokenData.token_data_id)
      return tokenIds
    } catch (error) {
      return []
    }
  }

  async isLimitOrderTriggerable(limitOrderObject: MoveObjectType, perpPrice: number): Promise<boolean> {
    const payload = {
      function:
        `${MODULES(this.config).market.address}::limit_order::is_limit_order_triggerable` as `${string}::${string}::${string}`,
      functionArguments: [limitOrderObject, getDecimal8Argument(perpPrice)],
    }
    const ret = await this.aptosClient.view({ payload })
    return ret[0] as boolean
  }

  async isLimitOrderTriggerableBulk(
    limitOrderObjectAddresses: MoveObjectType[],
    perpPrice: number,
  ): Promise<boolean[]> {
    const payload = {
      function:
        `${MODULES(this.config).keeper_scripts.address}::market_scripts::get_is_limit_order_triggerable_states_same_perp` as `${string}::${string}::${string}`,
      functionArguments: [limitOrderObjectAddresses, getDecimal8Argument(perpPrice)],
    }
    const ret = await this.aptosClient.view({ payload })
    return (ret as any)[0] as boolean[]
  }

  async getLiquidationPrice(
    positionObjectAddress: MoveObjectType,
    perpetualPrice: number,
    marginPrice: number,
  ): Promise<number> {
    const payload = {
      function: `${mirageAddress(this.config)}::market::get_liquidation_price` as `${string}::${string}::${string}`,
      functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
    }
    const ret = await this.aptosClient.view({ payload })
    return BigNumber(ret[0] as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()
  }

  async getLiquidationPriceBulk(
    positionObjectAddresses: MoveObjectType[],
    perpetualPrice: number,
    marginPrice: number,
  ): Promise<number[]> {
    const payload = {
      function:
        `${MODULES(this.config).keeper_scripts.address}::market_scripts::get_liquidation_prices_same_perp` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObjectAddresses,
        getDecimal8Argument(perpetualPrice),
        getDecimal8Argument(marginPrice),
      ],
    }
    const ret = await this.aptosClient.view({ payload })
    return (ret as any)[0].map((r) =>
      BigNumber(r as MoveUint64Type)
        .div(PRECISION_8)
        .toNumber(),
    )
  }

  /**
   * Get an estimate of the current fee in terms of USD
   * @param positionSizeAsset the position size
   * @param isLong if the trade is long
   * @param isClose if the trade is an open or close
   * @returns the fee in USD
   */
  async estimateFee(
    marketObjectAddress: string,
    positionSizeAsset: number,
    isLong: boolean,
    perpPrice: number,
    marginPrice: number,
  ): Promise<number> {
    const payload = {
      function: `${mirageAddress(this.config)}::market::get_fee` as `${string}::${string}::${string}`,
      functionArguments: [
        marketObjectAddress,
        isLong,
        getDecimal8Argument(positionSizeAsset),
        getDecimal8Argument(perpPrice),
        getDecimal8Argument(marginPrice),
      ],
    }
    const ret = await defaultAptosClient(this.network).view({ payload })
    return BigNumber(ret[0] as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()
  }

  async getPositionMaintenanceMarginMusd(
    positionObjectAddress: MoveObjectType,
    perpetualPrice: number,
    marginPrice: number,
  ): Promise<number> {
    const payload = {
      function:
        `${mirageAddress(this.config)}::market::get_position_maintenance_margin_musd` as `${string}::${string}::${string}`,
      functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
    }
    const ret = await defaultAptosClient(this.network).view({ payload })
    return BigNumber(ret[0] as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()
  }

  async getAllPositionInfo(
    positionObjectAddress: MoveObjectType,
    perpetualPrice: number,
    marginPrice: number,
  ): Promise<AllPositionInfo> {
    const payload = {
      function: `${mirageAddress(this.config)}::market::all_position_info` as `${string}::${string}::${string}`,
      functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
    }
    const ret = await defaultAptosClient(this.network).view({ payload })
    const data = ret[0] as any
    const result = {} as any
    result.openingPrice = BigNumber(data.openingPrice as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()
    result.marginAmount = BigNumber(data.marginAmount as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()
    result.positionSize = BigNumber(data.positionSize as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()

    result.outstandingFunding = BigNumber(data.outstandingFunding.magnitude as MoveUint64Type).times(
      result.outstandingFunding.negative ? -1 : 1,
    )
    result.liquidationPrice = BigNumber(data.liquidationPrice as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()
    result.maintenanceMarginUsd = BigNumber(data.maintenanceMarginUsd as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber()
    return result
  }
}
