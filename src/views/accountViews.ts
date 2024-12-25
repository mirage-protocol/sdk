import { AccountAddress } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { ZERO } from '../constants'
import { integerToDecimal } from '../utils'
import { BaseViews } from './baseViews'

export class AccountViews extends BaseViews {
  async getUserAssetBalance(userAddress: string, tokenSymbol: string): Promise<BigNumber> {
    const coinType = this.config.getTokenCoinType(tokenSymbol)
    let balance = ZERO
    if (coinType) {
      balance = BigNumber(
        await this.aptosClient.getAccountCoinAmount({
          accountAddress: userAddress,
          coinType: coinType as `${string}::${string}::${string}`,
        }),
      )
    } else {
      const queryResult = await this.aptosClient.getCurrentFungibleAssetBalances({
        options: {
          where: {
            owner_address: { _eq: AccountAddress.from(userAddress).toStringLong() },
            asset_type: { _eq: this.config.getTokenAddress(tokenSymbol) },
            is_primary: { _eq: true },
          },
        },
      })
      balance = BigNumber(queryResult[0]?.amount ?? 0)
    }

    const decimals = this.config.getTokenDecimals(tokenSymbol)
    return integerToDecimal(balance, decimals)
  }
}
