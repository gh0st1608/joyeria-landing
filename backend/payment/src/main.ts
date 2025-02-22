import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5002;
  app.setGlobalPrefix('payment')
  app.enableCors();
  await app.listen(port);
}
bootstrap();
