// services/channelRefunded.ts
import client from '../client'; // Import your Apollo Client instance
import { FETCH_REFUNDED_CHANNELS, FETCH_REFUNDED_CHANNEL_BY_ID } from '../queries/channelRefunded';
import { ChannelRefunded, FetchChannelsParams, ChannelRefundedFilterOptions } from '../types/channelRefunded';

export async function fetchRefundedChannels(params: FetchChannelsParams = {}): Promise<ChannelRefunded[]> {
  const {
    first = 100,
    skip = 0,
    where = {},
    orderBy = 'timestamp_',
    orderDirection = 'desc',
  } = params;

  try {
    const { data } = await client.query<{ channelRefundeds: ChannelRefunded[] }>({
      query: FETCH_REFUNDED_CHANNELS,
      variables: { first, skip, where, orderBy, orderDirection },
    });
    return data.channelRefundeds;
  } catch (error) {
    console.error('Error fetching refunded channels:', error);
    throw new Error('Failed to fetch refunded channels from the subgraph');
  }
}

export async function fetchRefundedChannelById(id: string): Promise<ChannelRefunded | null> {
  try {
    const { data } = await client.query<{ channelRefunded: ChannelRefunded | null }>({
      query: FETCH_REFUNDED_CHANNEL_BY_ID,
      variables: { id },
    });
    return data.channelRefunded || null;
  } catch (error) {
    console.error('Error fetching refunded channel by ID:', error);
    throw new Error(`Failed to fetch refunded channel with ID: ${id}`);
  }
}

export async function fetchRefundedChannelsByFlexibleFilter(options: ChannelRefundedFilterOptions): Promise<ChannelRefunded[]> {
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
    minRefundAmount,
    maxRefundAmount,
    refundAmount,
    refundAmount_in,
    refundAmount_not_in,
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

  if (minRefundAmount) where.refundAmount_gte = minRefundAmount;
  if (maxRefundAmount) where.refundAmount_lte = maxRefundAmount;
  if (refundAmount) where.refundAmount = refundAmount;
  if (refundAmount_in) where.refundAmount_in = refundAmount_in;
  if (refundAmount_not_in) where.refundAmount_not_in = refundAmount_not_in;

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
      if (subOptions.minRefundAmount) subWhere.refundAmount_gte = subOptions.minRefundAmount;
      if (subOptions.maxRefundAmount) subWhere.refundAmount_lte = subOptions.maxRefundAmount;
      if (subOptions.refundAmount) subWhere.refundAmount = subOptions.refundAmount;
      if (subOptions.refundAmount_in) subWhere.refundAmount_in = subOptions.refundAmount_in;
      if (subOptions.refundAmount_not_in) subWhere.refundAmount_not_in = subOptions.refundAmount_not_in;
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
      if (subOptions.minRefundAmount) subWhere.refundAmount_gte = subOptions.minRefundAmount;
      if (subOptions.maxRefundAmount) subWhere.refundAmount_lte = subOptions.maxRefundAmount;
      if (subOptions.refundAmount) subWhere.refundAmount = subOptions.refundAmount;
      if (subOptions.refundAmount_in) subWhere.refundAmount_in = subOptions.refundAmount_in;
      if (subOptions.refundAmount_not_in) subWhere.refundAmount_not_in = subOptions.refundAmount_not_in;
      if (subOptions.transactionHash_) subWhere.transactionHash_ = subOptions.transactionHash_;
      if (subOptions.transactionHash_contains) subWhere.transactionHash__contains = subOptions.transactionHash_contains;
      if (subOptions.contractId_) subWhere.contractId_ = subOptions.contractId_;
      if (subOptions.contractId_in) subWhere.contractId__in = subOptions.contractId_in;
      if (subOptions.contractId_not_in) subWhere.contractId__not_in = subOptions.contractId_not_in;
      return subWhere;
    });
  }

  return fetchRefundedChannels({ where, first, skip, orderBy, orderDirection });
}