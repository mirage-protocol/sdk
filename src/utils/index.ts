import { AccountAddress, Deserializer, Identifier, StructTag, TypeTagStruct } from '@aptos-labs/ts-sdk'
import BigNumber from 'bignumber.js'

export * from './config'
export * from './configBuilder'
export * from './constants'
export * from './modules'
export * from './network'
export * from './priceFeeds'

export const getCollectionType = (): TypeTagStruct => {
  return new TypeTagStruct(
    new StructTag(AccountAddress.FOUR, new Identifier('collection'), new Identifier('Collection'), []),
  )
}

export const getPropertyMapU64 = (key: string, data: any): BigNumber => {
  const property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == key
  })
  const de = (Deserializer as any).fromHex(property.value.value)
  return BigNumber(de.deserializeU64().toString())
}

export const integerToDecimal = (value: BigNumber, decimal: number): BigNumber => {
  return value.div(BigNumber(10).pow(decimal))
}

export const getPropertyMapSigned64 = (key: string, data: any): BigNumber => {
  const magnitude_property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == `${key}_magnitude`
  })
  const negative_property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == `${key}_negative`
  })
  let de = (Deserializer as any).fromHex(magnitude_property.value.value)
  const magnitude = BigNumber(de.deserializeU64().toString())

  de = (Deserializer as any).fromHex(negative_property.value.value)
  const negative = de.deserializeBool()

  return magnitude.times(negative ? -1 : 1)
}

export const normalizeAddress = (address: string): string => {
  if (!address) {
    return ''
  }
  return AccountAddress.from(address).toStringLong()
}
