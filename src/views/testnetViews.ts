import { MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { MirageClientBase } from '../client/base'
import { MODULES } from '../constants'

export class TestnetViews extends MirageClientBase {
  async numberOfClaimsAvailable(userAddress: string): Promise<number> {
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::testnet_airdropper::number_of_claims_available` as `${string}::${string}::${string}`,
      functionArguments: [userAddress],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })

    return BigNumber(result[0] as MoveUint64Type).toNumber()
  }

  async timeUntilNextClaim(userAddress: string): Promise<number> {
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::testnet_airdropper::time_until_next_claim` as `${string}::${string}::${string}`,
      functionArguments: [userAddress],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })
    return BigNumber(result[0] as MoveUint64Type).toNumber()
  }
}
