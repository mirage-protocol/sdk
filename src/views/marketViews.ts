import { AccountAddress, Aptos as AptosClient, MoveObjectType, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'
import { Client as GqlClient } from 'urql'

import {
  GetTokenIdsFromCollectionByOwnerDocument,
  GetTokenIdsFromCollectionByOwnerQueryVariables,
  GetTokenIdsFromCollectionsByOwnerDocument,
  GetTokenIdsFromCollectionsByOwnerQueryVariables,
} from '../generated/aptos/graphql'
import { getDecimal8BCS } from '../transactions'
import { getModuleAddress, MoveModules, PRECISION_8 } from '../utils'

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

export const allMarketAddressesView = async (
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::all_markets` as `${string}::${string}::${string}`,
    functionArguments: [],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }[]
  return result.map((value) => value.inner)
}

export const marketPerpSymbolView = async (
  marketObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::get_perp_symbol` as `${string}::${string}::${string}`,
    functionArguments: [marketObjectAddress],
  }
  return (await aptosClient.view({ payload }))[0] as MoveObjectType
}

export const marketNameView = async (
  marketObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
): Promise<MoveObjectType> => {
  const payload = {
    function: `0x4::collection::name` as `${string}::${string}::${string}`,
    functionArguments: [marketObjectAddress],
    typeArguments: ['0x4::collection::Collection'],
  }
  return (await aptosClient.view({ payload }))[0] as string
}

export const marketMarginOracleView = async (
  marketObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::margin_oracle` as `${string}::${string}::${string}`,
    functionArguments: [marketObjectAddress],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }
  return result.inner
}

export const marketPerpOracleView = async (
  marketObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::perp_oracle` as `${string}::${string}::${string}`,
    functionArguments: [marketObjectAddress],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }
  return result.inner
}

export const marketMarginTokenAddressView = async (
  marketObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::margin_token` as `${string}::${string}::${string}`,
    functionArguments: [marketObjectAddress],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }
  return result.inner
}

export const marketMarginSymbolView = async (
  marketObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const metadataAddress = await marketMarginTokenAddressView(marketObjectAddress, aptosClient, deployerAddress)
  const payload = {
    function: `0x1::fungible_asset::symbol` as `${string}::${string}::${string}`,
    functionArguments: [metadataAddress],
    typeArguments: [`0x1::fungible_asset::Metadata`],
  }
  const result = (await aptosClient.view({ payload }))[0] as string
  return result
}

export const isLimitOrderTriggerableView = async (
  limitOrderObject: MoveObjectType,
  perpPrice: number,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<boolean> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::limit_order::is_limit_order_triggerable` as `${string}::${string}::${string}`,
    functionArguments: [limitOrderObject, getDecimal8BCS(perpPrice)],
  }
  const ret = await aptosClient.view({ payload })
  return ret[0] as boolean
}

export const isLimitOrderTriggerableBulkView = async (
  limitOrderObjectAddresses: MoveObjectType[],
  perpPrice: number,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<boolean[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.KEEPER_SCRIPTS, deployerAddress)}::market_scripts::get_is_limit_order_triggerable_states_same_perp` as `${string}::${string}::${string}`,
    functionArguments: [limitOrderObjectAddresses, getDecimal8BCS(perpPrice)],
  }
  const ret = await aptosClient.view({ payload })
  return (ret as any)[0] as boolean[]
}

export const liquidationPriceView = async (
  positionObjectAddress: MoveObjectType,
  perpPrice: number,
  marginPrice: number,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::get_liquidation_price` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddress, getDecimal8BCS(perpPrice), getDecimal8BCS(marginPrice)],
  }
  const ret = await aptosClient.view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
}

export const liquidationPriceBulkView = async (
  positionObjectAddresses: MoveObjectType[],
  perpPrice: number,
  marginPrice: number,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.KEEPER_SCRIPTS, deployerAddress)}::market_scripts::get_liquidation_prices_same_perp` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddresses, getDecimal8BCS(perpPrice), getDecimal8BCS(marginPrice)],
  }
  const ret = await aptosClient.view({ payload })
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
export const estimateFeeView = async (
  marketObjectAddress: string,
  positionSize: number,
  isLong: boolean,
  perpPrice: number,
  marginPrice: number,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::get_fee` as `${string}::${string}::${string}`,
    functionArguments: [
      marketObjectAddress,
      isLong,
      getDecimal8BCS(positionSize),
      getDecimal8BCS(perpPrice),
      getDecimal8BCS(marginPrice),
    ],
  }
  const ret = await aptosClient.view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
}

export const positionMaintenanceMarginMusdView = async (
  positionObjectAddress: MoveObjectType,
  perpPrice: number,
  marginPrice: number,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::get_position_maintenance_margin_musd` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddress, getDecimal8BCS(perpPrice), getDecimal8BCS(marginPrice)],
  }
  const ret = await aptosClient.view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
}

export const allPositionInfoView = async (
  positionObjectAddress: MoveObjectType,
  perpPrice: number,
  marginPrice: number,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<AllPositionInfo> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::all_position_info` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddress, getDecimal8BCS(perpPrice), getDecimal8BCS(marginPrice)],
  }
  const ret = await aptosClient.view({ payload })
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

export const allPositionByOwnerQuery = async (
  owner: string,
  marketObjectAddresses: MoveObjectType[],
  aptosGqlClient: GqlClient,
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionsByOwnerQueryVariables = {
    COLLECTIONS: marketObjectAddresses,
    OWNER: owner,
  }
  try {
    const result = await aptosGqlClient.query(GetTokenIdsFromCollectionsByOwnerDocument, variables).toPromise()
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

export const positionIdsByMarketAndOwnerQuery = async (
  owner: string,
  marketObjectAddress: string,
  aptosGqlClient: GqlClient,
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionByOwnerQueryVariables = {
    COLLECTION: marketObjectAddress,
    OWNER: owner,
  }
  try {
    const result = await aptosGqlClient.query(GetTokenIdsFromCollectionByOwnerDocument, variables).toPromise()

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
