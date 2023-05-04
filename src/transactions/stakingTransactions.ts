import { mirageAddress, MoveCoin } from '../constants'
import { getCoinAmountArgument, Payload } from './'

const type = 'entry_function_payload'

/**
 * Build a payload to add collateral and borrow
 * @param amount the amount of MIRA to lock
 * @param timeInSeconds duration in seconds to lock
 * @returns payload promise for the transaction
 */
export const lockMira = async (amount: number, timeInSeconds: number): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::ve_mirage::lock`,
    arguments: [getCoinAmountArgument(MoveCoin.MIRA, amount), timeInSeconds],
    type_arguments: [],
  }
}

/**
 * Build a payload to add collateral and borrow
 * @param amount the amount of MIRA to add to lock
 * @returns payload promise for the transaction
 */
export const increaseLockedAmount = async (amount: number): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::ve_mirage::increase_locked_amount`,
    arguments: [getCoinAmountArgument(MoveCoin.MIRA, amount)],
    type_arguments: [],
  }
}

/**
 * Reset the lock time to reset veMIRA balance
 * @returns payload promise for the transaction
 */
export const resetStakeLockTime = async (): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::ve_mirage::reset_stake_lock_time`,
    arguments: [],
    type_arguments: [],
  }
}

/**
 * Increase the lock time of a MIRA stake by a given time in seconds
 * @param timeInSeconds duration in seconds to increase lock
 * @returns payload promise for the transaction
 */
export const increaseLockTime = async (timeInSeconds: number): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::ve_mirage::increase_lock_time`,
    arguments: [timeInSeconds],
    type_arguments: [],
  }
}

/**
 * Withdraw an expired MIRA stake in full
 * @returns payload promise for the transaction
 */
export const withdraw = async (): Promise<Payload> => {
  return {
    type,
    function: `${mirageAddress()}::ve_mirage::withdraw`,
    arguments: [],
    type_arguments: [],
  }
}
