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
  marketPerpOracleView,
  marketPerpSymbolView,
  oracleNameView,
  oraclePriceMultiplierView,
  priceFeedIdView,
  vaultCollectionNameView,
} from '../views'
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
    tokens: [],
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
      address: oracleObj,
      priceFeedId,
      priceMultiplier,
    })
  }
  console.log('oracle count', config.oracles.length)

  const allMarkets = await allMarketAddressesView(aptosClient, deployerAddress)
  for (const marketObj of allMarkets) {
    const [perpSymbol, marginOracleObj, perpOracleObj, marginSymbol] = await Promise.all([
      marketPerpSymbolView(marketObj, aptosClient, deployerAddress),
      marketMarginOracleView(marketObj, aptosClient, deployerAddress),
      marketPerpOracleView(marketObj, aptosClient, deployerAddress),
      marketMarginSymbolView(marketObj, aptosClient, deployerAddress),
    ])
    const marginOracle = config.oracles.find((oracle) => oracle.address == marginOracleObj)!
    const perpOracle = config.oracles.find((oracle) => oracle.address == perpOracleObj)!
    config.markets[perpSymbol] = {
      address: marketObj,
      marginOracle,
      perpOracle,
      marginToken: marginSymbol,
    }
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
    const [coinTypeResult, tokenSymbol, tokenNameResult, decimalsResult] = await Promise.all([
      aptosClient.view({ payload: getPairedCoinPayload(tokenObj) }),
      aptosClient.view({ payload: getFaSymbolPayload(tokenObj) }),
      aptosClient.view({ payload: getFaNamePayload(tokenObj) }),
      aptosClient.view({ payload: getFaDecimalsPayload(tokenObj) }),
    ])
    const coinTypeParsed = (
      coinTypeResult[0] as { vec: { account_address: string; module_name: string; struct_name: string }[] }
    ).vec
    const coinType = coinTypeParsed.length > 0 ? parseEncodedStruct(coinTypeParsed[0]) : ''

    const tokenSymbolParsed = tokenSymbol[0] as string
    const tokenNameParsed = tokenNameResult[0] as string
    const decimalsParsed = BigNumber(decimalsResult[0] as string).toNumber()
    config.tokens[tokenSymbolParsed] = {
      coinType,
      address: tokenObj,
      decimals: decimalsParsed,
      name: tokenNameParsed,
    }
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

    const hasBorrowSymbol = !!config.tokens.find((token) => token.address == borrowTokenObj)
    const hasCollateralSymbol = !!config.tokens.find((token) => token.address == collateralTokenObj)

    if (!hasBorrowSymbol) {
      await addTokenConfig(borrowTokenObj)
    }
    if (!hasCollateralSymbol) {
      await addTokenConfig(collateralTokenObj)
    }

    const borrow = config.tokens.find((token) => token.address == borrowTokenObj)!
    const collateral = config.tokens.find((token) => token.address == collateralTokenObj)!

    const borrowOracle = config.oracles.find((oracle) => oracle.address == borrowOracleObj)!
    const collateralOracle = config.oracles.find((oracle) => oracle.address == collateralOracleObj)!

    config.vaults.push({
      name: vaultName,
      address: vaultObj,
      collateralSymbol: collateral.symbol,
      borrowSymbol: borrow.symbol,
      collateralOracle: collateralOracle.name,
      borrowOracle: borrowOracle.name,
    })
  }
  return config
}
