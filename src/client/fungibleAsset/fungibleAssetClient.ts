import { FungibleAssetBase } from './fungibleAssetBase'
import { FungibleAssetViewsClient } from './fungibleAssetViews'

export class FungibleAssetClient extends FungibleAssetBase {
  public readonly views = new FungibleAssetViewsClient(this, this.aptosClient)
}
