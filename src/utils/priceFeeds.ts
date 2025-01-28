import { Price } from '@pythnetwork/pyth-aptos-js'
import { AptosPriceServiceConnection as PythClient } from '@pythnetwork/pyth-aptos-js'
import BigNumber from 'bignumber.js'

/**
 * Gets a priceFeed update data promise from Pyth
 * @param priceFeedId the price feed id string
 * @param network the network, default mainnet
 * @returns the update data promise
 */
export const getPriceFeedUpdateData = async (priceFeedId: string, pythClient: PythClient): Promise<number[]> => {
  if (!priceFeedId) return []
  try {
    console.debug('Attempting to get pyth vaas')
    const updateData = await pythClient.getPriceFeedsUpdateData([priceFeedId])
    return updateData ? updateData[0] : []
  } catch (e) {
    return []
  }
}

export const getPrice = async (priceFeedId: string, pythClient: PythClient): Promise<number> => {
  if (!priceFeedId) return 0
  if (priceFeedId == '0x') return 1 // stable oracle
  const response = await pythClient.getLatestPriceFeeds([priceFeedId])
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
