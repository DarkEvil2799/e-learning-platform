import './styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0}} session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
