import { Inject, Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../domain/repository/payment.repository';
import { HttpService } from '@nestjs/axios';
import { Payment } from '../domain/entities/payment.entity';

@Injectable()
export class ExecutePaymentUseCase {
  constructor(
    @Inject('IPaymentRepository') 
    private readonly paymentRepository: IPaymentRepository,
    private readonly httpService: HttpService
  ) {}

  async execute(tokenPayment : string): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      `${process.env.PAYPAL_API_BASE_URL}/v2/checkout/orders/${tokenPayment}`,
      {
        headers: {
          Authorization: `Bearer ${tokenPayment}`,
        },
      }
    );
    const paymentData = response.data;
    console.log('paymentData',paymentData)
    const payment = new Payment({
      orderId: paymentData.id,
      payerId: paymentData.payer.payer_id,
      status: paymentData.status,
      amount: parseFloat(paymentData.purchase_units[0].payments.captures[0].amount.value),
      currency: paymentData.purchase_units[0].payments.captures[0].amount.currency_code,
      createTime: new Date(paymentData.create_time), // Convertir a Date
      id: paymentData.id,  // Si es necesario
      bank: 'PayPal', // Si la plataforma de pago es PayPal
      methodPayment: 'Online', // Definir método de pago
      userId: paymentData.payer.email_address, // O algún identificador del usuario
    })
    
    await this.paymentRepository.createPay(payment);

    return this.paymentRepository.execute(tokenPayment);
  }
}