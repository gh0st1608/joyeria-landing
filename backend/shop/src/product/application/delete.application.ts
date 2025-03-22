import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/repository/product.repository'

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('IProductRepository') 
    private readonly productRepository: IProductRepository) {}
  async execute(id: string): Promise<void> {
    return await this.productRepository.delete(id);
  }
}