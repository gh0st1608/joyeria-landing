// src/application/Colors/create-Color.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { Color } from '../domain/entities/color.entity';

import { IColorRepository } from '../domain/repository/color.repository'
import { CreateColorDto } from '../infrastructure/dto/create.dto';

@Injectable()
export class CreateColorUseCase {
  constructor(
    @Inject('IColorRepository') 
    private readonly ColorRepository: IColorRepository) {}

  async execute(categoryProduct: CreateColorDto): Promise<Color> {
    const entityColor = new Color(categoryProduct)  // MongoDB generará el ID automáticamente
    return this.ColorRepository.create(entityColor);
  }
}