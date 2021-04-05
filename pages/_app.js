import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import GuestLayout from "../src/layouts/GuestLayout";

const client = new ApolloClient({
  uri: 'https://swiftpwa-be.testingnow.me/graphql',
  cache: new InMemoryCache()
})

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
