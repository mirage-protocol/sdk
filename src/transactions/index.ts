import { Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { MoveAsset, moveAssetInfo, PRECISION_8 } from '../constants'

// Get the proper payload amount
export const getAssetAmountArgument = (coin: MoveAsset | string, amount: number, network: Network | string): string => {
  return BigNumber(amount)
    .times(BigNumber(10).pow(moveAssetInfo(coin, network).decimals))
    .toFixed(0)
}

// Get the proper payload amount
export const getBCSCoinAmountArgument = (
  coin: MoveAsset | string,
  amount: number,
  network: Network | string,
): bigint => {
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
