import { getPrice, getPriceFeedUpdateData } from '../../constants'
import { MarketConfig } from '../../utils'
import { MirageClientBase } from '../base'

export class MarketClientBase extends MirageClientBase {
  marketExists = (perpSymbol: string, collateralSymbol: string): boolean => {
    return this.config.marketExists(perpSymbol, collateralSymbol)
  }

  public getAllMarkets = (): MarketConfig[] => {
    return Object.values(this.config.markets)
  }

  public getAllMarketAddresses = (): string[] => {
    return Object.values(this.config.markets).map((market) => market.address)
  }

  public getMarketIdFromAddress = (marketAddress: string): { perpSymbol: string; marginSymbol: string } => {
    for (const [[perpSymbol, marginSymbol], marketConfig] of Object.entries(this.config.markets)) {
      if (marketConfig.address == marketAddress) return { perpSymbol, marginSymbol }
    }
    throw new Error(`market not found' ${marketAddress}`)
  }

  public getMarketAddress = (perpSymbol: string, marginSymbol: string): string => {
    const market = this.config.markets.get([perpSymbol, marginSymbol])
    if (!market) {
      throw new Error(`market not found' ${perpSymbol}/${marginSymbol}`)
    }
    return market.address
  }

  public getMarketPerpPriceFeedId = (perpSymbol: string, marginSymbol: string): string => {
    const market = this.config.markets.get([perpSymbol, marginSymbol])
    if (!market) {
      throw new Error(`market not found' ${perpSymbol}/${marginSymbol}`)
    }
    return this.config.getOraclePriceFeedId(market.perpOracle)
  }

  public getMarketMarginPriceFeedId = (perpSymbol: string, marginSymbol: string): string => {
    const market = this.config.markets.get([perpSymbol, marginSymbol])
    if (!market) {
      throw new Error(`market not found' ${perpSymbol}/${marginSymbol}`)
    }
    return this.config.getOraclePriceFeedId(market.marginOracle)
  }

  public getMarketPerpPriceFeedUpdate = async (perpSymbol: string, marginSymbol: string): Promise<number[]> => {
    const priceFeedId = this.getMarketPerpPriceFeedId(perpSymbol, marginSymbol)
    return priceFeedId ? await getPriceFeedUpdateData(priceFeedId, this.network) : []
  }

  public getMarketMarginPriceFeedUpdate = async (perpSymbol: string, marginSymbol: string): Promise<number[]> => {
    const priceFeedId = this.getMarketMarginPriceFeedId(perpSymbol, marginSymbol)
    return priceFeedId ? await getPriceFeedUpdateData(priceFeedId, this.network) : []
  }

  public getMarketPerpPrice = async (perpSymbol: string, marginSymbol: string): Promise<number> => {
    const priceFeedId = this.getMarketPerpPriceFeedId(perpSymbol, marginSymbol)
    return await getPrice(priceFeedId, this.network)
  }

  public getMarketMarginPrice = async (perpSymbol: string, marginSymbol: string): Promise<number> => {
    const priceFeedId = this.getMarketMarginPriceFeedId(perpSymbol, marginSymbol)
    return await getPrice(priceFeedId, this.network)
  }
}
