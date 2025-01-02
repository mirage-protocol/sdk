import { AccountAddress, Aptos as AptosClient, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules } from '../utils'

export const numberOfClaimsAvailableView = async (
  userAddress: string,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::testnet_airdropper::number_of_claims_available` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient.view({ payload })
  return BigNumber(result[0] as MoveUint64Type).toNumber()
}

export const timeUntilNextClaimView = async (
  userAddress: string,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, deployerAddress)}::testnet_airdropper::time_until_next_claim` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = aptosClient.view({ payload })
  return BigNumber(result[0] as MoveUint64Type).toNumber()
}
