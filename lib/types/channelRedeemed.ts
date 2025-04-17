// types/channelRedeemed.ts
export interface ChannelRedeemed {
    id: string;
    block_number: string; // BigInt as string
    timestamp_: string; // BigInt as string
    transactionHash_: string;
    contractId_: string;
    payer: string;
    merchant: string;
    token: string;
    amountPaid: string; // BigInt as string
    finalHashValue: string;
    numberOfTokensUsed: string; // BigInt as string
  }
  
  export interface FetchChannelsParams {
    first?: number;
    skip?: number;
    where?: Record<string, any>;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }
  
  export type ChannelRedeemedFilterOptions = {
    payer?: string;
    payer_not?: string;
    payer_in?: string[];
    payer_not_in?: string[];
    merchant?: string;
    merchant_not?: string;
    merchant_in?: string[];
    merchant_not_in?: string[];
    token?: string;
    token_not?: string;
    token_in?: string[];
    token_not_in?: string[];
    startTimestamp?: number; // timestamp__gte
    endTimestamp?: number; // timestamp__lte
    minBlockNumber?: string; // block_number_gte
    maxBlockNumber?: string; // block_number_lte
    blockNumber?: string; // block_number exact match
    blockNumber_in?: string[]; // block_number_in
    blockNumber_not_in?: string[]; // block_number_not_in
    minAmountPaid?: string; // amountPaid_gte
    maxAmountPaid?: string; // amountPaid_lte
    amountPaid?: string; // amountPaid exact match
    amountPaid_in?: string[]; // amountPaid_in
    amountPaid_not_in?: string[]; // amountPaid_not_in
    finalHashValue?: string;
    finalHashValue_not?: string;
    finalHashValue_in?: string[];
    finalHashValue_not_in?: string[];
    finalHashValue_contains?: string; // Partial match
    minNumberOfTokensUsed?: string; // numberOfTokensUsed_gte
    maxNumberOfTokensUsed?: string; // numberOfTokensUsed_lte
    numberOfTokensUsed?: string; // numberOfTokensUsed exact match
    numberOfTokensUsed_in?: string[]; // numberOfTokensUsed_in
    numberOfTokensUsed_not_in?: string[]; // numberOfTokensUsed_not_in
    transactionHash_?: string; // transactionHash_ exact match
    transactionHash_contains?: string; // transactionHash__contains
    contractId_?: string; // contractId_ exact match
    contractId_in?: string[]; // contractId__in
    contractId_not_in?: string[]; // contractId__not_in
    and?: ChannelRedeemedFilterOptions[];
    or?: ChannelRedeemedFilterOptions[];
    first?: number;
    skip?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  };