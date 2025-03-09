import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from '@google-cloud/functions-framework';


async function bootstrap() {
  const expressApp = express();

  // Crea la aplicación NestJS usando Express como base
  const app = await NestFactory.create(NotificationModule, new ExpressAdapter(expressApp));
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('notification');
  app.enableCors();

  // Inicializa la aplicación NestJS
  await app.init();

  // Devolvemos la app para ser usada en el manejador de Cloud Functions
  return expressApp;
}

// 🟢 Exportar la función explícitamente
export const notificationHandler = functions.http('notificationService', async (req, res) => {
  const expressApp = await bootstrap(); // Esperar a que la app se inicialic
  expressApp(req, res); // Llamar a la aplicación Express
});
