import { Network } from '@aptos-labs/ts-sdk'

import { aptosClient, assetInfo, getAssetTokenMetadata, getTypeFromMoveAsset, MoveAsset } from '../constants'

export const getUserAssetBalance = async (userAddress: string, asset: MoveAsset, network: Network): Promise<number> => {
  switch (getTypeFromMoveAsset(asset)) {
    case 'MoveCoin':
      return await aptosClient(network).getAccountCoinAmount({
        accountAddress: userAddress,
        coinType: assetInfo(asset).type as `${string}::${string}::${string}`,
      })
    case 'MoveToken':
      const data = await aptosClient(network).getCurrentFungibleAssetBalances({
        options: {
          where: {
            owner_address: { _eq: userAddress },
            asset_type: { _eq: getAssetTokenMetadata(asset) },
            is_primary: { _eq: true },
          },
        },
      })

      return data[0]?.amount ?? 0
    default:
      return 0
  }
}
