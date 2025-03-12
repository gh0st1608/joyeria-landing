// src/application/Materials/create-Material.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { Material } from '../domain/entities/material.entity';

import { IMaterialRepository } from '../domain/repository/material.repository'
import { CreateMaterialDto } from '../infrastructure/dto/create.dto';

@Injectable()
export class CreateMaterialUseCase {
  constructor(
    @Inject('IMaterialRepository') 
    private readonly materialRepository: IMaterialRepository) {}

  async execute(categoryProduct: CreateMaterialDto): Promise<Material> {
    const entityMaterial = new Material(categoryProduct)  // MongoDB generará el ID automáticamente
    return this.materialRepository.create(entityMaterial);
  }
}