import { InputEntryFunctionData, MoveObjectType } from '@aptos-labs/ts-sdk'

import { MODULES } from '../constants'
import { BaseTransactions } from './baseTransactions'

export class ReferralTransactions extends BaseTransactions {
  /**
   * Adds custom referral code for user in referral program
   * @returns payload for the transaction
   */
  async addCustomReferralCode(feeSourcerObject: MoveObjectType, code: string): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::add_custom_referral_code`,
      functionArguments: [feeSourcerObject, code],
    }
  }

  /**
   * Adds custom referral code for user in referral program
   * @returns payload for the transaction
   */
  async updateReferralDepositAddress(
    feeSourcerObject: MoveObjectType,
    toAddress: string,
  ): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::update_referral_deposit_address`,
      functionArguments: [feeSourcerObject, toAddress],
    }
  }

  /**
   * sign up for referral program with custom code
   * @returns payload for the transaction
   */
  async signupForReferralsWithCode(code: string): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::sign_up_as_fee_sourcer_with_custom_code`,
      functionArguments: [code],
    }
  }

  /**
   * Sign up for referral program
   * @returns payload for the transaction
   */
  async signupForReferrals(code: string): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::sign_up_as_fee_sourcer`,
      functionArguments: [code],
    }
  }

  /**
   * Sets referral rate for referrer (admin only)
   * @returns payload for the transaction
   */
  async addVipRateBps(feeSourcerObject: MoveObjectType, rateBps: number): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::add_vip_referral_fee_rate`,
      functionArguments: [feeSourcerObject, rateBps],
    }
  }

  /**
   * Sets user's referrer to the referrer with this custom code
   * @returns payload for the transaction
   */
  async getReferredByCode(code: string): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::refer_via_custom_referral_code`,
      functionArguments: [code],
    }
  }

  /**
   * Sets user's referrer to this address
   * @returns payload for the transaction
   */
  async getReferredByAddress(address: string): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::refer_via_address`,
      functionArguments: [address],
    }
  }

  /**
   * Sets user's referrer by referral program id
   * @returns payload for the transaction
   */
  async getReferredByReferralId(id: number): Promise<InputEntryFunctionData> {
    return {
      function: `${MODULES(this.config).mirage.address}::fee_manager::refer_via_counter`,
      functionArguments: [id],
    }
  }
}
