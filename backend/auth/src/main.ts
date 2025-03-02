import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;
  app.setGlobalPrefix('')
  app.enableCors();
  await app.listen(port);
}
bootstrap();
