import BigNumber from 'bignumber.js'

import { MoveAsset, moveAssetInfo, PRECISION_8 } from '../constants'
import { MirageConfig } from '../utils/config'

// Get the proper payload amount
export const getAssetAmountArgument = (coin: MoveAsset | string, amount: number, config: MirageConfig): string => {
  return BigNumber(amount)
    .times(BigNumber(10).pow(moveAssetInfo(coin, config).decimals))
    .toFixed(0)
}

// Get the proper payload amount
export const getBCSCoinAmountArgument = (coin: MoveAsset | string, amount: number, config: MirageConfig): bigint => {
  return BigInt(getAssetAmountArgument(coin, amount, config))
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

export * from './baseTransactions'
export * from './marketTransactions'
export * from './referralTransactions'
export * from './testnetTransactions'
export * from './vaultTransactions'
