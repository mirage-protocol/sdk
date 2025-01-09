import { MarketConfig, MirageConfig } from '../../utils'
import { MirageClientBase } from '../base'
import { OracleClient } from '../oracle/oracleClient'

export class MarketClientBase extends MirageClientBase {
  private readonly oracles: OracleClient

  constructor(oracleClient: OracleClient, config: MirageConfig) {
    super(config)
    this.oracles = oracleClient
  }

  public static createMarketName = (perpSymbol: string, collateralSymbol: string): string => {
    return `${perpSymbol}/${collateralSymbol}`
  }

  public marketExists = (perpSymbol: string, collateralSymbol: string): boolean => {
    return !!this.config.markets[MarketClientBase.createMarketName(perpSymbol, collateralSymbol)]
  }

  public getMarket = (perpSymbol: string, marginSymbol: string): MarketConfig => {
    const market = this.config.markets[MarketClientBase.createMarketName(perpSymbol, marginSymbol)]
    if (!market) {
      throw new Error(`market not found ${perpSymbol}/${marginSymbol}`)
    }
    return market
  }

  public getAllMarkets = (): MarketConfig[] => {
    return Object.values(this.config.markets)
  }

  public getAllMarketAddresses = (): string[] => {
    return Object.values(this.config.markets).map((market) => market.address)
  }

  public getMarketIdFromAddress = (marketAddress: string): { perpSymbol: string; marginSymbol: string } => {
    for (const [_, marketConfig] of Object.entries(this.config.markets)) {
      if (marketConfig.address == marketAddress) return { perpSymbol: marketConfig.perpSymbol, marginSymbol: marketConfig.marginSymbol }
    }
    throw new Error(`market not found ${marketAddress}`)
  }

  public getMarketAddress = (perpSymbol: string, marginSymbol: string): string => {
    return this.getMarket(perpSymbol, marginSymbol).address
  }

  public getPerpPriceFeedId = (perpSymbol: string, marginSymbol: string): string => {
    const perpOracle = this.getMarket(perpSymbol, marginSymbol).perpOracle
    return this.oracles.getPriceFeedId(perpOracle)
  }

  public getMarginPriceFeedId = (perpSymbol: string, marginSymbol: string): string => {
    const marginOracle = this.getMarket(perpSymbol, marginSymbol).marginOracle
    return this.oracles.getPriceFeedId(marginOracle)
  }

  public getPerpPriceFeedUpdate = async (perpSymbol: string, marginSymbol: string): Promise<number[]> => {
    const perpOracle = this.getMarket(perpSymbol, marginSymbol).perpOracle
    return this.oracles.getPriceFeedUpdateData(perpOracle)
  }

  public getMarginPriceFeedUpdate = async (perpSymbol: string, marginSymbol: string): Promise<number[]> => {
    const marginOracle = this.getMarket(perpSymbol, marginSymbol).marginOracle
    return this.oracles.getPriceFeedUpdateData(marginOracle)
  }

  public getPerpPrice = async (perpSymbol: string, marginSymbol: string): Promise<number> => {
    const perpOracle = this.getMarket(perpSymbol, marginSymbol).perpOracle
    return this.oracles.getPrice(perpOracle)
  }

  public getMarginPrice = async (perpSymbol: string, marginSymbol: string): Promise<number> => {
    const marginOracle = this.getMarket(perpSymbol, marginSymbol).marginOracle
    return this.oracles.getPrice(marginOracle)
  }
}
