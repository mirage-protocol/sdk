import { Network } from '@aptos-labs/ts-sdk'
import { Client } from 'urql'

import { mirageAddress } from '../constants'
import { GetCollectionsByOwnerDocument, GetCollectionsByOwnerQueryVariables } from '../generated/aptos/graphql'

export type CollectionInfo = {
  collection_name: string
  collection_id: string
}

export const getCollectionsFromMirage = async (graphqlClient: Client, network: Network): Promise<CollectionInfo[]> => {
  const variables: GetCollectionsByOwnerQueryVariables = {
    OWNER: mirageAddress(network).toString(),
  }
  try {
    const result = await graphqlClient.query(GetCollectionsByOwnerDocument, variables).toPromise()

    if (result.error) {
      console.error('GraphQL Error:', result.error)
      throw new Error(`GraphQL Error: ${result.error.message}`)
    }

    if (!result.data) {
      throw new Error('No data returned from GraphQL query')
    }
    return result.data.current_collections_v2
  } catch (error) {
    return []
  }
}
