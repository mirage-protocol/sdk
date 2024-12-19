import { MoveObjectType, MoveUint64Type } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules } from '../constants'
import { BaseViews } from './baseViews'

export class ReferralViews extends BaseViews {
  async referralDepositAddress(feeSourcerObject: MoveObjectType): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::fee_manager::get_referral_deposit_address` as `${string}::${string}::${string}`,
      functionArguments: [feeSourcerObject],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })

    return result[0] as string
  }

  async isUserSignedUpForReferrals(userAddress: string): Promise<boolean> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::fee_manager::has_fee_sourcer` as `${string}::${string}::${string}`,
      functionArguments: [userAddress],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })
    return (result as any)[0] as boolean
  }

  // returns the address of the person who referred the user passed in, eg Alice refers Bob, getReferreeReferrerAddress(Bob) returns alice
  async getReferreeReferrerAddress(userAddress: string): Promise<string> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::fee_manager::get_fee_sourcer_owner_address_of_user` as `${string}::${string}::${string}`,
      functionArguments: [userAddress],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })
    return result[0] as string
  }

  async activeReferralRateBps(feeSourcerObject: MoveObjectType): Promise<number> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::fee_manager::get_current_period_fee_rate` as `${string}::${string}::${string}`,
      functionArguments: [feeSourcerObject],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })
    return BigNumber(result[0] as MoveUint64Type).toNumber()
  }

  // returns last period, current period
  async getReferralVolumes(feeSourcerObject: MoveObjectType): Promise<number[]> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::fee_manager::get_fee_sourcer_fee_volumes` as `${string}::${string}::${string}`,
      functionArguments: [feeSourcerObject],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })
    return [BigNumber(result[0] as MoveUint64Type).toNumber(), BigNumber(result[1] as MoveUint64Type).toNumber()]
  }

  async nextReferralRateBps(feeSourcerObject: MoveObjectType): Promise<number> {
    const payload = {
      function:
        `${getModuleAddress(MoveModules.MIRAGE, this.config.deployerAddress)}::fee_manager::get_next_period_fee_rate` as `${string}::${string}::${string}`,
      functionArguments: [feeSourcerObject],
      typeArguments: [],
    }
    const result = await this.aptosClient.view({ payload })
    return BigNumber(result[0] as MoveUint64Type).toNumber()
  }
}
