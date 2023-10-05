import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ThirdwebAuth } from '@thirdweb-dev/auth/next'
import { ThirdwebStorage } from '@thirdweb-dev/storage'
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm'
import { domainName, chain } from '@/config'

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: domainName,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY),
})

export const storage = new ThirdwebStorage({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
})

const thirdwebSdk = ThirdwebSDK.fromPrivateKey(
  process.env.THIRDWEB_AUTH_PRIVATE_KEY,
  chain,
  { secretKey: process.env.THIRDWEB_SECRET_KEY }
)

export default thirdwebSdk
