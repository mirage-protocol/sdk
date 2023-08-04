import { AptosPriceServiceConnection } from '@pythnetwork/pyth-aptos-js'
import { AptosClient } from 'aptos'

// store copies of the client so they don't need to be rebuilt when fetched
const defaultMainnetClient = new AptosClient(`https://fullnode.mainnet.aptoslabs.com`)
const defaultTestnetClient = new AptosClient(`https://fullnode.testnet.aptoslabs.com`) // new AptosClient(`https://testnet.artifact.systems/aptos`)

const mainnetPythClient = new AptosPriceServiceConnection(`https://xc-mainnet.pyth.network`)
const testnetPythClient = new AptosPriceServiceConnection(`https://xc-testnet.pyth.network`)

/**
 * The network type of the app
 */
export enum Network {
  MAINNET,
  TESTNET,
}

/**
 * Get an Aptos client for a network
 * @param network the network to use, if not specific = "mainnet"
 * @returns a useable aptos client
 */
export const aptosClient = (network: Network | string = Network.MAINNET, nodeURI?: string): AptosClient => {
  if (nodeURI !== undefined) {
    return new AptosClient(nodeURI)
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
