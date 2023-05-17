import { AccountResource, assetInfo, coinInfo, mirageAddress, MoveCoin, OtherAsset } from '../../constants'
import { LimitOrder } from './limitOrder'

export class LimitOrders {
  /**
   * The limit order type
   */
  public readonly limitOrdersType: string
  /**
   * The base asset of the market
   */
  public readonly base: MoveCoin
  /**
   * The underlying asset of the market
   */
  public readonly underlying: OtherAsset
  /**
   * A users limit orders
   */
  public readonly orders: LimitOrder[]

  constructor(userResource: AccountResource[], base: MoveCoin | string, underlying: MoveCoin | OtherAsset | string) {
    this.base = base as MoveCoin
    this.underlying = underlying as OtherAsset

    this.limitOrdersType = `${mirageAddress()}::market::LimitOrders<${coinInfo(base).type}, ${
      assetInfo(underlying).type
    }>`

    console.debug(`attempting to get data for type: ${this.limitOrdersType}`)

    const limitOrders = userResource.find((resource) => resource.type === this.limitOrdersType)

    console.debug(`found limit orders: ${JSON.stringify(limitOrders)}`)

    const ordersArr = !!limitOrders ? (limitOrders.data as any).orders : []

    const tempOrders: LimitOrder[] = []
    for (const restingOrder of ordersArr) {
      tempOrders.push(new LimitOrder(restingOrder))
    }
    this.orders = tempOrders
  }
}
