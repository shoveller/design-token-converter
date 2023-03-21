// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import fs from 'fs/promises'
import fs from 'fs'
import multer from 'multer'
import type { NextApiRequest, NextApiResponse } from 'next'

const { transformTokens } = require('token-transformer')
const styleDictionary = require('style-dictionary')
const { makeThemeConfig } = require('sd-theme-transformer')

// 파일 저장 경로 설정
const upload = multer({
  dest: 'public/uploads/',
})

type Data = {
  name: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

declare module 'next' {
  // eslint-disable-next-line no-unused-vars
  interface NextApiRequest {
    file: File & { path: string }
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(404).end()
    return
  }

  // @ts-ignore
  upload.single('token')(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    const buffer = fs.readFileSync(req.file.path)
    fs.unlinkSync(req.file.path)
    const rawTokens = JSON.parse(buffer.toString())
    const tokens = transformTokens(rawTokens, undefined, undefined, {
      expandTypography: true,
      expandShadow: true,
      expandComposition: true,
      expandBorder: true,
      preserveRawValue: false,
      throwErrorWhenNotResolved: true,
      resolveReferences: true,
    })
    fs.writeFileSync(
      'public/tokens/global.json',
      JSON.stringify(tokens, null, 2)
    )
    const SD = styleDictionary.extend(
      makeThemeConfig({
        source: 'public/tokens/global.json',
        buildPath: 'public/themes/',
      })
    )

    SD.buildAllPlatforms()

    res.status(200).json({ name: 'ok' })
  })
}
