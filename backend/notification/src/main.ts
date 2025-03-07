import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import functions from '@google-cloud/functions-framework';

const expressApp = express();

async function bootstrap(expressApp: express.Express) {
  const app = await NestFactory.create(NotificationModule, new ExpressAdapter(expressApp));
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('notification');
  app.enableCors();
  
  await app.init();
}

// 🟢 Importante: Esperar a que `bootstrap()` se complete antes de exportar la función
/* bootstrap(expressApp).then(() => {
  functions.http('notificationService', expressApp);
}); */

export const notificationHandler = functions.http('notificationService', (req, res) => {
  expressApp(req, res);
});

/* functions.http('notificationService', (req, res) => {
  expressApp(req, res);
});
 */