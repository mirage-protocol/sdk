import BigNumber from 'bignumber.js'

import { PRECISION_8 } from '../utils'

// Get the proper payload amount
export const getAssetAmountArgument = (amount: number, decimals: number): string => {
  return BigNumber(amount).times(BigNumber(10).pow(decimals)).toFixed(0)
}

// Get the proper payload amount
export const getDecimal8Argument = (amount: number): string => {
  if (amount == undefined || amount == null || Number.isNaN(amount)) return '0'
  return BigNumber(PRECISION_8).times(amount).toFixed(0)
}

export const getTpSlArgument = (stopLoss: number | undefined): string => {
  if (stopLoss == undefined) {
    return '0'
  } else {
    return getDecimal8Argument(stopLoss)
  }
}

export * from './marketTransactions'
export * from './testnetTransactions'
export * from './userProfileTransactions'
export * from './vaultTransactions'
