import '../styles/globals.css'
import { ApolloProvider } from "@apollo/client"
import client from "../graphql/client"
import NextNProgress from 'nextjs-progressbar'


function MyApp({ Component, pageProps}) {
  return (
    <>
    <NextNProgress
      color="#29D"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
    <ApolloProvider client={client} >
    <Component {...pageProps} />
    </ApolloProvider>
    </>
    )
}

export default MyApp
