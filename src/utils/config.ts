import { AccountAddress } from '@aptos-labs/ts-sdk'

import mirage_config_movement_testnet from '../../mirage_config_movement_testnet.json'
import mirage_config_testnet from '../../mirage_config_testnet.json'

// import mirageConfigMainnet from '../../mirage_config_mainnet.json'
export enum Deployment {
  APTOS_TESTNET = 'testnet',
  MOVEMENT_PORTO = 'porto',
}

export const getDeploymentByChainId = (chainId: number): Deployment => {
  if (chainId == 2) {
    return Deployment.APTOS_TESTNET
  } else if (chainId == 177) {
    return Deployment.MOVEMENT_PORTO
  } else {
    throw new Error('no deployment with chaindId')
  }
}

export const getChainIdByDeployment = (deployment: Deployment): number => {
  switch (deployment) {
    case Deployment.APTOS_TESTNET:
      return 2
    case Deployment.MOVEMENT_PORTO:
      return 177
    default:
      throw new Error('no deployment with chaindId')
  }
}

export type MirageClientOptions = {
  fullnodeUrl?: string
  indexerUrl?: string
  mirageIndexerUrl?: string
  pythUrl?: string
  aptosApiKey?: string
  deployment?: Deployment
  customConfig?: MirageJsonConfig
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
  borrowSymbol: string
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
  fungibleAssets: FungibleAssetConfig[]
  oracles: OracleConfig[]
}

export class MirageConfig {
  chainId: number
  deployerAddress: AccountAddress
  markets: MarketsConfig
  vaults: VaultsConfig
  fungibleAssets: FungibleAssetConfigs
  oracles: OraclesConfig

  fullnodeUrl: string
  indexerUrl: string
  mirageIndexerUrl: string
  pythUrl: string
  aptosApiKey?: string
  deployment: Deployment

  constructor(options: MirageClientOptions) {
    if (options.deployment) {
      this.deployment = options.deployment
    } else {
      this.deployment = Deployment.APTOS_TESTNET
    }

    this.aptosApiKey = options.aptosApiKey
    this.pythUrl = options.pythUrl || getDefaultPythUrl(this.deployment)
    this.mirageIndexerUrl = options.mirageIndexerUrl || getDefaultMirageIndexerUrl(this.deployment)
    this.fullnodeUrl = options.fullnodeUrl || getDefaultFullnodeUrl(this.deployment)
    this.indexerUrl = options.indexerUrl || getDefaultIndexerUrl(this.deployment)

    let config: MirageJsonConfig
    if (options.customConfig) {
      config = options.customConfig
    } else if (this.deployment == Deployment.APTOS_TESTNET) {
      config = mirage_config_testnet
    } else {
      config = mirage_config_movement_testnet
    }

    this.chainId = config.chainId
    this.deployerAddress = AccountAddress.fromString(config.deployerAddress)
    this.markets = new Map()
    this.vaults = new Map()
    this.fungibleAssets = {}
    this.oracles = {}

    config.markets.forEach((market) => this.markets.set([market.perpSymbol, market.marginSymbol], market))
    config.vaults.forEach((vault) => this.vaults.set([vault.collateralSymbol, vault.borrowSymbol], vault))
    config.fungibleAssets.forEach((token) => (this.fungibleAssets[token.symbol] = token))
    config.oracles.forEach((oracle) => (this.oracles[oracle.name] = oracle))
  }
}

export const defaultMirageNetworks: { [deployment in Deployment]: NetworkConfig } = {
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

export const getDefaultFullnodeUrl = (deployment: Deployment | string): string => {
  switch (deployment as Deployment) {
    case Deployment.APTOS_TESTNET:
      return defaultMirageNetworks[Deployment.APTOS_TESTNET].fullnodeUrl
    case Deployment.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployment.MOVEMENT_PORTO].fullnodeUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}

export const getDefaultIndexerUrl = (deployment: Deployment): string => {
  switch (deployment) {
    case Deployment.APTOS_TESTNET:
      return defaultMirageNetworks[Deployment.APTOS_TESTNET].indexerUrl
    case Deployment.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployment.MOVEMENT_PORTO].indexerUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}

export const getDefaultMirageIndexerUrl = (deployment: Deployment): string => {
  switch (deployment) {
    case Deployment.APTOS_TESTNET:
      return defaultMirageNetworks[Deployment.APTOS_TESTNET].mirageIndexerUrl
    case Deployment.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployment.MOVEMENT_PORTO].mirageIndexerUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}

export const getDefaultPythUrl = (deployment: Deployment): string => {
  switch (deployment) {
    case Deployment.APTOS_TESTNET:
      return defaultMirageNetworks[Deployment.APTOS_TESTNET].pythUrl
    case Deployment.MOVEMENT_PORTO:
      return defaultMirageNetworks[Deployment.MOVEMENT_PORTO].pythUrl
    default:
      throw new Error(`cannot find deployment ${deployment}`)
  }
}
