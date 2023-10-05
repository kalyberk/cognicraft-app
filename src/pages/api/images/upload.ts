import { NextApiRequest, NextApiResponse } from 'next'
import uploadImage from '@/utils/uploadImage'
import uploadMetadata from '@/utils/uploadMetadata'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // TODO: Do not refetch the image from the url
    // Instead take image data from the body
    const imageRes = await fetch(req.body.url)
    if (!imageRes.ok) {
      return res.status(400).json({ message: 'Upload failed' })
    }

    const blob = await imageRes.blob()
    const imageUri = (await uploadImage(blob)) as string // "ipfs://<CID>"

    const metadataUri = (await uploadMetadata(
      imageUri,
      req.body.prompt
    )) as string

    return res.status(200).json({ metadataUri, imageUri })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Upload failed' })
  }
}
