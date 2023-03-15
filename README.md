# Mirage Protocol sdk
>>>>>>> 98ce6cc (update)

A typescript sdk for interacting with the mirage protocol contracts.

## Install

```zsh
yarn add @mirage-protocol/sdk
yarn install
```

## How to Use

```typescript
import { Vault, Coin, MoveCoin, APTOS_CLIENT, MIRAGE_ADDRESS } from '@mirage-protocol/sdk'

// get coin balance
const getCoinBalance = async (userAddr: string) => {

  // Get the resources for a user account
  const resources = await APTOS_CLIENT.getAccountResources(userAddr);

  // MoveCoin is all the coins recognized by @mirage-protocol/sdk
  const APT = MoveCoin['APT']

  // Coin class contains useful functions
  const coin = new Coin(resources, APT)

  // Get the balance
  return coin.getUiBalance()
}

// get total collateral deposited in the APT / MUSD vault
const getTotalCollateral = async () => {
  const vault = new Vault(
    await APTOS_CLIENT.getAccountResources(MIRAGE_ADDRESS),
    MoveCoin['APT'],
    MoveCoin['MUSD'],
  )

  return vault.getUiTotalCollateral()
}
```
