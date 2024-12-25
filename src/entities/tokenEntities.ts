import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { integerToDecimal } from '../utils'
import { BaseEntities } from './baseEntities'
import { MirageAsset } from './mirageAsset'
import { Rebase } from './rebase'
import { Token } from './token'

export class AssetEntities extends BaseEntities {
  createAsset(balance: BigNumber, tokenSymbol: string): Token {
    return new Token(balance, tokenSymbol, this.config)
  }

  createMirageAsset(tokenObjectResources: MoveResource[], tokenSymbol: string): MirageAsset {
    return new MirageAsset(tokenObjectResources, tokenSymbol, this.config)
  }

  createRebase(elastic: BigNumber, base: BigNumber): Rebase {
    return new Rebase(elastic, base)
  }

  getTokenDecimals(tokenSymbol: string): number {
    return this.config.getTokenDecimals(tokenSymbol)
  }

  getTokenCoinType(tokenSymbol: string): string {
    return this.config.getTokenCoinType(tokenSymbol)
  }

  getTokenName(tokenSymbol: string): string {
    return this.config.getTokenName(tokenSymbol)
  }

  getTokenAddress(tokenSymbol: string): string {
    return this.config.getTokenAddress(tokenSymbol)
  }

  getTokenSymbolFromAddress(objectAddress: string): string | undefined {
    return this.config.getTokenSymbolFromAddress(objectAddress)
  }

  /**
   * Get the balance of a coin in a Ui friendly format
   * @param balance the balance to convert
   * @param coin the coin
   * @returns a human-readable balance value
   */
  assetBalanceToDecimal(balance: BigNumber, tokenSymbol: string): BigNumber {
    return integerToDecimal(balance, this.getTokenDecimals(tokenSymbol))
  }

  // A list of all coins and their info in the Mirage ecosystem
  getAllTokens(): string[] {
    return this.config.getAllTokens()
  }
}
