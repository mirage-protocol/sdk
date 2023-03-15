import BigNumber from 'bignumber.js'

import { toUi } from './Coin'
import { COLLATERALIZATION_PRECISION, EXCHANGE_RATE_PRECISION, ZERO } from './constants'
import { AccountResource, MIRAGE_ADDRESS } from './constants/accounts'
import { coinInfo, MoveCoin } from './constants/coinList'
import Rebase from './Rebase'

// TODO: move a lot of the heavy lifting from the interface into here
export default class user {
  public readonly collateral: MoveCoin
  public readonly borrowCoin: MoveCoin
  public readonly address!: string

  public readonly userCollateral!: BigNumber
  public readonly userBorrow!: BigNumber
  public readonly liquidationPrice!: BigNumber
  public readonly remainingBorrowable!: BigNumber
  public readonly withdrawableAmount!: BigNumber
  public readonly positionHealth!: number // basis points

  public readonly collateralizationPercent!: BigNumber

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

  public getUiUserCollateral(): number {
    return toUi(this.userCollateral, this.collateral)
  }

  public getUiUserBorrow(): number {
    return toUi(this.userBorrow, this.borrowCoin)
  }

  public simulateIsSolvent(exchangeRate: BigNumber): boolean {
    return this.userCollateral.div(this.collateralizationPercent).times(exchangeRate).isGreaterThan(this.userBorrow)
  }

  public getUserTypeId(): string {
    return `${MIRAGE_ADDRESS}::vault::UserInfo<${coinInfo(this.collateral).type}, ${coinInfo(this.borrowCoin).type}>`
  }

  public getVaultTypeId(): string {
    return `${MIRAGE_ADDRESS}::vault::Vault<${coinInfo(this.collateral).type}, ${coinInfo(this.borrowCoin).type}>`
  }
}
