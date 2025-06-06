import { AccountAddress, Identifier, MoveResource, StructTag, TypeTagStruct } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  FEE_PRECISION,
  getModuleAddress,
  getPropertyMapSigned64,
  getPropertyMapU64,
  MoveModules,
  PERCENT_PRECISION,
  PRECISION_8,
  U64_MAX,
  ZERO,
} from '../../utils'
import { Market } from './market'
import { TpSl } from './tpsl'
import { LimitOrder } from './limitOrder'

/**
 * Direction of a position
 */
export enum PositionSide {
  UNKNOWN = 0,
  LONG = 1,
  SHORT = 2,
}

export enum OrderType {
  UNKNOWN = 0,
  MARKET = 1,
  LIMIT = 2,
  STOP = 3,
  FLIP = 4,
}

export const stringToPositionSide = (str: string): PositionSide => {
  str = str.toLowerCase()
  if (str == 'l' || str == 'long') return PositionSide.LONG
  else if (str == 's' || str == 'short') return PositionSide.SHORT
  return PositionSide.UNKNOWN
}

export const stringToOrderType = (str: string): OrderType => {
  str = str.toLowerCase()
  if (str == 'm' || str == 'market') return OrderType.MARKET
  else if (str == 'l' || str == 'limit') return OrderType.LIMIT
  else if (str == 's' || str == 'stop') return OrderType.STOP
  return OrderType.UNKNOWN
}

/**
 * Represents a position on a specific Mirage Market
 */
export class Position {
  /**
   * The token id
   */
  public readonly tokenId: bigint
  /**
   * The market of the position
   */
  public readonly market: Market
  /**
   * The positions side
   */
  public readonly side: PositionSide
  /**
   * The position data if open
   */
  public readonly openingPrice: BigNumber
  public readonly margin: BigNumber
  public readonly positionSize: BigNumber
  public readonly fundingAccrued: BigNumber
  public readonly maintenanceMargin: BigNumber
  public readonly strategyAddresses: string[]
  /**
   * The fees paid by this position in margin token
   */
  public readonly feesPaid: BigNumber
  /**
   * The funding paid by this position in margin token
   */
  public readonly fundingPaid: BigNumber
  /**
   * The trade pnl (realized_pnl - feesPaid - funding) in margin token
   */
  public readonly tradePnl: BigNumber
  /**
   * The realized pnl of this position in margin token
   */
  public readonly realizedPnl: BigNumber

  public tpsl: TpSl | undefined
  public limitOrders: LimitOrder[]

  /**
   * The positions initial leverage
   */
  public readonly leverage: BigNumber

  public readonly objectAddress: string

  /**
   * Construct an instance of a trader
   * @param positionObjectResources Resources from position object account
   * @param objectAddress the address of the vault collection object
   * @param config the mirage config
   */
  constructor(
    positionObjectResources: MoveResource[],
    strategyObjectsResources: MoveResource[][],
    market: Market,
    objectAddress: string,
    deployerAddress: AccountAddress,
  ) {
    this.limitOrders = []
    this.tpsl = undefined

    this.objectAddress = AccountAddress.fromString(objectAddress).toStringShort()
    this.market = market

    const positionType = Position.getPositionType(deployerAddress).toString()
    const tokenIdsType = '0x4::token::TokenIdentifiers'
    const propertyMapType = '0x4::property_map::PropertyMap'

    const position = positionObjectResources.find((resource) => resource.type === positionType)
    if (position == undefined) throw new Error('Position object not found')
    const tokenIdentifiers = positionObjectResources.find((resource) => resource.type === tokenIdsType)
    if (tokenIdentifiers == undefined) throw new Error('TokenIdentifiers object not found')
    this.tokenId = BigInt((tokenIdentifiers.data as any).index.value)
    const propertyMap = positionObjectResources.find((resource) => resource.type === propertyMapType)
    if (propertyMap == undefined) throw new Error('PropertyMap object not found')

    this.feesPaid = getPropertyMapU64('fees_paid', propertyMap.data as any).div(PRECISION_8)
    this.fundingPaid = getPropertyMapSigned64('funding_paid', propertyMap.data as any).div(PRECISION_8)
    this.tradePnl = getPropertyMapSigned64('realized_pnl', propertyMap.data as any).div(PRECISION_8)
    this.realizedPnl = this.tradePnl.minus(this.feesPaid).minus(this.fundingPaid)
    this.leverage = getPropertyMapU64('leverage', propertyMap.data as any).div(PERCENT_PRECISION)

    this.openingPrice = BigNumber((position.data as any).last_settled_price).div(PRECISION_8)
    const side = BigNumber((position.data as any).side)
    if (side.eq(1)) {
      this.side = PositionSide.SHORT
    } else if (side.eq(2)) {
      this.side = PositionSide.LONG
    } else {
      this.side = PositionSide.UNKNOWN
    }

    this.margin = BigNumber((position.data as any).margin_amount).div(PRECISION_8)
    this.positionSize = BigNumber((position.data as any).position_size).div(PRECISION_8)

    // funding accrued is (market_funding_accumulated - last_funding_accumulated) * position_size
    const marketFundingAccumulated =
      this.side == PositionSide.LONG ? market.longFundingAccumulated : market.shortFundingAccumulated
    const lastPositionFunding = BigNumber((position.data as any).last_funding_accumulated.magnitude)
      .times((position.data as any).last_funding_accumulated.negative ? -1 : 1)
      .div(FEE_PRECISION)
      .div(PRECISION_8)
    this.fundingAccrued = marketFundingAccumulated.minus(lastPositionFunding).times(this.positionSize)
    this.maintenanceMargin = ZERO // TODO

    this.strategyAddresses = (position.data as any).strategy_refs as string[]
    for (const strategyObjectResources of strategyObjectsResources) {
      // object core is always the first resource
      const strategyAddress = (strategyObjectResources[0].data as any).transfer_events.guid.id.addr as string

      for (const strategyObjectResource of strategyObjectResources) {
        if (strategyObjectResource.type === TpSl.getTpslType(deployerAddress).toString()) {
          const tpsl = new TpSl(strategyObjectResources, strategyAddress, deployerAddress)
          if (tpsl.positionObjectAddress == this.objectAddress) {
            this.tpsl = tpsl
          }
          break
        }
        if (strategyObjectResource.type === LimitOrder.getLimitOrderType(deployerAddress).toString()) {
          const limitOrder = new LimitOrder(strategyObjectResources, strategyAddress, deployerAddress)
          if (limitOrder.positionObjectAddress == this.objectAddress) {
            this.limitOrders.push(limitOrder)
          }
          break
        }
      }
    }
  }

  public static getStrategyAddresses(
    positionObjectResources: MoveResource[],
    deployerAddress: AccountAddress,
  ): string[] {
    const positionType = Position.getPositionType(deployerAddress).toString()
    const findPosition = positionObjectResources.find((resource) => resource.type === positionType)
    if (!findPosition) return []
    const strategyAddresses = (findPosition.data as any).strategy_refs as string[]
    return strategyAddresses
  }

  /**
   * Returns bool on if the position is open
   * @returns If the position is open
   */
  public isOpen(): boolean {
    // Inactive trades have an id of u64 max
    return this.side != PositionSide.UNKNOWN
  }

  /**
   * Calculates the leverage of a position given the prices
   * @param position The position
   * @param perpetualPrice The perpetual price
   * @param marginPrice The margin price
   * @returns The leverage, where 1 == 1x leverage
   */
  static getLeverage(position: Position, perpetualPrice: number, marginPrice: number): number {
    return position.positionSize
      .div(position.margin)
      .minus(position.fundingAccrued)
      .times(perpetualPrice)
      .div(marginPrice)
      .toNumber()
  }

  /**
   * Estimates a positions pnl in terms of the margin type
   * @param position The position
   * @param perpetualPrice The perpetual price
   * @param marginPrice The margin price
   * @returns The amount of pnl in terms of the margin of the market
   */
  static estimatePnl(position: Position, perpetualPrice: number, marginPrice: number): number {
    return BigNumber(perpetualPrice)
      .minus(position.openingPrice)
      .times(position.positionSize)
      .div(marginPrice)
      .times(position.side == PositionSide.LONG ? 1 : -1)
      .minus(position.fundingAccrued)
      .toNumber()
  }

  /**
   * Estimates a positions percent pnl in terms of the margin
   * @param position The position
   * @param perpetualPrice The perpetual price
   * @param marginPrice The margin price
   * @returns The percent pnl in terms of the margin of the market
   */
  static estimatePercentPnl(position: Position, perpetualPrice: number, marginPrice: number): number {
    return (Position.estimatePnl(position, perpetualPrice, marginPrice) * 100) / position.margin.toNumber()
  }

  public getPositionMaintenanceMarginMUSD(perpPrice: BigNumber, marginPrice: BigNumber): BigNumber {
    if (!this.isOpen) {
      return ZERO
    }

    const closeFee = this.market.getOpenCloseFee(
      this.side,
      true, // close
      this.positionSize,
      perpPrice,
      marginPrice,
    )
    const positionSizeMUSD = this.positionSize.times(perpPrice)
    return BigNumber(this.market.maintenanceMargin).times(positionSizeMUSD).plus(closeFee)
  }

  public getLiquidationPrice(perpPrice: BigNumber, marginPrice: BigNumber): BigNumber {
    if (!this.isOpen) {
      return ZERO
    }

    const pnl = Position.estimatePnl(this, perpPrice.toNumber(), marginPrice.toNumber())
    const maintenanceMargin = this.getPositionMaintenanceMarginMUSD(perpPrice, marginPrice)
    const openingPrice = this.openingPrice
    let rawMargin = this.margin
    rawMargin = rawMargin.plus(pnl)
    const marginMUSD = rawMargin.times(marginPrice)
    if (marginMUSD.lte(maintenanceMargin)) {
      return this.side == PositionSide.LONG ? BigNumber(U64_MAX) : ZERO
    }

    const marginScalar = marginMUSD.minus(maintenanceMargin).div(this.positionSize)

    if (this.side == PositionSide.LONG && openingPrice.gt(marginScalar)) {
      return openingPrice.minus(marginScalar)
    } else if (this.side == PositionSide.SHORT && marginScalar.plus(openingPrice).lt(BigNumber(U64_MAX))) {
      return marginScalar.plus(openingPrice)
    } else if (this.side == PositionSide.LONG) {
      return ZERO
    } else {
      return BigNumber(U64_MAX)
    }
  }

  public static getPositionType(deployerAddress: AccountAddress): TypeTagStruct {
    return new TypeTagStruct(
      new StructTag(
        getModuleAddress(MoveModules.MARKET, deployerAddress),
        new Identifier('market'),
        new Identifier('Position'),
        [],
      ),
    )
  }
}
