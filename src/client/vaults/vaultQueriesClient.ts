import { Client as GqlClient } from 'urql'

import { allOwnedVaultAddressesQuery, ownedVaultAddressesByCollectionQuery, vaultCollectionAPRQuery } from '../../views'
import { VaultClientBase } from './vaultClientBase'

export class VaultQueriesClient {
  private readonly base: VaultClientBase
  private readonly aptosGqlClient: GqlClient
  private readonly mirageGqlClient: GqlClient

  constructor(base: VaultClientBase, aptosGqlClient: GqlClient, mirageGqlClient: GqlClient) {
    this.base = base
    this.aptosGqlClient = aptosGqlClient
    this.mirageGqlClient = mirageGqlClient
  }

  public getAllOwnedVaultAddresses = async (ownerAddress: string): Promise<string[]> => {
    const allVaultCollectionAddresses = this.base.getAllVaultCollectionAddresses()
    return await allOwnedVaultAddressesQuery(ownerAddress, allVaultCollectionAddresses, this.aptosGqlClient)
  }

  public getOwnedVaultAddressesByCollection = async (
    collateralSymbol: string,
    borrowSymbol: string,
    ownerAddress: string,
  ): Promise<string[]> => {
    const vaultCollectionAddresses = this.base.getVaultCollectionAddress(collateralSymbol, borrowSymbol)
    return await ownedVaultAddressesByCollectionQuery(vaultCollectionAddresses, ownerAddress, this.aptosGqlClient)
  }

  public getVaultCollectionAPR = async (
    collateralSymbol: string,
    borrowSymbol: string,
    beginDate: Date,
  ): Promise<number> => {
    const vaultObjectAddresses = this.base.getVaultCollectionAddress(collateralSymbol, borrowSymbol)
    return await vaultCollectionAPRQuery(beginDate, vaultObjectAddresses, this.mirageGqlClient)
  }
}
