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
import { Cartbuy } from '../domain/entities/cartbuy.entity';
import { ICartbuyRepository } from '../domain/repository/cartbuy.repository';
import { CreateCartbuyDto } from '../infrastructure/dto/cartbuy/create.dto';
import { CreateItembuyDto } from '../infrastructure/dto/itembuy/create.dto';
import { Itembuy } from '../domain/entities/itembuy.entity';  // Importamos la entidad Itembuy
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCartbuyUseCase {
  constructor(
    @Inject('ICartbuyRepository') 
    private readonly cartbuyRepository: ICartbuyRepository
  ) {}

  async execute(cartbuyDto: CreateCartbuyDto): Promise<Cartbuy> {
    const items = cartbuyDto.items.map(itemDto =>
      plainToInstance(Itembuy, itemDto) // Convierte el DTO a una instancia de Itembuy
    );

    // Creamos la entidad Cartbuy con los items mapeados
    const cartbuyEntity = new Cartbuy({
      items: items,
      totalPrice: cartbuyDto.totalPrice,
      //state: true,  // Ajusta el valor de `state` según tu lógica
    });

    // Pasamos la entidad al repositorio para su creación
    return this.cartbuyRepository.create(cartbuyEntity);
  }
}