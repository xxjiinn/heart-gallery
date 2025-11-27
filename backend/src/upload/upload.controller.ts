import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { s3Storage } from './upload.s3';
import { PrismaService } from '../prisma/prisma.service';
import { UploadDto } from './upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: s3Storage }))   // FileInterceptor는 들어오는 HTTP 요청에서 'file' 필드(프론트엔드 FormData.append('file', file)에서 지정한 이름)를 찾는다.
  // 파일을 찾으면, 이 파일을 s3Storage에 정의된 로직을 따라 AWS S3 버킷에 스트리밍하여 업로드한다.
  async uploadFile(   // 업로드가 완료되면 파일 정보를 uploadFile 메서드에 전달.
    @UploadedFile() file: any,    // S3 URL
    @Body() body: UploadDto,      // 메시지
  ) {
    const saved = await this.prisma.heartMemory.create({    // Prisma Client를 사용하여 MySQL 데이터베이스의 HeartMemory 테이블에 새로운 레코드(기록)를 생성하고 저장하는 메서드 호출. SpringBoot에서 "heartMemoryRepository.save(new HeartMemory(...))"와 정확히 같은 역할을 한다.
      data: {
        imageUrl: file.location,
        nickname: body.nickname || '',
        message: body.message,
      },
    });

    return {
      message: 'File uploaded & saved!',
      data: saved,
    };
  }
}
