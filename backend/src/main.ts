import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 - 환경 변수에서 허용할 origin 읽기
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  app.enableCors({
    origin: corsOrigin.split(','), // 여러 도메인 지원 (콤마로 구분)
    credentials: false,
  });

  const port = process.env.PORT || 3000;
  const server = await app.listen(port);

  // Socket.IO 설정
  const io = new Server(server, {
    cors: {
      origin: corsOrigin.split(','),
      credentials: false,
    },
  });

  // Socket.IO를 전역으로 사용할 수 있도록 저장
  global['io'] = io;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  console.log(`Application is running on port ${port}`);
}
bootstrap();