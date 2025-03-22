import { Inject, Injectable } from '@nestjs/common';
import { ICategoryProductRepository } from '../domain/repository/category-product.repository'

@Injectable()
export class DeleteCategoryProductUseCase {
  constructor(
    @Inject('ICategoryProductRepository')
    private readonly CategoryProductRepository: ICategoryProductRepository) {}

  async execute(id: string): Promise<void> {
    return await this.CategoryProductRepository.delete(id);
  }
}