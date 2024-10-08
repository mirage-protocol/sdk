import { Network } from '@aptos-labs/ts-sdk'
import { Price } from '@pythnetwork/pyth-aptos-js'
import BigNumber from 'bignumber.js'

import { getNetwork, pythClient } from '../constants/network'
import { MoveAsset, MoveCoin, MoveToken, Perpetual } from './assetList'

/**
 * All the coins with price feeds
 */
export const coinsWithPriceFeeds = [
  MoveCoin.APT,
  MoveToken.mAPT,
  MoveToken.mETH,
  MoveToken.tUSDC,
  // Crypto perps
  Perpetual.APTPERP,
  Perpetual.ARBPERP,
  Perpetual.BTCPERP,
  Perpetual.ETHPERP,
  Perpetual.OPPERP,
  Perpetual.PEPE1000PERP,
  Perpetual.SOLPERP,
  Perpetual.SUIPERP,
  Perpetual.DOGEPERP,
  Perpetual.AVAXPERP,
  Perpetual.PYTHPERP,
  Perpetual.STXPERP,
  Perpetual.WIFPERP,
  Perpetual.MKRPERP,
  Perpetual.MNTPERP,
  // Metal perps
  Perpetual.XAGPERP,
  Perpetual.XAUPERP,
  // Fx perps
  Perpetual.EURPERP,
  Perpetual.GBPPERP,
  Perpetual.JPYPERP,
] as const

type CoinsWithPriceFeeds = (typeof coinsWithPriceFeeds)[number]

/**
 * Check if a asset has a price feed
 * @param asset the asset to check
 * @returns if a mirage protocol price feed exists for the asset
 */
export const hasPriceFeed = (asset: MoveAsset): boolean => {
  return !!PRICE_FEEDS[asset.valueOf()]
}

/**
 * Get the price feed for a Coin
 * @param coin the coin to get a price feed for
 * @param network
 * @returns
 */
export const getPriceFeed = (
  coin: MoveAsset | Perpetual,
  network: Network | string = Network.MAINNET,
): string | undefined => {
  return !!PRICE_FEEDS[coin.valueOf()] ? PRICE_FEEDS[coin.valueOf()][getNetwork(network)] : undefined
}

/**
 * Gets a priceFeed update data promise from Pyth
 * @param priceFeedId the price feed id string
 * @param network the network, default mainnet
 * @returns the update data promise
 */
export const getPriceFeedUpdateData = async (
  priceFeedId: string,
  network: Network | string = Network.MAINNET,
): Promise<number[]> => {
  if (!priceFeedId) return []
  try {
    console.debug('Attempting to get pyth vaas')
    const updateData = await pythClient(getNetwork(network)).getPriceFeedsUpdateData([priceFeedId])
    return updateData ? updateData[0] : []
  } catch (e) {
    return []
  }
}

export const getPrice = async (priceFeedId: string, network: Network | string = Network.MAINNET): Promise<number> => {
  if (!priceFeedId) return 0
  const response = await pythClient(getNetwork(network)).getLatestPriceFeeds([priceFeedId])
  if (response == undefined || response?.length == 0) return 0
  return getContractPrice(response[0].getPriceUnchecked())
}

const getContractPrice = ({ price, expo }: Price): number => {
  return (
    BigNumber(
      expo >= 0
        ? BigNumber(price).div(BigNumber(10).pow(expo)).toNumber()
        : BigNumber(price).times(BigNumber(10).pow(expo)).toNumber(),
    )
      // .times(BigNumber(PRECISION_8))
      .toNumber()
  )
}

/**
 * Gets a ui price from a pyth price
 * @param price the pyth price
 * @returns the ui price
 */
export const getUiPythPrice = ({ price, expo }: Price): number => {
  return expo >= 0
    ? BigNumber(price).div(BigNumber(10).pow(expo)).toNumber()
    : BigNumber(price).times(BigNumber(10).pow(expo)).toNumber()
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const USED_NETWORKS = [Network.MAINNET, Network.TESTNET, Network.CUSTOM] as const
type Networks = (typeof USED_NETWORKS)[number]

// Price feeds of coins by network
const PRICE_FEEDS: { readonly [coin in CoinsWithPriceFeeds]: { readonly [network in Networks]: string } } = {
  [MoveCoin.APT]: {
    [Network.MAINNET]: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
    [Network.TESTNET]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
    [Network.CUSTOM]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  },
  [MoveToken.mAPT]: {
    [Network.MAINNET]: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
    [Network.TESTNET]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
    [Network.CUSTOM]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  },
  [MoveToken.mETH]: {
    [Network.MAINNET]: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    [Network.TESTNET]: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
    [Network.CUSTOM]: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
  },
  [MoveToken.tUSDC]: {
    [Network.MAINNET]: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
    [Network.TESTNET]: '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
    [Network.CUSTOM]: '0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722',
  },
  // Crypto perps
  [Perpetual.APTPERP]: {
    [Network.MAINNET]: '0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5',
    [Network.TESTNET]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
    [Network.CUSTOM]: '0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e',
  },
  [Perpetual.ARBPERP]: {
    [Network.MAINNET]: '0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5',
    [Network.TESTNET]: '0x37f40d2898159e8f2e52b93cb78f47cc3829a31e525ab975c49cc5c5d9176378',
    [Network.CUSTOM]: '0x37f40d2898159e8f2e52b93cb78f47cc3829a31e525ab975c49cc5c5d9176378',
  },
  [Perpetual.BTCPERP]: {
    [Network.MAINNET]: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    [Network.TESTNET]: '0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b',
    [Network.CUSTOM]: '0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b',
  },
  [Perpetual.ETHPERP]: {
    [Network.MAINNET]: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    [Network.TESTNET]: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
    [Network.CUSTOM]: '0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6',
  },
  [Perpetual.OPPERP]: {
    [Network.MAINNET]: '0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf',
    [Network.TESTNET]: '0x71334dcd37620ce3c33e3bafef04cc80dec083042e49b734315b36d1aad7991f',
    [Network.CUSTOM]: '0x71334dcd37620ce3c33e3bafef04cc80dec083042e49b734315b36d1aad7991f',
  },
  [Perpetual.PEPE1000PERP]: {
    [Network.MAINNET]: '0xd69731a2e74ac1ce884fc3890f7ee324b6deb66147055249568869ed700882e4',
    [Network.TESTNET]: '0xed82efbfade01083ffa8f64664c86af39282c9f084877066ae72b635e77718f0',
    [Network.CUSTOM]: '0xed82efbfade01083ffa8f64664c86af39282c9f084877066ae72b635e77718f0',
  },
  [Perpetual.SOLPERP]: {
    [Network.MAINNET]: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    [Network.TESTNET]: '0xfe650f0367d4a7ef9815a593ea15d36593f0643aaaf0149bb04be67ab851decd',
    [Network.CUSTOM]: '0xfe650f0367d4a7ef9815a593ea15d36593f0643aaaf0149bb04be67ab851decd',
  },
  [Perpetual.SUIPERP]: {
    [Network.MAINNET]: '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
    [Network.TESTNET]: '0x50c67b3fd225db8912a424dd4baed60ffdde625ed2feaaf283724f9608fea266',
    [Network.CUSTOM]: '0x50c67b3fd225db8912a424dd4baed60ffdde625ed2feaaf283724f9608fea266',
  },
  [Perpetual.DOGEPERP]: {
    [Network.MAINNET]: '0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c',
    [Network.TESTNET]: '0x31775e1d6897129e8a84eeba975778fb50015b88039e9bc140bbd839694ac0ae',
    [Network.CUSTOM]: '0x31775e1d6897129e8a84eeba975778fb50015b88039e9bc140bbd839694ac0ae',
  },
  [Perpetual.AVAXPERP]: {
    [Network.MAINNET]: '0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7',
    [Network.TESTNET]: '0xd7566a3ba7f7286ed54f4ae7e983f4420ae0b1e0f3892e11f9c4ab107bbad7b9',
    [Network.CUSTOM]: '0xd7566a3ba7f7286ed54f4ae7e983f4420ae0b1e0f3892e11f9c4ab107bbad7b9',
  },
  [Perpetual.PYTHPERP]: {
    [Network.MAINNET]: '0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff',
    [Network.TESTNET]: '0xc615ea2ed57c4e0c70ab5cb6fd29ada8350f039e67c019159204bc22c46da3f3',
    [Network.CUSTOM]: '0xc615ea2ed57c4e0c70ab5cb6fd29ada8350f039e67c019159204bc22c46da3f3',
  },
  [Perpetual.STXPERP]: {
    [Network.MAINNET]: '0xec7a775f46379b5e943c3526b1c8d54cd49749176b0b98e02dde68d1bd335c17',
    [Network.TESTNET]: '0xc2703fcc925ad32b6256afc3ebad634970d1b1ffb3f4143e36b2d055b1dcd29b',
    [Network.CUSTOM]: '0xc2703fcc925ad32b6256afc3ebad634970d1b1ffb3f4143e36b2d055b1dcd29b',
  },
  [Perpetual.WIFPERP]: {
    [Network.MAINNET]: '0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc',
    [Network.TESTNET]: '0x45f08e06a4d78c7a46c70b324f62fe89080fa8f20da4abc5c0c6d262069b7edc',
    [Network.CUSTOM]: '0x45f08e06a4d78c7a46c70b324f62fe89080fa8f20da4abc5c0c6d262069b7edc',
  },
  [Perpetual.MKRPERP]: {
    [Network.MAINNET]: '0x9375299e31c0deb9c6bc378e6329aab44cb48ec655552a70d4b9050346a30378',
    [Network.TESTNET]: '0xc4d994230a6db7909135e4673287fb672f45ea92fb40b1bc9adf101ecf877ab7',
    [Network.CUSTOM]: '0xc4d994230a6db7909135e4673287fb672f45ea92fb40b1bc9adf101ecf877ab7',
  },
  [Perpetual.MNTPERP]: {
    [Network.MAINNET]: '0x4e3037c822d852d79af3ac80e35eb420ee3b870dca49f9344a38ef4773fb0585',
    [Network.TESTNET]: '0xd45b6d47bf43faa700e6f6fec4f8989fcc80eabb2f2eff862d7258d60026d1b5',
    [Network.CUSTOM]: '0xd45b6d47bf43faa700e6f6fec4f8989fcc80eabb2f2eff862d7258d60026d1b5',
  },
  // Metal perps
  [Perpetual.XAGPERP]: {
    [Network.MAINNET]: '0xf2fb02c32b055c805e7238d628e5e9dadef274376114eb1f012337cabe93871e',
    [Network.TESTNET]: '0x321ba4d608fa75ba76d6d73daa715abcbdeb9dba02257f05a1b59178b49f599b',
    [Network.CUSTOM]: '0x321ba4d608fa75ba76d6d73daa715abcbdeb9dba02257f05a1b59178b49f599b',
  },
  [Perpetual.XAUPERP]: {
    [Network.MAINNET]: '0x765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2',
    [Network.TESTNET]: '0x30a19158f5a54c0adf8fb7560627343f22a1bc852b89d56be1accdc5dbf96d0e',
    [Network.CUSTOM]: '0x30a19158f5a54c0adf8fb7560627343f22a1bc852b89d56be1accdc5dbf96d0e',
  },
  // FX perps
  [Perpetual.EURPERP]: {
    [Network.MAINNET]: '0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b',
    [Network.TESTNET]: '0xc1b12769f6633798d45adfd62bfc70114839232e2949b01fb3d3f927d2606154',
    [Network.CUSTOM]: '0xc1b12769f6633798d45adfd62bfc70114839232e2949b01fb3d3f927d2606154',
  },
  [Perpetual.GBPPERP]: {
    [Network.MAINNET]: '0x84c2dde9633d93d1bcad84e7dc41c9d56578b7ec52fabedc1f335d673df0a7c1',
    [Network.TESTNET]: '0xbcbdc2755bd74a2065f9d3283c2b8acbd898e473bdb90a6764b3dbd467c56ecd',
    [Network.CUSTOM]: '0xbcbdc2755bd74a2065f9d3283c2b8acbd898e473bdb90a6764b3dbd467c56ecd',
  },
  [Perpetual.JPYPERP]: {
    [Network.MAINNET]: '0xef2c98c804ba503c6a707e38be4dfbb16683775f195b091252bf24693042fd52',
    [Network.TESTNET]: '0x20a938f54b68f1f2ef18ea0328f6dd0747f8ea11486d22b021e83a900be89776',
    [Network.CUSTOM]: '0x20a938f54b68f1f2ef18ea0328f6dd0747f8ea11486d22b021e83a900be89776',
  },
}
