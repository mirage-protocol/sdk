import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { OrderType, PositionSide } from '../../entities'
import {
  createAndOpenPositionPayload,
  createCancelLimitOrderPayload,
  createCancelTpslPayload,
  createCleanupLimitOrderPayload,
  createCleanupTpslPayload,
  createClosePositionPayload,
  createDecreasePositionSizePayload,
  createDecreaseSizeAndDecreaseMarginPayload,
  createDecreaseSizeAndIncreaseMarginPayload,
  createIncreaseMarginPayload,
  createIncreasePositionSizePayload,
  createIncreaseSizeAndDecreaseMarginPayload,
  createIncreaseSizeAndIncreaseMarginPayload,
  createLiquidatePositionPayload,
  createOpenPositionPayload,
  createOpenPositionWithTpslPayload,
  createPlaceLimitOrderPayload,
  createPlaceTpslPayload,
  createPositionAndPlaceLimitOrderPayload,
  createTriggerLimitOrderPayload,
  createTriggerTpslPayload,
  createUpdateTpslPayload,
} from '../../transactions'
import { U64_MAX } from '../../utils'
import { MarketClientBase } from './marketClientBase'

export type CreatePositionOptionals = {
  takeProfit?: number
  stopLoss?: number
  expiration?: bigint
}

export class MarketTransactionClient {
  private readonly base: MarketClientBase

  constructor(base: MarketClientBase) {
    this.base = base
  }

  public getPlaceOrderPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    orderType: OrderType,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desiredPrice: number,
    maxPriceSlippage: number,
    expiration = BigInt(U64_MAX),
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    switch (orderType) {
      case OrderType.MARKET: {
        if (expiration != BigInt(U64_MAX)) {
          throw new Error(`Market orders don't support expiration`)
        }

        const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
        return createOpenPositionPayload(
          positionObjectAddress,
          perpVaas,
          marginVaas,
          marginAmount,
          positionSize,
          side,
          desiredPrice,
          maxPriceSlippage,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.LIMIT: {
        return createPlaceLimitOrderPayload(
          positionObjectAddress,
          perpVaas,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          false,
          side != PositionSide.LONG,
          expiration,
          side,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.STOP: {
        return createPlaceLimitOrderPayload(
          positionObjectAddress,
          perpVaas,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          false,
          side == PositionSide.LONG,
          expiration,
          side,
          this.base.getDeployerAddress(),
        )
      }
      default: {
        throw new Error(`unknown order type`)
      }
    }
  }

  public getCreatePositionWithOrderPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    orderType: OrderType,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desiredPrice: number,
    maxPriceSlippage: number,
    createPositionOptionals: CreatePositionOptionals = {}
  ): Promise<InputEntryFunctionData> => {
    const marketAddress = this.base.getMarketAddress(perpSymbol, marginSymbol)
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    switch (orderType) {
      case OrderType.MARKET: {
        if (createPositionOptionals.expiration) {
          throw new Error(`Market orders don't support expiration`)
        }
        const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
        if (createPositionOptionals.takeProfit || createPositionOptionals.stopLoss) {
          return createOpenPositionWithTpslPayload(
            marketAddress,
            perpVaas,
            marginVaas,
            marginAmount,
            positionSize,
            side,
            desiredPrice,
            maxPriceSlippage,
            createPositionOptionals.takeProfit ?? 0,
            createPositionOptionals.stopLoss ?? 0,
            this.base.getDeployerAddress(),
          )
        }
        return createAndOpenPositionPayload(
          marketAddress,
          perpVaas,
          marginVaas,
          marginAmount,
          positionSize,
          side,
          desiredPrice,
          maxPriceSlippage,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.LIMIT: {
        return createPositionAndPlaceLimitOrderPayload(
          marketAddress,
          perpVaas,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          false,
          side != PositionSide.LONG,
          createPositionOptionals.expiration ?? BigInt(U64_MAX),
          side,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.STOP: {
        return createPositionAndPlaceLimitOrderPayload(
          marketAddress,
          perpVaas,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          false,
          side == PositionSide.LONG,
          createPositionOptionals.expiration ?? BigInt(U64_MAX),
          side,
          this.base.getDeployerAddress(),
        )
      }
      default: {
        throw new Error(`unknown order type`)
      }
    }
  }

  public getIncreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createIncreaseMarginPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      increaseMarginAmount,
      this.base.getDeployerAddress(),
    )
  }

  public getDecreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createIncreaseMarginPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      decreaseMarginAmount,
      this.base.getDeployerAddress(),
    )
  }

  public getIncreasePositionSizePayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createIncreasePositionSizePayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      positionSizeIncrease,
      this.base.getDeployerAddress(),
    )
  }

  public getDecreasePositionSizePayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    decreasePositionSize: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createDecreasePositionSizePayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      decreasePositionSize,
      this.base.getDeployerAddress(),
    )
  }

  public getClosePositionPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createClosePositionPayload(positionObjectAddress, perpVaas, marginVaas, this.base.getDeployerAddress())
  }

  public getCancelLimitOrderPayload = (limitOrderObjectAddress: MoveObjectType): InputEntryFunctionData => {
    return createCancelLimitOrderPayload(limitOrderObjectAddress, this.base.getDeployerAddress())
  }

  public getCleanupLimitOrderPayload = (limitOrderObjectAddress: MoveObjectType): InputEntryFunctionData => {
    return createCleanupLimitOrderPayload(limitOrderObjectAddress, this.base.getDeployerAddress())
  }

  public getPlaceTpslPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    takeProfitPrice: number,
    stopLossPrice: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    return createPlaceTpslPayload(
      positionObjectAddress,
      perpVaas,
      takeProfitPrice,
      stopLossPrice,
      this.base.getDeployerAddress(),
    )
  }

  public getCleanupTpslPayload = (tpslObjectAddress: MoveObjectType): InputEntryFunctionData => {
    return createCleanupTpslPayload(tpslObjectAddress, this.base.getDeployerAddress())
  }

  public getUpdateTpslPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    tpslObjectAddress: MoveObjectType,
    takeProfitPrice: number,
    stopLossPrice: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    return createUpdateTpslPayload(
      tpslObjectAddress,
      perpVaas,
      takeProfitPrice,
      stopLossPrice,
      this.base.getDeployerAddress(),
    )
  }

  public getCancelTpslPayload = async (tpslObjectAddress: MoveObjectType): Promise<InputEntryFunctionData> => {
    return createCancelTpslPayload(tpslObjectAddress, this.base.getDeployerAddress())
  }

  public getUpdateMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    oldMarginAmount: number,
    newMarginAmount: number,
  ): Promise<InputEntryFunctionData> => {
    const isIncrease = newMarginAmount > oldMarginAmount
    const diff = isIncrease ? newMarginAmount - oldMarginAmount : oldMarginAmount - newMarginAmount
    return isIncrease
      ? await this.getIncreaseMarginPayload(perpSymbol, marginSymbol, positionObjectAddress, diff)
      : this.getDecreaseMarginPayload(perpSymbol, marginSymbol, positionObjectAddress, diff)
  }

  public getIncreaseLimitOrderMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createIncreaseMarginPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      positionSizeIncrease,
      this.base.getDeployerAddress(),
    )
  }

  public getDecreaseLimitOrderMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    decreasePositionSize: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createDecreasePositionSizePayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      decreasePositionSize,
      this.base.getDeployerAddress(),
    )
  }

  public getTriggerLimitOrderPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    limitOrderObjectAddress: MoveObjectType,
    triggererAddress: string,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createTriggerLimitOrderPayload(
      limitOrderObjectAddress,
      perpVaas,
      marginVaas,
      triggererAddress,
      this.base.getDeployerAddress(),
    )
  }

  public getTriggerTpslPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    tpslObjectAddress: MoveObjectType,
    triggererAddress: string,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createTriggerTpslPayload(
      tpslObjectAddress,
      perpVaas,
      marginVaas,
      triggererAddress,
      this.base.getDeployerAddress(),
    )
  }

  public getLiquidatePositionPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    triggererAddress: string,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)

    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createLiquidatePositionPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      triggererAddress,
      this.base.getDeployerAddress(),
    )
  }
  public getIncreaseSizeAndIncreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
    marginAmountIncrease: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createIncreaseSizeAndIncreaseMarginPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      positionSizeIncrease,
      marginAmountIncrease,
      this.base.getDeployerAddress(),
    )
  }

  /**
   * increase the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  public getIncreaseSizeAndDecreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
    marginAmountDecrease: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createIncreaseSizeAndDecreaseMarginPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      positionSizeIncrease,
      marginAmountDecrease,
      this.base.getDeployerAddress(),
    )
  }

  /**
   * decrease the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  public getDecreaseSizeAndDecreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeDecrease: number,
    marginAmountDecrease: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createDecreaseSizeAndDecreaseMarginPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      positionSizeDecrease,
      marginAmountDecrease,
      this.base.getDeployerAddress(),
    )
  }

  /**
   * decrease the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  public getDecreaseSizeAndIncreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeDecrease: number,
    marginAmountIncrease: number,
  ): Promise<InputEntryFunctionData> => {
    const perpVaas = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaas = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
    return createDecreaseSizeAndIncreaseMarginPayload(
      positionObjectAddress,
      perpVaas,
      marginVaas,
      positionSizeDecrease,
      marginAmountIncrease,
      this.base.getDeployerAddress(),
    )
  }
}
