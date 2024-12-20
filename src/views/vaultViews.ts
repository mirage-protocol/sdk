import { AccountAddress, Aptos, InputViewFunctionData, MoveObjectType, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  getAllVaultCollectionObjectAddresses,
  getCollectionIdForVaultPair,
  getModuleAddress,
  MoveAsset,
  MoveModules,
  MoveToken,
  PRECISION_8,
} from '../constants'
import { Rebase } from '../entities'
import {
  GetTokenIdsFromCollectionByOwnerDocument,
  GetTokenIdsFromCollectionByOwnerQueryVariables,
  GetTokenIdsFromCollectionsByOwnerDocument,
  GetTokenIdsFromCollectionsByOwnerQueryVariables,
} from '../generated/aptos/graphql'
import { GetVaultCollectionAprDocument, GetVaultCollectionAprQueryVariables } from '../generated/mirage/graphql'
import { BaseViews } from './baseViews'

export class VaultViews extends BaseViews {
  async getAllVaultCollections(): Promise<MoveObjectType[]> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::all_vault_collections` as `${string}::${string}::${string}`,
      functionArguments: [],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }[]
    return result.map((value) => value.inner)
  }

  async getCollateralToken(vaultObj: MoveObjectType): Promise<MoveObjectType> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::collateral_token` as `${string}::${string}::${string}`,
      functionArguments: [vaultObj],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }
    return result.inner
  }

  async getBorrowToken(vaultObj: MoveObjectType): Promise<MoveObjectType> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::borrow_token` as `${string}::${string}::${string}`,
      functionArguments: [vaultObj],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }
    return result.inner
  }

  async getCollateralOracle(vaultObj: MoveObjectType): Promise<MoveObjectType> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::collateral_oracle` as `${string}::${string}::${string}`,
      functionArguments: [vaultObj],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }
    return result.inner
  }

  async getBorrowOracle(vaultObj: MoveObjectType): Promise<MoveObjectType> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::borrow_oracle` as `${string}::${string}::${string}`,
      functionArguments: [vaultObj],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }
    return result.inner
  }

  async getVaultCollectionName(collectionObj: MoveObjectType): Promise<MoveObjectType> {
    const payload = {
      function: `0x4::collection::name` as `${string}::${string}::${string}`,
      functionArguments: [collectionObj],
      typeArguments: ['0x4::collection::Collection'],
    }
    return (await this.aptosClient.view({ payload }))[0] as string
  }

  async getAllVaultIdsByOwner(owner: string): Promise<string[]> {
    const variables: GetTokenIdsFromCollectionsByOwnerQueryVariables = {
      COLLECTIONS: getAllVaultCollectionObjectAddresses(this.config),
      OWNER: owner,
    }
    try {
      const result = await this.aptosGraphqlClient
        .query(GetTokenIdsFromCollectionsByOwnerDocument, variables)
        .toPromise()

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

  async getVaultTokenIdsByCollectionAndOwner(
    collateralAsset: MoveAsset,
    borrowToken: MoveToken,
    owner: string,
  ): Promise<string[]> {
    const variables: GetTokenIdsFromCollectionByOwnerQueryVariables = {
      COLLECTION: getCollectionIdForVaultPair(collateralAsset, borrowToken, this.config),
      OWNER: owner,
    }
    try {
      const result = await this.aptosGraphqlClient
        .query(GetTokenIdsFromCollectionByOwnerDocument, variables)
        .toPromise()

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

  async getBorrowTokenFromCollection(collectionObject: MoveObjectType): Promise<InputViewFunctionData> {
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::borrow_token`,
      functionArguments: [collectionObject],
    }
  }

  async getCollateralTokenFromCollection(collectionObject: MoveObjectType): Promise<InputViewFunctionData> {
    return {
      function: `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::vault::collateral_token`,
      functionArguments: [collectionObject],
    }
  }

  async getVaultCollectionAPR(beginDate: Date, collectionId: AccountAddress): Promise<number> {
    const variables: GetVaultCollectionAprQueryVariables = {
      prevDebtTimestamp: beginDate.toISOString(),
      collectionId: collectionId.toStringLong(),
    }

    const result = await this.mirageGraphqlClient.query(GetVaultCollectionAprDocument, variables).toPromise()

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

  async getLiquidatableAmountsBulk(vaultObjectAddresses: MoveObjectType[], client: Aptos): Promise<number[]> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.KEEPER_SCRIPTS, this.config.deployerAddress)}::vault_scripts::get_liquidatable_amounts_bulk` as `${string}::${string}::${string}`,
      functionArguments: [vaultObjectAddresses],
    }
    const ret = await client.view({ payload })
    return (ret as any)[0].map((r) =>
      BigNumber(r as MoveUint64Type)
        .div(PRECISION_8)
        .toNumber(),
    )
  }
}
