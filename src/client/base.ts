import { AccountAddress, Aptos as AptosClient, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { AptosPriceServiceConnection as PythClient } from '@pythnetwork/pyth-aptos-js'
import { Client as GqlClient } from 'urql'

import { createGraphqlClient, createGraphqlClientWithUri, createPythClient } from '../utils'
import { MirageConfig } from '../utils/config'

export class MirageClientBase {
  protected config: MirageConfig
  protected aptosClient: AptosClient
  protected aptosGqlClient: GqlClient
  protected mirageGqlClient: GqlClient
  protected pythClient: PythClient

  constructor(config: MirageConfig) {
    this.config = config
    let network = Network.TESTNET
    if (config.chainId === 1) {
      network = Network.MAINNET
    } else if (config.chainId === 126) {
      network = Network.CUSTOM
    }

    this.aptosClient = new AptosClient(
      new AptosConfig({
        fullnode: config.fullnodeUrl,
        indexer: config.indexerUrl,
        clientConfig: { API_KEY: config.aptosApiKey },
        network,
      }),
    )
    this.aptosGqlClient = createGraphqlClientWithUri(config.indexerUrl, config.aptosApiKey)
    this.mirageGqlClient = createGraphqlClient(config.mirageIndexerUrl)
    this.pythClient = createPythClient(config.pythUrl)
  }

  public getDeployerAddress = (): AccountAddress => {
    return this.config.deployerAddress
  }
}
