import { Aptos, Network } from '@aptos-labs/ts-sdk'
import { Client } from 'urql'

import { Addresses, MirageConfig } from '../constants'
import { Assets } from '../constants/assets'
import { AssetEntities } from '../entities/assetEntities'
import { DistributorEntities } from '../entities/distributor/distributorEntities'
import { MarketEntities } from '../entities/market/marketEntities'
import { VaultEntities } from '../entities/vault/vaultEntities'
import { MarketTransactions, TestnetTransactions, VaultTransactions } from '../transactions'
import { AccountViews, MarketViews, TestnetViews, VaultViews } from '../views'
import { MirageClientBase } from './base'

export class MirageClient extends MirageClientBase {
  marketTransactions: MarketTransactions
  vaultTransactions: VaultTransactions
  testnetTransactions: TestnetTransactions

  accountViews: AccountViews
  marketViews: MarketViews
  vaultViews: VaultViews
  testnetViews: TestnetViews

  assets: Assets
  addresses: Addresses

  vaultEntities: VaultEntities
  assetEntities: AssetEntities
  marketEntities: MarketEntities
  distributorEntities: DistributorEntities

  constructor(
    network: Network,
    config?: MirageConfig,
    aptosClient?: Aptos,
    aptosGraphqlApiKey?: string,
    aptosGraphqlClient?: Client,
    mirageGraphqlClient?: Client,
  ) {
    super(network, config, aptosClient, aptosGraphqlApiKey, aptosGraphqlClient, mirageGraphqlClient)
    this.marketTransactions = new MarketTransactions(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.vaultTransactions = new VaultTransactions(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.testnetTransactions = new TestnetTransactions(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )

    this.marketViews = new MarketViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.vaultViews = new VaultViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.accountViews = new AccountViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.testnetViews = new TestnetViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )

    this.assets = new Assets(network, config, aptosClient, aptosGraphqlApiKey, aptosGraphqlClient, mirageGraphqlClient)
    this.addresses = new Addresses(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.assetEntities = new AssetEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.vaultEntities = new VaultEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.marketEntities = new MarketEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    this.distributorEntities = new DistributorEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
  }
}
