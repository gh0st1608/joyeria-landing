import { Inject, Injectable } from '@nestjs/common';
import { ICartbuyRepository } from '../../cartbuy/domain/repository/cartbuy.repository'
import { Cartbuy } from '../domain/entities/cartbuy.entity';

@Injectable()
export class GetCartbuyUseCase {
  constructor(
    @Inject('ICartbuyRepository') 
    private readonly cartbuyRepository: ICartbuyRepository) {}
  async execute(id: string): Promise<Cartbuy> {
    return this.cartbuyRepository.get(id);
  }
}