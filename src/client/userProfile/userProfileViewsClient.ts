import { AccountAddress, Aptos as AptosClient } from '@aptos-labs/ts-sdk'

import {
  currentPeriodFeeRateView,
  getUserProfileCode,
  nextReferralRateView,
  referralDepositAddressView,
  userProfileExistsView,
  userProfileFeeVolumeView,
  userReferrerAddressView,
} from '../../views'
import { MirageClientBase } from '../base'

export class UserProfileViewsClient {
  private readonly base: MirageClientBase
  private readonly aptosClient: AptosClient

  constructor(base: MirageClientBase, aptosClient: AptosClient) {
    this.base = base
    this.aptosClient = aptosClient
  }

  public getReferralDepositAddress = async (userAddress: AccountAddress): Promise<string> => {
    return referralDepositAddressView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getUserProfileExists = async (userAddress: AccountAddress): Promise<boolean> => {
    return userProfileExistsView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  // returns the address of the person who referred the user passed in, eg Alice refers Bob, getReferreeReferrerAddress(Bob) returns alice
  public getUserReferrerAddress = async (userAddress: AccountAddress): Promise<string> => {
    return userReferrerAddressView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getCurrentPeriodFeeRate = async (userAddress: AccountAddress): Promise<number> => {
    return currentPeriodFeeRateView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  // returns last period, current period
  public getUserProfileFeeVolume = async (userAddress: AccountAddress): Promise<number[]> => {
    return userProfileFeeVolumeView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getNextReferralRate = async (userAddress: AccountAddress): Promise<number> => {
    return nextReferralRateView(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }

  public getUserReferralCode = async (userAddress: AccountAddress): Promise<string> => {
    return getUserProfileCode(userAddress, this.aptosClient, this.base.getDeployerAddress())
  }
}
