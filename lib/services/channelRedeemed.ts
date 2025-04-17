// services/channelRedeemed.ts
import client from '../client'; // Import your Apollo Client instance
import { FETCH_REDEEMED_CHANNELS, FETCH_REDEEMED_CHANNEL_BY_ID } from '../queries/channelRedeemed';
import { ChannelRedeemed, FetchChannelsParams, ChannelRedeemedFilterOptions } from '../types/channelRedeemed';

export async function fetchRedeemedChannels(params: FetchChannelsParams = {}): Promise<ChannelRedeemed[]> {
  const {
    first = 100,
    skip = 0,
    where = {},
    orderBy = 'timestamp_',
    orderDirection = 'desc',
  } = params;

  try {
    const { data } = await client.query<{ channelRedeemeds: ChannelRedeemed[] }>({
      query: FETCH_REDEEMED_CHANNELS,
      variables: { first, skip, where, orderBy, orderDirection },
    });
    return data.channelRedeemeds;
  } catch (error) {
    console.error('Error fetching redeemed channels:', error);
    throw new Error('Failed to fetch redeemed channels from the subgraph');
  }
}

export async function fetchRedeemedChannelById(id: string): Promise<ChannelRedeemed | null> {
  try {
    const { data } = await client.query<{ channelRedeemed: ChannelRedeemed | null }>({
      query: FETCH_REDEEMED_CHANNEL_BY_ID,
      variables: { id },
    });
    return data.channelRedeemed || null;
  } catch (error) {
    console.error('Error fetching redeemed channel by ID:', error);
    throw new Error(`Failed to fetch redeemed channel with ID: ${id}`);
  }
}

export async function fetchRedeemedChannelsByFlexibleFilter(options: ChannelRedeemedFilterOptions): Promise<ChannelRedeemed[]> {
  const {
    payer,
    payer_not,
    payer_in,
    payer_not_in,
    merchant,
    merchant_not,
    merchant_in,
    merchant_not_in,
    token,
    token_not,
    token_in,
    token_not_in,
    startTimestamp,
    endTimestamp,
    minBlockNumber,
    maxBlockNumber,
    blockNumber,
    blockNumber_in,
    blockNumber_not_in,
    minAmountPaid,
    maxAmountPaid,
    amountPaid,
    amountPaid_in,
    amountPaid_not_in,
    finalHashValue,
    finalHashValue_not,
    finalHashValue_in,
    finalHashValue_not_in,
    finalHashValue_contains,
    minNumberOfTokensUsed,
    maxNumberOfTokensUsed,
    numberOfTokensUsed,
    numberOfTokensUsed_in,
    numberOfTokensUsed_not_in,
    transactionHash_,
    transactionHash_contains,
    contractId_,
    contractId_in,
    contractId_not_in,
    and,
    or,
    first = 100,
    skip = 0,
    orderBy = 'timestamp_',
    orderDirection = 'desc',
  } = options;

  const where: Record<string, any> = {};

  // Basic filters
  if (payer) where.payer = payer;
  if (payer_not) where.payer_not = payer_not;
  if (payer_in) where.payer_in = payer_in;
  if (payer_not_in) where.payer_not_in = payer_not_in;

  if (merchant) where.merchant = merchant;
  if (merchant_not) where.merchant_not = merchant_not;
  if (merchant_in) where.merchant_in = merchant_in;
  if (merchant_not_in) where.merchant_not_in = merchant_not_in;

  if (token) where.token = token;
  if (token_not) where.token_not = token_not;
  if (token_in) where.token_in = token_in;
  if (token_not_in) where.token_not_in = token_not_in;

  if (startTimestamp) where.timestamp__gte = startTimestamp.toString();
  if (endTimestamp) where.timestamp__lte = endTimestamp.toString();

  if (minBlockNumber) where.block_number_gte = minBlockNumber;
  if (maxBlockNumber) where.block_number_lte = maxBlockNumber;
  if (blockNumber) where.block_number = blockNumber;
  if (blockNumber_in) where.block_number_in = blockNumber_in;
  if (blockNumber_not_in) where.block_number_not_in = blockNumber_not_in;

  if (minAmountPaid) where.amountPaid_gte = minAmountPaid;
  if (maxAmountPaid) where.amountPaid_lte = maxAmountPaid;
  if (amountPaid) where.amountPaid = amountPaid;
  if (amountPaid_in) where.amountPaid_in = amountPaid_in;
  if (amountPaid_not_in) where.amountPaid_not_in = amountPaid_not_in;

  if (finalHashValue) where.finalHashValue = finalHashValue;
  if (finalHashValue_not) where.finalHashValue_not = finalHashValue_not;
  if (finalHashValue_in) where.finalHashValue_in = finalHashValue_in;
  if (finalHashValue_not_in) where.finalHashValue_not_in = finalHashValue_not_in;
  if (finalHashValue_contains) where.finalHashValue_contains = finalHashValue_contains;

  if (minNumberOfTokensUsed) where.numberOfTokensUsed_gte = minNumberOfTokensUsed;
  if (maxNumberOfTokensUsed) where.numberOfTokensUsed_lte = maxNumberOfTokensUsed;
  if (numberOfTokensUsed) where.numberOfTokensUsed = numberOfTokensUsed;
  if (numberOfTokensUsed_in) where.numberOfTokensUsed_in = numberOfTokensUsed_in;
  if (numberOfTokensUsed_not_in) where.numberOfTokensUsed_not_in = numberOfTokensUsed_not_in;

  if (transactionHash_) where.transactionHash_ = transactionHash_;
  if (transactionHash_contains) where.transactionHash__contains = transactionHash_contains;

  if (contractId_) where.contractId_ = contractId_;
  if (contractId_in) where.contractId__in = contractId_in;
  if (contractId_not_in) where.contractId__not_in = contractId_not_in;

  // Complex filters (AND/OR)
  if (and && and.length > 0) {
    where.and = and.map(subOptions => {
      const subWhere: Record<string, any> = {};
      if (subOptions.payer) subWhere.payer = subOptions.payer;
      if (subOptions.payer_not) subWhere.payer_not = subOptions.payer_not;
      if (subOptions.payer_in) subWhere.payer_in = subOptions.payer_in;
      if (subOptions.payer_not_in) subWhere.payer_not_in = subOptions.payer_not_in;
      if (subOptions.merchant) subWhere.merchant = subOptions.merchant;
      if (subOptions.merchant_not) subWhere.merchant_not = subOptions.merchant_not;
      if (subOptions.merchant_in) subWhere.merchant_in = subOptions.merchant_in;
      if (subOptions.merchant_not_in) subWhere.merchant_not_in = subOptions.merchant_not_in;
      if (subOptions.token) subWhere.token = subOptions.token;
      if (subOptions.token_not) subWhere.token_not = subOptions.token_not;
      if (subOptions.token_in) subWhere.token_in = subOptions.token_in;
      if (subOptions.token_not_in) subWhere.token_not_in = subOptions.token_not_in;
      if (subOptions.startTimestamp) subWhere.timestamp__gte = subOptions.startTimestamp?.toString();
      if (subOptions.endTimestamp) subWhere.timestamp__lte = subOptions.endTimestamp?.toString();
      if (subOptions.minBlockNumber) subWhere.block_number_gte = subOptions.minBlockNumber;
      if (subOptions.maxBlockNumber) subWhere.block_number_lte = subOptions.maxBlockNumber;
      if (subOptions.blockNumber) subWhere.block_number = subOptions.blockNumber;
      if (subOptions.blockNumber_in) subWhere.block_number_in = subOptions.blockNumber_in;
      if (subOptions.blockNumber_not_in) subWhere.block_number_not_in = subOptions.blockNumber_not_in;
      if (subOptions.minAmountPaid) subWhere.amountPaid_gte = subOptions.minAmountPaid;
      if (subOptions.maxAmountPaid) subWhere.amountPaid_lte = subOptions.maxAmountPaid;
      if (subOptions.amountPaid) subWhere.amountPaid = subOptions.amountPaid;
      if (subOptions.amountPaid_in) subWhere.amountPaid_in = subOptions.amountPaid_in;
      if (subOptions.amountPaid_not_in) subWhere.amountPaid_not_in = subOptions.amountPaid_not_in;
      if (subOptions.finalHashValue) subWhere.finalHashValue = subOptions.finalHashValue;
      if (subOptions.finalHashValue_not) subWhere.finalHashValue_not = subOptions.finalHashValue_not;
      if (subOptions.finalHashValue_in) subWhere.finalHashValue_in = subOptions.finalHashValue_in;
      if (subOptions.finalHashValue_not_in) subWhere.finalHashValue_not_in = subOptions.finalHashValue_not_in;
      if (subOptions.finalHashValue_contains) subWhere.finalHashValue_contains = subOptions.finalHashValue_contains;
      if (subOptions.minNumberOfTokensUsed) subWhere.numberOfTokensUsed_gte = subOptions.minNumberOfTokensUsed;
      if (subOptions.maxNumberOfTokensUsed) subWhere.numberOfTokensUsed_lte = subOptions.maxNumberOfTokensUsed;
      if (subOptions.numberOfTokensUsed) subWhere.numberOfTokensUsed = subOptions.numberOfTokensUsed;
      if (subOptions.numberOfTokensUsed_in) subWhere.numberOfTokensUsed_in = subOptions.numberOfTokensUsed_in;
      if (subOptions.numberOfTokensUsed_not_in) subWhere.numberOfTokensUsed_not_in = subOptions.numberOfTokensUsed_not_in;
      if (subOptions.transactionHash_) subWhere.transactionHash_ = subOptions.transactionHash_;
      if (subOptions.transactionHash_contains) subWhere.transactionHash__contains = subOptions.transactionHash_contains;
      if (subOptions.contractId_) subWhere.contractId_ = subOptions.contractId_;
      if (subOptions.contractId_in) subWhere.contractId__in = subOptions.contractId_in;
      if (subOptions.contractId_not_in) subWhere.contractId__not_in = subOptions.contractId_not_in;
      return subWhere;
    });
  }

  if (or && or.length > 0) {
    where.or = or.map(subOptions => {
      const subWhere: Record<string, any> = {};
      if (subOptions.payer) subWhere.payer = subOptions.payer;
      if (subOptions.payer_not) subWhere.payer_not = subOptions.payer_not;
      if (subOptions.payer_in) subWhere.payer_in = subOptions.payer_in;
      if (subOptions.payer_not_in) subWhere.payer_not_in = subOptions.payer_not_in;
      if (subOptions.merchant) subWhere.merchant = subOptions.merchant;
      if (subOptions.merchant_not) subWhere.merchant_not = subOptions.merchant_not;
      if (subOptions.merchant_in) subWhere.merchant_in = subOptions.merchant_in;
      if (subOptions.merchant_not_in) subWhere.merchant_not_in = subOptions.merchant_not_in;
      if (subOptions.token) subWhere.token = subOptions.token;
      if (subOptions.token_not) subWhere.token_not = subOptions.token_not;
      if (subOptions.token_in) subWhere.token_in = subOptions.token_in;
      if (subOptions.token_not_in) subWhere.token_not_in = subOptions.token_not_in;
      if (subOptions.startTimestamp) subWhere.timestamp__gte = subOptions.startTimestamp?.toString();
      if (subOptions.endTimestamp) subWhere.timestamp__lte = subOptions.endTimestamp?.toString();
      if (subOptions.minBlockNumber) subWhere.block_number_gte = subOptions.minBlockNumber;
      if (subOptions.maxBlockNumber) subWhere.block_number_lte = subOptions.maxBlockNumber;
      if (subOptions.blockNumber) subWhere.block_number = subOptions.blockNumber;
      if (subOptions.blockNumber_in) subWhere.block_number_in = subOptions.blockNumber_in;
      if (subOptions.blockNumber_not_in) subWhere.block_number_not_in = subOptions.blockNumber_not_in;
      if (subOptions.minAmountPaid) subWhere.amountPaid_gte = subOptions.minAmountPaid;
      if (subOptions.maxAmountPaid) subWhere.amountPaid_lte = subOptions.maxAmountPaid;
      if (subOptions.amountPaid) subWhere.amountPaid = subOptions.amountPaid;
      if (subOptions.amountPaid_in) subWhere.amountPaid_in = subOptions.amountPaid_in;
      if (subOptions.amountPaid_not_in) subWhere.amountPaid_not_in = subOptions.amountPaid_not_in;
      if (subOptions.finalHashValue) subWhere.finalHashValue = subOptions.finalHashValue;
      if (subOptions.finalHashValue_not) subWhere.finalHashValue_not = subOptions.finalHashValue_not;
      if (subOptions.finalHashValue_in) subWhere.finalHashValue_in = subOptions.finalHashValue_in;
      if (subOptions.finalHashValue_not_in) subWhere.finalHashValue_not_in = subOptions.finalHashValue_not_in;
      if (subOptions.finalHashValue_contains) subWhere.finalHashValue_contains = subOptions.finalHashValue_contains;
      if (subOptions.minNumberOfTokensUsed) subWhere.numberOfTokensUsed_gte = subOptions.minNumberOfTokensUsed;
      if (subOptions.maxNumberOfTokensUsed) subWhere.numberOfTokensUsed_lte = subOptions.maxNumberOfTokensUsed;
      if (subOptions.numberOfTokensUsed) subWhere.numberOfTokensUsed = subOptions.numberOfTokensUsed;
      if (subOptions.numberOfTokensUsed_in) subWhere.numberOfTokensUsed_in = subOptions.numberOfTokensUsed_in;
      if (subOptions.numberOfTokensUsed_not_in) subWhere.numberOfTokensUsed_not_in = subOptions.numberOfTokensUsed_not_in;
      if (subOptions.transactionHash_) subWhere.transactionHash_ = subOptions.transactionHash_;
      if (subOptions.transactionHash_contains) subWhere.transactionHash__contains = subOptions.transactionHash_contains;
      if (subOptions.contractId_) subWhere.contractId_ = subOptions.contractId_;
      if (subOptions.contractId_in) subWhere.contractId__in = subOptions.contractId_in;
      if (subOptions.contractId_not_in) subWhere.contractId__not_in = subOptions.contractId_not_in;
      return subWhere;
    });
  }

  return fetchRedeemedChannels({ where, first, skip, orderBy, orderDirection });
}