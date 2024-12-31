import { MirageConfig } from '../utils/config'
import { FungibleAssetClient } from './fungibleAsset/fungibleAssetClient'
import { MarketClient } from './market/marketClient'
import { OracleClient } from './oracle/oracleClient'
import { TestnetClient } from './testnet/testnetClient'
import { UserProfileClient } from './userProfile/userProfileClient'
import { VaultClient } from './vaults/vaultClient'

export class MirageClient {
  fungibleAsset: FungibleAssetClient
  oracles: OracleClient
  vaults: VaultClient
  market: MarketClient

  testnet: TestnetClient
  userProfile: UserProfileClient

  constructor(config: MirageConfig) {
    const params = [config] as const

    this.fungibleAsset = new FungibleAssetClient(...params)
    this.oracles = new OracleClient(...params)
    this.vaults = new VaultClient(this.fungibleAsset, this.oracles, ...params)
    this.market = new MarketClient(this.oracles, ...params)
    this.testnet = new TestnetClient(this.vaults, ...params)
    this.userProfile = new UserProfileClient(...params)

    // Object.getOwnPropertyNames(MarketEntities.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.marketEntities[name].bind(this.marketEntities)
    //   }
    // })
  }
}
