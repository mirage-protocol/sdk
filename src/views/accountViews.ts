import { AccountAddress, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  aptosClient,
  assetBalanceToDecimal,
  assetInfo,
  getAssetTokenMetadata,
  getTypeFromMoveAsset,
  MoveAsset,
  ZERO,
} from '../constants'

export const getUserAssetBalance = async (
  userAddress: AccountAddress,
  asset: MoveAsset,
  network: Network
): Promise<BigNumber> => {
  let balance = ZERO
  switch (getTypeFromMoveAsset(asset)) {
    case 'MoveCoin':
      balance = BigNumber(
        await aptosClient(network).getAccountCoinAmount({
          accountAddress: userAddress.toStringLong(),
          coinType: assetInfo(asset).type as `${string}::${string}::${string}`,
        })
      )
      break
    case 'MoveToken':
      const data = await aptosClient(network).getCurrentFungibleAssetBalances({
        options: {
          where: {
            owner_address: { _eq: userAddress.toStringLong() },
            asset_type: { _eq: getAssetTokenMetadata(asset) },
            is_primary: { _eq: true },
          },
        },
      })
      balance = BigNumber(data[0]?.amount ?? 0)
      break
  }
  return assetBalanceToDecimal(balance, asset)
}
