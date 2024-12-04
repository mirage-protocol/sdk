# Mirage Protocol sdk

A typescript sdk for interacting with the mirage protocol contracts.

## Install

```zsh
yarn add @mirage-protocol/sdk
yarn install
```

## How to Use
TODO: improve this section

To use this sdk, you need to first initialize a client singleton.

The only required parameter is the network (aptos testnet/mainnet, movement testnet/mainnet).

You can also inject the following optional configs/clients as desired:
  - config: a mirage specific config detailing relevant modules/assets/vaults/markets etc.  Without declaration, a default is injected, but if you want to inject other optional variables you can explicilty use this default by importing eg mirage_config_testnet and injecting it.
  - aptosClient: the client used for inline views (only views use this - all transactions must be submitted via a wallet client)
  - aptosGraphqlApiKey: an api key if needed for your custom aptos graphql (indexer) client
  - aptosGraphqlClient: a graphql client pointing to an aptos indexer gql endpoint.  this endpoint must support the same queries as the official aptos indexer
  - mirageGraphqlClient: a graphql client pointing to a mirage indexer gql endpoint.  this endpoint must support the same queries as the official mirage indexer

```ts
// simple initiation
const network = Network.TESTNET
const mirageClient = new MirageClient(network)

// sending transactions
const { account, signAndSubmitTransaction, connected } = useWallet() // from '@aptos-labs/wallet-adapter-react'
...
const vaultCollectionAddr = mirageClient.addresses.getCollectionIdForVaultPair(MoveCoin.APT, MoveToken.mUSD)
const createVaultPayload = await mirageClient.vaultTransactions.createVaultAndAddCollateral(vaultCollectionAddr, 10)
await signAndSubmitTransaction({ sender: account.address, data: {...createVaultPayload } })

// calling views
const vaultIds = await mirageClient.vaultViews.getAllVaultIdsByOwner("0xcafe")
console.log(vaultIds)

// creating entities
const aptosClient = defaultAptosClient(Network.TESTNET) // mirage provides a default aptos client constructor, you can also create your own via the 'Aptos' object from the '@aptos-labs/ts-sdk'
const vaultCollectionResources = await aptosClient().getAccountResources({ accountAddress: vaultCollectionAddr })
const musdTokenResources = await aptosClient().getAccountResources({ accountAddress: mirageClient.addresses.getAssetTokenMetadata(MoveToken.mUSD)})
const vaultCollection = mirageClient.vaultEntities.createVaultCollection(vaultCollectionResources, musdTokenResources, vaultCollectionAddr)
console.log(vaultCollection.totalCollateral)
```
