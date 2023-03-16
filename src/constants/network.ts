import { AptosPriceServiceConnection } from '@pythnetwork/pyth-aptos-js'
import { AptosClient } from 'aptos'

const mainnetClient = new AptosClient(`https://fullnode.mainnet.aptoslabs.com`)
const testnetClient = new AptosClient(`https://fullnode.testnet.aptoslabs.com`)

const mainnetPythClient = new AptosPriceServiceConnection(`https://xc-mainnet.pyth.network`)
const testnetPythClient = new AptosPriceServiceConnection(`https://xc-testnet.pyth.network`)

/**
 * The network type of the app
 */
export type Network = 'mainnet' | 'testnet'

/**
 * Get an Aptos client for a network
 * @param network the network to use, if not specific = "mainnet"
 * @returns a useable aptos client
 */
export const aptosClient = (network: Network = 'mainnet'): AptosClient => {
  return network === 'mainnet' ? mainnetClient : testnetClient
}

/**
 * Get a Pyth price service connection
 * @param network the network to use, if not specific = "mainnet"
 * @returns a useable aptos client
 */
export const pythClient = (network: Network = 'mainnet'): AptosPriceServiceConnection => {
  return network === 'mainnet' ? mainnetPythClient : testnetPythClient
}
