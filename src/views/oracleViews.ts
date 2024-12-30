import { AccountAddress, Aptos as AptosClient, MoveObjectType } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules } from '../utils'

export const allOraclesView = async (
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<MoveObjectType[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_ORACLE, deployerAddress)}::oracle::all_oracles` as `${string}::${string}::${string}`,
    functionArguments: [],
  }
  const result = (await aptosClient.view({ payload }))[0] as { inner: string }[]
  return result.map((value) => value.inner)
}

export const priceFeedIdView = async (
  oracleObjAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_ORACLE, deployerAddress)}::oracle::get_price_feed_id` as `${string}::${string}::${string}`,
    functionArguments: [oracleObjAddress],
  }
  return (await aptosClient.view({ payload }))[0] as string
}

export const oracleNameView = async (
  oracleObjAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_ORACLE, deployerAddress)}::oracle::get_name` as `${string}::${string}::${string}`,
    functionArguments: [oracleObjAddress],
  }
  return (await aptosClient.view({ payload }))[0] as string
}

export const oraclePriceMultiplierView = async (
  oracleObjAddress: MoveObjectType,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_ORACLE, deployerAddress)}::oracle::get_price_multiplier` as `${string}::${string}::${string}`,
    functionArguments: [oracleObjAddress],
  }
  return BigNumber((await aptosClient.view({ payload }))[0] as string).toNumber()
}
