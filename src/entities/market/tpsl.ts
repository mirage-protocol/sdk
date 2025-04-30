import { AccountAddress, Identifier, MoveResource, StructTag, TypeTagStruct } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules, PRECISION_8 } from '../../utils'
import { PositionSide } from './position'

/**
 * LimitOrder struct data
 */
export type TpSlData = {
  take_profit_price: string
  stop_loss_price: string
  is_long: boolean
}

/**
 * Represents a TpSl struct
 */
export class TpSl {
  /**
   * The side of the order
   */
  public readonly side: PositionSide

  public readonly takeProfitPrice: BigNumber
  public readonly stopLossPrice: BigNumber

  public readonly marketObjectAddress: string
  public readonly positionObjectAddress: string
  public readonly objectAddress: string

  /**
   * Construct a TpSl instance
   * @param tpslResources the data to parse
   */
  constructor(tpslResources: MoveResource[], objectAddress: string, deployerAddress: AccountAddress) {
    this.objectAddress = objectAddress

    const tpslOrderType = TpSl.getTpslType(deployerAddress).toString()
    const findTpSl = tpslResources.find((resource) => resource.type === tpslOrderType)
    if (findTpSl == undefined) throw new Error('TpSl object not found')
    const tpsl = findTpSl.data as TpSlData

    const strategyType = `${getModuleAddress(MoveModules.MARKET, deployerAddress)}::market::Strategy`
    const strategy = tpslResources.find((resource) => resource.type === strategyType)
    if (strategy == undefined) throw new Error('Strategy object not found')

    this.side = Boolean(tpsl.is_long).valueOf() ? PositionSide.LONG : PositionSide.SHORT
    this.takeProfitPrice = BigNumber(tpsl.take_profit_price).div(PRECISION_8)
    this.stopLossPrice = BigNumber(tpsl.stop_loss_price).div(PRECISION_8)

    this.positionObjectAddress = (strategy.data as any).position.inner as string
    this.marketObjectAddress = (strategy.data as any).market.inner as string
  }

  public static getTpslType(deployerAddress: AccountAddress): TypeTagStruct {
    return new TypeTagStruct(
      new StructTag(
        getModuleAddress(MoveModules.MARKET, deployerAddress),
        new Identifier('tpsl'),
        new Identifier('TpSl'),
        [],
      ),
    )
  }
}
