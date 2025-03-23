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
    
    if (status === "COMPLETED") {
      /* await this.paymentRepository.updatePay({ status: 'COMPLETED' }); */
      this.websocketRepository.sendStatus(orderId);
    }
  }
}