// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaymentRepository } from '../domain/repository/payment.repository';
import { Order as OrderMongoose} from './schemas/order.schema';
import { Order } from '../domain/entities/order.entity'
import { PayPalAuthService } from '../services/paypal.service';
import axios  from 'axios'


@Injectable()
export class PaymentInfrastructureRepository implements IPaymentRepository {
  constructor(
    @InjectModel(OrderMongoose.name) private orderModel: Model<OrderMongoose>,
    private readonly payPalAuthService: PayPalAuthService

) {}

  // Implementación del método para crear un usuario
  async create(order: Order): Promise<any> {
    try {
    const accessToken = await this.payPalAuthService.getAuthToken();

    const responseOrder = await axios.post(`${process.env.SANDBOX_PAYPAL}/v2/checkout/orders`, order, {
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    console.log('responseOrder',responseOrder.data)
    return responseOrder.data
  }catch(error){
    console.log(JSON.stringify(error))
  }

  }


  async execute(tokenPayment : string): Promise <any> {
    const accessToken = await this.payPalAuthService.getAuthToken();
    console.log('executePayment',tokenPayment)
    const responseOrder = await axios.post(`${process.env.SANDBOX_PAYPAL}/v2/checkout/orders/${tokenPayment}/capture`,{},{
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return responseOrder.data

  }

}
