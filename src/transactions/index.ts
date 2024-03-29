import { TxnBuilderTypes, Types } from 'aptos'
import BigNumber from 'bignumber.js'

import { coinInfo, MoveCoin, PRECISION_8 } from '../constants'

export type EntryFunctionPayload = Types.EntryFunctionPayload
export type Payload = Types.TransactionPayload_EntryFunctionPayload
export type MoveType = Types.MoveType
export type ScriptPayload = TxnBuilderTypes.TransactionPayloadScript
export type Script = TxnBuilderTypes.Script

// Get the proper payload amount
export const getCoinAmountArgument = (coin: MoveCoin | string, amount: number): string => {
  return BigNumber(amount)
    .times(BigNumber(10).pow(coinInfo(coin).decimals))
    .toFixed(0)
}

// Get the proper payload amount
export const getBCSCoinAmountArgument = (coin: MoveCoin | string, amount: number): bigint => {
  return BigInt(getCoinAmountArgument(coin, amount))
}

// Get the proper payload amount
export const getDecimal8Argument = (amount: number): string => {
  return BigNumber(PRECISION_8).times(amount).toFixed(0)
}

// Get the proper payload amount
export const getBCSDecimal8Argument = (amount: number): bigint => {
  return BigInt(getDecimal8Argument(amount))
}

export * from './distributor'
export * from './marketTransactions'
export * from './vaultTransactions'
export * from './veTransactions'
