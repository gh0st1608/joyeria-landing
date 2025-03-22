import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5002;
  app.setGlobalPrefix('order')
  app.enableCors();
  // 🚀 Iniciar servidor HTTP
 /* const httpServer = app.getHttpServer();


   const io = new Server(httpServer, {
    cors: {
      origin: "*", // Permitir cualquier origen (ajustar según necesidades)
      methods: ["GET", "POST"]
    }
  });

  // 🟢 Escuchar conexiones WebSocket
  io.on("connection", (socket) => {
    console.log("🟢 Cliente conectado al WebSocket:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Cliente desconectado:", socket.id);
    });
  }); */
  await app.listen(port,'0.0.0.0');
}
bootstrap();
