
/**
 * Represents a mirage-protocol perpetuals market.
 */
export class Market {
  /**
   * The markets type
   */
  public readonly marketType: string
  /**
   * The mirage asset of the market
   */
  public readonly mirageAsset: MoveCoin
  /**
   * The asset of the market
   */
  public readonly asset: MoveCoin
  /**
   * 
  /**
   * Construct an instance of Vault
   * @param moduleResources resources for the vault account (MIRAGE_ACCOUNT)
   * @param collateral the collateral asset of the vault
   * @param borrow the borrow asset of the vault
   */
  constructor(moduleResources: AccountResource[], mirageAsset: MoveCoin | string, asset: MoveCoin | string) {
    this.mirageAsset = mirageAsset as MoveCoin
    this.asset = asset as MoveCoin

  }

}
struct Market<phantom C, phantom A> has key {
        /// All the margin actively being used in the market for longs & shorts
        margin: Coin<C>,
        /// Resting margin waiting for triggers
        resting_margin: Coin<C>,

        /// Maximum taker fee at the max_oi_imbalance
        max_taker_fee: u64,
        /// Minimum taker fee at equal oi
        min_taker_fee: u64,
        /// Max maker fee at equal oi
        max_maker_fee: u64,
        /// Min maker fee at large oi imbalance
        min_maker_fee: u64,

        /// The minimum funding rate
        min_funding_rate: u64,
        /// The funding that will be taken next payment
        next_funding_rate: u64,
        /// If the funding is positive
        next_funding_pos: bool,
        /// The time of the last funding payment
        last_funding_update: u64,
        /// The discount percent of the protocol on funding payments
        pool_funding_discount: u64,
        /// The interval between funding payments
        funding_interval: u64,

        /// A rebase representing all long margin (in C)
        /// elastic = long margin, base = shares of long margin
        long_margin: rebase::Rebase,

        /// A rebase representing the all short margin (in C)
        /// elastic = short margin, base = shares of short margin
        short_margin: rebase::Rebase,

        /// Long open interest in musd
        long_oi: u64,
        /// Short open interest in musd
        short_oi: u64,
        /// The max total oi allowed for the long & short sides
        max_oi: u64,
        /// The max allowed imbalance between long and short oi
        max_oi_imbalance: u64,

        /// The max leverage for this market
        max_leverage: u64,
        /// The percent fee given to liquidators
        liquidation_fee: u64,
        /// The base percent maintence margin
        maintenence_margin: u64,
        /// The base mUSD position limit for a new trade
        base_position_limit: u64,
        /// The max mUSD position limit for a new trade
        max_position_limit: u64,

        /// The cached exchange rate of the asset A
        cached_exchange_rate: u64,
        /// The last exchange rate update of A
        last_exchange_rate_update: u64,

        /// The min mUSD order size for this market
        min_order_size: u64,

        /// The net accumulated debt for this market
        net_accumulated_debt: u64,
        /// The net accumulated fees for this market
        net_accumulated_fees: u64,

        /// If the market is frozen
        frozen: bool,
        /// If the market is in an emergency
        emergency: bool,
        /// Time the market first opened
        market_open_time: u64,
 