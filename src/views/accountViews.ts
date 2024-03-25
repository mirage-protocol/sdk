import { Network } from 'aptos'

import { aptosClient, assetInfo, getAssetTokenMetadata, getTypeFromMoveAsset, MoveAsset } from '../constants'

export const getUserAssetBalance = async (address: string, asset: MoveAsset, network: Network): Promise<number> => {
  switch (getTypeFromMoveAsset(asset)) {
    case 'MoveCoin':
      return await aptosClient(network).getAccountCoinAmount({
        accountAddress: address,
        coinType: assetInfo(asset).type as `${string}::${string}::${string}`,
      })
    case 'MoveToken':
      const data = await aptosClient(network).getCurrentFungibleAssetBalances({
        options: {
          where: {
            owner_address: { _eq: address },
            asset_type: { _eq: getAssetTokenMetadata(asset) },
          },
        },
      })

      return data[0]?.amount ?? 0
    default:
      return 0
  }
}
