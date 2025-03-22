import { Inject, Injectable } from '@nestjs/common';
import { IWebSocketRepository } from '../domain/repository/websocket.repository';
import { IPaymentRepository } from '../domain/repository/payment.repository';
import { Payment, PaymentProperties } from '../domain/entities/payment.entity';

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
    const existingPaymentData = await this.paymentRepository.find({orderId});
    // Lógica para actualizar el estado del pago en la base de datos...
    if (existingPaymentData) {
      // Si el pago existe, actualizarlo
      /* const payment = new Payment(existingPaymentData); // Convertir los datos en una entidad Payment
      const updatedPayment = payment.update({ status }); // Usar el método update
      await this.paymentRepository.updatePay(updatedPayment.properties()); */
    }
    const pay : PaymentProperties = { bank : 'BCP', methodPayment : 'YAPE', userId : 'user000', orderId, status : 'COMPLETED' }
    const payment = new Payment(pay)
    await this.paymentRepository.createPay(payment);

    if (status === "COMPLETED") {
      /* await this.paymentRepository.updatePay({ status: 'COMPLETED' }); */
      this.websocketRepository.sendStatus(orderId);
    }
  }
}