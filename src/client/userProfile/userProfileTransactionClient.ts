import { InputEntryFunctionData } from '@aptos-labs/ts-sdk'

import {
  createAddCustomReferralCodePayload,
  createAddVipReferralRatePayload,
  createReferPayload,
  createReferViaCustomCodePayload,
  createUpdateReferralDepositAddressPayload,
  createUserProfilePayload,
  createUserProfileWithCodePayload,
} from '../../transactions'
import { MirageClientBase } from '../base'
import { UserProfileClientBase } from './userProfileClientBase'

export class UserProfileTransactionClient {
  private readonly base: MirageClientBase

  constructor(base: UserProfileClientBase) {
    this.base = base
  }

  public getAddCustomReferralCodePayload = (code: string): InputEntryFunctionData => {
    return createAddCustomReferralCodePayload(code, this.base.getDeployerAddress())
  }

  /**
   * Adds custom referral code for user in referral program
   * @returns payload for the transaction
   */
  public getUpdateReferralDepositAddressPayload = (toAddress: string): InputEntryFunctionData => {
    return createUpdateReferralDepositAddressPayload(toAddress, this.base.getDeployerAddress())
  }

  public getUserProfileWithCodePayload = (code: string): InputEntryFunctionData => {
    return createUserProfileWithCodePayload(code, this.base.getDeployerAddress())
  }

  public getUserProfilePayload = (code: string): InputEntryFunctionData => {
    return createUserProfilePayload(code, this.base.getDeployerAddress())
  }

  public getAddVipReferralRatePayload = (userAddress: string, rate: bigint): InputEntryFunctionData => {
    return createAddVipReferralRatePayload(userAddress, rate, this.base.getDeployerAddress())
  }

  public getReferViaCustomCodePayload = (code: string): InputEntryFunctionData => {
    return createReferViaCustomCodePayload(code, this.base.getDeployerAddress())
  }

  public getReferPayload = (referrerAddress: string): InputEntryFunctionData => {
    return createReferPayload(referrerAddress, this.base.getDeployerAddress())
  }
}
