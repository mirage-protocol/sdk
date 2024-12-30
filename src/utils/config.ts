import { AccountAddress } from '@aptos-labs/ts-sdk'

// import mirageConfigMainnet from '../../mirage_config_mainnet.json'
export enum Deployments {
  APTOS_TESTNET = 'testnet',
  MOVEMENT_PORTO = 'porto',
}

export const getDeploymentByChainId = (chainId: number): Deployments => {
  if (chainId == 2) {
    return Deployments.APTOS_TESTNET
  } else if (chainId == 177) {
    return Deployments.MOVEMENT_PORTO
  } else {
    throw new Error('no deployment with chaindId')
  }
}

export type MirageClientOptions = {
  fullnodeUrl?: string
  indexerUrl?: string
  mirageIndexerUrl?: string
  pythUrl?: string
  aptosApiKey?: string
}

export type NetworkConfig = {
  fullnodeUrl: string
  indexerUrl: string
  mirageIndexerUrl: string
  pythUrl: string
}

export type MarketConfig = {
  chainId: number
  address: string
  name: string
  perpSymbol: string
  marginSymbol: string
  marginOracle: string
  perpOracle: string
  marginToken: string
}
export type MarketsConfig = Map<[string, string], MarketConfig>

export type OracleConfig = {
  name: string
  address: string
  priceFeedId: string
  priceMultiplier: number
}

export type OraclesConfig = {
  [oracle: string]: OracleConfig
}

export type VaultConfig = {
  address: string
  name: string
  collateralSymbol: string
  marginSymbol: string
  collateralOracle: string
  borrowOracle: string
}

export type VaultsConfig = Map<[string, string], VaultConfig>

export type FungibleAssetConfig = {
  symbol: string
  address: string
  name: string
  coinType: `${string}::${string}::${string}`
  decimals: number
}

export type FungibleAssetConfigs = {
  [token: string]: FungibleAssetConfig
}

export type MirageJsonConfig = {
  chainId: number
  deployerAddress: string
  markets: MarketConfig[]
  vaults: VaultConfig[]
  tokens: FungibleAssetConfig[]
  oracles: OracleConfig[]
}

export class MirageConfig {
  chainId: number
  deployerAddress: AccountAddress
  markets: MarketsConfig
  vaults: VaultsConfig
  fungibleAssets: FungibleAssetConfigs
  oracles: OraclesConfig

  constructor(chainId: number, deployerAddress: string) {
    this.chainId = chainId
    this.deployerAddress = AccountAddress.fromString(deployerAddress)
    this.markets = new Map()
    this.vaults = new Map()
    this.fungibleAssets = {}
    this.oracles = {}
  }

  public static fromJsonConfig(jsonConfig: MirageJsonConfig): MirageConfig {
    const config = new MirageConfig(jsonConfig.chainId, jsonConfig.deployerAddress)
    jsonConfig.markets.forEach((market) => config.markets.set([market.perpSymbol, market.marginSymbol], market))
    jsonConfig.vaults.forEach((vault) => config.vaults.set([vault.collateralSymbol, vault.marginSymbol], vault))
    jsonConfig.tokens.forEach((token) => (config.fungibleAssets[token.symbol] = token))
    jsonConfig.oracles.forEach((oracle) => (config.oracles[oracle.name] = oracle))
    return config
  }
}

export const defaultMirageNetworks: { [deployment in Deployments]: NetworkConfig } = {
  testnet: {
    fullnodeUrl: 'https://fullnode.testnet.aptoslabs.com/v1',
    indexerUrl: 'https://api.testnet.aptoslabs.com/v1/graphql',
    mirageIndexerUrl: 'https://testnet.mirage.money/v1/graphql',
    pythUrl: 'https://hermes-beta.pyth.network',
  },
  porto: {
    fullnodeUrl: 'https://aptos.testnet.porto.movementlabs.xyz/v1',
    indexerUrl: 'https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql',
    mirageIndexerUrl: 'https://porto.mirage.money/v1/graphql',
    pythUrl: 'https://hermes-beta.pyth.network',
  },
}

export const getDefaultFullnodeUrl = (deployment: Deployments | string): string => {
  switch (deployment as Deployments) {
    case Deployments.APTOS_TESTNET:
      return defaultMirageNetworks[Deployments.APTOS_TESTNET].fullnodeUrl
    case Deployments.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployments.MOVEMENT_PORTO].fullnodeUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}

export const getDefaultIndexerUrl = (deployment: Deployments): string => {
  switch (deployment) {
    case Deployments.APTOS_TESTNET:
      return defaultMirageNetworks[Deployments.APTOS_TESTNET].indexerUrl
    case Deployments.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployments.MOVEMENT_PORTO].indexerUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}

export const getDefaultMirageIndexerUrl = (deployment: Deployments): string => {
  switch (deployment) {
    case Deployments.APTOS_TESTNET:
      return defaultMirageNetworks[Deployments.APTOS_TESTNET].mirageIndexerUrl
    case Deployments.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployments.MOVEMENT_PORTO].mirageIndexerUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}

export const getDefaultPythUrl = (deployment: Deployments): string => {
  switch (deployment) {
    case Deployments.APTOS_TESTNET:
      return defaultMirageNetworks[Deployments.APTOS_TESTNET].pythUrl
    case Deployments.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployments.MOVEMENT_PORTO].pythUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}
