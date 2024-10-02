import { Aptos, MoveObjectType, MoveUint64Type, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'
import { Client } from 'urql'

import {
  aptosClient,
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
import { getDecimal8Argument, getMarketTypeArgument, getPositionTypeArgument } from '../transactions'

export const getMarginTokenFromPosition = async (positionObjectAddress: string, network: Network): Promise<string> => {
  return (
    await aptosClient(network).view({
      payload: {
        function: `${mirageAddress(network)}::market::position_margin_token`,
        functionArguments: [positionObjectAddress],
        typeArguments: [`${mirageAddress(network)}::market::Position`],
      },
    })
  )[0] as MoveObjectType
}

export const getAllPositionIdsByOwner = async (
  owner: string,
  graphqlClient: Client,
  network: Network | string,
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionsByOwnerQueryVariables = {
    COLLECTIONS: getAllMarketObjectAddresses(network),
    OWNER: owner,
  }
  try {
    const result = await graphqlClient.query(GetTokenIdsFromCollectionsByOwnerDocument, variables).toPromise()
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

export const getPositionIdsByMarketAndOwner = async (
  marginToken: MoveToken,
  perp: Perpetual,
  owner: string,
  graphqlClient: Client,
  network: Network | string,
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionByOwnerQueryVariables = {
    COLLECTION: getCollectionIdForPerpPair(marginToken, perp, network),
    OWNER: owner,
  }
  try {
    const result = await graphqlClient.query(GetTokenIdsFromCollectionByOwnerDocument, variables).toPromise()

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

export const isLimitOrderTriggerable = async (
  positionObjectAddress: MoveObjectType,
  index: number,
  perpPrice: number,
  client: Aptos,
  network: Network | string,
): Promise<boolean> => {
  const payload = {
    function: `${mirageAddress(network)}::market::is_limit_order_triggerable` as `${string}::${string}::${string}`,
    typeArguments: getPositionTypeArgument(network),
    functionArguments: [positionObjectAddress, index, getDecimal8Argument(perpPrice)],
  }
  const ret = await client.view({ payload })
  return ret[0] as boolean
}

export const isLimitOrderTriggerableBulk = async (
  positionObjectAddresses: MoveObjectType[],
  indexes: number[],
  perpPrice: number,
  client: Aptos,
  network: Network | string,
): Promise<boolean[]> => {
  const payload = {
    function:
      `${MODULES(network).keeper_scripts.address}::market_scripts::get_is_limit_order_triggerable_states_same_perp` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddresses, indexes, getDecimal8Argument(perpPrice)],
  }
  const ret = await client.view({ payload })
  return (ret as any)[0] as boolean[]
}

export const getLiquidationPrice = async (
  positionObjectAddress: MoveObjectType,
  perpetualPrice: number,
  marginPrice: number,
  client: Aptos,
  network: Network | string,
): Promise<number> => {
  const payload = {
    function: `${mirageAddress(network)}::market::get_liquidation_price` as `${string}::${string}::${string}`,
    typeArguments: getPositionTypeArgument(network),
    functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
  }
  const ret = await client.view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
}

export const getLiquidationPriceBulk = async (
  positionObjectAddresses: MoveObjectType[],
  perpetualPrice: number,
  marginPrice: number,
  client: Aptos,
  network: Network | string,
): Promise<number[]> => {
  const payload = {
    function:
      `${MODULES(network).keeper_scripts.address}::market_scripts::get_liquidation_prices_same_perp` as `${string}::${string}::${string}`,
    functionArguments: [positionObjectAddresses, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
  }
  const ret = await client.view({ payload })
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
export const estimateFee = async (
  marketObjectAddress: string,
  positionSizeAsset: number,
  isLong: boolean,
  isClose: boolean,
  perpPrice: number,
  marginPrice: number,
  network: Network,
): Promise<number> => {
  const payload = {
    function: `${mirageAddress(network)}::market::get_open_close_fee` as `${string}::${string}::${string}`,
    typeArguments: getMarketTypeArgument(network),
    functionArguments: [
      marketObjectAddress,
      isLong,
      isClose,
      getDecimal8Argument(positionSizeAsset),
      getDecimal8Argument(perpPrice),
      getDecimal8Argument(marginPrice),
    ],
  }
  const ret = await aptosClient(network).view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
}

export const getPositionMaintenanceMarginMusd = async (
  positionObjectAddress: MoveObjectType,
  perpetualPrice: number,
  marginPrice: number,
  network: Network,
): Promise<number> => {
  const payload = {
    function:
      `${mirageAddress(network)}::market::get_position_maintenance_margin_musd` as `${string}::${string}::${string}`,
    typeArguments: getPositionTypeArgument(network),
    functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
  }
  const ret = await aptosClient(network).view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
}

export type AllPositionInfo = {
  marketObjectAddress: string
  openingPrice: number
  isLong: boolean
  marginAmount: number
  positionSize: number
  outstandingFunding: number
  takeProfitPrice: number
  stopLossPrice: number
  liquidationPrice: number
  maintenanceMarginUsd: number
  limitOrderCount: number
}

export const getAllPositionInfo = async (
  positionObjectAddress: MoveObjectType,
  perpetualPrice: number,
  marginPrice: number,
  network: Network,
): Promise<AllPositionInfo> => {
  const payload = {
    function: `${mirageAddress(network)}::market::all_position_info` as `${string}::${string}::${string}`,
    typeArguments: getPositionTypeArgument(network),
    functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
  }
  const ret = await aptosClient(network).view({ payload })
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
  result.takeProfitPrice = BigNumber(data.takeProfitPrice as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
  result.stopLossPrice = BigNumber(data.stopLossPrice as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
  result.liquidationPrice = BigNumber(data.liquidationPrice as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
  result.maintenanceMarginUsd = BigNumber(data.maintenanceMarginUsd as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
  result.limitOrderCount = BigNumber(data.limitOrderCount as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
  return result
}
