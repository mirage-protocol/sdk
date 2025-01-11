import {
  AccountAddress,
  Aptos as AptosClient,
  AptosConfig,
  InputViewFunctionData,
  MoveObjectType,
  parseEncodedStruct,
} from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

import {
  allMarketAddressesView,
  allOraclesView,
  allVaultCollectionsView,
  borrowOracleView,
  borrowTokenView,
  collateralOracleView,
  collateralTokenView,
  marketMarginOracleView,
  marketMarginSymbolView,
  marketNameView,
  marketPerpOracleView,
  marketPerpSymbolView,
  oracleNameView,
  oraclePriceMultiplierView,
  priceFeedIdView,
  vaultCollectionNameView,
} from '../views'
import { normalizeAddress } from '.'
import { MirageJsonConfig } from './config'

export const buildMirageConfig = async (
  fullnodeUrl: string,
  deployerAddress: AccountAddress,
): Promise<MirageJsonConfig> => {
  const aptosClient = new AptosClient(new AptosConfig({ fullnode: fullnodeUrl }))
  const chainId = await aptosClient.getChainId()
  console.log(`building mirage config ${fullnodeUrl}, chainId: ${chainId}`)
  const config: MirageJsonConfig = {
    chainId,
    deployerAddress: deployerAddress.toString(),
    vaults: [],
    oracles: [],
    fungibleAssets: [],
    markets: [],
  }

  const allOracles = await allOraclesView(aptosClient, deployerAddress)
  for (const oracleObj of allOracles) {
    const [oracleName, priceFeedId, priceMultiplier] = await Promise.all([
      oracleNameView(oracleObj, aptosClient, deployerAddress),
      priceFeedIdView(oracleObj, aptosClient, deployerAddress),
      oraclePriceMultiplierView(oracleObj, aptosClient, deployerAddress),
    ])

    config.oracles.push({
      name: oracleName,
      address: normalizeAddress(oracleObj),
      priceFeedId,
      priceMultiplier,
    })
  }
  console.log('oracle count', config.oracles.length)

  const allMarkets = await allMarketAddressesView(aptosClient, deployerAddress)
  for (const marketObj of allMarkets) {
    const [perpSymbol, marginOracleObj, perpOracleObj, marginSymbol, marketName] = await Promise.all([
      marketPerpSymbolView(marketObj, aptosClient, deployerAddress),
      marketMarginOracleView(marketObj, aptosClient, deployerAddress),
      marketPerpOracleView(marketObj, aptosClient, deployerAddress),
      marketMarginSymbolView(marketObj, aptosClient, deployerAddress),
      marketNameView(marketObj, aptosClient),
    ])
    const marginOracleAddr = normalizeAddress(marginOracleObj)
    const perpOracleAddr = normalizeAddress(perpOracleObj)

    const marginOracle = config.oracles.find((oracle) => oracle.address == marginOracleAddr)!
    const perpOracle = config.oracles.find((oracle) => oracle.address == perpOracleAddr)!
    config.markets.push({
      address: normalizeAddress(marketObj),
      marginOracle: marginOracle.name,
      perpOracle: perpOracle.name,
      perpSymbol,
      marginSymbol,
      name: marketName,
    })
  }
  console.log('market count', Object.keys(config.markets).length)

  const getFaSymbolPayload = (metadataObj: MoveObjectType): InputViewFunctionData => {
    return {
      function: '0x1::fungible_asset::symbol' as `${string}::${string}::${string}`,
      functionArguments: [metadataObj],
      typeArguments: ['0x1::fungible_asset::Metadata'],
    }
  }

  const getFaNamePayload = (metadataObj: MoveObjectType): InputViewFunctionData => {
    return {
      function: '0x1::fungible_asset::name' as `${string}::${string}::${string}`,
      functionArguments: [metadataObj],
      typeArguments: ['0x1::fungible_asset::Metadata'],
    }
  }

  const getFaDecimalsPayload = (metadataObj: MoveObjectType): InputViewFunctionData => {
    return {
      function: '0x1::fungible_asset::decimals' as `${string}::${string}::${string}`,
      functionArguments: [metadataObj],
      typeArguments: ['0x1::fungible_asset::Metadata'],
    }
  }

  const getPairedCoinPayload = (metadataObj: MoveObjectType): InputViewFunctionData => {
    return {
      function: '0x1::coin::paired_coin' as `${string}::${string}::${string}`,
      functionArguments: [metadataObj],
    }
  }

  const addTokenConfig = async (tokenObj: MoveObjectType): Promise<void> => {
    const [coinTypeResult, faSymbol, faNameResult, faDecimalsResult] = await Promise.all([
      aptosClient.view({ payload: getPairedCoinPayload(tokenObj) }),
      aptosClient.view({ payload: getFaSymbolPayload(tokenObj) }),
      aptosClient.view({ payload: getFaNamePayload(tokenObj) }),
      aptosClient.view({ payload: getFaDecimalsPayload(tokenObj) }),
    ])
    const coinTypeParsed = (
      coinTypeResult[0] as { vec: { account_address: string; module_name: string; struct_name: string }[] }
    ).vec
    const coinType =
      coinTypeParsed.length > 0
        ? (parseEncodedStruct(coinTypeParsed[0]) as `${string}::${string}::${string}`)
        : undefined

    const tokenSymbolParsed = faSymbol[0] as string
    const tokenNameParsed = faNameResult[0] as string
    const decimalsParsed = BigNumber(faDecimalsResult[0] as string).toNumber()
    config.fungibleAssets.push({
      coinType,
      address: normalizeAddress(tokenObj),
      decimals: decimalsParsed,
      name: tokenNameParsed,
      symbol: tokenSymbolParsed,
    })
  }

  const allVaults = await allVaultCollectionsView(aptosClient, deployerAddress)
  for (const vaultObj of allVaults) {
    const [vaultName, collateralTokenObj, borrowTokenObj, collateralOracleObj, borrowOracleObj] = await Promise.all([
      vaultCollectionNameView(vaultObj, aptosClient),
      collateralTokenView(vaultObj, aptosClient, deployerAddress),
      borrowTokenView(vaultObj, aptosClient, deployerAddress),
      collateralOracleView(vaultObj, aptosClient, deployerAddress),
      borrowOracleView(vaultObj, aptosClient, deployerAddress),
    ])
    const collateralTokenAddr = normalizeAddress(collateralTokenObj)
    const borrowTokenAddr = normalizeAddress(borrowTokenObj)
    const collateralOracleAddr = normalizeAddress(collateralOracleObj)
    const borrowOracleAddr = normalizeAddress(borrowOracleObj)

    const hasCollateralSymbol = !!config.fungibleAssets.find((fa) => fa.address == collateralTokenAddr)
    const hasBorrowSymbol = !!config.fungibleAssets.find((fa) => fa.address == borrowTokenAddr)

    if (!hasCollateralSymbol) {
      await addTokenConfig(collateralTokenObj)
    }
    if (!hasBorrowSymbol) {
      await addTokenConfig(borrowTokenObj)
    }
    const borrow = config.fungibleAssets.find((fa) => fa.address == borrowTokenAddr)!
    const collateral = config.fungibleAssets.find((fa) => fa.address == collateralTokenAddr)!

    const borrowOracle = config.oracles.find((oracle) => oracle.address == borrowOracleAddr)!
    const collateralOracle = config.oracles.find((oracle) => oracle.address == collateralOracleAddr)!

    console.log(collateral)
    console.log(borrow)

    config.vaults.push({
      name: vaultName,
      address: normalizeAddress(vaultObj),
      collateralSymbol: collateral.symbol,
      borrowSymbol: borrow.symbol,
      collateralOracle: collateralOracle.name,
      borrowOracle: borrowOracle.name,
    })
  }

  console.log('vault count', Object.keys(config.markets).length)
  console.log('fungible asset count', Object.keys(config.fungibleAssets).length)

  return config
}
