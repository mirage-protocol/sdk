import { AccountAddress } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  assetBalanceToDecimal,
  assetInfo,
  getAssetTokenMetadata,
  getTypeFromMoveAsset,
  MoveAsset,
  ZERO,
} from '../constants'
import { BaseViews } from './baseViews'

export class AccountViews extends BaseViews {
  async getUserAssetBalance(userAddress: string, asset: MoveAsset): Promise<BigNumber> {
    let balance = ZERO
    switch (getTypeFromMoveAsset(asset)) {
      case 'MoveCoin':
        balance = BigNumber(
          await this.aptosClient.getAccountCoinAmount({
            accountAddress: userAddress,
            coinType: assetInfo(asset, this.config).type as `${string}::${string}::${string}`,
          }),
        )
        break
      case 'MoveToken':
        const data = await this.aptosClient.getCurrentFungibleAssetBalances({
          options: {
            where: {
              owner_address: { _eq: AccountAddress.from(userAddress).toStringLong() },
              asset_type: { _eq: getAssetTokenMetadata(asset, this.config) },
              is_primary: { _eq: true },
            },
          },
        })
        balance = BigNumber(data[0]?.amount ?? 0)
        break
    }
    return assetBalanceToDecimal(balance, asset, this.config)
  }
}
