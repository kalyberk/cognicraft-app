import { NextApiRequest, NextApiResponse } from 'next'
import generateImages from '@/utils/generateImages'
import OpenAI from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: OpenAI.Image[] = []

  const randomImages = Array.from({ length: 4 }, (_, i) => ({
    // url: `https://picsum.photos/1024?random=${i}`,
    url: `https://picsum.photos/seed/${Math.random() * 100 * (i + 1)}/512`,
  }));

  if (process.env.NODE_ENV === 'production') {
    try {
      const params: OpenAI.ImageGenerateParams = {
        prompt: req.body.prompt,
        n: 4,
        response_format: 'url', // TODO: Add support for base64
        size: '512x512',
      }
      data = await generateImages(params)
    } catch (err) {
      data = randomImages // Fallback to random images, just in case OpenAPI credits run out
      console.error(err)
      // return res.status(500).json({ message: 'Generation failed' })
    }
  } else {
    data = randomImages
  }

  return res.status(200).json(data)
}
