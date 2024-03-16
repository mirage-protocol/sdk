import BigNumber from 'bignumber.js'

import { AccountResource, moveAssetInfo, mirageAddress, MoveToken, ZERO } from '../constants'
import { Rebase } from './rebase'

export class Mirage {
  public readonly debt: MoveToken
  public readonly debtRebase: Rebase

  constructor(moduleResources: AccountResource[], debt: MoveToken | string) {
    this.debt = debt as MoveToken

    const debtStoreType = `${mirageAddress()}::mirage::MirageDebtStore<${moveAssetInfo(debt).type}>`
    const mirage = moduleResources.find((resource) => resource.type === debtStoreType)

    this.debtRebase = !!mirage
      ? new Rebase(BigNumber((mirage.data as any).debt.elastic), BigNumber((mirage.data as any).debt.base))
      : new Rebase(ZERO, ZERO)
  }
}
