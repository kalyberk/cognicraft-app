import openaiSdk from '@/lib/openaiSdk'
import OpenAI from 'openai'

export default async function generateImages(
  params: OpenAI.ImageGenerateParams
): Promise<OpenAI.Image[]> {
  return openaiSdk.images.generate(params).then(({ data }) => data)
}
