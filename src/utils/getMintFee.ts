import thirdwebSdk from '@/lib/thirdwebSdk'
import { utils } from 'ethers';
import { CogniCraftAbi } from '@/lib/abi'
import { contractAddress } from '@/config'

export default async function getMintFee(): Promise<string> {
    const contract = await thirdwebSdk.getContract(
        contractAddress,
        CogniCraftAbi
    )

    const feeBN = await contract.call("MINT_PRICE")
    return utils.formatEther(feeBN)
}
