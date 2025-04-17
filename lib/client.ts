import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Replace with your actual API key 
const API_KEY = 'fgfgh'; 

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
