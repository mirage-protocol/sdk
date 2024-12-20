import { MoveObjectType } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules } from '../constants'
import { BaseViews } from './baseViews'

export class OracleViews extends BaseViews {
  async getAllOracles(): Promise<MoveObjectType[]> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_ORACLE, this.config.deployerAddress)}::oracle::all_oracles` as `${string}::${string}::${string}`,
      functionArguments: [],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }[]
    return result.map((value) => value.inner)
  }

  async getPriceFeedId(oracleObj: MoveObjectType): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_ORACLE, this.config.deployerAddress)}::oracle::get_price_feed_id` as `${string}::${string}::${string}`,
      functionArguments: [oracleObj],
    }
    return (await this.aptosClient.view({ payload }))[0] as string
  }

  async getOracleName(oracleObj: MoveObjectType): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_ORACLE, this.config.deployerAddress)}::oracle::get_name` as `${string}::${string}::${string}`,
      functionArguments: [oracleObj],
    }
    return (await this.aptosClient.view({ payload }))[0] as string
  }

  async getOraclePriceMultiplier(oracleObj: MoveObjectType): Promise<number> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_ORACLE, this.config.deployerAddress)}::oracle::get_price_multiplier` as `${string}::${string}::${string}`,
      functionArguments: [oracleObj],
    }
    return BigNumber((await this.aptosClient.view({ payload }))[0] as string).toNumber()
  }
}
