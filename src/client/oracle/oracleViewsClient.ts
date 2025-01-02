import { Aptos as AptosClient, MoveObjectType } from '@aptos-labs/ts-sdk'

import { allOraclesView, oracleNameView, oraclePriceMultiplierView, priceFeedIdView } from '../../views/oracleViews'
import { MirageClientBase } from '../base'

export class OracleViewsClient {
  private readonly base: MirageClientBase
  private readonly aptosClient: AptosClient

  constructor(base: MirageClientBase, aptosClient: AptosClient) {
    this.base = base
    this.aptosClient = aptosClient
  }

  public getAllOracles = async (): Promise<MoveObjectType[]> => {
    return allOraclesView(this.aptosClient, this.base.getDeployerAddress())
  }

  public getPriceFeedId = async (oracleObjectAddress: MoveObjectType): Promise<string> => {
    return priceFeedIdView(oracleObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getOracleName = async (oracleObjAddress: MoveObjectType): Promise<string> => {
    return oracleNameView(oracleObjAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getOraclePriceMultiplier = async (oracleObjAddress: MoveObjectType): Promise<number> => {
    return oraclePriceMultiplierView(oracleObjAddress, this.aptosClient, this.base.getDeployerAddress())
  }
}
