import { AccountAddress, Aptos as AptosClient, AptosConfig } from '@aptos-labs/ts-sdk'
import { AptosPriceServiceConnection as PythClient } from '@pythnetwork/pyth-aptos-js'
import { Client as GqlClient } from 'urql'

import { createGraphqlClient, createGraphqlClientWithUri, createPythClient } from '../utils'
import {
  getDefaultFullnodeUrl,
  getDefaultIndexerUrl,
  getDefaultMirageIndexerUrl,
  getDefaultPythUrl,
  getDeploymentByChainId,
  MirageClientOptions,
  MirageConfig,
} from '../utils/config'

export class MirageClientBase {
  protected config: MirageConfig
  protected aptosClient: AptosClient
  protected aptosGqlClient: GqlClient
  protected mirageGqlClient: GqlClient
  protected pythClient: PythClient

  constructor(config: MirageConfig, options?: MirageClientOptions) {
    if (!options) {
      options = {}
    }
    if (!options.fullnodeUrl) {
      const deployment = getDeploymentByChainId(config.chainId)
      options.fullnodeUrl = getDefaultFullnodeUrl(deployment)
    }
    if (!options.indexerUrl) {
      const deployment = getDeploymentByChainId(config.chainId)
      options.indexerUrl = getDefaultIndexerUrl(deployment)
    }
    if (!options.mirageIndexerUrl) {
      const deployment = getDeploymentByChainId(config.chainId)
      options.mirageIndexerUrl = getDefaultMirageIndexerUrl(deployment)
    }
    if (!options.pythUrl) {
      const deployment = getDeploymentByChainId(config.chainId)
      options.pythUrl = getDefaultPythUrl(deployment)
    }

    this.config = config
    this.aptosClient = new AptosClient(
      new AptosConfig({
        fullnode: options.fullnodeUrl,
        indexer: options.indexerUrl,
        clientConfig: { API_KEY: options.aptosApiKey },
      }),
    )
    this.aptosGqlClient = createGraphqlClientWithUri(options.indexerUrl, options.aptosApiKey)
    this.mirageGqlClient = createGraphqlClient(options.mirageIndexerUrl)
    this.pythClient = createPythClient(options.pythUrl!)
  }

  public getDeployerAddress = (): AccountAddress => {
    return this.config.deployerAddress
  }
}
