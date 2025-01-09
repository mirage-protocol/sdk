import { getPrice, getPriceFeedUpdateData } from '../../utils'
import { MirageClientBase } from '../base'

export class OracleClientBase extends MirageClientBase {
  public getAllOracleNames = (): string[] => {
    return Object.keys(this.config.oracles)
  }

  public getOracleNameFromAddress = (oracleObjectAddress: string): string => {
    const oracleName = Object.entries(this.config.oracles).find(
      ([, oracleConfig]) => oracleConfig.address === oracleObjectAddress,
    )?.[0]
    if (!oracleName) {
      throw new Error(`oracle not found ${oracleObjectAddress}`)
    }
    return oracleName
  }

  public getPriceFeedId = (oracleName: string): string => {
    const oracle = this.config.oracles[oracleName]
    if (!oracle) {
      throw new Error(`oracle not found ${oracleName}`)
    }
    return oracle.priceFeedId
  }

  public getPriceFeedUpdateData = async (oracleName: string): Promise<number[]> => {
    const priceFeedId = this.getPriceFeedId(oracleName)
    return await getPriceFeedUpdateData(priceFeedId, this.pythClient)
  }

  public getPrice = async (oracleName: string): Promise<number> => {
    const priceFeedId = this.getPriceFeedId(oracleName)
    return await getPrice(priceFeedId, this.pythClient)
  }
}
