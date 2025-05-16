import { AccountAddress, Aptos as AptosClient, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules } from '../utils'

export const referralDepositAddressView = async (
  userAddress: AccountAddress,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::get_referral_deposit_address` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient.view({ payload })

  return result[0] as string
}

export const userProfileExistsView = async (
  userAddress: AccountAddress,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<boolean> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::user_profile_exists` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient.view({ payload })
  return (result as any)[0] as boolean
}

// returns the address of the person who referred the user passed in, eg Alice refers Bob, getReferreeReferrerAddress(Bob) returns alice
export const userReferrerAddressView = async (
  userAddress: AccountAddress,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<string> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::get_user_referrer_address` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient.view({ payload })
  return result[0] as string
}

export const currentPeriodFeeRateView = async (
  userAddress: AccountAddress,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::get_current_period_fee` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient.view({ payload })
  return BigNumber(result[0] as MoveUint64Type).toNumber()
}

// returns last period, current period
export const userProfileFeeVolumeView = async (
  userAddress: AccountAddress,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number[]> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::get_user_profile_fee_volumes` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient.view({ payload })
  return [BigNumber(result[0] as MoveUint64Type).toNumber(), BigNumber(result[1] as MoveUint64Type).toNumber()]
}

export const nextReferralRateView = async (
  userAddress: AccountAddress,
  aptosClient: AptosClient,
  deployerAddress: AccountAddress,
): Promise<number> => {
  const payload = {
    function:
      `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::fee_manager::get_next_period_fee_rate` as `${string}::${string}::${string}`,
    functionArguments: [userAddress],
    typeArguments: [],
  }
  const result = await aptosClient.view({ payload })
  return BigNumber(result[0] as MoveUint64Type).toNumber()
}
