import { Network } from '@aptos-labs/ts-sdk'

import { aptosClient, MODULES } from '../constants'

export const numberOfClaimsAvailable = async (userAddress: string): Promise<number> => {
  const payload = {
    function:
      `${MODULES.mirage_scripts.address}::testnet_airdropper::number_of_claims_available` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient(Network.TESTNET).view({ payload })

  return result[0] as unknown as number
}

export const timeUntilNextClaim = async (userAddress: string): Promise<number> => {
  const payload = {
    function:
      `${MODULES.mirage_scripts.address}::testnet_airdropper::time_until_next_claim` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient(Network.TESTNET).view({ payload })
  return result[0] as unknown as number
}
