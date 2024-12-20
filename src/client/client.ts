import { Aptos, Network } from '@aptos-labs/ts-sdk'
import { Client } from 'urql'

import { Addresses } from '../constants'
import { Assets } from '../constants/assets'
import { AssetEntities } from '../entities/assetEntities'
import { MarketEntities } from '../entities/market/marketEntities'
import { VaultEntities } from '../entities/vault/vaultEntities'
import { MarketTransactions, TestnetTransactions, VaultTransactions } from '../transactions'
import { ReferralTransactions } from '../transactions/referralTransactions'
import { MirageConfig } from '../utils/config'
import { AccountViews, MarketViews, OracleViews, TestnetViews, VaultViews } from '../views'
import { ReferralViews } from '../views/referralViews'

export class MirageClient {
  marketTransactions: MarketTransactions
  vaultTransactions: VaultTransactions
  referralTransactions: ReferralTransactions
  testnetTransactions: TestnetTransactions

  accountViews: AccountViews
  marketViews: MarketViews
  vaultViews: VaultViews
  oracleViews: OracleViews
  referralViews: ReferralViews
  testnetViews: TestnetViews

  assets: Assets
  addresses: Addresses

  vaultEntities: VaultEntities
  assetEntities: AssetEntities
  marketEntities: MarketEntities

  constructor(
    network: Network,
    config?: MirageConfig,
    aptosClient?: Aptos,
    aptosGraphqlApiKey?: string,
    aptosGraphqlClient?: Client,
    mirageGraphqlClient?: Client,
  ) {
    const params = [network, config, aptosClient, aptosGraphqlApiKey, aptosGraphqlClient, mirageGraphqlClient] as const
    this.marketTransactions = new MarketTransactions(...params)
    // Object.getOwnPropertyNames(MarketTransactions.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.marketTransactions[name].bind(this.marketTransactions)
    //   }
    // })
    this.vaultTransactions = new VaultTransactions(...params)
    // Object.getOwnPropertyNames(VaultTransactions.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.vaultTransactions[name].bind(this.vaultTransactions)
    //   }
    // })
    this.referralTransactions = new ReferralTransactions(...params)
    // Object.getOwnPropertyNames(ReferralTransactions.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.referralTransactions[name].bind(this.referralTransactions)
    //   }
    // })
    this.testnetTransactions = new TestnetTransactions(...params)
    // Object.getOwnPropertyNames(TestnetTransactions.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.testnetTransactions[name].bind(this.testnetTransactions)
    //   }
    // })

    this.oracleViews = new OracleViews(...params)
    this.marketViews = new MarketViews(...params)
    // Object.getOwnPropertyNames(MarketViews.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.marketViews[name].bind(this.marketViews)
    //   }
    // })
    this.vaultViews = new VaultViews(...params)
    // Object.getOwnPropertyNames(VaultViews.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.vaultViews[name].bind(this.vaultViews)
    //   }
    // })
    this.accountViews = new AccountViews(...params)
    // Object.getOwnPropertyNames(AccountViews.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.accountViews[name].bind(this.accountViews)
    //   }
    // })
    this.referralViews = new ReferralViews(...params)
    // Object.getOwnPropertyNames(ReferralViews.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.referralViews[name].bind(this.referralViews)
    //   }
    // })
    this.testnetViews = new TestnetViews(...params)
    // Object.getOwnPropertyNames(TestnetViews.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.testnetViews[name].bind(this.testnetViews)
    //   }
    // })

    this.assets = new Assets(network, config, aptosClient, aptosGraphqlApiKey, aptosGraphqlClient, mirageGraphqlClient)
    // Object.getOwnPropertyNames(Assets.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.assets[name].bind(this.assets)
    //   }
    // })
    this.addresses = new Addresses(...params)
    // Object.getOwnPropertyNames(Addresses.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.addresses[name].bind(this.addresses)
    //   }
    // })
    this.assetEntities = new AssetEntities(...params)
    // Object.getOwnPropertyNames(AssetEntities.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.assetEntities[name].bind(this.assetEntities)
    //   }
    // })
    this.vaultEntities = new VaultEntities(...params)
    // Object.getOwnPropertyNames(VaultEntities.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.vaultEntities[name].bind(this.vaultEntities)
    //   }
    // })
    this.marketEntities = new MarketEntities(...params)
    // Object.getOwnPropertyNames(MarketEntities.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.marketEntities[name].bind(this.marketEntities)
    //   }
    // })
  }
}
