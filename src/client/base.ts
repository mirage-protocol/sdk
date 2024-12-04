import { Aptos, Network } from '@aptos-labs/ts-sdk'
import { Client } from 'urql'

import {
  defaultAptosClient,
  defaultAptosGraphqlClient,
  defaultMirageGraphqlClient,
  MirageConfig,
  mirageConfigFromNetwork,
} from '../constants'

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

    if (config) {
      this.config = config
    } else {
      this.config = mirageConfigFromNetwork(network)
    }

    if (aptosGraphqlClient) {
      this.aptosGraphqlClient = aptosGraphqlClient
    } else {
      this.aptosGraphqlClient = defaultAptosGraphqlClient(network, aptosGraphqlApiKey)
    }

    if (mirageGraphqlClient) {
      this.mirageGraphqlClient = mirageGraphqlClient
    } else {
      this.mirageGraphqlClient = defaultMirageGraphqlClient(network)
    }

    if (aptosClient) {
      this.aptosClient = aptosClient
    } else {
      this.aptosClient = defaultAptosClient(network)
    }
  }
}
