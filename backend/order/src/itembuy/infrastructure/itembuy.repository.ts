// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IItembuyRepository } from '../domain/repository/itembuy.repository';
import { Itembuy as ItembuyMongoose} from './schemas/itembuy.schema';
import { Itembuy } from '../domain/entities/itembuy.entity'
import { plainToClass } from 'class-transformer';

@Injectable()
export class ItembuyInfrastructureRepository implements IItembuyRepository {
  constructor(@InjectModel(ItembuyMongoose.name) private itembuyModel: Model<ItembuyMongoose>) {}

  // Implementación del método para crear un usuario
  async create(cartbuy: Itembuy): Promise<Itembuy> {
    //const cartbuyEntity = cartbuy.properties()
    const cartbuyMongoose = new this.itembuyModel(cartbuy);
    const savedCartbuy = await cartbuyMongoose.save();
    return new Itembuy(savedCartbuy.toObject());
  }

  async get(id: string): Promise<Itembuy> {
    const itembuyModel = await this.itembuyModel.findById(id).lean().exec();
    const itembuy = plainToClass(Itembuy,itembuyModel)
    return itembuy;
  }

  async getList(): Promise<Itembuy[]> {
    const itembuys = await this.itembuyModel.find().lean().exec();
    return itembuys.map(itembuy => plainToClass(Itembuy, {
      ...itembuy, // Usamos el objeto plano de Mongoose
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
    await this.itembuyModel.findByIdAndUpdate(id,{state : false}).exec();
  }


}
