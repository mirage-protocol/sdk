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

/** columns and relationships of "account_transactions" */
export type Account_Transactions = {
  __typename?: 'account_transactions';
  account_address: Scalars['String']['output'];
  /** An array relationship */
  coin_activities: Array<Coin_Activities>;
  /** An aggregate relationship */
  coin_activities_aggregate: Coin_Activities_Aggregate;
  /** An array relationship */
  delegated_staking_activities: Array<Delegated_Staking_Activities>;
  /** An array relationship */
  fungible_asset_activities: Array<Fungible_Asset_Activities>;
  /** An array relationship */
  token_activities: Array<Token_Activities>;
  /** An aggregate relationship */
  token_activities_aggregate: Token_Activities_Aggregate;
  /** An array relationship */
  token_activities_v2: Array<Token_Activities_V2>;
  /** An aggregate relationship */
  token_activities_v2_aggregate: Token_Activities_V2_Aggregate;
  transaction_version: Scalars['bigint']['output'];
  /** An object relationship */
  user_transaction?: Maybe<User_Transactions>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsCoin_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsCoin_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsDelegated_Staking_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Activities_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsFungible_Asset_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Fungible_Asset_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fungible_Asset_Activities_Order_By>>;
  where?: InputMaybe<Fungible_Asset_Activities_Bool_Exp>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsToken_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsToken_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsToken_Activities_V2Args = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


/** columns and relationships of "account_transactions" */
export type Account_TransactionsToken_Activities_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};

/** aggregated selection of "account_transactions" */
export type Account_Transactions_Aggregate = {
  __typename?: 'account_transactions_aggregate';
  aggregate?: Maybe<Account_Transactions_Aggregate_Fields>;
  nodes: Array<Account_Transactions>;
};

/** aggregate fields of "account_transactions" */
export type Account_Transactions_Aggregate_Fields = {
  __typename?: 'account_transactions_aggregate_fields';
  avg?: Maybe<Account_Transactions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Account_Transactions_Max_Fields>;
  min?: Maybe<Account_Transactions_Min_Fields>;
  stddev?: Maybe<Account_Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Transactions_Sum_Fields>;
  var_pop?: Maybe<Account_Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Transactions_Var_Samp_Fields>;
  variance?: Maybe<Account_Transactions_Variance_Fields>;
};


/** aggregate fields of "account_transactions" */
export type Account_Transactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Account_Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Account_Transactions_Avg_Fields = {
  __typename?: 'account_transactions_avg_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "account_transactions". All fields are combined with a logical 'AND'. */
export type Account_Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<Account_Transactions_Bool_Exp>>;
  _not?: InputMaybe<Account_Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Account_Transactions_Bool_Exp>>;
  account_address?: InputMaybe<String_Comparison_Exp>;
  coin_activities?: InputMaybe<Coin_Activities_Bool_Exp>;
  coin_activities_aggregate?: InputMaybe<Coin_Activities_Aggregate_Bool_Exp>;
  delegated_staking_activities?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
  fungible_asset_activities?: InputMaybe<Fungible_Asset_Activities_Bool_Exp>;
  token_activities?: InputMaybe<Token_Activities_Bool_Exp>;
  token_activities_aggregate?: InputMaybe<Token_Activities_Aggregate_Bool_Exp>;
  token_activities_v2?: InputMaybe<Token_Activities_V2_Bool_Exp>;
  token_activities_v2_aggregate?: InputMaybe<Token_Activities_V2_Aggregate_Bool_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  user_transaction?: InputMaybe<User_Transactions_Bool_Exp>;
};

/** aggregate max on columns */
export type Account_Transactions_Max_Fields = {
  __typename?: 'account_transactions_max_fields';
  account_address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Account_Transactions_Min_Fields = {
  __typename?: 'account_transactions_min_fields';
  account_address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "account_transactions". */
export type Account_Transactions_Order_By = {
  account_address?: InputMaybe<Order_By>;
  coin_activities_aggregate?: InputMaybe<Coin_Activities_Aggregate_Order_By>;
  delegated_staking_activities_aggregate?: InputMaybe<Delegated_Staking_Activities_Aggregate_Order_By>;
  fungible_asset_activities_aggregate?: InputMaybe<Fungible_Asset_Activities_Aggregate_Order_By>;
  token_activities_aggregate?: InputMaybe<Token_Activities_Aggregate_Order_By>;
  token_activities_v2_aggregate?: InputMaybe<Token_Activities_V2_Aggregate_Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  user_transaction?: InputMaybe<User_Transactions_Order_By>;
};

/** select columns of table "account_transactions" */
export enum Account_Transactions_Select_Column {
  /** column name */
  AccountAddress = 'account_address',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** aggregate stddev on columns */
export type Account_Transactions_Stddev_Fields = {
  __typename?: 'account_transactions_stddev_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Account_Transactions_Stddev_Pop_Fields = {
  __typename?: 'account_transactions_stddev_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Account_Transactions_Stddev_Samp_Fields = {
  __typename?: 'account_transactions_stddev_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "account_transactions" */
export type Account_Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Account_Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Account_Transactions_Stream_Cursor_Value_Input = {
  account_address?: InputMaybe<Scalars['String']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Account_Transactions_Sum_Fields = {
  __typename?: 'account_transactions_sum_fields';
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Account_Transactions_Var_Pop_Fields = {
  __typename?: 'account_transactions_var_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Account_Transactions_Var_Samp_Fields = {
  __typename?: 'account_transactions_var_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Account_Transactions_Variance_Fields = {
  __typename?: 'account_transactions_variance_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "address_events_summary" */
export type Address_Events_Summary = {
  __typename?: 'address_events_summary';
  account_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  block_metadata?: Maybe<Block_Metadata_Transactions>;
  min_block_height?: Maybe<Scalars['bigint']['output']>;
  num_distinct_versions?: Maybe<Scalars['bigint']['output']>;
};

/** Boolean expression to filter rows from the table "address_events_summary". All fields are combined with a logical 'AND'. */
export type Address_Events_Summary_Bool_Exp = {
  _and?: InputMaybe<Array<Address_Events_Summary_Bool_Exp>>;
  _not?: InputMaybe<Address_Events_Summary_Bool_Exp>;
  _or?: InputMaybe<Array<Address_Events_Summary_Bool_Exp>>;
  account_address?: InputMaybe<String_Comparison_Exp>;
  block_metadata?: InputMaybe<Block_Metadata_Transactions_Bool_Exp>;
  min_block_height?: InputMaybe<Bigint_Comparison_Exp>;
  num_distinct_versions?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "address_events_summary". */
export type Address_Events_Summary_Order_By = {
  account_address?: InputMaybe<Order_By>;
  block_metadata?: InputMaybe<Block_Metadata_Transactions_Order_By>;
  min_block_height?: InputMaybe<Order_By>;
  num_distinct_versions?: InputMaybe<Order_By>;
};

/** select columns of table "address_events_summary" */
export enum Address_Events_Summary_Select_Column {
  /** column name */
  AccountAddress = 'account_address',
  /** column name */
  MinBlockHeight = 'min_block_height',
  /** column name */
  NumDistinctVersions = 'num_distinct_versions'
}

/** Streaming cursor of the table "address_events_summary" */
export type Address_Events_Summary_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Address_Events_Summary_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Address_Events_Summary_Stream_Cursor_Value_Input = {
  account_address?: InputMaybe<Scalars['String']['input']>;
  min_block_height?: InputMaybe<Scalars['bigint']['input']>;
  num_distinct_versions?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_Events = {
  __typename?: 'address_version_from_events';
  account_address?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  coin_activities: Array<Coin_Activities>;
  /** An aggregate relationship */
  coin_activities_aggregate: Coin_Activities_Aggregate;
  /** An array relationship */
  delegated_staking_activities: Array<Delegated_Staking_Activities>;
  /** An array relationship */
  token_activities: Array<Token_Activities>;
  /** An aggregate relationship */
  token_activities_aggregate: Token_Activities_Aggregate;
  /** An array relationship */
  token_activities_v2: Array<Token_Activities_V2>;
  /** An aggregate relationship */
  token_activities_v2_aggregate: Token_Activities_V2_Aggregate;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};


/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_EventsCoin_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_EventsCoin_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_EventsDelegated_Staking_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Activities_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
};


/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_EventsToken_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_EventsToken_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_EventsToken_Activities_V2Args = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


/** columns and relationships of "address_version_from_events" */
export type Address_Version_From_EventsToken_Activities_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};

/** aggregated selection of "address_version_from_events" */
export type Address_Version_From_Events_Aggregate = {
  __typename?: 'address_version_from_events_aggregate';
  aggregate?: Maybe<Address_Version_From_Events_Aggregate_Fields>;
  nodes: Array<Address_Version_From_Events>;
};

/** aggregate fields of "address_version_from_events" */
export type Address_Version_From_Events_Aggregate_Fields = {
  __typename?: 'address_version_from_events_aggregate_fields';
  avg?: Maybe<Address_Version_From_Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Address_Version_From_Events_Max_Fields>;
  min?: Maybe<Address_Version_From_Events_Min_Fields>;
  stddev?: Maybe<Address_Version_From_Events_Stddev_Fields>;
  stddev_pop?: Maybe<Address_Version_From_Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Address_Version_From_Events_Stddev_Samp_Fields>;
  sum?: Maybe<Address_Version_From_Events_Sum_Fields>;
  var_pop?: Maybe<Address_Version_From_Events_Var_Pop_Fields>;
  var_samp?: Maybe<Address_Version_From_Events_Var_Samp_Fields>;
  variance?: Maybe<Address_Version_From_Events_Variance_Fields>;
};


/** aggregate fields of "address_version_from_events" */
export type Address_Version_From_Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Address_Version_From_Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Address_Version_From_Events_Avg_Fields = {
  __typename?: 'address_version_from_events_avg_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "address_version_from_events". All fields are combined with a logical 'AND'. */
export type Address_Version_From_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Address_Version_From_Events_Bool_Exp>>;
  _not?: InputMaybe<Address_Version_From_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Address_Version_From_Events_Bool_Exp>>;
  account_address?: InputMaybe<String_Comparison_Exp>;
  coin_activities?: InputMaybe<Coin_Activities_Bool_Exp>;
  coin_activities_aggregate?: InputMaybe<Coin_Activities_Aggregate_Bool_Exp>;
  delegated_staking_activities?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
  token_activities?: InputMaybe<Token_Activities_Bool_Exp>;
  token_activities_aggregate?: InputMaybe<Token_Activities_Aggregate_Bool_Exp>;
  token_activities_v2?: InputMaybe<Token_Activities_V2_Bool_Exp>;
  token_activities_v2_aggregate?: InputMaybe<Token_Activities_V2_Aggregate_Bool_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Address_Version_From_Events_Max_Fields = {
  __typename?: 'address_version_from_events_max_fields';
  account_address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Address_Version_From_Events_Min_Fields = {
  __typename?: 'address_version_from_events_min_fields';
  account_address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "address_version_from_events". */
export type Address_Version_From_Events_Order_By = {
  account_address?: InputMaybe<Order_By>;
  coin_activities_aggregate?: InputMaybe<Coin_Activities_Aggregate_Order_By>;
  delegated_staking_activities_aggregate?: InputMaybe<Delegated_Staking_Activities_Aggregate_Order_By>;
  token_activities_aggregate?: InputMaybe<Token_Activities_Aggregate_Order_By>;
  token_activities_v2_aggregate?: InputMaybe<Token_Activities_V2_Aggregate_Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "address_version_from_events" */
export enum Address_Version_From_Events_Select_Column {
  /** column name */
  AccountAddress = 'account_address',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** aggregate stddev on columns */
export type Address_Version_From_Events_Stddev_Fields = {
  __typename?: 'address_version_from_events_stddev_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Address_Version_From_Events_Stddev_Pop_Fields = {
  __typename?: 'address_version_from_events_stddev_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Address_Version_From_Events_Stddev_Samp_Fields = {
  __typename?: 'address_version_from_events_stddev_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "address_version_from_events" */
export type Address_Version_From_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Address_Version_From_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Address_Version_From_Events_Stream_Cursor_Value_Input = {
  account_address?: InputMaybe<Scalars['String']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Address_Version_From_Events_Sum_Fields = {
  __typename?: 'address_version_from_events_sum_fields';
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Address_Version_From_Events_Var_Pop_Fields = {
  __typename?: 'address_version_from_events_var_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Address_Version_From_Events_Var_Samp_Fields = {
  __typename?: 'address_version_from_events_var_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Address_Version_From_Events_Variance_Fields = {
  __typename?: 'address_version_from_events_variance_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_Resources = {
  __typename?: 'address_version_from_move_resources';
  address?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  coin_activities: Array<Coin_Activities>;
  /** An aggregate relationship */
  coin_activities_aggregate: Coin_Activities_Aggregate;
  /** An array relationship */
  delegated_staking_activities: Array<Delegated_Staking_Activities>;
  /** An array relationship */
  token_activities: Array<Token_Activities>;
  /** An aggregate relationship */
  token_activities_aggregate: Token_Activities_Aggregate;
  /** An array relationship */
  token_activities_v2: Array<Token_Activities_V2>;
  /** An aggregate relationship */
  token_activities_v2_aggregate: Token_Activities_V2_Aggregate;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};


/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_ResourcesCoin_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_ResourcesCoin_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_ResourcesDelegated_Staking_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Activities_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_ResourcesToken_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_ResourcesToken_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_ResourcesToken_Activities_V2Args = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_ResourcesToken_Activities_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};

/** aggregated selection of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_Resources_Aggregate = {
  __typename?: 'address_version_from_move_resources_aggregate';
  aggregate?: Maybe<Address_Version_From_Move_Resources_Aggregate_Fields>;
  nodes: Array<Address_Version_From_Move_Resources>;
};

/** aggregate fields of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_Resources_Aggregate_Fields = {
  __typename?: 'address_version_from_move_resources_aggregate_fields';
  avg?: Maybe<Address_Version_From_Move_Resources_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Address_Version_From_Move_Resources_Max_Fields>;
  min?: Maybe<Address_Version_From_Move_Resources_Min_Fields>;
  stddev?: Maybe<Address_Version_From_Move_Resources_Stddev_Fields>;
  stddev_pop?: Maybe<Address_Version_From_Move_Resources_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Address_Version_From_Move_Resources_Stddev_Samp_Fields>;
  sum?: Maybe<Address_Version_From_Move_Resources_Sum_Fields>;
  var_pop?: Maybe<Address_Version_From_Move_Resources_Var_Pop_Fields>;
  var_samp?: Maybe<Address_Version_From_Move_Resources_Var_Samp_Fields>;
  variance?: Maybe<Address_Version_From_Move_Resources_Variance_Fields>;
};


/** aggregate fields of "legacy_migration_v1.address_version_from_move_resources" */
export type Address_Version_From_Move_Resources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Address_Version_From_Move_Resources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Address_Version_From_Move_Resources_Avg_Fields = {
  __typename?: 'address_version_from_move_resources_avg_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.address_version_from_move_resources". All fields are combined with a logical 'AND'. */
export type Address_Version_From_Move_Resources_Bool_Exp = {
  _and?: InputMaybe<Array<Address_Version_From_Move_Resources_Bool_Exp>>;
  _not?: InputMaybe<Address_Version_From_Move_Resources_Bool_Exp>;
  _or?: InputMaybe<Array<Address_Version_From_Move_Resources_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  coin_activities?: InputMaybe<Coin_Activities_Bool_Exp>;
  coin_activities_aggregate?: InputMaybe<Coin_Activities_Aggregate_Bool_Exp>;
  delegated_staking_activities?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
  token_activities?: InputMaybe<Token_Activities_Bool_Exp>;
  token_activities_aggregate?: InputMaybe<Token_Activities_Aggregate_Bool_Exp>;
  token_activities_v2?: InputMaybe<Token_Activities_V2_Bool_Exp>;
  token_activities_v2_aggregate?: InputMaybe<Token_Activities_V2_Aggregate_Bool_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Address_Version_From_Move_Resources_Max_Fields = {
  __typename?: 'address_version_from_move_resources_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Address_Version_From_Move_Resources_Min_Fields = {
  __typename?: 'address_version_from_move_resources_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "legacy_migration_v1.address_version_from_move_resources". */
export type Address_Version_From_Move_Resources_Order_By = {
  address?: InputMaybe<Order_By>;
  coin_activities_aggregate?: InputMaybe<Coin_Activities_Aggregate_Order_By>;
  delegated_staking_activities_aggregate?: InputMaybe<Delegated_Staking_Activities_Aggregate_Order_By>;
  token_activities_aggregate?: InputMaybe<Token_Activities_Aggregate_Order_By>;
  token_activities_v2_aggregate?: InputMaybe<Token_Activities_V2_Aggregate_Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.address_version_from_move_resources" */
export enum Address_Version_From_Move_Resources_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** aggregate stddev on columns */
export type Address_Version_From_Move_Resources_Stddev_Fields = {
  __typename?: 'address_version_from_move_resources_stddev_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Address_Version_From_Move_Resources_Stddev_Pop_Fields = {
  __typename?: 'address_version_from_move_resources_stddev_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Address_Version_From_Move_Resources_Stddev_Samp_Fields = {
  __typename?: 'address_version_from_move_resources_stddev_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "address_version_from_move_resources" */
export type Address_Version_From_Move_Resources_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Address_Version_From_Move_Resources_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Address_Version_From_Move_Resources_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Address_Version_From_Move_Resources_Sum_Fields = {
  __typename?: 'address_version_from_move_resources_sum_fields';
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Address_Version_From_Move_Resources_Var_Pop_Fields = {
  __typename?: 'address_version_from_move_resources_var_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Address_Version_From_Move_Resources_Var_Samp_Fields = {
  __typename?: 'address_version_from_move_resources_var_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Address_Version_From_Move_Resources_Variance_Fields = {
  __typename?: 'address_version_from_move_resources_variance_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
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

/** columns and relationships of "block_metadata_transactions" */
export type Block_Metadata_Transactions = {
  __typename?: 'block_metadata_transactions';
  block_height: Scalars['bigint']['output'];
  epoch: Scalars['bigint']['output'];
  failed_proposer_indices: Scalars['jsonb']['output'];
  id: Scalars['String']['output'];
  previous_block_votes_bitvec: Scalars['jsonb']['output'];
  proposer: Scalars['String']['output'];
  round: Scalars['bigint']['output'];
  timestamp: Scalars['timestamp']['output'];
  version: Scalars['bigint']['output'];
};


/** columns and relationships of "block_metadata_transactions" */
export type Block_Metadata_TransactionsFailed_Proposer_IndicesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "block_metadata_transactions" */
export type Block_Metadata_TransactionsPrevious_Block_Votes_BitvecArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "block_metadata_transactions". All fields are combined with a logical 'AND'. */
export type Block_Metadata_Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<Block_Metadata_Transactions_Bool_Exp>>;
  _not?: InputMaybe<Block_Metadata_Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Block_Metadata_Transactions_Bool_Exp>>;
  block_height?: InputMaybe<Bigint_Comparison_Exp>;
  epoch?: InputMaybe<Bigint_Comparison_Exp>;
  failed_proposer_indices?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  previous_block_votes_bitvec?: InputMaybe<Jsonb_Comparison_Exp>;
  proposer?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Bigint_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "block_metadata_transactions". */
export type Block_Metadata_Transactions_Order_By = {
  block_height?: InputMaybe<Order_By>;
  epoch?: InputMaybe<Order_By>;
  failed_proposer_indices?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  previous_block_votes_bitvec?: InputMaybe<Order_By>;
  proposer?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "block_metadata_transactions" */
export enum Block_Metadata_Transactions_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  Epoch = 'epoch',
  /** column name */
  FailedProposerIndices = 'failed_proposer_indices',
  /** column name */
  Id = 'id',
  /** column name */
  PreviousBlockVotesBitvec = 'previous_block_votes_bitvec',
  /** column name */
  Proposer = 'proposer',
  /** column name */
  Round = 'round',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Version = 'version'
}

/** Streaming cursor of the table "block_metadata_transactions" */
export type Block_Metadata_Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Block_Metadata_Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Block_Metadata_Transactions_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['bigint']['input']>;
  epoch?: InputMaybe<Scalars['bigint']['input']>;
  failed_proposer_indices?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  previous_block_votes_bitvec?: InputMaybe<Scalars['jsonb']['input']>;
  proposer?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['bigint']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  version?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "legacy_migration_v1.coin_activities" */
export type Coin_Activities = {
  __typename?: 'coin_activities';
  activity_type?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  aptos_names: Array<Current_Aptos_Names>;
  /** An aggregate relationship */
  aptos_names_aggregate: Current_Aptos_Names_Aggregate;
  block_height?: Maybe<Scalars['bigint']['output']>;
  /** An object relationship */
  coin_info?: Maybe<Coin_Infos>;
  coin_type?: Maybe<Scalars['String']['output']>;
  entry_function_id_str?: Maybe<Scalars['String']['output']>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  is_gas_fee?: Maybe<Scalars['Boolean']['output']>;
  is_transaction_success?: Maybe<Scalars['Boolean']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  storage_refund_amount?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};


/** columns and relationships of "legacy_migration_v1.coin_activities" */
export type Coin_ActivitiesAptos_NamesArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.coin_activities" */
export type Coin_ActivitiesAptos_Names_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};

/** aggregated selection of "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Aggregate = {
  __typename?: 'coin_activities_aggregate';
  aggregate?: Maybe<Coin_Activities_Aggregate_Fields>;
  nodes: Array<Coin_Activities>;
};

export type Coin_Activities_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Coin_Activities_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Coin_Activities_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Coin_Activities_Aggregate_Bool_Exp_Count>;
};

export type Coin_Activities_Aggregate_Bool_Exp_Bool_And = {
  arguments: Coin_Activities_Select_Column_Coin_Activities_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Coin_Activities_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Coin_Activities_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Coin_Activities_Select_Column_Coin_Activities_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Coin_Activities_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Coin_Activities_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Coin_Activities_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Aggregate_Fields = {
  __typename?: 'coin_activities_aggregate_fields';
  avg?: Maybe<Coin_Activities_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Coin_Activities_Max_Fields>;
  min?: Maybe<Coin_Activities_Min_Fields>;
  stddev?: Maybe<Coin_Activities_Stddev_Fields>;
  stddev_pop?: Maybe<Coin_Activities_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Coin_Activities_Stddev_Samp_Fields>;
  sum?: Maybe<Coin_Activities_Sum_Fields>;
  var_pop?: Maybe<Coin_Activities_Var_Pop_Fields>;
  var_samp?: Maybe<Coin_Activities_Var_Samp_Fields>;
  variance?: Maybe<Coin_Activities_Variance_Fields>;
};


/** aggregate fields of "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Aggregate_Order_By = {
  avg?: InputMaybe<Coin_Activities_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Coin_Activities_Max_Order_By>;
  min?: InputMaybe<Coin_Activities_Min_Order_By>;
  stddev?: InputMaybe<Coin_Activities_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Coin_Activities_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Coin_Activities_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Coin_Activities_Sum_Order_By>;
  var_pop?: InputMaybe<Coin_Activities_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Coin_Activities_Var_Samp_Order_By>;
  variance?: InputMaybe<Coin_Activities_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Coin_Activities_Avg_Fields = {
  __typename?: 'coin_activities_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  storage_refund_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.coin_activities". All fields are combined with a logical 'AND'. */
export type Coin_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Coin_Activities_Bool_Exp>>;
  _not?: InputMaybe<Coin_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Coin_Activities_Bool_Exp>>;
  activity_type?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  aptos_names?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  aptos_names_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp>;
  block_height?: InputMaybe<Bigint_Comparison_Exp>;
  coin_info?: InputMaybe<Coin_Infos_Bool_Exp>;
  coin_type?: InputMaybe<String_Comparison_Exp>;
  entry_function_id_str?: InputMaybe<String_Comparison_Exp>;
  event_account_address?: InputMaybe<String_Comparison_Exp>;
  event_creation_number?: InputMaybe<Int_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  event_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  is_gas_fee?: InputMaybe<Boolean_Comparison_Exp>;
  is_transaction_success?: InputMaybe<Boolean_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  storage_refund_amount?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Coin_Activities_Max_Fields = {
  __typename?: 'coin_activities_max_fields';
  activity_type?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  block_height?: Maybe<Scalars['bigint']['output']>;
  coin_type?: Maybe<Scalars['String']['output']>;
  entry_function_id_str?: Maybe<Scalars['String']['output']>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  storage_refund_amount?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Max_Order_By = {
  activity_type?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  coin_type?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Coin_Activities_Min_Fields = {
  __typename?: 'coin_activities_min_fields';
  activity_type?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['numeric']['output']>;
  block_height?: Maybe<Scalars['bigint']['output']>;
  coin_type?: Maybe<Scalars['String']['output']>;
  entry_function_id_str?: Maybe<Scalars['String']['output']>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  storage_refund_amount?: Maybe<Scalars['numeric']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Min_Order_By = {
  activity_type?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  coin_type?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "legacy_migration_v1.coin_activities". */
export type Coin_Activities_Order_By = {
  activity_type?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  aptos_names_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Order_By>;
  block_height?: InputMaybe<Order_By>;
  coin_info?: InputMaybe<Coin_Infos_Order_By>;
  coin_type?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  is_gas_fee?: InputMaybe<Order_By>;
  is_transaction_success?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.coin_activities" */
export enum Coin_Activities_Select_Column {
  /** column name */
  ActivityType = 'activity_type',
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  CoinType = 'coin_type',
  /** column name */
  EntryFunctionIdStr = 'entry_function_id_str',
  /** column name */
  EventAccountAddress = 'event_account_address',
  /** column name */
  EventCreationNumber = 'event_creation_number',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  EventSequenceNumber = 'event_sequence_number',
  /** column name */
  IsGasFee = 'is_gas_fee',
  /** column name */
  IsTransactionSuccess = 'is_transaction_success',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  StorageRefundAmount = 'storage_refund_amount',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** select "coin_activities_aggregate_bool_exp_bool_and_arguments_columns" columns of table "legacy_migration_v1.coin_activities" */
export enum Coin_Activities_Select_Column_Coin_Activities_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsGasFee = 'is_gas_fee',
  /** column name */
  IsTransactionSuccess = 'is_transaction_success'
}

/** select "coin_activities_aggregate_bool_exp_bool_or_arguments_columns" columns of table "legacy_migration_v1.coin_activities" */
export enum Coin_Activities_Select_Column_Coin_Activities_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsGasFee = 'is_gas_fee',
  /** column name */
  IsTransactionSuccess = 'is_transaction_success'
}

/** aggregate stddev on columns */
export type Coin_Activities_Stddev_Fields = {
  __typename?: 'coin_activities_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  storage_refund_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Coin_Activities_Stddev_Pop_Fields = {
  __typename?: 'coin_activities_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  storage_refund_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Coin_Activities_Stddev_Samp_Fields = {
  __typename?: 'coin_activities_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  storage_refund_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "coin_activities" */
export type Coin_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Coin_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Coin_Activities_Stream_Cursor_Value_Input = {
  activity_type?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  block_height?: InputMaybe<Scalars['bigint']['input']>;
  coin_type?: InputMaybe<Scalars['String']['input']>;
  entry_function_id_str?: InputMaybe<Scalars['String']['input']>;
  event_account_address?: InputMaybe<Scalars['String']['input']>;
  event_creation_number?: InputMaybe<Scalars['Int']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  event_sequence_number?: InputMaybe<Scalars['Int']['input']>;
  is_gas_fee?: InputMaybe<Scalars['Boolean']['input']>;
  is_transaction_success?: InputMaybe<Scalars['Boolean']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  storage_refund_amount?: InputMaybe<Scalars['numeric']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Coin_Activities_Sum_Fields = {
  __typename?: 'coin_activities_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  block_height?: Maybe<Scalars['bigint']['output']>;
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  storage_refund_amount?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Coin_Activities_Var_Pop_Fields = {
  __typename?: 'coin_activities_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  storage_refund_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Coin_Activities_Var_Samp_Fields = {
  __typename?: 'coin_activities_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  storage_refund_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Coin_Activities_Variance_Fields = {
  __typename?: 'coin_activities_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  block_height?: Maybe<Scalars['Float']['output']>;
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  storage_refund_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "legacy_migration_v1.coin_activities" */
export type Coin_Activities_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "legacy_migration_v1.coin_balances" */
export type Coin_Balances = {
  __typename?: 'coin_balances';
  amount?: Maybe<Scalars['numeric']['output']>;
  coin_type?: Maybe<Scalars['String']['output']>;
  coin_type_hash?: Maybe<Scalars['String']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.coin_balances". All fields are combined with a logical 'AND'. */
export type Coin_Balances_Bool_Exp = {
  _and?: InputMaybe<Array<Coin_Balances_Bool_Exp>>;
  _not?: InputMaybe<Coin_Balances_Bool_Exp>;
  _or?: InputMaybe<Array<Coin_Balances_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  coin_type?: InputMaybe<String_Comparison_Exp>;
  coin_type_hash?: InputMaybe<String_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.coin_balances". */
export type Coin_Balances_Order_By = {
  amount?: InputMaybe<Order_By>;
  coin_type?: InputMaybe<Order_By>;
  coin_type_hash?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.coin_balances" */
export enum Coin_Balances_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CoinType = 'coin_type',
  /** column name */
  CoinTypeHash = 'coin_type_hash',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** Streaming cursor of the table "coin_balances" */
export type Coin_Balances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Coin_Balances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Coin_Balances_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  coin_type?: InputMaybe<Scalars['String']['input']>;
  coin_type_hash?: InputMaybe<Scalars['String']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "legacy_migration_v1.coin_infos" */
export type Coin_Infos = {
  __typename?: 'coin_infos';
  coin_type?: Maybe<Scalars['String']['output']>;
  coin_type_hash?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  supply_aggregator_table_handle?: Maybe<Scalars['String']['output']>;
  supply_aggregator_table_key?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  transaction_created_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version_created?: Maybe<Scalars['bigint']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.coin_infos". All fields are combined with a logical 'AND'. */
export type Coin_Infos_Bool_Exp = {
  _and?: InputMaybe<Array<Coin_Infos_Bool_Exp>>;
  _not?: InputMaybe<Coin_Infos_Bool_Exp>;
  _or?: InputMaybe<Array<Coin_Infos_Bool_Exp>>;
  coin_type?: InputMaybe<String_Comparison_Exp>;
  coin_type_hash?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  decimals?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  supply_aggregator_table_handle?: InputMaybe<String_Comparison_Exp>;
  supply_aggregator_table_key?: InputMaybe<String_Comparison_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
  transaction_created_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version_created?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.coin_infos". */
export type Coin_Infos_Order_By = {
  coin_type?: InputMaybe<Order_By>;
  coin_type_hash?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  supply_aggregator_table_handle?: InputMaybe<Order_By>;
  supply_aggregator_table_key?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  transaction_created_timestamp?: InputMaybe<Order_By>;
  transaction_version_created?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.coin_infos" */
export enum Coin_Infos_Select_Column {
  /** column name */
  CoinType = 'coin_type',
  /** column name */
  CoinTypeHash = 'coin_type_hash',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  Decimals = 'decimals',
  /** column name */
  Name = 'name',
  /** column name */
  SupplyAggregatorTableHandle = 'supply_aggregator_table_handle',
  /** column name */
  SupplyAggregatorTableKey = 'supply_aggregator_table_key',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  TransactionCreatedTimestamp = 'transaction_created_timestamp',
  /** column name */
  TransactionVersionCreated = 'transaction_version_created'
}

/** Streaming cursor of the table "coin_infos" */
export type Coin_Infos_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Coin_Infos_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Coin_Infos_Stream_Cursor_Value_Input = {
  coin_type?: InputMaybe<Scalars['String']['input']>;
  coin_type_hash?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  supply_aggregator_table_handle?: InputMaybe<Scalars['String']['input']>;
  supply_aggregator_table_key?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  transaction_created_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version_created?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "coin_supply" */
export type Coin_Supply = {
  __typename?: 'coin_supply';
  coin_type: Scalars['String']['output'];
  coin_type_hash: Scalars['String']['output'];
  supply: Scalars['numeric']['output'];
  transaction_epoch: Scalars['bigint']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "coin_supply". All fields are combined with a logical 'AND'. */
export type Coin_Supply_Bool_Exp = {
  _and?: InputMaybe<Array<Coin_Supply_Bool_Exp>>;
  _not?: InputMaybe<Coin_Supply_Bool_Exp>;
  _or?: InputMaybe<Array<Coin_Supply_Bool_Exp>>;
  coin_type?: InputMaybe<String_Comparison_Exp>;
  coin_type_hash?: InputMaybe<String_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "coin_supply". */
export type Coin_Supply_Order_By = {
  coin_type?: InputMaybe<Order_By>;
  coin_type_hash?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  transaction_epoch?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "coin_supply" */
export enum Coin_Supply_Select_Column {
  /** column name */
  CoinType = 'coin_type',
  /** column name */
  CoinTypeHash = 'coin_type_hash',
  /** column name */
  Supply = 'supply',
  /** column name */
  TransactionEpoch = 'transaction_epoch',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** Streaming cursor of the table "coin_supply" */
export type Coin_Supply_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Coin_Supply_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Coin_Supply_Stream_Cursor_Value_Input = {
  coin_type?: InputMaybe<Scalars['String']['input']>;
  coin_type_hash?: InputMaybe<Scalars['String']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  transaction_epoch?: InputMaybe<Scalars['bigint']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "legacy_migration_v1.collection_datas" */
export type Collection_Datas = {
  __typename?: 'collection_datas';
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  description_mutable?: Maybe<Scalars['Boolean']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  maximum_mutable?: Maybe<Scalars['Boolean']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  table_handle?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  uri_mutable?: Maybe<Scalars['Boolean']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.collection_datas". All fields are combined with a logical 'AND'. */
export type Collection_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Collection_Datas_Bool_Exp>>;
  _not?: InputMaybe<Collection_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Collection_Datas_Bool_Exp>>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  description_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  maximum?: InputMaybe<Numeric_Comparison_Exp>;
  maximum_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  uri_mutable?: InputMaybe<Boolean_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.collection_datas". */
export type Collection_Datas_Order_By = {
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  description_mutable?: InputMaybe<Order_By>;
  maximum?: InputMaybe<Order_By>;
  maximum_mutable?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  table_handle?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  uri_mutable?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.collection_datas" */
export enum Collection_Datas_Select_Column {
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
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  UriMutable = 'uri_mutable'
}

/** Streaming cursor of the table "collection_datas" */
export type Collection_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Collection_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Collection_Datas_Stream_Cursor_Value_Input = {
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  maximum?: InputMaybe<Scalars['numeric']['input']>;
  maximum_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  uri_mutable?: InputMaybe<Scalars['Boolean']['input']>;
};

/** columns and relationships of "legacy_migration_v1.current_ans_lookup" */
export type Current_Ans_Lookup = {
  __typename?: 'current_ans_lookup';
  /** An array relationship */
  all_token_ownerships: Array<Current_Token_Ownerships>;
  /** An aggregate relationship */
  all_token_ownerships_aggregate: Current_Token_Ownerships_Aggregate;
  domain?: Maybe<Scalars['String']['output']>;
  expiration_timestamp?: Maybe<Scalars['timestamp']['output']>;
  is_deleted?: Maybe<Scalars['Boolean']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  registered_address?: Maybe<Scalars['String']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
  token_name?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "legacy_migration_v1.current_ans_lookup" */
export type Current_Ans_LookupAll_Token_OwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.current_ans_lookup" */
export type Current_Ans_LookupAll_Token_Ownerships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.current_ans_lookup". All fields are combined with a logical 'AND'. */
export type Current_Ans_Lookup_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Ans_Lookup_Bool_Exp>>;
  _not?: InputMaybe<Current_Ans_Lookup_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Ans_Lookup_Bool_Exp>>;
  all_token_ownerships?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
  all_token_ownerships_aggregate?: InputMaybe<Current_Token_Ownerships_Aggregate_Bool_Exp>;
  domain?: InputMaybe<String_Comparison_Exp>;
  expiration_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  registered_address?: InputMaybe<String_Comparison_Exp>;
  subdomain?: InputMaybe<String_Comparison_Exp>;
  token_name?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.current_ans_lookup". */
export type Current_Ans_Lookup_Order_By = {
  all_token_ownerships_aggregate?: InputMaybe<Current_Token_Ownerships_Aggregate_Order_By>;
  domain?: InputMaybe<Order_By>;
  expiration_timestamp?: InputMaybe<Order_By>;
  is_deleted?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  registered_address?: InputMaybe<Order_By>;
  subdomain?: InputMaybe<Order_By>;
  token_name?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.current_ans_lookup" */
export enum Current_Ans_Lookup_Select_Column {
  /** column name */
  Domain = 'domain',
  /** column name */
  ExpirationTimestamp = 'expiration_timestamp',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  RegisteredAddress = 'registered_address',
  /** column name */
  Subdomain = 'subdomain',
  /** column name */
  TokenName = 'token_name'
}

/** Streaming cursor of the table "current_ans_lookup" */
export type Current_Ans_Lookup_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Ans_Lookup_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Ans_Lookup_Stream_Cursor_Value_Input = {
  domain?: InputMaybe<Scalars['String']['input']>;
  expiration_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  registered_address?: InputMaybe<Scalars['String']['input']>;
  subdomain?: InputMaybe<Scalars['String']['input']>;
  token_name?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "current_ans_lookup_v2" */
export type Current_Ans_Lookup_V2 = {
  __typename?: 'current_ans_lookup_v2';
  domain: Scalars['String']['output'];
  expiration_timestamp: Scalars['timestamp']['output'];
  is_deleted: Scalars['Boolean']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  registered_address?: Maybe<Scalars['String']['output']>;
  subdomain: Scalars['String']['output'];
  token_name?: Maybe<Scalars['String']['output']>;
  token_standard: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "current_ans_lookup_v2". All fields are combined with a logical 'AND'. */
export type Current_Ans_Lookup_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Ans_Lookup_V2_Bool_Exp>>;
  _not?: InputMaybe<Current_Ans_Lookup_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Ans_Lookup_V2_Bool_Exp>>;
  domain?: InputMaybe<String_Comparison_Exp>;
  expiration_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  registered_address?: InputMaybe<String_Comparison_Exp>;
  subdomain?: InputMaybe<String_Comparison_Exp>;
  token_name?: InputMaybe<String_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_ans_lookup_v2". */
export type Current_Ans_Lookup_V2_Order_By = {
  domain?: InputMaybe<Order_By>;
  expiration_timestamp?: InputMaybe<Order_By>;
  is_deleted?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  registered_address?: InputMaybe<Order_By>;
  subdomain?: InputMaybe<Order_By>;
  token_name?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** select columns of table "current_ans_lookup_v2" */
export enum Current_Ans_Lookup_V2_Select_Column {
  /** column name */
  Domain = 'domain',
  /** column name */
  ExpirationTimestamp = 'expiration_timestamp',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  RegisteredAddress = 'registered_address',
  /** column name */
  Subdomain = 'subdomain',
  /** column name */
  TokenName = 'token_name',
  /** column name */
  TokenStandard = 'token_standard'
}

/** Streaming cursor of the table "current_ans_lookup_v2" */
export type Current_Ans_Lookup_V2_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Ans_Lookup_V2_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Ans_Lookup_V2_Stream_Cursor_Value_Input = {
  domain?: InputMaybe<Scalars['String']['input']>;
  expiration_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  registered_address?: InputMaybe<Scalars['String']['input']>;
  subdomain?: InputMaybe<Scalars['String']['input']>;
  token_name?: InputMaybe<Scalars['String']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "current_aptos_names" */
export type Current_Aptos_Names = {
  __typename?: 'current_aptos_names';
  domain?: Maybe<Scalars['String']['output']>;
  domain_expiration_timestamp?: Maybe<Scalars['timestamp']['output']>;
  domain_with_suffix?: Maybe<Scalars['String']['output']>;
  expiration_timestamp?: Maybe<Scalars['timestamp']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  is_domain_owner?: Maybe<Current_Aptos_Names>;
  is_primary?: Maybe<Scalars['Boolean']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  registered_address?: Maybe<Scalars['String']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['bigint']['output']>;
  token_name?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "current_aptos_names" */
export type Current_Aptos_Names_Aggregate = {
  __typename?: 'current_aptos_names_aggregate';
  aggregate?: Maybe<Current_Aptos_Names_Aggregate_Fields>;
  nodes: Array<Current_Aptos_Names>;
};

export type Current_Aptos_Names_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp_Count>;
};

export type Current_Aptos_Names_Aggregate_Bool_Exp_Bool_And = {
  arguments: Current_Aptos_Names_Select_Column_Current_Aptos_Names_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Current_Aptos_Names_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Current_Aptos_Names_Select_Column_Current_Aptos_Names_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Current_Aptos_Names_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "current_aptos_names" */
export type Current_Aptos_Names_Aggregate_Fields = {
  __typename?: 'current_aptos_names_aggregate_fields';
  avg?: Maybe<Current_Aptos_Names_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Aptos_Names_Max_Fields>;
  min?: Maybe<Current_Aptos_Names_Min_Fields>;
  stddev?: Maybe<Current_Aptos_Names_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Aptos_Names_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Aptos_Names_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Aptos_Names_Sum_Fields>;
  var_pop?: Maybe<Current_Aptos_Names_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Aptos_Names_Var_Samp_Fields>;
  variance?: Maybe<Current_Aptos_Names_Variance_Fields>;
};


/** aggregate fields of "current_aptos_names" */
export type Current_Aptos_Names_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "current_aptos_names" */
export type Current_Aptos_Names_Aggregate_Order_By = {
  avg?: InputMaybe<Current_Aptos_Names_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Current_Aptos_Names_Max_Order_By>;
  min?: InputMaybe<Current_Aptos_Names_Min_Order_By>;
  stddev?: InputMaybe<Current_Aptos_Names_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Current_Aptos_Names_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Current_Aptos_Names_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Current_Aptos_Names_Sum_Order_By>;
  var_pop?: InputMaybe<Current_Aptos_Names_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Current_Aptos_Names_Var_Samp_Order_By>;
  variance?: InputMaybe<Current_Aptos_Names_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Current_Aptos_Names_Avg_Fields = {
  __typename?: 'current_aptos_names_avg_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Avg_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "current_aptos_names". All fields are combined with a logical 'AND'. */
export type Current_Aptos_Names_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Aptos_Names_Bool_Exp>>;
  _not?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Aptos_Names_Bool_Exp>>;
  domain?: InputMaybe<String_Comparison_Exp>;
  domain_expiration_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  domain_with_suffix?: InputMaybe<String_Comparison_Exp>;
  expiration_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  is_domain_owner?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  is_primary?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  registered_address?: InputMaybe<String_Comparison_Exp>;
  subdomain?: InputMaybe<String_Comparison_Exp>;
  subdomain_expiration_policy?: InputMaybe<Bigint_Comparison_Exp>;
  token_name?: InputMaybe<String_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Aptos_Names_Max_Fields = {
  __typename?: 'current_aptos_names_max_fields';
  domain?: Maybe<Scalars['String']['output']>;
  domain_expiration_timestamp?: Maybe<Scalars['timestamp']['output']>;
  domain_with_suffix?: Maybe<Scalars['String']['output']>;
  expiration_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  registered_address?: Maybe<Scalars['String']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['bigint']['output']>;
  token_name?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Max_Order_By = {
  domain?: InputMaybe<Order_By>;
  domain_expiration_timestamp?: InputMaybe<Order_By>;
  domain_with_suffix?: InputMaybe<Order_By>;
  expiration_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  registered_address?: InputMaybe<Order_By>;
  subdomain?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
  token_name?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Current_Aptos_Names_Min_Fields = {
  __typename?: 'current_aptos_names_min_fields';
  domain?: Maybe<Scalars['String']['output']>;
  domain_expiration_timestamp?: Maybe<Scalars['timestamp']['output']>;
  domain_with_suffix?: Maybe<Scalars['String']['output']>;
  expiration_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  registered_address?: Maybe<Scalars['String']['output']>;
  subdomain?: Maybe<Scalars['String']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['bigint']['output']>;
  token_name?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Min_Order_By = {
  domain?: InputMaybe<Order_By>;
  domain_expiration_timestamp?: InputMaybe<Order_By>;
  domain_with_suffix?: InputMaybe<Order_By>;
  expiration_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  registered_address?: InputMaybe<Order_By>;
  subdomain?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
  token_name?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "current_aptos_names". */
export type Current_Aptos_Names_Order_By = {
  domain?: InputMaybe<Order_By>;
  domain_expiration_timestamp?: InputMaybe<Order_By>;
  domain_with_suffix?: InputMaybe<Order_By>;
  expiration_timestamp?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  is_domain_owner?: InputMaybe<Current_Aptos_Names_Order_By>;
  is_primary?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  registered_address?: InputMaybe<Order_By>;
  subdomain?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
  token_name?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** select columns of table "current_aptos_names" */
export enum Current_Aptos_Names_Select_Column {
  /** column name */
  Domain = 'domain',
  /** column name */
  DomainExpirationTimestamp = 'domain_expiration_timestamp',
  /** column name */
  DomainWithSuffix = 'domain_with_suffix',
  /** column name */
  ExpirationTimestamp = 'expiration_timestamp',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  IsPrimary = 'is_primary',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  RegisteredAddress = 'registered_address',
  /** column name */
  Subdomain = 'subdomain',
  /** column name */
  SubdomainExpirationPolicy = 'subdomain_expiration_policy',
  /** column name */
  TokenName = 'token_name',
  /** column name */
  TokenStandard = 'token_standard'
}

/** select "current_aptos_names_aggregate_bool_exp_bool_and_arguments_columns" columns of table "current_aptos_names" */
export enum Current_Aptos_Names_Select_Column_Current_Aptos_Names_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
  /** column name */
  IsPrimary = 'is_primary'
}

/** select "current_aptos_names_aggregate_bool_exp_bool_or_arguments_columns" columns of table "current_aptos_names" */
export enum Current_Aptos_Names_Select_Column_Current_Aptos_Names_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsActive = 'is_active',
  /** column name */
  IsPrimary = 'is_primary'
}

/** aggregate stddev on columns */
export type Current_Aptos_Names_Stddev_Fields = {
  __typename?: 'current_aptos_names_stddev_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Stddev_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Current_Aptos_Names_Stddev_Pop_Fields = {
  __typename?: 'current_aptos_names_stddev_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Stddev_Pop_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Current_Aptos_Names_Stddev_Samp_Fields = {
  __typename?: 'current_aptos_names_stddev_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Stddev_Samp_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "current_aptos_names" */
export type Current_Aptos_Names_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Aptos_Names_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Aptos_Names_Stream_Cursor_Value_Input = {
  domain?: InputMaybe<Scalars['String']['input']>;
  domain_expiration_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  domain_with_suffix?: InputMaybe<Scalars['String']['input']>;
  expiration_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_primary?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  registered_address?: InputMaybe<Scalars['String']['input']>;
  subdomain?: InputMaybe<Scalars['String']['input']>;
  subdomain_expiration_policy?: InputMaybe<Scalars['bigint']['input']>;
  token_name?: InputMaybe<Scalars['String']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Current_Aptos_Names_Sum_Fields = {
  __typename?: 'current_aptos_names_sum_fields';
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Sum_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Current_Aptos_Names_Var_Pop_Fields = {
  __typename?: 'current_aptos_names_var_pop_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Var_Pop_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Current_Aptos_Names_Var_Samp_Fields = {
  __typename?: 'current_aptos_names_var_samp_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Var_Samp_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Current_Aptos_Names_Variance_Fields = {
  __typename?: 'current_aptos_names_variance_fields';
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  subdomain_expiration_policy?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "current_aptos_names" */
export type Current_Aptos_Names_Variance_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  subdomain_expiration_policy?: InputMaybe<Order_By>;
};

/** columns and relationships of "legacy_migration_v1.current_coin_balances" */
export type Current_Coin_Balances = {
  __typename?: 'current_coin_balances';
  amount?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  coin_info?: Maybe<Coin_Infos>;
  coin_type?: Maybe<Scalars['String']['output']>;
  coin_type_hash?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.current_coin_balances". All fields are combined with a logical 'AND'. */
export type Current_Coin_Balances_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Coin_Balances_Bool_Exp>>;
  _not?: InputMaybe<Current_Coin_Balances_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Coin_Balances_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  coin_info?: InputMaybe<Coin_Infos_Bool_Exp>;
  coin_type?: InputMaybe<String_Comparison_Exp>;
  coin_type_hash?: InputMaybe<String_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.current_coin_balances". */
export type Current_Coin_Balances_Order_By = {
  amount?: InputMaybe<Order_By>;
  coin_info?: InputMaybe<Coin_Infos_Order_By>;
  coin_type?: InputMaybe<Order_By>;
  coin_type_hash?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.current_coin_balances" */
export enum Current_Coin_Balances_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CoinType = 'coin_type',
  /** column name */
  CoinTypeHash = 'coin_type_hash',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  OwnerAddress = 'owner_address'
}

/** Streaming cursor of the table "current_coin_balances" */
export type Current_Coin_Balances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Coin_Balances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Coin_Balances_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  coin_type?: InputMaybe<Scalars['String']['input']>;
  coin_type_hash?: InputMaybe<Scalars['String']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "legacy_migration_v1.current_collection_datas" */
export type Current_Collection_Datas = {
  __typename?: 'current_collection_datas';
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  description_mutable?: Maybe<Scalars['Boolean']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  maximum_mutable?: Maybe<Scalars['Boolean']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  table_handle?: Maybe<Scalars['String']['output']>;
  uri_mutable?: Maybe<Scalars['Boolean']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.current_collection_datas". All fields are combined with a logical 'AND'. */
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

/** Ordering options when selecting data from "legacy_migration_v1.current_collection_datas". */
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

/** select columns of table "legacy_migration_v1.current_collection_datas" */
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

/** columns and relationships of "current_collection_ownership_v2_view" */
export type Current_Collection_Ownership_V2_View = {
  __typename?: 'current_collection_ownership_v2_view';
  collection_id?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  collection_uri?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  current_collection?: Maybe<Current_Collections_V2>;
  distinct_tokens?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  single_token_uri?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "current_collection_ownership_v2_view" */
export type Current_Collection_Ownership_V2_View_Aggregate = {
  __typename?: 'current_collection_ownership_v2_view_aggregate';
  aggregate?: Maybe<Current_Collection_Ownership_V2_View_Aggregate_Fields>;
  nodes: Array<Current_Collection_Ownership_V2_View>;
};

/** aggregate fields of "current_collection_ownership_v2_view" */
export type Current_Collection_Ownership_V2_View_Aggregate_Fields = {
  __typename?: 'current_collection_ownership_v2_view_aggregate_fields';
  avg?: Maybe<Current_Collection_Ownership_V2_View_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Collection_Ownership_V2_View_Max_Fields>;
  min?: Maybe<Current_Collection_Ownership_V2_View_Min_Fields>;
  stddev?: Maybe<Current_Collection_Ownership_V2_View_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Collection_Ownership_V2_View_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Collection_Ownership_V2_View_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Collection_Ownership_V2_View_Sum_Fields>;
  var_pop?: Maybe<Current_Collection_Ownership_V2_View_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Collection_Ownership_V2_View_Var_Samp_Fields>;
  variance?: Maybe<Current_Collection_Ownership_V2_View_Variance_Fields>;
};


/** aggregate fields of "current_collection_ownership_v2_view" */
export type Current_Collection_Ownership_V2_View_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Current_Collection_Ownership_V2_View_Avg_Fields = {
  __typename?: 'current_collection_ownership_v2_view_avg_fields';
  distinct_tokens?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "current_collection_ownership_v2_view". All fields are combined with a logical 'AND'. */
export type Current_Collection_Ownership_V2_View_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Bool_Exp>>;
  _not?: InputMaybe<Current_Collection_Ownership_V2_View_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Bool_Exp>>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  collection_uri?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  current_collection?: InputMaybe<Current_Collections_V2_Bool_Exp>;
  distinct_tokens?: InputMaybe<Bigint_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  single_token_uri?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Collection_Ownership_V2_View_Max_Fields = {
  __typename?: 'current_collection_ownership_v2_view_max_fields';
  collection_id?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  collection_uri?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  distinct_tokens?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  single_token_uri?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Current_Collection_Ownership_V2_View_Min_Fields = {
  __typename?: 'current_collection_ownership_v2_view_min_fields';
  collection_id?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  collection_uri?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  distinct_tokens?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  single_token_uri?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "current_collection_ownership_v2_view". */
export type Current_Collection_Ownership_V2_View_Order_By = {
  collection_id?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  collection_uri?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  current_collection?: InputMaybe<Current_Collections_V2_Order_By>;
  distinct_tokens?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  single_token_uri?: InputMaybe<Order_By>;
};

/** select columns of table "current_collection_ownership_v2_view" */
export enum Current_Collection_Ownership_V2_View_Select_Column {
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CollectionUri = 'collection_uri',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  DistinctTokens = 'distinct_tokens',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  SingleTokenUri = 'single_token_uri'
}

/** aggregate stddev on columns */
export type Current_Collection_Ownership_V2_View_Stddev_Fields = {
  __typename?: 'current_collection_ownership_v2_view_stddev_fields';
  distinct_tokens?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Current_Collection_Ownership_V2_View_Stddev_Pop_Fields = {
  __typename?: 'current_collection_ownership_v2_view_stddev_pop_fields';
  distinct_tokens?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Current_Collection_Ownership_V2_View_Stddev_Samp_Fields = {
  __typename?: 'current_collection_ownership_v2_view_stddev_samp_fields';
  distinct_tokens?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "current_collection_ownership_v2_view" */
export type Current_Collection_Ownership_V2_View_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Collection_Ownership_V2_View_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Collection_Ownership_V2_View_Stream_Cursor_Value_Input = {
  collection_id?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  collection_uri?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  distinct_tokens?: InputMaybe<Scalars['bigint']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  single_token_uri?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Current_Collection_Ownership_V2_View_Sum_Fields = {
  __typename?: 'current_collection_ownership_v2_view_sum_fields';
  distinct_tokens?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Current_Collection_Ownership_V2_View_Var_Pop_Fields = {
  __typename?: 'current_collection_ownership_v2_view_var_pop_fields';
  distinct_tokens?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Current_Collection_Ownership_V2_View_Var_Samp_Fields = {
  __typename?: 'current_collection_ownership_v2_view_var_samp_fields';
  distinct_tokens?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Current_Collection_Ownership_V2_View_Variance_Fields = {
  __typename?: 'current_collection_ownership_v2_view_variance_fields';
  distinct_tokens?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "current_collections_v2" */
export type Current_Collections_V2 = {
  __typename?: 'current_collections_v2';
  /** An object relationship */
  cdn_asset_uris?: Maybe<Nft_Metadata_Crawler_Parsed_Asset_Uris>;
  collection_id: Scalars['String']['output'];
  collection_name: Scalars['String']['output'];
  collection_properties?: Maybe<Scalars['jsonb']['output']>;
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


/** columns and relationships of "current_collections_v2" */
export type Current_Collections_V2Collection_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "current_collections_v2". All fields are combined with a logical 'AND'. */
export type Current_Collections_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Collections_V2_Bool_Exp>>;
  _not?: InputMaybe<Current_Collections_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Collections_V2_Bool_Exp>>;
  cdn_asset_uris?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  collection_properties?: InputMaybe<Jsonb_Comparison_Exp>;
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

/** Ordering options when selecting data from "current_collections_v2". */
export type Current_Collections_V2_Order_By = {
  cdn_asset_uris?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Order_By>;
  collection_id?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  collection_properties?: InputMaybe<Order_By>;
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
  CollectionProperties = 'collection_properties',
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
  collection_properties?: InputMaybe<Scalars['jsonb']['input']>;
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

/** columns and relationships of "current_delegated_staking_pool_balances" */
export type Current_Delegated_Staking_Pool_Balances = {
  __typename?: 'current_delegated_staking_pool_balances';
  active_table_handle: Scalars['String']['output'];
  inactive_table_handle: Scalars['String']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  operator_commission_percentage: Scalars['numeric']['output'];
  staking_pool_address: Scalars['String']['output'];
  total_coins: Scalars['numeric']['output'];
  total_shares: Scalars['numeric']['output'];
};

/** Boolean expression to filter rows from the table "current_delegated_staking_pool_balances". All fields are combined with a logical 'AND'. */
export type Current_Delegated_Staking_Pool_Balances_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Delegated_Staking_Pool_Balances_Bool_Exp>>;
  _not?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Delegated_Staking_Pool_Balances_Bool_Exp>>;
  active_table_handle?: InputMaybe<String_Comparison_Exp>;
  inactive_table_handle?: InputMaybe<String_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  operator_commission_percentage?: InputMaybe<Numeric_Comparison_Exp>;
  staking_pool_address?: InputMaybe<String_Comparison_Exp>;
  total_coins?: InputMaybe<Numeric_Comparison_Exp>;
  total_shares?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_delegated_staking_pool_balances". */
export type Current_Delegated_Staking_Pool_Balances_Order_By = {
  active_table_handle?: InputMaybe<Order_By>;
  inactive_table_handle?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  operator_commission_percentage?: InputMaybe<Order_By>;
  staking_pool_address?: InputMaybe<Order_By>;
  total_coins?: InputMaybe<Order_By>;
  total_shares?: InputMaybe<Order_By>;
};

/** select columns of table "current_delegated_staking_pool_balances" */
export enum Current_Delegated_Staking_Pool_Balances_Select_Column {
  /** column name */
  ActiveTableHandle = 'active_table_handle',
  /** column name */
  InactiveTableHandle = 'inactive_table_handle',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  OperatorCommissionPercentage = 'operator_commission_percentage',
  /** column name */
  StakingPoolAddress = 'staking_pool_address',
  /** column name */
  TotalCoins = 'total_coins',
  /** column name */
  TotalShares = 'total_shares'
}

/** Streaming cursor of the table "current_delegated_staking_pool_balances" */
export type Current_Delegated_Staking_Pool_Balances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Delegated_Staking_Pool_Balances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Delegated_Staking_Pool_Balances_Stream_Cursor_Value_Input = {
  active_table_handle?: InputMaybe<Scalars['String']['input']>;
  inactive_table_handle?: InputMaybe<Scalars['String']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  operator_commission_percentage?: InputMaybe<Scalars['numeric']['input']>;
  staking_pool_address?: InputMaybe<Scalars['String']['input']>;
  total_coins?: InputMaybe<Scalars['numeric']['input']>;
  total_shares?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "current_delegated_voter" */
export type Current_Delegated_Voter = {
  __typename?: 'current_delegated_voter';
  delegation_pool_address: Scalars['String']['output'];
  delegator_address: Scalars['String']['output'];
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  pending_voter?: Maybe<Scalars['String']['output']>;
  table_handle?: Maybe<Scalars['String']['output']>;
  voter?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "current_delegated_voter". All fields are combined with a logical 'AND'. */
export type Current_Delegated_Voter_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Delegated_Voter_Bool_Exp>>;
  _not?: InputMaybe<Current_Delegated_Voter_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Delegated_Voter_Bool_Exp>>;
  delegation_pool_address?: InputMaybe<String_Comparison_Exp>;
  delegator_address?: InputMaybe<String_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  pending_voter?: InputMaybe<String_Comparison_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
  voter?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_delegated_voter". */
export type Current_Delegated_Voter_Order_By = {
  delegation_pool_address?: InputMaybe<Order_By>;
  delegator_address?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  pending_voter?: InputMaybe<Order_By>;
  table_handle?: InputMaybe<Order_By>;
  voter?: InputMaybe<Order_By>;
};

/** select columns of table "current_delegated_voter" */
export enum Current_Delegated_Voter_Select_Column {
  /** column name */
  DelegationPoolAddress = 'delegation_pool_address',
  /** column name */
  DelegatorAddress = 'delegator_address',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  PendingVoter = 'pending_voter',
  /** column name */
  TableHandle = 'table_handle',
  /** column name */
  Voter = 'voter'
}

/** Streaming cursor of the table "current_delegated_voter" */
export type Current_Delegated_Voter_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Delegated_Voter_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Delegated_Voter_Stream_Cursor_Value_Input = {
  delegation_pool_address?: InputMaybe<Scalars['String']['input']>;
  delegator_address?: InputMaybe<Scalars['String']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  pending_voter?: InputMaybe<Scalars['String']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
  voter?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "current_delegator_balances" */
export type Current_Delegator_Balances = {
  __typename?: 'current_delegator_balances';
  /** An object relationship */
  current_pool_balance?: Maybe<Current_Delegated_Staking_Pool_Balances>;
  delegator_address: Scalars['String']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  parent_table_handle: Scalars['String']['output'];
  pool_address: Scalars['String']['output'];
  pool_type: Scalars['String']['output'];
  shares: Scalars['numeric']['output'];
  /** An object relationship */
  staking_pool_metadata?: Maybe<Current_Staking_Pool_Voter>;
  table_handle: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "current_delegator_balances". All fields are combined with a logical 'AND'. */
export type Current_Delegator_Balances_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Delegator_Balances_Bool_Exp>>;
  _not?: InputMaybe<Current_Delegator_Balances_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Delegator_Balances_Bool_Exp>>;
  current_pool_balance?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Bool_Exp>;
  delegator_address?: InputMaybe<String_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  parent_table_handle?: InputMaybe<String_Comparison_Exp>;
  pool_address?: InputMaybe<String_Comparison_Exp>;
  pool_type?: InputMaybe<String_Comparison_Exp>;
  shares?: InputMaybe<Numeric_Comparison_Exp>;
  staking_pool_metadata?: InputMaybe<Current_Staking_Pool_Voter_Bool_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_delegator_balances". */
export type Current_Delegator_Balances_Order_By = {
  current_pool_balance?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Order_By>;
  delegator_address?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  parent_table_handle?: InputMaybe<Order_By>;
  pool_address?: InputMaybe<Order_By>;
  pool_type?: InputMaybe<Order_By>;
  shares?: InputMaybe<Order_By>;
  staking_pool_metadata?: InputMaybe<Current_Staking_Pool_Voter_Order_By>;
  table_handle?: InputMaybe<Order_By>;
};

/** select columns of table "current_delegator_balances" */
export enum Current_Delegator_Balances_Select_Column {
  /** column name */
  DelegatorAddress = 'delegator_address',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  ParentTableHandle = 'parent_table_handle',
  /** column name */
  PoolAddress = 'pool_address',
  /** column name */
  PoolType = 'pool_type',
  /** column name */
  Shares = 'shares',
  /** column name */
  TableHandle = 'table_handle'
}

/** Streaming cursor of the table "current_delegator_balances" */
export type Current_Delegator_Balances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Delegator_Balances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Delegator_Balances_Stream_Cursor_Value_Input = {
  delegator_address?: InputMaybe<Scalars['String']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  parent_table_handle?: InputMaybe<Scalars['String']['input']>;
  pool_address?: InputMaybe<Scalars['String']['input']>;
  pool_type?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['numeric']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "current_fungible_asset_balances" */
export type Current_Fungible_Asset_Balances = {
  __typename?: 'current_fungible_asset_balances';
  amount: Scalars['numeric']['output'];
  amount_v1?: Maybe<Scalars['numeric']['output']>;
  amount_v2?: Maybe<Scalars['numeric']['output']>;
  asset_type: Scalars['String']['output'];
  asset_type_v1?: Maybe<Scalars['String']['output']>;
  asset_type_v2?: Maybe<Scalars['String']['output']>;
  is_frozen: Scalars['Boolean']['output'];
  is_primary: Scalars['Boolean']['output'];
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_timestamp_v1?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_timestamp_v2?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['bigint']['output']>;
  /** An object relationship */
  metadata?: Maybe<Fungible_Asset_Metadata>;
  owner_address: Scalars['String']['output'];
  storage_id: Scalars['String']['output'];
  token_standard: Scalars['String']['output'];
};

/** aggregated selection of "current_fungible_asset_balances" */
export type Current_Fungible_Asset_Balances_Aggregate = {
  __typename?: 'current_fungible_asset_balances_aggregate';
  aggregate?: Maybe<Current_Fungible_Asset_Balances_Aggregate_Fields>;
  nodes: Array<Current_Fungible_Asset_Balances>;
};

/** aggregate fields of "current_fungible_asset_balances" */
export type Current_Fungible_Asset_Balances_Aggregate_Fields = {
  __typename?: 'current_fungible_asset_balances_aggregate_fields';
  avg?: Maybe<Current_Fungible_Asset_Balances_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Current_Fungible_Asset_Balances_Max_Fields>;
  min?: Maybe<Current_Fungible_Asset_Balances_Min_Fields>;
  stddev?: Maybe<Current_Fungible_Asset_Balances_Stddev_Fields>;
  stddev_pop?: Maybe<Current_Fungible_Asset_Balances_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Current_Fungible_Asset_Balances_Stddev_Samp_Fields>;
  sum?: Maybe<Current_Fungible_Asset_Balances_Sum_Fields>;
  var_pop?: Maybe<Current_Fungible_Asset_Balances_Var_Pop_Fields>;
  var_samp?: Maybe<Current_Fungible_Asset_Balances_Var_Samp_Fields>;
  variance?: Maybe<Current_Fungible_Asset_Balances_Variance_Fields>;
};


/** aggregate fields of "current_fungible_asset_balances" */
export type Current_Fungible_Asset_Balances_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Fungible_Asset_Balances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Current_Fungible_Asset_Balances_Avg_Fields = {
  __typename?: 'current_fungible_asset_balances_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_v1?: Maybe<Scalars['Float']['output']>;
  amount_v2?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "current_fungible_asset_balances". All fields are combined with a logical 'AND'. */
export type Current_Fungible_Asset_Balances_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Fungible_Asset_Balances_Bool_Exp>>;
  _not?: InputMaybe<Current_Fungible_Asset_Balances_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Fungible_Asset_Balances_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  amount_v1?: InputMaybe<Numeric_Comparison_Exp>;
  amount_v2?: InputMaybe<Numeric_Comparison_Exp>;
  asset_type?: InputMaybe<String_Comparison_Exp>;
  asset_type_v1?: InputMaybe<String_Comparison_Exp>;
  asset_type_v2?: InputMaybe<String_Comparison_Exp>;
  is_frozen?: InputMaybe<Boolean_Comparison_Exp>;
  is_primary?: InputMaybe<Boolean_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_timestamp_v1?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_timestamp_v2?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  last_transaction_version_v1?: InputMaybe<Bigint_Comparison_Exp>;
  last_transaction_version_v2?: InputMaybe<Bigint_Comparison_Exp>;
  metadata?: InputMaybe<Fungible_Asset_Metadata_Bool_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  storage_id?: InputMaybe<String_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Current_Fungible_Asset_Balances_Max_Fields = {
  __typename?: 'current_fungible_asset_balances_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  amount_v1?: Maybe<Scalars['numeric']['output']>;
  amount_v2?: Maybe<Scalars['numeric']['output']>;
  asset_type?: Maybe<Scalars['String']['output']>;
  asset_type_v1?: Maybe<Scalars['String']['output']>;
  asset_type_v2?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_timestamp_v1?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_timestamp_v2?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  storage_id?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Current_Fungible_Asset_Balances_Min_Fields = {
  __typename?: 'current_fungible_asset_balances_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  amount_v1?: Maybe<Scalars['numeric']['output']>;
  amount_v2?: Maybe<Scalars['numeric']['output']>;
  asset_type?: Maybe<Scalars['String']['output']>;
  asset_type_v1?: Maybe<Scalars['String']['output']>;
  asset_type_v2?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_timestamp_v1?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_timestamp_v2?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['bigint']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  storage_id?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "current_fungible_asset_balances". */
export type Current_Fungible_Asset_Balances_Order_By = {
  amount?: InputMaybe<Order_By>;
  amount_v1?: InputMaybe<Order_By>;
  amount_v2?: InputMaybe<Order_By>;
  asset_type?: InputMaybe<Order_By>;
  asset_type_v1?: InputMaybe<Order_By>;
  asset_type_v2?: InputMaybe<Order_By>;
  is_frozen?: InputMaybe<Order_By>;
  is_primary?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_timestamp_v1?: InputMaybe<Order_By>;
  last_transaction_timestamp_v2?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  last_transaction_version_v1?: InputMaybe<Order_By>;
  last_transaction_version_v2?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Fungible_Asset_Metadata_Order_By>;
  owner_address?: InputMaybe<Order_By>;
  storage_id?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** select columns of table "current_fungible_asset_balances" */
export enum Current_Fungible_Asset_Balances_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  AmountV1 = 'amount_v1',
  /** column name */
  AmountV2 = 'amount_v2',
  /** column name */
  AssetType = 'asset_type',
  /** column name */
  AssetTypeV1 = 'asset_type_v1',
  /** column name */
  AssetTypeV2 = 'asset_type_v2',
  /** column name */
  IsFrozen = 'is_frozen',
  /** column name */
  IsPrimary = 'is_primary',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionTimestampV1 = 'last_transaction_timestamp_v1',
  /** column name */
  LastTransactionTimestampV2 = 'last_transaction_timestamp_v2',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  LastTransactionVersionV1 = 'last_transaction_version_v1',
  /** column name */
  LastTransactionVersionV2 = 'last_transaction_version_v2',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  StorageId = 'storage_id',
  /** column name */
  TokenStandard = 'token_standard'
}

/** aggregate stddev on columns */
export type Current_Fungible_Asset_Balances_Stddev_Fields = {
  __typename?: 'current_fungible_asset_balances_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_v1?: Maybe<Scalars['Float']['output']>;
  amount_v2?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Current_Fungible_Asset_Balances_Stddev_Pop_Fields = {
  __typename?: 'current_fungible_asset_balances_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_v1?: Maybe<Scalars['Float']['output']>;
  amount_v2?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Current_Fungible_Asset_Balances_Stddev_Samp_Fields = {
  __typename?: 'current_fungible_asset_balances_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_v1?: Maybe<Scalars['Float']['output']>;
  amount_v2?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "current_fungible_asset_balances" */
export type Current_Fungible_Asset_Balances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Fungible_Asset_Balances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Fungible_Asset_Balances_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  amount_v1?: InputMaybe<Scalars['numeric']['input']>;
  amount_v2?: InputMaybe<Scalars['numeric']['input']>;
  asset_type?: InputMaybe<Scalars['String']['input']>;
  asset_type_v1?: InputMaybe<Scalars['String']['input']>;
  asset_type_v2?: InputMaybe<Scalars['String']['input']>;
  is_frozen?: InputMaybe<Scalars['Boolean']['input']>;
  is_primary?: InputMaybe<Scalars['Boolean']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_timestamp_v1?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_timestamp_v2?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  last_transaction_version_v1?: InputMaybe<Scalars['bigint']['input']>;
  last_transaction_version_v2?: InputMaybe<Scalars['bigint']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  storage_id?: InputMaybe<Scalars['String']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Current_Fungible_Asset_Balances_Sum_Fields = {
  __typename?: 'current_fungible_asset_balances_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  amount_v1?: Maybe<Scalars['numeric']['output']>;
  amount_v2?: Maybe<Scalars['numeric']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['bigint']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Current_Fungible_Asset_Balances_Var_Pop_Fields = {
  __typename?: 'current_fungible_asset_balances_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_v1?: Maybe<Scalars['Float']['output']>;
  amount_v2?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Current_Fungible_Asset_Balances_Var_Samp_Fields = {
  __typename?: 'current_fungible_asset_balances_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_v1?: Maybe<Scalars['Float']['output']>;
  amount_v2?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Current_Fungible_Asset_Balances_Variance_Fields = {
  __typename?: 'current_fungible_asset_balances_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_v1?: Maybe<Scalars['Float']['output']>;
  amount_v2?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v1?: Maybe<Scalars['Float']['output']>;
  last_transaction_version_v2?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "current_objects" */
export type Current_Objects = {
  __typename?: 'current_objects';
  allow_ungated_transfer: Scalars['Boolean']['output'];
  is_deleted: Scalars['Boolean']['output'];
  last_guid_creation_num: Scalars['numeric']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  object_address: Scalars['String']['output'];
  owner_address: Scalars['String']['output'];
  state_key_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "current_objects". All fields are combined with a logical 'AND'. */
export type Current_Objects_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Objects_Bool_Exp>>;
  _not?: InputMaybe<Current_Objects_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Objects_Bool_Exp>>;
  allow_ungated_transfer?: InputMaybe<Boolean_Comparison_Exp>;
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>;
  last_guid_creation_num?: InputMaybe<Numeric_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  object_address?: InputMaybe<String_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  state_key_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_objects". */
export type Current_Objects_Order_By = {
  allow_ungated_transfer?: InputMaybe<Order_By>;
  is_deleted?: InputMaybe<Order_By>;
  last_guid_creation_num?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  object_address?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  state_key_hash?: InputMaybe<Order_By>;
};

/** select columns of table "current_objects" */
export enum Current_Objects_Select_Column {
  /** column name */
  AllowUngatedTransfer = 'allow_ungated_transfer',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  LastGuidCreationNum = 'last_guid_creation_num',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  ObjectAddress = 'object_address',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  StateKeyHash = 'state_key_hash'
}

/** Streaming cursor of the table "current_objects" */
export type Current_Objects_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Objects_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Objects_Stream_Cursor_Value_Input = {
  allow_ungated_transfer?: InputMaybe<Scalars['Boolean']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  last_guid_creation_num?: InputMaybe<Scalars['numeric']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  object_address?: InputMaybe<Scalars['String']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  state_key_hash?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "current_staking_pool_voter" */
export type Current_Staking_Pool_Voter = {
  __typename?: 'current_staking_pool_voter';
  last_transaction_version: Scalars['bigint']['output'];
  operator_address: Scalars['String']['output'];
  /** An array relationship */
  operator_aptos_name: Array<Current_Aptos_Names>;
  /** An aggregate relationship */
  operator_aptos_name_aggregate: Current_Aptos_Names_Aggregate;
  staking_pool_address: Scalars['String']['output'];
  voter_address: Scalars['String']['output'];
};


/** columns and relationships of "current_staking_pool_voter" */
export type Current_Staking_Pool_VoterOperator_Aptos_NameArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "current_staking_pool_voter" */
export type Current_Staking_Pool_VoterOperator_Aptos_Name_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "current_staking_pool_voter". All fields are combined with a logical 'AND'. */
export type Current_Staking_Pool_Voter_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Staking_Pool_Voter_Bool_Exp>>;
  _not?: InputMaybe<Current_Staking_Pool_Voter_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Staking_Pool_Voter_Bool_Exp>>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  operator_address?: InputMaybe<String_Comparison_Exp>;
  operator_aptos_name?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  operator_aptos_name_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp>;
  staking_pool_address?: InputMaybe<String_Comparison_Exp>;
  voter_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_staking_pool_voter". */
export type Current_Staking_Pool_Voter_Order_By = {
  last_transaction_version?: InputMaybe<Order_By>;
  operator_address?: InputMaybe<Order_By>;
  operator_aptos_name_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Order_By>;
  staking_pool_address?: InputMaybe<Order_By>;
  voter_address?: InputMaybe<Order_By>;
};

/** select columns of table "current_staking_pool_voter" */
export enum Current_Staking_Pool_Voter_Select_Column {
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  OperatorAddress = 'operator_address',
  /** column name */
  StakingPoolAddress = 'staking_pool_address',
  /** column name */
  VoterAddress = 'voter_address'
}

/** Streaming cursor of the table "current_staking_pool_voter" */
export type Current_Staking_Pool_Voter_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Staking_Pool_Voter_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Staking_Pool_Voter_Stream_Cursor_Value_Input = {
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  operator_address?: InputMaybe<Scalars['String']['input']>;
  staking_pool_address?: InputMaybe<Scalars['String']['input']>;
  voter_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "current_table_items" */
export type Current_Table_Items = {
  __typename?: 'current_table_items';
  decoded_key: Scalars['jsonb']['output'];
  decoded_value?: Maybe<Scalars['jsonb']['output']>;
  is_deleted: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  key_hash: Scalars['String']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  table_handle: Scalars['String']['output'];
};


/** columns and relationships of "current_table_items" */
export type Current_Table_ItemsDecoded_KeyArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "current_table_items" */
export type Current_Table_ItemsDecoded_ValueArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "current_table_items". All fields are combined with a logical 'AND'. */
export type Current_Table_Items_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Table_Items_Bool_Exp>>;
  _not?: InputMaybe<Current_Table_Items_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Table_Items_Bool_Exp>>;
  decoded_key?: InputMaybe<Jsonb_Comparison_Exp>;
  decoded_value?: InputMaybe<Jsonb_Comparison_Exp>;
  is_deleted?: InputMaybe<Boolean_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  key_hash?: InputMaybe<String_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_table_items". */
export type Current_Table_Items_Order_By = {
  decoded_key?: InputMaybe<Order_By>;
  decoded_value?: InputMaybe<Order_By>;
  is_deleted?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  key_hash?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  table_handle?: InputMaybe<Order_By>;
};

/** select columns of table "current_table_items" */
export enum Current_Table_Items_Select_Column {
  /** column name */
  DecodedKey = 'decoded_key',
  /** column name */
  DecodedValue = 'decoded_value',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  Key = 'key',
  /** column name */
  KeyHash = 'key_hash',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  TableHandle = 'table_handle'
}

/** Streaming cursor of the table "current_table_items" */
export type Current_Table_Items_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Table_Items_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Table_Items_Stream_Cursor_Value_Input = {
  decoded_key?: InputMaybe<Scalars['jsonb']['input']>;
  decoded_value?: InputMaybe<Scalars['jsonb']['input']>;
  is_deleted?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  key_hash?: InputMaybe<Scalars['String']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "legacy_migration_v1.current_token_datas" */
export type Current_Token_Datas = {
  __typename?: 'current_token_datas';
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  current_collection_data?: Maybe<Current_Collection_Datas>;
  default_properties?: Maybe<Scalars['jsonb']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  description_mutable?: Maybe<Scalars['Boolean']['output']>;
  largest_property_version?: Maybe<Scalars['numeric']['output']>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  maximum_mutable?: Maybe<Scalars['Boolean']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payee_address?: Maybe<Scalars['String']['output']>;
  properties_mutable?: Maybe<Scalars['Boolean']['output']>;
  royalty_mutable?: Maybe<Scalars['Boolean']['output']>;
  royalty_points_denominator?: Maybe<Scalars['numeric']['output']>;
  royalty_points_numerator?: Maybe<Scalars['numeric']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  uri_mutable?: Maybe<Scalars['Boolean']['output']>;
};


/** columns and relationships of "legacy_migration_v1.current_token_datas" */
export type Current_Token_DatasDefault_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.current_token_datas". All fields are combined with a logical 'AND'. */
export type Current_Token_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Datas_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Datas_Bool_Exp>>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  current_collection_data?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
  default_properties?: InputMaybe<Jsonb_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  description_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  largest_property_version?: InputMaybe<Numeric_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  maximum?: InputMaybe<Numeric_Comparison_Exp>;
  maximum_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  payee_address?: InputMaybe<String_Comparison_Exp>;
  properties_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  royalty_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  royalty_points_denominator?: InputMaybe<Numeric_Comparison_Exp>;
  royalty_points_numerator?: InputMaybe<Numeric_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  token_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  uri_mutable?: InputMaybe<Boolean_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.current_token_datas". */
export type Current_Token_Datas_Order_By = {
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  current_collection_data?: InputMaybe<Current_Collection_Datas_Order_By>;
  default_properties?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  description_mutable?: InputMaybe<Order_By>;
  largest_property_version?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  maximum?: InputMaybe<Order_By>;
  maximum_mutable?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  payee_address?: InputMaybe<Order_By>;
  properties_mutable?: InputMaybe<Order_By>;
  royalty_mutable?: InputMaybe<Order_By>;
  royalty_points_denominator?: InputMaybe<Order_By>;
  royalty_points_numerator?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  uri_mutable?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.current_token_datas" */
export enum Current_Token_Datas_Select_Column {
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  DefaultProperties = 'default_properties',
  /** column name */
  Description = 'description',
  /** column name */
  DescriptionMutable = 'description_mutable',
  /** column name */
  LargestPropertyVersion = 'largest_property_version',
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
  Name = 'name',
  /** column name */
  PayeeAddress = 'payee_address',
  /** column name */
  PropertiesMutable = 'properties_mutable',
  /** column name */
  RoyaltyMutable = 'royalty_mutable',
  /** column name */
  RoyaltyPointsDenominator = 'royalty_points_denominator',
  /** column name */
  RoyaltyPointsNumerator = 'royalty_points_numerator',
  /** column name */
  Supply = 'supply',
  /** column name */
  TokenDataIdHash = 'token_data_id_hash',
  /** column name */
  UriMutable = 'uri_mutable'
}

/** Streaming cursor of the table "current_token_datas" */
export type Current_Token_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Token_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Token_Datas_Stream_Cursor_Value_Input = {
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  default_properties?: InputMaybe<Scalars['jsonb']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  largest_property_version?: InputMaybe<Scalars['numeric']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  maximum?: InputMaybe<Scalars['numeric']['input']>;
  maximum_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payee_address?: InputMaybe<Scalars['String']['input']>;
  properties_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  royalty_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  royalty_points_denominator?: InputMaybe<Scalars['numeric']['input']>;
  royalty_points_numerator?: InputMaybe<Scalars['numeric']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  token_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  uri_mutable?: InputMaybe<Scalars['Boolean']['input']>;
};

/** columns and relationships of "current_token_datas_v2" */
export type Current_Token_Datas_V2 = {
  __typename?: 'current_token_datas_v2';
  /** An object relationship */
  aptos_name?: Maybe<Current_Aptos_Names>;
  /** An object relationship */
  cdn_asset_uris?: Maybe<Nft_Metadata_Crawler_Parsed_Asset_Uris>;
  collection_id: Scalars['String']['output'];
  /** An object relationship */
  current_collection?: Maybe<Current_Collections_V2>;
  /** An object relationship */
  current_royalty_v1?: Maybe<Current_Token_Royalty_V1>;
  /** An array relationship */
  current_token_ownerships: Array<Current_Token_Ownerships_V2>;
  /** An aggregate relationship */
  current_token_ownerships_aggregate: Current_Token_Ownerships_V2_Aggregate;
  decimals?: Maybe<Scalars['bigint']['output']>;
  description: Scalars['String']['output'];
  is_deleted_v2?: Maybe<Scalars['Boolean']['output']>;
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
export type Current_Token_Datas_V2Current_Token_OwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


/** columns and relationships of "current_token_datas_v2" */
export type Current_Token_Datas_V2Current_Token_Ownerships_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


/** columns and relationships of "current_token_datas_v2" */
export type Current_Token_Datas_V2Token_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "current_token_datas_v2". All fields are combined with a logical 'AND'. */
export type Current_Token_Datas_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Datas_V2_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Datas_V2_Bool_Exp>>;
  aptos_name?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  cdn_asset_uris?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  current_collection?: InputMaybe<Current_Collections_V2_Bool_Exp>;
  current_royalty_v1?: InputMaybe<Current_Token_Royalty_V1_Bool_Exp>;
  current_token_ownerships?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
  current_token_ownerships_aggregate?: InputMaybe<Current_Token_Ownerships_V2_Aggregate_Bool_Exp>;
  decimals?: InputMaybe<Bigint_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  is_deleted_v2?: InputMaybe<Boolean_Comparison_Exp>;
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

/** Ordering options when selecting data from "current_token_datas_v2". */
export type Current_Token_Datas_V2_Order_By = {
  aptos_name?: InputMaybe<Current_Aptos_Names_Order_By>;
  cdn_asset_uris?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Order_By>;
  collection_id?: InputMaybe<Order_By>;
  current_collection?: InputMaybe<Current_Collections_V2_Order_By>;
  current_royalty_v1?: InputMaybe<Current_Token_Royalty_V1_Order_By>;
  current_token_ownerships_aggregate?: InputMaybe<Current_Token_Ownerships_V2_Aggregate_Order_By>;
  decimals?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  is_deleted_v2?: InputMaybe<Order_By>;
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
  IsDeletedV2 = 'is_deleted_v2',
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
  is_deleted_v2?: InputMaybe<Scalars['Boolean']['input']>;
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

/** columns and relationships of "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships = {
  __typename?: 'current_token_ownerships';
  amount?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  aptos_name?: Maybe<Current_Aptos_Names>;
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  current_collection_data?: Maybe<Current_Collection_Datas>;
  /** An object relationship */
  current_token_data?: Maybe<Current_Token_Datas>;
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_transaction_version?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  table_type?: Maybe<Scalars['String']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  token_properties?: Maybe<Scalars['jsonb']['output']>;
};


/** columns and relationships of "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_OwnershipsToken_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Aggregate = {
  __typename?: 'current_token_ownerships_aggregate';
  aggregate?: Maybe<Current_Token_Ownerships_Aggregate_Fields>;
  nodes: Array<Current_Token_Ownerships>;
};

export type Current_Token_Ownerships_Aggregate_Bool_Exp = {
  count?: InputMaybe<Current_Token_Ownerships_Aggregate_Bool_Exp_Count>;
};

export type Current_Token_Ownerships_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "legacy_migration_v1.current_token_ownerships" */
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


/** aggregate fields of "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Current_Token_Ownerships_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Aggregate_Order_By = {
  avg?: InputMaybe<Current_Token_Ownerships_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Current_Token_Ownerships_Max_Order_By>;
  min?: InputMaybe<Current_Token_Ownerships_Min_Order_By>;
  stddev?: InputMaybe<Current_Token_Ownerships_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Current_Token_Ownerships_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Current_Token_Ownerships_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Current_Token_Ownerships_Sum_Order_By>;
  var_pop?: InputMaybe<Current_Token_Ownerships_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Current_Token_Ownerships_Var_Samp_Order_By>;
  variance?: InputMaybe<Current_Token_Ownerships_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Current_Token_Ownerships_Avg_Fields = {
  __typename?: 'current_token_ownerships_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.current_token_ownerships". All fields are combined with a logical 'AND'. */
export type Current_Token_Ownerships_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Ownerships_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Ownerships_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Ownerships_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  aptos_name?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  current_collection_data?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
  current_token_data?: InputMaybe<Current_Token_Datas_Bool_Exp>;
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

/** order by max() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Max_Order_By = {
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

/** order by min() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Min_Order_By = {
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
};

/** Ordering options when selecting data from "legacy_migration_v1.current_token_ownerships". */
export type Current_Token_Ownerships_Order_By = {
  amount?: InputMaybe<Order_By>;
  aptos_name?: InputMaybe<Current_Aptos_Names_Order_By>;
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  current_collection_data?: InputMaybe<Current_Collection_Datas_Order_By>;
  current_token_data?: InputMaybe<Current_Token_Datas_Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  table_type?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  token_properties?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.current_token_ownerships" */
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

/** order by stddev() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Current_Token_Ownerships_Stddev_Pop_Fields = {
  __typename?: 'current_token_ownerships_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Current_Token_Ownerships_Stddev_Samp_Fields = {
  __typename?: 'current_token_ownerships_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
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

/** order by sum() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2 = {
  __typename?: 'current_token_ownerships_v2';
  amount: Scalars['numeric']['output'];
  /** An array relationship */
  composed_nfts: Array<Current_Token_Ownerships_V2>;
  /** An aggregate relationship */
  composed_nfts_aggregate: Current_Token_Ownerships_V2_Aggregate;
  /** An object relationship */
  current_token_data?: Maybe<Current_Token_Datas_V2>;
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
export type Current_Token_Ownerships_V2Composed_NftsArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
};


/** columns and relationships of "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2Composed_Nfts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Ownerships_V2_Order_By>>;
  where?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
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

export type Current_Token_Ownerships_V2_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Count>;
};

export type Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_And = {
  arguments: Current_Token_Ownerships_V2_Select_Column_Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Current_Token_Ownerships_V2_Select_Column_Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Current_Token_Ownerships_V2_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Aggregate_Order_By = {
  avg?: InputMaybe<Current_Token_Ownerships_V2_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Current_Token_Ownerships_V2_Max_Order_By>;
  min?: InputMaybe<Current_Token_Ownerships_V2_Min_Order_By>;
  stddev?: InputMaybe<Current_Token_Ownerships_V2_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Current_Token_Ownerships_V2_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Current_Token_Ownerships_V2_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Current_Token_Ownerships_V2_Sum_Order_By>;
  var_pop?: InputMaybe<Current_Token_Ownerships_V2_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Current_Token_Ownerships_V2_Var_Samp_Order_By>;
  variance?: InputMaybe<Current_Token_Ownerships_V2_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Current_Token_Ownerships_V2_Avg_Fields = {
  __typename?: 'current_token_ownerships_v2_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "current_token_ownerships_v2". All fields are combined with a logical 'AND'. */
export type Current_Token_Ownerships_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Ownerships_V2_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Ownerships_V2_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  composed_nfts?: InputMaybe<Current_Token_Ownerships_V2_Bool_Exp>;
  composed_nfts_aggregate?: InputMaybe<Current_Token_Ownerships_V2_Aggregate_Bool_Exp>;
  current_token_data?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
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

/** order by max() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  storage_id?: InputMaybe<Order_By>;
  table_type_v1?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
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

/** order by min() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  storage_id?: InputMaybe<Order_By>;
  table_type_v1?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "current_token_ownerships_v2". */
export type Current_Token_Ownerships_V2_Order_By = {
  amount?: InputMaybe<Order_By>;
  composed_nfts_aggregate?: InputMaybe<Current_Token_Ownerships_V2_Aggregate_Order_By>;
  current_token_data?: InputMaybe<Current_Token_Datas_V2_Order_By>;
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

/** select "current_token_ownerships_v2_aggregate_bool_exp_bool_and_arguments_columns" columns of table "current_token_ownerships_v2" */
export enum Current_Token_Ownerships_V2_Select_Column_Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsFungibleV2 = 'is_fungible_v2',
  /** column name */
  IsSoulboundV2 = 'is_soulbound_v2',
  /** column name */
  NonTransferrableByOwner = 'non_transferrable_by_owner'
}

/** select "current_token_ownerships_v2_aggregate_bool_exp_bool_or_arguments_columns" columns of table "current_token_ownerships_v2" */
export enum Current_Token_Ownerships_V2_Select_Column_Current_Token_Ownerships_V2_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsFungibleV2 = 'is_fungible_v2',
  /** column name */
  IsSoulboundV2 = 'is_soulbound_v2',
  /** column name */
  NonTransferrableByOwner = 'non_transferrable_by_owner'
}

/** aggregate stddev on columns */
export type Current_Token_Ownerships_V2_Stddev_Fields = {
  __typename?: 'current_token_ownerships_v2_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Current_Token_Ownerships_V2_Stddev_Pop_Fields = {
  __typename?: 'current_token_ownerships_v2_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Current_Token_Ownerships_V2_Stddev_Samp_Fields = {
  __typename?: 'current_token_ownerships_v2_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
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

/** order by sum() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Current_Token_Ownerships_V2_Var_Pop_Fields = {
  __typename?: 'current_token_ownerships_v2_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Current_Token_Ownerships_V2_Var_Samp_Fields = {
  __typename?: 'current_token_ownerships_v2_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Current_Token_Ownerships_V2_Variance_Fields = {
  __typename?: 'current_token_ownerships_v2_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "current_token_ownerships_v2" */
export type Current_Token_Ownerships_V2_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Current_Token_Ownerships_Var_Pop_Fields = {
  __typename?: 'current_token_ownerships_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Current_Token_Ownerships_Var_Samp_Fields = {
  __typename?: 'current_token_ownerships_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Current_Token_Ownerships_Variance_Fields = {
  __typename?: 'current_token_ownerships_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  last_transaction_version?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "legacy_migration_v1.current_token_ownerships" */
export type Current_Token_Ownerships_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "current_token_pending_claims" */
export type Current_Token_Pending_Claims = {
  __typename?: 'current_token_pending_claims';
  amount: Scalars['numeric']['output'];
  collection_data_id_hash: Scalars['String']['output'];
  collection_id: Scalars['String']['output'];
  collection_name: Scalars['String']['output'];
  creator_address: Scalars['String']['output'];
  /** An object relationship */
  current_collection_data?: Maybe<Current_Collection_Datas>;
  /** An object relationship */
  current_collection_v2?: Maybe<Current_Collections_V2>;
  /** An object relationship */
  current_token_data?: Maybe<Current_Token_Datas>;
  /** An object relationship */
  current_token_data_v2?: Maybe<Current_Token_Datas_V2>;
  from_address: Scalars['String']['output'];
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  name: Scalars['String']['output'];
  property_version: Scalars['numeric']['output'];
  table_handle: Scalars['String']['output'];
  to_address: Scalars['String']['output'];
  /** An object relationship */
  token?: Maybe<Tokens>;
  token_data_id: Scalars['String']['output'];
  token_data_id_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "current_token_pending_claims". All fields are combined with a logical 'AND'. */
export type Current_Token_Pending_Claims_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Pending_Claims_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Pending_Claims_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Pending_Claims_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_id?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  current_collection_data?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
  current_collection_v2?: InputMaybe<Current_Collections_V2_Bool_Exp>;
  current_token_data?: InputMaybe<Current_Token_Datas_Bool_Exp>;
  current_token_data_v2?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
  from_address?: InputMaybe<String_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  property_version?: InputMaybe<Numeric_Comparison_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
  to_address?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<Tokens_Bool_Exp>;
  token_data_id?: InputMaybe<String_Comparison_Exp>;
  token_data_id_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_token_pending_claims". */
export type Current_Token_Pending_Claims_Order_By = {
  amount?: InputMaybe<Order_By>;
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_id?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  current_collection_data?: InputMaybe<Current_Collection_Datas_Order_By>;
  current_collection_v2?: InputMaybe<Current_Collections_V2_Order_By>;
  current_token_data?: InputMaybe<Current_Token_Datas_Order_By>;
  current_token_data_v2?: InputMaybe<Current_Token_Datas_V2_Order_By>;
  from_address?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  table_handle?: InputMaybe<Order_By>;
  to_address?: InputMaybe<Order_By>;
  token?: InputMaybe<Tokens_Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
};

/** select columns of table "current_token_pending_claims" */
export enum Current_Token_Pending_Claims_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionId = 'collection_id',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  FromAddress = 'from_address',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  Name = 'name',
  /** column name */
  PropertyVersion = 'property_version',
  /** column name */
  TableHandle = 'table_handle',
  /** column name */
  ToAddress = 'to_address',
  /** column name */
  TokenDataId = 'token_data_id',
  /** column name */
  TokenDataIdHash = 'token_data_id_hash'
}

/** Streaming cursor of the table "current_token_pending_claims" */
export type Current_Token_Pending_Claims_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Token_Pending_Claims_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Token_Pending_Claims_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_id?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  from_address?: InputMaybe<Scalars['String']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  property_version?: InputMaybe<Scalars['numeric']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
  to_address?: InputMaybe<Scalars['String']['input']>;
  token_data_id?: InputMaybe<Scalars['String']['input']>;
  token_data_id_hash?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "current_token_royalty_v1" */
export type Current_Token_Royalty_V1 = {
  __typename?: 'current_token_royalty_v1';
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  payee_address: Scalars['String']['output'];
  royalty_points_denominator: Scalars['numeric']['output'];
  royalty_points_numerator: Scalars['numeric']['output'];
  token_data_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "current_token_royalty_v1". All fields are combined with a logical 'AND'. */
export type Current_Token_Royalty_V1_Bool_Exp = {
  _and?: InputMaybe<Array<Current_Token_Royalty_V1_Bool_Exp>>;
  _not?: InputMaybe<Current_Token_Royalty_V1_Bool_Exp>;
  _or?: InputMaybe<Array<Current_Token_Royalty_V1_Bool_Exp>>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  payee_address?: InputMaybe<String_Comparison_Exp>;
  royalty_points_denominator?: InputMaybe<Numeric_Comparison_Exp>;
  royalty_points_numerator?: InputMaybe<Numeric_Comparison_Exp>;
  token_data_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "current_token_royalty_v1". */
export type Current_Token_Royalty_V1_Order_By = {
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  payee_address?: InputMaybe<Order_By>;
  royalty_points_denominator?: InputMaybe<Order_By>;
  royalty_points_numerator?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
};

/** select columns of table "current_token_royalty_v1" */
export enum Current_Token_Royalty_V1_Select_Column {
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  PayeeAddress = 'payee_address',
  /** column name */
  RoyaltyPointsDenominator = 'royalty_points_denominator',
  /** column name */
  RoyaltyPointsNumerator = 'royalty_points_numerator',
  /** column name */
  TokenDataId = 'token_data_id'
}

/** Streaming cursor of the table "current_token_royalty_v1" */
export type Current_Token_Royalty_V1_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Current_Token_Royalty_V1_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Current_Token_Royalty_V1_Stream_Cursor_Value_Input = {
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  payee_address?: InputMaybe<Scalars['String']['input']>;
  royalty_points_denominator?: InputMaybe<Scalars['numeric']['input']>;
  royalty_points_numerator?: InputMaybe<Scalars['numeric']['input']>;
  token_data_id?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "delegated_staking_activities" */
export type Delegated_Staking_Activities = {
  __typename?: 'delegated_staking_activities';
  amount: Scalars['numeric']['output'];
  delegator_address: Scalars['String']['output'];
  event_index: Scalars['bigint']['output'];
  event_type: Scalars['String']['output'];
  pool_address: Scalars['String']['output'];
  transaction_version: Scalars['bigint']['output'];
};

/** order by aggregate values of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Aggregate_Order_By = {
  avg?: InputMaybe<Delegated_Staking_Activities_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Delegated_Staking_Activities_Max_Order_By>;
  min?: InputMaybe<Delegated_Staking_Activities_Min_Order_By>;
  stddev?: InputMaybe<Delegated_Staking_Activities_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Delegated_Staking_Activities_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Delegated_Staking_Activities_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Delegated_Staking_Activities_Sum_Order_By>;
  var_pop?: InputMaybe<Delegated_Staking_Activities_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Delegated_Staking_Activities_Var_Samp_Order_By>;
  variance?: InputMaybe<Delegated_Staking_Activities_Variance_Order_By>;
};

/** order by avg() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "delegated_staking_activities". All fields are combined with a logical 'AND'. */
export type Delegated_Staking_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Delegated_Staking_Activities_Bool_Exp>>;
  _not?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Delegated_Staking_Activities_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  delegator_address?: InputMaybe<String_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  event_type?: InputMaybe<String_Comparison_Exp>;
  pool_address?: InputMaybe<String_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** order by max() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  delegator_address?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  pool_address?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  delegator_address?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  pool_address?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "delegated_staking_activities". */
export type Delegated_Staking_Activities_Order_By = {
  amount?: InputMaybe<Order_By>;
  delegator_address?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  pool_address?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "delegated_staking_activities" */
export enum Delegated_Staking_Activities_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DelegatorAddress = 'delegator_address',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  EventType = 'event_type',
  /** column name */
  PoolAddress = 'pool_address',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** order by stddev() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Delegated_Staking_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Delegated_Staking_Activities_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  delegator_address?: InputMaybe<Scalars['String']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  event_type?: InputMaybe<Scalars['String']['input']>;
  pool_address?: InputMaybe<Scalars['String']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** order by sum() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "delegated_staking_activities" */
export type Delegated_Staking_Activities_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "delegated_staking_pool_balances" */
export type Delegated_Staking_Pool_Balances = {
  __typename?: 'delegated_staking_pool_balances';
  active_table_handle: Scalars['String']['output'];
  inactive_table_handle: Scalars['String']['output'];
  operator_commission_percentage: Scalars['numeric']['output'];
  staking_pool_address: Scalars['String']['output'];
  total_coins: Scalars['numeric']['output'];
  total_shares: Scalars['numeric']['output'];
  transaction_version: Scalars['bigint']['output'];
};

/** aggregated selection of "delegated_staking_pool_balances" */
export type Delegated_Staking_Pool_Balances_Aggregate = {
  __typename?: 'delegated_staking_pool_balances_aggregate';
  aggregate?: Maybe<Delegated_Staking_Pool_Balances_Aggregate_Fields>;
  nodes: Array<Delegated_Staking_Pool_Balances>;
};

/** aggregate fields of "delegated_staking_pool_balances" */
export type Delegated_Staking_Pool_Balances_Aggregate_Fields = {
  __typename?: 'delegated_staking_pool_balances_aggregate_fields';
  avg?: Maybe<Delegated_Staking_Pool_Balances_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Delegated_Staking_Pool_Balances_Max_Fields>;
  min?: Maybe<Delegated_Staking_Pool_Balances_Min_Fields>;
  stddev?: Maybe<Delegated_Staking_Pool_Balances_Stddev_Fields>;
  stddev_pop?: Maybe<Delegated_Staking_Pool_Balances_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Delegated_Staking_Pool_Balances_Stddev_Samp_Fields>;
  sum?: Maybe<Delegated_Staking_Pool_Balances_Sum_Fields>;
  var_pop?: Maybe<Delegated_Staking_Pool_Balances_Var_Pop_Fields>;
  var_samp?: Maybe<Delegated_Staking_Pool_Balances_Var_Samp_Fields>;
  variance?: Maybe<Delegated_Staking_Pool_Balances_Variance_Fields>;
};


/** aggregate fields of "delegated_staking_pool_balances" */
export type Delegated_Staking_Pool_Balances_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Delegated_Staking_Pool_Balances_Avg_Fields = {
  __typename?: 'delegated_staking_pool_balances_avg_fields';
  operator_commission_percentage?: Maybe<Scalars['Float']['output']>;
  total_coins?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "delegated_staking_pool_balances". All fields are combined with a logical 'AND'. */
export type Delegated_Staking_Pool_Balances_Bool_Exp = {
  _and?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Bool_Exp>>;
  _not?: InputMaybe<Delegated_Staking_Pool_Balances_Bool_Exp>;
  _or?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Bool_Exp>>;
  active_table_handle?: InputMaybe<String_Comparison_Exp>;
  inactive_table_handle?: InputMaybe<String_Comparison_Exp>;
  operator_commission_percentage?: InputMaybe<Numeric_Comparison_Exp>;
  staking_pool_address?: InputMaybe<String_Comparison_Exp>;
  total_coins?: InputMaybe<Numeric_Comparison_Exp>;
  total_shares?: InputMaybe<Numeric_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Delegated_Staking_Pool_Balances_Max_Fields = {
  __typename?: 'delegated_staking_pool_balances_max_fields';
  active_table_handle?: Maybe<Scalars['String']['output']>;
  inactive_table_handle?: Maybe<Scalars['String']['output']>;
  operator_commission_percentage?: Maybe<Scalars['numeric']['output']>;
  staking_pool_address?: Maybe<Scalars['String']['output']>;
  total_coins?: Maybe<Scalars['numeric']['output']>;
  total_shares?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Delegated_Staking_Pool_Balances_Min_Fields = {
  __typename?: 'delegated_staking_pool_balances_min_fields';
  active_table_handle?: Maybe<Scalars['String']['output']>;
  inactive_table_handle?: Maybe<Scalars['String']['output']>;
  operator_commission_percentage?: Maybe<Scalars['numeric']['output']>;
  staking_pool_address?: Maybe<Scalars['String']['output']>;
  total_coins?: Maybe<Scalars['numeric']['output']>;
  total_shares?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "delegated_staking_pool_balances". */
export type Delegated_Staking_Pool_Balances_Order_By = {
  active_table_handle?: InputMaybe<Order_By>;
  inactive_table_handle?: InputMaybe<Order_By>;
  operator_commission_percentage?: InputMaybe<Order_By>;
  staking_pool_address?: InputMaybe<Order_By>;
  total_coins?: InputMaybe<Order_By>;
  total_shares?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "delegated_staking_pool_balances" */
export enum Delegated_Staking_Pool_Balances_Select_Column {
  /** column name */
  ActiveTableHandle = 'active_table_handle',
  /** column name */
  InactiveTableHandle = 'inactive_table_handle',
  /** column name */
  OperatorCommissionPercentage = 'operator_commission_percentage',
  /** column name */
  StakingPoolAddress = 'staking_pool_address',
  /** column name */
  TotalCoins = 'total_coins',
  /** column name */
  TotalShares = 'total_shares',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** aggregate stddev on columns */
export type Delegated_Staking_Pool_Balances_Stddev_Fields = {
  __typename?: 'delegated_staking_pool_balances_stddev_fields';
  operator_commission_percentage?: Maybe<Scalars['Float']['output']>;
  total_coins?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Delegated_Staking_Pool_Balances_Stddev_Pop_Fields = {
  __typename?: 'delegated_staking_pool_balances_stddev_pop_fields';
  operator_commission_percentage?: Maybe<Scalars['Float']['output']>;
  total_coins?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Delegated_Staking_Pool_Balances_Stddev_Samp_Fields = {
  __typename?: 'delegated_staking_pool_balances_stddev_samp_fields';
  operator_commission_percentage?: Maybe<Scalars['Float']['output']>;
  total_coins?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "delegated_staking_pool_balances" */
export type Delegated_Staking_Pool_Balances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Delegated_Staking_Pool_Balances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Delegated_Staking_Pool_Balances_Stream_Cursor_Value_Input = {
  active_table_handle?: InputMaybe<Scalars['String']['input']>;
  inactive_table_handle?: InputMaybe<Scalars['String']['input']>;
  operator_commission_percentage?: InputMaybe<Scalars['numeric']['input']>;
  staking_pool_address?: InputMaybe<Scalars['String']['input']>;
  total_coins?: InputMaybe<Scalars['numeric']['input']>;
  total_shares?: InputMaybe<Scalars['numeric']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Delegated_Staking_Pool_Balances_Sum_Fields = {
  __typename?: 'delegated_staking_pool_balances_sum_fields';
  operator_commission_percentage?: Maybe<Scalars['numeric']['output']>;
  total_coins?: Maybe<Scalars['numeric']['output']>;
  total_shares?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Delegated_Staking_Pool_Balances_Var_Pop_Fields = {
  __typename?: 'delegated_staking_pool_balances_var_pop_fields';
  operator_commission_percentage?: Maybe<Scalars['Float']['output']>;
  total_coins?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Delegated_Staking_Pool_Balances_Var_Samp_Fields = {
  __typename?: 'delegated_staking_pool_balances_var_samp_fields';
  operator_commission_percentage?: Maybe<Scalars['Float']['output']>;
  total_coins?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Delegated_Staking_Pool_Balances_Variance_Fields = {
  __typename?: 'delegated_staking_pool_balances_variance_fields';
  operator_commission_percentage?: Maybe<Scalars['Float']['output']>;
  total_coins?: Maybe<Scalars['Float']['output']>;
  total_shares?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "delegated_staking_pools" */
export type Delegated_Staking_Pools = {
  __typename?: 'delegated_staking_pools';
  /** An object relationship */
  current_staking_pool?: Maybe<Current_Staking_Pool_Voter>;
  first_transaction_version: Scalars['bigint']['output'];
  staking_pool_address: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "delegated_staking_pools". All fields are combined with a logical 'AND'. */
export type Delegated_Staking_Pools_Bool_Exp = {
  _and?: InputMaybe<Array<Delegated_Staking_Pools_Bool_Exp>>;
  _not?: InputMaybe<Delegated_Staking_Pools_Bool_Exp>;
  _or?: InputMaybe<Array<Delegated_Staking_Pools_Bool_Exp>>;
  current_staking_pool?: InputMaybe<Current_Staking_Pool_Voter_Bool_Exp>;
  first_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  staking_pool_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "delegated_staking_pools". */
export type Delegated_Staking_Pools_Order_By = {
  current_staking_pool?: InputMaybe<Current_Staking_Pool_Voter_Order_By>;
  first_transaction_version?: InputMaybe<Order_By>;
  staking_pool_address?: InputMaybe<Order_By>;
};

/** select columns of table "delegated_staking_pools" */
export enum Delegated_Staking_Pools_Select_Column {
  /** column name */
  FirstTransactionVersion = 'first_transaction_version',
  /** column name */
  StakingPoolAddress = 'staking_pool_address'
}

/** Streaming cursor of the table "delegated_staking_pools" */
export type Delegated_Staking_Pools_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Delegated_Staking_Pools_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Delegated_Staking_Pools_Stream_Cursor_Value_Input = {
  first_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  staking_pool_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "delegator_distinct_pool" */
export type Delegator_Distinct_Pool = {
  __typename?: 'delegator_distinct_pool';
  /** An object relationship */
  current_pool_balance?: Maybe<Current_Delegated_Staking_Pool_Balances>;
  delegator_address?: Maybe<Scalars['String']['output']>;
  pool_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  staking_pool_metadata?: Maybe<Current_Staking_Pool_Voter>;
};

/** aggregated selection of "delegator_distinct_pool" */
export type Delegator_Distinct_Pool_Aggregate = {
  __typename?: 'delegator_distinct_pool_aggregate';
  aggregate?: Maybe<Delegator_Distinct_Pool_Aggregate_Fields>;
  nodes: Array<Delegator_Distinct_Pool>;
};

/** aggregate fields of "delegator_distinct_pool" */
export type Delegator_Distinct_Pool_Aggregate_Fields = {
  __typename?: 'delegator_distinct_pool_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Delegator_Distinct_Pool_Max_Fields>;
  min?: Maybe<Delegator_Distinct_Pool_Min_Fields>;
};


/** aggregate fields of "delegator_distinct_pool" */
export type Delegator_Distinct_Pool_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Delegator_Distinct_Pool_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "delegator_distinct_pool". All fields are combined with a logical 'AND'. */
export type Delegator_Distinct_Pool_Bool_Exp = {
  _and?: InputMaybe<Array<Delegator_Distinct_Pool_Bool_Exp>>;
  _not?: InputMaybe<Delegator_Distinct_Pool_Bool_Exp>;
  _or?: InputMaybe<Array<Delegator_Distinct_Pool_Bool_Exp>>;
  current_pool_balance?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Bool_Exp>;
  delegator_address?: InputMaybe<String_Comparison_Exp>;
  pool_address?: InputMaybe<String_Comparison_Exp>;
  staking_pool_metadata?: InputMaybe<Current_Staking_Pool_Voter_Bool_Exp>;
};

/** aggregate max on columns */
export type Delegator_Distinct_Pool_Max_Fields = {
  __typename?: 'delegator_distinct_pool_max_fields';
  delegator_address?: Maybe<Scalars['String']['output']>;
  pool_address?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Delegator_Distinct_Pool_Min_Fields = {
  __typename?: 'delegator_distinct_pool_min_fields';
  delegator_address?: Maybe<Scalars['String']['output']>;
  pool_address?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "delegator_distinct_pool". */
export type Delegator_Distinct_Pool_Order_By = {
  current_pool_balance?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Order_By>;
  delegator_address?: InputMaybe<Order_By>;
  pool_address?: InputMaybe<Order_By>;
  staking_pool_metadata?: InputMaybe<Current_Staking_Pool_Voter_Order_By>;
};

/** select columns of table "delegator_distinct_pool" */
export enum Delegator_Distinct_Pool_Select_Column {
  /** column name */
  DelegatorAddress = 'delegator_address',
  /** column name */
  PoolAddress = 'pool_address'
}

/** Streaming cursor of the table "delegator_distinct_pool" */
export type Delegator_Distinct_Pool_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Delegator_Distinct_Pool_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Delegator_Distinct_Pool_Stream_Cursor_Value_Input = {
  delegator_address?: InputMaybe<Scalars['String']['input']>;
  pool_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  account_address: Scalars['String']['output'];
  creation_number: Scalars['bigint']['output'];
  data: Scalars['jsonb']['output'];
  event_index: Scalars['bigint']['output'];
  indexed_type: Scalars['String']['output'];
  sequence_number: Scalars['bigint']['output'];
  transaction_block_height: Scalars['bigint']['output'];
  transaction_version: Scalars['bigint']['output'];
  type: Scalars['String']['output'];
};


/** columns and relationships of "events" */
export type EventsDataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  account_address?: InputMaybe<String_Comparison_Exp>;
  creation_number?: InputMaybe<Bigint_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  indexed_type?: InputMaybe<String_Comparison_Exp>;
  sequence_number?: InputMaybe<Bigint_Comparison_Exp>;
  transaction_block_height?: InputMaybe<Bigint_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  account_address?: InputMaybe<Order_By>;
  creation_number?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  indexed_type?: InputMaybe<Order_By>;
  sequence_number?: InputMaybe<Order_By>;
  transaction_block_height?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  AccountAddress = 'account_address',
  /** column name */
  CreationNumber = 'creation_number',
  /** column name */
  Data = 'data',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  IndexedType = 'indexed_type',
  /** column name */
  SequenceNumber = 'sequence_number',
  /** column name */
  TransactionBlockHeight = 'transaction_block_height',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  account_address?: InputMaybe<Scalars['String']['input']>;
  creation_number?: InputMaybe<Scalars['bigint']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  indexed_type?: InputMaybe<Scalars['String']['input']>;
  sequence_number?: InputMaybe<Scalars['bigint']['input']>;
  transaction_block_height?: InputMaybe<Scalars['bigint']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "fungible_asset_activities" */
export type Fungible_Asset_Activities = {
  __typename?: 'fungible_asset_activities';
  amount?: Maybe<Scalars['numeric']['output']>;
  asset_type?: Maybe<Scalars['String']['output']>;
  block_height: Scalars['bigint']['output'];
  entry_function_id_str?: Maybe<Scalars['String']['output']>;
  event_index: Scalars['bigint']['output'];
  gas_fee_payer_address?: Maybe<Scalars['String']['output']>;
  is_frozen?: Maybe<Scalars['Boolean']['output']>;
  is_gas_fee: Scalars['Boolean']['output'];
  is_transaction_success: Scalars['Boolean']['output'];
  /** An object relationship */
  metadata?: Maybe<Fungible_Asset_Metadata>;
  owner_address?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  owner_aptos_names: Array<Current_Aptos_Names>;
  /** An aggregate relationship */
  owner_aptos_names_aggregate: Current_Aptos_Names_Aggregate;
  storage_id: Scalars['String']['output'];
  storage_refund_amount?: Maybe<Scalars['numeric']['output']>;
  token_standard: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  type: Scalars['String']['output'];
};


/** columns and relationships of "fungible_asset_activities" */
export type Fungible_Asset_ActivitiesOwner_Aptos_NamesArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "fungible_asset_activities" */
export type Fungible_Asset_ActivitiesOwner_Aptos_Names_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};

/** order by aggregate values of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Aggregate_Order_By = {
  avg?: InputMaybe<Fungible_Asset_Activities_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Fungible_Asset_Activities_Max_Order_By>;
  min?: InputMaybe<Fungible_Asset_Activities_Min_Order_By>;
  stddev?: InputMaybe<Fungible_Asset_Activities_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Fungible_Asset_Activities_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Fungible_Asset_Activities_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Fungible_Asset_Activities_Sum_Order_By>;
  var_pop?: InputMaybe<Fungible_Asset_Activities_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Fungible_Asset_Activities_Var_Samp_Order_By>;
  variance?: InputMaybe<Fungible_Asset_Activities_Variance_Order_By>;
};

/** order by avg() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "fungible_asset_activities". All fields are combined with a logical 'AND'. */
export type Fungible_Asset_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Fungible_Asset_Activities_Bool_Exp>>;
  _not?: InputMaybe<Fungible_Asset_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Fungible_Asset_Activities_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  asset_type?: InputMaybe<String_Comparison_Exp>;
  block_height?: InputMaybe<Bigint_Comparison_Exp>;
  entry_function_id_str?: InputMaybe<String_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  gas_fee_payer_address?: InputMaybe<String_Comparison_Exp>;
  is_frozen?: InputMaybe<Boolean_Comparison_Exp>;
  is_gas_fee?: InputMaybe<Boolean_Comparison_Exp>;
  is_transaction_success?: InputMaybe<Boolean_Comparison_Exp>;
  metadata?: InputMaybe<Fungible_Asset_Metadata_Bool_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  owner_aptos_names?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  owner_aptos_names_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp>;
  storage_id?: InputMaybe<String_Comparison_Exp>;
  storage_refund_amount?: InputMaybe<Numeric_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset_type?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  gas_fee_payer_address?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  storage_id?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset_type?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  gas_fee_payer_address?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  storage_id?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "fungible_asset_activities". */
export type Fungible_Asset_Activities_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset_type?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  gas_fee_payer_address?: InputMaybe<Order_By>;
  is_frozen?: InputMaybe<Order_By>;
  is_gas_fee?: InputMaybe<Order_By>;
  is_transaction_success?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Fungible_Asset_Metadata_Order_By>;
  owner_address?: InputMaybe<Order_By>;
  owner_aptos_names_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Order_By>;
  storage_id?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "fungible_asset_activities" */
export enum Fungible_Asset_Activities_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  AssetType = 'asset_type',
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  EntryFunctionIdStr = 'entry_function_id_str',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  GasFeePayerAddress = 'gas_fee_payer_address',
  /** column name */
  IsFrozen = 'is_frozen',
  /** column name */
  IsGasFee = 'is_gas_fee',
  /** column name */
  IsTransactionSuccess = 'is_transaction_success',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  StorageId = 'storage_id',
  /** column name */
  StorageRefundAmount = 'storage_refund_amount',
  /** column name */
  TokenStandard = 'token_standard',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  Type = 'type'
}

/** order by stddev() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Fungible_Asset_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Fungible_Asset_Activities_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  asset_type?: InputMaybe<Scalars['String']['input']>;
  block_height?: InputMaybe<Scalars['bigint']['input']>;
  entry_function_id_str?: InputMaybe<Scalars['String']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  gas_fee_payer_address?: InputMaybe<Scalars['String']['input']>;
  is_frozen?: InputMaybe<Scalars['Boolean']['input']>;
  is_gas_fee?: InputMaybe<Scalars['Boolean']['input']>;
  is_transaction_success?: InputMaybe<Scalars['Boolean']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  storage_id?: InputMaybe<Scalars['String']['input']>;
  storage_refund_amount?: InputMaybe<Scalars['numeric']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "fungible_asset_activities" */
export type Fungible_Asset_Activities_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  block_height?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  storage_refund_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "fungible_asset_metadata" */
export type Fungible_Asset_Metadata = {
  __typename?: 'fungible_asset_metadata';
  asset_type: Scalars['String']['output'];
  creator_address: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  icon_uri?: Maybe<Scalars['String']['output']>;
  last_transaction_timestamp: Scalars['timestamp']['output'];
  last_transaction_version: Scalars['bigint']['output'];
  maximum_v2?: Maybe<Scalars['numeric']['output']>;
  name: Scalars['String']['output'];
  project_uri?: Maybe<Scalars['String']['output']>;
  supply_aggregator_table_handle_v1?: Maybe<Scalars['String']['output']>;
  supply_aggregator_table_key_v1?: Maybe<Scalars['String']['output']>;
  supply_v2?: Maybe<Scalars['numeric']['output']>;
  symbol: Scalars['String']['output'];
  token_standard: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "fungible_asset_metadata". All fields are combined with a logical 'AND'. */
export type Fungible_Asset_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Fungible_Asset_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Fungible_Asset_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Fungible_Asset_Metadata_Bool_Exp>>;
  asset_type?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  decimals?: InputMaybe<Int_Comparison_Exp>;
  icon_uri?: InputMaybe<String_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  maximum_v2?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  project_uri?: InputMaybe<String_Comparison_Exp>;
  supply_aggregator_table_handle_v1?: InputMaybe<String_Comparison_Exp>;
  supply_aggregator_table_key_v1?: InputMaybe<String_Comparison_Exp>;
  supply_v2?: InputMaybe<Numeric_Comparison_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "fungible_asset_metadata". */
export type Fungible_Asset_Metadata_Order_By = {
  asset_type?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  icon_uri?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_transaction_version?: InputMaybe<Order_By>;
  maximum_v2?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_uri?: InputMaybe<Order_By>;
  supply_aggregator_table_handle_v1?: InputMaybe<Order_By>;
  supply_aggregator_table_key_v1?: InputMaybe<Order_By>;
  supply_v2?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
};

/** select columns of table "fungible_asset_metadata" */
export enum Fungible_Asset_Metadata_Select_Column {
  /** column name */
  AssetType = 'asset_type',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  Decimals = 'decimals',
  /** column name */
  IconUri = 'icon_uri',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastTransactionVersion = 'last_transaction_version',
  /** column name */
  MaximumV2 = 'maximum_v2',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectUri = 'project_uri',
  /** column name */
  SupplyAggregatorTableHandleV1 = 'supply_aggregator_table_handle_v1',
  /** column name */
  SupplyAggregatorTableKeyV1 = 'supply_aggregator_table_key_v1',
  /** column name */
  SupplyV2 = 'supply_v2',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  TokenStandard = 'token_standard'
}

/** Streaming cursor of the table "fungible_asset_metadata" */
export type Fungible_Asset_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Fungible_Asset_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Fungible_Asset_Metadata_Stream_Cursor_Value_Input = {
  asset_type?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  icon_uri?: InputMaybe<Scalars['String']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  maximum_v2?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_uri?: InputMaybe<Scalars['String']['input']>;
  supply_aggregator_table_handle_v1?: InputMaybe<Scalars['String']['input']>;
  supply_aggregator_table_key_v1?: InputMaybe<Scalars['String']['input']>;
  supply_v2?: InputMaybe<Scalars['numeric']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "indexer_status" */
export type Indexer_Status = {
  __typename?: 'indexer_status';
  db: Scalars['String']['output'];
  is_indexer_up: Scalars['Boolean']['output'];
};

/** Boolean expression to filter rows from the table "indexer_status". All fields are combined with a logical 'AND'. */
export type Indexer_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Indexer_Status_Bool_Exp>>;
  _not?: InputMaybe<Indexer_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Indexer_Status_Bool_Exp>>;
  db?: InputMaybe<String_Comparison_Exp>;
  is_indexer_up?: InputMaybe<Boolean_Comparison_Exp>;
};

/** Ordering options when selecting data from "indexer_status". */
export type Indexer_Status_Order_By = {
  db?: InputMaybe<Order_By>;
  is_indexer_up?: InputMaybe<Order_By>;
};

/** select columns of table "indexer_status" */
export enum Indexer_Status_Select_Column {
  /** column name */
  Db = 'db',
  /** column name */
  IsIndexerUp = 'is_indexer_up'
}

/** Streaming cursor of the table "indexer_status" */
export type Indexer_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Indexer_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Indexer_Status_Stream_Cursor_Value_Input = {
  db?: InputMaybe<Scalars['String']['input']>;
  is_indexer_up?: InputMaybe<Scalars['Boolean']['input']>;
};

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

/** columns and relationships of "processor_metadata.ledger_infos" */
export type Ledger_Infos = {
  __typename?: 'ledger_infos';
  chain_id: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "processor_metadata.ledger_infos". All fields are combined with a logical 'AND'. */
export type Ledger_Infos_Bool_Exp = {
  _and?: InputMaybe<Array<Ledger_Infos_Bool_Exp>>;
  _not?: InputMaybe<Ledger_Infos_Bool_Exp>;
  _or?: InputMaybe<Array<Ledger_Infos_Bool_Exp>>;
  chain_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "processor_metadata.ledger_infos". */
export type Ledger_Infos_Order_By = {
  chain_id?: InputMaybe<Order_By>;
};

/** select columns of table "processor_metadata.ledger_infos" */
export enum Ledger_Infos_Select_Column {
  /** column name */
  ChainId = 'chain_id'
}

/** Streaming cursor of the table "ledger_infos" */
export type Ledger_Infos_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ledger_Infos_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ledger_Infos_Stream_Cursor_Value_Input = {
  chain_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "legacy_migration_v1.move_resources" */
export type Move_Resources = {
  __typename?: 'move_resources';
  address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregated selection of "legacy_migration_v1.move_resources" */
export type Move_Resources_Aggregate = {
  __typename?: 'move_resources_aggregate';
  aggregate?: Maybe<Move_Resources_Aggregate_Fields>;
  nodes: Array<Move_Resources>;
};

/** aggregate fields of "legacy_migration_v1.move_resources" */
export type Move_Resources_Aggregate_Fields = {
  __typename?: 'move_resources_aggregate_fields';
  avg?: Maybe<Move_Resources_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Move_Resources_Max_Fields>;
  min?: Maybe<Move_Resources_Min_Fields>;
  stddev?: Maybe<Move_Resources_Stddev_Fields>;
  stddev_pop?: Maybe<Move_Resources_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Move_Resources_Stddev_Samp_Fields>;
  sum?: Maybe<Move_Resources_Sum_Fields>;
  var_pop?: Maybe<Move_Resources_Var_Pop_Fields>;
  var_samp?: Maybe<Move_Resources_Var_Samp_Fields>;
  variance?: Maybe<Move_Resources_Variance_Fields>;
};


/** aggregate fields of "legacy_migration_v1.move_resources" */
export type Move_Resources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Move_Resources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Move_Resources_Avg_Fields = {
  __typename?: 'move_resources_avg_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.move_resources". All fields are combined with a logical 'AND'. */
export type Move_Resources_Bool_Exp = {
  _and?: InputMaybe<Array<Move_Resources_Bool_Exp>>;
  _not?: InputMaybe<Move_Resources_Bool_Exp>;
  _or?: InputMaybe<Array<Move_Resources_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Move_Resources_Max_Fields = {
  __typename?: 'move_resources_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate min on columns */
export type Move_Resources_Min_Fields = {
  __typename?: 'move_resources_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** Ordering options when selecting data from "legacy_migration_v1.move_resources". */
export type Move_Resources_Order_By = {
  address?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.move_resources" */
export enum Move_Resources_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** aggregate stddev on columns */
export type Move_Resources_Stddev_Fields = {
  __typename?: 'move_resources_stddev_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Move_Resources_Stddev_Pop_Fields = {
  __typename?: 'move_resources_stddev_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Move_Resources_Stddev_Samp_Fields = {
  __typename?: 'move_resources_stddev_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "move_resources" */
export type Move_Resources_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Move_Resources_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Move_Resources_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Move_Resources_Sum_Fields = {
  __typename?: 'move_resources_sum_fields';
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Move_Resources_Var_Pop_Fields = {
  __typename?: 'move_resources_var_pop_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Move_Resources_Var_Samp_Fields = {
  __typename?: 'move_resources_var_samp_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Move_Resources_Variance_Fields = {
  __typename?: 'move_resources_variance_fields';
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "nft_metadata_crawler.parsed_asset_uris" */
export type Nft_Metadata_Crawler_Parsed_Asset_Uris = {
  __typename?: 'nft_metadata_crawler_parsed_asset_uris';
  animation_optimizer_retry_count: Scalars['Int']['output'];
  asset_uri: Scalars['String']['output'];
  cdn_animation_uri?: Maybe<Scalars['String']['output']>;
  cdn_image_uri?: Maybe<Scalars['String']['output']>;
  cdn_json_uri?: Maybe<Scalars['String']['output']>;
  image_optimizer_retry_count: Scalars['Int']['output'];
  json_parser_retry_count: Scalars['Int']['output'];
  raw_animation_uri?: Maybe<Scalars['String']['output']>;
  raw_image_uri?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "nft_metadata_crawler.parsed_asset_uris". All fields are combined with a logical 'AND'. */
export type Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp = {
  _and?: InputMaybe<Array<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>>;
  _not?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>;
  _or?: InputMaybe<Array<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>>;
  animation_optimizer_retry_count?: InputMaybe<Int_Comparison_Exp>;
  asset_uri?: InputMaybe<String_Comparison_Exp>;
  cdn_animation_uri?: InputMaybe<String_Comparison_Exp>;
  cdn_image_uri?: InputMaybe<String_Comparison_Exp>;
  cdn_json_uri?: InputMaybe<String_Comparison_Exp>;
  image_optimizer_retry_count?: InputMaybe<Int_Comparison_Exp>;
  json_parser_retry_count?: InputMaybe<Int_Comparison_Exp>;
  raw_animation_uri?: InputMaybe<String_Comparison_Exp>;
  raw_image_uri?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "nft_metadata_crawler.parsed_asset_uris". */
export type Nft_Metadata_Crawler_Parsed_Asset_Uris_Order_By = {
  animation_optimizer_retry_count?: InputMaybe<Order_By>;
  asset_uri?: InputMaybe<Order_By>;
  cdn_animation_uri?: InputMaybe<Order_By>;
  cdn_image_uri?: InputMaybe<Order_By>;
  cdn_json_uri?: InputMaybe<Order_By>;
  image_optimizer_retry_count?: InputMaybe<Order_By>;
  json_parser_retry_count?: InputMaybe<Order_By>;
  raw_animation_uri?: InputMaybe<Order_By>;
  raw_image_uri?: InputMaybe<Order_By>;
};

/** select columns of table "nft_metadata_crawler.parsed_asset_uris" */
export enum Nft_Metadata_Crawler_Parsed_Asset_Uris_Select_Column {
  /** column name */
  AnimationOptimizerRetryCount = 'animation_optimizer_retry_count',
  /** column name */
  AssetUri = 'asset_uri',
  /** column name */
  CdnAnimationUri = 'cdn_animation_uri',
  /** column name */
  CdnImageUri = 'cdn_image_uri',
  /** column name */
  CdnJsonUri = 'cdn_json_uri',
  /** column name */
  ImageOptimizerRetryCount = 'image_optimizer_retry_count',
  /** column name */
  JsonParserRetryCount = 'json_parser_retry_count',
  /** column name */
  RawAnimationUri = 'raw_animation_uri',
  /** column name */
  RawImageUri = 'raw_image_uri'
}

/** Streaming cursor of the table "nft_metadata_crawler_parsed_asset_uris" */
export type Nft_Metadata_Crawler_Parsed_Asset_Uris_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Nft_Metadata_Crawler_Parsed_Asset_Uris_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Nft_Metadata_Crawler_Parsed_Asset_Uris_Stream_Cursor_Value_Input = {
  animation_optimizer_retry_count?: InputMaybe<Scalars['Int']['input']>;
  asset_uri?: InputMaybe<Scalars['String']['input']>;
  cdn_animation_uri?: InputMaybe<Scalars['String']['input']>;
  cdn_image_uri?: InputMaybe<Scalars['String']['input']>;
  cdn_json_uri?: InputMaybe<Scalars['String']['input']>;
  image_optimizer_retry_count?: InputMaybe<Scalars['Int']['input']>;
  json_parser_retry_count?: InputMaybe<Scalars['Int']['input']>;
  raw_animation_uri?: InputMaybe<Scalars['String']['input']>;
  raw_image_uri?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "num_active_delegator_per_pool" */
export type Num_Active_Delegator_Per_Pool = {
  __typename?: 'num_active_delegator_per_pool';
  num_active_delegator?: Maybe<Scalars['bigint']['output']>;
  pool_address?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "num_active_delegator_per_pool". All fields are combined with a logical 'AND'. */
export type Num_Active_Delegator_Per_Pool_Bool_Exp = {
  _and?: InputMaybe<Array<Num_Active_Delegator_Per_Pool_Bool_Exp>>;
  _not?: InputMaybe<Num_Active_Delegator_Per_Pool_Bool_Exp>;
  _or?: InputMaybe<Array<Num_Active_Delegator_Per_Pool_Bool_Exp>>;
  num_active_delegator?: InputMaybe<Bigint_Comparison_Exp>;
  pool_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "num_active_delegator_per_pool". */
export type Num_Active_Delegator_Per_Pool_Order_By = {
  num_active_delegator?: InputMaybe<Order_By>;
  pool_address?: InputMaybe<Order_By>;
};

/** select columns of table "num_active_delegator_per_pool" */
export enum Num_Active_Delegator_Per_Pool_Select_Column {
  /** column name */
  NumActiveDelegator = 'num_active_delegator',
  /** column name */
  PoolAddress = 'pool_address'
}

/** Streaming cursor of the table "num_active_delegator_per_pool" */
export type Num_Active_Delegator_Per_Pool_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Num_Active_Delegator_Per_Pool_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Num_Active_Delegator_Per_Pool_Stream_Cursor_Value_Input = {
  num_active_delegator?: InputMaybe<Scalars['bigint']['input']>;
  pool_address?: InputMaybe<Scalars['String']['input']>;
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

/** columns and relationships of "processor_metadata.processor_status" */
export type Processor_Status = {
  __typename?: 'processor_status';
  last_success_version: Scalars['bigint']['output'];
  last_transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  last_updated: Scalars['timestamp']['output'];
  processor: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "processor_metadata.processor_status". All fields are combined with a logical 'AND'. */
export type Processor_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Processor_Status_Bool_Exp>>;
  _not?: InputMaybe<Processor_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Processor_Status_Bool_Exp>>;
  last_success_version?: InputMaybe<Bigint_Comparison_Exp>;
  last_transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  last_updated?: InputMaybe<Timestamp_Comparison_Exp>;
  processor?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "processor_metadata.processor_status". */
export type Processor_Status_Order_By = {
  last_success_version?: InputMaybe<Order_By>;
  last_transaction_timestamp?: InputMaybe<Order_By>;
  last_updated?: InputMaybe<Order_By>;
  processor?: InputMaybe<Order_By>;
};

/** select columns of table "processor_metadata.processor_status" */
export enum Processor_Status_Select_Column {
  /** column name */
  LastSuccessVersion = 'last_success_version',
  /** column name */
  LastTransactionTimestamp = 'last_transaction_timestamp',
  /** column name */
  LastUpdated = 'last_updated',
  /** column name */
  Processor = 'processor'
}

/** Streaming cursor of the table "processor_status" */
export type Processor_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Processor_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Processor_Status_Stream_Cursor_Value_Input = {
  last_success_version?: InputMaybe<Scalars['bigint']['input']>;
  last_transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  last_updated?: InputMaybe<Scalars['timestamp']['input']>;
  processor?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "proposal_votes" */
export type Proposal_Votes = {
  __typename?: 'proposal_votes';
  num_votes: Scalars['numeric']['output'];
  proposal_id: Scalars['bigint']['output'];
  should_pass: Scalars['Boolean']['output'];
  staking_pool_address: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  voter_address: Scalars['String']['output'];
};

/** aggregated selection of "proposal_votes" */
export type Proposal_Votes_Aggregate = {
  __typename?: 'proposal_votes_aggregate';
  aggregate?: Maybe<Proposal_Votes_Aggregate_Fields>;
  nodes: Array<Proposal_Votes>;
};

/** aggregate fields of "proposal_votes" */
export type Proposal_Votes_Aggregate_Fields = {
  __typename?: 'proposal_votes_aggregate_fields';
  avg?: Maybe<Proposal_Votes_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Proposal_Votes_Max_Fields>;
  min?: Maybe<Proposal_Votes_Min_Fields>;
  stddev?: Maybe<Proposal_Votes_Stddev_Fields>;
  stddev_pop?: Maybe<Proposal_Votes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Proposal_Votes_Stddev_Samp_Fields>;
  sum?: Maybe<Proposal_Votes_Sum_Fields>;
  var_pop?: Maybe<Proposal_Votes_Var_Pop_Fields>;
  var_samp?: Maybe<Proposal_Votes_Var_Samp_Fields>;
  variance?: Maybe<Proposal_Votes_Variance_Fields>;
};


/** aggregate fields of "proposal_votes" */
export type Proposal_Votes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Proposal_Votes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Proposal_Votes_Avg_Fields = {
  __typename?: 'proposal_votes_avg_fields';
  num_votes?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "proposal_votes". All fields are combined with a logical 'AND'. */
export type Proposal_Votes_Bool_Exp = {
  _and?: InputMaybe<Array<Proposal_Votes_Bool_Exp>>;
  _not?: InputMaybe<Proposal_Votes_Bool_Exp>;
  _or?: InputMaybe<Array<Proposal_Votes_Bool_Exp>>;
  num_votes?: InputMaybe<Numeric_Comparison_Exp>;
  proposal_id?: InputMaybe<Bigint_Comparison_Exp>;
  should_pass?: InputMaybe<Boolean_Comparison_Exp>;
  staking_pool_address?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  voter_address?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Proposal_Votes_Max_Fields = {
  __typename?: 'proposal_votes_max_fields';
  num_votes?: Maybe<Scalars['numeric']['output']>;
  proposal_id?: Maybe<Scalars['bigint']['output']>;
  staking_pool_address?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  voter_address?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Proposal_Votes_Min_Fields = {
  __typename?: 'proposal_votes_min_fields';
  num_votes?: Maybe<Scalars['numeric']['output']>;
  proposal_id?: Maybe<Scalars['bigint']['output']>;
  staking_pool_address?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  voter_address?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "proposal_votes". */
export type Proposal_Votes_Order_By = {
  num_votes?: InputMaybe<Order_By>;
  proposal_id?: InputMaybe<Order_By>;
  should_pass?: InputMaybe<Order_By>;
  staking_pool_address?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  voter_address?: InputMaybe<Order_By>;
};

/** select columns of table "proposal_votes" */
export enum Proposal_Votes_Select_Column {
  /** column name */
  NumVotes = 'num_votes',
  /** column name */
  ProposalId = 'proposal_id',
  /** column name */
  ShouldPass = 'should_pass',
  /** column name */
  StakingPoolAddress = 'staking_pool_address',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  VoterAddress = 'voter_address'
}

/** aggregate stddev on columns */
export type Proposal_Votes_Stddev_Fields = {
  __typename?: 'proposal_votes_stddev_fields';
  num_votes?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Proposal_Votes_Stddev_Pop_Fields = {
  __typename?: 'proposal_votes_stddev_pop_fields';
  num_votes?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Proposal_Votes_Stddev_Samp_Fields = {
  __typename?: 'proposal_votes_stddev_samp_fields';
  num_votes?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "proposal_votes" */
export type Proposal_Votes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Proposal_Votes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Proposal_Votes_Stream_Cursor_Value_Input = {
  num_votes?: InputMaybe<Scalars['numeric']['input']>;
  proposal_id?: InputMaybe<Scalars['bigint']['input']>;
  should_pass?: InputMaybe<Scalars['Boolean']['input']>;
  staking_pool_address?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  voter_address?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Proposal_Votes_Sum_Fields = {
  __typename?: 'proposal_votes_sum_fields';
  num_votes?: Maybe<Scalars['numeric']['output']>;
  proposal_id?: Maybe<Scalars['bigint']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** aggregate var_pop on columns */
export type Proposal_Votes_Var_Pop_Fields = {
  __typename?: 'proposal_votes_var_pop_fields';
  num_votes?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Proposal_Votes_Var_Samp_Fields = {
  __typename?: 'proposal_votes_var_samp_fields';
  num_votes?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Proposal_Votes_Variance_Fields = {
  __typename?: 'proposal_votes_variance_fields';
  num_votes?: Maybe<Scalars['Float']['output']>;
  proposal_id?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account_transactions" */
  account_transactions: Array<Account_Transactions>;
  /** fetch aggregated fields from the table: "account_transactions" */
  account_transactions_aggregate: Account_Transactions_Aggregate;
  /** fetch data from the table: "account_transactions" using primary key columns */
  account_transactions_by_pk?: Maybe<Account_Transactions>;
  /** fetch data from the table: "address_events_summary" */
  address_events_summary: Array<Address_Events_Summary>;
  /** fetch data from the table: "address_version_from_events" */
  address_version_from_events: Array<Address_Version_From_Events>;
  /** fetch aggregated fields from the table: "address_version_from_events" */
  address_version_from_events_aggregate: Address_Version_From_Events_Aggregate;
  /** fetch data from the table: "legacy_migration_v1.address_version_from_move_resources" */
  address_version_from_move_resources: Array<Address_Version_From_Move_Resources>;
  /** fetch aggregated fields from the table: "legacy_migration_v1.address_version_from_move_resources" */
  address_version_from_move_resources_aggregate: Address_Version_From_Move_Resources_Aggregate;
  /** fetch data from the table: "block_metadata_transactions" */
  block_metadata_transactions: Array<Block_Metadata_Transactions>;
  /** fetch data from the table: "block_metadata_transactions" using primary key columns */
  block_metadata_transactions_by_pk?: Maybe<Block_Metadata_Transactions>;
  /** An array relationship */
  coin_activities: Array<Coin_Activities>;
  /** An aggregate relationship */
  coin_activities_aggregate: Coin_Activities_Aggregate;
  /** fetch data from the table: "legacy_migration_v1.coin_balances" */
  coin_balances: Array<Coin_Balances>;
  /** fetch data from the table: "legacy_migration_v1.coin_infos" */
  coin_infos: Array<Coin_Infos>;
  /** fetch data from the table: "coin_supply" */
  coin_supply: Array<Coin_Supply>;
  /** fetch data from the table: "coin_supply" using primary key columns */
  coin_supply_by_pk?: Maybe<Coin_Supply>;
  /** fetch data from the table: "legacy_migration_v1.collection_datas" */
  collection_datas: Array<Collection_Datas>;
  /** fetch data from the table: "legacy_migration_v1.current_ans_lookup" */
  current_ans_lookup: Array<Current_Ans_Lookup>;
  /** fetch data from the table: "current_ans_lookup_v2" */
  current_ans_lookup_v2: Array<Current_Ans_Lookup_V2>;
  /** fetch data from the table: "current_ans_lookup_v2" using primary key columns */
  current_ans_lookup_v2_by_pk?: Maybe<Current_Ans_Lookup_V2>;
  /** fetch data from the table: "current_aptos_names" */
  current_aptos_names: Array<Current_Aptos_Names>;
  /** fetch aggregated fields from the table: "current_aptos_names" */
  current_aptos_names_aggregate: Current_Aptos_Names_Aggregate;
  /** fetch data from the table: "legacy_migration_v1.current_coin_balances" */
  current_coin_balances: Array<Current_Coin_Balances>;
  /** fetch data from the table: "legacy_migration_v1.current_collection_datas" */
  current_collection_datas: Array<Current_Collection_Datas>;
  /** fetch data from the table: "current_collection_ownership_v2_view" */
  current_collection_ownership_v2_view: Array<Current_Collection_Ownership_V2_View>;
  /** fetch aggregated fields from the table: "current_collection_ownership_v2_view" */
  current_collection_ownership_v2_view_aggregate: Current_Collection_Ownership_V2_View_Aggregate;
  /** fetch data from the table: "current_collections_v2" */
  current_collections_v2: Array<Current_Collections_V2>;
  /** fetch data from the table: "current_collections_v2" using primary key columns */
  current_collections_v2_by_pk?: Maybe<Current_Collections_V2>;
  /** fetch data from the table: "current_delegated_staking_pool_balances" */
  current_delegated_staking_pool_balances: Array<Current_Delegated_Staking_Pool_Balances>;
  /** fetch data from the table: "current_delegated_staking_pool_balances" using primary key columns */
  current_delegated_staking_pool_balances_by_pk?: Maybe<Current_Delegated_Staking_Pool_Balances>;
  /** fetch data from the table: "current_delegated_voter" */
  current_delegated_voter: Array<Current_Delegated_Voter>;
  /** fetch data from the table: "current_delegated_voter" using primary key columns */
  current_delegated_voter_by_pk?: Maybe<Current_Delegated_Voter>;
  /** fetch data from the table: "current_delegator_balances" */
  current_delegator_balances: Array<Current_Delegator_Balances>;
  /** fetch data from the table: "current_delegator_balances" using primary key columns */
  current_delegator_balances_by_pk?: Maybe<Current_Delegator_Balances>;
  /** fetch data from the table: "current_fungible_asset_balances" */
  current_fungible_asset_balances: Array<Current_Fungible_Asset_Balances>;
  /** fetch aggregated fields from the table: "current_fungible_asset_balances" */
  current_fungible_asset_balances_aggregate: Current_Fungible_Asset_Balances_Aggregate;
  /** fetch data from the table: "current_fungible_asset_balances" using primary key columns */
  current_fungible_asset_balances_by_pk?: Maybe<Current_Fungible_Asset_Balances>;
  /** fetch data from the table: "current_objects" */
  current_objects: Array<Current_Objects>;
  /** fetch data from the table: "current_objects" using primary key columns */
  current_objects_by_pk?: Maybe<Current_Objects>;
  /** fetch data from the table: "current_staking_pool_voter" */
  current_staking_pool_voter: Array<Current_Staking_Pool_Voter>;
  /** fetch data from the table: "current_staking_pool_voter" using primary key columns */
  current_staking_pool_voter_by_pk?: Maybe<Current_Staking_Pool_Voter>;
  /** fetch data from the table: "current_table_items" */
  current_table_items: Array<Current_Table_Items>;
  /** fetch data from the table: "current_table_items" using primary key columns */
  current_table_items_by_pk?: Maybe<Current_Table_Items>;
  /** fetch data from the table: "legacy_migration_v1.current_token_datas" */
  current_token_datas: Array<Current_Token_Datas>;
  /** fetch data from the table: "current_token_datas_v2" */
  current_token_datas_v2: Array<Current_Token_Datas_V2>;
  /** fetch data from the table: "current_token_datas_v2" using primary key columns */
  current_token_datas_v2_by_pk?: Maybe<Current_Token_Datas_V2>;
  /** fetch data from the table: "legacy_migration_v1.current_token_ownerships" */
  current_token_ownerships: Array<Current_Token_Ownerships>;
  /** fetch aggregated fields from the table: "legacy_migration_v1.current_token_ownerships" */
  current_token_ownerships_aggregate: Current_Token_Ownerships_Aggregate;
  /** fetch data from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2: Array<Current_Token_Ownerships_V2>;
  /** fetch aggregated fields from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2_aggregate: Current_Token_Ownerships_V2_Aggregate;
  /** fetch data from the table: "current_token_ownerships_v2" using primary key columns */
  current_token_ownerships_v2_by_pk?: Maybe<Current_Token_Ownerships_V2>;
  /** fetch data from the table: "current_token_pending_claims" */
  current_token_pending_claims: Array<Current_Token_Pending_Claims>;
  /** fetch data from the table: "current_token_pending_claims" using primary key columns */
  current_token_pending_claims_by_pk?: Maybe<Current_Token_Pending_Claims>;
  /** fetch data from the table: "current_token_royalty_v1" */
  current_token_royalty_v1: Array<Current_Token_Royalty_V1>;
  /** fetch data from the table: "current_token_royalty_v1" using primary key columns */
  current_token_royalty_v1_by_pk?: Maybe<Current_Token_Royalty_V1>;
  /** An array relationship */
  delegated_staking_activities: Array<Delegated_Staking_Activities>;
  /** fetch data from the table: "delegated_staking_activities" using primary key columns */
  delegated_staking_activities_by_pk?: Maybe<Delegated_Staking_Activities>;
  /** fetch data from the table: "delegated_staking_pool_balances" */
  delegated_staking_pool_balances: Array<Delegated_Staking_Pool_Balances>;
  /** fetch aggregated fields from the table: "delegated_staking_pool_balances" */
  delegated_staking_pool_balances_aggregate: Delegated_Staking_Pool_Balances_Aggregate;
  /** fetch data from the table: "delegated_staking_pool_balances" using primary key columns */
  delegated_staking_pool_balances_by_pk?: Maybe<Delegated_Staking_Pool_Balances>;
  /** fetch data from the table: "delegated_staking_pools" */
  delegated_staking_pools: Array<Delegated_Staking_Pools>;
  /** fetch data from the table: "delegated_staking_pools" using primary key columns */
  delegated_staking_pools_by_pk?: Maybe<Delegated_Staking_Pools>;
  /** fetch data from the table: "delegator_distinct_pool" */
  delegator_distinct_pool: Array<Delegator_Distinct_Pool>;
  /** fetch aggregated fields from the table: "delegator_distinct_pool" */
  delegator_distinct_pool_aggregate: Delegator_Distinct_Pool_Aggregate;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** An array relationship */
  fungible_asset_activities: Array<Fungible_Asset_Activities>;
  /** fetch data from the table: "fungible_asset_activities" using primary key columns */
  fungible_asset_activities_by_pk?: Maybe<Fungible_Asset_Activities>;
  /** fetch data from the table: "fungible_asset_metadata" */
  fungible_asset_metadata: Array<Fungible_Asset_Metadata>;
  /** fetch data from the table: "fungible_asset_metadata" using primary key columns */
  fungible_asset_metadata_by_pk?: Maybe<Fungible_Asset_Metadata>;
  /** fetch data from the table: "indexer_status" */
  indexer_status: Array<Indexer_Status>;
  /** fetch data from the table: "indexer_status" using primary key columns */
  indexer_status_by_pk?: Maybe<Indexer_Status>;
  /** fetch data from the table: "processor_metadata.ledger_infos" */
  ledger_infos: Array<Ledger_Infos>;
  /** fetch data from the table: "processor_metadata.ledger_infos" using primary key columns */
  ledger_infos_by_pk?: Maybe<Ledger_Infos>;
  /** fetch data from the table: "legacy_migration_v1.move_resources" */
  move_resources: Array<Move_Resources>;
  /** fetch aggregated fields from the table: "legacy_migration_v1.move_resources" */
  move_resources_aggregate: Move_Resources_Aggregate;
  /** fetch data from the table: "nft_metadata_crawler.parsed_asset_uris" */
  nft_metadata_crawler_parsed_asset_uris: Array<Nft_Metadata_Crawler_Parsed_Asset_Uris>;
  /** fetch data from the table: "nft_metadata_crawler.parsed_asset_uris" using primary key columns */
  nft_metadata_crawler_parsed_asset_uris_by_pk?: Maybe<Nft_Metadata_Crawler_Parsed_Asset_Uris>;
  /** fetch data from the table: "num_active_delegator_per_pool" */
  num_active_delegator_per_pool: Array<Num_Active_Delegator_Per_Pool>;
  /** fetch data from the table: "processor_metadata.processor_status" */
  processor_status: Array<Processor_Status>;
  /** fetch data from the table: "processor_metadata.processor_status" using primary key columns */
  processor_status_by_pk?: Maybe<Processor_Status>;
  /** fetch data from the table: "proposal_votes" */
  proposal_votes: Array<Proposal_Votes>;
  /** fetch aggregated fields from the table: "proposal_votes" */
  proposal_votes_aggregate: Proposal_Votes_Aggregate;
  /** fetch data from the table: "proposal_votes" using primary key columns */
  proposal_votes_by_pk?: Maybe<Proposal_Votes>;
  /** fetch data from the table: "signatures" */
  signatures: Array<Signatures>;
  /** fetch data from the table: "signatures" using primary key columns */
  signatures_by_pk?: Maybe<Signatures>;
  /** fetch data from the table: "table_items" */
  table_items: Array<Table_Items>;
  /** fetch data from the table: "table_items" using primary key columns */
  table_items_by_pk?: Maybe<Table_Items>;
  /** fetch data from the table: "table_metadatas" */
  table_metadatas: Array<Table_Metadatas>;
  /** fetch data from the table: "table_metadatas" using primary key columns */
  table_metadatas_by_pk?: Maybe<Table_Metadatas>;
  /** An array relationship */
  token_activities: Array<Token_Activities>;
  /** An aggregate relationship */
  token_activities_aggregate: Token_Activities_Aggregate;
  /** An array relationship */
  token_activities_v2: Array<Token_Activities_V2>;
  /** An aggregate relationship */
  token_activities_v2_aggregate: Token_Activities_V2_Aggregate;
  /** fetch data from the table: "token_activities_v2" using primary key columns */
  token_activities_v2_by_pk?: Maybe<Token_Activities_V2>;
  /** fetch data from the table: "legacy_migration_v1.token_datas" */
  token_datas: Array<Token_Datas>;
  /** fetch data from the table: "legacy_migration_v1.token_ownerships" */
  token_ownerships: Array<Token_Ownerships>;
  /** fetch data from the table: "legacy_migration_v1.tokens" */
  tokens: Array<Tokens>;
  /** fetch data from the table: "user_transactions" */
  user_transactions: Array<User_Transactions>;
  /** fetch data from the table: "user_transactions" using primary key columns */
  user_transactions_by_pk?: Maybe<User_Transactions>;
};


export type Query_RootAccount_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<Account_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transactions_Order_By>>;
  where?: InputMaybe<Account_Transactions_Bool_Exp>;
};


export type Query_RootAccount_Transactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transactions_Order_By>>;
  where?: InputMaybe<Account_Transactions_Bool_Exp>;
};


export type Query_RootAccount_Transactions_By_PkArgs = {
  account_address: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootAddress_Events_SummaryArgs = {
  distinct_on?: InputMaybe<Array<Address_Events_Summary_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Events_Summary_Order_By>>;
  where?: InputMaybe<Address_Events_Summary_Bool_Exp>;
};


export type Query_RootAddress_Version_From_EventsArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Events_Order_By>>;
  where?: InputMaybe<Address_Version_From_Events_Bool_Exp>;
};


export type Query_RootAddress_Version_From_Events_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Events_Order_By>>;
  where?: InputMaybe<Address_Version_From_Events_Bool_Exp>;
};


export type Query_RootAddress_Version_From_Move_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Move_Resources_Order_By>>;
  where?: InputMaybe<Address_Version_From_Move_Resources_Bool_Exp>;
};


export type Query_RootAddress_Version_From_Move_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Move_Resources_Order_By>>;
  where?: InputMaybe<Address_Version_From_Move_Resources_Bool_Exp>;
};


export type Query_RootBlock_Metadata_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<Block_Metadata_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Block_Metadata_Transactions_Order_By>>;
  where?: InputMaybe<Block_Metadata_Transactions_Bool_Exp>;
};


export type Query_RootBlock_Metadata_Transactions_By_PkArgs = {
  version: Scalars['bigint']['input'];
};


export type Query_RootCoin_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


export type Query_RootCoin_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


export type Query_RootCoin_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Coin_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Balances_Order_By>>;
  where?: InputMaybe<Coin_Balances_Bool_Exp>;
};


export type Query_RootCoin_InfosArgs = {
  distinct_on?: InputMaybe<Array<Coin_Infos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Infos_Order_By>>;
  where?: InputMaybe<Coin_Infos_Bool_Exp>;
};


export type Query_RootCoin_SupplyArgs = {
  distinct_on?: InputMaybe<Array<Coin_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Supply_Order_By>>;
  where?: InputMaybe<Coin_Supply_Bool_Exp>;
};


export type Query_RootCoin_Supply_By_PkArgs = {
  coin_type_hash: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootCollection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collection_Datas_Order_By>>;
  where?: InputMaybe<Collection_Datas_Bool_Exp>;
};


export type Query_RootCurrent_Ans_LookupArgs = {
  distinct_on?: InputMaybe<Array<Current_Ans_Lookup_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Ans_Lookup_Order_By>>;
  where?: InputMaybe<Current_Ans_Lookup_Bool_Exp>;
};


export type Query_RootCurrent_Ans_Lookup_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Ans_Lookup_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Ans_Lookup_V2_Order_By>>;
  where?: InputMaybe<Current_Ans_Lookup_V2_Bool_Exp>;
};


export type Query_RootCurrent_Ans_Lookup_V2_By_PkArgs = {
  domain: Scalars['String']['input'];
  subdomain: Scalars['String']['input'];
  token_standard: Scalars['String']['input'];
};


export type Query_RootCurrent_Aptos_NamesArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


export type Query_RootCurrent_Aptos_Names_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


export type Query_RootCurrent_Coin_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Coin_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Coin_Balances_Order_By>>;
  where?: InputMaybe<Current_Coin_Balances_Bool_Exp>;
};


export type Query_RootCurrent_Collection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Datas_Order_By>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Query_RootCurrent_Collection_Ownership_V2_ViewArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Order_By>>;
  where?: InputMaybe<Current_Collection_Ownership_V2_View_Bool_Exp>;
};


export type Query_RootCurrent_Collection_Ownership_V2_View_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Order_By>>;
  where?: InputMaybe<Current_Collection_Ownership_V2_View_Bool_Exp>;
};


export type Query_RootCurrent_Collections_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Collections_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collections_V2_Order_By>>;
  where?: InputMaybe<Current_Collections_V2_Bool_Exp>;
};


export type Query_RootCurrent_Collections_V2_By_PkArgs = {
  collection_id: Scalars['String']['input'];
};


export type Query_RootCurrent_Delegated_Staking_Pool_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Delegated_Staking_Pool_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Delegated_Staking_Pool_Balances_Order_By>>;
  where?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Query_RootCurrent_Delegated_Staking_Pool_Balances_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
};


export type Query_RootCurrent_Delegated_VoterArgs = {
  distinct_on?: InputMaybe<Array<Current_Delegated_Voter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Delegated_Voter_Order_By>>;
  where?: InputMaybe<Current_Delegated_Voter_Bool_Exp>;
};


export type Query_RootCurrent_Delegated_Voter_By_PkArgs = {
  delegation_pool_address: Scalars['String']['input'];
  delegator_address: Scalars['String']['input'];
};


export type Query_RootCurrent_Delegator_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Delegator_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Delegator_Balances_Order_By>>;
  where?: InputMaybe<Current_Delegator_Balances_Bool_Exp>;
};


export type Query_RootCurrent_Delegator_Balances_By_PkArgs = {
  delegator_address: Scalars['String']['input'];
  pool_address: Scalars['String']['input'];
  pool_type: Scalars['String']['input'];
  table_handle: Scalars['String']['input'];
};


export type Query_RootCurrent_Fungible_Asset_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Fungible_Asset_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Fungible_Asset_Balances_Order_By>>;
  where?: InputMaybe<Current_Fungible_Asset_Balances_Bool_Exp>;
};


export type Query_RootCurrent_Fungible_Asset_Balances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Fungible_Asset_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Fungible_Asset_Balances_Order_By>>;
  where?: InputMaybe<Current_Fungible_Asset_Balances_Bool_Exp>;
};


export type Query_RootCurrent_Fungible_Asset_Balances_By_PkArgs = {
  storage_id: Scalars['String']['input'];
};


export type Query_RootCurrent_ObjectsArgs = {
  distinct_on?: InputMaybe<Array<Current_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Objects_Order_By>>;
  where?: InputMaybe<Current_Objects_Bool_Exp>;
};


export type Query_RootCurrent_Objects_By_PkArgs = {
  object_address: Scalars['String']['input'];
};


export type Query_RootCurrent_Staking_Pool_VoterArgs = {
  distinct_on?: InputMaybe<Array<Current_Staking_Pool_Voter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Staking_Pool_Voter_Order_By>>;
  where?: InputMaybe<Current_Staking_Pool_Voter_Bool_Exp>;
};


export type Query_RootCurrent_Staking_Pool_Voter_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
};


export type Query_RootCurrent_Table_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Current_Table_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Table_Items_Order_By>>;
  where?: InputMaybe<Current_Table_Items_Bool_Exp>;
};


export type Query_RootCurrent_Table_Items_By_PkArgs = {
  key_hash: Scalars['String']['input'];
  table_handle: Scalars['String']['input'];
};


export type Query_RootCurrent_Token_DatasArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Datas_Order_By>>;
  where?: InputMaybe<Current_Token_Datas_Bool_Exp>;
};


export type Query_RootCurrent_Token_Datas_V2Args = {
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


export type Query_RootCurrent_Token_Pending_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Pending_Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Pending_Claims_Order_By>>;
  where?: InputMaybe<Current_Token_Pending_Claims_Bool_Exp>;
};


export type Query_RootCurrent_Token_Pending_Claims_By_PkArgs = {
  from_address: Scalars['String']['input'];
  property_version: Scalars['numeric']['input'];
  to_address: Scalars['String']['input'];
  token_data_id_hash: Scalars['String']['input'];
};


export type Query_RootCurrent_Token_Royalty_V1Args = {
  distinct_on?: InputMaybe<Array<Current_Token_Royalty_V1_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Royalty_V1_Order_By>>;
  where?: InputMaybe<Current_Token_Royalty_V1_Bool_Exp>;
};


export type Query_RootCurrent_Token_Royalty_V1_By_PkArgs = {
  token_data_id: Scalars['String']['input'];
};


export type Query_RootDelegated_Staking_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Activities_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
};


export type Query_RootDelegated_Staking_Activities_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootDelegated_Staking_Pool_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Query_RootDelegated_Staking_Pool_Balances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Query_RootDelegated_Staking_Pool_Balances_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootDelegated_Staking_PoolsArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Pools_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Pools_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Pools_Bool_Exp>;
};


export type Query_RootDelegated_Staking_Pools_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
};


export type Query_RootDelegator_Distinct_PoolArgs = {
  distinct_on?: InputMaybe<Array<Delegator_Distinct_Pool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegator_Distinct_Pool_Order_By>>;
  where?: InputMaybe<Delegator_Distinct_Pool_Bool_Exp>;
};


export type Query_RootDelegator_Distinct_Pool_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Delegator_Distinct_Pool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegator_Distinct_Pool_Order_By>>;
  where?: InputMaybe<Delegator_Distinct_Pool_Bool_Exp>;
};


export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootFungible_Asset_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Fungible_Asset_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fungible_Asset_Activities_Order_By>>;
  where?: InputMaybe<Fungible_Asset_Activities_Bool_Exp>;
};


export type Query_RootFungible_Asset_Activities_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootFungible_Asset_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Fungible_Asset_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fungible_Asset_Metadata_Order_By>>;
  where?: InputMaybe<Fungible_Asset_Metadata_Bool_Exp>;
};


export type Query_RootFungible_Asset_Metadata_By_PkArgs = {
  asset_type: Scalars['String']['input'];
};


export type Query_RootIndexer_StatusArgs = {
  distinct_on?: InputMaybe<Array<Indexer_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexer_Status_Order_By>>;
  where?: InputMaybe<Indexer_Status_Bool_Exp>;
};


export type Query_RootIndexer_Status_By_PkArgs = {
  db: Scalars['String']['input'];
};


export type Query_RootLedger_InfosArgs = {
  distinct_on?: InputMaybe<Array<Ledger_Infos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ledger_Infos_Order_By>>;
  where?: InputMaybe<Ledger_Infos_Bool_Exp>;
};


export type Query_RootLedger_Infos_By_PkArgs = {
  chain_id: Scalars['bigint']['input'];
};


export type Query_RootMove_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Move_Resources_Order_By>>;
  where?: InputMaybe<Move_Resources_Bool_Exp>;
};


export type Query_RootMove_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Move_Resources_Order_By>>;
  where?: InputMaybe<Move_Resources_Bool_Exp>;
};


export type Query_RootNft_Metadata_Crawler_Parsed_Asset_UrisArgs = {
  distinct_on?: InputMaybe<Array<Nft_Metadata_Crawler_Parsed_Asset_Uris_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nft_Metadata_Crawler_Parsed_Asset_Uris_Order_By>>;
  where?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>;
};


export type Query_RootNft_Metadata_Crawler_Parsed_Asset_Uris_By_PkArgs = {
  asset_uri: Scalars['String']['input'];
};


export type Query_RootNum_Active_Delegator_Per_PoolArgs = {
  distinct_on?: InputMaybe<Array<Num_Active_Delegator_Per_Pool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Num_Active_Delegator_Per_Pool_Order_By>>;
  where?: InputMaybe<Num_Active_Delegator_Per_Pool_Bool_Exp>;
};


export type Query_RootProcessor_StatusArgs = {
  distinct_on?: InputMaybe<Array<Processor_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Processor_Status_Order_By>>;
  where?: InputMaybe<Processor_Status_Bool_Exp>;
};


export type Query_RootProcessor_Status_By_PkArgs = {
  processor: Scalars['String']['input'];
};


export type Query_RootProposal_VotesArgs = {
  distinct_on?: InputMaybe<Array<Proposal_Votes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Proposal_Votes_Order_By>>;
  where?: InputMaybe<Proposal_Votes_Bool_Exp>;
};


export type Query_RootProposal_Votes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Proposal_Votes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Proposal_Votes_Order_By>>;
  where?: InputMaybe<Proposal_Votes_Bool_Exp>;
};


export type Query_RootProposal_Votes_By_PkArgs = {
  proposal_id: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
  voter_address: Scalars['String']['input'];
};


export type Query_RootSignaturesArgs = {
  distinct_on?: InputMaybe<Array<Signatures_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signatures_Order_By>>;
  where?: InputMaybe<Signatures_Bool_Exp>;
};


export type Query_RootSignatures_By_PkArgs = {
  is_sender_primary: Scalars['Boolean']['input'];
  multi_agent_index: Scalars['bigint']['input'];
  multi_sig_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootTable_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Table_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Table_Items_Order_By>>;
  where?: InputMaybe<Table_Items_Bool_Exp>;
};


export type Query_RootTable_Items_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Query_RootTable_MetadatasArgs = {
  distinct_on?: InputMaybe<Array<Table_Metadatas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Table_Metadatas_Order_By>>;
  where?: InputMaybe<Table_Metadatas_Bool_Exp>;
};


export type Query_RootTable_Metadatas_By_PkArgs = {
  handle: Scalars['String']['input'];
};


export type Query_RootToken_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


export type Query_RootToken_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


export type Query_RootToken_Activities_V2Args = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


export type Query_RootToken_Activities_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


export type Query_RootToken_Activities_V2_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Query_RootToken_DatasArgs = {
  distinct_on?: InputMaybe<Array<Token_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Datas_Order_By>>;
  where?: InputMaybe<Token_Datas_Bool_Exp>;
};


export type Query_RootToken_OwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Ownerships_Order_By>>;
  where?: InputMaybe<Token_Ownerships_Bool_Exp>;
};


export type Query_RootTokensArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tokens_Order_By>>;
  where?: InputMaybe<Tokens_Bool_Exp>;
};


export type Query_RootUser_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<User_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Transactions_Order_By>>;
  where?: InputMaybe<User_Transactions_Bool_Exp>;
};


export type Query_RootUser_Transactions_By_PkArgs = {
  version: Scalars['bigint']['input'];
};

/** columns and relationships of "signatures" */
export type Signatures = {
  __typename?: 'signatures';
  is_sender_primary: Scalars['Boolean']['output'];
  multi_agent_index: Scalars['bigint']['output'];
  multi_sig_index: Scalars['bigint']['output'];
  public_key: Scalars['String']['output'];
  public_key_indices: Scalars['jsonb']['output'];
  signature: Scalars['String']['output'];
  signer: Scalars['String']['output'];
  threshold: Scalars['bigint']['output'];
  transaction_block_height: Scalars['bigint']['output'];
  transaction_version: Scalars['bigint']['output'];
  type: Scalars['String']['output'];
};


/** columns and relationships of "signatures" */
export type SignaturesPublic_Key_IndicesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "signatures". All fields are combined with a logical 'AND'. */
export type Signatures_Bool_Exp = {
  _and?: InputMaybe<Array<Signatures_Bool_Exp>>;
  _not?: InputMaybe<Signatures_Bool_Exp>;
  _or?: InputMaybe<Array<Signatures_Bool_Exp>>;
  is_sender_primary?: InputMaybe<Boolean_Comparison_Exp>;
  multi_agent_index?: InputMaybe<Bigint_Comparison_Exp>;
  multi_sig_index?: InputMaybe<Bigint_Comparison_Exp>;
  public_key?: InputMaybe<String_Comparison_Exp>;
  public_key_indices?: InputMaybe<Jsonb_Comparison_Exp>;
  signature?: InputMaybe<String_Comparison_Exp>;
  signer?: InputMaybe<String_Comparison_Exp>;
  threshold?: InputMaybe<Bigint_Comparison_Exp>;
  transaction_block_height?: InputMaybe<Bigint_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "signatures". */
export type Signatures_Order_By = {
  is_sender_primary?: InputMaybe<Order_By>;
  multi_agent_index?: InputMaybe<Order_By>;
  multi_sig_index?: InputMaybe<Order_By>;
  public_key?: InputMaybe<Order_By>;
  public_key_indices?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  signer?: InputMaybe<Order_By>;
  threshold?: InputMaybe<Order_By>;
  transaction_block_height?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "signatures" */
export enum Signatures_Select_Column {
  /** column name */
  IsSenderPrimary = 'is_sender_primary',
  /** column name */
  MultiAgentIndex = 'multi_agent_index',
  /** column name */
  MultiSigIndex = 'multi_sig_index',
  /** column name */
  PublicKey = 'public_key',
  /** column name */
  PublicKeyIndices = 'public_key_indices',
  /** column name */
  Signature = 'signature',
  /** column name */
  Signer = 'signer',
  /** column name */
  Threshold = 'threshold',
  /** column name */
  TransactionBlockHeight = 'transaction_block_height',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  Type = 'type'
}

/** Streaming cursor of the table "signatures" */
export type Signatures_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Signatures_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Signatures_Stream_Cursor_Value_Input = {
  is_sender_primary?: InputMaybe<Scalars['Boolean']['input']>;
  multi_agent_index?: InputMaybe<Scalars['bigint']['input']>;
  multi_sig_index?: InputMaybe<Scalars['bigint']['input']>;
  public_key?: InputMaybe<Scalars['String']['input']>;
  public_key_indices?: InputMaybe<Scalars['jsonb']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  signer?: InputMaybe<Scalars['String']['input']>;
  threshold?: InputMaybe<Scalars['bigint']['input']>;
  transaction_block_height?: InputMaybe<Scalars['bigint']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account_transactions" */
  account_transactions: Array<Account_Transactions>;
  /** fetch aggregated fields from the table: "account_transactions" */
  account_transactions_aggregate: Account_Transactions_Aggregate;
  /** fetch data from the table: "account_transactions" using primary key columns */
  account_transactions_by_pk?: Maybe<Account_Transactions>;
  /** fetch data from the table in a streaming manner: "account_transactions" */
  account_transactions_stream: Array<Account_Transactions>;
  /** fetch data from the table: "address_events_summary" */
  address_events_summary: Array<Address_Events_Summary>;
  /** fetch data from the table in a streaming manner: "address_events_summary" */
  address_events_summary_stream: Array<Address_Events_Summary>;
  /** fetch data from the table: "address_version_from_events" */
  address_version_from_events: Array<Address_Version_From_Events>;
  /** fetch aggregated fields from the table: "address_version_from_events" */
  address_version_from_events_aggregate: Address_Version_From_Events_Aggregate;
  /** fetch data from the table in a streaming manner: "address_version_from_events" */
  address_version_from_events_stream: Array<Address_Version_From_Events>;
  /** fetch data from the table: "legacy_migration_v1.address_version_from_move_resources" */
  address_version_from_move_resources: Array<Address_Version_From_Move_Resources>;
  /** fetch aggregated fields from the table: "legacy_migration_v1.address_version_from_move_resources" */
  address_version_from_move_resources_aggregate: Address_Version_From_Move_Resources_Aggregate;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.address_version_from_move_resources" */
  address_version_from_move_resources_stream: Array<Address_Version_From_Move_Resources>;
  /** fetch data from the table: "block_metadata_transactions" */
  block_metadata_transactions: Array<Block_Metadata_Transactions>;
  /** fetch data from the table: "block_metadata_transactions" using primary key columns */
  block_metadata_transactions_by_pk?: Maybe<Block_Metadata_Transactions>;
  /** fetch data from the table in a streaming manner: "block_metadata_transactions" */
  block_metadata_transactions_stream: Array<Block_Metadata_Transactions>;
  /** An array relationship */
  coin_activities: Array<Coin_Activities>;
  /** An aggregate relationship */
  coin_activities_aggregate: Coin_Activities_Aggregate;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.coin_activities" */
  coin_activities_stream: Array<Coin_Activities>;
  /** fetch data from the table: "legacy_migration_v1.coin_balances" */
  coin_balances: Array<Coin_Balances>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.coin_balances" */
  coin_balances_stream: Array<Coin_Balances>;
  /** fetch data from the table: "legacy_migration_v1.coin_infos" */
  coin_infos: Array<Coin_Infos>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.coin_infos" */
  coin_infos_stream: Array<Coin_Infos>;
  /** fetch data from the table: "coin_supply" */
  coin_supply: Array<Coin_Supply>;
  /** fetch data from the table: "coin_supply" using primary key columns */
  coin_supply_by_pk?: Maybe<Coin_Supply>;
  /** fetch data from the table in a streaming manner: "coin_supply" */
  coin_supply_stream: Array<Coin_Supply>;
  /** fetch data from the table: "legacy_migration_v1.collection_datas" */
  collection_datas: Array<Collection_Datas>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.collection_datas" */
  collection_datas_stream: Array<Collection_Datas>;
  /** fetch data from the table: "legacy_migration_v1.current_ans_lookup" */
  current_ans_lookup: Array<Current_Ans_Lookup>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.current_ans_lookup" */
  current_ans_lookup_stream: Array<Current_Ans_Lookup>;
  /** fetch data from the table: "current_ans_lookup_v2" */
  current_ans_lookup_v2: Array<Current_Ans_Lookup_V2>;
  /** fetch data from the table: "current_ans_lookup_v2" using primary key columns */
  current_ans_lookup_v2_by_pk?: Maybe<Current_Ans_Lookup_V2>;
  /** fetch data from the table in a streaming manner: "current_ans_lookup_v2" */
  current_ans_lookup_v2_stream: Array<Current_Ans_Lookup_V2>;
  /** fetch data from the table: "current_aptos_names" */
  current_aptos_names: Array<Current_Aptos_Names>;
  /** fetch aggregated fields from the table: "current_aptos_names" */
  current_aptos_names_aggregate: Current_Aptos_Names_Aggregate;
  /** fetch data from the table in a streaming manner: "current_aptos_names" */
  current_aptos_names_stream: Array<Current_Aptos_Names>;
  /** fetch data from the table: "legacy_migration_v1.current_coin_balances" */
  current_coin_balances: Array<Current_Coin_Balances>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.current_coin_balances" */
  current_coin_balances_stream: Array<Current_Coin_Balances>;
  /** fetch data from the table: "legacy_migration_v1.current_collection_datas" */
  current_collection_datas: Array<Current_Collection_Datas>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.current_collection_datas" */
  current_collection_datas_stream: Array<Current_Collection_Datas>;
  /** fetch data from the table: "current_collection_ownership_v2_view" */
  current_collection_ownership_v2_view: Array<Current_Collection_Ownership_V2_View>;
  /** fetch aggregated fields from the table: "current_collection_ownership_v2_view" */
  current_collection_ownership_v2_view_aggregate: Current_Collection_Ownership_V2_View_Aggregate;
  /** fetch data from the table in a streaming manner: "current_collection_ownership_v2_view" */
  current_collection_ownership_v2_view_stream: Array<Current_Collection_Ownership_V2_View>;
  /** fetch data from the table: "current_collections_v2" */
  current_collections_v2: Array<Current_Collections_V2>;
  /** fetch data from the table: "current_collections_v2" using primary key columns */
  current_collections_v2_by_pk?: Maybe<Current_Collections_V2>;
  /** fetch data from the table in a streaming manner: "current_collections_v2" */
  current_collections_v2_stream: Array<Current_Collections_V2>;
  /** fetch data from the table: "current_delegated_staking_pool_balances" */
  current_delegated_staking_pool_balances: Array<Current_Delegated_Staking_Pool_Balances>;
  /** fetch data from the table: "current_delegated_staking_pool_balances" using primary key columns */
  current_delegated_staking_pool_balances_by_pk?: Maybe<Current_Delegated_Staking_Pool_Balances>;
  /** fetch data from the table in a streaming manner: "current_delegated_staking_pool_balances" */
  current_delegated_staking_pool_balances_stream: Array<Current_Delegated_Staking_Pool_Balances>;
  /** fetch data from the table: "current_delegated_voter" */
  current_delegated_voter: Array<Current_Delegated_Voter>;
  /** fetch data from the table: "current_delegated_voter" using primary key columns */
  current_delegated_voter_by_pk?: Maybe<Current_Delegated_Voter>;
  /** fetch data from the table in a streaming manner: "current_delegated_voter" */
  current_delegated_voter_stream: Array<Current_Delegated_Voter>;
  /** fetch data from the table: "current_delegator_balances" */
  current_delegator_balances: Array<Current_Delegator_Balances>;
  /** fetch data from the table: "current_delegator_balances" using primary key columns */
  current_delegator_balances_by_pk?: Maybe<Current_Delegator_Balances>;
  /** fetch data from the table in a streaming manner: "current_delegator_balances" */
  current_delegator_balances_stream: Array<Current_Delegator_Balances>;
  /** fetch data from the table: "current_fungible_asset_balances" */
  current_fungible_asset_balances: Array<Current_Fungible_Asset_Balances>;
  /** fetch aggregated fields from the table: "current_fungible_asset_balances" */
  current_fungible_asset_balances_aggregate: Current_Fungible_Asset_Balances_Aggregate;
  /** fetch data from the table: "current_fungible_asset_balances" using primary key columns */
  current_fungible_asset_balances_by_pk?: Maybe<Current_Fungible_Asset_Balances>;
  /** fetch data from the table in a streaming manner: "current_fungible_asset_balances" */
  current_fungible_asset_balances_stream: Array<Current_Fungible_Asset_Balances>;
  /** fetch data from the table: "current_objects" */
  current_objects: Array<Current_Objects>;
  /** fetch data from the table: "current_objects" using primary key columns */
  current_objects_by_pk?: Maybe<Current_Objects>;
  /** fetch data from the table in a streaming manner: "current_objects" */
  current_objects_stream: Array<Current_Objects>;
  /** fetch data from the table: "current_staking_pool_voter" */
  current_staking_pool_voter: Array<Current_Staking_Pool_Voter>;
  /** fetch data from the table: "current_staking_pool_voter" using primary key columns */
  current_staking_pool_voter_by_pk?: Maybe<Current_Staking_Pool_Voter>;
  /** fetch data from the table in a streaming manner: "current_staking_pool_voter" */
  current_staking_pool_voter_stream: Array<Current_Staking_Pool_Voter>;
  /** fetch data from the table: "current_table_items" */
  current_table_items: Array<Current_Table_Items>;
  /** fetch data from the table: "current_table_items" using primary key columns */
  current_table_items_by_pk?: Maybe<Current_Table_Items>;
  /** fetch data from the table in a streaming manner: "current_table_items" */
  current_table_items_stream: Array<Current_Table_Items>;
  /** fetch data from the table: "legacy_migration_v1.current_token_datas" */
  current_token_datas: Array<Current_Token_Datas>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.current_token_datas" */
  current_token_datas_stream: Array<Current_Token_Datas>;
  /** fetch data from the table: "current_token_datas_v2" */
  current_token_datas_v2: Array<Current_Token_Datas_V2>;
  /** fetch data from the table: "current_token_datas_v2" using primary key columns */
  current_token_datas_v2_by_pk?: Maybe<Current_Token_Datas_V2>;
  /** fetch data from the table in a streaming manner: "current_token_datas_v2" */
  current_token_datas_v2_stream: Array<Current_Token_Datas_V2>;
  /** fetch data from the table: "legacy_migration_v1.current_token_ownerships" */
  current_token_ownerships: Array<Current_Token_Ownerships>;
  /** fetch aggregated fields from the table: "legacy_migration_v1.current_token_ownerships" */
  current_token_ownerships_aggregate: Current_Token_Ownerships_Aggregate;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.current_token_ownerships" */
  current_token_ownerships_stream: Array<Current_Token_Ownerships>;
  /** fetch data from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2: Array<Current_Token_Ownerships_V2>;
  /** fetch aggregated fields from the table: "current_token_ownerships_v2" */
  current_token_ownerships_v2_aggregate: Current_Token_Ownerships_V2_Aggregate;
  /** fetch data from the table: "current_token_ownerships_v2" using primary key columns */
  current_token_ownerships_v2_by_pk?: Maybe<Current_Token_Ownerships_V2>;
  /** fetch data from the table in a streaming manner: "current_token_ownerships_v2" */
  current_token_ownerships_v2_stream: Array<Current_Token_Ownerships_V2>;
  /** fetch data from the table: "current_token_pending_claims" */
  current_token_pending_claims: Array<Current_Token_Pending_Claims>;
  /** fetch data from the table: "current_token_pending_claims" using primary key columns */
  current_token_pending_claims_by_pk?: Maybe<Current_Token_Pending_Claims>;
  /** fetch data from the table in a streaming manner: "current_token_pending_claims" */
  current_token_pending_claims_stream: Array<Current_Token_Pending_Claims>;
  /** fetch data from the table: "current_token_royalty_v1" */
  current_token_royalty_v1: Array<Current_Token_Royalty_V1>;
  /** fetch data from the table: "current_token_royalty_v1" using primary key columns */
  current_token_royalty_v1_by_pk?: Maybe<Current_Token_Royalty_V1>;
  /** fetch data from the table in a streaming manner: "current_token_royalty_v1" */
  current_token_royalty_v1_stream: Array<Current_Token_Royalty_V1>;
  /** An array relationship */
  delegated_staking_activities: Array<Delegated_Staking_Activities>;
  /** fetch data from the table: "delegated_staking_activities" using primary key columns */
  delegated_staking_activities_by_pk?: Maybe<Delegated_Staking_Activities>;
  /** fetch data from the table in a streaming manner: "delegated_staking_activities" */
  delegated_staking_activities_stream: Array<Delegated_Staking_Activities>;
  /** fetch data from the table: "delegated_staking_pool_balances" */
  delegated_staking_pool_balances: Array<Delegated_Staking_Pool_Balances>;
  /** fetch aggregated fields from the table: "delegated_staking_pool_balances" */
  delegated_staking_pool_balances_aggregate: Delegated_Staking_Pool_Balances_Aggregate;
  /** fetch data from the table: "delegated_staking_pool_balances" using primary key columns */
  delegated_staking_pool_balances_by_pk?: Maybe<Delegated_Staking_Pool_Balances>;
  /** fetch data from the table in a streaming manner: "delegated_staking_pool_balances" */
  delegated_staking_pool_balances_stream: Array<Delegated_Staking_Pool_Balances>;
  /** fetch data from the table: "delegated_staking_pools" */
  delegated_staking_pools: Array<Delegated_Staking_Pools>;
  /** fetch data from the table: "delegated_staking_pools" using primary key columns */
  delegated_staking_pools_by_pk?: Maybe<Delegated_Staking_Pools>;
  /** fetch data from the table in a streaming manner: "delegated_staking_pools" */
  delegated_staking_pools_stream: Array<Delegated_Staking_Pools>;
  /** fetch data from the table: "delegator_distinct_pool" */
  delegator_distinct_pool: Array<Delegator_Distinct_Pool>;
  /** fetch aggregated fields from the table: "delegator_distinct_pool" */
  delegator_distinct_pool_aggregate: Delegator_Distinct_Pool_Aggregate;
  /** fetch data from the table in a streaming manner: "delegator_distinct_pool" */
  delegator_distinct_pool_stream: Array<Delegator_Distinct_Pool>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Array<Events>;
  /** An array relationship */
  fungible_asset_activities: Array<Fungible_Asset_Activities>;
  /** fetch data from the table: "fungible_asset_activities" using primary key columns */
  fungible_asset_activities_by_pk?: Maybe<Fungible_Asset_Activities>;
  /** fetch data from the table in a streaming manner: "fungible_asset_activities" */
  fungible_asset_activities_stream: Array<Fungible_Asset_Activities>;
  /** fetch data from the table: "fungible_asset_metadata" */
  fungible_asset_metadata: Array<Fungible_Asset_Metadata>;
  /** fetch data from the table: "fungible_asset_metadata" using primary key columns */
  fungible_asset_metadata_by_pk?: Maybe<Fungible_Asset_Metadata>;
  /** fetch data from the table in a streaming manner: "fungible_asset_metadata" */
  fungible_asset_metadata_stream: Array<Fungible_Asset_Metadata>;
  /** fetch data from the table: "indexer_status" */
  indexer_status: Array<Indexer_Status>;
  /** fetch data from the table: "indexer_status" using primary key columns */
  indexer_status_by_pk?: Maybe<Indexer_Status>;
  /** fetch data from the table in a streaming manner: "indexer_status" */
  indexer_status_stream: Array<Indexer_Status>;
  /** fetch data from the table: "processor_metadata.ledger_infos" */
  ledger_infos: Array<Ledger_Infos>;
  /** fetch data from the table: "processor_metadata.ledger_infos" using primary key columns */
  ledger_infos_by_pk?: Maybe<Ledger_Infos>;
  /** fetch data from the table in a streaming manner: "processor_metadata.ledger_infos" */
  ledger_infos_stream: Array<Ledger_Infos>;
  /** fetch data from the table: "legacy_migration_v1.move_resources" */
  move_resources: Array<Move_Resources>;
  /** fetch aggregated fields from the table: "legacy_migration_v1.move_resources" */
  move_resources_aggregate: Move_Resources_Aggregate;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.move_resources" */
  move_resources_stream: Array<Move_Resources>;
  /** fetch data from the table: "nft_metadata_crawler.parsed_asset_uris" */
  nft_metadata_crawler_parsed_asset_uris: Array<Nft_Metadata_Crawler_Parsed_Asset_Uris>;
  /** fetch data from the table: "nft_metadata_crawler.parsed_asset_uris" using primary key columns */
  nft_metadata_crawler_parsed_asset_uris_by_pk?: Maybe<Nft_Metadata_Crawler_Parsed_Asset_Uris>;
  /** fetch data from the table in a streaming manner: "nft_metadata_crawler.parsed_asset_uris" */
  nft_metadata_crawler_parsed_asset_uris_stream: Array<Nft_Metadata_Crawler_Parsed_Asset_Uris>;
  /** fetch data from the table: "num_active_delegator_per_pool" */
  num_active_delegator_per_pool: Array<Num_Active_Delegator_Per_Pool>;
  /** fetch data from the table in a streaming manner: "num_active_delegator_per_pool" */
  num_active_delegator_per_pool_stream: Array<Num_Active_Delegator_Per_Pool>;
  /** fetch data from the table: "processor_metadata.processor_status" */
  processor_status: Array<Processor_Status>;
  /** fetch data from the table: "processor_metadata.processor_status" using primary key columns */
  processor_status_by_pk?: Maybe<Processor_Status>;
  /** fetch data from the table in a streaming manner: "processor_metadata.processor_status" */
  processor_status_stream: Array<Processor_Status>;
  /** fetch data from the table: "proposal_votes" */
  proposal_votes: Array<Proposal_Votes>;
  /** fetch aggregated fields from the table: "proposal_votes" */
  proposal_votes_aggregate: Proposal_Votes_Aggregate;
  /** fetch data from the table: "proposal_votes" using primary key columns */
  proposal_votes_by_pk?: Maybe<Proposal_Votes>;
  /** fetch data from the table in a streaming manner: "proposal_votes" */
  proposal_votes_stream: Array<Proposal_Votes>;
  /** fetch data from the table: "signatures" */
  signatures: Array<Signatures>;
  /** fetch data from the table: "signatures" using primary key columns */
  signatures_by_pk?: Maybe<Signatures>;
  /** fetch data from the table in a streaming manner: "signatures" */
  signatures_stream: Array<Signatures>;
  /** fetch data from the table: "table_items" */
  table_items: Array<Table_Items>;
  /** fetch data from the table: "table_items" using primary key columns */
  table_items_by_pk?: Maybe<Table_Items>;
  /** fetch data from the table in a streaming manner: "table_items" */
  table_items_stream: Array<Table_Items>;
  /** fetch data from the table: "table_metadatas" */
  table_metadatas: Array<Table_Metadatas>;
  /** fetch data from the table: "table_metadatas" using primary key columns */
  table_metadatas_by_pk?: Maybe<Table_Metadatas>;
  /** fetch data from the table in a streaming manner: "table_metadatas" */
  table_metadatas_stream: Array<Table_Metadatas>;
  /** An array relationship */
  token_activities: Array<Token_Activities>;
  /** An aggregate relationship */
  token_activities_aggregate: Token_Activities_Aggregate;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.token_activities" */
  token_activities_stream: Array<Token_Activities>;
  /** An array relationship */
  token_activities_v2: Array<Token_Activities_V2>;
  /** An aggregate relationship */
  token_activities_v2_aggregate: Token_Activities_V2_Aggregate;
  /** fetch data from the table: "token_activities_v2" using primary key columns */
  token_activities_v2_by_pk?: Maybe<Token_Activities_V2>;
  /** fetch data from the table in a streaming manner: "token_activities_v2" */
  token_activities_v2_stream: Array<Token_Activities_V2>;
  /** fetch data from the table: "legacy_migration_v1.token_datas" */
  token_datas: Array<Token_Datas>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.token_datas" */
  token_datas_stream: Array<Token_Datas>;
  /** fetch data from the table: "legacy_migration_v1.token_ownerships" */
  token_ownerships: Array<Token_Ownerships>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.token_ownerships" */
  token_ownerships_stream: Array<Token_Ownerships>;
  /** fetch data from the table: "legacy_migration_v1.tokens" */
  tokens: Array<Tokens>;
  /** fetch data from the table in a streaming manner: "legacy_migration_v1.tokens" */
  tokens_stream: Array<Tokens>;
  /** fetch data from the table: "user_transactions" */
  user_transactions: Array<User_Transactions>;
  /** fetch data from the table: "user_transactions" using primary key columns */
  user_transactions_by_pk?: Maybe<User_Transactions>;
  /** fetch data from the table in a streaming manner: "user_transactions" */
  user_transactions_stream: Array<User_Transactions>;
};


export type Subscription_RootAccount_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<Account_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transactions_Order_By>>;
  where?: InputMaybe<Account_Transactions_Bool_Exp>;
};


export type Subscription_RootAccount_Transactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Account_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Account_Transactions_Order_By>>;
  where?: InputMaybe<Account_Transactions_Bool_Exp>;
};


export type Subscription_RootAccount_Transactions_By_PkArgs = {
  account_address: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootAccount_Transactions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Account_Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Account_Transactions_Bool_Exp>;
};


export type Subscription_RootAddress_Events_SummaryArgs = {
  distinct_on?: InputMaybe<Array<Address_Events_Summary_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Events_Summary_Order_By>>;
  where?: InputMaybe<Address_Events_Summary_Bool_Exp>;
};


export type Subscription_RootAddress_Events_Summary_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Address_Events_Summary_Stream_Cursor_Input>>;
  where?: InputMaybe<Address_Events_Summary_Bool_Exp>;
};


export type Subscription_RootAddress_Version_From_EventsArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Events_Order_By>>;
  where?: InputMaybe<Address_Version_From_Events_Bool_Exp>;
};


export type Subscription_RootAddress_Version_From_Events_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Events_Order_By>>;
  where?: InputMaybe<Address_Version_From_Events_Bool_Exp>;
};


export type Subscription_RootAddress_Version_From_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Address_Version_From_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Address_Version_From_Events_Bool_Exp>;
};


export type Subscription_RootAddress_Version_From_Move_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Move_Resources_Order_By>>;
  where?: InputMaybe<Address_Version_From_Move_Resources_Bool_Exp>;
};


export type Subscription_RootAddress_Version_From_Move_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Address_Version_From_Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Address_Version_From_Move_Resources_Order_By>>;
  where?: InputMaybe<Address_Version_From_Move_Resources_Bool_Exp>;
};


export type Subscription_RootAddress_Version_From_Move_Resources_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Address_Version_From_Move_Resources_Stream_Cursor_Input>>;
  where?: InputMaybe<Address_Version_From_Move_Resources_Bool_Exp>;
};


export type Subscription_RootBlock_Metadata_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<Block_Metadata_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Block_Metadata_Transactions_Order_By>>;
  where?: InputMaybe<Block_Metadata_Transactions_Bool_Exp>;
};


export type Subscription_RootBlock_Metadata_Transactions_By_PkArgs = {
  version: Scalars['bigint']['input'];
};


export type Subscription_RootBlock_Metadata_Transactions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Block_Metadata_Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Block_Metadata_Transactions_Bool_Exp>;
};


export type Subscription_RootCoin_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


export type Subscription_RootCoin_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coin_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Activities_Order_By>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


export type Subscription_RootCoin_Activities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Coin_Activities_Stream_Cursor_Input>>;
  where?: InputMaybe<Coin_Activities_Bool_Exp>;
};


export type Subscription_RootCoin_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Coin_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Balances_Order_By>>;
  where?: InputMaybe<Coin_Balances_Bool_Exp>;
};


export type Subscription_RootCoin_Balances_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Coin_Balances_Stream_Cursor_Input>>;
  where?: InputMaybe<Coin_Balances_Bool_Exp>;
};


export type Subscription_RootCoin_InfosArgs = {
  distinct_on?: InputMaybe<Array<Coin_Infos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Infos_Order_By>>;
  where?: InputMaybe<Coin_Infos_Bool_Exp>;
};


export type Subscription_RootCoin_Infos_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Coin_Infos_Stream_Cursor_Input>>;
  where?: InputMaybe<Coin_Infos_Bool_Exp>;
};


export type Subscription_RootCoin_SupplyArgs = {
  distinct_on?: InputMaybe<Array<Coin_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coin_Supply_Order_By>>;
  where?: InputMaybe<Coin_Supply_Bool_Exp>;
};


export type Subscription_RootCoin_Supply_By_PkArgs = {
  coin_type_hash: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootCoin_Supply_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Coin_Supply_Stream_Cursor_Input>>;
  where?: InputMaybe<Coin_Supply_Bool_Exp>;
};


export type Subscription_RootCollection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Collection_Datas_Order_By>>;
  where?: InputMaybe<Collection_Datas_Bool_Exp>;
};


export type Subscription_RootCollection_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Collection_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Collection_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Ans_LookupArgs = {
  distinct_on?: InputMaybe<Array<Current_Ans_Lookup_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Ans_Lookup_Order_By>>;
  where?: InputMaybe<Current_Ans_Lookup_Bool_Exp>;
};


export type Subscription_RootCurrent_Ans_Lookup_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Ans_Lookup_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Ans_Lookup_Bool_Exp>;
};


export type Subscription_RootCurrent_Ans_Lookup_V2Args = {
  distinct_on?: InputMaybe<Array<Current_Ans_Lookup_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Ans_Lookup_V2_Order_By>>;
  where?: InputMaybe<Current_Ans_Lookup_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Ans_Lookup_V2_By_PkArgs = {
  domain: Scalars['String']['input'];
  subdomain: Scalars['String']['input'];
  token_standard: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Ans_Lookup_V2_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Ans_Lookup_V2_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Ans_Lookup_V2_Bool_Exp>;
};


export type Subscription_RootCurrent_Aptos_NamesArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


export type Subscription_RootCurrent_Aptos_Names_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


export type Subscription_RootCurrent_Aptos_Names_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Aptos_Names_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


export type Subscription_RootCurrent_Coin_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Coin_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Coin_Balances_Order_By>>;
  where?: InputMaybe<Current_Coin_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Coin_Balances_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Coin_Balances_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Coin_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_DatasArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Datas_Order_By>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Collection_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Collection_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_Ownership_V2_ViewArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Order_By>>;
  where?: InputMaybe<Current_Collection_Ownership_V2_View_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_Ownership_V2_View_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Collection_Ownership_V2_View_Order_By>>;
  where?: InputMaybe<Current_Collection_Ownership_V2_View_Bool_Exp>;
};


export type Subscription_RootCurrent_Collection_Ownership_V2_View_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Collection_Ownership_V2_View_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Collection_Ownership_V2_View_Bool_Exp>;
};


export type Subscription_RootCurrent_Collections_V2Args = {
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


export type Subscription_RootCurrent_Delegated_Staking_Pool_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Delegated_Staking_Pool_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Delegated_Staking_Pool_Balances_Order_By>>;
  where?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Delegated_Staking_Pool_Balances_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Delegated_Staking_Pool_Balances_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Delegated_Staking_Pool_Balances_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Delegated_VoterArgs = {
  distinct_on?: InputMaybe<Array<Current_Delegated_Voter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Delegated_Voter_Order_By>>;
  where?: InputMaybe<Current_Delegated_Voter_Bool_Exp>;
};


export type Subscription_RootCurrent_Delegated_Voter_By_PkArgs = {
  delegation_pool_address: Scalars['String']['input'];
  delegator_address: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Delegated_Voter_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Delegated_Voter_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Delegated_Voter_Bool_Exp>;
};


export type Subscription_RootCurrent_Delegator_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Delegator_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Delegator_Balances_Order_By>>;
  where?: InputMaybe<Current_Delegator_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Delegator_Balances_By_PkArgs = {
  delegator_address: Scalars['String']['input'];
  pool_address: Scalars['String']['input'];
  pool_type: Scalars['String']['input'];
  table_handle: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Delegator_Balances_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Delegator_Balances_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Delegator_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Fungible_Asset_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Current_Fungible_Asset_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Fungible_Asset_Balances_Order_By>>;
  where?: InputMaybe<Current_Fungible_Asset_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Fungible_Asset_Balances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Fungible_Asset_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Fungible_Asset_Balances_Order_By>>;
  where?: InputMaybe<Current_Fungible_Asset_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_Fungible_Asset_Balances_By_PkArgs = {
  storage_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Fungible_Asset_Balances_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Fungible_Asset_Balances_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Fungible_Asset_Balances_Bool_Exp>;
};


export type Subscription_RootCurrent_ObjectsArgs = {
  distinct_on?: InputMaybe<Array<Current_Objects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Objects_Order_By>>;
  where?: InputMaybe<Current_Objects_Bool_Exp>;
};


export type Subscription_RootCurrent_Objects_By_PkArgs = {
  object_address: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Objects_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Objects_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Objects_Bool_Exp>;
};


export type Subscription_RootCurrent_Staking_Pool_VoterArgs = {
  distinct_on?: InputMaybe<Array<Current_Staking_Pool_Voter_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Staking_Pool_Voter_Order_By>>;
  where?: InputMaybe<Current_Staking_Pool_Voter_Bool_Exp>;
};


export type Subscription_RootCurrent_Staking_Pool_Voter_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Staking_Pool_Voter_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Staking_Pool_Voter_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Staking_Pool_Voter_Bool_Exp>;
};


export type Subscription_RootCurrent_Table_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Current_Table_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Table_Items_Order_By>>;
  where?: InputMaybe<Current_Table_Items_Bool_Exp>;
};


export type Subscription_RootCurrent_Table_Items_By_PkArgs = {
  key_hash: Scalars['String']['input'];
  table_handle: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Table_Items_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Table_Items_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Table_Items_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_DatasArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Datas_Order_By>>;
  where?: InputMaybe<Current_Token_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Token_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Token_Datas_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Datas_V2Args = {
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


export type Subscription_RootCurrent_Token_Pending_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Current_Token_Pending_Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Pending_Claims_Order_By>>;
  where?: InputMaybe<Current_Token_Pending_Claims_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Pending_Claims_By_PkArgs = {
  from_address: Scalars['String']['input'];
  property_version: Scalars['numeric']['input'];
  to_address: Scalars['String']['input'];
  token_data_id_hash: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Token_Pending_Claims_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Token_Pending_Claims_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Token_Pending_Claims_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Royalty_V1Args = {
  distinct_on?: InputMaybe<Array<Current_Token_Royalty_V1_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Token_Royalty_V1_Order_By>>;
  where?: InputMaybe<Current_Token_Royalty_V1_Bool_Exp>;
};


export type Subscription_RootCurrent_Token_Royalty_V1_By_PkArgs = {
  token_data_id: Scalars['String']['input'];
};


export type Subscription_RootCurrent_Token_Royalty_V1_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Current_Token_Royalty_V1_Stream_Cursor_Input>>;
  where?: InputMaybe<Current_Token_Royalty_V1_Bool_Exp>;
};


export type Subscription_RootDelegated_Staking_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Activities_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
};


export type Subscription_RootDelegated_Staking_Activities_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootDelegated_Staking_Activities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Delegated_Staking_Activities_Stream_Cursor_Input>>;
  where?: InputMaybe<Delegated_Staking_Activities_Bool_Exp>;
};


export type Subscription_RootDelegated_Staking_Pool_BalancesArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Subscription_RootDelegated_Staking_Pool_Balances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Pool_Balances_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Subscription_RootDelegated_Staking_Pool_Balances_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootDelegated_Staking_Pool_Balances_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Delegated_Staking_Pool_Balances_Stream_Cursor_Input>>;
  where?: InputMaybe<Delegated_Staking_Pool_Balances_Bool_Exp>;
};


export type Subscription_RootDelegated_Staking_PoolsArgs = {
  distinct_on?: InputMaybe<Array<Delegated_Staking_Pools_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegated_Staking_Pools_Order_By>>;
  where?: InputMaybe<Delegated_Staking_Pools_Bool_Exp>;
};


export type Subscription_RootDelegated_Staking_Pools_By_PkArgs = {
  staking_pool_address: Scalars['String']['input'];
};


export type Subscription_RootDelegated_Staking_Pools_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Delegated_Staking_Pools_Stream_Cursor_Input>>;
  where?: InputMaybe<Delegated_Staking_Pools_Bool_Exp>;
};


export type Subscription_RootDelegator_Distinct_PoolArgs = {
  distinct_on?: InputMaybe<Array<Delegator_Distinct_Pool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegator_Distinct_Pool_Order_By>>;
  where?: InputMaybe<Delegator_Distinct_Pool_Bool_Exp>;
};


export type Subscription_RootDelegator_Distinct_Pool_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Delegator_Distinct_Pool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Delegator_Distinct_Pool_Order_By>>;
  where?: InputMaybe<Delegator_Distinct_Pool_Bool_Exp>;
};


export type Subscription_RootDelegator_Distinct_Pool_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Delegator_Distinct_Pool_Stream_Cursor_Input>>;
  where?: InputMaybe<Delegator_Distinct_Pool_Bool_Exp>;
};


export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootFungible_Asset_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Fungible_Asset_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fungible_Asset_Activities_Order_By>>;
  where?: InputMaybe<Fungible_Asset_Activities_Bool_Exp>;
};


export type Subscription_RootFungible_Asset_Activities_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootFungible_Asset_Activities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Fungible_Asset_Activities_Stream_Cursor_Input>>;
  where?: InputMaybe<Fungible_Asset_Activities_Bool_Exp>;
};


export type Subscription_RootFungible_Asset_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Fungible_Asset_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Fungible_Asset_Metadata_Order_By>>;
  where?: InputMaybe<Fungible_Asset_Metadata_Bool_Exp>;
};


export type Subscription_RootFungible_Asset_Metadata_By_PkArgs = {
  asset_type: Scalars['String']['input'];
};


export type Subscription_RootFungible_Asset_Metadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Fungible_Asset_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Fungible_Asset_Metadata_Bool_Exp>;
};


export type Subscription_RootIndexer_StatusArgs = {
  distinct_on?: InputMaybe<Array<Indexer_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Indexer_Status_Order_By>>;
  where?: InputMaybe<Indexer_Status_Bool_Exp>;
};


export type Subscription_RootIndexer_Status_By_PkArgs = {
  db: Scalars['String']['input'];
};


export type Subscription_RootIndexer_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Indexer_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Indexer_Status_Bool_Exp>;
};


export type Subscription_RootLedger_InfosArgs = {
  distinct_on?: InputMaybe<Array<Ledger_Infos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ledger_Infos_Order_By>>;
  where?: InputMaybe<Ledger_Infos_Bool_Exp>;
};


export type Subscription_RootLedger_Infos_By_PkArgs = {
  chain_id: Scalars['bigint']['input'];
};


export type Subscription_RootLedger_Infos_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ledger_Infos_Stream_Cursor_Input>>;
  where?: InputMaybe<Ledger_Infos_Bool_Exp>;
};


export type Subscription_RootMove_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Move_Resources_Order_By>>;
  where?: InputMaybe<Move_Resources_Bool_Exp>;
};


export type Subscription_RootMove_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Move_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Move_Resources_Order_By>>;
  where?: InputMaybe<Move_Resources_Bool_Exp>;
};


export type Subscription_RootMove_Resources_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Move_Resources_Stream_Cursor_Input>>;
  where?: InputMaybe<Move_Resources_Bool_Exp>;
};


export type Subscription_RootNft_Metadata_Crawler_Parsed_Asset_UrisArgs = {
  distinct_on?: InputMaybe<Array<Nft_Metadata_Crawler_Parsed_Asset_Uris_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Nft_Metadata_Crawler_Parsed_Asset_Uris_Order_By>>;
  where?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>;
};


export type Subscription_RootNft_Metadata_Crawler_Parsed_Asset_Uris_By_PkArgs = {
  asset_uri: Scalars['String']['input'];
};


export type Subscription_RootNft_Metadata_Crawler_Parsed_Asset_Uris_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Stream_Cursor_Input>>;
  where?: InputMaybe<Nft_Metadata_Crawler_Parsed_Asset_Uris_Bool_Exp>;
};


export type Subscription_RootNum_Active_Delegator_Per_PoolArgs = {
  distinct_on?: InputMaybe<Array<Num_Active_Delegator_Per_Pool_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Num_Active_Delegator_Per_Pool_Order_By>>;
  where?: InputMaybe<Num_Active_Delegator_Per_Pool_Bool_Exp>;
};


export type Subscription_RootNum_Active_Delegator_Per_Pool_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Num_Active_Delegator_Per_Pool_Stream_Cursor_Input>>;
  where?: InputMaybe<Num_Active_Delegator_Per_Pool_Bool_Exp>;
};


export type Subscription_RootProcessor_StatusArgs = {
  distinct_on?: InputMaybe<Array<Processor_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Processor_Status_Order_By>>;
  where?: InputMaybe<Processor_Status_Bool_Exp>;
};


export type Subscription_RootProcessor_Status_By_PkArgs = {
  processor: Scalars['String']['input'];
};


export type Subscription_RootProcessor_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Processor_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Processor_Status_Bool_Exp>;
};


export type Subscription_RootProposal_VotesArgs = {
  distinct_on?: InputMaybe<Array<Proposal_Votes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Proposal_Votes_Order_By>>;
  where?: InputMaybe<Proposal_Votes_Bool_Exp>;
};


export type Subscription_RootProposal_Votes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Proposal_Votes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Proposal_Votes_Order_By>>;
  where?: InputMaybe<Proposal_Votes_Bool_Exp>;
};


export type Subscription_RootProposal_Votes_By_PkArgs = {
  proposal_id: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
  voter_address: Scalars['String']['input'];
};


export type Subscription_RootProposal_Votes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Proposal_Votes_Stream_Cursor_Input>>;
  where?: InputMaybe<Proposal_Votes_Bool_Exp>;
};


export type Subscription_RootSignaturesArgs = {
  distinct_on?: InputMaybe<Array<Signatures_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Signatures_Order_By>>;
  where?: InputMaybe<Signatures_Bool_Exp>;
};


export type Subscription_RootSignatures_By_PkArgs = {
  is_sender_primary: Scalars['Boolean']['input'];
  multi_agent_index: Scalars['bigint']['input'];
  multi_sig_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootSignatures_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Signatures_Stream_Cursor_Input>>;
  where?: InputMaybe<Signatures_Bool_Exp>;
};


export type Subscription_RootTable_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Table_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Table_Items_Order_By>>;
  where?: InputMaybe<Table_Items_Bool_Exp>;
};


export type Subscription_RootTable_Items_By_PkArgs = {
  transaction_version: Scalars['bigint']['input'];
  write_set_change_index: Scalars['bigint']['input'];
};


export type Subscription_RootTable_Items_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Table_Items_Stream_Cursor_Input>>;
  where?: InputMaybe<Table_Items_Bool_Exp>;
};


export type Subscription_RootTable_MetadatasArgs = {
  distinct_on?: InputMaybe<Array<Table_Metadatas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Table_Metadatas_Order_By>>;
  where?: InputMaybe<Table_Metadatas_Bool_Exp>;
};


export type Subscription_RootTable_Metadatas_By_PkArgs = {
  handle: Scalars['String']['input'];
};


export type Subscription_RootTable_Metadatas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Table_Metadatas_Stream_Cursor_Input>>;
  where?: InputMaybe<Table_Metadatas_Bool_Exp>;
};


export type Subscription_RootToken_ActivitiesArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


export type Subscription_RootToken_Activities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_Order_By>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


export type Subscription_RootToken_Activities_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Token_Activities_Stream_Cursor_Input>>;
  where?: InputMaybe<Token_Activities_Bool_Exp>;
};


export type Subscription_RootToken_Activities_V2Args = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


export type Subscription_RootToken_Activities_V2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Activities_V2_Order_By>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


export type Subscription_RootToken_Activities_V2_By_PkArgs = {
  event_index: Scalars['bigint']['input'];
  transaction_version: Scalars['bigint']['input'];
};


export type Subscription_RootToken_Activities_V2_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Token_Activities_V2_Stream_Cursor_Input>>;
  where?: InputMaybe<Token_Activities_V2_Bool_Exp>;
};


export type Subscription_RootToken_DatasArgs = {
  distinct_on?: InputMaybe<Array<Token_Datas_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Datas_Order_By>>;
  where?: InputMaybe<Token_Datas_Bool_Exp>;
};


export type Subscription_RootToken_Datas_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Token_Datas_Stream_Cursor_Input>>;
  where?: InputMaybe<Token_Datas_Bool_Exp>;
};


export type Subscription_RootToken_OwnershipsArgs = {
  distinct_on?: InputMaybe<Array<Token_Ownerships_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Token_Ownerships_Order_By>>;
  where?: InputMaybe<Token_Ownerships_Bool_Exp>;
};


export type Subscription_RootToken_Ownerships_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Token_Ownerships_Stream_Cursor_Input>>;
  where?: InputMaybe<Token_Ownerships_Bool_Exp>;
};


export type Subscription_RootTokensArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tokens_Order_By>>;
  where?: InputMaybe<Tokens_Bool_Exp>;
};


export type Subscription_RootTokens_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tokens_Stream_Cursor_Input>>;
  where?: InputMaybe<Tokens_Bool_Exp>;
};


export type Subscription_RootUser_TransactionsArgs = {
  distinct_on?: InputMaybe<Array<User_Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Transactions_Order_By>>;
  where?: InputMaybe<User_Transactions_Bool_Exp>;
};


export type Subscription_RootUser_Transactions_By_PkArgs = {
  version: Scalars['bigint']['input'];
};


export type Subscription_RootUser_Transactions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Transactions_Bool_Exp>;
};

/** columns and relationships of "table_items" */
export type Table_Items = {
  __typename?: 'table_items';
  decoded_key: Scalars['jsonb']['output'];
  decoded_value?: Maybe<Scalars['jsonb']['output']>;
  key: Scalars['String']['output'];
  table_handle: Scalars['String']['output'];
  transaction_version: Scalars['bigint']['output'];
  write_set_change_index: Scalars['bigint']['output'];
};


/** columns and relationships of "table_items" */
export type Table_ItemsDecoded_KeyArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "table_items" */
export type Table_ItemsDecoded_ValueArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "table_items". All fields are combined with a logical 'AND'. */
export type Table_Items_Bool_Exp = {
  _and?: InputMaybe<Array<Table_Items_Bool_Exp>>;
  _not?: InputMaybe<Table_Items_Bool_Exp>;
  _or?: InputMaybe<Array<Table_Items_Bool_Exp>>;
  decoded_key?: InputMaybe<Jsonb_Comparison_Exp>;
  decoded_value?: InputMaybe<Jsonb_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  write_set_change_index?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "table_items". */
export type Table_Items_Order_By = {
  decoded_key?: InputMaybe<Order_By>;
  decoded_value?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  table_handle?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  write_set_change_index?: InputMaybe<Order_By>;
};

/** select columns of table "table_items" */
export enum Table_Items_Select_Column {
  /** column name */
  DecodedKey = 'decoded_key',
  /** column name */
  DecodedValue = 'decoded_value',
  /** column name */
  Key = 'key',
  /** column name */
  TableHandle = 'table_handle',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  WriteSetChangeIndex = 'write_set_change_index'
}

/** Streaming cursor of the table "table_items" */
export type Table_Items_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Table_Items_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Table_Items_Stream_Cursor_Value_Input = {
  decoded_key?: InputMaybe<Scalars['jsonb']['input']>;
  decoded_value?: InputMaybe<Scalars['jsonb']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  write_set_change_index?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "table_metadatas" */
export type Table_Metadatas = {
  __typename?: 'table_metadatas';
  handle: Scalars['String']['output'];
  key_type: Scalars['String']['output'];
  value_type: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "table_metadatas". All fields are combined with a logical 'AND'. */
export type Table_Metadatas_Bool_Exp = {
  _and?: InputMaybe<Array<Table_Metadatas_Bool_Exp>>;
  _not?: InputMaybe<Table_Metadatas_Bool_Exp>;
  _or?: InputMaybe<Array<Table_Metadatas_Bool_Exp>>;
  handle?: InputMaybe<String_Comparison_Exp>;
  key_type?: InputMaybe<String_Comparison_Exp>;
  value_type?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "table_metadatas". */
export type Table_Metadatas_Order_By = {
  handle?: InputMaybe<Order_By>;
  key_type?: InputMaybe<Order_By>;
  value_type?: InputMaybe<Order_By>;
};

/** select columns of table "table_metadatas" */
export enum Table_Metadatas_Select_Column {
  /** column name */
  Handle = 'handle',
  /** column name */
  KeyType = 'key_type',
  /** column name */
  ValueType = 'value_type'
}

/** Streaming cursor of the table "table_metadatas" */
export type Table_Metadatas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Table_Metadatas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Table_Metadatas_Stream_Cursor_Value_Input = {
  handle?: InputMaybe<Scalars['String']['input']>;
  key_type?: InputMaybe<Scalars['String']['input']>;
  value_type?: InputMaybe<Scalars['String']['input']>;
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

/** columns and relationships of "legacy_migration_v1.token_activities" */
export type Token_Activities = {
  __typename?: 'token_activities';
  /** An array relationship */
  aptos_names_owner: Array<Current_Aptos_Names>;
  /** An aggregate relationship */
  aptos_names_owner_aggregate: Current_Aptos_Names_Aggregate;
  /** An array relationship */
  aptos_names_to: Array<Current_Aptos_Names>;
  /** An aggregate relationship */
  aptos_names_to_aggregate: Current_Aptos_Names_Aggregate;
  coin_amount?: Maybe<Scalars['String']['output']>;
  coin_type?: Maybe<Scalars['String']['output']>;
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  current_token_data?: Maybe<Current_Token_Datas>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  from_address?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  to_address?: Maybe<Scalars['String']['output']>;
  token_amount?: Maybe<Scalars['numeric']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  transfer_type?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "legacy_migration_v1.token_activities" */
export type Token_ActivitiesAptos_Names_OwnerArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.token_activities" */
export type Token_ActivitiesAptos_Names_Owner_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.token_activities" */
export type Token_ActivitiesAptos_Names_ToArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "legacy_migration_v1.token_activities" */
export type Token_ActivitiesAptos_Names_To_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};

/** aggregated selection of "legacy_migration_v1.token_activities" */
export type Token_Activities_Aggregate = {
  __typename?: 'token_activities_aggregate';
  aggregate?: Maybe<Token_Activities_Aggregate_Fields>;
  nodes: Array<Token_Activities>;
};

export type Token_Activities_Aggregate_Bool_Exp = {
  count?: InputMaybe<Token_Activities_Aggregate_Bool_Exp_Count>;
};

export type Token_Activities_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Token_Activities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Activities_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "legacy_migration_v1.token_activities" */
export type Token_Activities_Aggregate_Fields = {
  __typename?: 'token_activities_aggregate_fields';
  avg?: Maybe<Token_Activities_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Token_Activities_Max_Fields>;
  min?: Maybe<Token_Activities_Min_Fields>;
  stddev?: Maybe<Token_Activities_Stddev_Fields>;
  stddev_pop?: Maybe<Token_Activities_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Token_Activities_Stddev_Samp_Fields>;
  sum?: Maybe<Token_Activities_Sum_Fields>;
  var_pop?: Maybe<Token_Activities_Var_Pop_Fields>;
  var_samp?: Maybe<Token_Activities_Var_Samp_Fields>;
  variance?: Maybe<Token_Activities_Variance_Fields>;
};


/** aggregate fields of "legacy_migration_v1.token_activities" */
export type Token_Activities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Token_Activities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Aggregate_Order_By = {
  avg?: InputMaybe<Token_Activities_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Activities_Max_Order_By>;
  min?: InputMaybe<Token_Activities_Min_Order_By>;
  stddev?: InputMaybe<Token_Activities_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Token_Activities_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Token_Activities_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Token_Activities_Sum_Order_By>;
  var_pop?: InputMaybe<Token_Activities_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Token_Activities_Var_Samp_Order_By>;
  variance?: InputMaybe<Token_Activities_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Token_Activities_Avg_Fields = {
  __typename?: 'token_activities_avg_fields';
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Avg_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.token_activities". All fields are combined with a logical 'AND'. */
export type Token_Activities_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Activities_Bool_Exp>>;
  _not?: InputMaybe<Token_Activities_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Activities_Bool_Exp>>;
  aptos_names_owner?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  aptos_names_owner_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp>;
  aptos_names_to?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  aptos_names_to_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp>;
  coin_amount?: InputMaybe<String_Comparison_Exp>;
  coin_type?: InputMaybe<String_Comparison_Exp>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  current_token_data?: InputMaybe<Current_Token_Datas_Bool_Exp>;
  event_account_address?: InputMaybe<String_Comparison_Exp>;
  event_creation_number?: InputMaybe<Int_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  event_sequence_number?: InputMaybe<Int_Comparison_Exp>;
  from_address?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  property_version?: InputMaybe<Numeric_Comparison_Exp>;
  to_address?: InputMaybe<String_Comparison_Exp>;
  token_amount?: InputMaybe<Numeric_Comparison_Exp>;
  token_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  transfer_type?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Token_Activities_Max_Fields = {
  __typename?: 'token_activities_max_fields';
  coin_amount?: Maybe<Scalars['String']['output']>;
  coin_type?: Maybe<Scalars['String']['output']>;
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  from_address?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  to_address?: Maybe<Scalars['String']['output']>;
  token_amount?: Maybe<Scalars['numeric']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  transfer_type?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Max_Order_By = {
  coin_amount?: InputMaybe<Order_By>;
  coin_type?: InputMaybe<Order_By>;
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  from_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  to_address?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  transfer_type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Activities_Min_Fields = {
  __typename?: 'token_activities_min_fields';
  coin_amount?: Maybe<Scalars['String']['output']>;
  coin_type?: Maybe<Scalars['String']['output']>;
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  from_address?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  to_address?: Maybe<Scalars['String']['output']>;
  token_amount?: Maybe<Scalars['numeric']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  transfer_type?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Min_Order_By = {
  coin_amount?: InputMaybe<Order_By>;
  coin_type?: InputMaybe<Order_By>;
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  from_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  to_address?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  transfer_type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "legacy_migration_v1.token_activities". */
export type Token_Activities_Order_By = {
  aptos_names_owner_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Order_By>;
  aptos_names_to_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Order_By>;
  coin_amount?: InputMaybe<Order_By>;
  coin_type?: InputMaybe<Order_By>;
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  current_token_data?: InputMaybe<Current_Token_Datas_Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  from_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  to_address?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  transfer_type?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.token_activities" */
export enum Token_Activities_Select_Column {
  /** column name */
  CoinAmount = 'coin_amount',
  /** column name */
  CoinType = 'coin_type',
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  EventAccountAddress = 'event_account_address',
  /** column name */
  EventCreationNumber = 'event_creation_number',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  EventSequenceNumber = 'event_sequence_number',
  /** column name */
  FromAddress = 'from_address',
  /** column name */
  Name = 'name',
  /** column name */
  PropertyVersion = 'property_version',
  /** column name */
  ToAddress = 'to_address',
  /** column name */
  TokenAmount = 'token_amount',
  /** column name */
  TokenDataIdHash = 'token_data_id_hash',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  TransferType = 'transfer_type'
}

/** aggregate stddev on columns */
export type Token_Activities_Stddev_Fields = {
  __typename?: 'token_activities_stddev_fields';
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Stddev_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Token_Activities_Stddev_Pop_Fields = {
  __typename?: 'token_activities_stddev_pop_fields';
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Stddev_Pop_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Token_Activities_Stddev_Samp_Fields = {
  __typename?: 'token_activities_stddev_samp_fields';
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Stddev_Samp_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "token_activities" */
export type Token_Activities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Activities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Activities_Stream_Cursor_Value_Input = {
  coin_amount?: InputMaybe<Scalars['String']['input']>;
  coin_type?: InputMaybe<Scalars['String']['input']>;
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  event_account_address?: InputMaybe<Scalars['String']['input']>;
  event_creation_number?: InputMaybe<Scalars['Int']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  event_sequence_number?: InputMaybe<Scalars['Int']['input']>;
  from_address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  property_version?: InputMaybe<Scalars['numeric']['input']>;
  to_address?: InputMaybe<Scalars['String']['input']>;
  token_amount?: InputMaybe<Scalars['numeric']['input']>;
  token_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  transfer_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Token_Activities_Sum_Fields = {
  __typename?: 'token_activities_sum_fields';
  event_creation_number?: Maybe<Scalars['Int']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  event_sequence_number?: Maybe<Scalars['Int']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  token_amount?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Sum_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "token_activities_v2" */
export type Token_Activities_V2 = {
  __typename?: 'token_activities_v2';
  after_value?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  aptos_names_from: Array<Current_Aptos_Names>;
  /** An aggregate relationship */
  aptos_names_from_aggregate: Current_Aptos_Names_Aggregate;
  /** An array relationship */
  aptos_names_to: Array<Current_Aptos_Names>;
  /** An aggregate relationship */
  aptos_names_to_aggregate: Current_Aptos_Names_Aggregate;
  before_value?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  current_token_data?: Maybe<Current_Token_Datas_V2>;
  entry_function_id_str?: Maybe<Scalars['String']['output']>;
  event_account_address: Scalars['String']['output'];
  event_index: Scalars['bigint']['output'];
  from_address?: Maybe<Scalars['String']['output']>;
  is_fungible_v2?: Maybe<Scalars['Boolean']['output']>;
  property_version_v1: Scalars['numeric']['output'];
  to_address?: Maybe<Scalars['String']['output']>;
  token_amount: Scalars['numeric']['output'];
  token_data_id: Scalars['String']['output'];
  token_standard: Scalars['String']['output'];
  transaction_timestamp: Scalars['timestamp']['output'];
  transaction_version: Scalars['bigint']['output'];
  type: Scalars['String']['output'];
};


/** columns and relationships of "token_activities_v2" */
export type Token_Activities_V2Aptos_Names_FromArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "token_activities_v2" */
export type Token_Activities_V2Aptos_Names_From_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "token_activities_v2" */
export type Token_Activities_V2Aptos_Names_ToArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};


/** columns and relationships of "token_activities_v2" */
export type Token_Activities_V2Aptos_Names_To_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Current_Aptos_Names_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Current_Aptos_Names_Order_By>>;
  where?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
};

/** aggregated selection of "token_activities_v2" */
export type Token_Activities_V2_Aggregate = {
  __typename?: 'token_activities_v2_aggregate';
  aggregate?: Maybe<Token_Activities_V2_Aggregate_Fields>;
  nodes: Array<Token_Activities_V2>;
};

export type Token_Activities_V2_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Token_Activities_V2_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Token_Activities_V2_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Token_Activities_V2_Aggregate_Bool_Exp_Count>;
};

export type Token_Activities_V2_Aggregate_Bool_Exp_Bool_And = {
  arguments: Token_Activities_V2_Select_Column_Token_Activities_V2_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Activities_V2_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Token_Activities_V2_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Token_Activities_V2_Select_Column_Token_Activities_V2_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Activities_V2_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Token_Activities_V2_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Token_Activities_V2_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "token_activities_v2" */
export type Token_Activities_V2_Aggregate_Fields = {
  __typename?: 'token_activities_v2_aggregate_fields';
  avg?: Maybe<Token_Activities_V2_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Token_Activities_V2_Max_Fields>;
  min?: Maybe<Token_Activities_V2_Min_Fields>;
  stddev?: Maybe<Token_Activities_V2_Stddev_Fields>;
  stddev_pop?: Maybe<Token_Activities_V2_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Token_Activities_V2_Stddev_Samp_Fields>;
  sum?: Maybe<Token_Activities_V2_Sum_Fields>;
  var_pop?: Maybe<Token_Activities_V2_Var_Pop_Fields>;
  var_samp?: Maybe<Token_Activities_V2_Var_Samp_Fields>;
  variance?: Maybe<Token_Activities_V2_Variance_Fields>;
};


/** aggregate fields of "token_activities_v2" */
export type Token_Activities_V2_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Token_Activities_V2_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "token_activities_v2" */
export type Token_Activities_V2_Aggregate_Order_By = {
  avg?: InputMaybe<Token_Activities_V2_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Activities_V2_Max_Order_By>;
  min?: InputMaybe<Token_Activities_V2_Min_Order_By>;
  stddev?: InputMaybe<Token_Activities_V2_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Token_Activities_V2_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Token_Activities_V2_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Token_Activities_V2_Sum_Order_By>;
  var_pop?: InputMaybe<Token_Activities_V2_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Token_Activities_V2_Var_Samp_Order_By>;
  variance?: InputMaybe<Token_Activities_V2_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Token_Activities_V2_Avg_Fields = {
  __typename?: 'token_activities_v2_avg_fields';
  event_index?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Avg_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "token_activities_v2". All fields are combined with a logical 'AND'. */
export type Token_Activities_V2_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Activities_V2_Bool_Exp>>;
  _not?: InputMaybe<Token_Activities_V2_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Activities_V2_Bool_Exp>>;
  after_value?: InputMaybe<String_Comparison_Exp>;
  aptos_names_from?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  aptos_names_from_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp>;
  aptos_names_to?: InputMaybe<Current_Aptos_Names_Bool_Exp>;
  aptos_names_to_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Bool_Exp>;
  before_value?: InputMaybe<String_Comparison_Exp>;
  current_token_data?: InputMaybe<Current_Token_Datas_V2_Bool_Exp>;
  entry_function_id_str?: InputMaybe<String_Comparison_Exp>;
  event_account_address?: InputMaybe<String_Comparison_Exp>;
  event_index?: InputMaybe<Bigint_Comparison_Exp>;
  from_address?: InputMaybe<String_Comparison_Exp>;
  is_fungible_v2?: InputMaybe<Boolean_Comparison_Exp>;
  property_version_v1?: InputMaybe<Numeric_Comparison_Exp>;
  to_address?: InputMaybe<String_Comparison_Exp>;
  token_amount?: InputMaybe<Numeric_Comparison_Exp>;
  token_data_id?: InputMaybe<String_Comparison_Exp>;
  token_standard?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Token_Activities_V2_Max_Fields = {
  __typename?: 'token_activities_v2_max_fields';
  after_value?: Maybe<Scalars['String']['output']>;
  before_value?: Maybe<Scalars['String']['output']>;
  entry_function_id_str?: Maybe<Scalars['String']['output']>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  from_address?: Maybe<Scalars['String']['output']>;
  property_version_v1?: Maybe<Scalars['numeric']['output']>;
  to_address?: Maybe<Scalars['String']['output']>;
  token_amount?: Maybe<Scalars['numeric']['output']>;
  token_data_id?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Max_Order_By = {
  after_value?: InputMaybe<Order_By>;
  before_value?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  from_address?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  to_address?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Activities_V2_Min_Fields = {
  __typename?: 'token_activities_v2_min_fields';
  after_value?: Maybe<Scalars['String']['output']>;
  before_value?: Maybe<Scalars['String']['output']>;
  entry_function_id_str?: Maybe<Scalars['String']['output']>;
  event_account_address?: Maybe<Scalars['String']['output']>;
  event_index?: Maybe<Scalars['bigint']['output']>;
  from_address?: Maybe<Scalars['String']['output']>;
  property_version_v1?: Maybe<Scalars['numeric']['output']>;
  to_address?: Maybe<Scalars['String']['output']>;
  token_amount?: Maybe<Scalars['numeric']['output']>;
  token_data_id?: Maybe<Scalars['String']['output']>;
  token_standard?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Min_Order_By = {
  after_value?: InputMaybe<Order_By>;
  before_value?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  from_address?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  to_address?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "token_activities_v2". */
export type Token_Activities_V2_Order_By = {
  after_value?: InputMaybe<Order_By>;
  aptos_names_from_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Order_By>;
  aptos_names_to_aggregate?: InputMaybe<Current_Aptos_Names_Aggregate_Order_By>;
  before_value?: InputMaybe<Order_By>;
  current_token_data?: InputMaybe<Current_Token_Datas_V2_Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  event_account_address?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  from_address?: InputMaybe<Order_By>;
  is_fungible_v2?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  to_address?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  token_data_id?: InputMaybe<Order_By>;
  token_standard?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "token_activities_v2" */
export enum Token_Activities_V2_Select_Column {
  /** column name */
  AfterValue = 'after_value',
  /** column name */
  BeforeValue = 'before_value',
  /** column name */
  EntryFunctionIdStr = 'entry_function_id_str',
  /** column name */
  EventAccountAddress = 'event_account_address',
  /** column name */
  EventIndex = 'event_index',
  /** column name */
  FromAddress = 'from_address',
  /** column name */
  IsFungibleV2 = 'is_fungible_v2',
  /** column name */
  PropertyVersionV1 = 'property_version_v1',
  /** column name */
  ToAddress = 'to_address',
  /** column name */
  TokenAmount = 'token_amount',
  /** column name */
  TokenDataId = 'token_data_id',
  /** column name */
  TokenStandard = 'token_standard',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  Type = 'type'
}

/** select "token_activities_v2_aggregate_bool_exp_bool_and_arguments_columns" columns of table "token_activities_v2" */
export enum Token_Activities_V2_Select_Column_Token_Activities_V2_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsFungibleV2 = 'is_fungible_v2'
}

/** select "token_activities_v2_aggregate_bool_exp_bool_or_arguments_columns" columns of table "token_activities_v2" */
export enum Token_Activities_V2_Select_Column_Token_Activities_V2_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsFungibleV2 = 'is_fungible_v2'
}

/** aggregate stddev on columns */
export type Token_Activities_V2_Stddev_Fields = {
  __typename?: 'token_activities_v2_stddev_fields';
  event_index?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Stddev_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Token_Activities_V2_Stddev_Pop_Fields = {
  __typename?: 'token_activities_v2_stddev_pop_fields';
  event_index?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Stddev_Pop_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Token_Activities_V2_Stddev_Samp_Fields = {
  __typename?: 'token_activities_v2_stddev_samp_fields';
  event_index?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Stddev_Samp_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "token_activities_v2" */
export type Token_Activities_V2_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Activities_V2_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Activities_V2_Stream_Cursor_Value_Input = {
  after_value?: InputMaybe<Scalars['String']['input']>;
  before_value?: InputMaybe<Scalars['String']['input']>;
  entry_function_id_str?: InputMaybe<Scalars['String']['input']>;
  event_account_address?: InputMaybe<Scalars['String']['input']>;
  event_index?: InputMaybe<Scalars['bigint']['input']>;
  from_address?: InputMaybe<Scalars['String']['input']>;
  is_fungible_v2?: InputMaybe<Scalars['Boolean']['input']>;
  property_version_v1?: InputMaybe<Scalars['numeric']['input']>;
  to_address?: InputMaybe<Scalars['String']['input']>;
  token_amount?: InputMaybe<Scalars['numeric']['input']>;
  token_data_id?: InputMaybe<Scalars['String']['input']>;
  token_standard?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Token_Activities_V2_Sum_Fields = {
  __typename?: 'token_activities_v2_sum_fields';
  event_index?: Maybe<Scalars['bigint']['output']>;
  property_version_v1?: Maybe<Scalars['numeric']['output']>;
  token_amount?: Maybe<Scalars['numeric']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Sum_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Token_Activities_V2_Var_Pop_Fields = {
  __typename?: 'token_activities_v2_var_pop_fields';
  event_index?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Var_Pop_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Token_Activities_V2_Var_Samp_Fields = {
  __typename?: 'token_activities_v2_var_samp_fields';
  event_index?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Var_Samp_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Token_Activities_V2_Variance_Fields = {
  __typename?: 'token_activities_v2_variance_fields';
  event_index?: Maybe<Scalars['Float']['output']>;
  property_version_v1?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "token_activities_v2" */
export type Token_Activities_V2_Variance_Order_By = {
  event_index?: InputMaybe<Order_By>;
  property_version_v1?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Token_Activities_Var_Pop_Fields = {
  __typename?: 'token_activities_var_pop_fields';
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Var_Pop_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Token_Activities_Var_Samp_Fields = {
  __typename?: 'token_activities_var_samp_fields';
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Var_Samp_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Token_Activities_Variance_Fields = {
  __typename?: 'token_activities_variance_fields';
  event_creation_number?: Maybe<Scalars['Float']['output']>;
  event_index?: Maybe<Scalars['Float']['output']>;
  event_sequence_number?: Maybe<Scalars['Float']['output']>;
  property_version?: Maybe<Scalars['Float']['output']>;
  token_amount?: Maybe<Scalars['Float']['output']>;
  transaction_version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "legacy_migration_v1.token_activities" */
export type Token_Activities_Variance_Order_By = {
  event_creation_number?: InputMaybe<Order_By>;
  event_index?: InputMaybe<Order_By>;
  event_sequence_number?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_amount?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** columns and relationships of "legacy_migration_v1.token_datas" */
export type Token_Datas = {
  __typename?: 'token_datas';
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  default_properties?: Maybe<Scalars['jsonb']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  description_mutable?: Maybe<Scalars['Boolean']['output']>;
  largest_property_version?: Maybe<Scalars['numeric']['output']>;
  maximum?: Maybe<Scalars['numeric']['output']>;
  maximum_mutable?: Maybe<Scalars['Boolean']['output']>;
  metadata_uri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payee_address?: Maybe<Scalars['String']['output']>;
  properties_mutable?: Maybe<Scalars['Boolean']['output']>;
  royalty_mutable?: Maybe<Scalars['Boolean']['output']>;
  royalty_points_denominator?: Maybe<Scalars['String']['output']>;
  royalty_points_numerator?: Maybe<Scalars['String']['output']>;
  supply?: Maybe<Scalars['numeric']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
  uri_mutable?: Maybe<Scalars['Boolean']['output']>;
};


/** columns and relationships of "legacy_migration_v1.token_datas" */
export type Token_DatasDefault_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.token_datas". All fields are combined with a logical 'AND'. */
export type Token_Datas_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Datas_Bool_Exp>>;
  _not?: InputMaybe<Token_Datas_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Datas_Bool_Exp>>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  default_properties?: InputMaybe<Jsonb_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  description_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  largest_property_version?: InputMaybe<Numeric_Comparison_Exp>;
  maximum?: InputMaybe<Numeric_Comparison_Exp>;
  maximum_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  metadata_uri?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  payee_address?: InputMaybe<String_Comparison_Exp>;
  properties_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  royalty_mutable?: InputMaybe<Boolean_Comparison_Exp>;
  royalty_points_denominator?: InputMaybe<String_Comparison_Exp>;
  royalty_points_numerator?: InputMaybe<String_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  token_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
  uri_mutable?: InputMaybe<Boolean_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.token_datas". */
export type Token_Datas_Order_By = {
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  default_properties?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  description_mutable?: InputMaybe<Order_By>;
  largest_property_version?: InputMaybe<Order_By>;
  maximum?: InputMaybe<Order_By>;
  maximum_mutable?: InputMaybe<Order_By>;
  metadata_uri?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  payee_address?: InputMaybe<Order_By>;
  properties_mutable?: InputMaybe<Order_By>;
  royalty_mutable?: InputMaybe<Order_By>;
  royalty_points_denominator?: InputMaybe<Order_By>;
  royalty_points_numerator?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
  uri_mutable?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.token_datas" */
export enum Token_Datas_Select_Column {
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  DefaultProperties = 'default_properties',
  /** column name */
  Description = 'description',
  /** column name */
  DescriptionMutable = 'description_mutable',
  /** column name */
  LargestPropertyVersion = 'largest_property_version',
  /** column name */
  Maximum = 'maximum',
  /** column name */
  MaximumMutable = 'maximum_mutable',
  /** column name */
  MetadataUri = 'metadata_uri',
  /** column name */
  Name = 'name',
  /** column name */
  PayeeAddress = 'payee_address',
  /** column name */
  PropertiesMutable = 'properties_mutable',
  /** column name */
  RoyaltyMutable = 'royalty_mutable',
  /** column name */
  RoyaltyPointsDenominator = 'royalty_points_denominator',
  /** column name */
  RoyaltyPointsNumerator = 'royalty_points_numerator',
  /** column name */
  Supply = 'supply',
  /** column name */
  TokenDataIdHash = 'token_data_id_hash',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version',
  /** column name */
  UriMutable = 'uri_mutable'
}

/** Streaming cursor of the table "token_datas" */
export type Token_Datas_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Datas_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Datas_Stream_Cursor_Value_Input = {
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  default_properties?: InputMaybe<Scalars['jsonb']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  largest_property_version?: InputMaybe<Scalars['numeric']['input']>;
  maximum?: InputMaybe<Scalars['numeric']['input']>;
  maximum_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  metadata_uri?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payee_address?: InputMaybe<Scalars['String']['input']>;
  properties_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  royalty_mutable?: InputMaybe<Scalars['Boolean']['input']>;
  royalty_points_denominator?: InputMaybe<Scalars['String']['input']>;
  royalty_points_numerator?: InputMaybe<Scalars['String']['input']>;
  supply?: InputMaybe<Scalars['numeric']['input']>;
  token_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
  uri_mutable?: InputMaybe<Scalars['Boolean']['input']>;
};

/** columns and relationships of "legacy_migration_v1.token_ownerships" */
export type Token_Ownerships = {
  __typename?: 'token_ownerships';
  amount?: Maybe<Scalars['numeric']['output']>;
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_address?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  table_handle?: Maybe<Scalars['String']['output']>;
  table_type?: Maybe<Scalars['String']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.token_ownerships". All fields are combined with a logical 'AND'. */
export type Token_Ownerships_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Ownerships_Bool_Exp>>;
  _not?: InputMaybe<Token_Ownerships_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Ownerships_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner_address?: InputMaybe<String_Comparison_Exp>;
  property_version?: InputMaybe<Numeric_Comparison_Exp>;
  table_handle?: InputMaybe<String_Comparison_Exp>;
  table_type?: InputMaybe<String_Comparison_Exp>;
  token_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.token_ownerships". */
export type Token_Ownerships_Order_By = {
  amount?: InputMaybe<Order_By>;
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_address?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  table_handle?: InputMaybe<Order_By>;
  table_type?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.token_ownerships" */
export enum Token_Ownerships_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerAddress = 'owner_address',
  /** column name */
  PropertyVersion = 'property_version',
  /** column name */
  TableHandle = 'table_handle',
  /** column name */
  TableType = 'table_type',
  /** column name */
  TokenDataIdHash = 'token_data_id_hash',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** Streaming cursor of the table "token_ownerships" */
export type Token_Ownerships_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Ownerships_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Ownerships_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_address?: InputMaybe<Scalars['String']['input']>;
  property_version?: InputMaybe<Scalars['numeric']['input']>;
  table_handle?: InputMaybe<Scalars['String']['input']>;
  table_type?: InputMaybe<Scalars['String']['input']>;
  token_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "legacy_migration_v1.tokens" */
export type Tokens = {
  __typename?: 'tokens';
  collection_data_id_hash?: Maybe<Scalars['String']['output']>;
  collection_name?: Maybe<Scalars['String']['output']>;
  creator_address?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  property_version?: Maybe<Scalars['numeric']['output']>;
  token_data_id_hash?: Maybe<Scalars['String']['output']>;
  token_properties?: Maybe<Scalars['jsonb']['output']>;
  transaction_timestamp?: Maybe<Scalars['timestamp']['output']>;
  transaction_version?: Maybe<Scalars['bigint']['output']>;
};


/** columns and relationships of "legacy_migration_v1.tokens" */
export type TokensToken_PropertiesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "legacy_migration_v1.tokens". All fields are combined with a logical 'AND'. */
export type Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<Tokens_Bool_Exp>>;
  _not?: InputMaybe<Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<Tokens_Bool_Exp>>;
  collection_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  collection_name?: InputMaybe<String_Comparison_Exp>;
  creator_address?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  property_version?: InputMaybe<Numeric_Comparison_Exp>;
  token_data_id_hash?: InputMaybe<String_Comparison_Exp>;
  token_properties?: InputMaybe<Jsonb_Comparison_Exp>;
  transaction_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  transaction_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "legacy_migration_v1.tokens". */
export type Tokens_Order_By = {
  collection_data_id_hash?: InputMaybe<Order_By>;
  collection_name?: InputMaybe<Order_By>;
  creator_address?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  property_version?: InputMaybe<Order_By>;
  token_data_id_hash?: InputMaybe<Order_By>;
  token_properties?: InputMaybe<Order_By>;
  transaction_timestamp?: InputMaybe<Order_By>;
  transaction_version?: InputMaybe<Order_By>;
};

/** select columns of table "legacy_migration_v1.tokens" */
export enum Tokens_Select_Column {
  /** column name */
  CollectionDataIdHash = 'collection_data_id_hash',
  /** column name */
  CollectionName = 'collection_name',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  Name = 'name',
  /** column name */
  PropertyVersion = 'property_version',
  /** column name */
  TokenDataIdHash = 'token_data_id_hash',
  /** column name */
  TokenProperties = 'token_properties',
  /** column name */
  TransactionTimestamp = 'transaction_timestamp',
  /** column name */
  TransactionVersion = 'transaction_version'
}

/** Streaming cursor of the table "tokens" */
export type Tokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tokens_Stream_Cursor_Value_Input = {
  collection_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  collection_name?: InputMaybe<Scalars['String']['input']>;
  creator_address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  property_version?: InputMaybe<Scalars['numeric']['input']>;
  token_data_id_hash?: InputMaybe<Scalars['String']['input']>;
  token_properties?: InputMaybe<Scalars['jsonb']['input']>;
  transaction_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  transaction_version?: InputMaybe<Scalars['bigint']['input']>;
};

/** columns and relationships of "user_transactions" */
export type User_Transactions = {
  __typename?: 'user_transactions';
  block_height: Scalars['bigint']['output'];
  entry_function_contract_address?: Maybe<Scalars['String']['output']>;
  entry_function_function_name?: Maybe<Scalars['String']['output']>;
  entry_function_id_str: Scalars['String']['output'];
  entry_function_module_name?: Maybe<Scalars['String']['output']>;
  epoch: Scalars['bigint']['output'];
  expiration_timestamp_secs: Scalars['timestamp']['output'];
  gas_unit_price: Scalars['numeric']['output'];
  max_gas_amount: Scalars['numeric']['output'];
  parent_signature_type: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  sequence_number: Scalars['bigint']['output'];
  timestamp: Scalars['timestamp']['output'];
  version: Scalars['bigint']['output'];
};

/** Boolean expression to filter rows from the table "user_transactions". All fields are combined with a logical 'AND'. */
export type User_Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<User_Transactions_Bool_Exp>>;
  _not?: InputMaybe<User_Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<User_Transactions_Bool_Exp>>;
  block_height?: InputMaybe<Bigint_Comparison_Exp>;
  entry_function_contract_address?: InputMaybe<String_Comparison_Exp>;
  entry_function_function_name?: InputMaybe<String_Comparison_Exp>;
  entry_function_id_str?: InputMaybe<String_Comparison_Exp>;
  entry_function_module_name?: InputMaybe<String_Comparison_Exp>;
  epoch?: InputMaybe<Bigint_Comparison_Exp>;
  expiration_timestamp_secs?: InputMaybe<Timestamp_Comparison_Exp>;
  gas_unit_price?: InputMaybe<Numeric_Comparison_Exp>;
  max_gas_amount?: InputMaybe<Numeric_Comparison_Exp>;
  parent_signature_type?: InputMaybe<String_Comparison_Exp>;
  sender?: InputMaybe<String_Comparison_Exp>;
  sequence_number?: InputMaybe<Bigint_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "user_transactions". */
export type User_Transactions_Order_By = {
  block_height?: InputMaybe<Order_By>;
  entry_function_contract_address?: InputMaybe<Order_By>;
  entry_function_function_name?: InputMaybe<Order_By>;
  entry_function_id_str?: InputMaybe<Order_By>;
  entry_function_module_name?: InputMaybe<Order_By>;
  epoch?: InputMaybe<Order_By>;
  expiration_timestamp_secs?: InputMaybe<Order_By>;
  gas_unit_price?: InputMaybe<Order_By>;
  max_gas_amount?: InputMaybe<Order_By>;
  parent_signature_type?: InputMaybe<Order_By>;
  sender?: InputMaybe<Order_By>;
  sequence_number?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "user_transactions" */
export enum User_Transactions_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  EntryFunctionContractAddress = 'entry_function_contract_address',
  /** column name */
  EntryFunctionFunctionName = 'entry_function_function_name',
  /** column name */
  EntryFunctionIdStr = 'entry_function_id_str',
  /** column name */
  EntryFunctionModuleName = 'entry_function_module_name',
  /** column name */
  Epoch = 'epoch',
  /** column name */
  ExpirationTimestampSecs = 'expiration_timestamp_secs',
  /** column name */
  GasUnitPrice = 'gas_unit_price',
  /** column name */
  MaxGasAmount = 'max_gas_amount',
  /** column name */
  ParentSignatureType = 'parent_signature_type',
  /** column name */
  Sender = 'sender',
  /** column name */
  SequenceNumber = 'sequence_number',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Version = 'version'
}

/** Streaming cursor of the table "user_transactions" */
export type User_Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Transactions_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['bigint']['input']>;
  entry_function_contract_address?: InputMaybe<Scalars['String']['input']>;
  entry_function_function_name?: InputMaybe<Scalars['String']['input']>;
  entry_function_id_str?: InputMaybe<Scalars['String']['input']>;
  entry_function_module_name?: InputMaybe<Scalars['String']['input']>;
  epoch?: InputMaybe<Scalars['bigint']['input']>;
  expiration_timestamp_secs?: InputMaybe<Scalars['timestamp']['input']>;
  gas_unit_price?: InputMaybe<Scalars['numeric']['input']>;
  max_gas_amount?: InputMaybe<Scalars['numeric']['input']>;
  parent_signature_type?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sequence_number?: InputMaybe<Scalars['bigint']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  version?: InputMaybe<Scalars['bigint']['input']>;
};

export type GetCollectionsByOwnerQueryVariables = Exact<{
  OWNER: Scalars['String']['input'];
}>;


export type GetCollectionsByOwnerQuery = { __typename?: 'query_root', current_collection_ownership_v2_view: Array<{ __typename?: 'current_collection_ownership_v2_view', collection_name?: string | null, collection_id?: string | null }> };

export type GetCurrentOwnerBalancesQueryVariables = Exact<{
  OWNER: Scalars['String']['input'];
  ASSET_TYPES: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetCurrentOwnerBalancesQuery = { __typename?: 'query_root', current_fungible_asset_balances: Array<{ __typename?: 'current_fungible_asset_balances', owner_address: string, amount: any, asset_type: string }> };

export type GetTokenIdsFromCollectionByOwnerQueryVariables = Exact<{
  COLLECTION: Scalars['String']['input'];
  OWNER: Scalars['String']['input'];
}>;


export type GetTokenIdsFromCollectionByOwnerQuery = { __typename?: 'query_root', current_token_datas_v2: Array<{ __typename?: 'current_token_datas_v2', token_data_id: string }> };

export type GetTokenIdsFromCollectionsByOwnerQueryVariables = Exact<{
  COLLECTIONS: Array<Scalars['String']['input']> | Scalars['String']['input'];
  OWNER: Scalars['String']['input'];
}>;


export type GetTokenIdsFromCollectionsByOwnerQuery = { __typename?: 'query_root', current_token_datas_v2: Array<{ __typename?: 'current_token_datas_v2', token_data_id: string }> };


export const GetCollectionsByOwnerDocument = gql`
    query GetCollectionsByOwner($OWNER: String!) {
  current_collection_ownership_v2_view(where: {creator_address: {_eq: $OWNER}}) {
    collection_name
    collection_id
  }
}
    `;

export function useGetCollectionsByOwnerQuery(options: Omit<Urql.UseQueryArgs<GetCollectionsByOwnerQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCollectionsByOwnerQuery, GetCollectionsByOwnerQueryVariables>({ query: GetCollectionsByOwnerDocument, ...options });
};
export const GetCurrentOwnerBalancesDocument = gql`
    query getCurrentOwnerBalances($OWNER: String!, $ASSET_TYPES: [String!]!) {
  current_fungible_asset_balances(
    where: {_and: {owner_address: {_eq: $OWNER}, is_primary: {_eq: true}, asset_type: {_in: $ASSET_TYPES}}}
  ) {
    owner_address
    amount
    owner_address
    asset_type
  }
}
    `;

export function useGetCurrentOwnerBalancesQuery(options: Omit<Urql.UseQueryArgs<GetCurrentOwnerBalancesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentOwnerBalancesQuery, GetCurrentOwnerBalancesQueryVariables>({ query: GetCurrentOwnerBalancesDocument, ...options });
};
export const GetTokenIdsFromCollectionByOwnerDocument = gql`
    query GetTokenIdsFromCollectionByOwner($COLLECTION: String!, $OWNER: String!) {
  current_token_datas_v2(
    where: {collection_id: {_eq: $COLLECTION}, current_token_ownerships: {owner_address: {_eq: $OWNER}}, is_deleted_v2: {_eq: false}}
  ) {
    token_data_id
  }
}
    `;

export function useGetTokenIdsFromCollectionByOwnerQuery(options: Omit<Urql.UseQueryArgs<GetTokenIdsFromCollectionByOwnerQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTokenIdsFromCollectionByOwnerQuery, GetTokenIdsFromCollectionByOwnerQueryVariables>({ query: GetTokenIdsFromCollectionByOwnerDocument, ...options });
};
export const GetTokenIdsFromCollectionsByOwnerDocument = gql`
    query GetTokenIdsFromCollectionsByOwner($COLLECTIONS: [String!]!, $OWNER: String!) {
  current_token_datas_v2(
    where: {collection_id: {_in: $COLLECTIONS}, current_token_ownerships: {owner_address: {_eq: $OWNER}}, is_deleted_v2: {_eq: false}}
  ) {
    token_data_id
  }
}
    `;

export function useGetTokenIdsFromCollectionsByOwnerQuery(options: Omit<Urql.UseQueryArgs<GetTokenIdsFromCollectionsByOwnerQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTokenIdsFromCollectionsByOwnerQuery, GetTokenIdsFromCollectionsByOwnerQueryVariables>({ query: GetTokenIdsFromCollectionsByOwnerDocument, ...options });
};