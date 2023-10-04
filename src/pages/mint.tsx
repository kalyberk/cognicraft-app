import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { utils } from 'ethers';
import {
  Web3Button,
  useUser,
  useChain,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { Card } from "@/components/Card";
import { contractAddress } from "@/config";
import { CogniCraftAbi } from '@/lib/abi';
import getMintFee from "@/utils/getMintFee";
import styles from "@/styles/Home.module.css";

export default function Mint({ fee }) {
  const router = useRouter();

  const { user, isLoggedIn, isLoading: isLoadingUser } = useUser();
  const chain = useChain();
  const { contract } = useContract(contractAddress, CogniCraftAbi);
  const { mutateAsync, isLoading: isMinting } = useContractWrite(contract, "safeMint");
  const [txHash, setTxHash] = useState(null);

  useEffect(() => {
    if (!isLoadingUser && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoadingUser, isLoggedIn, router]);

  return (
    <div className={styles.container}>
      {txHash ? (
        <Card
          title="Successfully minted 🎁"
          subtitle={`Transaction hash: ${txHash.slice(0, 6)}...${txHash.slice(-4)}`}
          body={
            <>
              <button>
                <a
                  href={`${chain?.explorers?.[0].url}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Explorer
                </a>
              </button>
              <button onClick={() => router.push('/')}>
                Start creating
              </button>
            </>
          }
        />
      ) : (
        <Card
          title="Mint CogniCraft to enjoy the art of AI"
          subtitle="CogniCraft NFTs are used to generate unique images"
          body={
            <>
              <Web3Button
                contractAddress={contractAddress}
                contractAbi={CogniCraftAbi}
                action={() =>
                  mutateAsync({
                    args: [user.address],
                    overrides: {
                      value: utils.parseEther(fee.toString()),
                    }
                  })
                }
                style={{
                  borderRadius: '0px',
                  margin: '12px 0',
                }}
                onSuccess={result => setTxHash(result.receipt.transactionHash)}
                isDisabled={isLoggedIn && isMinting || !fee}
              >
                Mint CogniCraft
              </Web3Button>
              <p>Required minting fee is {fee} ETH</p>
            </>
          }
          isLoading={isMinting}
        />
      )}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const fee = await getMintFee();

  return {
    props: {
      fee,
    },
  };
}
