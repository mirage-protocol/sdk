import { Aptos, Network } from '@aptos-labs/ts-sdk'
import { Client } from 'urql'

import {
  defaultAptosClient,
  defaultAptosGraphqlClient,
  defaultMirageGraphqlClient,
  MirageConfig,
  mirageConfigFromNetwork,
} from '../utils/config'

export class MirageClientBase {
  protected network: Network
  protected aptosGraphqlClient: Client
  protected mirageGraphqlClient: Client
  protected aptosClient: Aptos
  protected config: MirageConfig

  constructor(
    network: Network,
    config?: MirageConfig,
    aptosClient?: Aptos,
    aptosGraphqlApiKey?: string,
    aptosGraphqlClient?: Client,
    mirageGraphqlClient?: Client,
  ) {
    this.network = network
    this.config = config || mirageConfigFromNetwork(network)
    this.aptosGraphqlClient = aptosGraphqlClient || defaultAptosGraphqlClient(network, aptosGraphqlApiKey)
    this.mirageGraphqlClient = mirageGraphqlClient || defaultMirageGraphqlClient(network)
    this.aptosClient = aptosClient || defaultAptosClient(network)
  }
}
