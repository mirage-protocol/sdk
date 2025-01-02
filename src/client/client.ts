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
    this.fungibleAsset = new FungibleAssetClient(config)
    this.oracles = new OracleClient(config)
    this.vaults = new VaultClient(this.fungibleAsset, this.oracles, config)
    this.market = new MarketClient(this.oracles, config)
    this.testnet = new TestnetClient(this.vaults, config)
    this.userProfile = new UserProfileClient(config)

    // Object.getOwnPropertyNames(MarketEntities.prototype).forEach((name) => {
    //   if (name !== 'constructor') {
    //     ;(this as any)[name] = this.marketEntities[name].bind(this.marketEntities)
    //   }
    // })
  }
}