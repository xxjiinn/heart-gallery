/*
Springboot에서의 Service
*/


import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
import { randomUUID } from 'crypto';

@Injectable()
export class MemoriesService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async findAll() {
    return this.prisma.heartMemory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(imageData: string, message: string) {
    // base64 데이터에서 실제 데이터 부분만 추출
    // 형식: "data:image/png;base64,iVBORw0KGgo..."
    const matches = imageData.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid image data format');
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const fileBuffer = Buffer.from(base64Data, 'base64');

    // 파일 확장자 추출
    const extension = mimeType.split('/')[1] || 'png';
    const fileName = `${randomUUID()}.${extension}`;

    // S3에 업로드
    const imageUrl = await this.s3Service.uploadFile(
      fileName,
      fileBuffer,
      mimeType,
    );

    // DB에 저장
    const saved = await this.prisma.heartMemory.create({
      data: {
        imageUrl,
        message,
      },
    });

    return saved;
  }
}