import { Aptos, MoveObjectType, Network } from '@aptos-labs/ts-sdk'
import { Client } from 'urql'

import { MirageClientBase } from '../client/base'
import { getModuleAddress, MoveModules } from '../constants'
import { MirageConfig } from '../utils/config'

export class BaseViews extends MirageClientBase {
  constructor(
    network: Network,
    config?: MirageConfig,
    aptosClient?: Aptos,
    aptosGraphqlApiKey?: string,
    aptosGraphqlClient?: Client,
    mirageGraphqlClient?: Client,
  ) {
    super(network, config, aptosClient, aptosGraphqlApiKey, aptosGraphqlClient, mirageGraphqlClient)
  }

  public async getAllMirageAssets(): Promise<MoveObjectType[]> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_CORE, this.config.deployerAddress)}::registry::all_mirage_assets` as `${string}::${string}::${string}`,
      functionArguments: [],
    }
    const result = (await this.aptosClient.view({ payload }))[0] as { inner: string }[]
    return result.map((value) => value.inner)
  }
}
