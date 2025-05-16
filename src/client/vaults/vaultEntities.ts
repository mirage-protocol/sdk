import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { MirageAsset, Rebase, Vault, VaultCollection } from '../../entities'
import { getCollectionType, MirageConfig } from '../../utils'
import { VaultClientBase } from './vaultClientBase'

export class VaultEntitiesClient {
  private readonly base: VaultClientBase
  private readonly config: MirageConfig

  constructor(base: VaultClientBase, config: MirageConfig) {
    this.base = base
    this.config = config
  }

  createRebase(elastic: BigNumber, base: BigNumber): Rebase {
    return new Rebase(elastic, base)
  }

  createMirageAsset(tokenObjectResources: MoveResource[]): MirageAsset {
    return new MirageAsset(tokenObjectResources, this.base.getDeployerAddress())
  }

  createVaultCollection(
    collectionObjectResources: MoveResource[],
    borrowTokenObjectResources: MoveResource[],
  ): VaultCollection {
    // get collateral decimals
    const collectionType = getCollectionType().toString()
    const collection = collectionObjectResources.find((resource) => resource.type === collectionType)
    console.log('collection', collection)
    console.log('collectionType', collectionType)
    console.log('collection resources', collectionObjectResources)
    if (collection == undefined) throw new Error('Collection object not found')
    const name = (collection.data as any).name as string
    const collateralSymbol = name.split('/')[0]
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)

    return new VaultCollection(
      collectionObjectResources,
      borrowTokenObjectResources,
      collateralDecimals,
      this.config.deployerAddress,
    )
  }

  createVault(vaultObjectResources: MoveResource[], vaultCollection: VaultCollection): Vault {
    return new Vault(vaultObjectResources, vaultCollection, this.config.deployerAddress)
  }
}
