import thirdwebSdk from '@/lib/thirdwebSdk'
import { CogniCraftAbi } from '@/lib/abi'
import { contractAddress } from '@/config'
import { NFT } from '@thirdweb-dev/sdk'

export default async function getOwned(address: string): Promise<{
    total: {
        balance: number
        nfts: NFT[]
    },
    available: {
        balance: number
        nfts: NFT[]
    }
}> {
    const contract = await thirdwebSdk.getContract(
        contractAddress,
        CogniCraftAbi
    )

    const ownedNFTs = await contract.erc721.getOwned(address)
    const totalBalance = ownedNFTs.length

    const availableNFTs = ownedNFTs.filter(nft => nft.metadata.uri === '')
    const availableBalance = availableNFTs.length

    return {
        total: {
            balance: totalBalance,
            nfts: ownedNFTs,
        },
        available: {
            balance: availableBalance,
            nfts: availableNFTs,
        },
    }
}
