// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAuthRepository } from '../domain/repository/auth.repository';
import { Auth as AuthMongoose} from './schemas/auth.schema';
import { Auth } from '../domain/entities/auth.entity'

@Injectable()
export class AuthInfrastructureRepository implements IAuthRepository {
  constructor(@InjectModel(AuthMongoose.name) private authModel: Model<AuthMongoose>) {}
  
  async findOne(where: { [s: string]: string | number }): Promise<Auth | null> {
    return await Model.findOne(where);
  }

  async update(
    where: { [s: string]: string | number },
    data: { [s: string]: string | number }
  ): Promise<void> {
    await Model.updateOne(where, data);
  }

  // Implementación del método para actualizar un usuario
/*   async update(product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(product.id, product, { new: true }).exec();
  } */

  // Implementación del método para eliminar un usuario
  async delete(id: string): Promise<void> {
    await this.authModel.findByIdAndDelete(id).exec();
  }
}
