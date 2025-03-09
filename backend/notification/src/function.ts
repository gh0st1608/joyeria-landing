import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from '@google-cloud/functions-framework';

async function bootstrap(): Promise<express.Express> {
  const expressApp = express();
  const app = await NestFactory.create(NotificationModule, new ExpressAdapter(expressApp));
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('notification');
  app.enableCors();
  
  await app.init(); // Esperar la inicialización completa
  return expressApp; // Regresar la app ya inicializada
}

// Exporta la función de Cloud Function con nombre
export const notificationHandler = functions.http('notificationService', async (req, res) => {
  // Asegúrate de que la app esté completamente inicializada antes de manejar la solicitud
  const expressApp = await bootstrap(); // Esta espera que NestJS esté listo
  expressApp(req, res); // Procesa la solicitud HTTP con Express
});
