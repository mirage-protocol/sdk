import { InputViewFunctionData, MoveOption, Network, U128 } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { aptosClient, getNetwork } from '../constants'
import { getAssetTokenMetadata, getTypeFromMoveAsset, MoveAsset, moveAssetInfo, MoveCoin } from '../constants/assetList'

/**
 * Represents an on-chain AssetStore with a unique type and stores some metadata.
 * Holds the balance of a given user's resources.
 */
export class Asset {
  /**
   * The asset type
   */
  public readonly type: string
  /**
   * The asset represented by the class
   */
  public readonly asset: MoveAsset
  /**
   * The current network being used
   */
  private readonly network: Network
  /**
   * The name of the asset
   */
  public readonly name: string
  /**
   * The asset symbol
   */
  public readonly symbol: string
  /**
   * The number of decimals the asset uses
   */
  public readonly decimals: number
  /**
   * The balance of the assetStore found in the given resources
   */
  public readonly balance: BigNumber
  /**
   * The precision of the asset (e.g. 8 decimals = 100,000,000)
   */
  public readonly precision: BigNumber

  /**
   * Constructs an instance of asset
   * @param userResources resources of some account
   * @param asset which asset to find data for
   */
  constructor(balance: BigNumber, asset: MoveAsset | string, network: Network | string = Network.MAINNET) {
    const { name, symbol, decimals, type } = moveAssetInfo(asset)

    const precision = BigNumber(10).pow(decimals)

    this.network = getNetwork(network)
    this.type = type
    this.name = name
    this.symbol = symbol
    this.decimals = decimals
    this.asset = asset as MoveCoin
    this.precision = precision
    this.balance = balance
  }

  /**
   * Get the coin's total supply (no precision)
   * @returns The coin's current supply
   */
  public async getTotalSupply(): Promise<BigNumber> {
    const isToken = getTypeFromMoveAsset(this.asset) == 'MoveToken'
    const payload: InputViewFunctionData = {
      function: (isToken ? '0x1::fungible_asset::supply' : '0x1::coin::supply') as `${string}::${string}::${string}`,
      functionArguments: isToken ? [getAssetTokenMetadata(this.asset, this.network)] : [],
    }
    const [val] = await aptosClient(this.network).view({ payload })
    const val_option = val as MoveOption<U128>
    const val_raw_num = val_option.unwrap() as unknown as number
    return BigNumber(val_raw_num).div(BigNumber(10).pow(this.decimals))
  }
}
