import { HexString } from 'aptos'

import { MIRAGE_FRAMEWORK_ACCOUNT } from './constants/accounts'
import { TYPES } from './constants/types'
import UserInfo from './UserInfo'

export default class VaultEventStore {
  collateralTicker: string
  borrowTicker: string
  userAddresses!: HexString[]
  users!: UserInfo[]

  constructor(collateralTicker: string, borrowTicker: string) {
    this.collateralTicker = collateralTicker
    this.borrowTicker = borrowTicker
  }

  getUserInfoTypeId(): string {
    return `${MIRAGE_FRAMEWORK_ACCOUNT.address}::vault::UserInfo<${TYPES[this.collateralTicker]},${
      TYPES[this.borrowTicker]
    }>`
  }

  getVaultEventStoreTypeId(): string {
    return `${MIRAGE_FRAMEWORK_ACCOUNT.address}::vault::VaultEventStore<${TYPES[this.collateralTicker]},${
      TYPES[this.borrowTicker]
    }>`
  }
}
//   async reloadUsers(moduleResources: Aptos.Types.MoveResource[]): Promise<VaultEventStore> {
//     const events = await APTOS_CLIENT.getEventsByEventHandle(
//       MIRAGE_FRAMEWORK_ACCOUNT.address,
//       this.getVaultEventStoreTypeId(),
//       "register_user_events",
//       { start: this.userAddresses ? this.userAddresses.length : 0 }
//     );

//     const userAccountResources = await Promise.all(events.map((event) => {
//       return new HexString((event!.data as any).user_addr);
//     }).map((userAddress)=> {
//       APTOS_CLIENT.getAccountResource(
//         userAddress,
//         this.getUserInfoTypeId()
//       )
//     }))

//     return userAccountResources.map(userAccountResource => {
//       return new UserInfo([userAccountResource], this.collateralTicker, this.borrowTicker )
//     })

//     console.debug(`Loaded ${userAddresses.length} users`);

//     const users = userAddresses.map((address) => {
//       return new UserInfo(
//         address.toString(),
//         this.collateralTicker,
//         this.borrowTicker
//       );
//     });

//     this.userAddresses = this.userAddresses
//       ? this.userAddresses.concat(userAddresses)
//       : userAddresses;
//     this.users = this.users ? this.users.concat(users) : users;

//     Promise.all(
//       users.map((user, index) => {
//         return user.reload(userAddresses[index].toString());
//       })
//     );

//     return this;
//   }
// }
