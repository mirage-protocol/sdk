import { AccountAddress, Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { AuthConfig, authExchange, AuthUtilities } from '@urql/exchange-auth'
import { cacheExchange, Client, CombinedError, createClient, errorExchange, fetchExchange, Operation } from 'urql'

// import mirageConfigMainnet from '../../mirage_config_mainnet.json'
// import mirageConfigMovementTestnet from '../../mirage_config_movement_testnet.json'
import mirageConfigTestnet from '../../mirage_config_testnet.json'

export type MarketConfig = {
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

export type TokenConfig = {
  symbol: string
  address: string
  name: string
  coinType: string
  decimals: number
}

export type TokensConfig = {
  [token: string]: TokenConfig
}

export type MirageJsonConfig = {
  deployerAddress: string
  markets: MarketConfig[]
  vaults: VaultConfig[]
  tokens: TokenConfig[]
  oracles: OracleConfig[]
}

export class MirageConfig {
  deployerAddress: AccountAddress
  markets: MarketsConfig
  vaults: VaultsConfig
  tokens: TokensConfig
  oracles: OraclesConfig

  constructor(deployerAddress: string) {
    this.deployerAddress = AccountAddress.fromString(deployerAddress)
    this.markets = new Map()
    this.vaults = new Map()
    this.tokens = {}
    this.oracles = {}
  }

  public static fromJsonConfig(jsonConfig: MirageJsonConfig): MirageConfig {
    const config = new MirageConfig(jsonConfig.deployerAddress)
    jsonConfig.markets.forEach((market) => config.markets.set([market.perpSymbol, market.marginSymbol], market))
    jsonConfig.vaults.forEach((vault) => config.vaults.set([vault.collateralSymbol, vault.marginSymbol], vault))
    jsonConfig.tokens.forEach((token) => (config.tokens[token.symbol] = token))
    jsonConfig.oracles.forEach((oracle) => (config.oracles[oracle.name] = oracle))
    return config
  }

  // oracle
  public getAllOracles = (): string[] => {
    return Object.keys(this.oracles)
  }

  public getOracleNameFromAddress = (oracleAddress: string): string => {
    const oracleName = Object.entries(this.oracles).find(
      ([, oracleConfig]) => oracleConfig.address === oracleAddress,
    )?.[0]
    if (!oracleName) {
      throw new Error(`oracle not found' ${oracleAddress}`)
    }
    return oracleName
  }

  public getOraclePriceFeedId = (oracleName: string): string => {
    if (!this.oracles[oracleName]) {
      throw new Error(`oracle not found' ${oracleName}`)
    }
    return this.oracles[oracleName].priceFeedId
  }

  // token
  public getAllTokens = (): string[] => {
    return Object.keys(this.tokens)
  }

  public getTokenSymbolFromAddress = (tokenAddress: string): string => {
    const tokenSymbol = Object.entries(this.tokens).find(([, tokenConfig]) => tokenConfig.address === tokenAddress)?.[0]
    if (!tokenSymbol) {
      throw new Error(`token not found' ${tokenAddress}`)
    }
    return tokenSymbol
  }

  public getTokenCoinType = (tokenSymbol: string): string => {
    if (!this.tokens[tokenSymbol]) {
      throw new Error(`token not found' ${tokenSymbol}`)
    }
    return this.tokens[tokenSymbol].coinType
  }

  public getTokenAddress = (tokenSymbol: string): string => {
    if (!this.tokens[tokenSymbol]) {
      throw new Error(`token not found' ${tokenSymbol}`)
    }
    return this.tokens[tokenSymbol].address
  }

  public getTokenDecimals = (tokenSymbol: string): number => {
    if (!this.tokens[tokenSymbol]) {
      throw new Error(`token not found' ${tokenSymbol}`)
    }
    return this.tokens[tokenSymbol].decimals
  }

  public getTokenName = (tokenSymbol: string): string => {
    if (!this.tokens[tokenSymbol]) {
      throw new Error(`token not found' ${tokenSymbol}`)
    }
    return this.tokens[tokenSymbol].name
  }

  // vaults
  public getAllVaultCollections = (): string[] => {
    return Object.keys(this.markets)
  }

  public getAllVaultCollectionAddresses = (): string[] => {
    return Object.values(this.vaults).map((vault) => vault.address)
  }

  public getVaultTokensFromAddress = (vaultAddress: string): { collateralSymbol: string; borrowSymbol: string } => {
    for (const [[collateralSymbol, borrowSymbol], vaultConfig] of Object.entries(this.vaults)) {
      if (vaultConfig.address === vaultAddress) return { collateralSymbol, borrowSymbol }
    }
    throw new Error(`vault not found' ${vaultAddress}`)
  }

  public getVaultCollateralPriceFeedId = (borrowSymbol: string, collateralSymbol: string): string => {
    if (!this.vaults.has([borrowSymbol, collateralSymbol])) {
      throw new Error(`vault not found' ${collateralSymbol}/${borrowSymbol}`)
    }
    const oracleName = this.vaults.get([borrowSymbol, collateralSymbol])!.collateralOracle
    return this.getOraclePriceFeedId(oracleName)
  }

  public getVaultBorrowPriceFeedId = (borrowSymbol: string, collateralSymbol: string): string => {
    if (!this.vaults.has([borrowSymbol, collateralSymbol])) {
      throw new Error(`vault not found' ${collateralSymbol}/${borrowSymbol}`)
    }
    const oracleName = this.vaults.get([borrowSymbol, collateralSymbol])!.borrowOracle
    return this.getOraclePriceFeedId(oracleName)
  }

  public getVaultAddress = (borrowSymbol: string, collateralSymbol: string): string => {
    if (!this.vaults.has([borrowSymbol, collateralSymbol])) {
      throw new Error(`vault not found' ${collateralSymbol}/${borrowSymbol}`)
    }
    return this.vaults.get([borrowSymbol, collateralSymbol])!.address
  }

  // market
  public getAllMarkets = (): string[] => {
    return Object.keys(this.markets)
  }

  public marketExists = (perpSymbol: string, collateralSymbol: string): boolean => {
    return this.markets.has([perpSymbol, collateralSymbol])
  }

  public getAllMarketAddresses = (): string[] => {
    return Object.values(this.markets).map((market) => market.address)
  }

  public getMarketIdFromAddress = (marketAddress: string): { perpSymbol: string; marginSymbol: string } => {
    for (const [[perpSymbol, marginSymbol], marketConfig] of Object.entries(this.markets)) {
      if (marketConfig.address == marketAddress) return { perpSymbol, marginSymbol }
    }
    throw new Error(`market not found' ${marketAddress}`)
  }

  public getMarketAddress = (perpSymbol: string, marginSymbol: string): string => {
    const market = this.markets.get([perpSymbol, marginSymbol])
    if (!market) {
      throw new Error(`market not found' ${perpSymbol}/${marginSymbol}`)
    }
    return market.address
  }

  public getMarketPerpPriceFeedId = (perpSymbol: string, marginSymbol: string): string => {
    const market = this.markets.get([perpSymbol, marginSymbol])
    if (!market) {
      throw new Error(`market not found' ${perpSymbol}/${marginSymbol}`)
    }
    return this.getOraclePriceFeedId(market.perpOracle)
  }

  public getMarketMarginPriceFeedId = (perpSymbol: string, marginSymbol: string): string => {
    const market = this.markets.get([perpSymbol, marginSymbol])
    if (!market) {
      throw new Error(`market not found' ${perpSymbol}/${marginSymbol}`)
    }
    return this.getOraclePriceFeedId(market.marginOracle)
  }
}

export const mirageConfigFromNetwork = (network: Network | string): MirageConfig => {
  const n = getNetwork(network)
  switch (n) {
    // case Network.MAINNET:
    //   return new MirageConfig({ ...mirageConfigMainnet })
    // case Network.CUSTOM:
    //   return new MirageConfig({ ...mirageConfigMovementTestnet })
    default:
      return MirageConfig.fromJsonConfig(mirageConfigTestnet)
  }
}

// dupe to avoid circular imports in client base
const getNetwork = (network: Network | string): Network => {
  if (typeof network === 'string') {
    switch (network) {
      case 'mainnet':
        return Network.MAINNET
      case 'movement-testnet':
        return Network.CUSTOM
      case 'custom':
        return Network.CUSTOM
      default:
        return Network.TESTNET
    }
  }
  return network
}

// store copies of the client so they don't need to be rebuilt when fetched
const defaultMainnetClient = new Aptos(new AptosConfig({ network: Network.MAINNET }))
const defaultTestnetClient = new Aptos(new AptosConfig({ network: Network.TESTNET }))
// https://aptos.testnet.suzuka.movementlabs.xyz/v1
const defaultMovementTestnetClient = new Aptos(
  new AptosConfig({
    network: Network.CUSTOM,
    fullnode: 'https://aptos.testnet.suzuka.movementlabs.xyz/v1',
    indexer: 'https://indexer.testnet.suzuka.movementlabs.xyz/v1/graphql',
  }),
)

/**
 * Get an Aptos client for a network
 * @param network the network to use, if not specific = "mainnet"
 * @returns a useable aptos client
 */
export const defaultAptosClient = (network: Network | string | string = Network.MAINNET, nodeURI?: string): Aptos => {
  if (nodeURI !== undefined) {
    return new Aptos(new AptosConfig({ network: getNetwork(network), fullnode: nodeURI }))
  }
  switch (network) {
    case Network.MAINNET:
      return defaultMainnetClient
    // TODO make it work for movement-mainnet (network custom needs a seperate switch somehow)
    case Network.CUSTOM:
      return defaultMovementTestnetClient
    case 'movement-testnet':
      return defaultMovementTestnetClient
    default:
      return defaultTestnetClient
  }
}

export const graphqlClientWithUri = (gqlURI: string, API_KEY?: string): Client => {
  const exchanges = [
    fetchExchange,
    cacheExchange,
    errorExchange({
      onError: (error) => {
        console.error('GraphQL Error:', error)
      },
    }),
  ]

  if (API_KEY) {
    exchanges.push(
      authExchange(async (utils: AuthUtilities): Promise<AuthConfig> => {
        return {
          addAuthToOperation(operation: Operation): Operation {
            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${API_KEY}`,
            })
          },
          didAuthError: (error: CombinedError): boolean => {
            return error.response.status === 401
          },
          refreshAuth: async (): Promise<void> => {},
        }
      }),
    )
  }

  return createClient({
    url: gqlURI,
    exchanges,
  })
}

// TODO: make this not fixed to aptos testnet
export const defaultAptosGraphqlClient = (network: string, API_KEY?: string): Client => {
  // TODO: UPDATE WITH NEW API ENDPOINTS
  let uriStr = 'https://api.testnet.aptoslabs.com/v1/graphql'
  if (network == 'testnet') {
    uriStr = 'https://api.testnet.aptoslabs.com/v1/graphql'
  } else if (network == 'mainnet') {
    uriStr = 'https://api.mainnet.aptoslabs.com/v1/graphql'
  } else if (network == 'movement-testnet') {
    uriStr = 'https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql'
  }
  return graphqlClientWithUri(uriStr, API_KEY)
}

export const defaultMirageGraphqlClient = (network: string): Client => {
  // TODO: UPDATE WITH NEW API ENDPOINTS
  let uriStr = ''
  if (network == 'testnet') {
    uriStr = 'https://api-movement-testnet.mirage.money/v1/graphql'
  } else {
    uriStr = 'https://api-movement-testnet.mirage.money/v1/graphql'
  }
  return createClient({
    url: uriStr,
    exchanges: [
      fetchExchange,
      cacheExchange,
      errorExchange({
        onError: (error) => {
          console.error('GraphQL Error:', error)
        },
      }),
    ],
  })
}
