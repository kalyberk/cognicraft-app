import thirdwebSdk from '@/lib/thirdwebSdk'
import { CogniCraftAbi } from '@/lib/abi'
import { contractAddress } from '@/config'
import { NFT } from '@thirdweb-dev/sdk'

export default async function getNft(tokenId: string): Promise<NFT> {
  const contract = await thirdwebSdk.getContract(contractAddress, CogniCraftAbi)

  const nft = await contract.erc721.get(tokenId)
  return nft
}
