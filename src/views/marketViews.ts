import { MoveObjectType, MoveUint64Type, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  aptosClient,
  getAllMarketObjectAddresses,
  getCollectionIdForPerpPair,
  mirageAddress,
  MoveToken,
  Perpetual,
  PRECISION_8,
} from '../constants'
import {
  GetTokenIdsFromCollectionByOwnerDocument,
  GetTokenIdsFromCollectionByOwnerQueryVariables,
  GetTokenIdsFromCollectionsByOwnerDocument,
  GetTokenIdsFromCollectionsByOwnerQueryVariables,
} from '../generated/graphql'
import { getDecimal8Argument, getMarketTypeArgument, getPositionTypeArgument } from '../transactions'
import { graphqlClient } from './vaultViews'

export const getMarginTokenFromPosition = async (positionObjectAddress: string, network: Network): Promise<string> => {
  return (
    await aptosClient(network).view({
      payload: {
        function: `${mirageAddress()}::market::position_margin_token`,
        functionArguments: [positionObjectAddress],
        typeArguments: [`${mirageAddress()}::market::Position`],
      },
    })
  )[0] as MoveObjectType
}

export const getAllPositionIdsByOwner = async (owner: string): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionsByOwnerQueryVariables = {
    COLLECTIONS: getAllMarketObjectAddresses(),
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

    // Assuming 'current_token_datas_v2' is the correct field name based on your GraphQL query
    const tokenIds = result.data.current_token_datas_v2.map((tokenData) => tokenData.token_data_id)
    return tokenIds
  } catch (error) {
    return []
  }
}

export const getPositionIdsByMarketAndOwner = async (
  marginToken: MoveToken,
  perp: Perpetual,
  owner: string
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionByOwnerQueryVariables = {
    COLLECTION: getCollectionIdForPerpPair(marginToken, perp),
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
  network: Network
): Promise<boolean> => {
  const payload = {
    function: `${mirageAddress()}::market::is_limit_order_triggerable` as `${string}::${string}::${string}`,
    typeArguments: getPositionTypeArgument(),
    functionArguments: [positionObjectAddress, index, perpPrice],
  }
  const ret = await aptosClient(network).view({ payload })
  return ret[0] as boolean
}

export const getLiquidationPrice = async (
  positionObjectAddress: MoveObjectType,
  perpetualPrice: number,
  marginPrice: number,
  network: Network
): Promise<number> => {
  const payload = {
    function: `${mirageAddress()}::market::get_liquidation_price` as `${string}::${string}::${string}`,
    typeArguments: getPositionTypeArgument(),
    functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
  }
  const ret = await aptosClient(network).view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
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
  network: Network
): Promise<number> => {
  const payload = {
    function: `${mirageAddress()}::market::get_open_close_fee` as `${string}::${string}::${string}`,
    typeArguments: getMarketTypeArgument(),
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
  network: Network
): Promise<number> => {
  const payload = {
    function: `${mirageAddress()}::market::get_position_maintenance_margin_musd` as `${string}::${string}::${string}`,
    typeArguments: getPositionTypeArgument(),
    functionArguments: [positionObjectAddress, getDecimal8Argument(perpetualPrice), getDecimal8Argument(marginPrice)],
  }
  const ret = await aptosClient(network).view({ payload })
  return BigNumber(ret[0] as MoveUint64Type)
    .div(PRECISION_8)
    .toNumber()
}
