import { MoveResource, Network } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { mirageAddress, MoveToken, ZERO } from '../constants'
import { Rebase } from './rebase'

export class MirageAsset {
  public readonly debt: MoveToken
  public readonly debtRebase: Rebase

  constructor(tokenObjectResources: MoveResource[], debt: MoveToken | string, network: Network | string) {
    this.debt = debt as MoveToken

    const debtStoreType = `${mirageAddress(network)}::mirage::MirageDebtStore`
    const mirage = tokenObjectResources.find((resource) => resource.type === debtStoreType)

    this.debtRebase = !!mirage
      ? new Rebase(BigNumber((mirage.data as any).debt.elastic), BigNumber((mirage.data as any).debt.base))
      : new Rebase(ZERO, ZERO)
  }
}
