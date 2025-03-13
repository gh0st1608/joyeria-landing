import { NotificationModule } from './notification.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { NestFactory } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const expressApp = express();
  const app = await NestFactory.create(NotificationModule, new ExpressAdapter(expressApp));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5003;
  
  app.setGlobalPrefix('notification');
  app.enableCors();
  
  await app.init(); // Esperar la inicialización completa
  
  expressApp.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
}

bootstrap();