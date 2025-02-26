// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaymentRepository } from '../domain/repository/payment.repository';
import { Order as OrderMongoose} from './schemas/order.schema';
import { Order } from '../domain/entities/order.entity'
import axios  from 'axios'


@Injectable()
export class PaymentInfrastructureRepository implements IPaymentRepository {
  constructor(@InjectModel(OrderMongoose.name) private orderModel: Model<OrderMongoose>) {}

  // Implementación del método para crear un usuario
  async create(order: Order): Promise<any> {
    try {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    
    const response = await axios.post(`${process.env.SANDBOX_PAYPAL}/v1/oauth2/token`, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.CLIENT_ID_PAYPAL,
        password: process.env.CLIENT_SECRET_PAYPAL
      }
    })

    const responseOrder = await axios.post(`${process.env.SANDBOX_PAYPAL}/v2/checkout/orders`, order, {
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': `Bearer ${response.data.access_token}`
      }
    })

    return responseOrder.data
  }catch(error){
    console.log(JSON.stringify(error))
  }

  }


  async execute(tokenPayment : string): Promise <any> {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    
    const response = await axios.post(`${process.env.SANDBOX_PAYPAL}/v1/oauth2/token`, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.CLIENT_ID_PAYPAL,
        password: process.env.CLIENT_SECRET_PAYPAL
      }
    })

    const responseOrder = await axios.post(`${process.env.SANDBOX_PAYPAL}/v2/checkout/orders${tokenPayment}/capture`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': `Bearer ${response.data.access_token}`
      }
    })

    return responseOrder.data

  }

}
