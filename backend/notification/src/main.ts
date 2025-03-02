import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5003;
  app.setGlobalPrefix('notification')
  app.enableCors();
  await app.listen(port);
}
bootstrap();
