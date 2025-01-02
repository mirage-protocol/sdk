import { MoveResource } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import { MirageAsset, Rebase, Vault, VaultCollection } from '../../entities'
import { MirageConfig } from '../../utils'
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
    objectAddress: string,
  ): VaultCollection {
    const { collateralSymbol } = this.base.getVaultTokensFromAddress(objectAddress)
    const collateralDecimals = this.base.getCollateralCoinDecimals(collateralSymbol)
    return new VaultCollection(
      collectionObjectResources,
      borrowTokenObjectResources,
      objectAddress,
      collateralSymbol,
      collateralDecimals,
      this.config.deployerAddress,
    )
  }

  createVault(vaultObjectResources: MoveResource[], vaultCollection: VaultCollection, objectAddress: string): Vault {
    return new Vault(vaultObjectResources, vaultCollection, objectAddress, this.config.deployerAddress)
  }
}
