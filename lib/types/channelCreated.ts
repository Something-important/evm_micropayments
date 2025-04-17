// types/channelCreated.ts
export interface ChannelCreated {
    id: string;
    block_number: string;
    timestamp_: string;
    transactionHash_: string;
    contractId_: string;
    payer: string;
    merchant: string;
    token: string;
    amount: string;
    numberOfTokens: string;
    merchantWithdrawAfterBlocks: string;
  }
  
  export interface FetchChannelsParams {
    first?: number;
    skip?: number;
    where?: Record<string, any>;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }
  
  export type ChannelFilterOptions = {
    payer?: string;
    merchant?: string;
    token?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    minBlock?: string; // merchantWithdrawAfterBlocks
    maxBlock?: string; // merchantWithdrawAfterBlocks
    minAmount?: string;
    maxAmount?: string;
    minBlockNumber?: string; // block_number
    maxBlockNumber?: string; // block_number
    numberOfTokens_gte?: string;
    numberOfTokens_lte?: string;
    and?: ChannelFilterOptions[];
    or?: ChannelFilterOptions[];
    first?: number;
    skip?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  };
