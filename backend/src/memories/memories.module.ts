/*
Springboot에서의 Config
*/

import { Module } from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { MemoriesController } from './memories.controller';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';

@Module({
  controllers: [MemoriesController],
  providers: [MemoriesService, PrismaService, S3Service],
})
export class MemoriesModule {}