import { storage } from '@/lib/thirdwebSdk'

export default async function uploadMetadata(imageUri: string, prompt: string) {
  const metadata = {
    name: 'Images crafted with the collective intelligence of the AI & hoomans',
    image: imageUri,
    prompt,
  }
  const uri = await storage.upload(metadata, {
    uploadWithoutDirectory: true,
  })
  return uri
}
