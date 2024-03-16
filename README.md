# Mirage Protocol sdk
>>>>>>> 98ce6cc (update)

A typescript sdk for interacting with the mirage protocol contracts.

## Install

```zsh
yarn add @mirage-protocol/sdk
yarn install
```

## How to Use

You have to collect the resources for the sdk to parse yourself. You can use the exported `APTOS_CLIENT` to make the request. Some classes require the resources of the mirage protocol account itself. You can get these by using the exported `MIRAGE_ADDRESS` alongside the client.

Resources can be kept up to date through time and fed to the sdk to keep an updated protocol state, for example on a frontend.

```typescript
import { Vault, Coin, MoveToken, aptosClient, MIRAGE_ADDRESS } from '@mirage-protocol/sdk'

// Get coin balance of a user account
const getUserAptosBalance = async (userAddr: string) => {
  // Get the resources for a user account
  const resources = await aptosClient().getAccountResources(userAddr)

  // Coin class contains useful functions
  const coin = new Coin(resources, 'APT')

  // Get the balance
  return coin.getUiBalance()
}

// get total collateral deposited in the APT / MUSD testnet vault
const getTotalTestnetCollateral = async () => {
  return new Vault(
    await aptosClient('testnet').getAccountResources(MIRAGE_ADDRESS),
    'APT',
    'mUSD'
  ).getUiTotalCollateral()
}
```
