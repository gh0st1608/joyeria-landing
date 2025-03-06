import { Inject, Injectable } from '@nestjs/common';
import { IWebSocketRepository } from '../domain/repository/websocket.repository';
import { IPaymentRepository } from '../domain/repository/payment.repository';

@Injectable()
export class PaymentStatusUseCase {
  constructor(
    @Inject('IPaymentRepository') 
    private readonly paymentRepository: IPaymentRepository,
    @Inject('IWebSocketRepository')
    private readonly websocketRepository: IWebSocketRepository,
) {}

  async sendStatus(orderId: string, status: string) {
    console.log(`🔄 Actualizando estado de pago: ${orderId} -> ${status}`);
    
    // Lógica para actualizar el estado del pago en la base de datos...
    //await this.paymentService.updatePaymentStatus(orderId, "COMPLETED");

    if (status === "COMPLETED") {
      this.websocketRepository.sendStatus(orderId);
    }
  }
}