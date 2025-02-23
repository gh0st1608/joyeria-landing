/* // src/application/CategoryCartbuys/create-CategoryCartbuy.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { Cartbuy } from '../domain/entities/cartbuy.entity';

import { ICartbuyRepository } from '../domain/repository/cartbuy.repository'
import { CreateCartbuyDto } from '../infrastructure/dto/cartbuy/create.dto';

@Injectable()
export class CreateCartbuyUseCase {
  constructor(
    @Inject('ICartbuyRepository') 
    private readonly cartbuyRepository: ICartbuyRepository) {}

  async execute(cartbuy: CreateCartbuyDto): Promise<Cartbuy> {
    const entityCartbuy = new Cartbuy(cartbuy)
    return this.cartbuyRepository.create(entityCartbuy);
  }
} */

// src/application/CategoryCartbuys/create-CategoryCartbuy.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { IItembuyRepository } from '../domain/repository/itembuy.repository';
import { CreateItembuyDto } from '../infrastructure/dto/itembuy/create.dto';
import { Itembuy } from '../domain/entities/itembuy.entity';  // Importamos la entidad Itembuy

@Injectable()
export class CreateItembuyUseCase {
  constructor(
    @Inject('ICartbuyRepository') 
    private readonly itembuyRepository: IItembuyRepository
  ) {}

  async execute(itembuyDto: CreateItembuyDto): Promise<Itembuy> {
    const entity = new Itembuy(itembuyDto)
    // Pasamos la entidad al repositorio para su creación
    return this.itembuyRepository.create(entity);
  }
}