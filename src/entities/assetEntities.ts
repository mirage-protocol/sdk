import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { MoveAsset, MoveToken } from '../constants'
import { Asset } from './asset'
import { BaseEntities } from './baseEntities'
import { MirageAsset } from './mirage_asset'
import { Rebase } from './rebase'

export class AssetEntities extends BaseEntities {
  createAsset(balance: BigNumber, asset: MoveAsset | string): Asset {
    return new Asset(balance, asset, this.config, this.aptosClient)
  }

  createMirageAsset(tokenObjectResources: MoveResource[], debt: MoveToken | string): MirageAsset {
    return new MirageAsset(tokenObjectResources, debt, this.config)
  }

  createRebase(elastic: BigNumber, base: BigNumber): Rebase {
    return new Rebase(elastic, base)
  }
}
