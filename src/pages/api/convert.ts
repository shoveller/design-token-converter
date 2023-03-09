// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'

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
    file: File
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
  upload.single('token')(req, res, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    // 파일 정보는 req.file 객체 안에 들어있습니다.
    console.log(req.file)

    // 파일 정보를 클라이언트로 보냅니다.
    res.status(200).json(req.file)
  })
}
