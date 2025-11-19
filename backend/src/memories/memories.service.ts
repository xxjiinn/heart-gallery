/*
Springboot에서의 Service
*/


import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MemoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.heartMemory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}