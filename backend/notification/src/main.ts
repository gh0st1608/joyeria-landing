import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from '@google-cloud/functions-framework'; //

const expressApp = express();

async function bootstrap(expressApp : express.Express) {
  const app = await NestFactory.create(NotificationModule, new ExpressAdapter(expressApp));
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('notification');
  app.enableCors();
  
  await app.init();
}

bootstrap(expressApp);

// Exportamos la función para Cloud Functions
//functions.http('notificationService', expressApp);
export const notificationHandler = expressApp;
/* export const notificationService: CloudFunction = expressApp; */
