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
  @UseInterceptors(FileInterceptor('file', { storage: s3Storage }))
  async uploadFile(
    @UploadedFile() file: any,
    @Body() body: UploadDto,
  ) {
    const saved = await this.prisma.heartMemory.create({
      data: {
        imageUrl: file.location,
        message: body.message,
      },
    });

    return {
      message: 'File uploaded & saved!',
      data: saved,
    };
  }
}
