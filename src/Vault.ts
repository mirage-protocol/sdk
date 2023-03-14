import BigNumber from 'bignumber.js'

import { INTEREST_PRECISION, PERCENT_PRECISION, SECONDS_PER_YEAR, ZERO } from './constants'
import { MIRAGE_FRAMEWORK_ACCOUNT } from './constants/accounts'
import { PRECISIONS, Resource, TYPES, ValidMoveCoin } from './constants/types'

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

  constructor(moduleResources: Resource[], collateralCoin: ValidMoveCoin, borrowCoin: ValidMoveCoin) {
    this.collateralCoin = collateralCoin
    this.borrowCoin = borrowCoin

    const vaultResource = moduleResources.find((resource) => resource.type == this.getVaultTypeId())

    this.borrowFee = !!vaultResource ? Number((vaultResource.data as any).borrow_fee) / Number(PERCENT_PRECISION) : 0

    this.interest = !!vaultResource
      ? Number((vaultResource.data as any).interest_per_second) / Number(INTEREST_PRECISION)
      : 0

    this.collateralizationRate = !!vaultResource
      ? Number((vaultResource.data as any).collateralization_rate) / Number(PERCENT_PRECISION)
      : 0

    this.exchangeRate = !!vaultResource ? new BigNumber((vaultResource.data as any).cached_exchange_rate) : ZERO

    this.borrow = !!vaultResource ? new BigNumber((vaultResource.data as any).borrow.elastic) : ZERO

    this.collateral = !!vaultResource ? new BigNumber((vaultResource.data as any).collateral.value) : ZERO

    this.liquidationFee = !!vaultResource
      ? Number((vaultResource.data as any).liquidation_multiplier) / Number(PERCENT_PRECISION)
      : 0
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
