// src/application/Materials/get-Materials.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IMaterialRepository } from '../domain/repository/material.repository'
import { Material } from '../domain/entities/material.entity';

@Injectable()
export class GetMaterialUseCase {
  constructor(
    @Inject('IMaterialRepository')
    private readonly materialRepository: IMaterialRepository) {}

  async execute(): Promise<Material[]> {
    return await this.materialRepository.findAll();
  }
}