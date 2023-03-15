import BigNumber from 'bignumber.js'

import { COLLATERALIZATION_PRECISION, EXCHANGE_RATE_PRECISION, ZERO } from './constants'
import { AccountResource, MIRAGE_ADDRESS } from './constants/accounts'
import { mirageCoinList, MoveCoin } from './constants/coinList'
import Rebase from './Rebase'

// TODO: move a lot of the heavy lifting from the interface into here
export default class user {
  collateral: MoveCoin
  borrowCoin: MoveCoin
  address!: string

  userCollateral!: BigNumber
  userBorrow!: BigNumber
  liquidationPrice!: BigNumber
  remainingBorrowable!: BigNumber
  withdrawableAmount!: BigNumber
  positionHealth!: number // basis points

  collateralizationPercent!: BigNumber

  constructor(
    userResources: AccountResource[],
    moduleResources: AccountResource[],
    collateral: MoveCoin,
    borrow: MoveCoin
  ) {
    this.collateral = collateral
    this.borrowCoin = borrow

    const user = userResources.find((resource) => resource.type == this.getUserTypeId())
    const vault = moduleResources.find((resource) => resource.type == this.getVaultTypeId())

    this.collateralizationPercent = !!vault
      ? new BigNumber((vault.data as any).collateralization_rate).div(COLLATERALIZATION_PRECISION)
      : ZERO

    const exchangeRate = !!vault ? new BigNumber((vault.data as any).cached_exchange_rate) : ZERO

    this.userCollateral = !!user ? new BigNumber((user.data as any).user_collateral) : ZERO

    const totalBorrow = !!vault
      ? new Rebase(new BigNumber((vault.data as any).borrow.elastic), new BigNumber((vault.data as any).borrow.base))
      : new Rebase(ZERO, ZERO)

    this.userBorrow = !!user ? totalBorrow.toElastic(new BigNumber((user.data as any).user_borrow_part), true) : ZERO

    this.liquidationPrice = this.userBorrow
      .times(EXCHANGE_RATE_PRECISION)
      .div(this.userCollateral)
      .div(this.collateralizationPercent)

    const maxBorrow = this.userCollateral
      .times(exchangeRate)
      .div(EXCHANGE_RATE_PRECISION)
      .times(this.collateralizationPercent)

    const maxCollateral = this.userCollateral.times(this.collateralizationPercent)

    this.positionHealth =
      10000 -
      this.userBorrow.times(EXCHANGE_RATE_PRECISION).div(exchangeRate).times(10000).div(maxCollateral).toNumber()

    this.remainingBorrowable = maxBorrow.minus(this.userBorrow)

    const minCollateral = this.userBorrow
      .times(EXCHANGE_RATE_PRECISION)
      .div(exchangeRate)
      .div(this.collateralizationPercent)

    this.withdrawableAmount = this.userCollateral.minus(minCollateral)
  }

  simulateIsSolvent(exchangeRate: BigNumber): boolean {
    return this.userCollateral.div(this.collateralizationPercent).times(exchangeRate).isGreaterThan(this.userBorrow)
  }

  getUiUserCollateral(): number {
    return this.userCollateral.times(BigNumber(10).pow(mirageCoinList[this.collateral].decimals)).toNumber()
  }

  getUiUserBorrow(): number {
    return this.userBorrow.div(BigNumber(10).pow(mirageCoinList[this.borrowCoin].decimals)).toNumber()
  }

  getUserTypeId(): string {
    return `${MIRAGE_ADDRESS}::vault::UserInfo<${mirageCoinList[this.collateral].type}, ${
      mirageCoinList[this.borrowCoin].type
    }>`
  }

  getVaultTypeId(): string {
    return `${MIRAGE_ADDRESS}::vault::Vault<${mirageCoinList[this.collateral].type}, ${
      mirageCoinList[this.borrowCoin].type
    }>`
  }
}
