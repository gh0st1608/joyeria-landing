import { Inject, Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../domain/repository/payment.repository';
import { CreateOrderDto } from '../infrastructure/dto/create.dto';
import { AmountRequired, Order, OrderProperties, PurchaseUnitRequired } from '../domain/entities/order.entity';  // Importamos la entidad Itembuy
import { ICartbuyRepository } from '../../cartbuy/domain/repository/cartbuy.repository';
import { CreatePaymentDto } from '../infrastructure/dto/create-payment.dto';
import { Payment } from '../domain/entities/payment.entity';

@Injectable()
export class CreatePaymentLocalUseCase {
  constructor(
    @Inject('IPaymentRepository') 
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(paymentDto: CreatePaymentDto): Promise<Payment> {
    const entity = new Payment(paymentDto);
    return this.paymentRepository.createPay(entity);
  }
}
