// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMaterialRepository } from '../domain/repository/material.repository';
import { Material as MaterialMongoose} from './schemas/color.schema';
import { Material } from '../domain/entities/material.entity';

@Injectable()
export class MaterialInfrastructureRepository implements IMaterialRepository {
  constructor(@InjectModel(MaterialMongoose.name) private materialModel: Model<MaterialMongoose>) {}

  // Implementación del método para crear un usuario
  async create(material: Material): Promise<Material> {
    const materialEntity = material.properties()
    const materialForMongoose = new this.materialModel(materialEntity);
    const savedMaterial = await materialForMongoose.save();
    return new Material(savedMaterial.toObject());
  }

  // Implementación del método para obtener todos los usuarios
  async findAll(): Promise<Material[]> {
    const materials = await this.materialModel.find().lean().exec();
    return materials.map(material => new Material(material));
  }

  // Implementación del método para actualizar un usuario
/*   async update(id: string, material: Material): Promise<Material> {
    const categoryProductEntity = material.properties()
    return this.productModel.findByIdAndUpdate(id,categoryProductEntity, { new: true }).exec();
  } */

  // Implementación del método para eliminar un usuario
  async delete(id: string): Promise<void> {
    await this.materialModel.findByIdAndDelete(id).exec();
  }
}
