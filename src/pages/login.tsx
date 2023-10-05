import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ConnectWallet, useUser } from '@thirdweb-dev/react'
import { getUser } from '@/lib/thirdwebSdk'
import { Card } from '@/components/Card'
import styles from '@/styles/Home.module.css'

export default function Login() {
  const router = useRouter()
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) {
      // router.replace(router.asPath)
      router.push('/')
    }
  }, [isLoggedIn, router])

  return (
    <div className={styles.container}>
      <Card
        title='Exclusive for CogniCraft holders'
        subtitle='Sign in with your wallet to continue'
        body={<ConnectWallet theme='dark' switchToActiveChain={true} />}
      />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUser(context.req)
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      showConnectWallet: false,
      showExplain: true,
    },
  }
}
