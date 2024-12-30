import { AccountAddress, Aptos as AptosClient, MoveObjectType, MoveOption, U128 } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { integerToDecimal } from '../utils'
import { getModuleAddress, MoveModules } from '../utils'

export const userAssetBalanceView = async (
  userAddress: string,
  tokenMetadataAddress: string,
  coinType: `${string}::${string}::${string}`,
  tokenDecimals: number,
  aptosClient: AptosClient,
): Promise<BigNumber> => {
  const balance = BigNumber(
    await aptosClient.getAccountCoinAmount({
      accountAddress: userAddress,
      coinType,
      faMetadataAddress: tokenMetadataAddress,
    }),
  )
  return integerToDecimal(balance, tokenDecimals)
}

export const allMirageAssetsView = async (
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_CORE, deployerAddress)}::registry::all_mirage_assets` as `${string}::${string}::${string}`,
    functionArguments: [],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }[]
  return result.map((value) => value.inner)
}

export const fATotalSupplyView = async (
  faMetadataAddress: MoveObjectType,
  faDecimals: number,
  aptosClient: AptosClient,
): Promise<BigNumber> => {
  const payload = {
    function: '0x1::fungible_asset::supply' as `${string}::${string}::${string}`,
    functionArguments: [faMetadataAddress],
  }
  const [val] = await aptosClient.view({ payload })
  const val_option = val as MoveOption<U128>
  const val_raw_num = val_option.unwrap() as unknown as number
  return integerToDecimal(BigNumber(val_raw_num), faDecimals)
}
