// src/application/CategoryProducts/get-CategoryProducts.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { ICategoryProductRepository } from '../domain/repository/category-product.repository'
import { CategoryProduct } from '../domain/entities/category-product.entity';

@Injectable()
export class GetCategoryProductsUseCase {
  constructor(
    @Inject('ICategoryProductRepository')
    private readonly CategoryProductRepository: ICategoryProductRepository) {}

  async execute(): Promise<CategoryProduct[]> {
    return this.CategoryProductRepository.findAll();
  }
}