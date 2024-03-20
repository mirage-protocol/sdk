import { InputViewRequestData } from '@aptos-labs/ts-sdk'

import { mirageAddress, MoveAsset, moveAssetInfo, MoveToken } from '../constants'
import { cacheExchange, createClient, errorExchange, fetchExchange } from 'urql';

export const graphqlClient = createClient({
  url: 'YOUR_GRAPHQL_API_ENDPOINT',
  exchanges: [fetchExchange, cacheExchange, errorExchange({
    onError: (error) => {
      console.error('GraphQL Error:', error);
    }
  }),]
});

export const getVaultCollection = async (
  collateralAsset: MoveAsset,
  borrowToken: MoveToken
): Promise<InputViewRequestData> => {
  return {
    function: `${mirageAddress()}::vault::get_vault_collection`,
    functionArguments: [moveAssetInfo(collateralAsset).metadataAddress, moveAssetInfo(borrowToken).metadataAddress],
  }
}

export const getVaultTokenIdsByCollectionAndOnwer = async (
  collateralAsset: MoveAsset,
  borrowToken: MoveToken
  owner: string
): Promise<string[]> => {
  
}
