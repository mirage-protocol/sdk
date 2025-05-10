import {
  AccountAddress,
  EntryFunction,
  Identifier,
  ModuleId,
  TransactionPayloadEntryFunction,
  U64,
} from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../utils'
import { MoveString } from '@aptos-labs/ts-sdk'

/**
 * Adds custom referral code for user in referral program
 * @returns payload for the transaction
 */
export const createAddCustomReferralCodePayload = (
  code: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('fee_manager'))
  const functionName = new Identifier('add_custom_referral_code')
  const typeArguments = []
  const functionArguments = [new MoveString(code)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

export const createUpdateReferralDepositAddressPayload = (
  toAddress: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('fee_manager'))
  const functionName = new Identifier('update_referral_deposit_address')
  const typeArguments = []
  const functionArguments = [AccountAddress.fromString(toAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * sign up for referral program with custom code
 * @returns payload for the transaction
 */
export const createUserProfileWithCodePayload = (
  code: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('fee_manager'))
  const functionName = new Identifier('create_user_profile_with_custom_code')
  const typeArguments = []
  const functionArguments = [new MoveString(code)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Sign up for referral program
 * @returns payload for the transaction
 */
export const createUserProfilePayload = (
  userAddress: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('fee_manager'))
  const functionName = new Identifier('create_user_profile')
  const typeArguments = []
  const functionArguments = [AccountAddress.fromString(userAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Sets referral rate for referrer (admin only)
 * @returns payload for the transaction
 */
export const createAddVipReferralRatePayload = (
  userAddress: string,
  rate: bigint,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('fee_manager'))
  const functionName = new Identifier('add_vip_referral_fee_rate')
  const typeArguments = []
  const functionArguments = [AccountAddress.fromString(userAddress), new U64(rate)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Sets user's referrer to the referrer with this custom code
 * @returns payload for the transaction
 */
export const createReferViaCustomCodePayload = (
  code: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('fee_manager'))
  const functionName = new Identifier('refer_via_custom_referral_code')
  const typeArguments = []
  const functionArguments = [new MoveString(code)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}

/**
 * Sets user's referrer to this address
 * @returns payload for the transaction
 */
export const createReferPayload = (
  referrerAddress: string,
  deployerAddress: AccountAddress,
): TransactionPayloadEntryFunction => {
  const moduleId = new ModuleId(getModuleAddress(MoveModules.MIRAGE, deployerAddress), new Identifier('fee_manager'))
  const functionName = new Identifier('refer')
  const typeArguments = []
  const functionArguments = [AccountAddress.fromString(referrerAddress)]

  return new TransactionPayloadEntryFunction(
    new EntryFunction(moduleId, functionName, typeArguments, functionArguments),
  )
}
