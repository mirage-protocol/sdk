import * as Aptos from 'aptos'
import BigNumber from 'bignumber.js'

import { MIRAGE_FRAMEWORK_ACCOUNT } from './constants/accounts'
import { PRECISIONS, TYPES, ValidMoveCoin } from './constants/types'

const PERCENT_PRECISION = 100000 // 1e5
const RATE_PRECISION = 100000000 // 1e8
const INTEREST_PRECISION = 1000000000000

const SECONDS_PER_YEAR = 31622400

export default class Vault {
  collateralCoin: ValidMoveCoin
  borrowCoin: ValidMoveCoin

  collateral!: BigNumber
  borrow!: BigNumber
  interest!: number // basis points
  collateralizationRate!: number // basis points
  borrowFee!: number // basis points
  exchangeRate!: BigNumber // price of collateral in terms of borrow
  liquidationFee!: number // percent of liquidator cut

  constructor(moduleResources: Aptos.Types.MoveResource[], collateralCoin: ValidMoveCoin, borrowCoin: ValidMoveCoin) {
    this.collateralCoin = collateralCoin
    this.borrowCoin = borrowCoin

    const vaultResource = moduleResources.find((resource) => resource.type == this.getVaultTypeId())

    this.borrowFee = Number((vaultResource!.data as any).borrow_fee) / PERCENT_PRECISION

    this.interest = Number((vaultResource!.data as any).interest_per_second) / INTEREST_PRECISION

    this.collateralizationRate = Number((vaultResource!.data as any).collateralization_rate) / PERCENT_PRECISION

    this.exchangeRate = new BigNumber((vaultResource!.data as any).cached_exchange_rate)

    this.borrow = new BigNumber((vaultResource?.data as any).borrow.elastic)

    this.collateral = new BigNumber((vaultResource!.data as any).collateral.value)

    this.liquidationFee = Number((vaultResource!.data as any).liquidation_multiplier) / PERCENT_PRECISION
  }

  getVaultTypeId(): string {
    return `${MIRAGE_FRAMEWORK_ACCOUNT.address}::vault::Vault<${TYPES[this.collateralCoin]}, ${TYPES[this.borrowCoin]}>`
  }

  getUiTotalCollateral(): number {
    return this.collateral.times(new BigNumber(10).exponentiatedBy(-PRECISIONS[this.collateralCoin])).toNumber()
  }

  getUiTotalBorrow(): number {
    return this.borrow.times(new BigNumber(10).exponentiatedBy(-PRECISIONS[this.borrowCoin])).toNumber()
  }

  getLiquidationFeePercent(): number {
    return this.liquidationFee * 100
  }

  getCollateralizationRatePercent(): number {
    return this.collateralizationRate * 100
  }

  getBorrowFeePercent(): number {
    return this.borrowFee * 100
  }

  getBorrowInterestAPY(): number {
    return this.interest * SECONDS_PER_YEAR * 100
  }
}
