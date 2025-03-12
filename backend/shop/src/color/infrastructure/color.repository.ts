// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IColorRepository } from '../domain/repository/color.repository';
import { Color as ColorMongoose} from './schemas/color.schema';
import { Color } from '../domain/entities/color.entity';

@Injectable()
export class ColorInfrastructureRepository implements IColorRepository {
  constructor(@InjectModel(ColorMongoose.name) private colorModel: Model<ColorMongoose>) {}

  // Implementación del método para crear un usuario
  async create(color: Color): Promise<Color> {
    const colorEntity = color.properties()
    const colorMongoose = new this.colorModel(colorEntity);
    const savedColor = await colorMongoose.save();
    return new Color(savedColor.toObject());
  }

  // Implementación del método para obtener todos los usuarios
  async findAll(): Promise<Color[]> {
    const colors = await this.colorModel.find().lean().exec();
    return colors.map(color => new Color(color));
  }

  // Implementación del método para actualizar un usuario
/*   async update(id: string, color: Color): Promise<Color> {
    const colorEntity = color.properties()
    return this.productModel.findByIdAndUpdate(id,colorEntity, { new: true }).exec();
  } */

  // Implementación del método para eliminar un usuario
  async delete(id: string): Promise<void> {
    await this.colorModel.findByIdAndDelete(id).exec();
  }
}
