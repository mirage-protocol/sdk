import { AccountAddress, Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
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
export const aptosClient = (network: Network, nodeURI?: string): Aptos => {
  if (nodeURI !== undefined) {
    return new Aptos(new AptosConfig({ network, fullnode: nodeURI }))
  }
  switch (network) {
    case Network.MAINNET:
      return defaultMainnetClient
    case Network.TESTNET:
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
export const pythClient = (network: Network): AptosPriceServiceConnection => {
  return network === Network.MAINNET ? mainnetPythClient : testnetPythClient
}

export const getDeployerAddress = (network: Network): AccountAddress => {
  switch (network) {
    case Network.TESTNET:
      return AccountAddress.fromString('0x0aff88e863b8f70d81f243deff4c59ab89213b853d490e513407084a5265c799')
    default:
      console.error('NO DEPLOYMENT')
      return AccountAddress.fromString('0x0')
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
