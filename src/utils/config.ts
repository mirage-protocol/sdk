import { AccountAddress, Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { AuthConfig, authExchange, AuthUtilities } from '@urql/exchange-auth'
import { cacheExchange, Client, CombinedError, createClient, errorExchange, fetchExchange, Operation } from 'urql'

import mirageConfigMainnet from '../../mirage_config_mainnet.json'
import mirageConfigMovementTestnet from '../../mirage_config_movement_testnet.json'
import mirageConfigTestnet from '../../mirage_config_testnet.json'

export type ModulesConfig = {
  mirage: string
  mirage_core: string
  mirage_oracle: string
  mirage_scripts: string
  mirage_swap: string
  keeper_scripts: string
  market: string
}

export type MarketsConfig = {
  [market: string]: {
    [pair: string]: string
  }
}

export type VaultsConfig = {
  [token: string]: {
    [denomination: string]: string
  }
}

export type TokensConfig = {
  [token: string]: string
}

export class MirageConfig {
  deployerAddress: AccountAddress
  markets: MarketsConfig
  vaults: VaultsConfig
  tokens: TokensConfig

  constructor(config: { deployerAddress: string; markets: MarketsConfig; vaults: VaultsConfig; tokens: TokensConfig }) {
    this.deployerAddress = AccountAddress.fromString(config.deployerAddress)
    this.markets = config.markets
    this.vaults = config.vaults
    this.tokens = config.tokens
  }
}

export const mirageConfigFromNetwork = (network: Network | string): MirageConfig => {
  const n = getNetwork(network)
  switch (n) {
    case Network.MAINNET:
      return new MirageConfig({ ...mirageConfigMainnet })
    case Network.CUSTOM:
      return new MirageConfig({ ...mirageConfigMovementTestnet })
    default:
      return new MirageConfig({ ...mirageConfigTestnet })
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
