import BigNumber from 'bignumber.js'

import { INTEREST_PRECISION, PERCENT_PRECISION, SECONDS_PER_YEAR, ZERO } from './constants'
import { AccountResource, MIRAGE_ADDRESS } from './constants/accounts'
import { coinInfo, MoveCoin } from './constants/coinList'

export default class Vault {
  public readonly collateralCoin: MoveCoin
  public readonly borrowCoin: MoveCoin

  public readonly collateral!: BigNumber
  public readonly borrow!: BigNumber
  public readonly interest!: number // basis points
  public readonly collateralizationRate!: number // basis points
  public readonly borrowFee!: number // basis points
  public readonly exchangeRate!: BigNumber // price of collateral in terms of borrow
  public readonly liquidationFee!: number // percent of liquidator cut

  constructor(moduleResources: AccountResource[], collateralCoin: MoveCoin, borrowCoin: MoveCoin) {
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
    return `${MIRAGE_ADDRESS}::vault::Vault<${coinInfo(this.collateralCoin).type}, ${coinInfo(this.borrowCoin).type}>`
  }

  getUiTotalCollateral(): number {
    return this.collateral.div(BigNumber(10).pow(coinInfo(this.collateralCoin).decimals)).toNumber()
  }

  getUiTotalBorrow(): number {
    return this.borrow.times(BigNumber(10).pow(coinInfo(this.borrowCoin).decimals)).toNumber()
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
