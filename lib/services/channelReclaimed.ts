// services/channelReclaimed.ts
import client from '../client'; // Import your Apollo Client instance
import { FETCH_RECLAIMED_CHANNELS, FETCH_RECLAIMED_CHANNEL_BY_ID } from '../queries/channelReclaimed';
import { ChannelReclaimed, FetchChannelsParams, ChannelReclaimedFilterOptions } from '../types/channelReclaimed';

export async function fetchReclaimedChannels(params: FetchChannelsParams = {}): Promise<ChannelReclaimed[]> {
  const {
    first = 100,
    skip = 0,
    where = {},
    orderBy = 'timestamp_',
    orderDirection = 'desc',
  } = params;

  try {
    const { data } = await client.query<{ channelReclaimeds: ChannelReclaimed[] }>({
      query: FETCH_RECLAIMED_CHANNELS,
      variables: { first, skip, where, orderBy, orderDirection },
    });
    return data.channelReclaimeds;
  } catch (error) {
    console.error('Error fetching reclaimed channels:', error);
    throw new Error('Failed to fetch reclaimed channels from the subgraph');
  }
}

export async function fetchReclaimedChannelById(id: string): Promise<ChannelReclaimed | null> {
  try {
    const { data } = await client.query<{ channelReclaimed: ChannelReclaimed | null }>({
      query: FETCH_RECLAIMED_CHANNEL_BY_ID,
      variables: { id },
    });
    return data.channelReclaimed || null;
  } catch (error) {
    console.error('Error fetching reclaimed channel by ID:', error);
    throw new Error(`Failed to fetch reclaimed channel with ID: ${id}`);
  }
}

export async function fetchReclaimedChannelsByFlexibleFilter(options: ChannelReclaimedFilterOptions): Promise<ChannelReclaimed[]> {
  const {
    payer,
    merchant,
    token,
    startTimestamp,
    endTimestamp,
    minBlockNumber,
    maxBlockNumber,
    minBlockNumberParam,
    maxBlockNumberParam,
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
  if (merchant) where.merchant = merchant;
  if (token) where.token = token;
  if (startTimestamp) where.timestamp__gte = startTimestamp.toString();
  if (endTimestamp) where.timestamp__lte = endTimestamp.toString();
  if (minBlockNumber) where.block_number_gte = minBlockNumber;
  if (maxBlockNumber) where.block_number_lte = maxBlockNumber;
  if (minBlockNumberParam) where.blockNumberParam_gte = minBlockNumberParam;
  if (maxBlockNumberParam) where.blockNumberParam_lte = maxBlockNumberParam;

  // Complex filters (AND/OR)
  if (and && and.length > 0) {
    where.and = and.map(subOptions => {
      const subWhere: Record<string, any> = {};
      if (subOptions.payer) subWhere.payer = subOptions.payer;
      if (subOptions.merchant) subWhere.merchant = subOptions.merchant;
      if (subOptions.token) subWhere.token = subOptions.token;
      if (subOptions.startTimestamp) subWhere.timestamp__gte = subOptions.startTimestamp?.toString();
      if (subOptions.endTimestamp) subWhere.timestamp__lte = subOptions.endTimestamp?.toString();
      if (subOptions.minBlockNumber) subWhere.block_number_gte = subOptions.minBlockNumber;
      if (subOptions.maxBlockNumber) subWhere.block_number_lte = subOptions.maxBlockNumber;
      if (subOptions.minBlockNumberParam) subWhere.blockNumberParam_gte = subOptions.minBlockNumberParam;
      if (subOptions.maxBlockNumberParam) subWhere.blockNumberParam_lte = subOptions.maxBlockNumberParam;
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
      if (subOptions.minBlockNumber) subWhere.block_number_gte = subOptions.minBlockNumber;
      if (subOptions.maxBlockNumber) subWhere.block_number_lte = subOptions.maxBlockNumber;
      if (subOptions.minBlockNumberParam) subWhere.blockNumberParam_gte = subOptions.minBlockNumberParam;
      if (subOptions.maxBlockNumberParam) subWhere.blockNumberParam_lte = subOptions.maxBlockNumberParam;
      return subWhere;
    });
  }

  return fetchReclaimedChannels({ where, first, skip, orderBy, orderDirection });
}