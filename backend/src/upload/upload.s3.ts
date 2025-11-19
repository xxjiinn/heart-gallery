import { randomUUID } from 'crypto';
import { S3Client } from '@aws-sdk/client-s3';

// CommonJS 모듈을 require로 가져오기
const multerS3 = require('multer-s3');

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// S3 storage 객체만 정의
export const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET_NAME,
  key: (req, file, cb) => {
    cb(null, `uploads/${randomUUID()}-${file.originalname}`);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
});
