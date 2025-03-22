import { Inject, Injectable } from '@nestjs/common';
import { IItembuyRepository } from '../../itembuy/domain/repository/itembuy.repository'

@Injectable()
export class DeleteItembuyUseCase {
  constructor(
    @Inject('IItembuyRepository') 
    private readonly itembuyRepository: IItembuyRepository) {}
  async execute(id: string): Promise<void> {
    return this.itembuyRepository.delete(id);
  }
}