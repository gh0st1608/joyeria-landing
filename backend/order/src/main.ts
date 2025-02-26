import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5002;
  app.setGlobalPrefix('order')
  app.enableCors();
  await app.listen(port);
}
bootstrap();
