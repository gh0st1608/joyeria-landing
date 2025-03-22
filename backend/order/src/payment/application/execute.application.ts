import { Inject, Injectable } from '@nestjs/common';
import { IPaymentRepository } from '../domain/repository/payment.repository';

@Injectable()
export class ExecutePaymentUseCase {
  constructor(
    @Inject('IPaymentRepository') 
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(tokenPayment : string): Promise<any> {
    return this.paymentRepository.execute(tokenPayment);
  }
}