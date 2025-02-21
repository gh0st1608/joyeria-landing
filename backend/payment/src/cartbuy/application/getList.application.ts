import { Inject, Injectable } from '@nestjs/common';
import { ICartbuyRepository } from '../domain/repository/cartbuy.repository'
import { Cartbuy } from '../domain/entities/cartbuy.entity';

@Injectable()
export class GetListCartbuyUseCase {
  constructor(
    @Inject('ICartbuyRepository') 
    private readonly cartbuyRepository: ICartbuyRepository) {}
  async execute(): Promise<Cartbuy[]> {
    return this.cartbuyRepository.getList();
  }
}