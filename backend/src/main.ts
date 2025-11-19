import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 - 환경 변수에서 허용할 origin 읽기
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  app.enableCors({
    origin: corsOrigin.split(','), // 여러 도메인 지원 (콤마로 구분)
    credentials: false,
  });

  await app.listen(3000);
}
bootstrap();