import { TransactionPayloadEntryFunction, MoveObjectType, MoveVector, U8 } from '@aptos-labs/ts-sdk'

import { OrderType, PositionSide } from '../../entities'
import {
  createAndOpenPositionPayload,
  createAndOpenPositionWithTpslPayload,
  createCancelLimitOrderPayload,
  createCancelTpslPayload,
  createCleanupLimitOrderPayload,
  createCleanupTpslPayload,
  createCloseAllPositionsPayload,
  createClosePositionPayload,
  createDecreaseLimitOrderMarginPayload,
  createDecreaseMarginPayload,
  createDecreasePositionSizePayload,
  createDecreaseSizeAndDecreaseMarginPayload,
  createDecreaseSizeAndIncreaseMarginPayload,
  createFlipPositionPayload,
  createIncreaseLimitOrderMarginPayload,
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
  createUpdateLimitOrderPayload,
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
    isDecreaseOnly: boolean,
    options: CreatePositionOptionals = {},
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getPlaceOrderPayloadVaas(
      positionObjectAddress,
      orderType,
      marginAmount,
      positionSize,
      side,
      desiredPrice,
      maxPriceSlippage,
      isDecreaseOnly,
      perpVaa,
      marginVaa,
      options,
    )
  }

  public getPlaceOrderPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    orderType: OrderType,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desiredPrice: number,
    maxPriceSlippage: number,
    isDecreaseOnly: boolean,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
    options: CreatePositionOptionals = {},
  ): TransactionPayloadEntryFunction => {
    const hasTpSl = (options.takeProfit && options.takeProfit != 0) || (options.stopLoss && options.stopLoss != 0)
    const expiration = options.expiration || BigInt(U64_MAX)

    switch (orderType) {
      case OrderType.MARKET: {
        if (expiration != BigInt(U64_MAX)) {
          throw new Error(`Market orders don't support expiration`)
        }

        if (hasTpSl) {
          return createOpenPositionWithTpslPayload(
            positionObjectAddress,
            perpVaa,
            marginVaa,
            marginAmount,
            positionSize,
            side,
            desiredPrice,
            maxPriceSlippage,
            options.takeProfit,
            options.stopLoss,
            this.base.getDeployerAddress(),
          )
        }
        return createOpenPositionPayload(
          positionObjectAddress,
          perpVaa,
          marginVaa,
          marginAmount,
          positionSize,
          side,
          desiredPrice,
          maxPriceSlippage,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.LIMIT: {
        if (hasTpSl) {
          throw new Error(`Limit orders don't support tpsl`)
        }

        return createPlaceLimitOrderPayload(
          positionObjectAddress,
          perpVaa,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          side != PositionSide.LONG,
          isDecreaseOnly,
          expiration,
          side,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.STOP: {
        return createPlaceLimitOrderPayload(
          positionObjectAddress,
          perpVaa,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          side == PositionSide.LONG,
          isDecreaseOnly,
          expiration,
          side,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.FLIP: {
        return createFlipPositionPayload(
          positionObjectAddress,
          perpVaa,
          marginVaa,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          this.base.getDeployerAddress(),
        )
      }
      default: {
        throw new Error(`unknown order type`)
      }
    }
  }

  public getCreatePositionAndPlaceOrderPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    orderType: OrderType,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desiredPrice: number,
    maxPriceSlippage: number,
    createPositionOptionals: CreatePositionOptionals = {},
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa =
      orderType === OrderType.MARKET ? await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol) : undefined

    return this.getCreatePositionAndPlaceOrderPayloadVaas(
      perpSymbol,
      marginSymbol,
      orderType,
      marginAmount,
      positionSize,
      side,
      desiredPrice,
      maxPriceSlippage,
      perpVaa,
      marginVaa,
      createPositionOptionals,
    )
  }

  public getCreatePositionAndPlaceOrderPayloadVaas = (
    perpSymbol: string,
    marginSymbol: string,
    orderType: OrderType,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desiredPrice: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
    createPositionOptionals: CreatePositionOptionals = {},
  ): TransactionPayloadEntryFunction => {
    const marketAddress = this.base.getMarketAddress(perpSymbol, marginSymbol)

    switch (orderType) {
      case OrderType.MARKET: {
        if (createPositionOptionals.expiration) {
          throw new Error(`Market orders don't support expiration`)
        }
        if (createPositionOptionals.takeProfit || createPositionOptionals.stopLoss) {
          return createAndOpenPositionWithTpslPayload(
            marketAddress,
            perpVaa,
            marginVaa,
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
          perpVaa,
          marginVaa,
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
          perpVaa,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
          side != PositionSide.LONG,
          createPositionOptionals.expiration ?? BigInt(U64_MAX),
          side,
          this.base.getDeployerAddress(),
        )
      }
      case OrderType.STOP: {
        return createPositionAndPlaceLimitOrderPayload(
          marketAddress,
          perpVaa,
          marginAmount,
          positionSize,
          desiredPrice,
          maxPriceSlippage,
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
    positionObjectAddress: MoveObjectType,
    increaseMarginAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    return createIncreaseMarginPayload(positionObjectAddress, increaseMarginAmount, this.base.getDeployerAddress())
  }

  public getDecreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    decreaseMarginAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getDecreaseMarginPayloadVaas(positionObjectAddress, decreaseMarginAmount, perpVaa, marginVaa)
  }

  public getDecreaseMarginPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    decreaseMarginAmount: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createDecreaseMarginPayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      decreaseMarginAmount,
      this.base.getDeployerAddress(),
    )
  }

  public getIncreasePositionSizePayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getIncreasePositionSizePayloadVaas(
      positionObjectAddress,
      positionSizeIncrease,
      desiredPrice,
      maxPriceSlippage,
      perpVaa,
      marginVaa,
    )
  }

  public getIncreasePositionSizePayloadVaas = (
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createIncreasePositionSizePayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      positionSizeIncrease,
      desiredPrice,
      maxPriceSlippage,
      this.base.getDeployerAddress(),
    )
  }

  public getDecreasePositionSizePayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    decreasePositionSize: number,
    desiredPrice: number,
    maxPriceSlippage: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getDecreasePositionSizePayloadVaas(
      positionObjectAddress,
      decreasePositionSize,
      desiredPrice,
      maxPriceSlippage,
      perpVaa,
      marginVaa,
    )
  }

  public getDecreasePositionSizePayloadVaas = (
    positionObjectAddress: MoveObjectType,
    decreasePositionSize: number,
    desiredPrice: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createDecreasePositionSizePayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      decreasePositionSize,
      desiredPrice,
      maxPriceSlippage,
      this.base.getDeployerAddress(),
    )
  }

  public getClosePositionPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    desired_price: number,
    maxPriceSlippage: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getClosePositionPayloadVaas(positionObjectAddress, desired_price, maxPriceSlippage, perpVaa, marginVaa)
  }

  public getClosePositionPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    desired_price: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createClosePositionPayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      desired_price,
      maxPriceSlippage,
      this.base.getDeployerAddress(),
    )
  }

  public getPlaceTpslPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    takeProfitPrice: number,
    stopLossPrice: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getPlaceTpslPayloadVaas(positionObjectAddress, takeProfitPrice, stopLossPrice, perpVaa)
  }

  public getPlaceTpslPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    takeProfitPrice: number,
    stopLossPrice: number,
    perpVaa: MoveVector<U8>,
  ): TransactionPayloadEntryFunction => {
    return createPlaceTpslPayload(
      positionObjectAddress,
      perpVaa,
      takeProfitPrice,
      stopLossPrice,
      this.base.getDeployerAddress(),
    )
  }

  public getUpdateTpslPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    tpslObjectAddress: MoveObjectType,
    takeProfitPrice: number,
    stopLossPrice: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getUpdateTpslPayloadVaas(tpslObjectAddress, takeProfitPrice, stopLossPrice, perpVaa)
  }

  public getUpdateTpslPayloadVaas = (
    tpslObjectAddress: MoveObjectType,
    takeProfitPrice: number,
    stopLossPrice: number,
    perpVaa: MoveVector<U8>,
  ): TransactionPayloadEntryFunction => {
    return createUpdateTpslPayload(
      tpslObjectAddress,
      perpVaa,
      takeProfitPrice,
      stopLossPrice,
      this.base.getDeployerAddress(),
    )
  }

  public getUpdateMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    oldMarginAmount: number,
    newMarginAmount: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const isIncrease = newMarginAmount > oldMarginAmount
    const diff = isIncrease ? newMarginAmount - oldMarginAmount : oldMarginAmount - newMarginAmount

    if (isIncrease) {
      return await this.getIncreaseMarginPayload(positionObjectAddress, diff)
    } else {
      const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
      const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)
      return this.getDecreaseMarginPayloadVaas(positionObjectAddress, diff, perpVaa, marginVaa)
    }
  }

  public getUpdateMarginPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    oldMarginAmount: number,
    newMarginAmount: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    const isIncrease = newMarginAmount > oldMarginAmount
    const diff = isIncrease ? newMarginAmount - oldMarginAmount : oldMarginAmount - newMarginAmount

    return isIncrease
      ? createIncreaseMarginPayload(positionObjectAddress, diff, this.base.getDeployerAddress())
      : createDecreaseMarginPayload(positionObjectAddress, perpVaa, marginVaa, diff, this.base.getDeployerAddress())
  }

  public getUpdateLimitOrderPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    limitOrderObjectAddress: MoveObjectType,
    newPositionSize: number,
    newSide: PositionSide,
    newTriggerPrice: number,
    newMaxPriceSlippage: number,
    newIsDecreaseOnly: boolean,
    newTriggersAbove: boolean,
    newExpiration: bigint,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getUpdateLimitOrderPayloadVaas(
      limitOrderObjectAddress,
      newPositionSize,
      newSide,
      newTriggerPrice,
      newMaxPriceSlippage,
      newIsDecreaseOnly,
      newTriggersAbove,
      newExpiration,
      perpVaa,
    )
  }

  public getUpdateLimitOrderPayloadVaas = (
    limitOrderObjectAddress: MoveObjectType,
    newPositionSize: number,
    newSide: PositionSide,
    newTriggerPrice: number,
    newMaxPriceSlippage: number,
    newIsDecreaseOnly: boolean,
    newTriggersAbove: boolean,
    newExpiration: bigint,
    perpVaa: MoveVector<U8>,
  ): TransactionPayloadEntryFunction => {
    return createUpdateLimitOrderPayload(
      limitOrderObjectAddress,
      perpVaa,
      newPositionSize,
      newSide,
      newTriggerPrice,
      newMaxPriceSlippage,
      newIsDecreaseOnly,
      newTriggersAbove,
      newExpiration,
      this.base.getDeployerAddress(),
    )
  }

  public getTriggerLimitOrderPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    limitOrderObjectAddress: MoveObjectType,
    triggererAddress: string,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getTriggerLimitOrderPayloadVaas(limitOrderObjectAddress, triggererAddress, perpVaa, marginVaa)
  }

  public getTriggerLimitOrderPayloadVaas = (
    limitOrderObjectAddress: MoveObjectType,
    triggererAddress: string,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createTriggerLimitOrderPayload(
      limitOrderObjectAddress,
      perpVaa,
      marginVaa,
      triggererAddress,
      this.base.getDeployerAddress(),
    )
  }

  public getTriggerTpslPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    tpslObjectAddress: MoveObjectType,
    triggererAddress: string,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getTriggerTpslPayloadVaas(tpslObjectAddress, triggererAddress, perpVaa, marginVaa)
  }

  public getTriggerTpslPayloadVaas = (
    tpslObjectAddress: MoveObjectType,
    triggererAddress: string,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createTriggerTpslPayload(
      tpslObjectAddress,
      perpVaa,
      marginVaa,
      triggererAddress,
      this.base.getDeployerAddress(),
    )
  }

  public getLiquidatePositionPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    triggererAddress: string,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getLiquidatePositionPayloadVaas(positionObjectAddress, triggererAddress, perpVaa, marginVaa)
  }

  public getLiquidatePositionPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    triggererAddress: string,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createLiquidatePositionPayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
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
    desiredPrice: number,
    maxPriceSlippage: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getIncreaseSizeAndIncreaseMarginPayloadVaas(
      positionObjectAddress,
      positionSizeIncrease,
      marginAmountIncrease,
      desiredPrice,
      maxPriceSlippage,
      perpVaa,
      marginVaa,
    )
  }

  public getIncreaseSizeAndIncreaseMarginPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
    marginAmountIncrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createIncreaseSizeAndIncreaseMarginPayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      positionSizeIncrease,
      marginAmountIncrease,
      desiredPrice,
      maxPriceSlippage,
      this.base.getDeployerAddress(),
    )
  }

  public getIncreaseSizeAndDecreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
    marginAmountDecrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getIncreaseSizeAndDecreaseMarginPayloadVaas(
      positionObjectAddress,
      positionSizeIncrease,
      marginAmountDecrease,
      desiredPrice,
      maxPriceSlippage,
      perpVaa,
      marginVaa,
    )
  }

  public getIncreaseSizeAndDecreaseMarginPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    positionSizeIncrease: number,
    marginAmountDecrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createIncreaseSizeAndDecreaseMarginPayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      positionSizeIncrease,
      marginAmountDecrease,
      desiredPrice,
      maxPriceSlippage,
      this.base.getDeployerAddress(),
    )
  }

  public getDecreaseSizeAndDecreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeDecrease: number,
    marginAmountDecrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getDecreaseSizeAndDecreaseMarginPayloadVaas(
      positionObjectAddress,
      positionSizeDecrease,
      marginAmountDecrease,
      desiredPrice,
      maxPriceSlippage,
      perpVaa,
      marginVaa,
    )
  }

  public getDecreaseSizeAndDecreaseMarginPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    positionSizeDecrease: number,
    marginAmountDecrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createDecreaseSizeAndDecreaseMarginPayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      positionSizeDecrease,
      marginAmountDecrease,
      desiredPrice,
      maxPriceSlippage,
      this.base.getDeployerAddress(),
    )
  }

  public getDecreaseSizeAndIncreaseMarginPayload = async (
    perpSymbol: string,
    marginSymbol: string,
    positionObjectAddress: MoveObjectType,
    positionSizeDecrease: number,
    marginAmountIncrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
  ): Promise<TransactionPayloadEntryFunction> => {
    const perpVaa = await this.base.getPerpPriceFeedUpdate(perpSymbol, marginSymbol)
    const marginVaa = await this.base.getMarginPriceFeedUpdate(perpSymbol, marginSymbol)

    return this.getDecreaseSizeAndIncreaseMarginPayloadVaas(
      positionObjectAddress,
      positionSizeDecrease,
      marginAmountIncrease,
      desiredPrice,
      maxPriceSlippage,
      perpVaa,
      marginVaa,
    )
  }

  public getDecreaseSizeAndIncreaseMarginPayloadVaas = (
    positionObjectAddress: MoveObjectType,
    positionSizeDecrease: number,
    marginAmountIncrease: number,
    desiredPrice: number,
    maxPriceSlippage: number,
    perpVaa: MoveVector<U8>,
    marginVaa: MoveVector<U8> | undefined,
  ): TransactionPayloadEntryFunction => {
    return createDecreaseSizeAndIncreaseMarginPayload(
      positionObjectAddress,
      perpVaa,
      marginVaa,
      positionSizeDecrease,
      marginAmountIncrease,
      desiredPrice,
      maxPriceSlippage,
      this.base.getDeployerAddress(),
    )
  }

  public getCancelLimitOrderPayload = (limitOrderObjectAddress: MoveObjectType): TransactionPayloadEntryFunction => {
    return createCancelLimitOrderPayload(limitOrderObjectAddress, this.base.getDeployerAddress())
  }

  public getCleanupLimitOrderPayload = (limitOrderObjectAddress: MoveObjectType): TransactionPayloadEntryFunction => {
    return createCleanupLimitOrderPayload(limitOrderObjectAddress, this.base.getDeployerAddress())
  }

  public getCleanupTpslPayload = (tpslObjectAddress: MoveObjectType): TransactionPayloadEntryFunction => {
    return createCleanupTpslPayload(tpslObjectAddress, this.base.getDeployerAddress())
  }

  public getCancelTpslPayload = (tpslObjectAddress: MoveObjectType): TransactionPayloadEntryFunction => {
    return createCancelTpslPayload(tpslObjectAddress, this.base.getDeployerAddress())
  }

  public getIncreaseLimitOrderMarginPayload = (
    limitOrderObjectAddress: MoveObjectType,
    marginIncrease: number,
  ): TransactionPayloadEntryFunction => {
    return createIncreaseLimitOrderMarginPayload(
      limitOrderObjectAddress,
      marginIncrease,
      this.base.getDeployerAddress(),
    )
  }

  public getDecreaseLimitOrderMarginPayload = (
    limitOrderObjectAddress: MoveObjectType,
    marginDecrease: number,
  ): TransactionPayloadEntryFunction => {
    return createDecreaseLimitOrderMarginPayload(
      limitOrderObjectAddress,
      marginDecrease,
      this.base.getDeployerAddress(),
    )
  }

  public getCloseAllPositionsPayload = (
    allPositionObjectAddress: MoveObjectType[],
    allPerpVaas: MoveVector<U8>[],
    allMarginVaas: (MoveVector<U8> | undefined)[],
  ): TransactionPayloadEntryFunction => {
    return createCloseAllPositionsPayload(
      allPositionObjectAddress,
      allPerpVaas,
      allMarginVaas,
      this.base.getDeployerAddress(),
    )
  }
}
