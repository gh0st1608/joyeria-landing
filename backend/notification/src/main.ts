import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ContactModule } from './contact/contact.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5003;
  app.setGlobalPrefix('shop')
  app.enableCors();
  await app.listen(port);
}
bootstrap();
