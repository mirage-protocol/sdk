import { TransactionPayloadEntryFunction } from '@aptos-labs/ts-sdk'

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

  public getAddCustomReferralCodePayload = (code: string): TransactionPayloadEntryFunction => {
    return createAddCustomReferralCodePayload(code, this.base.getDeployerAddress())
  }

  /**
   * Adds custom referral code for user in referral program
   * @returns payload for the transaction
   */
  public getUpdateReferralDepositAddressPayload = (toAddress: string): TransactionPayloadEntryFunction => {
    return createUpdateReferralDepositAddressPayload(toAddress, this.base.getDeployerAddress())
  }

  public getUserProfileWithCodePayload = (code: string): TransactionPayloadEntryFunction => {
    return createUserProfileWithCodePayload(code, this.base.getDeployerAddress())
  }

  public getUserProfilePayload = (userAddress: string): TransactionPayloadEntryFunction => {
    return createUserProfilePayload(userAddress, this.base.getDeployerAddress())
  }

  public getAddVipReferralRatePayload = (userAddress: string, rate: bigint): TransactionPayloadEntryFunction => {
    return createAddVipReferralRatePayload(userAddress, rate, this.base.getDeployerAddress())
  }

  public getReferViaCustomCodePayload = (code: string): TransactionPayloadEntryFunction => {
    return createReferViaCustomCodePayload(code, this.base.getDeployerAddress())
  }

  public getReferPayload = (referrerAddress: string): TransactionPayloadEntryFunction => {
    return createReferPayload(referrerAddress, this.base.getDeployerAddress())
  }
}
