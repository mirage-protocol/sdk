import { InputViewFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'
import { cacheExchange, createClient, errorExchange, fetchExchange } from 'urql'

import {
  getAllVaultCollectionObjectAddresses,
  getCollectionIdForVaultPair,
  mirageAddress,
  MoveAsset,
  MoveToken,
} from '../constants'
import {
  GetTokenIdsFromCollectionByOwnerDocument,
  GetTokenIdsFromCollectionByOwnerQueryVariables,
  GetTokenIdsFromCollectionsByOwnerDocument,
  GetTokenIdsFromCollectionsByOwnerQueryVariables,
} from '../generated/graphql'
import { GetVaultCollectionAprDocument, GetVaultCollectionAprQueryVariables } from '../generated/mirage/graphql'

export const graphqlClient = createClient({
  url: 'https://api.testnet.aptoslabs.com/v1/graphql',
  exchanges: [
    fetchExchange,
    cacheExchange,
    errorExchange({
      onError: (error) => {
        console.error('GraphQL Error:', error)
      },
    }),
  ],
})

export const mirageGraphQlClient = createClient({
  url: 'https://api.mirage.money/v1/graphql',
  exchanges: [
    fetchExchange,
    cacheExchange,
    errorExchange({
      onError: (error) => {
        console.error('GraphQL Error:', error)
      },
    }),
  ],
})

const getVaultCollectionTypeArgument = (): `${string}::${string}::${string}`[] => {
  return [`${mirageAddress()}::vault::VaultCollection`]
}

export const getAllVaultIdsByOwner = async (owner: string): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionsByOwnerQueryVariables = {
    COLLECTIONS: getAllVaultCollectionObjectAddresses(),
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

export const getVaultTokenIdsByCollectionAndOwner = async (
  collateralAsset: MoveAsset,
  borrowToken: MoveToken,
  owner: string
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionByOwnerQueryVariables = {
    COLLECTION: getCollectionIdForVaultPair(collateralAsset, borrowToken),
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

export const getBorrowTokenFromCollection = async (
  collectionObject: MoveObjectType
): Promise<InputViewFunctionData> => {
  return {
    function: `${mirageAddress()}::vault::borrow_token`,
    functionArguments: [collectionObject],
    typeArguments: getVaultCollectionTypeArgument(),
  }
}

export const getCollateralTokenFromCollection = async (
  collectionObject: MoveObjectType
): Promise<InputViewFunctionData> => {
  return {
    function: `${mirageAddress()}::vault::collateral_token`,
    functionArguments: [collectionObject],
    typeArguments: getVaultCollectionTypeArgument(),
  }
}

export const getVaultCollectionAPR = async (beginDate: Date): Promise<{ apr: number; apy: number }> => {
  const variables: GetVaultCollectionAprQueryVariables = {
    prevDebtTimestamp: beginDate.toISOString(),
  }

  const result = await mirageGraphQlClient.query(GetVaultCollectionAprDocument, variables).toPromise()

  if (result.error) {
    console.error('GraphQL Error:', result.error)
    throw new Error(`GraphQL Error: ${result.error.message}`)
  }

  if (!result.data || result.data.prevDebt === undefined || result.data.currentDebt === undefined) {
    throw new Error('No data returned from GraphQL query')
  }

  if (result.data.prevDebt.length == 0 && result.data.currentDebt.length == 0) {
    return { apr: 0, apy: 0 }
  }

  /// Ownership value can be calculated as:
  /// base_part * total_elastic / total_base

  let lastBaseValue = BigNumber(1)
  if (result.data.prevDebt[0].debtBase > 0) {
    lastBaseValue = BigNumber(result.data.prevDebt[0].debtElastic).div(result.data.prevDebt[0].debtBase)
  }
  let currentBaseValue = BigNumber(1)
  if (result.data.currentDebt[0].debtBase > 0) {
    currentBaseValue = BigNumber(result.data.currentDebt[0].debtElastic).div(result.data.currentDebt[0].debtBase)
  }

  const interestEarned = currentBaseValue.minus(lastBaseValue).toNumber()
  const duration =
    new Date(result.data.currentDebt[0].transactionTimestamp).getTime() -
    new Date(result.data.prevDebt[0].transactionTimestamp).getTime()

  const year = 60 * 60 * 24 * 365 * 1000

  const apr = interestEarned / (duration / year)
  const apy = Math.exp(apr) - 1
  return {
    apr: apr * 100,
    apy: apy * 100,
  }
}

// export const getVaultCollection = async (
//   collateralAsset: MoveAsset,
//   borrowToken: MoveToken
// ): Promise<InputViewFunctionData> => {
//   return {
//     function: `${mirageAddress()}::vault::get_vault_collection`,
//     functionArguments: [moveAssetInfo(collateralAsset).metadataAddress, moveAssetInfo(borrowToken).metadataAddress],
//   }
// }
