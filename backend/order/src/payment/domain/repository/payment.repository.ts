
import { Order } from '../entities/order.entity';

export interface IPaymentRepository {
    create(product: Order): Promise<any>;
    execute(tokenPayment: string): Promise<any>;
}