import { storage } from '@/lib/thirdwebSdk'
const fs = require('fs')

export default function uploadImage(blob: Blob): Promise<string> | Error {
  return new Promise(async (resolve, reject) => {
    const fileName = Math.random().toString(16).substring(2, 8)
    const filePath = '/tmp/' + fileName + '.png'

    let writeStream = fs.createWriteStream(filePath)

    blob.arrayBuffer().then(arrayBuffer => {
      const buffer = Buffer.from(arrayBuffer)
      writeStream.write(buffer)
      writeStream.end()
    })

    writeStream.on('finish', async function () {
      const content = fs.readFileSync(filePath)

      try {
        const uri = await storage.upload(content, {
          uploadWithoutDirectory: true,
        })

        fs.unlinkSync(filePath)

        resolve(uri)
      } catch (error) {
        reject(error)
      }
    })
  })
}
