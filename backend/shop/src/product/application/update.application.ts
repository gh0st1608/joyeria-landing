/* import { Injectable } from '@nestjs/common';
import { Product } from '../domain/entities/product.entity';
import { IProductRepository } from '../domain/repository/product.repository'

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly ProductRepository: IProductRepository) {}

  async execute(id: string, name: string): Promise<Product> {
    const product = new Product(id, name);
    return await this.ProductRepository.update(product);
  }
} */