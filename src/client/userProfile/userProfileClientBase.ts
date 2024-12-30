import { AccountAddress, createObjectAddress, createTokenAddress } from '@aptos-labs/ts-sdk'

import { getModuleAddress, MoveModules } from '../../utils'
import { MirageClientBase } from '../base'

export class UserProfileClientBase extends MirageClientBase {
  public getUserProfileAddress = (userAddress: string): string => {
    return createTokenAddress(
      getModuleAddress(MoveModules.MIRAGE, this.getDeployerAddress()),
      'mirage user profiles',
      AccountAddress.fromString(userAddress).toString(),
    ).toString()
  }

  public getUserProfileCollectionAddress = (): string => {
    return createObjectAddress(
      getModuleAddress(MoveModules.MIRAGE, this.getDeployerAddress()),
      'mirage user profiles',
    ).toString()
  }
}
