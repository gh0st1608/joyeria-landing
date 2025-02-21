import { NestFactory } from '@nestjs/core';
import { ShopModule } from './shop.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ShopModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4001;
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
