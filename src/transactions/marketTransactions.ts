import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { getModuleAddress, getNetwork, getPriceFeedUpdateData, MoveModules } from '../constants'
import { PositionSide } from '../entities'
import { getDecimal8Argument } from './'
import { BaseTransactions } from './baseTransactions'

export class MarketTransactions extends BaseTransactions {
  /**
   * Open a position in a market at the current price and registers user resources if uninitialized
   * @returns script or payload promise for the transaction
   */
  async openPosition(
    marketName: string,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desired_price: number,
    maxPriceSlippage: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::create_and_open_position_entry`,

      functionArguments: [
        this.config.getMarketAddress(marketName),
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        side == PositionSide.LONG,
        getDecimal8Argument(desired_price),
        getDecimal8Argument(maxPriceSlippage),
      ],
    }
  }

  /**
   * Open a position in a market at the current price and registers user resources if uninitialized
   * @returns script or payload promise for the transaction
   */
  async openPositionWithTpsl(
    marketName: string,
    marginAmount: number,
    positionSize: number,
    side: PositionSide,
    desired_price: number,
    maxPriceSlippage: number,
    takeProfitPrice: number,
    stopLossPrice: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::create_and_open_position_with_tpsl_entry`,

      functionArguments: [
        this.config.getMarketAddress(marketName),
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        side == PositionSide.LONG,
        getDecimal8Argument(desired_price),
        getDecimal8Argument(maxPriceSlippage),
        getDecimal8Argument(takeProfitPrice),
        getDecimal8Argument(stopLossPrice),
      ],
    }
  }

  /**
   * Close a position in a market at the current price
   * @returns payload promise for the transaction
   */
  async closePosition(marketName: string, positionObject: MoveObjectType): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::close_position_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas],
    }
    return payload
  }

  /**
   * Place a limit order on a new position that can be trigger when the market price
   * of a long/short is below/above a trigger price
   * @returns payload promise for the transaction
   */
  async openPositionAndPlaceLimitOrder(
    marketName: string,
    marginAmount: number,
    positionSize: number,
    triggerPrice: number,
    maxPriceSlippage: number,
    triggersAbove: boolean,
    expiration: bigint, // in seconds,
    isLong: boolean,
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::create_position_and_place_limit_order_entry`,
      functionArguments: [
        this.config.getMarketAddress(marketName),
        perpetualVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        getDecimal8Argument(triggerPrice),
        getDecimal8Argument(maxPriceSlippage),
        false, // is_decrease only is always false when creating a new position
        triggersAbove,
        expiration.toString(), // sdk breaks for large non-string integers
        isLong,
      ],
    }
  }

  /**
   * Place a limit order that can be trigger when the market price
   * of a long/short is below/above a trigger price
   * @returns payload promise for the transaction
   */
  async placeLimitOrder(
    marketName: string,
    positionObject: MoveObjectType,
    marginAmount: number,
    positionSize: number,
    isLong: boolean,
    triggerPrice: number,
    maxPriceSlippage: number,
    isIncrease: boolean,
    triggersAbove: boolean,
    expiration: bigint, // in seconds
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::place_limit_order_entry`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        getDecimal8Argument(marginAmount), // always 8 decimals
        getDecimal8Argument(positionSize),
        isLong,
        getDecimal8Argument(triggerPrice),
        getDecimal8Argument(maxPriceSlippage),
        isIncrease,
        triggersAbove,
        expiration.toString(), // sdk breaks for large non-string integers
      ],
    }
  }

  async updateLimitOrder(
    marketName: string,
    limitOrderObject: MoveObjectType,
    positionSize: number,
    isLong: boolean,
    triggerPrice: number,
    maxPriceSlippage: number,
    isDecreaseOnly: boolean,
    triggersAbove: boolean,
    expiration: bigint, // in seconds
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    return {
      function: `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::limit_order::update_limit_order`,
      functionArguments: [
        limitOrderObject,
        perpetualVaas,
        getDecimal8Argument(positionSize),
        isLong,
        getDecimal8Argument(triggerPrice),
        getDecimal8Argument(maxPriceSlippage),
        isDecreaseOnly,
        triggersAbove,
        expiration.toString(), // sdk breaks for large non-string integers
      ],
    }
  }

  /**
   * Cancel a limit order
   * @returns payload promise for the transaction
   */
  async cancelLimitOrder(limitOrdersObject: MoveObjectType): Promise<InputEntryFunctionData> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::limit_order::cancel_limit_order_entry` as `${string}::${string}::${string}`,
      functionArguments: [limitOrdersObject],
    }
    return payload
  }

  async updateTpsl(
    marketName: string,
    tpslObject: MoveObjectType,
    take_profit_price: number,
    stop_loss_price: number,
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::tpsl::update_tpsl` as `${string}::${string}::${string}`,
      functionArguments: [
        tpslObject,
        perpetualVaas,
        getDecimal8Argument(take_profit_price),
        getDecimal8Argument(stop_loss_price),
      ],
    }
    return payload
  }

  async placeTpsl(
    marketName: string,
    positionObject: MoveObjectType,
    take_profit_price: number,
    stop_loss_price: number,
  ): Promise<InputEntryFunctionData> {
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::place_tpsl_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        getDecimal8Argument(take_profit_price),
        getDecimal8Argument(stop_loss_price),
      ],
    }
    return payload
  }

  /**
   * Cancel a limit order
   * @returns payload promise for the transaction
   */
  async cancelTpsl(tpslObject: MoveObjectType): Promise<InputEntryFunctionData> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::tpsl::cancel_tpsl` as `${string}::${string}::${string}`,
      functionArguments: [tpslObject],
    }
    return payload
  }

  /**
   * Update the margin of a position
   * @returns payload promise for the transaction
   */
  async updateMargin(
    marketName: string,
    positionObject: MoveObjectType,
    oldMarginAmount: number,
    newMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const diff =
      newMarginAmount > oldMarginAmount ? newMarginAmount - oldMarginAmount : oldMarginAmount - newMarginAmount
    const functionName = newMarginAmount > oldMarginAmount ? 'increase' : 'decrease'
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::${functionName}_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
    }
    return payload
  }

  /**
   * increase the margin of a position
   * @returns payload promise for the transaction
   */
  async increaseMargin(
    marketName: string,
    positionObject: MoveObjectType,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::increase_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increaseMarginAmount)],
    }
    return payload
  }

  /**
   * increase the margin of a limit order
   * @returns payload promise for the transaction
   */
  async increaseLimitOrderMargin(
    limitOrderObject: MoveObjectType,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::increase_limit_order_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [limitOrderObject, getDecimal8Argument(increaseMarginAmount)],
    }
    return payload
  }

  /**
   * decrease the margin of a limit order
   * @returns payload promise for the transaction
   */
  async decreaseLimitOrderMargin(
    limitOrderObject: MoveObjectType,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::decrease_limit_order_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [limitOrderObject, getDecimal8Argument(decreaseMarginAmount)],
    }
    return payload
  }

  /**
   * increase the position size and increase the margin of a position
   * @returns payload promise for the transaction
   */
  async increaseSizeAndIncreaseMargin(
    marketName: string,
    positionObject: MoveObjectType,
    increasePositionSize: number,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::increase_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(increasePositionSize),
        getDecimal8Argument(increaseMarginAmount),
      ],
    }
    return payload
  }

  /**
   * increase the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async increaseSizeAndDecreaseMargin(
    marketName: string,
    positionObject: MoveObjectType,
    increasePositionSize: number,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::increase_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(increasePositionSize),
        getDecimal8Argument(decreaseMarginAmount),
      ],
    }
    return payload
  }

  /**
   * decrease the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async decreaseSizeAndDecreaseMargin(
    marketName: string,
    positionObject: MoveObjectType,
    decreasePositionSize: number,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::decrease_position_size_and_decrease_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(decreasePositionSize),
        getDecimal8Argument(decreaseMarginAmount),
      ],
    }
    return payload
  }

  /**
   * decrease the position size and decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async decreaseSizeAndIncreaseMargin(
    marketName: string,
    positionObject: MoveObjectType,
    decreasePositionSize: number,
    increaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::decrease_position_size_and_increase_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [
        positionObject,
        perpetualVaas,
        marginVaas,
        getDecimal8Argument(decreasePositionSize),
        getDecimal8Argument(increaseMarginAmount),
      ],
    }
    return payload
  }

  /**
   * decrease the margin of a position
   * @returns payload promise for the transaction
   */
  async decreaseMargin(
    marketName: string,
    positionObject: MoveObjectType,
    decreaseMarginAmount: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::decrease_margin_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreaseMarginAmount)],
    }
    return payload
  }

  /**
   * Update the position size of a position
   * @returns payload promise for the transaction
   */
  async updatePositionSize(
    marketName: string,
    positionObject: MoveObjectType,
    oldPositionSize: number,
    newPositionSize: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const isIncrease = newPositionSize > oldPositionSize
    const diff = isIncrease ? newPositionSize - oldPositionSize : oldPositionSize - newPositionSize
    const functionName = isIncrease ? 'market::increase_position_size' : 'market::decrease_position_size'

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::${functionName}` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(diff)],
    }
    return payload
  }

  /**
   * increase the position size of a position
   * @returns payload promise for the transaction
   */
  async increasePositionSize(
    marketName: string,
    positionObject: MoveObjectType,
    increasePositionSize: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::market::increase_position_size` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(increasePositionSize)],
    }
    return payload
  }

  /**
   * decrease the position size of a position
   * @returns payload promise for the transaction
   */
  async decreasePositionSize(
    marketName: string,
    positionObject: MoveObjectType,
    decreasePositionSize: number,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::decrease_position_size_entry` as `${string}::${string}::${string}`,
      functionArguments: [positionObject, perpetualVaas, marginVaas, getDecimal8Argument(decreasePositionSize)],
    }
    return payload
  }

  /**
   * Trigger a take profit or stop loss of the position at address to_trigger
   * @returns payload promise for the transaction
   */
  async triggerTpsl(
    marketName: string,
    triggererAddress: string,
    tpslObject: MoveObjectType,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::trigger_tpsl_entry` as `${string}::${string}::${string}`,
      functionArguments: [triggererAddress, tpslObject, perpetualVaas, marginVaas],
    }
    return payload
  }

  /**
   * cleanup tpsl object for destroyed positions for gas refund
   * @returns payload promise for the transaction
   */
  async cleanupTpsl(tpslObject: MoveObjectType): Promise<InputEntryFunctionData> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::tpsl::cleanup_tpsl` as `${string}::${string}::${string}`,
      functionArguments: [tpslObject],
    }
    return payload
  }

  /**
   * Liquidate a position at address to_trigger
   * @returns payload promise for the transaction
   */
  async liquidatePosition(
    marketName: string,
    triggererAddress: string,
    positionObject: MoveObjectType,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::liquidate_position_entry` as `${string}::${string}::${string}`,
      functionArguments: [triggererAddress, positionObject, perpetualVaas, marginVaas],
    }
    return payload
  }

  /**
   * Trigger a limit order at the index at address to_trigger
   * @returns payload promise for the transaction
   */
  async triggerLimitOrder(
    marketName: string,
    triggererAddress: string,
    limitOrderObject: MoveObjectType,
  ): Promise<InputEntryFunctionData> {
    const marginFeed = this.config.getMarketMarginPriceFeedId(marketName)
    const perpetualFeed = this.config.getMarketPerpPriceFeedId(marketName)

    const marginVaas = marginFeed ? await getPriceFeedUpdateData(marginFeed, getNetwork(this.network)) : []
    const perpetualVaas = perpetualFeed ? await getPriceFeedUpdateData(perpetualFeed, getNetwork(this.network)) : []

    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE_SCRIPTS, this.config.deployerAddress)}::market_scripts::trigger_limit_order_entry` as `${string}::${string}::${string}`,
      functionArguments: [triggererAddress, limitOrderObject, perpetualVaas, marginVaas],
    }
    return payload
  }

  /**
   * cleanup limit order object for destroyed positions for gas refund
   * @returns payload promise for the transaction
   */
  async cleanupLimitOrder(limitOrderObject: MoveObjectType): Promise<InputEntryFunctionData> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MARKET, this.config.deployerAddress)}::limit_order::cleanup_limit_order` as `${string}::${string}::${string}`,
      functionArguments: [limitOrderObject],
    }
    return payload
  }
}
