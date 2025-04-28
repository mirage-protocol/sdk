import BigNumber from 'bignumber.js'
import { U64 } from '@aptos-labs/ts-sdk'

import { PRECISION_8 } from '../utils'

// Get the proper payload amount
export const getAssetAmountArgument = (amount: number, decimals: number): string => {
  return BigNumber(amount).times(BigNumber(10).pow(decimals)).toFixed(0)
}

export const getAssetAmountBCS = (amount: number, decimals: number): U64 => {
  return new U64(BigInt(BigNumber(amount).times(BigNumber(10).pow(decimals)).toFixed(0)))
}

// Get the proper payload amount
export const getDecimal8Argument = (amount: number): string => {
  if (amount == undefined || amount == null || Number.isNaN(amount)) return '0'
  return BigNumber(PRECISION_8).times(amount).toFixed(0)
}

export const getDecimal8BCS = (amount: number): U64 => {
  return new U64(BigInt(BigNumber(PRECISION_8).times(amount).toFixed(0)))
}

export const getTpSlArgument = (stopLoss: number | undefined): U64 => {
  if (stopLoss == undefined) {
    return new U64(0n)
  } else {
    return getDecimal8BCS(stopLoss)
  }
}

export * from './marketTransactions'
export * from './testnetTransactions'
export * from './userProfileTransactions'
export * from './vaultTransactions'
