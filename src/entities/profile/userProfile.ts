import {
  AccountAddress,
  MoveResource,
  TypeTagStruct,
  StructTag,
  Identifier,
  createTokenAddress,
} from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, integerToDecimal, MoveModules, PRECISION_8, ZERO } from '../../utils'
import { UserProfileCollection } from './userProfileCollection'

export class UserProfile {
  public readonly customReferralCode: string | undefined
  public readonly lastPeriodVolumeMusd: BigNumber
  public readonly currentPeriodVolumeMusd: BigNumber
  public readonly nextPeriodFeeRate: number
  public readonly lastFeesEarned: Date
  public readonly vipFeeRate: BigNumber | undefined
  public readonly feeDepositAddress: AccountAddress | undefined

  public readonly objectAddress: AccountAddress

  constructor(
    profileObjectResources: MoveResource[],
    profileCollection: UserProfileCollection,
    deployerAddress: AccountAddress,
  ) {
    const profileType = UserProfile.getUserProfileType(deployerAddress).toString()

    const profile = profileObjectResources.find((resource) => resource.type === profileType)
    if (profile == undefined) throw new Error('Profile object not found')
    this.objectAddress = AccountAddress.from((profile.data as any).extend_ref.inner)

    const codeVec = (profile.data as any).custom_referral_code.vec
    this.customReferralCode = codeVec?.length > 0 ? codeVec[0] : undefined
    ;(this.lastPeriodVolumeMusd = BigNumber((profile.data as any).last_period_volume_musd).div(PRECISION_8)),
      (this.currentPeriodVolumeMusd = BigNumber((profile.data as any).current_period_volume_musd).div(PRECISION_8)),
      (this.lastFeesEarned = new Date(((profile.data as any).last_fees_earned_timestamp as number) * 1000))
    const vipVec = (profile.data as any).vip_fee_rate.vec
    this.vipFeeRate = vipVec?.length > 0 ? integerToDecimal(BigNumber(vipVec[0]), 8) : undefined
    this.feeDepositAddress = AccountAddress.from((profile.data as any).fee_deposit_address)

    const periodsAgo = profileCollection.timestampPeriodsAgo()
    const volumeToUse = periodsAgo > 0 ? ZERO : this.currentPeriodVolumeMusd
    const feesRequiredForMaxRate = profileCollection.feesRequiredForMaxRate
    const percentOfMax = volumeToUse.div(feesRequiredForMaxRate)
    if (percentOfMax.gte(1)) {
      this.nextPeriodFeeRate = profileCollection.maxReferralRate
    } else {
      const feeRange = profileCollection.maxReferralRate - profileCollection.baseReferralRate
      this.nextPeriodFeeRate = profileCollection.baseReferralRate + feeRange * percentOfMax.toNumber()
    }
  }

  public static getUserProfileType(deployerAddress: AccountAddress): TypeTagStruct {
    return new TypeTagStruct(
      new StructTag(
        getModuleAddress(MoveModules.MIRAGE, deployerAddress),
        new Identifier('fee_manager'),
        new Identifier('UserProfile'),
        [],
      ),
    )
  }

  public static getUserProfileAddress(userAddress: AccountAddress, deployerAddress: AccountAddress): AccountAddress {
    const mirageAccountAddress = getModuleAddress(MoveModules.MIRAGE, deployerAddress)
    return createTokenAddress(mirageAccountAddress, 'mirage user profiles', `@${userAddress.toStringShort()}`)
  }
}
