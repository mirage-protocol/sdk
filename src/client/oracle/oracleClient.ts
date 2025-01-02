import { OracleClientBase } from './oracleClientBase'
import { OracleViewsClient } from './oracleViewsClient'

export class OracleClient extends OracleClientBase {
  public readonly views = new OracleViewsClient(this, this.aptosClient)
}
