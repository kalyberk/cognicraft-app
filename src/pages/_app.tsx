import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import Head from 'next/head'
import { Layout } from '@/components/Layout'
import { domainName, chain } from '@/config'
import '@/styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), walletConnect()]}
      activeChain={chain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      authConfig={{
        domain: domainName,
        authUrl: '/api/auth',
      }}
      dAppMeta={{
        name: 'CogniCraft',
        description: 'Mint AI generated NFTs',
        url: 'https://' + domainName,
        // isDarkMode: true,
      }}
    >
      <Head>
        <title>CogniCraft</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='Mint AI generated NFTs' />
      </Head>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  )
}

export default App
