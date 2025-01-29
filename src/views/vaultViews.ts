import { AccountAddress, Aptos as AptosClient, MoveObjectType, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'
import { Client as GqlClient } from 'urql'

import { Rebase } from '../entities'
import {
  GetTokenIdsFromCollectionByOwnerDocument,
  GetTokenIdsFromCollectionByOwnerQueryVariables,
  GetTokenIdsFromCollectionsByOwnerDocument,
  GetTokenIdsFromCollectionsByOwnerQueryVariables,
} from '../generated/aptos/graphql'
import { GetVaultCollectionAprDocument, GetVaultCollectionAprQueryVariables } from '../generated/mirage/graphql'
import { getModuleAddress, MoveModules, PRECISION_8 } from '../utils'

export const allVaultCollectionsView = async (
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::all_vault_collections` as `${string}::${string}::${string}`,
    functionArguments: [],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }[]
  return result.map((value) => value.inner)
}

export const collateralTokenView = async (
  collectionObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::collateral_token` as `${string}::${string}::${string}`,
    functionArguments: [collectionObjectAddress],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }
  return result.inner
}

export const borrowTokenView = async (
  collectionObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::borrow_token` as `${string}::${string}::${string}`,
    functionArguments: [collectionObjectAddress],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }
  return result.inner
}

export const collateralOracleView = async (
  collectionObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::collateral_oracle` as `${string}::${string}::${string}`,
    functionArguments: [collectionObjectAddress],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }
  return result.inner
}

export const borrowOracleView = async (
  collectionObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::vault::borrow_oracle` as `${string}::${string}::${string}`,
    functionArguments: [collectionObjectAddress],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }
  return result.inner
}

export const vaultCollectionNameView = async (
  collectionObjectAddress: MoveObjectType,
  aptosClient: AptosClient,
): Promise<MoveObjectType> => {
  const payload = {
    function: `0x4::collection::name` as `${string}::${string}::${string}`,
    functionArguments: [collectionObjectAddress],
    typeArguments: ['0x4::collection::Collection'],
  }
  return (await aptosClient.view({ payload }))[0] as string
}

export const liquidatableAmountsBulkView = async (
  vaultObjectAddresses: MoveObjectType[],
  client: AptosClient,
  deployerAddress: AccountAddress,
  exchangeRate: number,
): Promise<number[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.KEEPER_SCRIPTS, deployerAddress)}::vault_scripts::get_borrow_amount_of_vault_liquidatable_same_collection` as `${string}::${string}::${string}`,
    functionArguments: [vaultObjectAddresses, exchangeRate],
  }
  const ret = await client.view({ payload })
  return (ret as any)[0].map((r) =>
    BigNumber(r as MoveUint64Type)
      .div(PRECISION_8)
      .toNumber(),
  )
}

export const allOwnedVaultAddressesQuery = async (
  owner: string,
  allVaultCollectionAddresses: MoveObjectType[],
  aptosGqlClient: GqlClient,
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionsByOwnerQueryVariables = {
    COLLECTIONS: allVaultCollectionAddresses,
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

export const ownedVaultAddressesByCollectionQuery = async (
  collectionObjectAddress: MoveObjectType,
  owner: string,
  aptosGqlClient: GqlClient,
): Promise<string[]> => {
  const variables: GetTokenIdsFromCollectionByOwnerQueryVariables = {
    COLLECTION: collectionObjectAddress,
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

    const tokenIds = result.data.current_token_datas_v2.map((tokenData) => tokenData.token_data_id)
    return tokenIds
  } catch (error) {
    return []
  }
}

export const vaultCollectionAPRQuery = async (
  beginDate: Date,
  collectionObjectAddresses: MoveObjectType,
  mirageGqlClient: GqlClient,
): Promise<number> => {
  const variables: GetVaultCollectionAprQueryVariables = {
    prevDebtTimestamp: beginDate.toISOString(),
    collectionId: AccountAddress.fromString(collectionObjectAddresses).toStringLong(),
  }

  const result = await mirageGqlClient.query(GetVaultCollectionAprDocument, variables).toPromise()

  if (result.error) {
    console.error('GraphQL Error:', result.error)
    throw new Error(`GraphQL Error: ${result.error.message}`)
  }

  if (!result.data || result.data.prevDebt === undefined || result.data.currentDebt === undefined) {
    throw new Error('No data returned from GraphQL query')
  }

  if (result.data.prevDebt.length == 0 || result.data.currentDebt.length == 0) {
    return 0
  }

  /// Ownership value can be calculated as:
  /// base_part * total_elastic / total_base

  const prevDebt = result.data.prevDebt[0]
  const currentDebt = result.data.currentDebt[0]

  const prevGlobalRebase = new Rebase(
    BigNumber(prevDebt.globalDebt.debtElastic),
    BigNumber(prevDebt.globalDebt.debtBase),
  )
  const currentGlobalRebase = new Rebase(
    BigNumber(currentDebt.globalDebt.debtElastic),
    BigNumber(currentDebt.globalDebt.debtBase),
  )

  const collectionPrevDebt = prevGlobalRebase
    .toElastic(BigNumber(prevDebt.borrowElastic), true)
    .div(prevDebt.borrowBase)
  const collectionCurrentDebt = currentGlobalRebase
    .toElastic(BigNumber(currentDebt.borrowElastic), true)
    .div(currentDebt.borrowBase)

  const interestEarned = collectionPrevDebt.minus(collectionCurrentDebt).div(collectionCurrentDebt)

  const duration =
    new Date(result.data.currentDebt[0].transactionTimestamp).getTime() -
    new Date(result.data.prevDebt[0].transactionTimestamp).getTime()

  // only one data point
  if (duration == 0) {
    return 0
  }

  const year = 60 * 60 * 24 * 365 * 1000

  return interestEarned
    .div(duration / year)
    .times(100)
    .toNumber()
}
