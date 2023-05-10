import { Types } from 'aptos'
import { TxnBuilderTypes } from 'aptos'
import BigNumber from 'bignumber.js'

import { coinInfo, MoveCoin, PRECISION_8 } from '../constants'

export type Payload = Types.TransactionPayload_EntryFunctionPayload
export type ScriptPayload = Types.TransactionPayload_ScriptPayload
export type MoveType = Types.MoveType
export type Script = TxnBuilderTypes.Script

// Get the proper payload amount
export const getCoinAmountArgument = (coin: MoveCoin | string, amount: number): string => {
  return BigNumber(amount)
    .times(BigNumber(10).pow(coinInfo(coin).decimals))
    .toFixed(0)
}

// Get the proper payload amount
export const getDecimal8Argument = (amount: number): string => {
  return BigNumber(PRECISION_8).times(amount).toFixed(0)
}

export * from './marketTransactions'
export * from './stakingTransactions'
export * from './vaultTransactions'
