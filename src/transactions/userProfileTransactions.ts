import { AccountAddress, InputEntryFunctionData } from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../utils'

/**
 * Adds custom referral code for user in referral program
 * @returns payload for the transaction
 */
export const createAddCustomReferralCodePayload = (
  code: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::add_custom_referral_code`,
    functionArguments: [code],
  }
}

/**
 * Adds custom referral code for user in referral program
 * @returns payload for the transaction
 */
export const createUpdateReferralDepositAddressPayload = (
  toAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::update_referral_deposit_address`,
    functionArguments: [toAddress],
  }
}

/**
 * sign up for referral program with custom code
 * @returns payload for the transaction
 */
export const createUserProfileWithCodePayload = (
  code: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::create_user_profile_with_custom_code`,
    functionArguments: [code],
  }
}

/**
 * Sign up for referral program
 * @returns payload for the transaction
 */
export const createUserProfilePayload = (code: string, deployerAddress: AccountAddress): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::create_user_profile`,
    functionArguments: [code],
  }
}

/**
 * Sets referral rate for referrer (admin only)
 * @returns payload for the transaction
 */
export const createAddVipReferralRatePayload = (
  userAddress: string,
  rate: bigint,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::add_vip_referral_fee_rate`,
    functionArguments: [userAddress, rate.toString()],
  }
}

/**
 * Sets user's referrer to the referrer with this custom code
 * @returns payload for the transaction
 */
export const createReferViaCustomCodePayload = (
  code: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::refer_via_custom_referral_code`,
    functionArguments: [code],
  }
}

/**
 * Sets user's referrer to this address
 * @returns payload for the transaction
 */
export const createReferPayload = (
  referrerAddress: string,
  deployerAddress: AccountAddress,
): InputEntryFunctionData => {
  return {
    function: `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::refer`,
    functionArguments: [referrerAddress],
  }
}
