import { Aptos, Network } from '@aptos-labs/ts-sdk'
import { Client } from 'urql'

import { MirageClientBase } from '../client/base'
import { MirageConfig } from '../utils/config'

export class BaseTransactions extends MirageClientBase {
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
}
