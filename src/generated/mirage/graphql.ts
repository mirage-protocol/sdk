import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "current_limit_orders" */
export type Current_Limit_Orders = {
  __typename?: 'current_limit_orders';
  event_index: Scalars['bigint']['output'];
  is_closed: Scalars['Boolean']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  market_id: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  strategy_id: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
};

/** Boolean expression to filter rows from the table "current_limit_orders". All fields are combined with a logical 'AND'. */
export type Current_Limit_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Limit_Orders_Bool_Exp>>;
  _not?: InputMaybe<Current_Limit_Orders_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Limit_Orders_Bool_Exp>>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  is_closed?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  strategy_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_limit_orders". */
export type Current_Limit_Orders_Order_By = {
  event_index?: InputMaybe<Order_By>;
  is_closed?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  strategy_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "current_limit_orders" */
export enum Current_Limit_Orders_Select_Column {
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  IsClosed = 'is_closed',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  StrategyId = 'strategy_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp'
}

/** Streaming cursor of the table "current_limit_orders" */
export type Current_Limit_Orders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Limit_Orders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Limit_Orders_Stream_Cursor_Value_Input = {
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  is_closed?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  strategy_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** columns and relationships of "current_positions" */
export type Current_Positions = {
  __typename?: 'current_positions';
  event_index: Scalars['bigint']['output'];
  is_closed: Scalars['Boolean']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  market_id: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
};

/** Boolean expression to filter rows from the table "current_positions". All fields are combined with a logical 'AND'. */
export type Current_Positions_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Positions_Bool_Exp>>;
  _not?: InputMaybe<Current_Positions_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Positions_Bool_Exp>>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  is_closed?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_positions". */
export type Current_Positions_Order_By = {
  event_index?: InputMaybe<Order_By>;
  is_closed?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "current_positions" */
export enum Current_Positions_Select_Column {
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  IsClosed = 'is_closed',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp'
}

/** Streaming cursor of the table "current_positions" */
export type Current_Positions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Positions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Positions_Stream_Cursor_Value_Input = {
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  is_closed?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** columns and relationships of "current_tpsls" */
export type Current_Tpsls = {
  __typename?: 'current_tpsls';
  event_index: Scalars['bigint']['output'];
  is_closed: Scalars['Boolean']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  market_id: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  strategy_id: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
};

/** Boolean expression to filter rows from the table "current_tpsls". All fields are combined with a logical 'AND'. */
export type Current_Tpsls_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Tpsls_Bool_Exp>>;
  _not?: InputMaybe<Current_Tpsls_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Tpsls_Bool_Exp>>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  is_closed?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  strategy_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_tpsls". */
export type Current_Tpsls_Order_By = {
  event_index?: InputMaybe<Order_By>;
  is_closed?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  strategy_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "current_tpsls" */
export enum Current_Tpsls_Select_Column {
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  IsClosed = 'is_closed',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  StrategyId = 'strategy_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp'
}

/** Streaming cursor of the table "current_tpsls" */
export type Current_Tpsls_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Tpsls_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Tpsls_Stream_Cursor_Value_Input = {
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  is_closed?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  strategy_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "fee_store_datas" */
export type Fee_Store_Datas = {
  __typename?: 'fee_store_datas';
  net_accumulated_fees: Scalars['numeric']['output'];
  object_address: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "fee_store_datas". All fields are combined with a logical 'AND'. */
export type Fee_Store_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Fee_Store_Datas_Bool_Exp>>;
  _not?: InputMaybe<Fee_Store_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Fee_Store_Datas_Bool_Exp>>;
  net_accumulated_fees?: InputMaybe<Numeric_Comparison_Exp>;
  object_address?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "fee_store_datas". */
export type Fee_Store_Datas_Order_By = {
  net_accumulated_fees?: InputMaybe<Order_By>;
  object_address?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "fee_store_datas" */
export enum Fee_Store_Datas_Select_Column {
  /** column name */
  NetAccumulatedFees = 'net_accumulated_fees',
  /** column name */
  ObjectAddress = 'object_address',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "fee_store_datas" */
export type Fee_Store_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Fee_Store_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Fee_Store_Datas_Stream_Cursor_Value_Input = {
  net_accumulated_fees?: InputMaybe<Scalars['numeric']['input']>;
  object_address?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "limit_order_datas" */
export type Limit_Order_Datas = {
  __typename?: 'limit_order_datas';
  expiration: Scalars['numeric']['output'];
  is_decrease_only: Scalars['Boolean']['output'];
  is_long: Scalars['Boolean']['output'];
  margin: Scalars['numeric']['output'];
  max_price_slippage: Scalars['numeric']['output'];
  position_id: Scalars['String']['output'];
  position_size: Scalars['numeric']['output'];
  strategy_id: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  trigger_price: Scalars['numeric']['output'];
  triggers_above: Scalars['Boolean']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "limit_order_datas". All fields are combined with a logical 'AND'. */
export type Limit_Order_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Limit_Order_Datas_Bool_Exp>>;
  _not?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Limit_Order_Datas_Bool_Exp>>;
  expiration?: InputMaybe<Numeric_Comparison_Exp>;
  is_decrease_only?: InputMaybe<Boolean_Comparison_Exp>;
  is_long?: InputMaybe<Boolean_Comparison_Exp>;
  margin?: InputMaybe<Numeric_Comparison_Exp>;
  max_price_slippage?: InputMaybe<Numeric_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  position_size?: InputMaybe<Numeric_Comparison_Exp>;
  strategy_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  trigger_price?: InputMaybe<Numeric_Comparison_Exp>;
  triggers_above?: InputMaybe<Boolean_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "limit_order_datas". */
export type Limit_Order_Datas_Order_By = {
  expiration?: InputMaybe<Order_By>;
  is_decrease_only?: InputMaybe<Order_By>;
  is_long?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  strategy_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  triggers_above?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "limit_order_datas" */
export enum Limit_Order_Datas_Select_Column {
  /** column name */
  Expiration = 'expiration',
  /** column name */
  IsDecreaseOnly = 'is_decrease_only',
  /** column name */
  IsLong = 'is_long',
  /** column name */
  Margin = 'margin',
  /** column name */
  MaxPriceSlippage = 'max_price_slippage',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  PositionSize = 'position_size',
  /** column name */
  StrategyId = 'strategy_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  TriggerPrice = 'trigger_price',
  /** column name */
  TriggersAbove = 'triggers_above',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "limit_order_datas" */
export type Limit_Order_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Limit_Order_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Limit_Order_Datas_Stream_Cursor_Value_Input = {
  expiration?: InputMaybe<Scalars['numeric']['input']>;
  is_decrease_only?: InputMaybe<Scalars['Boolean']['input']>;
  is_long?: InputMaybe<Scalars['Boolean']['input']>;
  margin?: InputMaybe<Scalars['numeric']['input']>;
  max_price_slippage?: InputMaybe<Scalars['numeric']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  position_size?: InputMaybe<Scalars['numeric']['input']>;
  strategy_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  trigger_price?: InputMaybe<Scalars['numeric']['input']>;
  triggers_above?: InputMaybe<Scalars['Boolean']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "market_activities" */
export type Market_Activities = {
  __typename?: 'market_activities';
  event_creation_number: Scalars['bigint']['output'];
  event_index: Scalars['bigint']['output'];
  event_sequence_number: Scalars['bigint']['output'];
  event_type: Scalars['String']['output'];
  expiration?: Maybe<Scalars['numeric']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  is_decrease_only?: Maybe<Scalars['Boolean']['output']>;
  is_long?: Maybe<Scalars['Boolean']['output']>;
  margin_amount?: Maybe<Scalars['numeric']['output']>;
  market_id: Scalars['String']['output'];
  max_price_slippage?: Maybe<Scalars['numeric']['output']>;
  next_funding_rate?: Maybe<Scalars['numeric']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  perp_price?: Maybe<Scalars['numeric']['output']>;
  pnl?: Maybe<Scalars['numeric']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  position_size?: Maybe<Scalars['numeric']['output']>;
  protocol_fee?: Maybe<Scalars['numeric']['output']>;
  stop_loss_price?: Maybe<Scalars['numeric']['output']>;
  strategy_id?: Maybe<Scalars['String']['output']>;
  take_profit_price?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  trigger_price?: Maybe<Scalars['numeric']['output']>;
  triggers_above?: Maybe<Scalars['Boolean']['output']>;
};

/** Boolean expression to filter rows from the table "market_activities". All fields are combined with a logical 'AND'. */
export type Market_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Activities_Bool_Exp>>;
  _not?: InputMaybe<Market_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Activities_Bool_Exp>>;
  event_creation_number?: InputMaybe<Bigint_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  event_sequence_number?: InputMaybe<Bigint_Comparison_Exp>;
  event_type?: InputMaybe<String_Comparison_Exp>;
  expiration?: InputMaybe<Numeric_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  is_decrease_only?: InputMaybe<Boolean_Comparison_Exp>;
  is_long?: InputMaybe<Boolean_Comparison_Exp>;
  margin_amount?: InputMaybe<Numeric_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  max_price_slippage?: InputMaybe<Numeric_Comparison_Exp>;
  next_funding_rate?: InputMaybe<Numeric_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  perp_price?: InputMaybe<Numeric_Comparison_Exp>;
  pnl?: InputMaybe<Numeric_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  position_size?: InputMaybe<Numeric_Comparison_Exp>;
  protocol_fee?: InputMaybe<Numeric_Comparison_Exp>;
  stop_loss_price?: InputMaybe<Numeric_Comparison_Exp>;
  strategy_id?: InputMaybe<String_Comparison_Exp>;
  take_profit_price?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  trigger_price?: InputMaybe<Numeric_Comparison_Exp>;
  triggers_above?: InputMaybe<Boolean_Comparison_Exp>;
};

/** Ordering options when selecting data from "market_activities". */
export type Market_Activities_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  expiration?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  is_decrease_only?: InputMaybe<Order_By>;
  is_long?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  next_funding_rate?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  perp_price?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  protocol_fee?: InputMaybe<Order_By>;
  stop_loss_price?: InputMaybe<Order_By>;
  strategy_id?: InputMaybe<Order_By>;
  take_profit_price?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  triggers_above?: InputMaybe<Order_By>;
};

/** select columns of table "market_activities" */
export enum Market_Activities_Select_Column {
  /** column name */
  EventCreationNumber = 'event_creation_number',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  EventSequenceNumber = 'event_sequence_number',
  /** column name */
  EventType = 'event_type',
  /** column name */
  Expiration = 'expiration',
  /** column name */
  Fee = 'fee',
  /** column name */
  IsDecreaseOnly = 'is_decrease_only',
  /** column name */
  IsLong = 'is_long',
  /** column name */
  MarginAmount = 'margin_amount',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  MaxPriceSlippage = 'max_price_slippage',
  /** column name */
  NextFundingRate = 'next_funding_rate',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  PerpPrice = 'perp_price',
  /** column name */
  Pnl = 'pnl',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  PositionSize = 'position_size',
  /** column name */
  ProtocolFee = 'protocol_fee',
  /** column name */
  StopLossPrice = 'stop_loss_price',
  /** column name */
  StrategyId = 'strategy_id',
  /** column name */
  TakeProfitPrice = 'take_profit_price',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  TriggerPrice = 'trigger_price',
  /** column name */
  TriggersAbove = 'triggers_above'
}

/** Streaming cursor of the table "market_activities" */
export type Market_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Activities_Stream_Cursor_Value_Input = {
  event_creation_number?: InputMaybe<Scalars['bigint']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  event_sequence_number?: InputMaybe<Scalars['bigint']['input']>;
  event_type?: InputMaybe<Scalars['String']['input']>;
  expiration?: InputMaybe<Scalars['numeric']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  is_decrease_only?: InputMaybe<Scalars['Boolean']['input']>;
  is_long?: InputMaybe<Scalars['Boolean']['input']>;
  margin_amount?: InputMaybe<Scalars['numeric']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  max_price_slippage?: InputMaybe<Scalars['numeric']['input']>;
  next_funding_rate?: InputMaybe<Scalars['numeric']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  perp_price?: InputMaybe<Scalars['numeric']['input']>;
  pnl?: InputMaybe<Scalars['numeric']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  position_size?: InputMaybe<Scalars['numeric']['input']>;
  protocol_fee?: InputMaybe<Scalars['numeric']['input']>;
  stop_loss_price?: InputMaybe<Scalars['numeric']['input']>;
  strategy_id?: InputMaybe<Scalars['String']['input']>;
  take_profit_price?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  trigger_price?: InputMaybe<Scalars['numeric']['input']>;
  triggers_above?: InputMaybe<Scalars['Boolean']['input']>;
};

/** columns and relationships of "market_configs" */
export type Market_Configs = {
  __typename?: 'market_configs';
  base_funding_rate: Scalars['numeric']['output'];
  funding_interval: Scalars['numeric']['output'];
  maintenance_margin?: Maybe<Scalars['numeric']['output']>;
  margin_token_id: Scalars['String']['output'];
  market_id: Scalars['String']['output'];
  max_funding_rate: Scalars['numeric']['output'];
  max_leverage: Scalars['numeric']['output'];
  max_maker_fee: Scalars['numeric']['output'];
  max_oi: Scalars['numeric']['output'];
  max_oi_imbalance: Scalars['numeric']['output'];
  max_order_size: Scalars['numeric']['output'];
  max_taker_fee: Scalars['numeric']['output'];
  min_funding_rate: Scalars['numeric']['output'];
  min_maker_fee: Scalars['numeric']['output'];
  min_margin_amount: Scalars['numeric']['output'];
  min_order_size: Scalars['numeric']['output'];
  min_taker_fee: Scalars['numeric']['output'];
  perp_symbol: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "market_configs". All fields are combined with a logical 'AND'. */
export type Market_Configs_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Configs_Bool_Exp>>;
  _not?: InputMaybe<Market_Configs_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Configs_Bool_Exp>>;
  base_funding_rate?: InputMaybe<Numeric_Comparison_Exp>;
  funding_interval?: InputMaybe<Numeric_Comparison_Exp>;
  maintenance_margin?: InputMaybe<Numeric_Comparison_Exp>;
  margin_token_id?: InputMaybe<String_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  max_funding_rate?: InputMaybe<Numeric_Comparison_Exp>;
  max_leverage?: InputMaybe<Numeric_Comparison_Exp>;
  max_maker_fee?: InputMaybe<Numeric_Comparison_Exp>;
  max_oi?: InputMaybe<Numeric_Comparison_Exp>;
  max_oi_imbalance?: InputMaybe<Numeric_Comparison_Exp>;
  max_order_size?: InputMaybe<Numeric_Comparison_Exp>;
  max_taker_fee?: InputMaybe<Numeric_Comparison_Exp>;
  min_funding_rate?: InputMaybe<Numeric_Comparison_Exp>;
  min_maker_fee?: InputMaybe<Numeric_Comparison_Exp>;
  min_margin_amount?: InputMaybe<Numeric_Comparison_Exp>;
  min_order_size?: InputMaybe<Numeric_Comparison_Exp>;
  min_taker_fee?: InputMaybe<Numeric_Comparison_Exp>;
  perp_symbol?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "market_configs". */
export type Market_Configs_Order_By = {
  base_funding_rate?: InputMaybe<Order_By>;
  funding_interval?: InputMaybe<Order_By>;
  maintenance_margin?: InputMaybe<Order_By>;
  margin_token_id?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  max_funding_rate?: InputMaybe<Order_By>;
  max_leverage?: InputMaybe<Order_By>;
  max_maker_fee?: InputMaybe<Order_By>;
  max_oi?: InputMaybe<Order_By>;
  max_oi_imbalance?: InputMaybe<Order_By>;
  max_order_size?: InputMaybe<Order_By>;
  max_taker_fee?: InputMaybe<Order_By>;
  min_funding_rate?: InputMaybe<Order_By>;
  min_maker_fee?: InputMaybe<Order_By>;
  min_margin_amount?: InputMaybe<Order_By>;
  min_order_size?: InputMaybe<Order_By>;
  min_taker_fee?: InputMaybe<Order_By>;
  perp_symbol?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "market_configs" */
export enum Market_Configs_Select_Column {
  /** column name */
  BaseFundingRate = 'base_funding_rate',
  /** column name */
  FundingInterval = 'funding_interval',
  /** column name */
  MaintenanceMargin = 'maintenance_margin',
  /** column name */
  MarginTokenId = 'margin_token_id',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  MaxFundingRate = 'max_funding_rate',
  /** column name */
  MaxLeverage = 'max_leverage',
  /** column name */
  MaxMakerFee = 'max_maker_fee',
  /** column name */
  MaxOi = 'max_oi',
  /** column name */
  MaxOiImbalance = 'max_oi_imbalance',
  /** column name */
  MaxOrderSize = 'max_order_size',
  /** column name */
  MaxTakerFee = 'max_taker_fee',
  /** column name */
  MinFundingRate = 'min_funding_rate',
  /** column name */
  MinMakerFee = 'min_maker_fee',
  /** column name */
  MinMarginAmount = 'min_margin_amount',
  /** column name */
  MinOrderSize = 'min_order_size',
  /** column name */
  MinTakerFee = 'min_taker_fee',
  /** column name */
  PerpSymbol = 'perp_symbol',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "market_configs" */
export type Market_Configs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Configs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Configs_Stream_Cursor_Value_Input = {
  base_funding_rate?: InputMaybe<Scalars['numeric']['input']>;
  funding_interval?: InputMaybe<Scalars['numeric']['input']>;
  maintenance_margin?: InputMaybe<Scalars['numeric']['input']>;
  margin_token_id?: InputMaybe<Scalars['String']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  max_funding_rate?: InputMaybe<Scalars['numeric']['input']>;
  max_leverage?: InputMaybe<Scalars['numeric']['input']>;
  max_maker_fee?: InputMaybe<Scalars['numeric']['input']>;
  max_oi?: InputMaybe<Scalars['numeric']['input']>;
  max_oi_imbalance?: InputMaybe<Scalars['numeric']['input']>;
  max_order_size?: InputMaybe<Scalars['numeric']['input']>;
  max_taker_fee?: InputMaybe<Scalars['numeric']['input']>;
  min_funding_rate?: InputMaybe<Scalars['numeric']['input']>;
  min_maker_fee?: InputMaybe<Scalars['numeric']['input']>;
  min_margin_amount?: InputMaybe<Scalars['numeric']['input']>;
  min_order_size?: InputMaybe<Scalars['numeric']['input']>;
  min_taker_fee?: InputMaybe<Scalars['numeric']['input']>;
  perp_symbol?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "market_datas" */
export type Market_Datas = {
  __typename?: 'market_datas';
  is_long_close_only: Scalars['Boolean']['output'];
  is_short_close_only: Scalars['Boolean']['output'];
  last_funding_round: Scalars['timestamp']['output'];
  long_funding_accumulated_per_unit: Scalars['numeric']['output'];
  long_oi: Scalars['numeric']['output'];
  margin_token_id: Scalars['String']['output'];
  market_id: Scalars['String']['output'];
  next_funding_rate: Scalars['numeric']['output'];
  perp_symbol: Scalars['String']['output'];
  short_funding_accumulated_per_unit: Scalars['numeric']['output'];
  short_oi: Scalars['numeric']['output'];
  total_long_funding_accumulated: Scalars['numeric']['output'];
  total_long_margin: Scalars['numeric']['output'];
  total_short_funding_accumulated: Scalars['numeric']['output'];
  total_short_margin: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "market_datas". All fields are combined with a logical 'AND'. */
export type Market_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Market_Datas_Bool_Exp>>;
  _not?: InputMaybe<Market_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Market_Datas_Bool_Exp>>;
  is_long_close_only?: InputMaybe<Boolean_Comparison_Exp>;
  is_short_close_only?: InputMaybe<Boolean_Comparison_Exp>;
  last_funding_round?: InputMaybe<Timestamp_Comparison_Exp>;
  long_funding_accumulated_per_unit?: InputMaybe<Numeric_Comparison_Exp>;
  long_oi?: InputMaybe<Numeric_Comparison_Exp>;
  margin_token_id?: InputMaybe<String_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  next_funding_rate?: InputMaybe<Numeric_Comparison_Exp>;
  perp_symbol?: InputMaybe<String_Comparison_Exp>;
  short_funding_accumulated_per_unit?: InputMaybe<Numeric_Comparison_Exp>;
  short_oi?: InputMaybe<Numeric_Comparison_Exp>;
  total_long_funding_accumulated?: InputMaybe<Numeric_Comparison_Exp>;
  total_long_margin?: InputMaybe<Numeric_Comparison_Exp>;
  total_short_funding_accumulated?: InputMaybe<Numeric_Comparison_Exp>;
  total_short_margin?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "market_datas". */
export type Market_Datas_Order_By = {
  is_long_close_only?: InputMaybe<Order_By>;
  is_short_close_only?: InputMaybe<Order_By>;
  last_funding_round?: InputMaybe<Order_By>;
  long_funding_accumulated_per_unit?: InputMaybe<Order_By>;
  long_oi?: InputMaybe<Order_By>;
  margin_token_id?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  next_funding_rate?: InputMaybe<Order_By>;
  perp_symbol?: InputMaybe<Order_By>;
  short_funding_accumulated_per_unit?: InputMaybe<Order_By>;
  short_oi?: InputMaybe<Order_By>;
  total_long_funding_accumulated?: InputMaybe<Order_By>;
  total_long_margin?: InputMaybe<Order_By>;
  total_short_funding_accumulated?: InputMaybe<Order_By>;
  total_short_margin?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "market_datas" */
export enum Market_Datas_Select_Column {
  /** column name */
  IsLongCloseOnly = 'is_long_close_only',
  /** column name */
  IsShortCloseOnly = 'is_short_close_only',
  /** column name */
  LastFundingRound = 'last_funding_round',
  /** column name */
  LongFundingAccumulatedPerUnit = 'long_funding_accumulated_per_unit',
  /** column name */
  LongOi = 'long_oi',
  /** column name */
  MarginTokenId = 'margin_token_id',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  NextFundingRate = 'next_funding_rate',
  /** column name */
  PerpSymbol = 'perp_symbol',
  /** column name */
  ShortFundingAccumulatedPerUnit = 'short_funding_accumulated_per_unit',
  /** column name */
  ShortOi = 'short_oi',
  /** column name */
  TotalLongFundingAccumulated = 'total_long_funding_accumulated',
  /** column name */
  TotalLongMargin = 'total_long_margin',
  /** column name */
  TotalShortFundingAccumulated = 'total_short_funding_accumulated',
  /** column name */
  TotalShortMargin = 'total_short_margin',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "market_datas" */
export type Market_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Market_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Market_Datas_Stream_Cursor_Value_Input = {
  is_long_close_only?: InputMaybe<Scalars['Boolean']['input']>;
  is_short_close_only?: InputMaybe<Scalars['Boolean']['input']>;
  last_funding_round?: InputMaybe<Scalars['timestamp']['input']>;
  long_funding_accumulated_per_unit?: InputMaybe<Scalars['numeric']['input']>;
  long_oi?: InputMaybe<Scalars['numeric']['input']>;
  margin_token_id?: InputMaybe<Scalars['String']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  next_funding_rate?: InputMaybe<Scalars['numeric']['input']>;
  perp_symbol?: InputMaybe<Scalars['String']['input']>;
  short_funding_accumulated_per_unit?: InputMaybe<Scalars['numeric']['input']>;
  short_oi?: InputMaybe<Scalars['numeric']['input']>;
  total_long_funding_accumulated?: InputMaybe<Scalars['numeric']['input']>;
  total_long_margin?: InputMaybe<Scalars['numeric']['input']>;
  total_short_funding_accumulated?: InputMaybe<Scalars['numeric']['input']>;
  total_short_margin?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "mirage_debt_store_datas" */
export type Mirage_Debt_Store_Datas = {
  __typename?: 'mirage_debt_store_datas';
  debt_base: Scalars['numeric']['output'];
  debt_elastic: Scalars['numeric']['output'];
  object_address: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "mirage_debt_store_datas". All fields are combined with a logical 'AND'. */
export type Mirage_Debt_Store_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Mirage_Debt_Store_Datas_Bool_Exp>>;
  _not?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Mirage_Debt_Store_Datas_Bool_Exp>>;
  debt_base?: InputMaybe<Numeric_Comparison_Exp>;
  debt_elastic?: InputMaybe<Numeric_Comparison_Exp>;
  object_address?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "mirage_debt_store_datas". */
export type Mirage_Debt_Store_Datas_Order_By = {
  debt_base?: InputMaybe<Order_By>;
  debt_elastic?: InputMaybe<Order_By>;
  object_address?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "mirage_debt_store_datas" */
export enum Mirage_Debt_Store_Datas_Select_Column {
  /** column name */
  DebtBase = 'debt_base',
  /** column name */
  DebtElastic = 'debt_elastic',
  /** column name */
  ObjectAddress = 'object_address',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "mirage_debt_store_datas" */
export type Mirage_Debt_Store_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Mirage_Debt_Store_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Mirage_Debt_Store_Datas_Stream_Cursor_Value_Input = {
  debt_base?: InputMaybe<Scalars['numeric']['input']>;
  debt_elastic?: InputMaybe<Scalars['numeric']['input']>;
  object_address?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "position_datas" */
export type Position_Datas = {
  __typename?: 'position_datas';
  last_funding_accumulated: Scalars['numeric']['output'];
  last_open_timestamp: Scalars['numeric']['output'];
  last_settled_price: Scalars['numeric']['output'];
  margin_amount: Scalars['numeric']['output'];
  market_id: Scalars['String']['output'];
  owner_addr: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  position_size: Scalars['numeric']['output'];
  side: Scalars['String']['output'];
  total_strategy_margin: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "position_datas". All fields are combined with a logical 'AND'. */
export type Position_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Position_Datas_Bool_Exp>>;
  _not?: InputMaybe<Position_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Position_Datas_Bool_Exp>>;
  last_funding_accumulated?: InputMaybe<Numeric_Comparison_Exp>;
  last_open_timestamp?: InputMaybe<Numeric_Comparison_Exp>;
  last_settled_price?: InputMaybe<Numeric_Comparison_Exp>;
  margin_amount?: InputMaybe<Numeric_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  position_size?: InputMaybe<Numeric_Comparison_Exp>;
  side?: InputMaybe<String_Comparison_Exp>;
  total_strategy_margin?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "position_datas". */
export type Position_Datas_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  last_open_timestamp?: InputMaybe<Order_By>;
  last_settled_price?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  side?: InputMaybe<Order_By>;
  total_strategy_margin?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "position_datas" */
export enum Position_Datas_Select_Column {
  /** column name */
  LastFundingAccumulated = 'last_funding_accumulated',
  /** column name */
  LastOpenTimestamp = 'last_open_timestamp',
  /** column name */
  LastSettledPrice = 'last_settled_price',
  /** column name */
  MarginAmount = 'margin_amount',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  PositionSize = 'position_size',
  /** column name */
  Side = 'side',
  /** column name */
  TotalStrategyMargin = 'total_strategy_margin',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "position_datas" */
export type Position_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Position_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Position_Datas_Stream_Cursor_Value_Input = {
  last_funding_accumulated?: InputMaybe<Scalars['numeric']['input']>;
  last_open_timestamp?: InputMaybe<Scalars['numeric']['input']>;
  last_settled_price?: InputMaybe<Scalars['numeric']['input']>;
  margin_amount?: InputMaybe<Scalars['numeric']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  position_size?: InputMaybe<Scalars['numeric']['input']>;
  side?: InputMaybe<Scalars['String']['input']>;
  total_strategy_margin?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "current_limit_orders" */
  current_limit_orders: Array<Current_Limit_Orders>;
  /** fetch data from the table: "current_limit_orders" using primary key columns */
  current_limit_orders_by_pk?: Maybe<Current_Limit_Orders>;
  /** fetch data from the table: "current_positions" */
  current_positions: Array<Current_Positions>;
  /** fetch data from the table: "current_positions" using primary key columns */
  current_positions_by_pk?: Maybe<Current_Positions>;
  /** fetch data from the table: "current_tpsls" */
  current_tpsls: Array<Current_Tpsls>;
  /** fetch data from the table: "current_tpsls" using primary key columns */
  current_tpsls_by_pk?: Maybe<Current_Tpsls>;
  /** fetch data from the table: "fee_store_datas" */
  fee_store_datas: Array<Fee_Store_Datas>;
  /** fetch data from the table: "fee_store_datas" using primary key columns */
  fee_store_datas_by_pk?: Maybe<Fee_Store_Datas>;
  /** fetch data from the table: "limit_order_datas" */
  limit_order_datas: Array<Limit_Order_Datas>;
  /** fetch data from the table: "limit_order_datas" using primary key columns */
  limit_order_datas_by_pk?: Maybe<Limit_Order_Datas>;
  /** fetch data from the table: "market_activities" */
  market_activities: Array<Market_Activities>;
  /** fetch data from the table: "market_activities" using primary key columns */
  market_activities_by_pk?: Maybe<Market_Activities>;
  /** fetch data from the table: "market_configs" */
  market_configs: Array<Market_Configs>;
  /** fetch data from the table: "market_configs" using primary key columns */
  market_configs_by_pk?: Maybe<Market_Configs>;
  /** fetch data from the table: "market_datas" */
  market_datas: Array<Market_Datas>;
  /** fetch data from the table: "market_datas" using primary key columns */
  market_datas_by_pk?: Maybe<Market_Datas>;
  /** fetch data from the table: "mirage_debt_store_datas" */
  mirage_debt_store_datas: Array<Mirage_Debt_Store_Datas>;
  /** fetch data from the table: "mirage_debt_store_datas" using primary key columns */
  mirage_debt_store_datas_by_pk?: Maybe<Mirage_Debt_Store_Datas>;
  /** fetch data from the table: "position_datas" */
  position_datas: Array<Position_Datas>;
  /** fetch data from the table: "position_datas" using primary key columns */
  position_datas_by_pk?: Maybe<Position_Datas>;
  /** fetch data from the table: "tpsl_datas" */
  tpsl_datas: Array<Tpsl_Datas>;
  /** fetch data from the table: "tpsl_datas" using primary key columns */
  tpsl_datas_by_pk?: Maybe<Tpsl_Datas>;
  /** fetch data from the table: "trade_datas" */
  trade_datas: Array<Trade_Datas>;
  /** fetch data from the table: "trade_datas" using primary key columns */
  trade_datas_by_pk?: Maybe<Trade_Datas>;
  /** fetch data from the table: "vault_activities" */
  vault_activities: Array<Vault_Activities>;
  /** fetch data from the table: "vault_activities" using primary key columns */
  vault_activities_by_pk?: Maybe<Vault_Activities>;
  /** fetch data from the table: "vault_collection_configs" */
  vault_collection_configs: Array<Vault_Collection_Configs>;
  /** fetch data from the table: "vault_collection_configs" using primary key columns */
  vault_collection_configs_by_pk?: Maybe<Vault_Collection_Configs>;
  /** fetch data from the table: "vault_collection_datas" */
  vault_collection_datas: Array<Vault_Collection_Datas>;
  /** fetch aggregated fields from the table: "vault_collection_datas" */
  vault_collection_datas_aggregate: Vault_Collection_Datas_Aggregate;
  /** fetch data from the table: "vault_collection_datas" using primary key columns */
  vault_collection_datas_by_pk?: Maybe<Vault_Collection_Datas>;
  /** fetch data from the table: "vault_datas" */
  vault_datas: Array<Vault_Datas>;
  /** fetch data from the table: "vault_datas" using primary key columns */
  vault_datas_by_pk?: Maybe<Vault_Datas>;
};


export type Query_RootCurrent_Limit_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Current_Limit_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Limit_Orders_Order_By>>;
  where?: InputMaybe<Current_Limit_Orders_Bool_Exp>;
};


export type Query_RootCurrent_Limit_Orders_By_PkArgs = {
  strategy_id: Scalars['String']['input'];
};


export type Query_RootCurrent_PositionsArgs = {
  distinct_on?: InputMaybe<Array<Current_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Positions_Order_By>>;
  where?: InputMaybe<Current_Positions_Bool_Exp>;
};


export type Query_RootCurrent_Positions_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Query_RootCurrent_TpslsArgs = {
  distinct_on?: InputMaybe<Array<Current_Tpsls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Tpsls_Order_By>>;
  where?: InputMaybe<Current_Tpsls_Bool_Exp>;
};


export type Query_RootCurrent_Tpsls_By_PkArgs = {
  strategy_id: Scalars['String']['input'];
};


export type Query_RootFee_Store_DatasArgs = {
  distinct_on?: InputMaybe<Array<Fee_Store_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Store_Datas_Order_By>>;
  where?: InputMaybe<Fee_Store_Datas_Bool_Exp>;
};


export type Query_RootFee_Store_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootLimit_Order_DatasArgs = {
  distinct_on?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Limit_Order_Datas_Order_By>>;
  where?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
};


export type Query_RootLimit_Order_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootMarket_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Market_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Activities_Order_By>>;
  where?: InputMaybe<Market_Activities_Bool_Exp>;
};


export type Query_RootMarket_Activities_By_PkArgs = {
  event_creation_number: Scalars['bigint']['input'];
  event_index: Scalars['bigint']['input'];
  event_sequence_number: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootMarket_ConfigsArgs = {
  distinct_on?: InputMaybe<Array<Market_Configs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Configs_Order_By>>;
  where?: InputMaybe<Market_Configs_Bool_Exp>;
};


export type Query_RootMarket_Configs_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootMarket_DatasArgs = {
  distinct_on?: InputMaybe<Array<Market_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Datas_Order_By>>;
  where?: InputMaybe<Market_Datas_Bool_Exp>;
};


export type Query_RootMarket_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootMirage_Debt_Store_DatasArgs = {
  distinct_on?: InputMaybe<Array<Mirage_Debt_Store_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mirage_Debt_Store_Datas_Order_By>>;
  where?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
};


export type Query_RootMirage_Debt_Store_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootPosition_DatasArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


export type Query_RootPosition_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootTpsl_DatasArgs = {
  distinct_on?: InputMaybe<Array<Tpsl_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tpsl_Datas_Order_By>>;
  where?: InputMaybe<Tpsl_Datas_Bool_Exp>;
};


export type Query_RootTpsl_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootTrade_DatasArgs = {
  distinct_on?: InputMaybe<Array<Trade_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Trade_Datas_Order_By>>;
  where?: InputMaybe<Trade_Datas_Bool_Exp>;
};


export type Query_RootTrade_Datas_By_PkArgs = {
  position_id: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootVault_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Vault_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Activities_Order_By>>;
  where?: InputMaybe<Vault_Activities_Bool_Exp>;
};


export type Query_RootVault_Activities_By_PkArgs = {
  event_creation_number: Scalars['bigint']['input'];
  event_index: Scalars['bigint']['input'];
  event_sequence_number: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootVault_Collection_ConfigsArgs = {
  distinct_on?: InputMaybe<Array<Vault_Collection_Configs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Collection_Configs_Order_By>>;
  where?: InputMaybe<Vault_Collection_Configs_Bool_Exp>;
};


export type Query_RootVault_Collection_Configs_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootVault_Collection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Vault_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Collection_Datas_Order_By>>;
  where?: InputMaybe<Vault_Collection_Datas_Bool_Exp>;
};


export type Query_RootVault_Collection_Datas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vault_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Collection_Datas_Order_By>>;
  where?: InputMaybe<Vault_Collection_Datas_Bool_Exp>;
};


export type Query_RootVault_Collection_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootVault_DatasArgs = {
  distinct_on?: InputMaybe<Array<Vault_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Datas_Order_By>>;
  where?: InputMaybe<Vault_Datas_Bool_Exp>;
};


export type Query_RootVault_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "current_limit_orders" */
  current_limit_orders: Array<Current_Limit_Orders>;
  /** fetch data from the table: "current_limit_orders" using primary key columns */
  current_limit_orders_by_pk?: Maybe<Current_Limit_Orders>;
  /** fetch data from the table in a streaming manner: "current_limit_orders" */
  current_limit_orders_stream: Array<Current_Limit_Orders>;
  /** fetch data from the table: "current_positions" */
  current_positions: Array<Current_Positions>;
  /** fetch data from the table: "current_positions" using primary key columns */
  current_positions_by_pk?: Maybe<Current_Positions>;
  /** fetch data from the table in a streaming manner: "current_positions" */
  current_positions_stream: Array<Current_Positions>;
  /** fetch data from the table: "current_tpsls" */
  current_tpsls: Array<Current_Tpsls>;
  /** fetch data from the table: "current_tpsls" using primary key columns */
  current_tpsls_by_pk?: Maybe<Current_Tpsls>;
  /** fetch data from the table in a streaming manner: "current_tpsls" */
  current_tpsls_stream: Array<Current_Tpsls>;
  /** fetch data from the table: "fee_store_datas" */
  fee_store_datas: Array<Fee_Store_Datas>;
  /** fetch data from the table: "fee_store_datas" using primary key columns */
  fee_store_datas_by_pk?: Maybe<Fee_Store_Datas>;
  /** fetch data from the table in a streaming manner: "fee_store_datas" */
  fee_store_datas_stream: Array<Fee_Store_Datas>;
  /** fetch data from the table: "limit_order_datas" */
  limit_order_datas: Array<Limit_Order_Datas>;
  /** fetch data from the table: "limit_order_datas" using primary key columns */
  limit_order_datas_by_pk?: Maybe<Limit_Order_Datas>;
  /** fetch data from the table in a streaming manner: "limit_order_datas" */
  limit_order_datas_stream: Array<Limit_Order_Datas>;
  /** fetch data from the table: "market_activities" */
  market_activities: Array<Market_Activities>;
  /** fetch data from the table: "market_activities" using primary key columns */
  market_activities_by_pk?: Maybe<Market_Activities>;
  /** fetch data from the table in a streaming manner: "market_activities" */
  market_activities_stream: Array<Market_Activities>;
  /** fetch data from the table: "market_configs" */
  market_configs: Array<Market_Configs>;
  /** fetch data from the table: "market_configs" using primary key columns */
  market_configs_by_pk?: Maybe<Market_Configs>;
  /** fetch data from the table in a streaming manner: "market_configs" */
  market_configs_stream: Array<Market_Configs>;
  /** fetch data from the table: "market_datas" */
  market_datas: Array<Market_Datas>;
  /** fetch data from the table: "market_datas" using primary key columns */
  market_datas_by_pk?: Maybe<Market_Datas>;
  /** fetch data from the table in a streaming manner: "market_datas" */
  market_datas_stream: Array<Market_Datas>;
  /** fetch data from the table: "mirage_debt_store_datas" */
  mirage_debt_store_datas: Array<Mirage_Debt_Store_Datas>;
  /** fetch data from the table: "mirage_debt_store_datas" using primary key columns */
  mirage_debt_store_datas_by_pk?: Maybe<Mirage_Debt_Store_Datas>;
  /** fetch data from the table in a streaming manner: "mirage_debt_store_datas" */
  mirage_debt_store_datas_stream: Array<Mirage_Debt_Store_Datas>;
  /** fetch data from the table: "position_datas" */
  position_datas: Array<Position_Datas>;
  /** fetch data from the table: "position_datas" using primary key columns */
  position_datas_by_pk?: Maybe<Position_Datas>;
  /** fetch data from the table in a streaming manner: "position_datas" */
  position_datas_stream: Array<Position_Datas>;
  /** fetch data from the table: "tpsl_datas" */
  tpsl_datas: Array<Tpsl_Datas>;
  /** fetch data from the table: "tpsl_datas" using primary key columns */
  tpsl_datas_by_pk?: Maybe<Tpsl_Datas>;
  /** fetch data from the table in a streaming manner: "tpsl_datas" */
  tpsl_datas_stream: Array<Tpsl_Datas>;
  /** fetch data from the table: "trade_datas" */
  trade_datas: Array<Trade_Datas>;
  /** fetch data from the table: "trade_datas" using primary key columns */
  trade_datas_by_pk?: Maybe<Trade_Datas>;
  /** fetch data from the table in a streaming manner: "trade_datas" */
  trade_datas_stream: Array<Trade_Datas>;
  /** fetch data from the table: "vault_activities" */
  vault_activities: Array<Vault_Activities>;
  /** fetch data from the table: "vault_activities" using primary key columns */
  vault_activities_by_pk?: Maybe<Vault_Activities>;
  /** fetch data from the table in a streaming manner: "vault_activities" */
  vault_activities_stream: Array<Vault_Activities>;
  /** fetch data from the table: "vault_collection_configs" */
  vault_collection_configs: Array<Vault_Collection_Configs>;
  /** fetch data from the table: "vault_collection_configs" using primary key columns */
  vault_collection_configs_by_pk?: Maybe<Vault_Collection_Configs>;
  /** fetch data from the table in a streaming manner: "vault_collection_configs" */
  vault_collection_configs_stream: Array<Vault_Collection_Configs>;
  /** fetch data from the table: "vault_collection_datas" */
  vault_collection_datas: Array<Vault_Collection_Datas>;
  /** fetch aggregated fields from the table: "vault_collection_datas" */
  vault_collection_datas_aggregate: Vault_Collection_Datas_Aggregate;
  /** fetch data from the table: "vault_collection_datas" using primary key columns */
  vault_collection_datas_by_pk?: Maybe<Vault_Collection_Datas>;
  /** fetch data from the table in a streaming manner: "vault_collection_datas" */
  vault_collection_datas_stream: Array<Vault_Collection_Datas>;
  /** fetch data from the table: "vault_datas" */
  vault_datas: Array<Vault_Datas>;
  /** fetch data from the table: "vault_datas" using primary key columns */
  vault_datas_by_pk?: Maybe<Vault_Datas>;
  /** fetch data from the table in a streaming manner: "vault_datas" */
  vault_datas_stream: Array<Vault_Datas>;
};


export type Subscription_RootCurrent_Limit_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Current_Limit_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Limit_Orders_Order_By>>;
  where?: InputMaybe<Current_Limit_Orders_Bool_Exp>;
};


export type Subscription_RootCurrent_Limit_Orders_By_PkArgs = {
  strategy_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Limit_Orders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Limit_Orders_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Limit_Orders_Bool_Exp>;
};


export type Subscription_RootCurrent_PositionsArgs = {
  distinct_on?: InputMaybe<Array<Current_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Positions_Order_By>>;
  where?: InputMaybe<Current_Positions_Bool_Exp>;
};


export type Subscription_RootCurrent_Positions_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Positions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Positions_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Positions_Bool_Exp>;
};


export type Subscription_RootCurrent_TpslsArgs = {
  distinct_on?: InputMaybe<Array<Current_Tpsls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Tpsls_Order_By>>;
  where?: InputMaybe<Current_Tpsls_Bool_Exp>;
};


export type Subscription_RootCurrent_Tpsls_By_PkArgs = {
  strategy_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Tpsls_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Tpsls_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Tpsls_Bool_Exp>;
};


export type Subscription_RootFee_Store_DatasArgs = {
  distinct_on?: InputMaybe<Array<Fee_Store_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fee_Store_Datas_Order_By>>;
  where?: InputMaybe<Fee_Store_Datas_Bool_Exp>;
};


export type Subscription_RootFee_Store_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootFee_Store_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Fee_Store_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Fee_Store_Datas_Bool_Exp>;
};


export type Subscription_RootLimit_Order_DatasArgs = {
  distinct_on?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Limit_Order_Datas_Order_By>>;
  where?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
};


export type Subscription_RootLimit_Order_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootLimit_Order_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Limit_Order_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
};


export type Subscription_RootMarket_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Market_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Activities_Order_By>>;
  where?: InputMaybe<Market_Activities_Bool_Exp>;
};


export type Subscription_RootMarket_Activities_By_PkArgs = {
  event_creation_number: Scalars['bigint']['input'];
  event_index: Scalars['bigint']['input'];
  event_sequence_number: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootMarket_Activities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Market_Activities_Stream_Cursor_Input>>;
  where?: InputMaybe<Market_Activities_Bool_Exp>;
};


export type Subscription_RootMarket_ConfigsArgs = {
  distinct_on?: InputMaybe<Array<Market_Configs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Configs_Order_By>>;
  where?: InputMaybe<Market_Configs_Bool_Exp>;
};


export type Subscription_RootMarket_Configs_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootMarket_Configs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Market_Configs_Stream_Cursor_Input>>;
  where?: InputMaybe<Market_Configs_Bool_Exp>;
};


export type Subscription_RootMarket_DatasArgs = {
  distinct_on?: InputMaybe<Array<Market_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Market_Datas_Order_By>>;
  where?: InputMaybe<Market_Datas_Bool_Exp>;
};


export type Subscription_RootMarket_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootMarket_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Market_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Market_Datas_Bool_Exp>;
};


export type Subscription_RootMirage_Debt_Store_DatasArgs = {
  distinct_on?: InputMaybe<Array<Mirage_Debt_Store_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mirage_Debt_Store_Datas_Order_By>>;
  where?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
};


export type Subscription_RootMirage_Debt_Store_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootMirage_Debt_Store_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Mirage_Debt_Store_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
};


export type Subscription_RootPosition_DatasArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


export type Subscription_RootPosition_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootPosition_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Position_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


export type Subscription_RootTpsl_DatasArgs = {
  distinct_on?: InputMaybe<Array<Tpsl_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tpsl_Datas_Order_By>>;
  where?: InputMaybe<Tpsl_Datas_Bool_Exp>;
};


export type Subscription_RootTpsl_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootTpsl_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tpsl_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Tpsl_Datas_Bool_Exp>;
};


export type Subscription_RootTrade_DatasArgs = {
  distinct_on?: InputMaybe<Array<Trade_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Trade_Datas_Order_By>>;
  where?: InputMaybe<Trade_Datas_Bool_Exp>;
};


export type Subscription_RootTrade_Datas_By_PkArgs = {
  position_id: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootTrade_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Trade_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Trade_Datas_Bool_Exp>;
};


export type Subscription_RootVault_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Vault_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Activities_Order_By>>;
  where?: InputMaybe<Vault_Activities_Bool_Exp>;
};


export type Subscription_RootVault_Activities_By_PkArgs = {
  event_creation_number: Scalars['bigint']['input'];
  event_index: Scalars['bigint']['input'];
  event_sequence_number: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootVault_Activities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vault_Activities_Stream_Cursor_Input>>;
  where?: InputMaybe<Vault_Activities_Bool_Exp>;
};


export type Subscription_RootVault_Collection_ConfigsArgs = {
  distinct_on?: InputMaybe<Array<Vault_Collection_Configs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Collection_Configs_Order_By>>;
  where?: InputMaybe<Vault_Collection_Configs_Bool_Exp>;
};


export type Subscription_RootVault_Collection_Configs_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootVault_Collection_Configs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vault_Collection_Configs_Stream_Cursor_Input>>;
  where?: InputMaybe<Vault_Collection_Configs_Bool_Exp>;
};


export type Subscription_RootVault_Collection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Vault_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Collection_Datas_Order_By>>;
  where?: InputMaybe<Vault_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootVault_Collection_Datas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vault_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Collection_Datas_Order_By>>;
  where?: InputMaybe<Vault_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootVault_Collection_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootVault_Collection_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vault_Collection_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Vault_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootVault_DatasArgs = {
  distinct_on?: InputMaybe<Array<Vault_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Vault_Datas_Order_By>>;
  where?: InputMaybe<Vault_Datas_Bool_Exp>;
};


export type Subscription_RootVault_Datas_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootVault_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Vault_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Vault_Datas_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** columns and relationships of "tpsl_datas" */
export type Tpsl_Datas = {
  __typename?: 'tpsl_datas';
  position_id: Scalars['String']['output'];
  stop_loss_price: Scalars['numeric']['output'];
  strategy_id: Scalars['String']['output'];
  take_profit_price: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "tpsl_datas". All fields are combined with a logical 'AND'. */
export type Tpsl_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Tpsl_Datas_Bool_Exp>>;
  _not?: InputMaybe<Tpsl_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Tpsl_Datas_Bool_Exp>>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  stop_loss_price?: InputMaybe<Numeric_Comparison_Exp>;
  strategy_id?: InputMaybe<String_Comparison_Exp>;
  take_profit_price?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "tpsl_datas". */
export type Tpsl_Datas_Order_By = {
  position_id?: InputMaybe<Order_By>;
  stop_loss_price?: InputMaybe<Order_By>;
  strategy_id?: InputMaybe<Order_By>;
  take_profit_price?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "tpsl_datas" */
export enum Tpsl_Datas_Select_Column {
  /** column name */
  PositionId = 'position_id',
  /** column name */
  StopLossPrice = 'stop_loss_price',
  /** column name */
  StrategyId = 'strategy_id',
  /** column name */
  TakeProfitPrice = 'take_profit_price',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "tpsl_datas" */
export type Tpsl_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tpsl_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tpsl_Datas_Stream_Cursor_Value_Input = {
  position_id?: InputMaybe<Scalars['String']['input']>;
  stop_loss_price?: InputMaybe<Scalars['numeric']['input']>;
  strategy_id?: InputMaybe<Scalars['String']['input']>;
  take_profit_price?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "trade_datas" */
export type Trade_Datas = {
  __typename?: 'trade_datas';
  event_type: Scalars['String']['output'];
  fee: Scalars['numeric']['output'];
  is_long: Scalars['Boolean']['output'];
  market_id: Scalars['String']['output'];
  owner_addr: Scalars['String']['output'];
  pnl: Scalars['numeric']['output'];
  position_id: Scalars['String']['output'];
  position_size: Scalars['numeric']['output'];
  price: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "trade_datas". All fields are combined with a logical 'AND'. */
export type Trade_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Trade_Datas_Bool_Exp>>;
  _not?: InputMaybe<Trade_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Trade_Datas_Bool_Exp>>;
  event_type?: InputMaybe<String_Comparison_Exp>;
  fee?: InputMaybe<Numeric_Comparison_Exp>;
  is_long?: InputMaybe<Boolean_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  pnl?: InputMaybe<Numeric_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  position_size?: InputMaybe<Numeric_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "trade_datas". */
export type Trade_Datas_Order_By = {
  event_type?: InputMaybe<Order_By>;
  fee?: InputMaybe<Order_By>;
  is_long?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "trade_datas" */
export enum Trade_Datas_Select_Column {
  /** column name */
  EventType = 'event_type',
  /** column name */
  Fee = 'fee',
  /** column name */
  IsLong = 'is_long',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  Pnl = 'pnl',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  PositionSize = 'position_size',
  /** column name */
  Price = 'price',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** Streaming cursor of the table "trade_datas" */
export type Trade_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Trade_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Trade_Datas_Stream_Cursor_Value_Input = {
  event_type?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['numeric']['input']>;
  is_long?: InputMaybe<Scalars['Boolean']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  pnl?: InputMaybe<Scalars['numeric']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  position_size?: InputMaybe<Scalars['numeric']['input']>;
  price?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "vault_activities" */
export type Vault_Activities = {
  __typename?: 'vault_activities';
  borrow_amount?: Maybe<Scalars['numeric']['output']>;
  collateral_amount?: Maybe<Scalars['numeric']['output']>;
  collateralization_rate_after?: Maybe<Scalars['numeric']['output']>;
  collateralization_rate_before?: Maybe<Scalars['numeric']['output']>;
  collection_id: Scalars['String']['output'];
  event_creation_number: Scalars['bigint']['output'];
  event_index: Scalars['bigint']['output'];
  event_sequence_number: Scalars['bigint']['output'];
  event_type: Scalars['String']['output'];
  fee_amount?: Maybe<Scalars['numeric']['output']>;
  new_interest_per_second?: Maybe<Scalars['numeric']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  socialized_amount?: Maybe<Scalars['numeric']['output']>;
  src_vault_id?: Maybe<Scalars['String']['output']>;
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  vault_id?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "vault_activities". All fields are combined with a logical 'AND'. */
export type Vault_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Vault_Activities_Bool_Exp>>;
  _not?: InputMaybe<Vault_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Vault_Activities_Bool_Exp>>;
  borrow_amount?: InputMaybe<Numeric_Comparison_Exp>;
  collateral_amount?: InputMaybe<Numeric_Comparison_Exp>;
  collateralization_rate_after?: InputMaybe<Numeric_Comparison_Exp>;
  collateralization_rate_before?: InputMaybe<Numeric_Comparison_Exp>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  event_creation_number?: InputMaybe<Bigint_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  event_sequence_number?: InputMaybe<Bigint_Comparison_Exp>;
  event_type?: InputMaybe<String_Comparison_Exp>;
  fee_amount?: InputMaybe<Numeric_Comparison_Exp>;
  new_interest_per_second?: InputMaybe<Numeric_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  socialized_amount?: InputMaybe<Numeric_Comparison_Exp>;
  src_vault_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  vault_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "vault_activities". */
export type Vault_Activities_Order_By = {
  borrow_amount?: InputMaybe<Order_By>;
  collateral_amount?: InputMaybe<Order_By>;
  collateralization_rate_after?: InputMaybe<Order_By>;
  collateralization_rate_before?: InputMaybe<Order_By>;
  collection_id?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  fee_amount?: InputMaybe<Order_By>;
  new_interest_per_second?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  socialized_amount?: InputMaybe<Order_By>;
  src_vault_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
};

/** select columns of table "vault_activities" */
export enum Vault_Activities_Select_Column {
  /** column name */
  BorrowAmount = 'borrow_amount',
  /** column name */
  CollateralAmount = 'collateral_amount',
  /** column name */
  CollateralizationRateAfter = 'collateralization_rate_after',
  /** column name */
  CollateralizationRateBefore = 'collateralization_rate_before',
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  EventCreationNumber = 'event_creation_number',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  EventSequenceNumber = 'event_sequence_number',
  /** column name */
  EventType = 'event_type',
  /** column name */
  FeeAmount = 'fee_amount',
  /** column name */
  NewInterestPerSecond = 'new_interest_per_second',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  SocializedAmount = 'socialized_amount',
  /** column name */
  SrcVaultId = 'src_vault_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  VaultId = 'vault_id'
}

/** Streaming cursor of the table "vault_activities" */
export type Vault_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vault_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vault_Activities_Stream_Cursor_Value_Input = {
  borrow_amount?: InputMaybe<Scalars['numeric']['input']>;
  collateral_amount?: InputMaybe<Scalars['numeric']['input']>;
  collateralization_rate_after?: InputMaybe<Scalars['numeric']['input']>;
  collateralization_rate_before?: InputMaybe<Scalars['numeric']['input']>;
  collection_id?: InputMaybe<Scalars['String']['input']>;
  event_creation_number?: InputMaybe<Scalars['bigint']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  event_sequence_number?: InputMaybe<Scalars['bigint']['input']>;
  event_type?: InputMaybe<Scalars['String']['input']>;
  fee_amount?: InputMaybe<Scalars['numeric']['input']>;
  new_interest_per_second?: InputMaybe<Scalars['numeric']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  socialized_amount?: InputMaybe<Scalars['numeric']['input']>;
  src_vault_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  vault_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "vault_collection_configs" */
export type Vault_Collection_Configs = {
  __typename?: 'vault_collection_configs';
  borrow_fee: Scalars['numeric']['output'];
  borrow_token_id: Scalars['String']['output'];
  collateral_token_id: Scalars['String']['output'];
  collection_id: Scalars['String']['output'];
  initial_collateralization_rate: Scalars['numeric']['output'];
  interest_per_second: Scalars['numeric']['output'];
  liquidation_multiplier: Scalars['numeric']['output'];
  maintenance_collateralization_rate: Scalars['numeric']['output'];
  max_collection_debt_amount: Scalars['numeric']['output'];
  min_collateral_amount: Scalars['numeric']['output'];
  protocol_liquidation_fee: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "vault_collection_configs". All fields are combined with a logical 'AND'. */
export type Vault_Collection_Configs_Bool_Exp = {
  _and?: InputMaybe<Array<Vault_Collection_Configs_Bool_Exp>>;
  _not?: InputMaybe<Vault_Collection_Configs_Bool_Exp>;
  _or?: InputMaybe<Array<Vault_Collection_Configs_Bool_Exp>>;
  borrow_fee?: InputMaybe<Numeric_Comparison_Exp>;
  borrow_token_id?: InputMaybe<String_Comparison_Exp>;
  collateral_token_id?: InputMaybe<String_Comparison_Exp>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  initial_collateralization_rate?: InputMaybe<Numeric_Comparison_Exp>;
  interest_per_second?: InputMaybe<Numeric_Comparison_Exp>;
  liquidation_multiplier?: InputMaybe<Numeric_Comparison_Exp>;
  maintenance_collateralization_rate?: InputMaybe<Numeric_Comparison_Exp>;
  max_collection_debt_amount?: InputMaybe<Numeric_Comparison_Exp>;
  min_collateral_amount?: InputMaybe<Numeric_Comparison_Exp>;
  protocol_liquidation_fee?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "vault_collection_configs". */
export type Vault_Collection_Configs_Order_By = {
  borrow_fee?: InputMaybe<Order_By>;
  borrow_token_id?: InputMaybe<Order_By>;
  collateral_token_id?: InputMaybe<Order_By>;
  collection_id?: InputMaybe<Order_By>;
  initial_collateralization_rate?: InputMaybe<Order_By>;
  interest_per_second?: InputMaybe<Order_By>;
  liquidation_multiplier?: InputMaybe<Order_By>;
  maintenance_collateralization_rate?: InputMaybe<Order_By>;
  max_collection_debt_amount?: InputMaybe<Order_By>;
  min_collateral_amount?: InputMaybe<Order_By>;
  protocol_liquidation_fee?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "vault_collection_configs" */
export enum Vault_Collection_Configs_Select_Column {
  /** column name */
  BorrowFee = 'borrow_fee',
  /** column name */
  BorrowTokenId = 'borrow_token_id',
  /** column name */
  CollateralTokenId = 'collateral_token_id',
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  InitialCollateralizationRate = 'initial_collateralization_rate',
  /** column name */
  InterestPerSecond = 'interest_per_second',
  /** column name */
  LiquidationMultiplier = 'liquidation_multiplier',
  /** column name */
  MaintenanceCollateralizationRate = 'maintenance_collateralization_rate',
  /** column name */
  MaxCollectionDebtAmount = 'max_collection_debt_amount',
  /** column name */
  MinCollateralAmount = 'min_collateral_amount',
  /** column name */
  ProtocolLiquidationFee = 'protocol_liquidation_fee',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "vault_collection_configs" */
export type Vault_Collection_Configs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vault_Collection_Configs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vault_Collection_Configs_Stream_Cursor_Value_Input = {
  borrow_fee?: InputMaybe<Scalars['numeric']['input']>;
  borrow_token_id?: InputMaybe<Scalars['String']['input']>;
  collateral_token_id?: InputMaybe<Scalars['String']['input']>;
  collection_id?: InputMaybe<Scalars['String']['input']>;
  initial_collateralization_rate?: InputMaybe<Scalars['numeric']['input']>;
  interest_per_second?: InputMaybe<Scalars['numeric']['input']>;
  liquidation_multiplier?: InputMaybe<Scalars['numeric']['input']>;
  maintenance_collateralization_rate?: InputMaybe<Scalars['numeric']['input']>;
  max_collection_debt_amount?: InputMaybe<Scalars['numeric']['input']>;
  min_collateral_amount?: InputMaybe<Scalars['numeric']['input']>;
  protocol_liquidation_fee?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "vault_collection_datas" */
export type Vault_Collection_Datas = {
  __typename?: 'vault_collection_datas';
  borrow_base: Scalars['numeric']['output'];
  borrow_elastic: Scalars['numeric']['output'];
  borrow_token_id: Scalars['String']['output'];
  cached_exchange_rate: Scalars['numeric']['output'];
  collateral_token_id: Scalars['String']['output'];
  collection_id: Scalars['String']['output'];
  global_debt_part: Scalars['numeric']['output'];
  is_emergency: Scalars['Boolean']['output'];
  last_interest_payment: Scalars['timestamp']['output'];
  last_interest_update: Scalars['timestamp']['output'];
  total_collateral: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  /** An object relationship */
  vault_collection_debt_store_datas?: Maybe<Mirage_Debt_Store_Datas>;
  write_set_change_index: Scalars['bigint']['output'];
};

/** aggregated selection of "vault_collection_datas" */
export type Vault_Collection_Datas_Aggregate = {
  __typename?: 'vault_collection_datas_aggregate';
  aggregate?: Maybe<Vault_Collection_Datas_Aggregate_Fields>;
  nodes: Array<Vault_Collection_Datas>;
};

/** aggregate fields of "vault_collection_datas" */
export type Vault_Collection_Datas_Aggregate_Fields = {
  __typename?: 'vault_collection_datas_aggregate_fields';
  avg?: Maybe<Vault_Collection_Datas_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Vault_Collection_Datas_Max_Fields>;
  min?: Maybe<Vault_Collection_Datas_Min_Fields>;
  stddev?: Maybe<Vault_Collection_Datas_Stddev_Fields>;
  stddev_pop?: Maybe<Vault_Collection_Datas_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vault_Collection_Datas_Stddev_Samp_Fields>;
  sum?: Maybe<Vault_Collection_Datas_Sum_Fields>;
  var_pop?: Maybe<Vault_Collection_Datas_Var_Pop_Fields>;
  var_samp?: Maybe<Vault_Collection_Datas_Var_Samp_Fields>;
  variance?: Maybe<Vault_Collection_Datas_Variance_Fields>;
};


/** aggregate fields of "vault_collection_datas" */
export type Vault_Collection_Datas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vault_Collection_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Vault_Collection_Datas_Avg_Fields = {
  __typename?: 'vault_collection_datas_avg_fields';
  borrow_base?: Maybe<Scalars['Float']['output']>;
  borrow_elastic?: Maybe<Scalars['Float']['output']>;
  cached_exchange_rate?: Maybe<Scalars['Float']['output']>;
  global_debt_part?: Maybe<Scalars['Float']['output']>;
  total_collateral?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "vault_collection_datas". All fields are combined with a logical 'AND'. */
export type Vault_Collection_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Vault_Collection_Datas_Bool_Exp>>;
  _not?: InputMaybe<Vault_Collection_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Vault_Collection_Datas_Bool_Exp>>;
  borrow_base?: InputMaybe<Numeric_Comparison_Exp>;
  borrow_elastic?: InputMaybe<Numeric_Comparison_Exp>;
  borrow_token_id?: InputMaybe<String_Comparison_Exp>;
  cached_exchange_rate?: InputMaybe<Numeric_Comparison_Exp>;
  collateral_token_id?: InputMaybe<String_Comparison_Exp>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  global_debt_part?: InputMaybe<Numeric_Comparison_Exp>;
  is_emergency?: InputMaybe<Boolean_Comparison_Exp>;
  last_interest_payment?: InputMaybe<Timestamp_Comparison_Exp>;
  last_interest_update?: InputMaybe<Timestamp_Comparison_Exp>;
  total_collateral?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  vault_collection_debt_store_datas?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Vault_Collection_Datas_Max_Fields = {
  __typename?: 'vault_collection_datas_max_fields';
  borrow_base?: Maybe<Scalars['numeric']['output']>;
  borrow_elastic?: Maybe<Scalars['numeric']['output']>;
  borrow_token_id?: Maybe<Scalars['String']['output']>;
  cached_exchange_rate?: Maybe<Scalars['numeric']['output']>;
  collateral_token_id?: Maybe<Scalars['String']['output']>;
  collection_id?: Maybe<Scalars['String']['output']>;
  global_debt_part?: Maybe<Scalars['numeric']['output']>;
  last_interest_payment?: Maybe<Scalars['timestamp']['output']>;
  last_interest_update?: Maybe<Scalars['timestamp']['output']>;
  total_collateral?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Vault_Collection_Datas_Min_Fields = {
  __typename?: 'vault_collection_datas_min_fields';
  borrow_base?: Maybe<Scalars['numeric']['output']>;
  borrow_elastic?: Maybe<Scalars['numeric']['output']>;
  borrow_token_id?: Maybe<Scalars['String']['output']>;
  cached_exchange_rate?: Maybe<Scalars['numeric']['output']>;
  collateral_token_id?: Maybe<Scalars['String']['output']>;
  collection_id?: Maybe<Scalars['String']['output']>;
  global_debt_part?: Maybe<Scalars['numeric']['output']>;
  last_interest_payment?: Maybe<Scalars['timestamp']['output']>;
  last_interest_update?: Maybe<Scalars['timestamp']['output']>;
  total_collateral?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "vault_collection_datas". */
export type Vault_Collection_Datas_Order_By = {
  borrow_base?: InputMaybe<Order_By>;
  borrow_elastic?: InputMaybe<Order_By>;
  borrow_token_id?: InputMaybe<Order_By>;
  cached_exchange_rate?: InputMaybe<Order_By>;
  collateral_token_id?: InputMaybe<Order_By>;
  collection_id?: InputMaybe<Order_By>;
  global_debt_part?: InputMaybe<Order_By>;
  is_emergency?: InputMaybe<Order_By>;
  last_interest_payment?: InputMaybe<Order_By>;
  last_interest_update?: InputMaybe<Order_By>;
  total_collateral?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  vault_collection_debt_store_datas?: InputMaybe<Mirage_Debt_Store_Datas_Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "vault_collection_datas" */
export enum Vault_Collection_Datas_Select_Column {
  /** column name */
  BorrowBase = 'borrow_base',
  /** column name */
  BorrowElastic = 'borrow_elastic',
  /** column name */
  BorrowTokenId = 'borrow_token_id',
  /** column name */
  CachedExchangeRate = 'cached_exchange_rate',
  /** column name */
  CollateralTokenId = 'collateral_token_id',
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  GlobalDebtPart = 'global_debt_part',
  /** column name */
  IsEmergency = 'is_emergency',
  /** column name */
  LastInterestPayment = 'last_interest_payment',
  /** column name */
  LastInterestUpdate = 'last_interest_update',
  /** column name */
  TotalCollateral = 'total_collateral',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** aggregate stddev on columns */
export type Vault_Collection_Datas_Stddev_Fields = {
  __typename?: 'vault_collection_datas_stddev_fields';
  borrow_base?: Maybe<Scalars['Float']['output']>;
  borrow_elastic?: Maybe<Scalars['Float']['output']>;
  cached_exchange_rate?: Maybe<Scalars['Float']['output']>;
  global_debt_part?: Maybe<Scalars['Float']['output']>;
  total_collateral?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Vault_Collection_Datas_Stddev_Pop_Fields = {
  __typename?: 'vault_collection_datas_stddev_pop_fields';
  borrow_base?: Maybe<Scalars['Float']['output']>;
  borrow_elastic?: Maybe<Scalars['Float']['output']>;
  cached_exchange_rate?: Maybe<Scalars['Float']['output']>;
  global_debt_part?: Maybe<Scalars['Float']['output']>;
  total_collateral?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Vault_Collection_Datas_Stddev_Samp_Fields = {
  __typename?: 'vault_collection_datas_stddev_samp_fields';
  borrow_base?: Maybe<Scalars['Float']['output']>;
  borrow_elastic?: Maybe<Scalars['Float']['output']>;
  cached_exchange_rate?: Maybe<Scalars['Float']['output']>;
  global_debt_part?: Maybe<Scalars['Float']['output']>;
  total_collateral?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "vault_collection_datas" */
export type Vault_Collection_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vault_Collection_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vault_Collection_Datas_Stream_Cursor_Value_Input = {
  borrow_base?: InputMaybe<Scalars['numeric']['input']>;
  borrow_elastic?: InputMaybe<Scalars['numeric']['input']>;
  borrow_token_id?: InputMaybe<Scalars['String']['input']>;
  cached_exchange_rate?: InputMaybe<Scalars['numeric']['input']>;
  collateral_token_id?: InputMaybe<Scalars['String']['input']>;
  collection_id?: InputMaybe<Scalars['String']['input']>;
  global_debt_part?: InputMaybe<Scalars['numeric']['input']>;
  is_emergency?: InputMaybe<Scalars['Boolean']['input']>;
  last_interest_payment?: InputMaybe<Scalars['timestamp']['input']>;
  last_interest_update?: InputMaybe<Scalars['timestamp']['input']>;
  total_collateral?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Vault_Collection_Datas_Sum_Fields = {
  __typename?: 'vault_collection_datas_sum_fields';
  borrow_base?: Maybe<Scalars['numeric']['output']>;
  borrow_elastic?: Maybe<Scalars['numeric']['output']>;
  cached_exchange_rate?: Maybe<Scalars['numeric']['output']>;
  global_debt_part?: Maybe<Scalars['numeric']['output']>;
  total_collateral?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Vault_Collection_Datas_Var_Pop_Fields = {
  __typename?: 'vault_collection_datas_var_pop_fields';
  borrow_base?: Maybe<Scalars['Float']['output']>;
  borrow_elastic?: Maybe<Scalars['Float']['output']>;
  cached_exchange_rate?: Maybe<Scalars['Float']['output']>;
  global_debt_part?: Maybe<Scalars['Float']['output']>;
  total_collateral?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Vault_Collection_Datas_Var_Samp_Fields = {
  __typename?: 'vault_collection_datas_var_samp_fields';
  borrow_base?: Maybe<Scalars['Float']['output']>;
  borrow_elastic?: Maybe<Scalars['Float']['output']>;
  cached_exchange_rate?: Maybe<Scalars['Float']['output']>;
  global_debt_part?: Maybe<Scalars['Float']['output']>;
  total_collateral?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Vault_Collection_Datas_Variance_Fields = {
  __typename?: 'vault_collection_datas_variance_fields';
  borrow_base?: Maybe<Scalars['Float']['output']>;
  borrow_elastic?: Maybe<Scalars['Float']['output']>;
  cached_exchange_rate?: Maybe<Scalars['Float']['output']>;
  global_debt_part?: Maybe<Scalars['Float']['output']>;
  total_collateral?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "vault_datas" */
export type Vault_Datas = {
  __typename?: 'vault_datas';
  borrow_part: Scalars['numeric']['output'];
  collateral_amount: Scalars['numeric']['output'];
  collection_id: Scalars['String']['output'];
  owner_addr: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  vault_id: Scalars['String']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "vault_datas". All fields are combined with a logical 'AND'. */
export type Vault_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Vault_Datas_Bool_Exp>>;
  _not?: InputMaybe<Vault_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Vault_Datas_Bool_Exp>>;
  borrow_part?: InputMaybe<Numeric_Comparison_Exp>;
  collateral_amount?: InputMaybe<Numeric_Comparison_Exp>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  vault_id?: InputMaybe<String_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "vault_datas". */
export type Vault_Datas_Order_By = {
  borrow_part?: InputMaybe<Order_By>;
  collateral_amount?: InputMaybe<Order_By>;
  collection_id?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  vault_id?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "vault_datas" */
export enum Vault_Datas_Select_Column {
  /** column name */
  BorrowPart = 'borrow_part',
  /** column name */
  CollateralAmount = 'collateral_amount',
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  VaultId = 'vault_id',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "vault_datas" */
export type Vault_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Vault_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Vault_Datas_Stream_Cursor_Value_Input = {
  borrow_part?: InputMaybe<Scalars['numeric']['input']>;
  collateral_amount?: InputMaybe<Scalars['numeric']['input']>;
  collection_id?: InputMaybe<Scalars['String']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  vault_id?: InputMaybe<Scalars['String']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

export type GetVaultCollectionAprQueryVariables = Exact<{
  prevDebtTimestamp: Scalars['timestamp']['input'];
  collectionId: Scalars['String']['input'];
}>;


export type GetVaultCollectionAprQuery = { __typename?: 'query_root', prevDebt: Array<{ __typename?: 'vault_collection_datas', transactionTimestamp: any, transactionVersion: any, borrowBase: any, borrowElastic: any, globalDebt?: { __typename?: 'mirage_debt_store_datas', debtBase: any, debtElastic: any, objectAddress: string } | null }>, currentDebt: Array<{ __typename?: 'vault_collection_datas', transactionTimestamp: any, transactionVersion: any, borrowBase: any, borrowElastic: any, globalDebt?: { __typename?: 'mirage_debt_store_datas', debtBase: any, debtElastic: any, objectAddress: string } | null }> };


export const GetVaultCollectionAprDocument = gql`
    query GetVaultCollectionAPR($prevDebtTimestamp: timestamp!, $collectionId: String!) {
  prevDebt: vault_collection_datas(
    order_by: {transaction_version: asc}
    where: {collection_id: {_eq: $collectionId}, transaction_timestamp: {_gte: $prevDebtTimestamp}, global_debt_part: {_gt: 0}}
    limit: 1
  ) {
    transactionTimestamp: transaction_timestamp
    transactionVersion: transaction_version
    borrowBase: borrow_base
    borrowElastic: borrow_elastic
    globalDebt: vault_collection_debt_store_datas {
      debtBase: debt_base
      debtElastic: debt_elastic
      objectAddress: object_address
    }
  }
  currentDebt: vault_collection_datas(
    order_by: {transaction_version: desc}
    where: {collection_id: {_eq: $collectionId}, global_debt_part: {_gt: 0}}
    limit: 1
  ) {
    transactionTimestamp: transaction_timestamp
    transactionVersion: transaction_version
    borrowBase: borrow_base
    borrowElastic: borrow_elastic
    globalDebt: vault_collection_debt_store_datas {
      debtBase: debt_base
      debtElastic: debt_elastic
      objectAddress: object_address
    }
  }
}
    `;

export function useGetVaultCollectionAprQuery(options: Omit<Urql.UseQueryArgs<GetVaultCollectionAprQueryVariables>, 'query'>) {
  return Urql.useQuery<GetVaultCollectionAprQuery, GetVaultCollectionAprQueryVariables>({ query: GetVaultCollectionAprDocument, ...options });
};