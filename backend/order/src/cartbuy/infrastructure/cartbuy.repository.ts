// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICartbuyRepository } from '../../cartbuy/domain/repository/cartbuy.repository';
import { Cartbuy as CartbuyMongoose} from './schemas/cartbuy.schema';
import { Cartbuy } from '../domain/entities/cartbuy.entity'
import { plainToClass } from 'class-transformer';

@Injectable()
export class CartbuyInfrastructureRepository implements ICartbuyRepository {
  constructor(@InjectModel(CartbuyMongoose.name) private cartbuyModel: Model<CartbuyMongoose>) {}

  // Implementación del método para crear un usuario
  async create(cartbuy: Cartbuy): Promise<Cartbuy> {
    //const cartbuyEntity = cartbuy.properties()
    const cartbuyMongoose = new this.cartbuyModel(cartbuy);
    const savedCartbuy = await cartbuyMongoose.save();
    return new Cartbuy(savedCartbuy.toObject());
  }

  async get(id: string): Promise<Cartbuy> {
    const cartbuyModel = await this.cartbuyModel.findById(id).lean().exec();
    const cartbuy = plainToClass(Cartbuy,cartbuyModel)
    return cartbuy;
  }

  async getList(): Promise<Cartbuy[]> {
    const cartbuys = await this.cartbuyModel.find().lean().exec();
    return cartbuys.map(cartbuy => plainToClass(Cartbuy, {
      ...cartbuy, // Usamos el objeto plano de Mongoose
    }));
  }

    // Metodo getList sin .lean()
  /* async getList(): Promise<Cartbuy[]> {
     const cartbuys = await this.cartbuyModel.find().exec();
     return cartbuys.map(cartbuy => new Cartbuy(cartbuy));
  } */

  // Implementación del método para actualizar un usuario
/*   async update(product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(product.id, product, { new: true }).exec();
  } */

  // Implementación del método para eliminar un usuario
  async delete(id: string): Promise<void> {
    await this.cartbuyModel.findByIdAndUpdate(id,{state : false}).exec();
  }


}
