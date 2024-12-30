import { Client as GqlClient } from 'urql'

import { allOwnedVaultAddressesQuery, ownedVaultAddressesByCollectionQuery, vaultCollectionAPRQuery } from '../../views'
import { MarketClientBase } from './vaultClientBase'

export class MarketQueriesClient {
  private readonly base: MarketClientBase
  private readonly aptosGqlClient: GqlClient

  constructor(base: MarketClientBase, aptosGqlClient: GqlClient) {
    this.base = base
    this.aptosGqlClient = aptosGqlClient
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
    const vaultCollectionAddresses = this.base.getMarketAddress(collateralSymbol, borrowSymbol)
    return await ownedVaultAddressesByCollectionQuery(vaultCollectionAddresses, ownerAddress, this.aptosGqlClient)
  }

  public getVaultCollectionAPR = async (perpSymbol: string, marginSymbol: string, beginDate: Date): Promise<number> => {
    const vaultObjectAddresses = this.base.getVaultAddress(perpSymbol, marginSymbol)
    return await vaultCollectionAPRQuery(beginDate, vaultObjectAddresses, this.aptosGqlClient)
  }
}
