// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategoryProductRepository } from '../domain/repository/category-product.repository';
import { CategoryProduct as CategoryProductMongoose} from './schemas/category-product.schema';
import { CategoryProduct } from '../domain/entities/category-product.entity';

@Injectable()
export class CategoryProductInfrastructureRepository implements ICategoryProductRepository {
  constructor(@InjectModel(CategoryProductMongoose.name) private productModel: Model<CategoryProductMongoose>) {}

  // Implementación del método para crear un usuario
  async create(categoryProduct: CategoryProduct): Promise<CategoryProduct> {
    const categoryProductEntity = categoryProduct.properties()
    const categoryProductForMongoose = new this.productModel(categoryProductEntity);
    const savedProduct = await categoryProductForMongoose.save();
    return new CategoryProduct(savedProduct.toObject());
  }

  // Implementación del método para obtener todos los usuarios
  async findAll(): Promise<CategoryProduct[]> {
    const categoryProducts = await this.productModel.find().lean().exec();
    return categoryProducts.map(categoryProduct => new CategoryProduct(categoryProduct));
  }

  // Implementación del método para actualizar un usuario
/*   async update(id: string, categoryProduct: CategoryProduct): Promise<CategoryProduct> {
    const categoryProductEntity = categoryProduct.properties()
    return this.productModel.findByIdAndUpdate(id,categoryProductEntity, { new: true }).exec();
  } */

  // Implementación del método para eliminar un usuario
  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
