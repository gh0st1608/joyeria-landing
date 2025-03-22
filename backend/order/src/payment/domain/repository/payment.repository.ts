
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';

export interface IPaymentRepository {
    create(product: Order): Promise<any>;
    createPay(payment: Payment) : Promise<Payment>;
    find(where: { [s: string]: string | number }): Promise<Payment>;
    updatePay(payment: Partial<Payment>) : Promise<Payment>;
    execute(tokenPayment: string): Promise<any>;
}