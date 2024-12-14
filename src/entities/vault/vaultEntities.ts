import { MoveResource } from '@aptos-labs/ts-sdk'

import { getPairFromVaultCollectionAddress } from '../../constants'
import { BaseEntities } from '../baseEntities'
import { Vault } from './vault'
import { VaultCollection } from './vaultCollection'

export class VaultEntities extends BaseEntities {
  createVaultCollection(
    collectionObjectResources: MoveResource[],
    borrowTokenObjectResources: MoveResource[],
    objectAddress: string,
  ): VaultCollection {
    return new VaultCollection(
      collectionObjectResources,
      borrowTokenObjectResources,
      getPairFromVaultCollectionAddress(objectAddress, this.config).collateralAsset,
      getPairFromVaultCollectionAddress(objectAddress, this.config).borrow,
      objectAddress,
      this.config,
    )
  }

  createVault(vaultObjectResources: MoveResource[], vaultCollection: VaultCollection, objectAddress: string): Vault {
    return new Vault(
      vaultObjectResources,
      vaultCollection,
      vaultCollection.collateral,
      vaultCollection.borrow,
      objectAddress,
      this.config,
    )
  }
}
