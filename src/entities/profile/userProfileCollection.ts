import {
  AccountAddress,
  MoveResource,
  TypeTagStruct,
  StructTag,
  Identifier,
  createObjectAddress,
} from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { FEE_PRECISION, getModuleAddress, MoveModules } from '../../utils'

/**
 * Represents a Vault struct.
 * Stores info about a vault's deposits and borrows
 */
export class UserProfileCollection {
  public readonly referralPeriodLengthSec: number
  public readonly referralPeriodInitTime: Date
  public readonly baseReferralRate: number
  public readonly maxReferralRate: number
  public readonly maxVipReferralRate: number
  public readonly feesRequiredForMaxRate: BigNumber

  public readonly objectAddress: AccountAddress

  /**
   * Construct an instance of Vault
   * @param profileObjectResources resources from vault token account
   * @param objectAddress the vault object address
   * @param deployerAddress the deployer address
   */
  constructor(profileObjectResources: MoveResource[], deployerAddress: AccountAddress) {
    const profileType = UserProfileCollection.getUserProfileCollectionType(deployerAddress).toString()
    this.objectAddress = UserProfileCollection.getUserProfileCollectionAddress(deployerAddress)

    const profile = profileObjectResources.find((resource) => resource.type === profileType)
    if (profile == undefined) throw new Error('Profile object not found')

    this.referralPeriodInitTime = new Date(
      BigNumber((profile.data as any).referral_period_init_time_sec)
        .times(1000)
        .toNumber(),
    )
    this.referralPeriodLengthSec = new BigNumber((profile.data as any).referral_period_length_sec).toNumber()
    this.baseReferralRate = BigNumber((profile.data as any).base_referral_rate)
      .div(FEE_PRECISION)
      .times(100)
      .toNumber()
    this.maxReferralRate = BigNumber((profile.data as any).max_referral_rate)
      .div(FEE_PRECISION)
      .times(100)
      .toNumber()
    this.maxVipReferralRate = BigNumber((profile.data as any).max_vip_referral_rate)
      .div(FEE_PRECISION)
      .times(100)
      .toNumber()
    this.feesRequiredForMaxRate = BigNumber((profile.data as any).fees_required_for_max_rate).div(FEE_PRECISION)
  }

  public static getUserProfileCollectionType(deployerAddress: AccountAddress): TypeTagStruct {
    return new TypeTagStruct(
      new StructTag(
        getModuleAddress(MoveModules.MIRAGE, deployerAddress),
        new Identifier('fee_manager'),
        new Identifier('UserProfileCollection'),
        [],
      ),
    )
  }

  public timestampPeriodsAgo(): number {
    const now = Date.now()
    const diffSinceInit = now - this.referralPeriodInitTime.getTime()
    const currentPeriod = Math.floor(diffSinceInit / this.referralPeriodLengthSec)
    const diffSinceArg = now - this.referralPeriodInitTime.getTime()
    const argTimePeriod = Math.floor(diffSinceArg / this.referralPeriodLengthSec)

    return currentPeriod - argTimePeriod
  }

  public static getUserProfileCollectionAddress(deployerAddress: AccountAddress): AccountAddress {
    const mirageAccountAddress = getModuleAddress(MoveModules.MIRAGE, deployerAddress)
    return createObjectAddress(mirageAccountAddress, 'mirage user profiles')
  }
}
