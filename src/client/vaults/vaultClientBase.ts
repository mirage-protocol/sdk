import { MirageConfig, VaultConfig } from '../../utils'
import { MirageClientBase } from '../base'
import { FungibleAssetClient } from '../fungibleAsset/fungibleAssetClient'
import { OracleClient } from '../oracle/oracleClient'

export class VaultClientBase extends MirageClientBase {
  private readonly fungibleAssets: FungibleAssetClient
  private readonly oracles: OracleClient

  constructor(
    fungibleAssetClient: FungibleAssetClient,
    oracleClient: OracleClient,
    mirageConfig: MirageConfig
  ) {
    super(mirageConfig)
    this.fungibleAssets = fungibleAssetClient
    this.oracles = oracleClient
  }

  public static createVaultCollectionName = (collateralSymbol: string, borrowSymbol: string): string => {
    return `${collateralSymbol}/${borrowSymbol} CDP`
  }

  public vaultCollectionExists = (collateralSymbol: string, borrowSymbol: string): boolean => {
    return this.config.vaults.has(VaultClientBase.createVaultCollectionName(collateralSymbol, borrowSymbol))
  }

  public getVaultCollection = (collateralSymbol: string, borrowSymbol: string): VaultConfig => {
    const vault = this.config.vaults.get(VaultClientBase.createVaultCollectionName(collateralSymbol, borrowSymbol))
    console.log(this.config.vaults)
    if (!vault) {
      throw new Error(`vault not found' ${collateralSymbol}/${borrowSymbol}`)
    }
    return vault
  }

  public getAllVaultCollections = (): VaultConfig[] => {
    return Object.values(this.config.vaults)
  }

  public getAllVaultCollectionAddresses = (): string[] => {
    return Object.values(this.config.vaults).map((vault) => vault.address)
  }

  public getVaultCollectionAddress = (collateralSymbol: string, borrowSymbol: string): string => {
    return this.getVaultCollection(collateralSymbol, borrowSymbol).address
  }

  public getVaultTokensFromAddress = (vaultAddress: string): { collateralSymbol: string; borrowSymbol: string } => {
    for (const [_, vaultConfig] of Object.entries(this.config.vaults)) {
      if (vaultConfig.address === vaultAddress) return { collateralSymbol: vaultConfig.collateralSymbol, borrowSymbol: vaultConfig.borrowSymbol }
    }
    throw new Error(`vault not found' ${vaultAddress}`)
  }

  public getCollateralPriceFeedId = (collateralSymbol: string, borrowSymbol: string): string => {
    const collateralOracle = this.getVaultCollection(collateralSymbol, borrowSymbol).collateralOracle
    return this.oracles.getPriceFeedId(collateralOracle)
  }

  public getBorrowPriceFeedId = (collateralSymbol: string, borrowSymbol: string): string => {
    const borrowOracle = this.getVaultCollection(collateralSymbol, borrowSymbol).borrowOracle
    return this.oracles.getPriceFeedId(borrowOracle)
  }

  public getCollateralPriceFeedUpdate = async (collateralSymbol: string, borrowSymbol: string): Promise<number[]> => {
    const collateralOracle = this.getVaultCollection(collateralSymbol, borrowSymbol).collateralOracle
    return await this.oracles.getPriceFeedUpdateData(collateralOracle)
  }

  public getBorrowPriceFeedUpdate = async (collateralSymbol: string, borrowSymbol: string): Promise<number[]> => {
    const borrowOracle = this.getVaultCollection(collateralSymbol, borrowSymbol).borrowOracle
    return await this.oracles.getPriceFeedUpdateData(borrowOracle)
  }

  public getCollateralCoinType = (collateralSymbol: string): string | undefined => {
    return this.fungibleAssets.getFACoinType(collateralSymbol)
  }

  public getCollateralCoinDecimals = (collateralSymbol: string): number => {
    return this.fungibleAssets.getFADecimals(collateralSymbol)
  }
}