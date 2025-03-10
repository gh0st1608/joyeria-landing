import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from '@google-cloud/functions-framework';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  
  app.enableCors();
  await app.init();
}

export const taskHandler = functions.http('taskHandler', async ( req, res) => {
  await bootstrap();
  server(req, res);
});