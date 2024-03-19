import { InputViewRequestData } from '@aptos-labs/ts-sdk'

import { mirageAddress, MoveAsset, moveAssetInfo, MoveToken } from '../constants'

export const getVaultCollection = async (
  collateralAsset: MoveAsset,
  borrowToken: MoveToken
): Promise<InputViewRequestData> => {
  return {
    function: `${mirageAddress()}::vault::get_vault_collection`,
    functionArguments: [moveAssetInfo(collateralAsset).metadataAddress, moveAssetInfo(borrowToken).metadataAddress],
  }
}
