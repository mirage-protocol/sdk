import { Network } from '@aptos-labs/ts-sdk'
import { AptosPriceServiceConnection } from '@pythnetwork/pyth-aptos-js'

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
