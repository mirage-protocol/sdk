import { Aptos as AptosClient, MoveObjectType } from '@aptos-labs/ts-sdk'

import {
  allVaultCollectionsView,
  borrowOracleView,
  borrowTokenView,
  collateralTokenView,
  liquidatableAmountsBulkView,
  vaultCollectionNameView,
} from '../../views'
import { VaultClientBase } from './vaultClientBase'

export class VaultViewsClient {
  private readonly base: VaultClientBase
  private readonly aptosClient: AptosClient

  constructor(base: VaultClientBase, aptosClient: AptosClient) {
    this.base = base
    this.aptosClient = aptosClient
  }

  public allVaultCollectionAddresses = async (): Promise<MoveObjectType[]> => {
    return await allVaultCollectionsView(this.aptosClient, this.base.getDeployerAddress())
  }

  public getCollateralTokenAddress = async (collectionObjectAddress: MoveObjectType): Promise<MoveObjectType> => {
    return await collateralTokenView(collectionObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getBorrowToken = async (collectionObjectAddress: MoveObjectType): Promise<MoveObjectType> => {
    return await borrowTokenView(collectionObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getCollateralOracle = async (collectionObjectAddress: MoveObjectType): Promise<MoveObjectType> => {
    return await collateralTokenView(collectionObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getBorrowOracle = async (collectionObjectAddress: MoveObjectType): Promise<MoveObjectType> => {
    return await borrowOracleView(collectionObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getVaultCollectionName = async (collectionObjectAddress: MoveObjectType): Promise<string> => {
    return await vaultCollectionNameView(collectionObjectAddress, this.aptosClient)
  }

  public getLiquidatableAmountsBulk = async (vaultObjectAddresses: MoveObjectType[], exchangeRate: number): Promise<number[]> => {
    return await liquidatableAmountsBulkView(vaultObjectAddresses, this.aptosClient, this.base.getDeployerAddress(), exchangeRate)
  }
}
