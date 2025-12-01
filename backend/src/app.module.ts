import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MemoriesModule } from './memories/memories.module';
import { UploadModule } from './upload/upload.module';
import { SocketService } from './socket/socket.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    MemoriesModule,
    UploadModule,
  ],
  controllers: [],
  providers: [SocketService],
  exports: [SocketService],
})
export class AppModule {}
