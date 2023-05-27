import BigNumber from 'bignumber.js'

// constants for internal package use
export const ZERO = new BigNumber(0)
export const PRECISION_8 = '100000000'
export const EXCHANGE_RATE_PRECISION = '100000000'
export const PERCENT_PRECISION = '10000'
export const INTEREST_PRECISION = '1000000000000'
export const SECONDS_PER_YEAR = 31622400
export const FUNDING_PRECISION = 1000000
export const RATE_PRECISION = 100000000
export const U64_MAX = '18446744073709551616'
export const MIN_TRIGGER_PAYMENT = 1000000

export * from './accounts'
export * from './coinList'
export * from './network'
export * from './priceFeeds'
