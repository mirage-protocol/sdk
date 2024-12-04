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
    Object.getOwnPropertyNames(MarketTransactions.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.marketTransactions[name].bind(this.marketTransactions)
      }
    })
    this.vaultTransactions = new VaultTransactions(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(VaultTransactions.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.vaultTransactions[name].bind(this.vaultTransactions)
      }
    })
    this.testnetTransactions = new TestnetTransactions(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(TestnetTransactions.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.testnetTransactions[name].bind(this.testnetTransactions)
      }
    })

    this.marketViews = new MarketViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(MarketViews.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.marketViews[name].bind(this.marketViews)
      }
    })
    this.vaultViews = new VaultViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(VaultViews.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.vaultViews[name].bind(this.vaultViews)
      }
    })
    this.accountViews = new AccountViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(AccountViews.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.accountViews[name].bind(this.accountViews)
      }
    })
    this.testnetViews = new TestnetViews(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(TestnetViews.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.testnetViews[name].bind(this.testnetViews)
      }
    })

    this.assets = new Assets(network, config, aptosClient, aptosGraphqlApiKey, aptosGraphqlClient, mirageGraphqlClient)
    Object.getOwnPropertyNames(Assets.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.assets[name].bind(this.assets)
      }
    })
    this.addresses = new Addresses(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(Addresses.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.addresses[name].bind(this.addresses)
      }
    })
    this.assetEntities = new AssetEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(AssetEntities.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.assetEntities[name].bind(this.assetEntities)
      }
    })
    this.vaultEntities = new VaultEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(VaultEntities.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.vaultEntities[name].bind(this.vaultEntities)
      }
    })
    this.marketEntities = new MarketEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(MarketEntities.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.marketEntities[name].bind(this.marketEntities)
      }
    })
    this.distributorEntities = new DistributorEntities(
      network,
      config,
      aptosClient,
      aptosGraphqlApiKey,
      aptosGraphqlClient,
      mirageGraphqlClient,
    )
    Object.getOwnPropertyNames(DistributorEntities.prototype).forEach((name) => {
      if (name !== 'constructor') {
        ;(this as any)[name] = this.distributorEntities[name].bind(this.distributorEntities)
      }
    })
  }
}
