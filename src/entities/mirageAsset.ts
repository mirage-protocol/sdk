import { AccountAddress, MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { getModuleAddress, MoveModules } from '../utils'
import { Rebase } from './rebase'

export class MirageAsset {
  public readonly symbol: string
  public readonly name: string
  public readonly decimals: number
  public readonly debtRebase: Rebase

  constructor(tokenObjectResources: MoveResource[], deployerAddress: AccountAddress) {
    const debtStoreType = `${getModuleAddress(MoveModules.MIRAGE, deployerAddress)}::mirage::MirageDebtStore`
    const debtStore = tokenObjectResources.find((resource) => resource.type === debtStoreType)
    if (debtStore == undefined) throw new Error('MirageDebtStore object not found')

    this.debtRebase = new Rebase(
      BigNumber((debtStore.data as any).debt.elastic),
      BigNumber((debtStore.data as any).debt.base),
    )
    const faMetadataType = `0x1::fungible_asset::Metadata`
    const faMetadata = tokenObjectResources.find((resource) => resource.type === faMetadataType)
    if (faMetadata == undefined) throw new Error('Metadata object not found')
    this.symbol = (faMetadata.data as any).symbol
    this.name = (faMetadata.data as any).name
    this.decimals = BigNumber((faMetadata.data as any).decimals).toNumber()
  }
}
