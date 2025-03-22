// src/application/CategoryProducts/create-CategoryProduct.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/entities/product.entity';

import { IProductRepository } from '../domain/repository/product.repository'
import { CreateProductDto } from '../infrastructure/dto/create.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository') 
    private readonly productRepository: IProductRepository) {}

  async execute(product: CreateProductDto): Promise<Product> {
    const entityProduct = new Product(product)  // MongoDB generará el ID automáticamente
    return this.productRepository.create(entityProduct);
  }
}