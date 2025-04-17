// services/channelCreated.ts
import client from '../client'; // Import your Apollo Client instance
import { FETCH_CHANNELS, FETCH_CHANNEL_BY_ID } from '../queries/channelCreated';
import { ChannelCreated, FetchChannelsParams, ChannelFilterOptions } from '../types/channelCreated';

export async function fetchChannels(params: FetchChannelsParams = {}): Promise<ChannelCreated[]> {
  const {
    first = 100,
    skip = 0,
    where = {},
    orderBy = 'timestamp_',
    orderDirection = 'desc',
  } = params;

  try {
    const { data } = await client.query<{ channelCreateds: ChannelCreated[] }>({
      query: FETCH_CHANNELS,
      variables: { first, skip, where, orderBy, orderDirection },
    });
    return data.channelCreateds;
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw new Error('Failed to fetch channels from the subgraph');
  }
}

export async function fetchChannelById(id: string): Promise<ChannelCreated | null> {
  try {
    const { data } = await client.query<{ channelCreated: ChannelCreated | null }>({
      query: FETCH_CHANNEL_BY_ID,
      variables: { id },
    });
    return data.channelCreated || null;
  } catch (error) {
    console.error('Error fetching channel by ID:', error);
    throw new Error(`Failed to fetch channel with ID: ${id}`);
  }
}

export async function fetchChannelsByFlexibleFilter(options: ChannelFilterOptions): Promise<ChannelCreated[]> {
  const {
    payer,
    merchant,
    token,
    startTimestamp,
    endTimestamp,
    minBlock,
    maxBlock,
    minAmount,
    maxAmount,
    minBlockNumber,
    maxBlockNumber,
    numberOfTokens_gte,
    numberOfTokens_lte,
    and,
    or,
    first = 100,
    skip = 0,
    orderBy = 'block_number',
    orderDirection = 'asc',
  } = options;

  const where: Record<string, any> = {};

  // Basic filters
  if (payer) where.payer = payer;
  if (merchant) where.merchant = merchant;
  if (token) where.token = token;
  if (startTimestamp) where.timestamp__gte = startTimestamp.toString();
  if (endTimestamp) where.timestamp__lte = endTimestamp.toString();
  if (minBlock) where.merchantWithdrawAfterBlocks_gte = minBlock;
  if (maxBlock) where.merchantWithdrawAfterBlocks_lte = maxBlock;
  if (minAmount) where.amount_gte = minAmount;
  if (maxAmount) where.amount_lte = maxAmount;
  if (minBlockNumber) where.block_number_gte = minBlockNumber;
  if (maxBlockNumber) where.block_number_lte = maxBlockNumber;
  if (numberOfTokens_gte) where.numberOfTokens_gte = numberOfTokens_gte;
  if (numberOfTokens_lte) where.numberOfTokens_lte = numberOfTokens_lte;

  // Complex filters (AND/OR)
  if (and && and.length > 0) {
    where.and = and.map(subOptions => {
      const subWhere: Record<string, any> = {};
      if (subOptions.payer) subWhere.payer = subOptions.payer;
      if (subOptions.merchant) subWhere.merchant = subOptions.merchant;
      if (subOptions.token) subWhere.token = subOptions.token;
      if (subOptions.startTimestamp) subWhere.timestamp__gte = subOptions.startTimestamp?.toString();
      if (subOptions.endTimestamp) subWhere.timestamp__lte = subOptions.endTimestamp?.toString();
      if (subOptions.minBlock) subWhere.merchantWithdrawAfterBlocks_gte = subOptions.minBlock;
      if (subOptions.maxBlock) subWhere.merchantWithdrawAfterBlocks_lte = subOptions.maxBlock;
      if (subOptions.minAmount) subWhere.amount_gte = subOptions.minAmount;
      if (subOptions.maxAmount) subWhere.amount_lte = subOptions.maxAmount;
      if (subOptions.minBlockNumber) subWhere.block_number_gte = subOptions.minBlockNumber;
      if (subOptions.maxBlockNumber) subWhere.block_number_lte = subOptions.maxBlockNumber;
      if (subOptions.numberOfTokens_gte) subWhere.numberOfTokens_gte = subOptions.numberOfTokens_gte;
      if (subOptions.numberOfTokens_lte) subWhere.numberOfTokens_lte = subOptions.numberOfTokens_lte;
      return subWhere;
    });
  }

  if (or && or.length > 0) {
    where.or = or.map(subOptions => {
      const subWhere: Record<string, any> = {};
      if (subOptions.payer) subWhere.payer = subOptions.payer;
      if (subOptions.merchant) subWhere.merchant = subOptions.merchant;
      if (subOptions.token) subWhere.token = subOptions.token;
      if (subOptions.startTimestamp) subWhere.timestamp__gte = subOptions.startTimestamp?.toString();
      if (subOptions.endTimestamp) subWhere.timestamp__lte = subOptions.endTimestamp?.toString();
      if (subOptions.minBlock) subWhere.merchantWithdrawAfterBlocks_gte = subOptions.minBlock;
      if (subOptions.maxBlock) subWhere.merchantWithdrawAfterBlocks_lte = subOptions.maxBlock;
      if (subOptions.minAmount) subWhere.amount_gte = subOptions.minAmount;
      if (subOptions.maxAmount) subWhere.amount_lte = subOptions.maxAmount;
      if (subOptions.minBlockNumber) subWhere.block_number_gte = subOptions.minBlockNumber;
      if (subOptions.maxBlockNumber) subWhere.block_number_lte = subOptions.maxBlockNumber;
      if (subOptions.numberOfTokens_gte) subWhere.numberOfTokens_gte = subOptions.numberOfTokens_gte;
      if (subOptions.numberOfTokens_lte) subWhere.numberOfTokens_lte = subOptions.numberOfTokens_lte;
      return subWhere;
    });
  }

  return fetchChannels({ where, first, skip, orderBy, orderDirection });
}