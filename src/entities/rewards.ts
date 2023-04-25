import BigNumber from 'bignumber.js'

import { ZERO } from '../constants'
import { AccountResource, mirageAddress } from '../constants/accounts'

/**
 * Represent Rewards struct.
 * Stores info about the global vote-escrow rewards data.
 */
export class Rewards
{
    /**
    * The base reward rate.
    */
    public readonly baseRewardRate: BigNumber
    /**
    * The last time rewards were updated.
    */
    public readonly lastUpdated: BigNumber

    /**
     * Construct an instance of UserInfo
     * @param moduleResources resources for the veMirage account (MIRAGE_ACCOUNT)
     */
    constructor(
        moduleResources: AccountResource[]
    ) {
        let moveType = `${mirageAddress()}::ve_mirage::Rewards`

        console.debug(`attempting to get data for type: ${moveType}`)

        const veMirage = moduleResources.find((resource) => resource.type === this.vaultType)

        console.debug(`found data: ${veMirage}`)

        this.baseRewardRate = !!veMirage ? BigNumber((veMirage.data as any).baseRewardRate) : ZERO
        this.lastUpdated = !!veMirage ? BigNumber((veMirage.data as any).lastUpdated) : ZERO
    }
}
