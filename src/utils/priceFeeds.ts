import { Price } from '@pythnetwork/pyth-aptos-js'
import { AptosPriceServiceConnection as PythClient } from '@pythnetwork/pyth-aptos-js'
import BigNumber from 'bignumber.js'
import { MoveVector, U8, Hex } from '@aptos-labs/ts-sdk'

/**
 * Gets a priceFeed update data promise from Pyth
 * @param priceFeedId the price feed id string
 * @param network the network, default mainnet
 * @returns the update data promise
 */
export const getPriceFeedUpdateData = async (priceFeedId: string, pythClient: PythClient): Promise<MoveVector<U8>> => {
  if (!priceFeedId) return MoveVector.U8([])
  try {
    console.debug('Attempting to get pyth vaas', priceFeedId)
    const rawUpdateData = await pythClient.getLatestVaas([priceFeedId])
    return rawUpdateData[0] ? MoveVector.U8(Hex.fromHexString(rawUpdateData[0]).toUint8Array()) : MoveVector.U8([])
  } catch (e) {
    return MoveVector.U8([])
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
