// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaymentRepository } from '../domain/repository/payment.repository';
import { Payment } from '../domain/entities/payment.entity';
import { Payment as PaymentMongoose} from './schemas/payment.schema';
import { Order as OrderMongoose} from './schemas/order.schema';
import { Order } from '../domain/entities/order.entity'
import { PayPalAuthService } from '../services/paypal.service';
import axios  from 'axios'


@Injectable()
export class PaymentInfrastructureRepository implements IPaymentRepository {
  constructor(
    @InjectModel(OrderMongoose.name) private orderModel: Model<OrderMongoose>,
    private readonly payPalAuthService: PayPalAuthService,
    @InjectModel(PaymentMongoose.name) private paymentModel: Model<PaymentMongoose>,
) {}

  // Implementación del método para crear un usuario
  async create(order: Order): Promise<any> {
    try {
    const accessToken = await this.payPalAuthService.getAuthToken();

    const responseOrder = await axios.post(`${process.env.PAYPAL_API_BASE_URL}/v2/checkout/orders`, order, {
      headers: {
        'Content-Type': 'application/json',
        //'PayPal-Request-Id': 'f98d6c31-f5ec-4233-92ff-c2d0c04b4886',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return responseOrder.data
  }catch(error){
    console.log(JSON.stringify(error))
  }

  }

  async createPay(payment: Payment): Promise<Payment> {
    // Convierte el objeto de Mongoose a un objeto de dominio
    const paymentDomain = new Payment(payment.properties());
    const paymentMongoose = new this.paymentModel(paymentDomain); // Ahora puedes usar el objeto de dominio para crear el pago en Mongoose
    const savedPayment = await paymentMongoose.save();
    console.log('savedPayment',savedPayment)
    return new Payment(savedPayment.toObject());
  }

  async updatePay(payment: Partial<Payment>): Promise<Payment> {
    // Convierte el objeto de Mongoose a un objeto de dominio
    const paymentDomain = new Payment(payment.properties());
    const paymentMongoose = new this.paymentModel(paymentDomain); // Ahora puedes usar el objeto de dominio para crear el pago en Mongoose
    const updatedPayment = await paymentMongoose.updateOne(paymentMongoose);
    return new Payment(updatedPayment.toObject());
  }

  async find(where: { [s: string]: string | number }) : Promise<Payment>{
    const payment = await this.paymentModel.findOne(where).lean().exec();
    return payment ? new Payment(payment) : null;
  }


  async execute(tokenPayment : string): Promise <any> {
    const accessToken = await this.payPalAuthService.getAuthToken();
    const responseOrder = await axios.post(`${process.env.PAYPAL_API_BASE_URL}/v2/checkout/orders/${tokenPayment}/capture`,{},{
      headers: {
        'Content-Type': 'application/json',
        //'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return responseOrder.data

  }

  async notificationStatus(orderId: string): Promise<void> {
    
  }

}
