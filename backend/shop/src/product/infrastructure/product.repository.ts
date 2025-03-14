// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProductRepository } from '../domain/repository/product.repository';
import { Product as ProductMongoose} from './schemas/product.schema';
import { Product } from '../domain/entities/product.entity'

@Injectable()
export class ProductInfrastructureRepository implements IProductRepository {
  constructor(@InjectModel(ProductMongoose.name) private productModel: Model<ProductMongoose>) {}

  // Implementación del método para crear un usuario
  async create(product: Product): Promise<Product> {
    const productEntity = product.properties()
      const productMongoose = new this.productModel(productEntity);
      const savedProduct = await productMongoose.save();
      console.log('savedProduct',savedProduct)
      return new Product(savedProduct.toObject());
  }

  // Implementación del método para obtener todos los usuarios
  async findAll(): Promise<Product[]> {
     const products = await this.productModel.find().lean().exec();
     return products.map(product => new Product(product));
  }

  async findByParams(filters: Record<string, string>): Promise<Product[]> {
    // Construimos el objeto de búsqueda dinámicamente
    const query: Record<string, any> = {};
  
    if (filters.color) {
      const colorArray = filters.color.split(',').map(color => color.trim().toLowerCase()); // ✅ Convierte en array
      query.color = { $in: colorArray }; // ✅ Busca productos que coincidan con los colores
    }
    
    if (filters.price) {
      query.price = { $lte: parseFloat(filters.price) }; // Filtra por precio menor o igual
    }

    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" }; // Filtra por precio menor o igual
    }
  
    // Agrega más filtros aquí según sea necesario...
  
    // Ejecutar la consulta con los filtros dinámicos
    const products = await this.productModel.find(query).lean().exec();
    
    return products.map(product => new Product(product));
  }
  


  // Implementación del método para actualizar un usuario
/*   async update(product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(product.id, product, { new: true }).exec();
  } */

  // Implementación del método para eliminar un usuario
  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
