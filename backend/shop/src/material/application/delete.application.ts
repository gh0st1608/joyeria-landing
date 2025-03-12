import { Inject, Injectable } from '@nestjs/common';
import { IMaterialRepository } from '../domain/repository/material.repository'

@Injectable()
export class DeleteMaterialUseCase {
  constructor(
    @Inject('IMaterialRepository')
    private readonly materialRepository: IMaterialRepository) {}

  async execute(id: string): Promise<void> {
    return await this.materialRepository.delete(id);
  }
}