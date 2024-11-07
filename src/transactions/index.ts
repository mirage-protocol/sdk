import { Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getAssetDecimals, MoveAsset, PRECISION_8 } from '../constants'

// Get the proper payload amount
export const getAssetAmountArgument = (asset: MoveAsset, amount: number, network: Network): string => {
  return BigNumber(amount)
    .times(BigNumber(10).pow(getAssetDecimals(asset, network)))
    .toFixed(0)
}

// Get the proper payload amount
export const getBCSCoinAmountArgument = (coin: MoveAsset, amount: number, network: Network): bigint => {
  return BigInt(getAssetAmountArgument(coin, amount, network))
}

// Get the proper payload amount
export const getDecimal8Argument = (amount: number): string => {
  if (amount == undefined || amount == null || Number.isNaN(amount)) return '0'
  return BigNumber(PRECISION_8).times(amount).toFixed(0)
}

// Get the proper payload amount
export const getBCSDecimal8Argument = (amount: number): bigint => {
  return BigInt(getDecimal8Argument(amount))
}

export * from './distributor'
export * from './marketTransactions'
export * from './vaultTransactions'
