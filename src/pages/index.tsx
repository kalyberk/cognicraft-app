import type { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Web3Button,
  MediaRenderer,
  useUser,
  useConnectionStatus,
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react'
import { getUser } from '@/lib/thirdwebSdk'
import { Card } from '@/components/Card'
import { ImageGrid } from '@/components/ImageGrid'
import getOwned from '@/utils/getOwned'
import { contractAddress } from '@/config'
import { CogniCraftAbi } from '@/lib/abi'
import styles from '@/styles/Home.module.css'

interface Uris {
  imageUri: string
  metadataUri: string
}

const promptLimit = 360

// TODO: Split into pages
export default function Home({ tokenId }) {
  const router = useRouter()

  const { isLoggedIn, isLoading: isLoadingUser } = useUser()
  const connectionStatus = useConnectionStatus()
  const [isConnected, setIsConnected] = useState(false)

  const { contract } = useContract(contractAddress, CogniCraftAbi)
  const { mutateAsync, isLoading: isSettingTokenUri } = useContractWrite(
    contract,
    'setTokenURI'
  )

  const [prompt, setPrompt] = useState('')
  const [isExceedingCharLimit, setIsExceedingCharLimit] = useState(false)
  const [images, setImages] = useState([])
  const [selectedImageIdx, setSelectedImageIdx] = useState(null)
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [uris, setUris] = useState<Uris | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  useEffect(() => {
    if (!isLoadingUser && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoadingUser, isLoggedIn, router])

  // Possible values for connectionStatus are not limited to "connected" and "disconnected"
  useEffect(() => {
    if (connectionStatus === 'connected') {
      setIsConnected(true)
    } else if (connectionStatus === 'disconnected') {
      setIsConnected(false)
    }
  }, [connectionStatus])

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value

    if (text.length > promptLimit) {
      setIsExceedingCharLimit(true)
    } else {
      setIsExceedingCharLimit(false)
    }

    setPrompt(text)

    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const handlePromptSubmit = async () => {
    setIsLoadingImages(true)
    try {
      const res = await fetch('/api/images/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      if (!res.ok) {
        throw new Error('Image generation failed')
      }
      const data = await res.json()
      setImages(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingImages(false)
    }
  }

  const handleImageSubmit = async () => {
    setIsUploadingImage(true)
    try {
      const res = await fetch('/api/images/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: images[selectedImageIdx].url,
          prompt,
        }),
      })
      if (!res.ok) {
        throw new Error('Image upload failed')
      }
      const uris = await res.json()
      setUris(uris)
    } catch (err) {
      console.error(err)
    } finally {
      setIsUploadingImage(false)
    }
  }

  return (
    <div className={styles.container}>
      {!uris ? (
        images.length > 0 ? (
          <Card
            title='Select your favorite'
            subtitle={`Prompt: ${prompt}`}
            body={
              <>
                <ImageGrid
                  images={images}
                  selectedImageIdx={selectedImageIdx}
                  onImageClick={index => setSelectedImageIdx(index)}
                />
                <button
                  onClick={handleImageSubmit}
                  disabled={
                    !isConnected ||
                    selectedImageIdx === null ||
                    isUploadingImage
                  }
                >
                  {!isConnected ? 'Connect to proceed' : 'Turn into NFT'}
                </button>
              </>
            }
            isLoading={isUploadingImage}
          />
        ) : (
          <Card
            title='Create prompt'
            subtitle='Use your imagination 🧠'
            body={
              <>
                <textarea
                  placeholder={`Enter your prompt (max ${promptLimit} characters)`}
                  value={prompt}
                  onChange={handlePromptChange}
                  rows={2}
                  style={{
                    borderColor: isExceedingCharLimit ? 'red' : 'inherit',
                  }}
                />
                {isExceedingCharLimit && (
                  <p style={{ color: 'red' }}>
                    Character limit exceeded (max: {promptLimit})
                  </p>
                )}
                <button
                  onClick={handlePromptSubmit}
                  disabled={
                    !isConnected ||
                    !prompt ||
                    isExceedingCharLimit ||
                    isLoadingImages
                  }
                >
                  {!isConnected
                    ? 'Connect to proceed'
                    : isLoadingImages
                    ? 'Generating...'
                    : 'Generate'}
                </button>
              </>
            }
          />
        )
      ) : (
        <>
          <Card
            title='Image uploaded to decentralized storage 🚀'
            subtitle='Update your NFT data now to make it available for sale'
            body={
              <>
                <MediaRenderer
                  src={uris.imageUri}
                  width='100%'
                  height='100%'
                  style={{
                    maxWidth: '512px',
                    margin: '12px 0',
                  }}
                />
                <Web3Button
                  contractAddress={contractAddress}
                  contractAbi={CogniCraftAbi}
                  action={() =>
                    mutateAsync({
                      args: [tokenId, uris.metadataUri],
                    })
                  }
                  style={{
                    borderRadius: '0px',
                    minWidth: '100%',
                  }}
                  onSuccess={() => {
                    router.push(`/nft/${tokenId}`)
                  }}
                  isDisabled={!isConnected || isSettingTokenUri}
                >
                  {!isConnected ? 'Connect to proceed' : 'Update'}
                </Web3Button>
              </>
            }
            isLoading={isSettingTokenUri}
          />
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUser(context.req)
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const owned = await getOwned(user.address)
  if (!owned.available.balance) {
    return {
      redirect: {
        destination: '/mint',
        permanent: false,
      },
    }
  }

  return {
    props: {
      tokenId: owned.available.nfts[0].metadata.id,
    },
  }
}
