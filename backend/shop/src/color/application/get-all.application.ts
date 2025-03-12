// src/application/Colors/get-Colors.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IColorRepository } from '../domain/repository/color.repository'
import { Color } from '../domain/entities/color.entity';

@Injectable()
export class GetColorUseCase {
  constructor(
    @Inject('IColorRepository')
    private readonly ColorRepository: IColorRepository) {}

  async execute(): Promise<Color[]> {
    return await this.ColorRepository.findAll();
  }
}