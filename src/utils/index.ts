import { Deserializer } from '@aptos-labs/ts-sdk'
import { HexString } from 'aptos'
import BigNumber from 'bignumber.js'

export * from './configBuilder'
export * from './sortTypes'

export const getPropertyMapU64 = (key: string, data: any): BigNumber => {
  const property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == key
  })
  const de = new Deserializer(new HexString(property.value.value).toUint8Array())
  return BigNumber(de.deserializeU64().toString())
}

export const getPropertyMapSigned64 = (key: string, data: any): BigNumber => {
  const magnitude_property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == `${key}_magnitude`
  })
  const negative_property = data.inner.data.find((property: { key: string; value: any }) => {
    return property.key == `${key}_negative`
  })
  let de = new Deserializer(new HexString(magnitude_property.value.value).toUint8Array())
  const magnitude = BigNumber(de.deserializeU64().toString())

  de = new Deserializer(new HexString(negative_property.value.value).toUint8Array())
  const negative = de.deserializeBool()

  return magnitude.times(negative ? -1 : 1)
}
