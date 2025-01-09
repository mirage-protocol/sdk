import BigNumber from 'bignumber.js'

import { FungibleAssetConfig, integerToDecimal } from '../../utils'
import { MirageClientBase } from '../base'

export class FungibleAssetBase extends MirageClientBase {
  public getAllFASymbols = (): string[] => {
    return Object.keys(this.config.fungibleAssets)
  }

  public getFA = (faSymbol: string): FungibleAssetConfig => {
    if (!this.config.fungibleAssets[faSymbol]) {
      throw new Error(`fungible asset not found ${faSymbol}`)
    }
    return this.config.fungibleAssets[faSymbol]
  }

  public getAllFAs = (): FungibleAssetConfig[] => {
    return Object.values(this.config.fungibleAssets)
  }

  getFADecimals(tokenSymbol: string): number {
    return this.getFA(tokenSymbol).decimals
  }

  getFACoinType(tokenSymbol: string): `${string}::${string}::${string}` | undefined {
    const type = this.getFA(tokenSymbol).coinType
    return type ? (type as `${string}::${string}::${string}`) : undefined
  }

  getFAName(tokenSymbol: string): string {
    return this.getFA(tokenSymbol).name
  }

  getFAMetadataAddress(tokenSymbol: string): string {
    return this.getFA(tokenSymbol).address
  }

  getFASymbolFromAddress(tokenMetadataAddress: string): string {
    const tokenSymbol = Object.entries(this.config.fungibleAssets).find(
      ([, tokenConfig]) => tokenConfig.address === tokenMetadataAddress,
    )?.[0]
    if (!tokenSymbol) {
      throw new Error(`fungible asset not found ${tokenMetadataAddress}`)
    }
    return tokenSymbol
  }

  /**
   * Get the balance of a coin in a Ui friendly format
   * @param balance the balance to convert
   * @param coin the coin
   * @returns a human-readable balance value
   */
  balanceToDecimal(balance: BigNumber, tokenSymbol: string): BigNumber {
    return integerToDecimal(balance, this.getFADecimals(tokenSymbol))
  }
}
