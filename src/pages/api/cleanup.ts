import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // // 파일 경로 설정
  // const filePath = path.join(process.cwd(), 'path/to/your/file.ext');
  //
  // // 파일이 존재하는지 확인
  // if (!fs.existsSync(filePath)) {
  //   response.status(404).json({ message: 'File not found' });
  //   return;
  // }

  res.status(200).json('ok')
}
