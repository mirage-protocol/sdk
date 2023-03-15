import { HexString, Types } from 'aptos'

export const MIRAGE_ADDRESS = new HexString('0xdd9c1c033d72a314fc1370e0db1c89e800183b14a61628e8dae6851a88c5f782')
export const DEV_USDC_ADDRESS = new HexString('0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68')
export const LZ_ADDRESS = new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa')
// todo
export const PANCAKE_ADDRESS = new HexString('0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa')

export interface Account {
  name: string
  address: HexString
}

export const MIRAGE_PROTOCOL_ACCOUNT: Account = {
  name: 'mirage',
  address: MIRAGE_ADDRESS,
}

export type AccountResource = Types.MoveResource
