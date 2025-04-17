// queries/channelReclaimed.ts
import { gql } from '@apollo/client';

export const FETCH_RECLAIMED_CHANNELS = gql`
  query FetchReclaimedChannels(
    $first: Int!
    $skip: Int!
    $where: ChannelReclaimed_filter
    $orderBy: ChannelReclaimed_orderBy
    $orderDirection: OrderDirection
  ) {
    channelReclaimeds(
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
      blockNumberParam
    }
  }
`;

export const FETCH_RECLAIMED_CHANNEL_BY_ID = gql`
  query FetchReclaimedChannelById($id: ID!) {
    channelReclaimed(id: $id) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      payer
      merchant
      token
      blockNumberParam
    }
  }
`;