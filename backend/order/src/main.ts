import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5002;
  app.setGlobalPrefix('order')
  app.enableCors();
  await app.listen(port,'0.0.0.0');
}
bootstrap();
