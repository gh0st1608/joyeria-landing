import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateColorUseCase } from '../application/create.application';
import { GetColorUseCase } from '../application/get-all.application';
/* import { UpdateColorUseCase } from '../application/update.application'; */
import { DeleteColorUseCase } from '../application/delete.application';
import { Color } from '../domain/entities/color.entity';
import { UpdateColorDto } from './dto/update.dto';
import { CreateColorDto } from './dto/create.dto';

@Controller('colors')
export class ColorsController {
  constructor(
    private readonly createColorUseCase: CreateColorUseCase,
    private readonly getColorsUseCase: GetColorUseCase,
    /* private readonly updateColorUseCase: UpdateColorUseCase, */
    private readonly deleteColorUseCase: DeleteColorUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateColorDto): Promise<Color> {
    try {
      return this.createColorUseCase.execute(body);
    }catch(error) {
      console.log(error)
    }
    
  }

  @Get()
  async findAll(): Promise<Color[]> {
    return this.getColorsUseCase.execute();
  }

/*   @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateColorDto,
  ): Promise<Color> {
    return this.updateColorUseCase.execute(id, body);
  } */

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteColorUseCase.execute(id);
  }
}