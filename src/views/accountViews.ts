import { AccountAddress, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  aptosClient,
  assetBalanceToDecimal,
  coinList,
  getCoinType,
  getFungibleAssetAddress,
  MoveAsset,
  MoveCoin,
  MoveFungibleAsset,
} from '../constants'

export const getUserAssetBalance = async (
  userAddress: AccountAddress,
  asset: MoveAsset,
  network: Network,
): Promise<BigNumber> => {
  const balance =
    asset in coinList
      ? BigNumber(
          await aptosClient(network).getAccountCoinAmount({
            accountAddress: userAddress,
            coinType: getCoinType(asset as MoveCoin, network),
          }),
        )
      : (
          await aptosClient(network).getCurrentFungibleAssetBalances({
            options: {
              where: {
                owner_address: { _eq: userAddress.toStringLong() },
                asset_type: { _eq: getFungibleAssetAddress(asset as MoveFungibleAsset, network).toStringLong() },
                is_primary: { _eq: true },
              },
            },
          })
        )[0]?.amount
  return assetBalanceToDecimal(balance, asset, network)
}
