import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../domain/repository/order.repository';
import { CreateOrderDto } from '../infrastructure/dto/create.dto';
import { AmountRequired, ItemsRequired, Order, OrderProperties, PurchaseUnitRequired } from '../domain/entities/order.entity';  // Importamos la entidad Itembuy
import { ICartbuyRepository } from '../../cartbuy/domain/repository/cartbuy.repository';
import { Itembuy, ItembuyProperties } from '../../itembuy/domain/entities/itembuy.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('IOrderRepository') 
    private readonly orderRepository: IOrderRepository,
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
    //const purchase_unit: PurchaseUnitRequired = { items: arrayItemsPU, amount: arrayAmountPU };
    
    const orderEntity: OrderProperties = {
      intent: 'CAPTURE', 
      purchase_units: [purchase_unit],
      application_context: {
        return_url : 'http://localhost:4002/payment/return_url',
        cancel_url : 'http://localhost:4002/payment/cancel_url'
      }
    };

    const entity = new Order(orderEntity);

    return this.orderRepository.create(entity);
  }
}
