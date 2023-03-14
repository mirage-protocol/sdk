import { AptosPriceServiceConnection } from '@pythnetwork/pyth-aptos-js'
import { AptosClient } from 'aptos'

export const APTOS_NETWORK = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 'mainnet' : 'testnet'

export const APTOS_CLIENT = new AptosClient(`https://fullnode.${APTOS_NETWORK}.aptoslabs.com`)

export const PYTH_CLIENT = new AptosPriceServiceConnection(`https://xc-${APTOS_NETWORK}.pyth.network`)

export enum NetworkType {
  mainnet,
  testnet,
}
