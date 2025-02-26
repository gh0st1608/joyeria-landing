import { Inject, Injectable } from '@nestjs/common';
import { IItembuyRepository } from '../domain/repository/itembuy.repository'
import { Itembuy } from '../domain/entities/itembuy.entity';

@Injectable()
export class GetListItembuyUseCase {
  constructor(
    @Inject('IItembuyRepository') 
    private readonly itembuyRepository: IItembuyRepository) {}
  async execute(): Promise<Itembuy[]> {
    return this.itembuyRepository.getList();
  }
}