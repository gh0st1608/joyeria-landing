import { Inject, Injectable } from '@nestjs/common';
import { IItembuyRepository } from '../domain/repository/itembuy.repository'
import { Itembuy } from '../domain/entities/itembuy.entity';

@Injectable()
export class GetItembuyUseCase {
  constructor(
    @Inject('IItembuyRepository') 
    private readonly itembuyRepository: IItembuyRepository) {}
  async execute(id: string): Promise<Itembuy> {
    return this.itembuyRepository.get(id);
  }
}