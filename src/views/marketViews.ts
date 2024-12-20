import { MoveObjectType, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  getAllMarketObjectAddresses,
  getCollectionIdForPerpPair,
  getModuleAddress,
  MoveModules,
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
import { BaseViews } from './baseViews'

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

export class MarketViews extends BaseViews {
  async getAllMarketsView(): Promise<MoveObjectType[]> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::all_markets` as `${string}::${string}::${string}`,
      functionArguments: [],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }[]
    return result.map((value) => value.inner)
  }

  async getMarketPerpSymbol(market: MoveObjectType): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::get_perp_symbol` as `${string}::${string}::${string}`,
      functionArguments: [market],
    }
    return (await this.aptosClient.view({ payload }))[0] as MoveObjectType
  }

  async getMarketMarginOracle(marketObj: MoveObjectType): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::margin_oracle` as `${string}::${string}::${string}`,
      functionArguments: [marketObj],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }
    return result.inner
  }

  async getMarketPerpOracle(marketObj: MoveObjectType): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::perp_oracle` as `${string}::${string}::${string}`,
      functionArguments: [marketObj],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }
    return result.inner
  }

  async getMarketMarginToken(marketObj: MoveObjectType): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::margin_token` as `${string}::${string}::${string}`,
      functionArguments: [marketObj],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }
    return result.inner
  }

  async getMarketMarginTokenSymbol(marketObj: MoveObjectType): Promise<string> {
    const metadataAddress = await this.getMarketMarginToken(marketObj)
    const payload = {
      function: `0x1::fungible_asset::symbol` as `${string}::${string}::${string}`,
      functionArguments: [metadataAddress],
      typeArguments: [`0x1::fungible_asset::Metadata`],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as string
    return result
  }

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
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::limit_order::is_limit_order_triggerable` as `${string}::${string}::${string}`,
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
        `${getModuleAddress(MoveModules.KEEPER_SCRIPTS, this.config.deployerAddress)}::market_scripts::get_is_limit_order_triggerable_states_same_perp` as `${string}::${string}::${string}`,
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
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::get_liquidation_price` as `${string}::${string}::${string}`,
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
        `${getModuleAddress(MoveModules.KEEPER_SCRIPTS, this.config.deployerAddress)}::market_scripts::get_liquidation_prices_same_perp` as `${string}::${string}::${string}`,
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
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::get_fee` as `${string}::${string}::${string}`,
      functionArguments: [
        marketObjectAddress,
        isLong,
        getDecimal8Argument(positionSizeAsset),
        getDecimal8Argument(perpPrice),
        getDecimal8Argument(marginPrice),
      ],
    }
    const ret = await this.aptosClient.view({ payload })
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
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::get_position_maintenance_margin_musd` as `${string}::${string}::${string}`,
      functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
    }
    const ret = await this.aptosClient.view({ payload })
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
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::all_position_info` as `${string}::${string}::${string}`,
      functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
    }
    const ret = await this.aptosClient.view({ payload })
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
