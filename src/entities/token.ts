import { Aptos, InputViewFunctionData, MoveOption, U128 } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { integerToDecimal } from '../utils'
import { MirageConfig } from '../utils/config'

/**
 * Represents an on-chain AssetStore with a unique type and stores some metadata.
 * Holds the balance of a given user's resources.
 */
export class Token {
  /**
   * The asset coin type
   */
  public readonly coinType: string
  /**
   * The asset symbol
   */
  public readonly symbol: string
  /**
   * The name of the asset
   */
  public readonly name: string
  /**
   * The number of decimals the asset uses
   */
  public readonly decimals: number
  /**
   * The users balance
   */
  public readonly balance: BigNumber
  /**
   * The users balance
   */
  public readonly tokenAddress: string

  /**
   * Constructs an instance of asset
   * @param balance the users balance
   * @param tokenSymbol the token symbol
   * @param config mirage config
   */
  constructor(balance: BigNumber, tokenSymbol: string, config: MirageConfig) {
    this.coinType = config.getTokenCoinType(tokenSymbol)
    this.symbol = tokenSymbol
    this.decimals = config.getTokenDecimals(tokenSymbol)
    this.name = config.getTokenName(tokenSymbol)
    this.tokenAddress = config.getTokenAddress(tokenSymbol)
    this.balance = balance
  }

  /**
   * Get the coin's total supply (no precision)
   * @returns The coin's current supply
   */
  public async getTotalSupply(aptosClient: Aptos): Promise<BigNumber> {
    const payload: InputViewFunctionData = {
      function: '0x1::fungible_asset::supply' as `${string}::${string}::${string}`,
      functionArguments: [this.tokenAddress],
    }
    const [val] = await aptosClient.view({ payload })
    const val_option = val as MoveOption<U128>
    const val_raw_num = val_option.unwrap() as unknown as number
    return integerToDecimal(BigNumber(val_raw_num), this.decimals)
  }
}
