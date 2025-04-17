// queries/channelCreated.ts
import { gql } from '@apollo/client';

export const FETCH_CHANNELS = gql`
  query FetchChannels(
    $first: Int!
    $skip: Int!
    $where: ChannelCreated_filter
    $orderBy: ChannelCreated_orderBy
    $orderDirection: OrderDirection
  ) {
    channelCreateds(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      payer
      merchant
      token
      amount
      numberOfTokens
      merchantWithdrawAfterBlocks
    }
  }
`;

export const FETCH_CHANNEL_BY_ID = gql`
  query FetchChannelById($id: ID!) {
    channelCreated(id: $id) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      payer
      merchant
      token
      amount
      numberOfTokens
      merchantWithdrawAfterBlocks
    }
  }
`;