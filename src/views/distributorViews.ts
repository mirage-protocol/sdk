import { MoveUint64Type, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { aptosClient, MODULES } from '../constants'

export const numberOfClaimsAvailable = async (userAddress: string, network: Network | string): Promise<number> => {
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::testnet_airdropper::number_of_claims_available` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient(network).view({ payload })

  return BigNumber(result[0] as MoveUint64Type).toNumber()
}

export const timeUntilNextClaim = async (userAddress: string, network: Network | string): Promise<number> => {
  const payload = {
    function:
      `${MODULES(network).mirage_scripts.address}::testnet_airdropper::time_until_next_claim` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient(network).view({ payload })
  return BigNumber(result[0] as MoveUint64Type).toNumber()
}
