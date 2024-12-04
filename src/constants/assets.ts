import BigNumber from 'bignumber.js'

import { MirageClientBase } from '../client/base'
import {
  assetBalanceToDecimal,
  AssetInfo,
  assetInfo,
  getTypeFromMoveAsset,
  mirageAssetList,
  MoveAsset,
  MoveAssetInfo,
  moveAssetInfo,
  MoveCoin,
  MoveToken,
  Perpetual,
  typeToMoveCoin,
  typeToMoveToken,
  typeToPerpetual,
} from './assetList'

export class Assets extends MirageClientBase {
  getTypeFromMoveAsset(asset: MoveAsset): string {
    return getTypeFromMoveAsset(asset)
  }

  /**
   * Get info about a specific asset
   * @param coin the MoveToken to get info for
   * @returns the AssetInfo for the specific coin
   */
  assetInfo(asset: MoveAsset | Perpetual | string): AssetInfo {
    return assetInfo(asset, this.config)
  }

  /**
   * Get info about a specific asset
   * @param coin the MoveToken to get info for
   * @returns the MoveAssetInfo for the specific coin or token
   */
  moveAssetInfo(coin: MoveAsset | string): MoveAssetInfo {
    return moveAssetInfo(coin, this.config)
  }

  /**
   * Get the balance of a coin in a Ui friendly format
   * @param balance the balance to convert
   * @param coin the coin
   * @returns a human-readable balance value
   */
  assetBalanceToDecimal(balance: BigNumber, coin: MoveToken | string): BigNumber {
    return assetBalanceToDecimal(balance, coin, this.config)
  }

  /**
   * Convert move token type to MoveToken
   * @param type the type of the perp
   * @returns a move token
   */
  typeToMoveToken(type: string): MoveToken | undefined {
    return typeToMoveToken(type, this.config)
  }

  /**
   * Convert move Coin type to MoveCoin
   * @param type the type of the perp
   * @returns a move Coin
   */
  typeToMoveCoin(type: string): MoveCoin | undefined {
    return typeToMoveCoin(type, this.config)
  }

  /**
   * Convert perpetual move type to Perpetual
   * @param type the type of the perp
   * @returns a perpetual asset
   */
  typeToPerpetual(type: string): Perpetual | undefined {
    return typeToPerpetual(type, this.config)
  }

  // A list of all coins and their info in the Mirage ecosystem
  mirageAssetList(): { readonly [coin in MoveAsset | Perpetual]: AssetInfo | MoveAssetInfo } {
    return mirageAssetList(this.config)
  }
}
