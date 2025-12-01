import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UploadController],
  providers: [
    PrismaService,
    {
      provide: 'IO',
      useFactory: () => {
        return global['io'];
      },
    },
  ],
})
export class UploadModule {}
