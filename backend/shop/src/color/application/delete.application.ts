import { Inject, Injectable } from '@nestjs/common';
import { IColorRepository } from '../domain/repository/color.repository'

@Injectable()
export class DeleteColorUseCase {
  constructor(
    @Inject('IColorRepository')
    private readonly ColorRepository: IColorRepository) {}

  async execute(id: string): Promise<void> {
    return await this.ColorRepository.delete(id);
  }
}