import { HexString } from 'aptos'

export interface Account {
  name: string
  address: HexString
}

export const MIRAGE_FRAMEWORK_ACCOUNT: Account = {
  name: 'mirage',
  address: new HexString('0xdd9c1c033d72a314fc1370e0db1c89e800183b14a61628e8dae6851a88c5f782'),
}
