import { AccountAddress, MoveResource, TypeTagStruct, StructTag, Identifier } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { FEE_PRECISION, getModuleAddress, MoveModules } from '../../utils'

export class UserReferral {
  public readonly referrerAddress: AccountAddress
  public readonly lastPeriodVolumeMusd: BigNumber
  public readonly currentPeriodVolumeMusd: BigNumber
  public readonly lastReferralTimestamp: Date

  constructor(accountResources: MoveResource[], deployerAddress: AccountAddress) {
    const referralType = UserReferral.getUserReferralType(deployerAddress).toString()

    const referral = accountResources.find((resource) => resource.type === referralType)
    if (referral == undefined) throw new Error('Profile object not found')

    this.referrerAddress = AccountAddress.from((referral.data as any).referrer_address)
    this.lastPeriodVolumeMusd = BigNumber((referral.data as any).last_period_volume_musd).div(FEE_PRECISION)
    this.currentPeriodVolumeMusd = BigNumber((referral.data as any).current_period_volume_musd).div(FEE_PRECISION)
    this.lastReferralTimestamp = new Date(
      new BigNumber((referral.data as any).last_referral_timestamp).times(1000).toNumber(),
    )
  }

  public static getUserReferralType(deployerAddress: AccountAddress): TypeTagStruct {
    return new TypeTagStruct(
      new StructTag(
        getModuleAddress(MoveModules.MIRAGE, deployerAddress),
        new Identifier('fee_manager'),
        new Identifier('UserReferral'),
        [],
      ),
    )
  }
}
