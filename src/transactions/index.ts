import { Types } from 'aptos'
import BigNumber from 'bignumber.js'

import { coinInfo, MoveCoin } from '../constants'

export type Payload = Types.TransactionPayload_EntryFunctionPayload
export type MoveType = Types.MoveType

// Get the proper payload amount
export const getAmountArgument = (coin: MoveCoin | string, amount: number): string => {
  return BigNumber(amount)
    .times(BigNumber(10).pow(coinInfo(coin).decimals))
    .toFixed(0)
}

export * from './marketTransactions'
export * from './stakingTransactions'
export * from './vaultTransactions'
