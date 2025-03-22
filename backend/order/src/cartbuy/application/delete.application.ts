import { Inject, Injectable } from '@nestjs/common';
import { ICartbuyRepository } from '../../cartbuy/domain/repository/cartbuy.repository'

@Injectable()
export class DeleteCartbuyUseCase {
  constructor(
    @Inject('ICartbuyRepository') 
    private readonly cartbuyRepository: ICartbuyRepository) {}
  async execute(id: string): Promise<void> {
    return await this.cartbuyRepository.delete(id);
  }
}