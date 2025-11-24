/*
Springboot에서의 Repository
*/

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {    // PrismaClient는 SpringBoot의 JPA(Hibernate) 역할(객체와 DB 테이블 간의 매핑 및 쿼리 실행)을 담당.
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
