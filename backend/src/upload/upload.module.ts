import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SocketService } from '../socket/socket.service';

@Module({
  controllers: [UploadController],
  providers: [PrismaService, SocketService],
})
export class UploadModule {}
