import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { MirageClientBase } from '../client/base'
import {
  getNetwork,
  getPairFromMarketAddress,
  getPriceFeed,
  getPriceFeedUpdateData,
  MirageConfig,
  MODULES,
  MoveCoin,
  MoveToken,
  Perpetual,
} from '../constants'
import { PositionSide } from '../entities'
import { getAssetAmountArgument, getDecimal8Argument } from './'

// Get the types for this market
export const getMarketTypeArgument = (config: MirageConfig): Array<string> => {
  return [`${MODULES(config).market.address}::market::Market`]
}
export const getPositionTypeArgument = (config: MirageConfig): Array<string> => {
  return [`${MODULES(config).market.address}::market::Position`]
}
export const getLimitOrdersTypeArgument = (config: MirageConfig): Array<string> => {
  return [`${MODULES(config).market.address}::market::LimitOrders`]
}

export class MarketTransactions extends MirageClientBase {
  /**
   * Open a position in a market at the current price and registers user resources if uninitialized
   * @returns script or payload promise for the transaction
   */
  async openPosition(
    marketObject: MoveObjectType,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desired_price: number,
    maxPriceSlippage: number,
  ): Promise<InputEntryFunctionData> {
    const { marginToken: marginCoin, perp: perpetual } = getPairFromMarketAddress(marketObject, this.config)
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetual, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::market_scripts::open_position_entry`,

      functionArguments: [
        marketObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        side == PositionSide.LONG,
        getDecimal8Argument(desired_price),
        getDecimal8Argument(maxPriceSlippage),
      ],
      typeArguments: getMarketTypeArgument(this.config),
    }
  }

  /**
   * Open a position in a market at the current price and registers user resources if uninitialized
   * @returns script or payload promise for the transaction
   */
  async openPositionWithTpsl(
    marketObject: MoveObjectType,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desired_price: number,
    maxPriceSlippage: number,
    takeProfitPrice: number,
    stopLossPrice: number,
    triggerPaymentAmount: number,
  ): Promise<InputEntryFunctionData> {
    const { marginToken: marginCoin, perp: perpetual } = getPairFromMarketAddress(marketObject, this.config)
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetual, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::market_scripts::open_position_entry_with_tpsl`,

      functionArguments: [
        marketObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        side == PositionSide.LONG,
        getDecimal8Argument(desired_price),
        getDecimal8Argument(maxPriceSlippage),
        getDecimal8Argument(takeProfitPrice),
        getDecimal8Argument(stopLossPrice),
        getAssetAmountArgument(MoveCoin.APT, triggerPaymentAmount, this.config),
      ],
      typeArguments: getMarketTypeArgument(this.config),
    }
  }

  /**
   * Close a position in a market at the current price
   * @returns payload promise for the transaction
   */
  async closePosition(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetual: Perpetual,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetual, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::close_position_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * Place a limit order on a new position that can be trigger when the market price
   * of a long/short is below/above a trigger price
   * @returns payload promise for the transaction
   */
  async openPositionAndPlaceLimitOrder(
    marketObject: MoveObjectType,
    marginAmount: number,
    positionSize: number,
    triggerPrice: number,
    maxPriceSlippage: number,
    triggersAbove: boolean,
    triggerPaymentAmount: number,
    expiration: bigint, // in seconds,
    isLong: boolean,
  ): Promise<InputEntryFunctionData> {
    const { perp: perpetualAsset } = getPairFromMarketAddress(marketObject, this.config)

    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::market_scripts::create_position_and_place_limit_order`,
      functionArguments: [
        marketObject,
        perpetualVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        getDecimal8Argument(triggerPrice),
        getDecimal8Argument(maxPriceSlippage),
        true, // always is increase when creating a new position
        triggersAbove,
        getDecimal8Argument(triggerPaymentAmount),
        expiration.toString(), // sdk breaks for large non-string integers
        isLong,
      ],
      typeArguments: getMarketTypeArgument(this.config),
    }
  }

  /**
   * Place a limit order that can be trigger when the market price
   * of a long/short is below/above a trigger price
   * @returns payload promise for the transaction
   */
  async placeLimitOrder(
    positionObject: MoveObjectType,
    perpetualAsset: Perpetual,
    marginAmount: number,
    positionSize: number,
    triggerPrice: number,
    maxPriceSlippage: number,
    isIncrease: boolean,
    triggersAbove: boolean,
    triggerPaymentAmount: number,
    expiration: bigint, // in seconds
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${MODULES(this.config).mirage_scripts.address}::market_scripts::place_limit_order_entry`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        getDecimal8Argument(triggerPrice),
        getDecimal8Argument(maxPriceSlippage),
        isIncrease,
        triggersAbove,
        getDecimal8Argument(triggerPaymentAmount),
        expiration.toString(), // sdk breaks for large non-string integers
      ],
      typeArguments: getPositionTypeArgument(this.config),
    }
  }

  /**
   * Cancel a limit order
   * @returns payload promise for the transaction
   */
  async cancelLimitOrder(limitOrdersObject: MoveObjectType, index: number): Promise<InputEntryFunctionData> {
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::cancel_limit_order_entry` as `${string}::${string}::${string}`,
      functionArguments: [limitOrdersObject, index],
      typeArguments: getLimitOrdersTypeArgument(this.config),
    }
    return payload
  }

  async updateTpsl(
    positionObject: MoveObjectType,
    perpetualAsset: Perpetual,
    take_profit_price: number,
    stop_loss_price: number,
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function: `${MODULES(this.config).market.address}::market::update_tpsl` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        getDecimal8Argument(take_profit_price),
        getDecimal8Argument(stop_loss_price),
      ],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  async placeTpsl(
    positionObject: MoveObjectType,
    perpetualAsset: Perpetual,
    take_profit_price: number,
    stop_loss_price: number,
    trigger_amount: number,
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::place_tpsl_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        getDecimal8Argument(take_profit_price),
        getDecimal8Argument(stop_loss_price),
        getDecimal8Argument(trigger_amount),
      ],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * Update the margin of a position
   * @returns payload promise for the transaction
   */
  async updateMargin(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    oldMarginAmount: number,
    newMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const diff =
      newMarginAmount > oldMarginAmount ? newMarginAmount - oldMarginAmount : oldMarginAmount - newMarginAmount
    const functionName = newMarginAmount > oldMarginAmount ? 'increase' : 'decrease'
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::${functionName}_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * increase the margin of a position
   * @returns payload promise for the transaction
   */
  async increaseMargin(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::increase_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increaseMarginAmount)],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * increase the position size and increase the margin of a position
   * @returns payload promise for the transaction
   */
  async increaseSizeAndIncreaseMargin(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    increasePositionSize: number,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::increase_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(increasePositionSize),
        getDecimal8Argument(increaseMarginAmount),
      ],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * increase the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async increaseSizeAndDecreaseMargin(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    increasePositionSize: number,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::increase_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(increasePositionSize),
        getDecimal8Argument(decreaseMarginAmount),
      ],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * decrease the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async decreaseSizeAndDecreaseMargin(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    decreasePositionSize: number,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::decrease_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(decreasePositionSize),
        getDecimal8Argument(decreaseMarginAmount),
      ],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * decrease the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async decreaseSizeAndIncreaseMargin(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    decreasePositionSize: number,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::decrease_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(decreasePositionSize),
        getDecimal8Argument(increaseMarginAmount),
      ],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async decreaseMargin(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::decrease_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreaseMarginAmount)],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * Update the position size of a position
   * @returns payload promise for the transaction
   */
  async updatePositionSize(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    oldPositionSize: number,
    newPositionSize: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const diff =
      newPositionSize > oldPositionSize ? newPositionSize - oldPositionSize : oldPositionSize - newPositionSize
    const functionName =
      newPositionSize > oldPositionSize
        ? 'market::increase_position_size'
        : 'market_scripts::decrease_position_size_entry'

    const payload = {
      function: `${
        newPositionSize > oldPositionSize
          ? MODULES(this.config).market.address
          : MODULES(this.config).mirage_scripts.address
      }::${functionName}` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * increase the position size of a position
   * @returns payload promise for the transaction
   */
  async increasePositionSize(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    increasePositionSize: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${MODULES(this.config).market.address}::market::increase_position_size` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increasePositionSize)],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * decrease the position size of a position
   * @returns payload promise for the transaction
   */
  async decreasePositionSize(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    decreasePositionSize: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::decrease_position_size_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreasePositionSize)],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * Trigger a take profit or stop loss of the position at address to_trigger
   * @returns payload promise for the transaction
   */
  async triggerTpsl(
    triggererAddress: string,
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []
    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::trigger_tpsl_entry` as `${string}::${string}::${string}`,
      functionArguments: [triggererAddress, positionObject, perpetualVaas, marginVaas],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * Liquidate a position at address to_trigger
   * @returns payload promise for the transaction
   */
  async liquidatePosition(
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::liquidate_position_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * Trigger a limit order at the index at address to_trigger
   * @returns payload promise for the transaction
   */
  async triggerLimitOrder(
    triggererAddress: string,
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    index: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::trigger_limit_order_entry` as `${string}::${string}::${string}`,
      functionArguments: [triggererAddress, positionObject, index, perpetualVaas, marginVaas],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }

  /**
   * Trigger a limit order by id
   * @returns payload promise for the transaction
   */
  async triggerLimitOrderById(
    triggererAddress: string,
    positionObject: MoveObjectType,
    marginCoin: MoveToken,
    perpetualAsset: Perpetual,
    orderId: bigint,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = getPriceFeed(marginCoin, this.network)
    const perpetualFeed = getPriceFeed(perpetualAsset, this.network)
    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${MODULES(this.config).mirage_scripts.address}::market_scripts::trigger_limit_order_by_id_entry` as `${string}::${string}::${string}`,
      functionArguments: [triggererAddress, positionObject, orderId, perpetualVaas, marginVaas],
      typeArguments: getPositionTypeArgument(this.config),
    }
    return payload
  }
}
