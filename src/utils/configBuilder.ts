import { Client } from 'urql'

import { mirageAddress, MirageConfig } from '../constants'
import { GetCollectionsByOwnerDocument, GetCollectionsByOwnerQueryVariables } from '../generated/aptos/graphql'

export type CollectionInfo = {
  collection_name: string
  collection_id: string
}

export const getCollectionsFromMirage = async (
  graphqlClient: Client,
  config: MirageConfig,
): Promise<CollectionInfo[]> => {
  const variables: GetCollectionsByOwnerQueryVariables = {
    OWNER: mirageAddress(config).toString(),
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
