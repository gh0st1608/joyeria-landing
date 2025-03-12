/* import { Injectable } from '@nestjs/common';
import { CategoryProduct, CategoryProductPropertiesUpdate } from '../domain/entities/color.entity';
import { ICategoryProductRepository } from '../domain/repository/color.repository'
import { UpdateCategoryProductDto } from '../infrastructure/dto/update.dto'; */

/* @Injectable()
export class UpdateCategoryProductUseCase {
  constructor(private readonly CategoryProductRepository: ICategoryProductRepository) {}

  async execute(id: string, updateCategoryProduct: UpdateCategoryProductDto): Promise<CategoryProduct> {
    const propertiesUpdate : CategoryProductPropertiesUpdate = { id : id, ...updateCategoryProduct}
    const entity = new CategoryProduct(propertiesUpdate)

    return this.CategoryProductRepository.update(id,entity)
  }
} */