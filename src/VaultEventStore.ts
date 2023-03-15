import { HexString } from 'aptos'

import { MIRAGE_ADDRESS } from './constants/accounts'
import { mirageCoinList, MoveCoin } from './constants/coinList'
import UserInfo from './UserInfo'

export default class VaultEventStore {
  collateral: MoveCoin
  borrow: MoveCoin
  userAddresses!: HexString[]
  users!: UserInfo[]

  constructor(collateral: MoveCoin, borrow: MoveCoin) {
    this.collateral = collateral
    this.borrow = borrow
  }

  getUserInfoTypeId(): string {
    return `${MIRAGE_ADDRESS}::vault::UserInfo<${mirageCoinList[this.collateral].type},${
      mirageCoinList[this.borrow].type
    }>`
  }

  getVaultEventStoreTypeId(): string {
    return `${MIRAGE_ADDRESS}::vault::VaultEventStore<${mirageCoinList[this.collateral].type},${
      mirageCoinList[this.borrow].type
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
