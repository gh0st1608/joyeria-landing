import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import functions from '@google-cloud/functions-framework';

async function bootstrap() {
  const expressApp = express();

  // Crea la aplicación NestJS usando Express como base
  const app = await NestFactory.create(NotificationModule, new ExpressAdapter(expressApp));
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('notification');
  app.enableCors();

  // Inicializa la aplicación NestJS
  await app.init();

  // Exporta el manejador para Google Cloud Functions
  return expressApp;
}

// Usar funciones de Google Cloud Functions para exportar la función HTTP
functions.http('notificationService', async (req, res) => {
  const expressApp = await bootstrap(); // Esperar a que la app se inicialice
  expressApp(req, res); // Llamar a la aplicación Express
});
