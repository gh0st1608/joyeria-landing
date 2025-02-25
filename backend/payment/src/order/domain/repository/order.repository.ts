
import { Order } from '../entities/order.entity';

export interface IOrderRepository {
    create(product: Order): Promise<any>;
}