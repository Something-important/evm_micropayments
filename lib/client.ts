import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

// Replace with your actual API key 
const API_KEY = 'https://api.goldsky.com/api/public/project_cm85j9kf21mz301x6d08lhbpf/subgraphs/HashchainProtocolwithERC20Support/1.0.0/gn'; 
const API_URL = 'https://api.goldsky.com/api/public/project_cm85j9kf21mz301x6d08lhbpf/subgraphs/HashchainProtocolwithERC20Support/1.0.0/gn';

// Handles specific GraphQL errors (like reorgs)
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      console.error(`[GraphQL error]: ${err.message}`);
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// Automatically retries on known transient issues (like reorgs)
const retryLink = new RetryLink({
  attempts: {
    max: 3,
    retryIf: (error) =>
      !!error &&
      error.message &&
      error.message.includes('chain was reorganized'),
  },
  delay: {
    initial: 500, // start delay
    max: 2000,    // cap delay
    jitter: true, // adds randomness to avoid spikes
  },
});

const httpLink = new HttpLink({
  uri: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`, // Include only if required by your Goldsky endpoint
  },
});

// Compose the links in order: error → retry → HTTP
const client = new ApolloClient({
  link: from([errorLink, retryLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
