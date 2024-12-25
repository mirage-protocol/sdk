import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules, ZERO } from '../constants'
import { MirageConfig } from '../utils/config'
import { Rebase } from './rebase'

export class MirageAsset {
  public readonly tokenSymbol: string
  public readonly tokenAddress: string
  public readonly debtRebase: Rebase

  constructor(tokenObjectResources: MoveResource[], tokenSymbol: string, config: MirageConfig) {
    const debtStoreType = `${getModuleAddress(MoveModules.MIRAGE, config.deployerAddress)}::mirage::MirageDebtStore`
    const mirage = tokenObjectResources.find((resource) => resource.type === debtStoreType)

    this.tokenSymbol = tokenSymbol
    this.tokenAddress = config.getTokenAddress(tokenSymbol)
    this.debtRebase = !!mirage
      ? new Rebase(BigNumber((mirage.data as any).debt.elastic), BigNumber((mirage.data as any).debt.base))
      : new Rebase(ZERO, ZERO)
  }
}
