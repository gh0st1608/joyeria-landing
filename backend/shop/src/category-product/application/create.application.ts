// src/application/CategoryProducts/create-CategoryProduct.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { CategoryProduct } from '../domain/entities/category-product.entity';

import { ICategoryProductRepository } from '../domain/repository/category-product.repository'
import { CreateCategoryProductDto } from '../infrastructure/dto/create.dto';

@Injectable()
export class CreateCategoryProductUseCase {
  constructor(
    @Inject('ICategoryProductRepository') 
    private readonly CategoryProductRepository: ICategoryProductRepository) {}

  async execute(categoryProduct: CreateCategoryProductDto): Promise<CategoryProduct> {
    const entityCategoryProduct = new CategoryProduct(categoryProduct)  // MongoDB generará el ID automáticamente
    return this.CategoryProductRepository.create(entityCategoryProduct);
  }
}