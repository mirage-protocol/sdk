import { AptosPriceServiceConnection as PythClient } from '@pythnetwork/pyth-aptos-js'
import { AuthConfig, authExchange, AuthUtilities } from '@urql/exchange-auth'
import {
  cacheExchange,
  Client as GqlClient,
  CombinedError,
  createClient,
  errorExchange,
  fetchExchange,
  Operation,
} from 'urql'

export const createGraphqlClientWithUri = (gqlURI: string, API_KEY?: string): GqlClient => {
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

export const createGraphqlClient = (uriStr: string): GqlClient => {
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

export const createPythClient = (uriString: string): PythClient => {
  return new PythClient(uriString, {
    priceFeedRequestConfig: {
      // Provide this option to retrieve signed price updates for on-chain contracts.
      // Ignore this option for off-chain use.
      binary: true,
    },
  })
}
