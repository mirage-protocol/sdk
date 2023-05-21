import BigNumber from 'bignumber.js'

import { AccountResource, coinInfo, mirageAddress, MoveCoin, ZERO } from '../constants'
import { Rebase } from './rebase'

export class Mirage {
  public readonly debt: MoveCoin
  public readonly debtRebase: Rebase

  constructor(moduleResources: AccountResource[], debt: MoveCoin | string) {
    this.debt = debt as MoveCoin

    const debtStoreType = `${mirageAddress()}::mirage::MirageDebtStore<${coinInfo(debt).type}>`
    const mirage = moduleResources.find((resource) => resource.type === debtStoreType)

    this.debtRebase = !!mirage
      ? new Rebase(BigNumber((mirage.data as any).debt.elastic), BigNumber((mirage.data as any).debt.base))
      : new Rebase(ZERO, ZERO)
  }
}
