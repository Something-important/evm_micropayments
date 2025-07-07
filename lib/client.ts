import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Replace with your actual API key 
const API_KEY = 'https://api.goldsky.com/api/public/project_cm85j9kf21mz301x6d08lhbpf/subgraphs/HashchainProtocolwithERC20Support/1.0.0/gn'; 

const client = new ApolloClient({
  link: new HttpLink({
    uri: API_KEY,
    headers: {
      Authorization: `Bearer ${API_KEY}`, // Ensure you set the correct API key
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
