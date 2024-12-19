import { Client } from 'urql'

import { getModuleAddress, MoveModules } from '../constants'
import { GetCollectionsByOwnerDocument, GetCollectionsByOwnerQueryVariables } from '../generated/aptos/graphql'
import { MirageConfig } from './config'

export type CollectionInfo = {
  collection_name: string
  collection_id: string
}

export const getCollectionsFromMirage = async (
  graphqlClient: Client,
  config: MirageConfig,
): Promise<CollectionInfo[]> => {
  const variables: GetCollectionsByOwnerQueryVariables = {
    OWNER: getModuleAddress(MoveModules.MIRAGE, config.deployerAddress).toString(),
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
