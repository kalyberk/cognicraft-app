import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { Card } from "@/components/Card";
import getNft from "@/utils/getNft";
import styles from "@/styles/Home.module.css";

// TODO: // Add a button to export to OpenSea etc.
export default function NFT({ nft }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Card
        title="Created with the help of AI"
        subtitle={`Prompt: ${nft.metadata?.prompt}`}
        body={
          <>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              width='100%'
              style={{
                maxWidth: '350px',
                margin: '12px 0',
              }}
            />
            <button onClick={() => router.push("/")}>
              Generate a new image
            </button>
          </>
        }
      />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id: tokenId } = context.params as { id: string };
  
  const nft = await getNft(tokenId);
  if (!nft || !nft.metadata) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      nft,
    },
  };
}
