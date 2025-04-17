// types/channelReclaimed.ts
export interface ChannelReclaimed {
    id: string;
    block_number: string; // BigInt as string
    timestamp_: string; // BigInt as string
    transactionHash_: string;
    contractId_: string;
    payer: string;
    merchant: string;
    token: string;
    blockNumberParam: string; // BigInt as string
  }
  
  export interface FetchChannelsParams {
    first?: number;
    skip?: number;
    where?: Record<string, any>;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }
  
  export type ChannelReclaimedFilterOptions = {
    payer?: string;
    merchant?: string;
    token?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    minBlockNumber?: string; // block_number
    maxBlockNumber?: string; // block_number
    minBlockNumberParam?: string; // blockNumberParam
    maxBlockNumberParam?: string; // blockNumberParam
    and?: ChannelReclaimedFilterOptions[];
    or?: ChannelReclaimedFilterOptions[];
    first?: number;
    skip?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  };