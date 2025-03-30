import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/entities/product.entity';
import { IProductRepository } from '../domain/repository/product.repository';

@Injectable()
export class GetProductsByIdUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id : string): Promise<Product> {
      return this.productRepository.getProduct(id);
  }
}