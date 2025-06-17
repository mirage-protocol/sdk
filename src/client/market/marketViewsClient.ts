import { Aptos as AptosClient, MoveObjectType } from '@aptos-labs/ts-sdk'

import {
  allMarketAddressesView,
  AllPositionInfo,
  allPositionInfoView,
  availableMarginView,
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
  positionFundingView,
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
    return allMarketAddressesView(this.aptosClient, this.base.getDeployerAddress())
  }

  public getMarketPerpSymbol = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketPerpSymbolView(marketObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getMarketMarginTokenAddress = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketMarginTokenAddressView(marketObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getMarketMarginSymbol = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketMarginSymbolView(marketObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getMarketMarginOracle = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketMarginOracleView(marketObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getMarketPerpOracle = async (marketObjectAddress: MoveObjectType): Promise<string> => {
    return await marketPerpOracleView(marketObjectAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getIsLimitOrderTriggerable = async (limitOrderObject: MoveObjectType, perpPrice: number): Promise<boolean> => {
    return await isLimitOrderTriggerableView(
      limitOrderObject,
      perpPrice,
      this.aptosClient,
      this.base.getDeployerAddress(),
    )
  }

  public getIsLimitOrderTriggerableBulk = async (
    limitOrderObjectAddresses: MoveObjectType[],
    perpPrice: number,
  ): Promise<boolean[]> => {
    return await isLimitOrderTriggerableBulkView(
      limitOrderObjectAddresses,
      perpPrice,
      this.aptosClient,
      this.base.getDeployerAddress(),
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
      this.aptosClient,
      this.base.getDeployerAddress(),
    )
  }

  public getAvailableMargin = async (
    positionObjectAddress: MoveObjectType,
    perpPrice: number,
    marginPrice: number,
  ): Promise<number> => {
    return await availableMarginView(
      positionObjectAddress,
      perpPrice,
      marginPrice,
      this.aptosClient,
      this.base.getDeployerAddress(),
    )
  }

  public getPositionFunding = async (positionObjectAddress: MoveObjectType): Promise<number> => {
    return await positionFundingView(positionObjectAddress, this.aptosClient, this.base.getDeployerAddress())
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
      this.aptosClient,
      this.base.getDeployerAddress(),
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
      this.aptosClient,
      this.base.getDeployerAddress(),
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
      this.aptosClient,
      this.base.getDeployerAddress(),
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
      this.aptosClient,
      this.base.getDeployerAddress(),
    )
  }
}
