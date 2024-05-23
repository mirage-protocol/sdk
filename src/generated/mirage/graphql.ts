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
  jsonb: { input: any; output: any; }
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

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
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

/** columns and relationships of "closed_positions" */
export type Closed_Positions = {
  __typename?: 'closed_positions';
  /** An array relationship */
  closed_position_datas: Array<Position_Datas>;
  /** An aggregate relationship */
  closed_position_datas_aggregate: Position_Datas_Aggregate;
  /** An array relationship */
  closed_trade_datas: Array<Trade_Datas>;
  market_id: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
};


/** columns and relationships of "closed_positions" */
export type Closed_PositionsClosed_Position_DatasArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


/** columns and relationships of "closed_positions" */
export type Closed_PositionsClosed_Position_Datas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


/** columns and relationships of "closed_positions" */
export type Closed_PositionsClosed_Trade_DatasArgs = {
  distinct_on?: InputMaybe<Array<Trade_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Trade_Datas_Order_By>>;
  where?: InputMaybe<Trade_Datas_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "closed_positions". All fields are combined with a logical 'AND'. */
export type Closed_Positions_Bool_Exp = {
  _and?: InputMaybe<Array<Closed_Positions_Bool_Exp>>;
  _not?: InputMaybe<Closed_Positions_Bool_Exp>;
  _or?: InputMaybe<Array<Closed_Positions_Bool_Exp>>;
  closed_position_datas?: InputMaybe<Position_Datas_Bool_Exp>;
  closed_position_datas_aggregate?: InputMaybe<Position_Datas_Aggregate_Bool_Exp>;
  closed_trade_datas?: InputMaybe<Trade_Datas_Bool_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "closed_positions". */
export type Closed_Positions_Order_By = {
  closed_position_datas_aggregate?: InputMaybe<Position_Datas_Aggregate_Order_By>;
  closed_trade_datas_aggregate?: InputMaybe<Trade_Datas_Aggregate_Order_By>;
  market_id?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "closed_positions" */
export enum Closed_Positions_Select_Column {
  /** column name */
  MarketId = 'market_id',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** Streaming cursor of the table "closed_positions" */
export type Closed_Positions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Closed_Positions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Closed_Positions_Stream_Cursor_Value_Input = {
  market_id?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "current_collection_datas" */
export type Current_Collection_Datas = {
  __typename?: 'current_collection_datas';
  collection_data_id_hash: Scalars['String']['output'];
  collection_name: Scalars['String']['output'];
  creator_address: Scalars['String']['output'];
  description: Scalars['String']['output'];
  description_mutable: Scalars['Boolean']['output'];
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  maximum: Scalars['numeric']['output'];
  maximum_mutable: Scalars['Boolean']['output'];
  metadata_uri: Scalars['String']['output'];
  supply: Scalars['numeric']['output'];
  table_handle: Scalars['String']['output'];
  uri_mutable: Scalars['Boolean']['output'];
};

/** aggregated selection of "current_collection_datas" */
export type Current_Collection_Datas_Aggregate = {
  __typename?: 'current_collection_datas_aggregate';
  aggregate?: Maybe<Current_Collection_Datas_Aggregate_Fields>;
  nodes: Array<Current_Collection_Datas>;
};

/** aggregate fields of "current_collection_datas" */
export type Current_Collection_Datas_Aggregate_Fields = {
  __typename?: 'current_collection_datas_aggregate_fields';
  avg?: Maybe<Current_Collection_Datas_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Collection_Datas_Max_Fields>;
  min?: Maybe<Current_Collection_Datas_Min_Fields>;
  stddev?: Maybe<Current_Collection_Datas_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Collection_Datas_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Collection_Datas_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Collection_Datas_Sum_Fields>;
  var_pop?: Maybe<Current_Collection_Datas_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Collection_Datas_Var_Samp_Fields>;
  variance?: Maybe<Current_Collection_Datas_Variance_Fields>;
};


/** aggregate fields of "current_collection_datas" */
export type Current_Collection_Datas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Collection_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Current_Collection_Datas_Avg_Fields = {
  __typename?: 'current_collection_datas_avg_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "current_collection_datas". All fields are combined with a logical 'AND'. */
export type Current_Collection_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Collection_Datas_Bool_Exp>>;
  _not?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Collection_Datas_Bool_Exp>>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  description_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  maximum?: InputMaybe<Numeric_Comparison_Exp>;
  maximum_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
  uri_mutable?: InputMaybe<Boolean_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Collection_Datas_Max_Fields = {
  __typename?: 'current_collection_datas_max_fields';
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  table_handle?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Current_Collection_Datas_Min_Fields = {
  __typename?: 'current_collection_datas_min_fields';
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  table_handle?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "current_collection_datas". */
export type Current_Collection_Datas_Order_By = {
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  description_mutable?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  maximum?: InputMaybe<Order_By>;
  maximum_mutable?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  table_handle?: InputMaybe<Order_By>;
  uri_mutable?: InputMaybe<Order_By>;
};

/** select columns of table "current_collection_datas" */
export enum Current_Collection_Datas_Select_Column {
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  Description = 'description',
  /** column name */
  DescriptionMutable = 'description_mutable',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  Maximum = 'maximum',
  /** column name */
  MaximumMutable = 'maximum_mutable',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  Supply = 'supply',
  /** column name */
  TableHandle = 'table_handle',
  /** column name */
  UriMutable = 'uri_mutable'
}

/** aggregate stddev on columns */
export type Current_Collection_Datas_Stddev_Fields = {
  __typename?: 'current_collection_datas_stddev_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Current_Collection_Datas_Stddev_Pop_Fields = {
  __typename?: 'current_collection_datas_stddev_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Current_Collection_Datas_Stddev_Samp_Fields = {
  __typename?: 'current_collection_datas_stddev_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "current_collection_datas" */
export type Current_Collection_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Collection_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Collection_Datas_Stream_Cursor_Value_Input = {
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  maximum?: InputMaybe<Scalars['numeric']['input']>;
  maximum_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
  uri_mutable?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type Current_Collection_Datas_Sum_Fields = {
  __typename?: 'current_collection_datas_sum_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Current_Collection_Datas_Var_Pop_Fields = {
  __typename?: 'current_collection_datas_var_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Current_Collection_Datas_Var_Samp_Fields = {
  __typename?: 'current_collection_datas_var_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Current_Collection_Datas_Variance_Fields = {
  __typename?: 'current_collection_datas_variance_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "current_collections_v2" */
export type Current_Collections_V2 = {
  __typename?: 'current_collections_v2';
  collection_id: Scalars['String']['output'];
  collection_name: Scalars['String']['output'];
  creator_address: Scalars['String']['output'];
  current_supply: Scalars['numeric']['output'];
  description: Scalars['String']['output'];
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  max_supply?: Maybe<Scalars['numeric']['output']>;
  mutable_description?: Maybe<Scalars['Boolean']['output']>;
  mutable_uri?: Maybe<Scalars['Boolean']['output']>;
  table_handle_v1?: Maybe<Scalars['String']['output']>;
  token_standard: Scalars['String']['output'];
  total_minted_v2?: Maybe<Scalars['numeric']['output']>;
  uri: Scalars['String']['output'];
};

/** aggregated selection of "current_collections_v2" */
export type Current_Collections_V2_Aggregate = {
  __typename?: 'current_collections_v2_aggregate';
  aggregate?: Maybe<Current_Collections_V2_Aggregate_Fields>;
  nodes: Array<Current_Collections_V2>;
};

/** aggregate fields of "current_collections_v2" */
export type Current_Collections_V2_Aggregate_Fields = {
  __typename?: 'current_collections_v2_aggregate_fields';
  avg?: Maybe<Current_Collections_V2_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Collections_V2_Max_Fields>;
  min?: Maybe<Current_Collections_V2_Min_Fields>;
  stddev?: Maybe<Current_Collections_V2_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Collections_V2_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Collections_V2_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Collections_V2_Sum_Fields>;
  var_pop?: Maybe<Current_Collections_V2_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Collections_V2_Var_Samp_Fields>;
  variance?: Maybe<Current_Collections_V2_Variance_Fields>;
};


/** aggregate fields of "current_collections_v2" */
export type Current_Collections_V2_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Collections_V2_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Current_Collections_V2_Avg_Fields = {
  __typename?: 'current_collections_v2_avg_fields';
  current_supply?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  total_minted_v2?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "current_collections_v2". All fields are combined with a logical 'AND'. */
export type Current_Collections_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Collections_V2_Bool_Exp>>;
  _not?: InputMaybe<Current_Collections_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Collections_V2_Bool_Exp>>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  current_supply?: InputMaybe<Numeric_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  max_supply?: InputMaybe<Numeric_Comparison_Exp>;
  mutable_description?: InputMaybe<Boolean_Comparison_Exp>;
  mutable_uri?: InputMaybe<Boolean_Comparison_Exp>;
  table_handle_v1?: InputMaybe<String_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
  total_minted_v2?: InputMaybe<Numeric_Comparison_Exp>;
  uri?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Collections_V2_Max_Fields = {
  __typename?: 'current_collections_v2_max_fields';
  collection_id?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  current_supply?: Maybe<Scalars['numeric']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  max_supply?: Maybe<Scalars['numeric']['output']>;
  table_handle_v1?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
  total_minted_v2?: Maybe<Scalars['numeric']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Current_Collections_V2_Min_Fields = {
  __typename?: 'current_collections_v2_min_fields';
  collection_id?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  current_supply?: Maybe<Scalars['numeric']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  max_supply?: Maybe<Scalars['numeric']['output']>;
  table_handle_v1?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
  total_minted_v2?: Maybe<Scalars['numeric']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "current_collections_v2". */
export type Current_Collections_V2_Order_By = {
  collection_id?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  current_supply?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  max_supply?: InputMaybe<Order_By>;
  mutable_description?: InputMaybe<Order_By>;
  mutable_uri?: InputMaybe<Order_By>;
  table_handle_v1?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  total_minted_v2?: InputMaybe<Order_By>;
  uri?: InputMaybe<Order_By>;
};

/** select columns of table "current_collections_v2" */
export enum Current_Collections_V2_Select_Column {
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  CurrentSupply = 'current_supply',
  /** column name */
  Description = 'description',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  MaxSupply = 'max_supply',
  /** column name */
  MutableDescription = 'mutable_description',
  /** column name */
  MutableUri = 'mutable_uri',
  /** column name */
  TableHandleV1 = 'table_handle_v1',
  /** column name */
  TokenStandard = 'token_standard',
  /** column name */
  TotalMintedV2 = 'total_minted_v2',
  /** column name */
  Uri = 'uri'
}

/** aggregate stddev on columns */
export type Current_Collections_V2_Stddev_Fields = {
  __typename?: 'current_collections_v2_stddev_fields';
  current_supply?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  total_minted_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Current_Collections_V2_Stddev_Pop_Fields = {
  __typename?: 'current_collections_v2_stddev_pop_fields';
  current_supply?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  total_minted_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Current_Collections_V2_Stddev_Samp_Fields = {
  __typename?: 'current_collections_v2_stddev_samp_fields';
  current_supply?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  total_minted_v2?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "current_collections_v2" */
export type Current_Collections_V2_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Collections_V2_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Collections_V2_Stream_Cursor_Value_Input = {
  collection_id?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  current_supply?: InputMaybe<Scalars['numeric']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  max_supply?: InputMaybe<Scalars['numeric']['input']>;
  mutable_description?: InputMaybe<Scalars['Boolean']['input']>;
  mutable_uri?: InputMaybe<Scalars['Boolean']['input']>;
  table_handle_v1?: InputMaybe<Scalars['String']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
  total_minted_v2?: InputMaybe<Scalars['numeric']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Current_Collections_V2_Sum_Fields = {
  __typename?: 'current_collections_v2_sum_fields';
  current_supply?: Maybe<Scalars['numeric']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  max_supply?: Maybe<Scalars['numeric']['output']>;
  total_minted_v2?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Current_Collections_V2_Var_Pop_Fields = {
  __typename?: 'current_collections_v2_var_pop_fields';
  current_supply?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  total_minted_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Current_Collections_V2_Var_Samp_Fields = {
  __typename?: 'current_collections_v2_var_samp_fields';
  current_supply?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  total_minted_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Current_Collections_V2_Variance_Fields = {
  __typename?: 'current_collections_v2_variance_fields';
  current_supply?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  total_minted_v2?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "current_token_datas_v2" */
export type Current_Token_Datas_V2 = {
  __typename?: 'current_token_datas_v2';
  collection_id: Scalars['String']['output'];
  decimals?: Maybe<Scalars['bigint']['output']>;
  description: Scalars['String']['output'];
  is_fungible_v2?: Maybe<Scalars['Boolean']['output']>;
  largest_property_version_v1?: Maybe<Scalars['numeric']['output']>;
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  maximum?: Maybe<Scalars['numeric']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  token_data_id: Scalars['String']['output'];
  token_name: Scalars['String']['output'];
  token_properties: Scalars['jsonb']['output'];
  token_standard: Scalars['String']['output'];
  token_uri: Scalars['String']['output'];
};


/** columns and relationships of "current_token_datas_v2" */
export type Current_Token_Datas_V2Token_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "current_token_datas_v2" */
export type Current_Token_Datas_V2_Aggregate = {
  __typename?: 'current_token_datas_v2_aggregate';
  aggregate?: Maybe<Current_Token_Datas_V2_Aggregate_Fields>;
  nodes: Array<Current_Token_Datas_V2>;
};

/** aggregate fields of "current_token_datas_v2" */
export type Current_Token_Datas_V2_Aggregate_Fields = {
  __typename?: 'current_token_datas_v2_aggregate_fields';
  avg?: Maybe<Current_Token_Datas_V2_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Token_Datas_V2_Max_Fields>;
  min?: Maybe<Current_Token_Datas_V2_Min_Fields>;
  stddev?: Maybe<Current_Token_Datas_V2_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Token_Datas_V2_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Token_Datas_V2_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Token_Datas_V2_Sum_Fields>;
  var_pop?: Maybe<Current_Token_Datas_V2_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Token_Datas_V2_Var_Samp_Fields>;
  variance?: Maybe<Current_Token_Datas_V2_Variance_Fields>;
};


/** aggregate fields of "current_token_datas_v2" */
export type Current_Token_Datas_V2_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Token_Datas_V2_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Current_Token_Datas_V2_Avg_Fields = {
  __typename?: 'current_token_datas_v2_avg_fields';
  decimals?: Maybe<Scalars['Float']['output']>;
  largest_property_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "current_token_datas_v2". All fields are combined with a logical 'AND'. */
export type Current_Token_Datas_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Datas_V2_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Datas_V2_Bool_Exp>>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  decimals?: InputMaybe<Bigint_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  is_fungible_v2?: InputMaybe<Boolean_Comparison_Exp>;
  largest_property_version_v1?: InputMaybe<Numeric_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  maximum?: InputMaybe<Numeric_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  token_data_id?: InputMaybe<String_Comparison_Exp>;
  token_name?: InputMaybe<String_Comparison_Exp>;
  token_properties?: InputMaybe<Jsonb_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
  token_uri?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Token_Datas_V2_Max_Fields = {
  __typename?: 'current_token_datas_v2_max_fields';
  collection_id?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['bigint']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  largest_property_version_v1?: Maybe<Scalars['numeric']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  token_data_id?: Maybe<Scalars['String']['output']>;
  token_name?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
  token_uri?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Current_Token_Datas_V2_Min_Fields = {
  __typename?: 'current_token_datas_v2_min_fields';
  collection_id?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['bigint']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  largest_property_version_v1?: Maybe<Scalars['numeric']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  token_data_id?: Maybe<Scalars['String']['output']>;
  token_name?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
  token_uri?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "current_token_datas_v2". */
export type Current_Token_Datas_V2_Order_By = {
  collection_id?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  is_fungible_v2?: InputMaybe<Order_By>;
  largest_property_version_v1?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  maximum?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_name?: InputMaybe<Order_By>;
  token_properties?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  token_uri?: InputMaybe<Order_By>;
};

/** select columns of table "current_token_datas_v2" */
export enum Current_Token_Datas_V2_Select_Column {
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  Decimals = 'decimals',
  /** column name */
  Description = 'description',
  /** column name */
  IsFungibleV2 = 'is_fungible_v2',
  /** column name */
  LargestPropertyVersionV1 = 'largest_property_version_v1',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  Maximum = 'maximum',
  /** column name */
  Supply = 'supply',
  /** column name */
  TokenDataId = 'token_data_id',
  /** column name */
  TokenName = 'token_name',
  /** column name */
  TokenProperties = 'token_properties',
  /** column name */
  TokenStandard = 'token_standard',
  /** column name */
  TokenUri = 'token_uri'
}

/** aggregate stddev on columns */
export type Current_Token_Datas_V2_Stddev_Fields = {
  __typename?: 'current_token_datas_v2_stddev_fields';
  decimals?: Maybe<Scalars['Float']['output']>;
  largest_property_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Current_Token_Datas_V2_Stddev_Pop_Fields = {
  __typename?: 'current_token_datas_v2_stddev_pop_fields';
  decimals?: Maybe<Scalars['Float']['output']>;
  largest_property_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Current_Token_Datas_V2_Stddev_Samp_Fields = {
  __typename?: 'current_token_datas_v2_stddev_samp_fields';
  decimals?: Maybe<Scalars['Float']['output']>;
  largest_property_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "current_token_datas_v2" */
export type Current_Token_Datas_V2_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Token_Datas_V2_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Token_Datas_V2_Stream_Cursor_Value_Input = {
  collection_id?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['bigint']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  is_fungible_v2?: InputMaybe<Scalars['Boolean']['input']>;
  largest_property_version_v1?: InputMaybe<Scalars['numeric']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  maximum?: InputMaybe<Scalars['numeric']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  token_data_id?: InputMaybe<Scalars['String']['input']>;
  token_name?: InputMaybe<Scalars['String']['input']>;
  token_properties?: InputMaybe<Scalars['jsonb']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
  token_uri?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Current_Token_Datas_V2_Sum_Fields = {
  __typename?: 'current_token_datas_v2_sum_fields';
  decimals?: Maybe<Scalars['bigint']['output']>;
  largest_property_version_v1?: Maybe<Scalars['numeric']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Current_Token_Datas_V2_Var_Pop_Fields = {
  __typename?: 'current_token_datas_v2_var_pop_fields';
  decimals?: Maybe<Scalars['Float']['output']>;
  largest_property_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Current_Token_Datas_V2_Var_Samp_Fields = {
  __typename?: 'current_token_datas_v2_var_samp_fields';
  decimals?: Maybe<Scalars['Float']['output']>;
  largest_property_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Current_Token_Datas_V2_Variance_Fields = {
  __typename?: 'current_token_datas_v2_variance_fields';
  decimals?: Maybe<Scalars['Float']['output']>;
  largest_property_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  maximum?: Maybe<Scalars['Float']['output']>;
  supply?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "current_token_ownerships" */
export type Current_Token_Ownerships = {
  __typename?: 'current_token_ownerships';
  amount: Scalars['numeric']['output'];
  collection_data_id_hash: Scalars['String']['output'];
  collection_name: Scalars['String']['output'];
  creator_address: Scalars['String']['output'];
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  name: Scalars['String']['output'];
  owner_address: Scalars['String']['output'];
  property_version: Scalars['numeric']['output'];
  table_type: Scalars['String']['output'];
  token_data_id_hash: Scalars['String']['output'];
  token_properties: Scalars['jsonb']['output'];
};


/** columns and relationships of "current_token_ownerships" */
export type Current_Token_OwnershipsToken_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "current_token_ownerships" */
export type Current_Token_Ownerships_Aggregate = {
  __typename?: 'current_token_ownerships_aggregate';
  aggregate?: Maybe<Current_Token_Ownerships_Aggregate_Fields>;
  nodes: Array<Current_Token_Ownerships>;
};

/** aggregate fields of "current_token_ownerships" */
export type Current_Token_Ownerships_Aggregate_Fields = {
  __typename?: 'current_token_ownerships_aggregate_fields';
  avg?: Maybe<Current_Token_Ownerships_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Token_Ownerships_Max_Fields>;
  min?: Maybe<Current_Token_Ownerships_Min_Fields>;
  stddev?: Maybe<Current_Token_Ownerships_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Token_Ownerships_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Token_Ownerships_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Token_Ownerships_Sum_Fields>;
  var_pop?: Maybe<Current_Token_Ownerships_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Token_Ownerships_Var_Samp_Fields>;
  variance?: Maybe<Current_Token_Ownerships_Variance_Fields>;
};


/** aggregate fields of "current_token_ownerships" */
export type Current_Token_Ownerships_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Current_Token_Ownerships_Avg_Fields = {
  __typename?: 'current_token_ownerships_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "current_token_ownerships". All fields are combined with a logical 'AND'. */
export type Current_Token_Ownerships_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Ownerships_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Ownerships_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  property_version?: InputMaybe<Numeric_Comparison_Exp>;
  table_type?: InputMaybe<String_Comparison_Exp>;
  token_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  token_properties?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Token_Ownerships_Max_Fields = {
  __typename?: 'current_token_ownerships_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  table_type?: Maybe<Scalars['String']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Current_Token_Ownerships_Min_Fields = {
  __typename?: 'current_token_ownerships_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  table_type?: Maybe<Scalars['String']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "current_token_ownerships". */
export type Current_Token_Ownerships_Order_By = {
  amount?: InputMaybe<Order_By>;
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  table_type?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  token_properties?: InputMaybe<Order_By>;
};

/** select columns of table "current_token_ownerships" */
export enum Current_Token_Ownerships_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  PropertyVersion = 'property_version',
  /** column name */
  TableType = 'table_type',
  /** column name */
  TokenDataIdHash = 'token_data_id_hash',
  /** column name */
  TokenProperties = 'token_properties'
}

/** aggregate stddev on columns */
export type Current_Token_Ownerships_Stddev_Fields = {
  __typename?: 'current_token_ownerships_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Current_Token_Ownerships_Stddev_Pop_Fields = {
  __typename?: 'current_token_ownerships_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Current_Token_Ownerships_Stddev_Samp_Fields = {
  __typename?: 'current_token_ownerships_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "current_token_ownerships" */
export type Current_Token_Ownerships_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Token_Ownerships_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Token_Ownerships_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  property_version?: InputMaybe<Scalars['numeric']['input']>;
  table_type?: InputMaybe<Scalars['String']['input']>;
  token_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  token_properties?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate sum on columns */
export type Current_Token_Ownerships_Sum_Fields = {
  __typename?: 'current_token_ownerships_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
};

/** columns and relationships of "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2 = {
  __typename?: 'current_token_ownerships_v2';
  amount: Scalars['numeric']['output'];
  is_fungible_v2?: Maybe<Scalars['Boolean']['output']>;
  is_soulbound_v2?: Maybe<Scalars['Boolean']['output']>;
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  non_transferrable_by_owner?: Maybe<Scalars['Boolean']['output']>;
  owner_address: Scalars['String']['output'];
  property_version_v1: Scalars['numeric']['output'];
  storage_id: Scalars['String']['output'];
  table_type_v1?: Maybe<Scalars['String']['output']>;
  token_data_id: Scalars['String']['output'];
  token_properties_mutated_v1?: Maybe<Scalars['jsonb']['output']>;
  token_standard: Scalars['String']['output'];
};


/** columns and relationships of "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2Token_Properties_Mutated_V1Args = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Aggregate = {
  __typename?: 'current_token_ownerships_v2_aggregate';
  aggregate?: Maybe<Current_Token_Ownerships_V2_Aggregate_Fields>;
  nodes: Array<Current_Token_Ownerships_V2>;
};

/** aggregate fields of "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Aggregate_Fields = {
  __typename?: 'current_token_ownerships_v2_aggregate_fields';
  avg?: Maybe<Current_Token_Ownerships_V2_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Token_Ownerships_V2_Max_Fields>;
  min?: Maybe<Current_Token_Ownerships_V2_Min_Fields>;
  stddev?: Maybe<Current_Token_Ownerships_V2_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Token_Ownerships_V2_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Token_Ownerships_V2_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Token_Ownerships_V2_Sum_Fields>;
  var_pop?: Maybe<Current_Token_Ownerships_V2_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Token_Ownerships_V2_Var_Samp_Fields>;
  variance?: Maybe<Current_Token_Ownerships_V2_Variance_Fields>;
};


/** aggregate fields of "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Current_Token_Ownerships_V2_Avg_Fields = {
  __typename?: 'current_token_ownerships_v2_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "current_token_ownerships_v2". All fields are combined with a logical 'AND'. */
export type Current_Token_Ownerships_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Ownerships_V2_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Ownerships_V2_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  is_fungible_v2?: InputMaybe<Boolean_Comparison_Exp>;
  is_soulbound_v2?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  non_transferrable_by_owner?: InputMaybe<Boolean_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  property_version_v1?: InputMaybe<Numeric_Comparison_Exp>;
  storage_id?: InputMaybe<String_Comparison_Exp>;
  table_type_v1?: InputMaybe<String_Comparison_Exp>;
  token_data_id?: InputMaybe<String_Comparison_Exp>;
  token_properties_mutated_v1?: InputMaybe<Jsonb_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Token_Ownerships_V2_Max_Fields = {
  __typename?: 'current_token_ownerships_v2_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  property_version_v1?: Maybe<Scalars['numeric']['output']>;
  storage_id?: Maybe<Scalars['String']['output']>;
  table_type_v1?: Maybe<Scalars['String']['output']>;
  token_data_id?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Current_Token_Ownerships_V2_Min_Fields = {
  __typename?: 'current_token_ownerships_v2_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  property_version_v1?: Maybe<Scalars['numeric']['output']>;
  storage_id?: Maybe<Scalars['String']['output']>;
  table_type_v1?: Maybe<Scalars['String']['output']>;
  token_data_id?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "current_token_ownerships_v2". */
export type Current_Token_Ownerships_V2_Order_By = {
  amount?: InputMaybe<Order_By>;
  is_fungible_v2?: InputMaybe<Order_By>;
  is_soulbound_v2?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  non_transferrable_by_owner?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  storage_id?: InputMaybe<Order_By>;
  table_type_v1?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_properties_mutated_v1?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** select columns of table "current_token_ownerships_v2" */
export enum Current_Token_Ownerships_V2_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  IsFungibleV2 = 'is_fungible_v2',
  /** column name */
  IsSoulboundV2 = 'is_soulbound_v2',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  NonTransferrableByOwner = 'non_transferrable_by_owner',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  PropertyVersionV1 = 'property_version_v1',
  /** column name */
  StorageId = 'storage_id',
  /** column name */
  TableTypeV1 = 'table_type_v1',
  /** column name */
  TokenDataId = 'token_data_id',
  /** column name */
  TokenPropertiesMutatedV1 = 'token_properties_mutated_v1',
  /** column name */
  TokenStandard = 'token_standard'
}

/** aggregate stddev on columns */
export type Current_Token_Ownerships_V2_Stddev_Fields = {
  __typename?: 'current_token_ownerships_v2_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Current_Token_Ownerships_V2_Stddev_Pop_Fields = {
  __typename?: 'current_token_ownerships_v2_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Current_Token_Ownerships_V2_Stddev_Samp_Fields = {
  __typename?: 'current_token_ownerships_v2_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Token_Ownerships_V2_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Token_Ownerships_V2_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  is_fungible_v2?: InputMaybe<Scalars['Boolean']['input']>;
  is_soulbound_v2?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  non_transferrable_by_owner?: InputMaybe<Scalars['Boolean']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  property_version_v1?: InputMaybe<Scalars['numeric']['input']>;
  storage_id?: InputMaybe<Scalars['String']['input']>;
  table_type_v1?: InputMaybe<Scalars['String']['input']>;
  token_data_id?: InputMaybe<Scalars['String']['input']>;
  token_properties_mutated_v1?: InputMaybe<Scalars['jsonb']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Current_Token_Ownerships_V2_Sum_Fields = {
  __typename?: 'current_token_ownerships_v2_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  property_version_v1?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Current_Token_Ownerships_V2_Var_Pop_Fields = {
  __typename?: 'current_token_ownerships_v2_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Current_Token_Ownerships_V2_Var_Samp_Fields = {
  __typename?: 'current_token_ownerships_v2_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Current_Token_Ownerships_V2_Variance_Fields = {
  __typename?: 'current_token_ownerships_v2_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_pop on columns */
export type Current_Token_Ownerships_Var_Pop_Fields = {
  __typename?: 'current_token_ownerships_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Current_Token_Ownerships_Var_Samp_Fields = {
  __typename?: 'current_token_ownerships_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Current_Token_Ownerships_Variance_Fields = {
  __typename?: 'current_token_ownerships_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "limit_order_datas" */
export type Limit_Order_Datas = {
  __typename?: 'limit_order_datas';
  expiration: Scalars['numeric']['output'];
  is_increase: Scalars['Boolean']['output'];
  limit_order_id: Scalars['numeric']['output'];
  margin: Scalars['numeric']['output'];
  market_id: Scalars['String']['output'];
  max_price_slippage: Scalars['numeric']['output'];
  owner_addr: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  position_size: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  trigger_payment: Scalars['numeric']['output'];
  trigger_price: Scalars['numeric']['output'];
  triggers_above: Scalars['Boolean']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** aggregated selection of "limit_order_datas" */
export type Limit_Order_Datas_Aggregate = {
  __typename?: 'limit_order_datas_aggregate';
  aggregate?: Maybe<Limit_Order_Datas_Aggregate_Fields>;
  nodes: Array<Limit_Order_Datas>;
};

export type Limit_Order_Datas_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Limit_Order_Datas_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Limit_Order_Datas_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Limit_Order_Datas_Aggregate_Bool_Exp_Count>;
};

export type Limit_Order_Datas_Aggregate_Bool_Exp_Bool_And = {
  arguments: Limit_Order_Datas_Select_Column_Limit_Order_Datas_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Limit_Order_Datas_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Limit_Order_Datas_Select_Column_Limit_Order_Datas_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Limit_Order_Datas_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "limit_order_datas" */
export type Limit_Order_Datas_Aggregate_Fields = {
  __typename?: 'limit_order_datas_aggregate_fields';
  avg?: Maybe<Limit_Order_Datas_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Limit_Order_Datas_Max_Fields>;
  min?: Maybe<Limit_Order_Datas_Min_Fields>;
  stddev?: Maybe<Limit_Order_Datas_Stddev_Fields>;
  stddev_pop?: Maybe<Limit_Order_Datas_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Limit_Order_Datas_Stddev_Samp_Fields>;
  sum?: Maybe<Limit_Order_Datas_Sum_Fields>;
  var_pop?: Maybe<Limit_Order_Datas_Var_Pop_Fields>;
  var_samp?: Maybe<Limit_Order_Datas_Var_Samp_Fields>;
  variance?: Maybe<Limit_Order_Datas_Variance_Fields>;
};


/** aggregate fields of "limit_order_datas" */
export type Limit_Order_Datas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "limit_order_datas" */
export type Limit_Order_Datas_Aggregate_Order_By = {
  avg?: InputMaybe<Limit_Order_Datas_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Limit_Order_Datas_Max_Order_By>;
  min?: InputMaybe<Limit_Order_Datas_Min_Order_By>;
  stddev?: InputMaybe<Limit_Order_Datas_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Limit_Order_Datas_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Limit_Order_Datas_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Limit_Order_Datas_Sum_Order_By>;
  var_pop?: InputMaybe<Limit_Order_Datas_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Limit_Order_Datas_Var_Samp_Order_By>;
  variance?: InputMaybe<Limit_Order_Datas_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Limit_Order_Datas_Avg_Fields = {
  __typename?: 'limit_order_datas_avg_fields';
  expiration?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
  margin?: Maybe<Scalars['Float']['output']>;
  max_price_slippage?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  trigger_payment?: Maybe<Scalars['Float']['output']>;
  trigger_price?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Avg_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "limit_order_datas". All fields are combined with a logical 'AND'. */
export type Limit_Order_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Limit_Order_Datas_Bool_Exp>>;
  _not?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Limit_Order_Datas_Bool_Exp>>;
  expiration?: InputMaybe<Numeric_Comparison_Exp>;
  is_increase?: InputMaybe<Boolean_Comparison_Exp>;
  limit_order_id?: InputMaybe<Numeric_Comparison_Exp>;
  margin?: InputMaybe<Numeric_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  max_price_slippage?: InputMaybe<Numeric_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  position_size?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  trigger_payment?: InputMaybe<Numeric_Comparison_Exp>;
  trigger_price?: InputMaybe<Numeric_Comparison_Exp>;
  triggers_above?: InputMaybe<Boolean_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Limit_Order_Datas_Max_Fields = {
  __typename?: 'limit_order_datas_max_fields';
  expiration?: Maybe<Scalars['numeric']['output']>;
  limit_order_id?: Maybe<Scalars['numeric']['output']>;
  margin?: Maybe<Scalars['numeric']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  max_price_slippage?: Maybe<Scalars['numeric']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  position_size?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  trigger_payment?: Maybe<Scalars['numeric']['output']>;
  trigger_price?: Maybe<Scalars['numeric']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Max_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Limit_Order_Datas_Min_Fields = {
  __typename?: 'limit_order_datas_min_fields';
  expiration?: Maybe<Scalars['numeric']['output']>;
  limit_order_id?: Maybe<Scalars['numeric']['output']>;
  margin?: Maybe<Scalars['numeric']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  max_price_slippage?: Maybe<Scalars['numeric']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  position_size?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  trigger_payment?: Maybe<Scalars['numeric']['output']>;
  trigger_price?: Maybe<Scalars['numeric']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Min_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "limit_order_datas". */
export type Limit_Order_Datas_Order_By = {
  expiration?: InputMaybe<Order_By>;
  is_increase?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  triggers_above?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "limit_order_datas" */
export enum Limit_Order_Datas_Select_Column {
  /** column name */
  Expiration = 'expiration',
  /** column name */
  IsIncrease = 'is_increase',
  /** column name */
  LimitOrderId = 'limit_order_id',
  /** column name */
  Margin = 'margin',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  MaxPriceSlippage = 'max_price_slippage',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  PositionSize = 'position_size',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  TriggerPayment = 'trigger_payment',
  /** column name */
  TriggerPrice = 'trigger_price',
  /** column name */
  TriggersAbove = 'triggers_above',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** select "limit_order_datas_aggregate_bool_exp_bool_and_arguments_columns" columns of table "limit_order_datas" */
export enum Limit_Order_Datas_Select_Column_Limit_Order_Datas_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsIncrease = 'is_increase',
  /** column name */
  TriggersAbove = 'triggers_above'
}

/** select "limit_order_datas_aggregate_bool_exp_bool_or_arguments_columns" columns of table "limit_order_datas" */
export enum Limit_Order_Datas_Select_Column_Limit_Order_Datas_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsIncrease = 'is_increase',
  /** column name */
  TriggersAbove = 'triggers_above'
}

/** aggregate stddev on columns */
export type Limit_Order_Datas_Stddev_Fields = {
  __typename?: 'limit_order_datas_stddev_fields';
  expiration?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
  margin?: Maybe<Scalars['Float']['output']>;
  max_price_slippage?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  trigger_payment?: Maybe<Scalars['Float']['output']>;
  trigger_price?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Stddev_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Limit_Order_Datas_Stddev_Pop_Fields = {
  __typename?: 'limit_order_datas_stddev_pop_fields';
  expiration?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
  margin?: Maybe<Scalars['Float']['output']>;
  max_price_slippage?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  trigger_payment?: Maybe<Scalars['Float']['output']>;
  trigger_price?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Stddev_Pop_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Limit_Order_Datas_Stddev_Samp_Fields = {
  __typename?: 'limit_order_datas_stddev_samp_fields';
  expiration?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
  margin?: Maybe<Scalars['Float']['output']>;
  max_price_slippage?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  trigger_payment?: Maybe<Scalars['Float']['output']>;
  trigger_price?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Stddev_Samp_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

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
  is_increase?: InputMaybe<Scalars['Boolean']['input']>;
  limit_order_id?: InputMaybe<Scalars['numeric']['input']>;
  margin?: InputMaybe<Scalars['numeric']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  max_price_slippage?: InputMaybe<Scalars['numeric']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  position_size?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  trigger_payment?: InputMaybe<Scalars['numeric']['input']>;
  trigger_price?: InputMaybe<Scalars['numeric']['input']>;
  triggers_above?: InputMaybe<Scalars['Boolean']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Limit_Order_Datas_Sum_Fields = {
  __typename?: 'limit_order_datas_sum_fields';
  expiration?: Maybe<Scalars['numeric']['output']>;
  limit_order_id?: Maybe<Scalars['numeric']['output']>;
  margin?: Maybe<Scalars['numeric']['output']>;
  max_price_slippage?: Maybe<Scalars['numeric']['output']>;
  position_size?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  trigger_payment?: Maybe<Scalars['numeric']['output']>;
  trigger_price?: Maybe<Scalars['numeric']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Sum_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Limit_Order_Datas_Var_Pop_Fields = {
  __typename?: 'limit_order_datas_var_pop_fields';
  expiration?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
  margin?: Maybe<Scalars['Float']['output']>;
  max_price_slippage?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  trigger_payment?: Maybe<Scalars['Float']['output']>;
  trigger_price?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Var_Pop_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Limit_Order_Datas_Var_Samp_Fields = {
  __typename?: 'limit_order_datas_var_samp_fields';
  expiration?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
  margin?: Maybe<Scalars['Float']['output']>;
  max_price_slippage?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  trigger_payment?: Maybe<Scalars['Float']['output']>;
  trigger_price?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Var_Samp_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Limit_Order_Datas_Variance_Fields = {
  __typename?: 'limit_order_datas_variance_fields';
  expiration?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
  margin?: Maybe<Scalars['Float']['output']>;
  max_price_slippage?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  trigger_payment?: Maybe<Scalars['Float']['output']>;
  trigger_price?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "limit_order_datas" */
export type Limit_Order_Datas_Variance_Order_By = {
  expiration?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  margin?: InputMaybe<Order_By>;
  max_price_slippage?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment?: InputMaybe<Order_By>;
  trigger_price?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** columns and relationships of "mirage_debt_store_datas" */
export type Mirage_Debt_Store_Datas = {
  __typename?: 'mirage_debt_store_datas';
  asset_type: Scalars['String']['output'];
  debt_base: Scalars['numeric']['output'];
  debt_elastic: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** aggregated selection of "mirage_debt_store_datas" */
export type Mirage_Debt_Store_Datas_Aggregate = {
  __typename?: 'mirage_debt_store_datas_aggregate';
  aggregate?: Maybe<Mirage_Debt_Store_Datas_Aggregate_Fields>;
  nodes: Array<Mirage_Debt_Store_Datas>;
};

/** aggregate fields of "mirage_debt_store_datas" */
export type Mirage_Debt_Store_Datas_Aggregate_Fields = {
  __typename?: 'mirage_debt_store_datas_aggregate_fields';
  avg?: Maybe<Mirage_Debt_Store_Datas_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Mirage_Debt_Store_Datas_Max_Fields>;
  min?: Maybe<Mirage_Debt_Store_Datas_Min_Fields>;
  stddev?: Maybe<Mirage_Debt_Store_Datas_Stddev_Fields>;
  stddev_pop?: Maybe<Mirage_Debt_Store_Datas_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Mirage_Debt_Store_Datas_Stddev_Samp_Fields>;
  sum?: Maybe<Mirage_Debt_Store_Datas_Sum_Fields>;
  var_pop?: Maybe<Mirage_Debt_Store_Datas_Var_Pop_Fields>;
  var_samp?: Maybe<Mirage_Debt_Store_Datas_Var_Samp_Fields>;
  variance?: Maybe<Mirage_Debt_Store_Datas_Variance_Fields>;
};


/** aggregate fields of "mirage_debt_store_datas" */
export type Mirage_Debt_Store_Datas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Mirage_Debt_Store_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Mirage_Debt_Store_Datas_Avg_Fields = {
  __typename?: 'mirage_debt_store_datas_avg_fields';
  debt_base?: Maybe<Scalars['Float']['output']>;
  debt_elastic?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "mirage_debt_store_datas". All fields are combined with a logical 'AND'. */
export type Mirage_Debt_Store_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Mirage_Debt_Store_Datas_Bool_Exp>>;
  _not?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Mirage_Debt_Store_Datas_Bool_Exp>>;
  asset_type?: InputMaybe<String_Comparison_Exp>;
  debt_base?: InputMaybe<Numeric_Comparison_Exp>;
  debt_elastic?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Mirage_Debt_Store_Datas_Max_Fields = {
  __typename?: 'mirage_debt_store_datas_max_fields';
  asset_type?: Maybe<Scalars['String']['output']>;
  debt_base?: Maybe<Scalars['numeric']['output']>;
  debt_elastic?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Mirage_Debt_Store_Datas_Min_Fields = {
  __typename?: 'mirage_debt_store_datas_min_fields';
  asset_type?: Maybe<Scalars['String']['output']>;
  debt_base?: Maybe<Scalars['numeric']['output']>;
  debt_elastic?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "mirage_debt_store_datas". */
export type Mirage_Debt_Store_Datas_Order_By = {
  asset_type?: InputMaybe<Order_By>;
  debt_base?: InputMaybe<Order_By>;
  debt_elastic?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "mirage_debt_store_datas" */
export enum Mirage_Debt_Store_Datas_Select_Column {
  /** column name */
  AssetType = 'asset_type',
  /** column name */
  DebtBase = 'debt_base',
  /** column name */
  DebtElastic = 'debt_elastic',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** aggregate stddev on columns */
export type Mirage_Debt_Store_Datas_Stddev_Fields = {
  __typename?: 'mirage_debt_store_datas_stddev_fields';
  debt_base?: Maybe<Scalars['Float']['output']>;
  debt_elastic?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Mirage_Debt_Store_Datas_Stddev_Pop_Fields = {
  __typename?: 'mirage_debt_store_datas_stddev_pop_fields';
  debt_base?: Maybe<Scalars['Float']['output']>;
  debt_elastic?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Mirage_Debt_Store_Datas_Stddev_Samp_Fields = {
  __typename?: 'mirage_debt_store_datas_stddev_samp_fields';
  debt_base?: Maybe<Scalars['Float']['output']>;
  debt_elastic?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "mirage_debt_store_datas" */
export type Mirage_Debt_Store_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Mirage_Debt_Store_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Mirage_Debt_Store_Datas_Stream_Cursor_Value_Input = {
  asset_type?: InputMaybe<Scalars['String']['input']>;
  debt_base?: InputMaybe<Scalars['numeric']['input']>;
  debt_elastic?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Mirage_Debt_Store_Datas_Sum_Fields = {
  __typename?: 'mirage_debt_store_datas_sum_fields';
  debt_base?: Maybe<Scalars['numeric']['output']>;
  debt_elastic?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Mirage_Debt_Store_Datas_Var_Pop_Fields = {
  __typename?: 'mirage_debt_store_datas_var_pop_fields';
  debt_base?: Maybe<Scalars['Float']['output']>;
  debt_elastic?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Mirage_Debt_Store_Datas_Var_Samp_Fields = {
  __typename?: 'mirage_debt_store_datas_var_samp_fields';
  debt_base?: Maybe<Scalars['Float']['output']>;
  debt_elastic?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Mirage_Debt_Store_Datas_Variance_Fields = {
  __typename?: 'mirage_debt_store_datas_variance_fields';
  debt_base?: Maybe<Scalars['Float']['output']>;
  debt_elastic?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
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

/** columns and relationships of "open_limit_orders" */
export type Open_Limit_Orders = {
  __typename?: 'open_limit_orders';
  last_transaction_version: Scalars['bigint']['output'];
  limit_order_id: Scalars['numeric']['output'];
  market_id: Scalars['String']['output'];
  /** An array relationship */
  open_limit_orders_data: Array<Limit_Order_Datas>;
  /** An aggregate relationship */
  open_limit_orders_data_aggregate: Limit_Order_Datas_Aggregate;
  position_id: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
};


/** columns and relationships of "open_limit_orders" */
export type Open_Limit_OrdersOpen_Limit_Orders_DataArgs = {
  distinct_on?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Limit_Order_Datas_Order_By>>;
  where?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
};


/** columns and relationships of "open_limit_orders" */
export type Open_Limit_OrdersOpen_Limit_Orders_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Limit_Order_Datas_Order_By>>;
  where?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
};

/** aggregated selection of "open_limit_orders" */
export type Open_Limit_Orders_Aggregate = {
  __typename?: 'open_limit_orders_aggregate';
  aggregate?: Maybe<Open_Limit_Orders_Aggregate_Fields>;
  nodes: Array<Open_Limit_Orders>;
};

/** aggregate fields of "open_limit_orders" */
export type Open_Limit_Orders_Aggregate_Fields = {
  __typename?: 'open_limit_orders_aggregate_fields';
  avg?: Maybe<Open_Limit_Orders_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Open_Limit_Orders_Max_Fields>;
  min?: Maybe<Open_Limit_Orders_Min_Fields>;
  stddev?: Maybe<Open_Limit_Orders_Stddev_Fields>;
  stddev_pop?: Maybe<Open_Limit_Orders_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Open_Limit_Orders_Stddev_Samp_Fields>;
  sum?: Maybe<Open_Limit_Orders_Sum_Fields>;
  var_pop?: Maybe<Open_Limit_Orders_Var_Pop_Fields>;
  var_samp?: Maybe<Open_Limit_Orders_Var_Samp_Fields>;
  variance?: Maybe<Open_Limit_Orders_Variance_Fields>;
};


/** aggregate fields of "open_limit_orders" */
export type Open_Limit_Orders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Open_Limit_Orders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Open_Limit_Orders_Avg_Fields = {
  __typename?: 'open_limit_orders_avg_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "open_limit_orders". All fields are combined with a logical 'AND'. */
export type Open_Limit_Orders_Bool_Exp = {
  _and?: InputMaybe<Array<Open_Limit_Orders_Bool_Exp>>;
  _not?: InputMaybe<Open_Limit_Orders_Bool_Exp>;
  _or?: InputMaybe<Array<Open_Limit_Orders_Bool_Exp>>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  limit_order_id?: InputMaybe<Numeric_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  open_limit_orders_data?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
  open_limit_orders_data_aggregate?: InputMaybe<Limit_Order_Datas_Aggregate_Bool_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Open_Limit_Orders_Max_Fields = {
  __typename?: 'open_limit_orders_max_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  limit_order_id?: Maybe<Scalars['numeric']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Open_Limit_Orders_Min_Fields = {
  __typename?: 'open_limit_orders_min_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  limit_order_id?: Maybe<Scalars['numeric']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** Ordering options when selecting data from "open_limit_orders". */
export type Open_Limit_Orders_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  limit_order_id?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  open_limit_orders_data_aggregate?: InputMaybe<Limit_Order_Datas_Aggregate_Order_By>;
  position_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "open_limit_orders" */
export enum Open_Limit_Orders_Select_Column {
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  LimitOrderId = 'limit_order_id',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp'
}

/** aggregate stddev on columns */
export type Open_Limit_Orders_Stddev_Fields = {
  __typename?: 'open_limit_orders_stddev_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Open_Limit_Orders_Stddev_Pop_Fields = {
  __typename?: 'open_limit_orders_stddev_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Open_Limit_Orders_Stddev_Samp_Fields = {
  __typename?: 'open_limit_orders_stddev_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "open_limit_orders" */
export type Open_Limit_Orders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Open_Limit_Orders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Open_Limit_Orders_Stream_Cursor_Value_Input = {
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  limit_order_id?: InputMaybe<Scalars['numeric']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Open_Limit_Orders_Sum_Fields = {
  __typename?: 'open_limit_orders_sum_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  limit_order_id?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Open_Limit_Orders_Var_Pop_Fields = {
  __typename?: 'open_limit_orders_var_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Open_Limit_Orders_Var_Samp_Fields = {
  __typename?: 'open_limit_orders_var_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Open_Limit_Orders_Variance_Fields = {
  __typename?: 'open_limit_orders_variance_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  limit_order_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "open_positions" */
export type Open_Positions = {
  __typename?: 'open_positions';
  last_transaction_version: Scalars['bigint']['output'];
  market_id: Scalars['String']['output'];
  /** An array relationship */
  open_position_datas: Array<Position_Datas>;
  /** An aggregate relationship */
  open_position_datas_aggregate: Position_Datas_Aggregate;
  position_id: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
};


/** columns and relationships of "open_positions" */
export type Open_PositionsOpen_Position_DatasArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


/** columns and relationships of "open_positions" */
export type Open_PositionsOpen_Position_Datas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};

/** aggregated selection of "open_positions" */
export type Open_Positions_Aggregate = {
  __typename?: 'open_positions_aggregate';
  aggregate?: Maybe<Open_Positions_Aggregate_Fields>;
  nodes: Array<Open_Positions>;
};

/** aggregate fields of "open_positions" */
export type Open_Positions_Aggregate_Fields = {
  __typename?: 'open_positions_aggregate_fields';
  avg?: Maybe<Open_Positions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Open_Positions_Max_Fields>;
  min?: Maybe<Open_Positions_Min_Fields>;
  stddev?: Maybe<Open_Positions_Stddev_Fields>;
  stddev_pop?: Maybe<Open_Positions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Open_Positions_Stddev_Samp_Fields>;
  sum?: Maybe<Open_Positions_Sum_Fields>;
  var_pop?: Maybe<Open_Positions_Var_Pop_Fields>;
  var_samp?: Maybe<Open_Positions_Var_Samp_Fields>;
  variance?: Maybe<Open_Positions_Variance_Fields>;
};


/** aggregate fields of "open_positions" */
export type Open_Positions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Open_Positions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Open_Positions_Avg_Fields = {
  __typename?: 'open_positions_avg_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "open_positions". All fields are combined with a logical 'AND'. */
export type Open_Positions_Bool_Exp = {
  _and?: InputMaybe<Array<Open_Positions_Bool_Exp>>;
  _not?: InputMaybe<Open_Positions_Bool_Exp>;
  _or?: InputMaybe<Array<Open_Positions_Bool_Exp>>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  open_position_datas?: InputMaybe<Position_Datas_Bool_Exp>;
  open_position_datas_aggregate?: InputMaybe<Position_Datas_Aggregate_Bool_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Open_Positions_Max_Fields = {
  __typename?: 'open_positions_max_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Open_Positions_Min_Fields = {
  __typename?: 'open_positions_min_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** Ordering options when selecting data from "open_positions". */
export type Open_Positions_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  open_position_datas_aggregate?: InputMaybe<Position_Datas_Aggregate_Order_By>;
  position_id?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "open_positions" */
export enum Open_Positions_Select_Column {
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp'
}

/** aggregate stddev on columns */
export type Open_Positions_Stddev_Fields = {
  __typename?: 'open_positions_stddev_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Open_Positions_Stddev_Pop_Fields = {
  __typename?: 'open_positions_stddev_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Open_Positions_Stddev_Samp_Fields = {
  __typename?: 'open_positions_stddev_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "open_positions" */
export type Open_Positions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Open_Positions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Open_Positions_Stream_Cursor_Value_Input = {
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Open_Positions_Sum_Fields = {
  __typename?: 'open_positions_sum_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Open_Positions_Var_Pop_Fields = {
  __typename?: 'open_positions_var_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Open_Positions_Var_Samp_Fields = {
  __typename?: 'open_positions_var_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Open_Positions_Variance_Fields = {
  __typename?: 'open_positions_variance_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "open_tpsls" */
export type Open_Tpsls = {
  __typename?: 'open_tpsls';
  last_transaction_version: Scalars['bigint']['output'];
  market_id: Scalars['String']['output'];
  /** An object relationship */
  position_data?: Maybe<Position_Datas>;
  position_id: Scalars['String']['output'];
  /** An object relationship */
  tpsl_data?: Maybe<Tpsl_Datas>;
  transaction_timestamp: Scalars['timestamp']['output'];
};

/** aggregated selection of "open_tpsls" */
export type Open_Tpsls_Aggregate = {
  __typename?: 'open_tpsls_aggregate';
  aggregate?: Maybe<Open_Tpsls_Aggregate_Fields>;
  nodes: Array<Open_Tpsls>;
};

/** aggregate fields of "open_tpsls" */
export type Open_Tpsls_Aggregate_Fields = {
  __typename?: 'open_tpsls_aggregate_fields';
  avg?: Maybe<Open_Tpsls_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Open_Tpsls_Max_Fields>;
  min?: Maybe<Open_Tpsls_Min_Fields>;
  stddev?: Maybe<Open_Tpsls_Stddev_Fields>;
  stddev_pop?: Maybe<Open_Tpsls_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Open_Tpsls_Stddev_Samp_Fields>;
  sum?: Maybe<Open_Tpsls_Sum_Fields>;
  var_pop?: Maybe<Open_Tpsls_Var_Pop_Fields>;
  var_samp?: Maybe<Open_Tpsls_Var_Samp_Fields>;
  variance?: Maybe<Open_Tpsls_Variance_Fields>;
};


/** aggregate fields of "open_tpsls" */
export type Open_Tpsls_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Open_Tpsls_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Open_Tpsls_Avg_Fields = {
  __typename?: 'open_tpsls_avg_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "open_tpsls". All fields are combined with a logical 'AND'. */
export type Open_Tpsls_Bool_Exp = {
  _and?: InputMaybe<Array<Open_Tpsls_Bool_Exp>>;
  _not?: InputMaybe<Open_Tpsls_Bool_Exp>;
  _or?: InputMaybe<Array<Open_Tpsls_Bool_Exp>>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  position_data?: InputMaybe<Position_Datas_Bool_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  tpsl_data?: InputMaybe<Tpsl_Datas_Bool_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Open_Tpsls_Max_Fields = {
  __typename?: 'open_tpsls_max_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Open_Tpsls_Min_Fields = {
  __typename?: 'open_tpsls_min_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
};

/** Ordering options when selecting data from "open_tpsls". */
export type Open_Tpsls_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  position_data?: InputMaybe<Position_Datas_Order_By>;
  position_id?: InputMaybe<Order_By>;
  tpsl_data?: InputMaybe<Tpsl_Datas_Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "open_tpsls" */
export enum Open_Tpsls_Select_Column {
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp'
}

/** aggregate stddev on columns */
export type Open_Tpsls_Stddev_Fields = {
  __typename?: 'open_tpsls_stddev_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Open_Tpsls_Stddev_Pop_Fields = {
  __typename?: 'open_tpsls_stddev_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Open_Tpsls_Stddev_Samp_Fields = {
  __typename?: 'open_tpsls_stddev_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "open_tpsls" */
export type Open_Tpsls_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Open_Tpsls_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Open_Tpsls_Stream_Cursor_Value_Input = {
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Open_Tpsls_Sum_Fields = {
  __typename?: 'open_tpsls_sum_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Open_Tpsls_Var_Pop_Fields = {
  __typename?: 'open_tpsls_var_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Open_Tpsls_Var_Samp_Fields = {
  __typename?: 'open_tpsls_var_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Open_Tpsls_Variance_Fields = {
  __typename?: 'open_tpsls_variance_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
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

/** columns and relationships of "owner_trades" */
export type Owner_Trades = {
  __typename?: 'owner_trades';
  owner_addr?: Maybe<Scalars['String']['output']>;
  profit?: Maybe<Scalars['numeric']['output']>;
  rank?: Maybe<Scalars['bigint']['output']>;
  total_fee?: Maybe<Scalars['numeric']['output']>;
  total_pnl?: Maybe<Scalars['numeric']['output']>;
  trade_count?: Maybe<Scalars['bigint']['output']>;
  volume?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "owner_trades" */
export type Owner_Trades_Aggregate = {
  __typename?: 'owner_trades_aggregate';
  aggregate?: Maybe<Owner_Trades_Aggregate_Fields>;
  nodes: Array<Owner_Trades>;
};

/** aggregate fields of "owner_trades" */
export type Owner_Trades_Aggregate_Fields = {
  __typename?: 'owner_trades_aggregate_fields';
  avg?: Maybe<Owner_Trades_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Owner_Trades_Max_Fields>;
  min?: Maybe<Owner_Trades_Min_Fields>;
  stddev?: Maybe<Owner_Trades_Stddev_Fields>;
  stddev_pop?: Maybe<Owner_Trades_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Owner_Trades_Stddev_Samp_Fields>;
  sum?: Maybe<Owner_Trades_Sum_Fields>;
  var_pop?: Maybe<Owner_Trades_Var_Pop_Fields>;
  var_samp?: Maybe<Owner_Trades_Var_Samp_Fields>;
  variance?: Maybe<Owner_Trades_Variance_Fields>;
};


/** aggregate fields of "owner_trades" */
export type Owner_Trades_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Owner_Trades_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Owner_Trades_Avg_Fields = {
  __typename?: 'owner_trades_avg_fields';
  profit?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_fee?: Maybe<Scalars['Float']['output']>;
  total_pnl?: Maybe<Scalars['Float']['output']>;
  trade_count?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "owner_trades". All fields are combined with a logical 'AND'. */
export type Owner_Trades_Bool_Exp = {
  _and?: InputMaybe<Array<Owner_Trades_Bool_Exp>>;
  _not?: InputMaybe<Owner_Trades_Bool_Exp>;
  _or?: InputMaybe<Array<Owner_Trades_Bool_Exp>>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  profit?: InputMaybe<Numeric_Comparison_Exp>;
  rank?: InputMaybe<Bigint_Comparison_Exp>;
  total_fee?: InputMaybe<Numeric_Comparison_Exp>;
  total_pnl?: InputMaybe<Numeric_Comparison_Exp>;
  trade_count?: InputMaybe<Bigint_Comparison_Exp>;
  volume?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Owner_Trades_Max_Fields = {
  __typename?: 'owner_trades_max_fields';
  owner_addr?: Maybe<Scalars['String']['output']>;
  profit?: Maybe<Scalars['numeric']['output']>;
  rank?: Maybe<Scalars['bigint']['output']>;
  total_fee?: Maybe<Scalars['numeric']['output']>;
  total_pnl?: Maybe<Scalars['numeric']['output']>;
  trade_count?: Maybe<Scalars['bigint']['output']>;
  volume?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Owner_Trades_Min_Fields = {
  __typename?: 'owner_trades_min_fields';
  owner_addr?: Maybe<Scalars['String']['output']>;
  profit?: Maybe<Scalars['numeric']['output']>;
  rank?: Maybe<Scalars['bigint']['output']>;
  total_fee?: Maybe<Scalars['numeric']['output']>;
  total_pnl?: Maybe<Scalars['numeric']['output']>;
  trade_count?: Maybe<Scalars['bigint']['output']>;
  volume?: Maybe<Scalars['numeric']['output']>;
};

/** Ordering options when selecting data from "owner_trades". */
export type Owner_Trades_Order_By = {
  owner_addr?: InputMaybe<Order_By>;
  profit?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  total_fee?: InputMaybe<Order_By>;
  total_pnl?: InputMaybe<Order_By>;
  trade_count?: InputMaybe<Order_By>;
  volume?: InputMaybe<Order_By>;
};

/** select columns of table "owner_trades" */
export enum Owner_Trades_Select_Column {
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  Profit = 'profit',
  /** column name */
  Rank = 'rank',
  /** column name */
  TotalFee = 'total_fee',
  /** column name */
  TotalPnl = 'total_pnl',
  /** column name */
  TradeCount = 'trade_count',
  /** column name */
  Volume = 'volume'
}

/** aggregate stddev on columns */
export type Owner_Trades_Stddev_Fields = {
  __typename?: 'owner_trades_stddev_fields';
  profit?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_fee?: Maybe<Scalars['Float']['output']>;
  total_pnl?: Maybe<Scalars['Float']['output']>;
  trade_count?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Owner_Trades_Stddev_Pop_Fields = {
  __typename?: 'owner_trades_stddev_pop_fields';
  profit?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_fee?: Maybe<Scalars['Float']['output']>;
  total_pnl?: Maybe<Scalars['Float']['output']>;
  trade_count?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Owner_Trades_Stddev_Samp_Fields = {
  __typename?: 'owner_trades_stddev_samp_fields';
  profit?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_fee?: Maybe<Scalars['Float']['output']>;
  total_pnl?: Maybe<Scalars['Float']['output']>;
  trade_count?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "owner_trades" */
export type Owner_Trades_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Owner_Trades_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Owner_Trades_Stream_Cursor_Value_Input = {
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  profit?: InputMaybe<Scalars['numeric']['input']>;
  rank?: InputMaybe<Scalars['bigint']['input']>;
  total_fee?: InputMaybe<Scalars['numeric']['input']>;
  total_pnl?: InputMaybe<Scalars['numeric']['input']>;
  trade_count?: InputMaybe<Scalars['bigint']['input']>;
  volume?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Owner_Trades_Sum_Fields = {
  __typename?: 'owner_trades_sum_fields';
  profit?: Maybe<Scalars['numeric']['output']>;
  rank?: Maybe<Scalars['bigint']['output']>;
  total_fee?: Maybe<Scalars['numeric']['output']>;
  total_pnl?: Maybe<Scalars['numeric']['output']>;
  trade_count?: Maybe<Scalars['bigint']['output']>;
  volume?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Owner_Trades_Var_Pop_Fields = {
  __typename?: 'owner_trades_var_pop_fields';
  profit?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_fee?: Maybe<Scalars['Float']['output']>;
  total_pnl?: Maybe<Scalars['Float']['output']>;
  trade_count?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Owner_Trades_Var_Samp_Fields = {
  __typename?: 'owner_trades_var_samp_fields';
  profit?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_fee?: Maybe<Scalars['Float']['output']>;
  total_pnl?: Maybe<Scalars['Float']['output']>;
  trade_count?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Owner_Trades_Variance_Fields = {
  __typename?: 'owner_trades_variance_fields';
  profit?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  total_fee?: Maybe<Scalars['Float']['output']>;
  total_pnl?: Maybe<Scalars['Float']['output']>;
  trade_count?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "position_datas" */
export type Position_Datas = {
  __typename?: 'position_datas';
  is_long: Scalars['Boolean']['output'];
  last_funding_accumulated: Scalars['numeric']['output'];
  margin_amount: Scalars['numeric']['output'];
  market_id: Scalars['String']['output'];
  opening_price: Scalars['numeric']['output'];
  owner_addr: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  position_size: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** aggregated selection of "position_datas" */
export type Position_Datas_Aggregate = {
  __typename?: 'position_datas_aggregate';
  aggregate?: Maybe<Position_Datas_Aggregate_Fields>;
  nodes: Array<Position_Datas>;
};

export type Position_Datas_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Position_Datas_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Position_Datas_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Position_Datas_Aggregate_Bool_Exp_Count>;
};

export type Position_Datas_Aggregate_Bool_Exp_Bool_And = {
  arguments: Position_Datas_Select_Column_Position_Datas_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Position_Datas_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Position_Datas_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Position_Datas_Select_Column_Position_Datas_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Position_Datas_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Position_Datas_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Position_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Position_Datas_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "position_datas" */
export type Position_Datas_Aggregate_Fields = {
  __typename?: 'position_datas_aggregate_fields';
  avg?: Maybe<Position_Datas_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Position_Datas_Max_Fields>;
  min?: Maybe<Position_Datas_Min_Fields>;
  stddev?: Maybe<Position_Datas_Stddev_Fields>;
  stddev_pop?: Maybe<Position_Datas_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Position_Datas_Stddev_Samp_Fields>;
  sum?: Maybe<Position_Datas_Sum_Fields>;
  var_pop?: Maybe<Position_Datas_Var_Pop_Fields>;
  var_samp?: Maybe<Position_Datas_Var_Samp_Fields>;
  variance?: Maybe<Position_Datas_Variance_Fields>;
};


/** aggregate fields of "position_datas" */
export type Position_Datas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Position_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "position_datas" */
export type Position_Datas_Aggregate_Order_By = {
  avg?: InputMaybe<Position_Datas_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Position_Datas_Max_Order_By>;
  min?: InputMaybe<Position_Datas_Min_Order_By>;
  stddev?: InputMaybe<Position_Datas_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Position_Datas_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Position_Datas_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Position_Datas_Sum_Order_By>;
  var_pop?: InputMaybe<Position_Datas_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Position_Datas_Var_Samp_Order_By>;
  variance?: InputMaybe<Position_Datas_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Position_Datas_Avg_Fields = {
  __typename?: 'position_datas_avg_fields';
  last_funding_accumulated?: Maybe<Scalars['Float']['output']>;
  margin_amount?: Maybe<Scalars['Float']['output']>;
  opening_price?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "position_datas" */
export type Position_Datas_Avg_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "position_datas". All fields are combined with a logical 'AND'. */
export type Position_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Position_Datas_Bool_Exp>>;
  _not?: InputMaybe<Position_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Position_Datas_Bool_Exp>>;
  is_long?: InputMaybe<Boolean_Comparison_Exp>;
  last_funding_accumulated?: InputMaybe<Numeric_Comparison_Exp>;
  margin_amount?: InputMaybe<Numeric_Comparison_Exp>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  opening_price?: InputMaybe<Numeric_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  position_size?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Position_Datas_Max_Fields = {
  __typename?: 'position_datas_max_fields';
  last_funding_accumulated?: Maybe<Scalars['numeric']['output']>;
  margin_amount?: Maybe<Scalars['numeric']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  opening_price?: Maybe<Scalars['numeric']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  position_size?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "position_datas" */
export type Position_Datas_Max_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Position_Datas_Min_Fields = {
  __typename?: 'position_datas_min_fields';
  last_funding_accumulated?: Maybe<Scalars['numeric']['output']>;
  margin_amount?: Maybe<Scalars['numeric']['output']>;
  market_id?: Maybe<Scalars['String']['output']>;
  opening_price?: Maybe<Scalars['numeric']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  position_id?: Maybe<Scalars['String']['output']>;
  position_size?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "position_datas" */
export type Position_Datas_Min_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "position_datas". */
export type Position_Datas_Order_By = {
  is_long?: InputMaybe<Order_By>;
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "position_datas" */
export enum Position_Datas_Select_Column {
  /** column name */
  IsLong = 'is_long',
  /** column name */
  LastFundingAccumulated = 'last_funding_accumulated',
  /** column name */
  MarginAmount = 'margin_amount',
  /** column name */
  MarketId = 'market_id',
  /** column name */
  OpeningPrice = 'opening_price',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  PositionSize = 'position_size',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** select "position_datas_aggregate_bool_exp_bool_and_arguments_columns" columns of table "position_datas" */
export enum Position_Datas_Select_Column_Position_Datas_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsLong = 'is_long'
}

/** select "position_datas_aggregate_bool_exp_bool_or_arguments_columns" columns of table "position_datas" */
export enum Position_Datas_Select_Column_Position_Datas_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsLong = 'is_long'
}

/** aggregate stddev on columns */
export type Position_Datas_Stddev_Fields = {
  __typename?: 'position_datas_stddev_fields';
  last_funding_accumulated?: Maybe<Scalars['Float']['output']>;
  margin_amount?: Maybe<Scalars['Float']['output']>;
  opening_price?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "position_datas" */
export type Position_Datas_Stddev_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Position_Datas_Stddev_Pop_Fields = {
  __typename?: 'position_datas_stddev_pop_fields';
  last_funding_accumulated?: Maybe<Scalars['Float']['output']>;
  margin_amount?: Maybe<Scalars['Float']['output']>;
  opening_price?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "position_datas" */
export type Position_Datas_Stddev_Pop_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Position_Datas_Stddev_Samp_Fields = {
  __typename?: 'position_datas_stddev_samp_fields';
  last_funding_accumulated?: Maybe<Scalars['Float']['output']>;
  margin_amount?: Maybe<Scalars['Float']['output']>;
  opening_price?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "position_datas" */
export type Position_Datas_Stddev_Samp_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "position_datas" */
export type Position_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Position_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Position_Datas_Stream_Cursor_Value_Input = {
  is_long?: InputMaybe<Scalars['Boolean']['input']>;
  last_funding_accumulated?: InputMaybe<Scalars['numeric']['input']>;
  margin_amount?: InputMaybe<Scalars['numeric']['input']>;
  market_id?: InputMaybe<Scalars['String']['input']>;
  opening_price?: InputMaybe<Scalars['numeric']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  position_size?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Position_Datas_Sum_Fields = {
  __typename?: 'position_datas_sum_fields';
  last_funding_accumulated?: Maybe<Scalars['numeric']['output']>;
  margin_amount?: Maybe<Scalars['numeric']['output']>;
  opening_price?: Maybe<Scalars['numeric']['output']>;
  position_size?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "position_datas" */
export type Position_Datas_Sum_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Position_Datas_Var_Pop_Fields = {
  __typename?: 'position_datas_var_pop_fields';
  last_funding_accumulated?: Maybe<Scalars['Float']['output']>;
  margin_amount?: Maybe<Scalars['Float']['output']>;
  opening_price?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "position_datas" */
export type Position_Datas_Var_Pop_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Position_Datas_Var_Samp_Fields = {
  __typename?: 'position_datas_var_samp_fields';
  last_funding_accumulated?: Maybe<Scalars['Float']['output']>;
  margin_amount?: Maybe<Scalars['Float']['output']>;
  opening_price?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "position_datas" */
export type Position_Datas_Var_Samp_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Position_Datas_Variance_Fields = {
  __typename?: 'position_datas_variance_fields';
  last_funding_accumulated?: Maybe<Scalars['Float']['output']>;
  margin_amount?: Maybe<Scalars['Float']['output']>;
  opening_price?: Maybe<Scalars['Float']['output']>;
  position_size?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "position_datas" */
export type Position_Datas_Variance_Order_By = {
  last_funding_accumulated?: InputMaybe<Order_By>;
  margin_amount?: InputMaybe<Order_By>;
  opening_price?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "closed_positions" */
  closed_positions: Array<Closed_Positions>;
  /** fetch data from the table: "closed_positions" using primary key columns */
  closed_positions_by_pk?: Maybe<Closed_Positions>;
  /** fetch data from the table: "current_collection_datas" */
  current_collection_datas: Array<Current_Collection_Datas>;
  /** fetch aggregated fields from the table: "current_collection_datas" */
  current_collection_datas_aggregate: Current_Collection_Datas_Aggregate;
  /** fetch data from the table: "current_collection_datas" using primary key columns */
  current_collection_datas_by_pk?: Maybe<Current_Collection_Datas>;
  /** fetch data from the table: "current_collections_v2" */
  current_collections_v2: Array<Current_Collections_V2>;
  /** fetch aggregated fields from the table: "current_collections_v2" */
  current_collections_v2_aggregate: Current_Collections_V2_Aggregate;
  /** fetch data from the table: "current_collections_v2" using primary key columns */
  current_collections_v2_by_pk?: Maybe<Current_Collections_V2>;
  /** fetch data from the table: "current_token_datas_v2" */
  current_token_datas_v2: Array<Current_Token_Datas_V2>;
  /** fetch aggregated fields from the table: "current_token_datas_v2" */
  current_token_datas_v2_aggregate: Current_Token_Datas_V2_Aggregate;
  /** fetch data from the table: "current_token_datas_v2" using primary key columns */
  current_token_datas_v2_by_pk?: Maybe<Current_Token_Datas_V2>;
  /** fetch data from the table: "current_token_ownerships" */
  current_token_ownerships: Array<Current_Token_Ownerships>;
  /** fetch aggregated fields from the table: "current_token_ownerships" */
  current_token_ownerships_aggregate: Current_Token_Ownerships_Aggregate;
  /** fetch data from the table: "current_token_ownerships" using primary key columns */
  current_token_ownerships_by_pk?: Maybe<Current_Token_Ownerships>;
  /** fetch data from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2: Array<Current_Token_Ownerships_V2>;
  /** fetch aggregated fields from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2_aggregate: Current_Token_Ownerships_V2_Aggregate;
  /** fetch data from the table: "current_token_ownerships_v2" using primary key columns */
  current_token_ownerships_v2_by_pk?: Maybe<Current_Token_Ownerships_V2>;
  /** fetch data from the table: "limit_order_datas" */
  limit_order_datas: Array<Limit_Order_Datas>;
  /** fetch aggregated fields from the table: "limit_order_datas" */
  limit_order_datas_aggregate: Limit_Order_Datas_Aggregate;
  /** fetch data from the table: "limit_order_datas" using primary key columns */
  limit_order_datas_by_pk?: Maybe<Limit_Order_Datas>;
  /** fetch data from the table: "mirage_debt_store_datas" */
  mirage_debt_store_datas: Array<Mirage_Debt_Store_Datas>;
  /** fetch aggregated fields from the table: "mirage_debt_store_datas" */
  mirage_debt_store_datas_aggregate: Mirage_Debt_Store_Datas_Aggregate;
  /** fetch data from the table: "mirage_debt_store_datas" using primary key columns */
  mirage_debt_store_datas_by_pk?: Maybe<Mirage_Debt_Store_Datas>;
  /** fetch data from the table: "open_limit_orders" */
  open_limit_orders: Array<Open_Limit_Orders>;
  /** fetch aggregated fields from the table: "open_limit_orders" */
  open_limit_orders_aggregate: Open_Limit_Orders_Aggregate;
  /** fetch data from the table: "open_limit_orders" using primary key columns */
  open_limit_orders_by_pk?: Maybe<Open_Limit_Orders>;
  /** fetch data from the table: "open_positions" */
  open_positions: Array<Open_Positions>;
  /** fetch aggregated fields from the table: "open_positions" */
  open_positions_aggregate: Open_Positions_Aggregate;
  /** fetch data from the table: "open_positions" using primary key columns */
  open_positions_by_pk?: Maybe<Open_Positions>;
  /** fetch data from the table: "open_tpsls" */
  open_tpsls: Array<Open_Tpsls>;
  /** fetch aggregated fields from the table: "open_tpsls" */
  open_tpsls_aggregate: Open_Tpsls_Aggregate;
  /** fetch data from the table: "open_tpsls" using primary key columns */
  open_tpsls_by_pk?: Maybe<Open_Tpsls>;
  /** fetch data from the table: "owner_trades" */
  owner_trades: Array<Owner_Trades>;
  /** fetch aggregated fields from the table: "owner_trades" */
  owner_trades_aggregate: Owner_Trades_Aggregate;
  /** fetch data from the table: "position_datas" */
  position_datas: Array<Position_Datas>;
  /** fetch aggregated fields from the table: "position_datas" */
  position_datas_aggregate: Position_Datas_Aggregate;
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
  /** fetch aggregated fields from the table: "vault_datas" */
  vault_datas_aggregate: Vault_Datas_Aggregate;
  /** fetch data from the table: "vault_datas" using primary key columns */
  vault_datas_by_pk?: Maybe<Vault_Datas>;
};


export type Query_RootClosed_PositionsArgs = {
  distinct_on?: InputMaybe<Array<Closed_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Closed_Positions_Order_By>>;
  where?: InputMaybe<Closed_Positions_Bool_Exp>;
};


export type Query_RootClosed_Positions_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Query_RootCurrent_Collection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Datas_Order_By>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Query_RootCurrent_Collection_Datas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Datas_Order_By>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Query_RootCurrent_Collection_Datas_By_PkArgs = {
  collection_data_id_hash: Scalars['String']['input'];
};


export type Query_RootCurrent_Collections_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Collections_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collections_V2_Order_By>>;
  where?: InputMaybe<Current_Collections_V2_Bool_Exp>;
};


export type Query_RootCurrent_Collections_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Collections_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collections_V2_Order_By>>;
  where?: InputMaybe<Current_Collections_V2_Bool_Exp>;
};


export type Query_RootCurrent_Collections_V2_By_PkArgs = {
  collection_id: Scalars['String']['input'];
};


export type Query_RootCurrent_Token_Datas_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Token_Datas_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Datas_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
};


export type Query_RootCurrent_Token_Datas_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Datas_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Datas_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
};


export type Query_RootCurrent_Token_Datas_V2_By_PkArgs = {
  token_data_id: Scalars['String']['input'];
};


export type Query_RootCurrent_Token_OwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
};


export type Query_RootCurrent_Token_Ownerships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
};


export type Query_RootCurrent_Token_Ownerships_By_PkArgs = {
  owner_address: Scalars['String']['input'];
  property_version: Scalars['numeric']['input'];
  token_data_id_hash: Scalars['String']['input'];
};


export type Query_RootCurrent_Token_Ownerships_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


export type Query_RootCurrent_Token_Ownerships_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


export type Query_RootCurrent_Token_Ownerships_V2_By_PkArgs = {
  owner_address: Scalars['String']['input'];
  property_version_v1: Scalars['numeric']['input'];
  storage_id: Scalars['String']['input'];
  token_data_id: Scalars['String']['input'];
};


export type Query_RootLimit_Order_DatasArgs = {
  distinct_on?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Limit_Order_Datas_Order_By>>;
  where?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
};


export type Query_RootLimit_Order_Datas_AggregateArgs = {
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


export type Query_RootMirage_Debt_Store_DatasArgs = {
  distinct_on?: InputMaybe<Array<Mirage_Debt_Store_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mirage_Debt_Store_Datas_Order_By>>;
  where?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
};


export type Query_RootMirage_Debt_Store_Datas_AggregateArgs = {
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


export type Query_RootOpen_Limit_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Open_Limit_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Limit_Orders_Order_By>>;
  where?: InputMaybe<Open_Limit_Orders_Bool_Exp>;
};


export type Query_RootOpen_Limit_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Open_Limit_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Limit_Orders_Order_By>>;
  where?: InputMaybe<Open_Limit_Orders_Bool_Exp>;
};


export type Query_RootOpen_Limit_Orders_By_PkArgs = {
  limit_order_id: Scalars['numeric']['input'];
  position_id: Scalars['String']['input'];
};


export type Query_RootOpen_PositionsArgs = {
  distinct_on?: InputMaybe<Array<Open_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Positions_Order_By>>;
  where?: InputMaybe<Open_Positions_Bool_Exp>;
};


export type Query_RootOpen_Positions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Open_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Positions_Order_By>>;
  where?: InputMaybe<Open_Positions_Bool_Exp>;
};


export type Query_RootOpen_Positions_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Query_RootOpen_TpslsArgs = {
  distinct_on?: InputMaybe<Array<Open_Tpsls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Tpsls_Order_By>>;
  where?: InputMaybe<Open_Tpsls_Bool_Exp>;
};


export type Query_RootOpen_Tpsls_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Open_Tpsls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Tpsls_Order_By>>;
  where?: InputMaybe<Open_Tpsls_Bool_Exp>;
};


export type Query_RootOpen_Tpsls_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Query_RootOwner_TradesArgs = {
  distinct_on?: InputMaybe<Array<Owner_Trades_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Owner_Trades_Order_By>>;
  where?: InputMaybe<Owner_Trades_Bool_Exp>;
};


export type Query_RootOwner_Trades_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Owner_Trades_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Owner_Trades_Order_By>>;
  where?: InputMaybe<Owner_Trades_Bool_Exp>;
};


export type Query_RootPosition_DatasArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


export type Query_RootPosition_Datas_AggregateArgs = {
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


export type Query_RootVault_Datas_AggregateArgs = {
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
  /** fetch data from the table: "closed_positions" */
  closed_positions: Array<Closed_Positions>;
  /** fetch data from the table: "closed_positions" using primary key columns */
  closed_positions_by_pk?: Maybe<Closed_Positions>;
  /** fetch data from the table in a streaming manner: "closed_positions" */
  closed_positions_stream: Array<Closed_Positions>;
  /** fetch data from the table: "current_collection_datas" */
  current_collection_datas: Array<Current_Collection_Datas>;
  /** fetch aggregated fields from the table: "current_collection_datas" */
  current_collection_datas_aggregate: Current_Collection_Datas_Aggregate;
  /** fetch data from the table: "current_collection_datas" using primary key columns */
  current_collection_datas_by_pk?: Maybe<Current_Collection_Datas>;
  /** fetch data from the table in a streaming manner: "current_collection_datas" */
  current_collection_datas_stream: Array<Current_Collection_Datas>;
  /** fetch data from the table: "current_collections_v2" */
  current_collections_v2: Array<Current_Collections_V2>;
  /** fetch aggregated fields from the table: "current_collections_v2" */
  current_collections_v2_aggregate: Current_Collections_V2_Aggregate;
  /** fetch data from the table: "current_collections_v2" using primary key columns */
  current_collections_v2_by_pk?: Maybe<Current_Collections_V2>;
  /** fetch data from the table in a streaming manner: "current_collections_v2" */
  current_collections_v2_stream: Array<Current_Collections_V2>;
  /** fetch data from the table: "current_token_datas_v2" */
  current_token_datas_v2: Array<Current_Token_Datas_V2>;
  /** fetch aggregated fields from the table: "current_token_datas_v2" */
  current_token_datas_v2_aggregate: Current_Token_Datas_V2_Aggregate;
  /** fetch data from the table: "current_token_datas_v2" using primary key columns */
  current_token_datas_v2_by_pk?: Maybe<Current_Token_Datas_V2>;
  /** fetch data from the table in a streaming manner: "current_token_datas_v2" */
  current_token_datas_v2_stream: Array<Current_Token_Datas_V2>;
  /** fetch data from the table: "current_token_ownerships" */
  current_token_ownerships: Array<Current_Token_Ownerships>;
  /** fetch aggregated fields from the table: "current_token_ownerships" */
  current_token_ownerships_aggregate: Current_Token_Ownerships_Aggregate;
  /** fetch data from the table: "current_token_ownerships" using primary key columns */
  current_token_ownerships_by_pk?: Maybe<Current_Token_Ownerships>;
  /** fetch data from the table in a streaming manner: "current_token_ownerships" */
  current_token_ownerships_stream: Array<Current_Token_Ownerships>;
  /** fetch data from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2: Array<Current_Token_Ownerships_V2>;
  /** fetch aggregated fields from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2_aggregate: Current_Token_Ownerships_V2_Aggregate;
  /** fetch data from the table: "current_token_ownerships_v2" using primary key columns */
  current_token_ownerships_v2_by_pk?: Maybe<Current_Token_Ownerships_V2>;
  /** fetch data from the table in a streaming manner: "current_token_ownerships_v2" */
  current_token_ownerships_v2_stream: Array<Current_Token_Ownerships_V2>;
  /** fetch data from the table: "limit_order_datas" */
  limit_order_datas: Array<Limit_Order_Datas>;
  /** fetch aggregated fields from the table: "limit_order_datas" */
  limit_order_datas_aggregate: Limit_Order_Datas_Aggregate;
  /** fetch data from the table: "limit_order_datas" using primary key columns */
  limit_order_datas_by_pk?: Maybe<Limit_Order_Datas>;
  /** fetch data from the table in a streaming manner: "limit_order_datas" */
  limit_order_datas_stream: Array<Limit_Order_Datas>;
  /** fetch data from the table: "mirage_debt_store_datas" */
  mirage_debt_store_datas: Array<Mirage_Debt_Store_Datas>;
  /** fetch aggregated fields from the table: "mirage_debt_store_datas" */
  mirage_debt_store_datas_aggregate: Mirage_Debt_Store_Datas_Aggregate;
  /** fetch data from the table: "mirage_debt_store_datas" using primary key columns */
  mirage_debt_store_datas_by_pk?: Maybe<Mirage_Debt_Store_Datas>;
  /** fetch data from the table in a streaming manner: "mirage_debt_store_datas" */
  mirage_debt_store_datas_stream: Array<Mirage_Debt_Store_Datas>;
  /** fetch data from the table: "open_limit_orders" */
  open_limit_orders: Array<Open_Limit_Orders>;
  /** fetch aggregated fields from the table: "open_limit_orders" */
  open_limit_orders_aggregate: Open_Limit_Orders_Aggregate;
  /** fetch data from the table: "open_limit_orders" using primary key columns */
  open_limit_orders_by_pk?: Maybe<Open_Limit_Orders>;
  /** fetch data from the table in a streaming manner: "open_limit_orders" */
  open_limit_orders_stream: Array<Open_Limit_Orders>;
  /** fetch data from the table: "open_positions" */
  open_positions: Array<Open_Positions>;
  /** fetch aggregated fields from the table: "open_positions" */
  open_positions_aggregate: Open_Positions_Aggregate;
  /** fetch data from the table: "open_positions" using primary key columns */
  open_positions_by_pk?: Maybe<Open_Positions>;
  /** fetch data from the table in a streaming manner: "open_positions" */
  open_positions_stream: Array<Open_Positions>;
  /** fetch data from the table: "open_tpsls" */
  open_tpsls: Array<Open_Tpsls>;
  /** fetch aggregated fields from the table: "open_tpsls" */
  open_tpsls_aggregate: Open_Tpsls_Aggregate;
  /** fetch data from the table: "open_tpsls" using primary key columns */
  open_tpsls_by_pk?: Maybe<Open_Tpsls>;
  /** fetch data from the table in a streaming manner: "open_tpsls" */
  open_tpsls_stream: Array<Open_Tpsls>;
  /** fetch data from the table: "owner_trades" */
  owner_trades: Array<Owner_Trades>;
  /** fetch aggregated fields from the table: "owner_trades" */
  owner_trades_aggregate: Owner_Trades_Aggregate;
  /** fetch data from the table in a streaming manner: "owner_trades" */
  owner_trades_stream: Array<Owner_Trades>;
  /** fetch data from the table: "position_datas" */
  position_datas: Array<Position_Datas>;
  /** fetch aggregated fields from the table: "position_datas" */
  position_datas_aggregate: Position_Datas_Aggregate;
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
  /** fetch aggregated fields from the table: "vault_datas" */
  vault_datas_aggregate: Vault_Datas_Aggregate;
  /** fetch data from the table: "vault_datas" using primary key columns */
  vault_datas_by_pk?: Maybe<Vault_Datas>;
  /** fetch data from the table in a streaming manner: "vault_datas" */
  vault_datas_stream: Array<Vault_Datas>;
};


export type Subscription_RootClosed_PositionsArgs = {
  distinct_on?: InputMaybe<Array<Closed_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Closed_Positions_Order_By>>;
  where?: InputMaybe<Closed_Positions_Bool_Exp>;
};


export type Subscription_RootClosed_Positions_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Subscription_RootClosed_Positions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Closed_Positions_Stream_Cursor_Input>>;
  where?: InputMaybe<Closed_Positions_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Datas_Order_By>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_Datas_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Datas_Order_By>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_Datas_By_PkArgs = {
  collection_data_id_hash: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Collection_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Collection_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Collections_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Collections_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collections_V2_Order_By>>;
  where?: InputMaybe<Current_Collections_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Collections_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Collections_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collections_V2_Order_By>>;
  where?: InputMaybe<Current_Collections_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Collections_V2_By_PkArgs = {
  collection_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Collections_V2_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Collections_V2_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Collections_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Datas_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Token_Datas_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Datas_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Datas_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Datas_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Datas_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Datas_V2_By_PkArgs = {
  token_data_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Token_Datas_V2_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Token_Datas_V2_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_OwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Ownerships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Ownerships_By_PkArgs = {
  owner_address: Scalars['String']['input'];
  property_version: Scalars['numeric']['input'];
  token_data_id_hash: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Token_Ownerships_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Token_Ownerships_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Ownerships_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Ownerships_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Ownerships_V2_By_PkArgs = {
  owner_address: Scalars['String']['input'];
  property_version_v1: Scalars['numeric']['input'];
  storage_id: Scalars['String']['input'];
  token_data_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Token_Ownerships_V2_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Token_Ownerships_V2_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


export type Subscription_RootLimit_Order_DatasArgs = {
  distinct_on?: InputMaybe<Array<Limit_Order_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Limit_Order_Datas_Order_By>>;
  where?: InputMaybe<Limit_Order_Datas_Bool_Exp>;
};


export type Subscription_RootLimit_Order_Datas_AggregateArgs = {
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


export type Subscription_RootMirage_Debt_Store_DatasArgs = {
  distinct_on?: InputMaybe<Array<Mirage_Debt_Store_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Mirage_Debt_Store_Datas_Order_By>>;
  where?: InputMaybe<Mirage_Debt_Store_Datas_Bool_Exp>;
};


export type Subscription_RootMirage_Debt_Store_Datas_AggregateArgs = {
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


export type Subscription_RootOpen_Limit_OrdersArgs = {
  distinct_on?: InputMaybe<Array<Open_Limit_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Limit_Orders_Order_By>>;
  where?: InputMaybe<Open_Limit_Orders_Bool_Exp>;
};


export type Subscription_RootOpen_Limit_Orders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Open_Limit_Orders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Limit_Orders_Order_By>>;
  where?: InputMaybe<Open_Limit_Orders_Bool_Exp>;
};


export type Subscription_RootOpen_Limit_Orders_By_PkArgs = {
  limit_order_id: Scalars['numeric']['input'];
  position_id: Scalars['String']['input'];
};


export type Subscription_RootOpen_Limit_Orders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Open_Limit_Orders_Stream_Cursor_Input>>;
  where?: InputMaybe<Open_Limit_Orders_Bool_Exp>;
};


export type Subscription_RootOpen_PositionsArgs = {
  distinct_on?: InputMaybe<Array<Open_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Positions_Order_By>>;
  where?: InputMaybe<Open_Positions_Bool_Exp>;
};


export type Subscription_RootOpen_Positions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Open_Positions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Positions_Order_By>>;
  where?: InputMaybe<Open_Positions_Bool_Exp>;
};


export type Subscription_RootOpen_Positions_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Subscription_RootOpen_Positions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Open_Positions_Stream_Cursor_Input>>;
  where?: InputMaybe<Open_Positions_Bool_Exp>;
};


export type Subscription_RootOpen_TpslsArgs = {
  distinct_on?: InputMaybe<Array<Open_Tpsls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Tpsls_Order_By>>;
  where?: InputMaybe<Open_Tpsls_Bool_Exp>;
};


export type Subscription_RootOpen_Tpsls_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Open_Tpsls_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Open_Tpsls_Order_By>>;
  where?: InputMaybe<Open_Tpsls_Bool_Exp>;
};


export type Subscription_RootOpen_Tpsls_By_PkArgs = {
  position_id: Scalars['String']['input'];
};


export type Subscription_RootOpen_Tpsls_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Open_Tpsls_Stream_Cursor_Input>>;
  where?: InputMaybe<Open_Tpsls_Bool_Exp>;
};


export type Subscription_RootOwner_TradesArgs = {
  distinct_on?: InputMaybe<Array<Owner_Trades_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Owner_Trades_Order_By>>;
  where?: InputMaybe<Owner_Trades_Bool_Exp>;
};


export type Subscription_RootOwner_Trades_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Owner_Trades_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Owner_Trades_Order_By>>;
  where?: InputMaybe<Owner_Trades_Bool_Exp>;
};


export type Subscription_RootOwner_Trades_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Owner_Trades_Stream_Cursor_Input>>;
  where?: InputMaybe<Owner_Trades_Bool_Exp>;
};


export type Subscription_RootPosition_DatasArgs = {
  distinct_on?: InputMaybe<Array<Position_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Position_Datas_Order_By>>;
  where?: InputMaybe<Position_Datas_Bool_Exp>;
};


export type Subscription_RootPosition_Datas_AggregateArgs = {
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


export type Subscription_RootVault_Datas_AggregateArgs = {
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
  market_id: Scalars['String']['output'];
  owner_addr: Scalars['String']['output'];
  position_id: Scalars['String']['output'];
  stop_loss_price: Scalars['numeric']['output'];
  take_profit_price: Scalars['numeric']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  trigger_payment_amount: Scalars['numeric']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "tpsl_datas". All fields are combined with a logical 'AND'. */
export type Tpsl_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Tpsl_Datas_Bool_Exp>>;
  _not?: InputMaybe<Tpsl_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Tpsl_Datas_Bool_Exp>>;
  market_id?: InputMaybe<String_Comparison_Exp>;
  owner_addr?: InputMaybe<String_Comparison_Exp>;
  position_id?: InputMaybe<String_Comparison_Exp>;
  stop_loss_price?: InputMaybe<Numeric_Comparison_Exp>;
  take_profit_price?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  trigger_payment_amount?: InputMaybe<Numeric_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "tpsl_datas". */
export type Tpsl_Datas_Order_By = {
  market_id?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  stop_loss_price?: InputMaybe<Order_By>;
  take_profit_price?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  trigger_payment_amount?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "tpsl_datas" */
export enum Tpsl_Datas_Select_Column {
  /** column name */
  MarketId = 'market_id',
  /** column name */
  OwnerAddr = 'owner_addr',
  /** column name */
  PositionId = 'position_id',
  /** column name */
  StopLossPrice = 'stop_loss_price',
  /** column name */
  TakeProfitPrice = 'take_profit_price',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  TriggerPaymentAmount = 'trigger_payment_amount',
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
  market_id?: InputMaybe<Scalars['String']['input']>;
  owner_addr?: InputMaybe<Scalars['String']['input']>;
  position_id?: InputMaybe<Scalars['String']['input']>;
  stop_loss_price?: InputMaybe<Scalars['numeric']['input']>;
  take_profit_price?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  trigger_payment_amount?: InputMaybe<Scalars['numeric']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "trade_datas" */
export type Trade_Datas = {
  __typename?: 'trade_datas';
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

/** order by aggregate values of table "trade_datas" */
export type Trade_Datas_Aggregate_Order_By = {
  avg?: InputMaybe<Trade_Datas_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Trade_Datas_Max_Order_By>;
  min?: InputMaybe<Trade_Datas_Min_Order_By>;
  stddev?: InputMaybe<Trade_Datas_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Trade_Datas_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Trade_Datas_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Trade_Datas_Sum_Order_By>;
  var_pop?: InputMaybe<Trade_Datas_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Trade_Datas_Var_Samp_Order_By>;
  variance?: InputMaybe<Trade_Datas_Variance_Order_By>;
};

/** order by avg() on columns of table "trade_datas" */
export type Trade_Datas_Avg_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "trade_datas". All fields are combined with a logical 'AND'. */
export type Trade_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Trade_Datas_Bool_Exp>>;
  _not?: InputMaybe<Trade_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Trade_Datas_Bool_Exp>>;
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

/** order by max() on columns of table "trade_datas" */
export type Trade_Datas_Max_Order_By = {
  fee?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "trade_datas" */
export type Trade_Datas_Min_Order_By = {
  fee?: InputMaybe<Order_By>;
  market_id?: InputMaybe<Order_By>;
  owner_addr?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_id?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "trade_datas". */
export type Trade_Datas_Order_By = {
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

/** order by stddev() on columns of table "trade_datas" */
export type Trade_Datas_Stddev_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "trade_datas" */
export type Trade_Datas_Stddev_Pop_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "trade_datas" */
export type Trade_Datas_Stddev_Samp_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "trade_datas" */
export type Trade_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Trade_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Trade_Datas_Stream_Cursor_Value_Input = {
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

/** order by sum() on columns of table "trade_datas" */
export type Trade_Datas_Sum_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "trade_datas" */
export type Trade_Datas_Var_Pop_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "trade_datas" */
export type Trade_Datas_Var_Samp_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "trade_datas" */
export type Trade_Datas_Variance_Order_By = {
  fee?: InputMaybe<Order_By>;
  pnl?: InputMaybe<Order_By>;
  position_size?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "vault_collection_configs" */
export type Vault_Collection_Configs = {
  __typename?: 'vault_collection_configs';
  borrow_fee: Scalars['numeric']['output'];
  borrow_token_id: Scalars['String']['output'];
  collateral_token_id: Scalars['String']['output'];
  collection_id: Scalars['String']['output'];
  interest_per_second: Scalars['numeric']['output'];
  liquidation_collateralization_rate: Scalars['numeric']['output'];
  liquidation_multiplier: Scalars['numeric']['output'];
  maintenance_collateralization_rate: Scalars['numeric']['output'];
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
  interest_per_second?: InputMaybe<Numeric_Comparison_Exp>;
  liquidation_collateralization_rate?: InputMaybe<Numeric_Comparison_Exp>;
  liquidation_multiplier?: InputMaybe<Numeric_Comparison_Exp>;
  maintenance_collateralization_rate?: InputMaybe<Numeric_Comparison_Exp>;
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
  interest_per_second?: InputMaybe<Order_By>;
  liquidation_collateralization_rate?: InputMaybe<Order_By>;
  liquidation_multiplier?: InputMaybe<Order_By>;
  maintenance_collateralization_rate?: InputMaybe<Order_By>;
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
  InterestPerSecond = 'interest_per_second',
  /** column name */
  LiquidationCollateralizationRate = 'liquidation_collateralization_rate',
  /** column name */
  LiquidationMultiplier = 'liquidation_multiplier',
  /** column name */
  MaintenanceCollateralizationRate = 'maintenance_collateralization_rate',
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
  interest_per_second?: InputMaybe<Scalars['numeric']['input']>;
  liquidation_collateralization_rate?: InputMaybe<Scalars['numeric']['input']>;
  liquidation_multiplier?: InputMaybe<Scalars['numeric']['input']>;
  maintenance_collateralization_rate?: InputMaybe<Scalars['numeric']['input']>;
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

/** aggregated selection of "vault_datas" */
export type Vault_Datas_Aggregate = {
  __typename?: 'vault_datas_aggregate';
  aggregate?: Maybe<Vault_Datas_Aggregate_Fields>;
  nodes: Array<Vault_Datas>;
};

/** aggregate fields of "vault_datas" */
export type Vault_Datas_Aggregate_Fields = {
  __typename?: 'vault_datas_aggregate_fields';
  avg?: Maybe<Vault_Datas_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Vault_Datas_Max_Fields>;
  min?: Maybe<Vault_Datas_Min_Fields>;
  stddev?: Maybe<Vault_Datas_Stddev_Fields>;
  stddev_pop?: Maybe<Vault_Datas_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vault_Datas_Stddev_Samp_Fields>;
  sum?: Maybe<Vault_Datas_Sum_Fields>;
  var_pop?: Maybe<Vault_Datas_Var_Pop_Fields>;
  var_samp?: Maybe<Vault_Datas_Var_Samp_Fields>;
  variance?: Maybe<Vault_Datas_Variance_Fields>;
};


/** aggregate fields of "vault_datas" */
export type Vault_Datas_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vault_Datas_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Vault_Datas_Avg_Fields = {
  __typename?: 'vault_datas_avg_fields';
  borrow_part?: Maybe<Scalars['Float']['output']>;
  collateral_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
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

/** aggregate max on columns */
export type Vault_Datas_Max_Fields = {
  __typename?: 'vault_datas_max_fields';
  borrow_part?: Maybe<Scalars['numeric']['output']>;
  collateral_amount?: Maybe<Scalars['numeric']['output']>;
  collection_id?: Maybe<Scalars['String']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  vault_id?: Maybe<Scalars['String']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Vault_Datas_Min_Fields = {
  __typename?: 'vault_datas_min_fields';
  borrow_part?: Maybe<Scalars['numeric']['output']>;
  collateral_amount?: Maybe<Scalars['numeric']['output']>;
  collection_id?: Maybe<Scalars['String']['output']>;
  owner_addr?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  vault_id?: Maybe<Scalars['String']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
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

/** aggregate stddev on columns */
export type Vault_Datas_Stddev_Fields = {
  __typename?: 'vault_datas_stddev_fields';
  borrow_part?: Maybe<Scalars['Float']['output']>;
  collateral_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Vault_Datas_Stddev_Pop_Fields = {
  __typename?: 'vault_datas_stddev_pop_fields';
  borrow_part?: Maybe<Scalars['Float']['output']>;
  collateral_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Vault_Datas_Stddev_Samp_Fields = {
  __typename?: 'vault_datas_stddev_samp_fields';
  borrow_part?: Maybe<Scalars['Float']['output']>;
  collateral_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

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

/** aggregate sum on columns */
export type Vault_Datas_Sum_Fields = {
  __typename?: 'vault_datas_sum_fields';
  borrow_part?: Maybe<Scalars['numeric']['output']>;
  collateral_amount?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  write_set_change_index?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Vault_Datas_Var_Pop_Fields = {
  __typename?: 'vault_datas_var_pop_fields';
  borrow_part?: Maybe<Scalars['Float']['output']>;
  collateral_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Vault_Datas_Var_Samp_Fields = {
  __typename?: 'vault_datas_var_samp_fields';
  borrow_part?: Maybe<Scalars['Float']['output']>;
  collateral_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Vault_Datas_Variance_Fields = {
  __typename?: 'vault_datas_variance_fields';
  borrow_part?: Maybe<Scalars['Float']['output']>;
  collateral_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
  write_set_change_index?: Maybe<Scalars['Float']['output']>;
};

export type GetVaultCollectionAprQueryVariables = Exact<{
  prevDebtTimestamp: Scalars['timestamp']['input'];
  collectionId: Scalars['String']['input'];
}>;


export type GetVaultCollectionAprQuery = { __typename?: 'query_root', prevDebt: Array<{ __typename?: 'vault_collection_datas', transactionTimestamp: any, transactionVersion: any, borrowBase: any, borrowElastic: any, globalDebt?: { __typename?: 'mirage_debt_store_datas', debtBase: any, debtElastic: any, assetType: string } | null }>, currentDebt: Array<{ __typename?: 'vault_collection_datas', transactionTimestamp: any, transactionVersion: any, borrowBase: any, borrowElastic: any, globalDebt?: { __typename?: 'mirage_debt_store_datas', debtBase: any, debtElastic: any, assetType: string } | null }> };


export const GetVaultCollectionAprDocument = gql`
    query GetVaultCollectionAPR($prevDebtTimestamp: timestamp!, $collectionId: String!) {
  prevDebt: vault_collection_datas(
    order_by: {transaction_version: asc}
    where: {_and: {collection_id: {_eq: $collectionId}, transaction_timestamp: {_gte: $prevDebtTimestamp}, global_debt_part: {_gt: 0}}}
    limit: 1
  ) {
    transactionTimestamp: transaction_timestamp
    transactionVersion: transaction_version
    borrowBase: borrow_base
    borrowElastic: borrow_elastic
    globalDebt: vault_collection_debt_store_datas {
      debtBase: debt_base
      debtElastic: debt_elastic
      assetType: asset_type
    }
  }
  currentDebt: vault_collection_datas(
    order_by: {transaction_version: desc}
    where: {collection_id: {_eq: $collectionId}}
    limit: 1
  ) {
    transactionTimestamp: transaction_timestamp
    transactionVersion: transaction_version
    borrowBase: borrow_base
    borrowElastic: borrow_elastic
    globalDebt: vault_collection_debt_store_datas {
      debtBase: debt_base
      debtElastic: debt_elastic
      assetType: asset_type
    }
  }
}
    `;

export function useGetVaultCollectionAprQuery(options: Omit<Urql.UseQueryArgs<GetVaultCollectionAprQueryVariables>, 'query'>) {
  return Urql.useQuery<GetVaultCollectionAprQuery, GetVaultCollectionAprQueryVariables>({ query: GetVaultCollectionAprDocument, ...options });
};