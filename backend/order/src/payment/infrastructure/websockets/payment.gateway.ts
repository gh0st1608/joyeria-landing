import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IWebSocketRepository } from '../../domain/repository/websocket.repository';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({ cors: true })
@Injectable()
export class PaymentGateway implements IWebSocketRepository {
  @WebSocketServer()
  server: Server;

  sendStatus(orderId: string) {
    console.log(`📢 Notificando al frontend: Pago COMPLETADO para ${orderId}`);
    this.server.emit(`payment-status-${orderId}`, { status: "COMPLETED" });
  }
}
