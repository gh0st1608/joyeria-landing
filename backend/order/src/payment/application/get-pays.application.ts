import { Inject, Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../../payment/domain/repository/payment.repository'
import { Payment } from '../domain/entities/payment.entity';

@Injectable()
export class GetListPaysUseCase {
  constructor(
    @Inject('IPaymentRepository') 
    private readonly paymentRepository: IPaymentRepository
) {}
  async execute(): Promise<Payment[]> {
    return this.paymentRepository.listPays();
  }
}