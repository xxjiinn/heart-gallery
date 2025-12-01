import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { s3Storage } from './upload.s3';
import { PrismaService } from '../prisma/prisma.service';
import { UploadDto } from './upload.dto';
import { SocketService } from '../socket/socket.service';

@Controller('upload')
export class UploadController {
  constructor(
    private prisma: PrismaService,
    private socketService: SocketService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        { name: 'fullFile', maxCount: 1 },
      ],
      { storage: s3Storage },
    ),
  )
  async uploadFile(
    @UploadedFiles() files: { file?: Express.MulterS3.File[]; fullFile?: Express.MulterS3.File[] },
    @Body() body: UploadDto,
  ) {
    const croppedFile = files.file?.[0];
    const fullFile = files.fullFile?.[0];

    if (!croppedFile) {
      throw new Error('Cropped file is required');
    }

    const saved = await this.prisma.heartMemory.create({
      data: {
        imageUrl: croppedFile.location,
        fullImageUrl: fullFile?.location || croppedFile.location,
        nickname: body.nickname || '',
        message: body.message,
      },
    });

    // 새 카드를 모든 연결된 클라이언트에 실시간 전송
    this.socketService.emit('new_card', saved);

    return {
      message: 'File uploaded & saved!',
      data: saved,
    };
  }
}
