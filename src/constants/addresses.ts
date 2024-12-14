import { mirageAddress } from './accounts'
import {
  getAllMarketObjectAddresses,
  getAllVaultCollectionObjectAddresses,
  getAssetTokenMetadata,
  getCollectionIdForPerpPair,
  getCollectionIdForVaultPair,
  getPairFromMarketAddress,
  getPairFromVaultCollectionAddress,
  MoveAsset,
  MoveToken,
  Perpetual,
} from './assetList'
import { BaseConstants } from './baseConstants'

export class Addresses extends BaseConstants {
  getAllVaultCollectionObjectAddresses(): string[] {
    return getAllVaultCollectionObjectAddresses(this.config)
  }

  getAllMarketObjectAddresses(): string[] {
    return getAllMarketObjectAddresses(this.config)
  }

  getPairFromMarketAddress(marketObjectAddress: string): { marginToken: MoveToken; perp: Perpetual } {
    return getPairFromMarketAddress(marketObjectAddress, this.config)
  }

  getPairFromVaultCollectionAddress(vaultObjectAddress: string): { collateralAsset: MoveAsset; borrow: MoveToken } {
    return getPairFromVaultCollectionAddress(vaultObjectAddress, this.config)
  }

  getCollectionIdForPerpPair(marginToken: MoveToken, perp: Perpetual): string {
    return getCollectionIdForPerpPair(marginToken, perp, this.config)
  }

  getCollectionIdForVaultPair(collateralAsset: MoveAsset, borrowToken: MoveToken): string {
    return getCollectionIdForVaultPair(collateralAsset, borrowToken, this.config)
  }

  getAssetTokenMetadata(asset: MoveAsset): string {
    return getAssetTokenMetadata(asset, this.config)
  }

  mirageAddress(): string {
    return mirageAddress(this.config).toStringLong()
  }
}
