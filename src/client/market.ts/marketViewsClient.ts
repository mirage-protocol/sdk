import { Aptos as AptosClient, MoveObjectType } from '@aptos-labs/ts-sdk'

import {
  allMarketAddressesView,
  AllPositionInfo,
  allPositionInfoView,
  estimateFeeView,
  isLimitOrderTriggerableBulkView,
  isLimitOrderTriggerableView,
  liquidationPriceBulkView,
  liquidationPriceView,
  marketMarginOracleView,
  marketMarginSymbolView,
  marketMarginTokenAddressView,
  marketPerpOracleView,
  marketPerpSymbolView,
  positionMaintenanceMarginMusdView,
} from '../../views'
import { MarketClientBase } from './marketClientBase'

export class MarketViewsClient {
  private readonly base: MarketClientBase
  private readonly aptosClient: AptosClient

  constructor(base: MarketClientBase, aptosClient: AptosClient) {
    this.base = base
    this.aptosClient = aptosClient
  }

  public getAllMarketAddresses = async (): Promise<MoveObjectType[]> => {
    return allMarketAddressesView(this.base.getDeployerAddress(), this.aptosClient)
  }

  public getMarketPerpSymbol = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketPerpSymbolView(marketObjectAddress, this.base.getDeployerAddress(), this.aptosClient)
  }

  public getMarketMarginTokenAddress = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketMarginTokenAddressView(marketObjectAddress, this.base.getDeployerAddress(), this.aptosClient)
  }

  public getMarketMarginSymbol = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketMarginSymbolView(marketObjectAddress, this.base.getDeployerAddress(), this.aptosClient)
  }

  public getMarketMarginOracle = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketMarginOracleView(marketObjectAddress, this.base.getDeployerAddress(), this.aptosClient)
  }

  public getMarketPerpOracle = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketPerpOracleView(marketObjectAddress, this.base.getDeployerAddress(), this.aptosClient)
  }

  public getIsLimitOrderTriggerable = async (
    limitOrderObject: MoveObjectType,
    perpPrice: number,
  ): Promise<boolean> => {
    return await isLimitOrderTriggerableView(
      limitOrderObject,
      perpPrice,
      this.base.getDeployerAddress(),
      this.aptosClient,
    )
  }

  public getIsLimitOrderTriggerableBulk = async (
    limitOrderObjectAddresses: MoveObjectType[],
    perpPrice: number,
  ): Promise<boolean[]> => {
    return await isLimitOrderTriggerableBulkView(
      limitOrderObjectAddresses,
      perpPrice,
      this.base.getDeployerAddress(),
      this.aptosClient,
    )
  }

  public getLiquidationPrice = async (
    positionObjectAddress: MoveObjectType,
    perpPrice: number,
    marginPrice: number,
  ): Promise<number> => {
    return await liquidationPriceView(
      positionObjectAddress,
      perpPrice,
      marginPrice,
      this.base.getDeployerAddress(),
      this.aptosClient,
    )
  }

  public getLiquidationPriceBulk = async (
    positionObjectAddresses: MoveObjectType[],
    perpPrice: number,
    marginPrice: number,
  ): Promise<number[]> => {
    return await liquidationPriceBulkView(
      positionObjectAddresses,
      perpPrice,
      marginPrice,
      this.base.getDeployerAddress(),
      this.aptosClient,
    )
  }

  public getEstimateFee = async (
    perpSymbol: string,
    marginSymbol: string,
    positionSize: number,
    isLong: boolean,
    perpPrice: number,
    marginPrice: number,
  ): Promise<number> => {
    const marketAddress = this.base.getMarketAddress(perpSymbol, marginSymbol)
    return await estimateFeeView(
      marketAddress,
      positionSize,
      isLong,
      perpPrice,
      marginPrice,
      this.base.getDeployerAddress(),
      this.aptosClient,
    )
  }

  public getPositionMaintenanceMarginMusd = async (
    positionObjectAddress: MoveObjectType,
    perpPrice: number,
    marginPrice: number,
  ): Promise<number> => {
    return await positionMaintenanceMarginMusdView(
      positionObjectAddress,
      perpPrice,
      marginPrice,
      this.base.getDeployerAddress(),
      this.aptosClient,
    )
  }

  public getAllPositionInfo = async (
    positionObjectAddress: MoveObjectType,
    perpPrice: number,
    marginPrice: number,
  ): Promise<AllPositionInfo> => {
    return await allPositionInfoView(
      positionObjectAddress,
      perpPrice,
      marginPrice,
      this.base.getDeployerAddress(),
      this.aptosClient,
    )
  }
}
