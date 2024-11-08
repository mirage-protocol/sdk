import { MoveResource, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MirageModules, MoveFungibleAsset, ZERO } from '../constants'
import { Rebase } from './rebase'

export class MirageAsset {
  public readonly debt: MoveFungibleAsset
  public readonly debtRebase: Rebase

  constructor(tokenObjectResources: MoveResource[], debt: MoveFungibleAsset, network: Network) {
    this.debt = debt as MoveFungibleAsset

    const debtStoreType = `${getModuleAddress(MirageModules.Mirage, network)}::mirage::MirageDebtStore`
    const mirage = tokenObjectResources.find((resource) => resource.type === debtStoreType)

    this.debtRebase = !!mirage
      ? new Rebase(BigNumber((mirage.data as any).debt.elastic), BigNumber((mirage.data as any).debt.base))
      : new Rebase(ZERO, ZERO)
  }
}
