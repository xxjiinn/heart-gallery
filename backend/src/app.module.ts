import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MemoriesModule } from './memories/memories.module';
import { UploadModule } from './upload/upload.module';

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
  providers: [
    {
      provide: 'IO',
      useFactory: () => {
        // main.ts에서 설정된 io를 사용
        return global['io'];
      },
    },
  ],
  exports: ['IO'],
})
export class AppModule {}
