// src/application/Products/get-Products.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/entities/product.entity';
import { IProductRepository } from '../domain/repository/product.repository';

@Injectable()
export class GetProductsByParamsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(filters: Record<string, string>): Promise<Product[]> {
      return this.productRepository.findByParams(filters);
  }
}