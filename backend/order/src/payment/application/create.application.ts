import { Inject, Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../domain/repository/payment.repository';
import { CreateOrderDto } from '../infrastructure/dto/create.dto';
import { AmountRequired, Order, OrderProperties, PurchaseUnitRequired } from '../domain/entities/order.entity';  // Importamos la entidad Itembuy
import { ICartbuyRepository } from '../../cartbuy/domain/repository/cartbuy.repository';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject('IPaymentRepository') 
    private readonly paymentRepository: IPaymentRepository,
    @Inject('ICartbuyRepository') 
    private readonly cartbuyRepository: ICartbuyRepository
  ) {}

  async execute(orderDto: CreateOrderDto): Promise<Order> {
    const idCartBuy = orderDto.idCartBuy;
    const cartBuyFound = await this.cartbuyRepository.get(idCartBuy);
    const itemInstances = cartBuyFound.properties().items
    const total = itemInstances.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const arrayAmountPU : AmountRequired = { currency_code : 'USD', value : total.toString() }
    const purchase_unit : PurchaseUnitRequired = { amount: arrayAmountPU };

    
    const orderEntity: OrderProperties = {
      intent: 'CAPTURE', 
      purchase_units: [purchase_unit],
      application_context: {
        return_url : `${process.env.HOST_FRONT}/cart`,
        cancel_url : `${process.env.HOST}/order/cancel_url`
      }
    };

    const entity = new Order(orderEntity);
    
    return this.paymentRepository.create(entity);
  }
}
