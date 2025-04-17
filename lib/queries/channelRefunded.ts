// queries/channelRefunded.ts
import { gql } from '@apollo/client';

export const FETCH_REFUNDED_CHANNELS = gql`
  query FetchRefundedChannels(
    $first: Int!
    $skip: Int!
    $where: ChannelRefunded_filter
    $orderBy: ChannelRefunded_orderBy
    $orderDirection: OrderDirection
  ) {
    channelRefundeds(
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
      refundAmount
    }
  }
`;

export const FETCH_REFUNDED_CHANNEL_BY_ID = gql`
  query FetchRefundedChannelById($id: ID!) {
    channelRefunded(id: $id) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      payer
      merchant
      token
      refundAmount
    }
  }
`;