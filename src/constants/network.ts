import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { AptosPriceServiceConnection } from '@pythnetwork/pyth-aptos-js'
import { AuthConfig, authExchange, AuthUtilities } from '@urql/exchange-auth'
import { cacheExchange, Client, CombinedError, createClient, errorExchange, fetchExchange, Operation } from 'urql'

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

const mainnetPythClient = new AptosPriceServiceConnection(`https://hermes.pyth.network`, {
  priceFeedRequestConfig: {
    // Provide this option to retrieve signed price updates for on-chain contracts.
    // Ignore this option for off-chain use.
    binary: true,
  },
})

// TODO: check if this works for movement testnet
const testnetPythClient = new AptosPriceServiceConnection(`https://hermes-beta.pyth.network`, {
  priceFeedRequestConfig: {
    // Provide this option to retrieve signed price updates for on-chain contracts.
    // Ignore this option for off-chain use.
    binary: true,
  },
})

/**
 * Get an Aptos client for a network
 * @param network the network to use, if not specific = "mainnet"
 * @returns a useable aptos client
 */
export const aptosClient = (network: Network | string | string = Network.MAINNET, nodeURI?: string): Aptos => {
  if (nodeURI !== undefined) {
    return new Aptos(new AptosConfig({ network: getNetwork(network), fullnode: nodeURI }))
  }
  switch (network) {
    case Network.MAINNET:
      return defaultMainnetClient
    case 'movement-testnet':
      return defaultMovementTestnetClient
    default:
      return defaultTestnetClient
  }
}

/**
 * Get a Pyth price service connection
 * @param network the network to use, if not specific = "mainnet"
 * @returns a useable aptos client
 */
export const pythClient = (network: Network | string = Network.MAINNET): AptosPriceServiceConnection => {
  return getNetwork(network) === Network.MAINNET ? mainnetPythClient : testnetPythClient
}

export const getNetwork = (network: Network | string): Network => {
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
export const graphqlClient = (API_KEY?: string): Client => {
  return graphqlClientWithUri('https://api.testnet.aptoslabs.com/v1/graphql', API_KEY)
}

export const mirageGraphQlClient = createClient({
  url: 'https://api.mirage.money/v1/graphql',
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
