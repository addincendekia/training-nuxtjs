import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import GuestLayout from "../src/layouts/GuestLayout";
import client from '../lib/apollo'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <GuestLayout>
        <Component {...pageProps} />
      </GuestLayout>
    </ApolloProvider>
  )
}

export default MyApp