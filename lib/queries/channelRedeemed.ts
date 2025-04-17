// queries/channelRedeemed.ts
import { gql } from '@apollo/client';

export const FETCH_REDEEMED_CHANNELS = gql`
  query FetchRedeemedChannels(
    $first: Int!
    $skip: Int!
    $where: ChannelRedeemed_filter
    $orderBy: ChannelRedeemed_orderBy
    $orderDirection: OrderDirection
  ) {
    channelRedeemeds(
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
      amountPaid
      finalHashValue
      numberOfTokensUsed
    }
  }
`;

export const FETCH_REDEEMED_CHANNEL_BY_ID = gql`
  query FetchRedeemedChannelById($id: ID!) {
    channelRedeemed(id: $id) {
      id
      block_number
      timestamp_
      transactionHash_
      contractId_
      payer
      merchant
      token
      amountPaid
      finalHashValue
      numberOfTokensUsed
    }
  }
`;