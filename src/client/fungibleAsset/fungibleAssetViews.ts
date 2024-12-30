import { Aptos as AptosClient } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { fATotalSupplyView, userAssetBalanceView } from '../../views'
import { FungibleAssetBase } from './fungibleAssetBase'

export class FungibleAssetViewsClient {
  private readonly base: FungibleAssetBase
  private readonly aptosClient: AptosClient

  constructor(base: FungibleAssetBase, aptosClient: AptosClient) {
    this.base = base
    this.aptosClient = aptosClient
  }
  public getUserAssetBalance = async (tokenSymbol: string, userAddress: string): Promise<BigNumber> => {
    const tokenMetadataAddress = this.base.getFAMetadataAddress(tokenSymbol)
    const coinType = this.base.getFACoinType(tokenSymbol)
    const tokenDecimals = this.base.getFADecimals(tokenSymbol)
    return await userAssetBalanceView(userAddress, tokenMetadataAddress, coinType, tokenDecimals, this.aptosClient)
  }

  public getFATotalSupply = async (tokenSymbol: string): Promise<BigNumber> => {
    const faMetadataAddress = this.base.getFAMetadataAddress(tokenSymbol)
    const faDecimals = this.base.getFADecimals(tokenSymbol)
    return await fATotalSupplyView(faMetadataAddress, faDecimals, this.aptosClient)
  }
}
