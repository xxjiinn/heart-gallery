import { randomUUID } from 'crypto';
import { S3Client } from '@aws-sdk/client-s3';

// CommonJS 모듈을 require로 가져오기
const multerS3 = require('multer-s3');

export const s3 = new S3Client({    // AWS SDK v3의 S3Client 객체를 생성하여 S3에 연결한다.
  // [.env] 파일의 AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY 환경 변수를 사용하여 AWS 자격 증명 정보를 설정한다.
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// S3 storage 객체만 정의
export const s3Storage = multerS3({   // multer-s3 라이브러리를 사용하여 파일을 어디에, 어떤 이름으로 저장할지 정의한다.
  s3: s3,   // 위에서 정의한 S3 연결 클라이언트를 사용.
  bucket: process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET_NAME,   // .env의 AWS_S3_BUCKET 값을 사용해 대상 버킷을 지정.
  key: (req, file, cb) => {
    cb(null, `uploads/${randomUUID()}-${file.originalname}`);   // randomUUID로 파일명 생성. 파일이 S3에 저장될 때의 이름(uploads/${randomUUID()}-${file.originalname})을 지정.
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
});
