// src/application/Products/get-Products.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/repository/product.repository'
import { Product } from '../domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject('IProductRepository') 
    private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}