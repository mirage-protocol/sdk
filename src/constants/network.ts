import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { AptosPriceServiceConnection } from '@pythnetwork/pyth-aptos-js'

// store copies of the client so they don't need to be rebuilt when fetched
const defaultMainnetClient = new Aptos(new AptosConfig({ network: Network.MAINNET }))
const defaultTestnetClient = new Aptos(new AptosConfig({ network: Network.TESTNET }))

const mainnetPythClient = new AptosPriceServiceConnection(`https://hermes.pyth.network`, {
  priceFeedRequestConfig: {
    // Provide this option to retrieve signed price updates for on-chain contracts.
    // Ignore this option for off-chain use.
    binary: true,
  },
})
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
export const aptosClient = (network: Network | string = Network.MAINNET, nodeURI?: string): Aptos => {
  if (nodeURI !== undefined) {
    return new Aptos(new AptosConfig({ network: getNetwork(network), fullnode: nodeURI }))
  }
  return getNetwork(network) === Network.MAINNET ? defaultMainnetClient : defaultTestnetClient
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
    if (network === 'testnet') {
      return Network.TESTNET
    } else {
      return Network.MAINNET
    }
  }
  return network
}
