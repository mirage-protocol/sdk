import { InputViewFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'
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

// export const getVaultCollection = async (
//   collateralAsset: MoveAsset,
//   borrowToken: MoveToken
// ): Promise<InputViewFunctionData> => {
//   return {
//     function: `${mirageAddress()}::vault::get_vault_collection`,
//     functionArguments: [moveAssetInfo(collateralAsset).metadataAddress, moveAssetInfo(borrowToken).metadataAddress],
//   }
// }
