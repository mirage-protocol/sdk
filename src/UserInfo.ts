import * as Aptos from 'aptos'
import BigNumber from 'bignumber.js'

import { MIRAGE_FRAMEWORK_ACCOUNT } from './constants/accounts'
import { PRECISIONS, TYPES, ValidMoveCoin } from './constants/types'
import Rebase from './Rebase'

const COLLATERALIZATION_PRECISION = new BigNumber('100000')
const EXCHANGE_RATE_PRECISION = new BigNumber('100000000')

export default class UserInfo {
  collateralCoin: ValidMoveCoin
  borrowCoin: ValidMoveCoin
  address!: string

  userCollateral!: BigNumber
  userBorrow!: BigNumber
  liquidationPrice!: BigNumber
  remainingBorrowable!: BigNumber
  withdrawableAmount!: BigNumber
  positionHealth!: number // basis points

  collateralizationPercent!: BigNumber

  constructor(
    userResources: Aptos.Types.MoveResource[],
    moduleResources: Aptos.Types.MoveResource[],
    collateralCoin: ValidMoveCoin,
    borrow: ValidMoveCoin
  ) {
    this.collateralCoin = collateralCoin
    this.borrowCoin = borrow

    const userInfoResource = userResources.find((resource) => resource.type == this.getUserInfoTypeId())

    const vaultResource = moduleResources.find((resource) => resource.type == this.getVaultTypeId())

    this.collateralizationPercent = new BigNumber((vaultResource!.data as any).collateralization_rate).div(
      COLLATERALIZATION_PRECISION
    )

    const exchangeRate = new BigNumber((vaultResource!.data as any).cached_exchange_rate)

    this.userCollateral = new BigNumber((userInfoResource!.data as any).user_collateral)

    const totalBorrow = new Rebase(
      new BigNumber((vaultResource!.data as any).borrow.elastic),
      new BigNumber((vaultResource!.data as any).borrow.base)
    )

    this.userBorrow = totalBorrow.toElastic(new BigNumber((userInfoResource!.data as any).user_borrow_part), true)

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
    return this.userCollateral.times(new BigNumber(10).exponentiatedBy(-PRECISIONS[this.collateralCoin])).toNumber()
  }

  getUiUserBorrow(): number {
    return this.userBorrow.times(new BigNumber(10).exponentiatedBy(-PRECISIONS[this.borrowCoin])).toNumber()
  }

  getUserInfoTypeId(): string {
    return `${MIRAGE_FRAMEWORK_ACCOUNT.address}::vault::UserInfo<${TYPES[this.collateralCoin]}, ${
      TYPES[this.borrowCoin]
    }>`
  }

  getVaultTypeId(): string {
    return `${MIRAGE_FRAMEWORK_ACCOUNT.address}::vault::Vault<${TYPES[this.collateralCoin]}, ${TYPES[this.borrowCoin]}>`
  }
}
