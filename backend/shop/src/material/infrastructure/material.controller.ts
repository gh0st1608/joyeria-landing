import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateMaterialUseCase } from '../application/create.application';
import { GetMaterialUseCase } from '../application/get-all.application';
/* import { UpdateMaterialUseCase } from '../application/update.application'; */
import { DeleteMaterialUseCase } from '../application/delete.application';
import { Material } from '../domain/entities/material.entity';
import { UpdateMaterialDto } from './dto/update.dto';
import { CreateMaterialDto } from './dto/create.dto';

@Controller('materials')
export class MaterialsController {
  constructor(
    private readonly createMaterialUseCase: CreateMaterialUseCase,
    private readonly getMaterialsUseCase: GetMaterialUseCase,
    /* private readonly updateMaterialUseCase: UpdateMaterialUseCase, */
    private readonly deleteMaterialUseCase: DeleteMaterialUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateMaterialDto): Promise<Material> {
    try {
      return this.createMaterialUseCase.execute(body);
    }catch(error) {
      console.log(error)
    }
    
  }

  @Get()
  async findAll(): Promise<Material[]> {
    return this.getMaterialsUseCase.execute();
  }

/*   @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateMaterialDto,
  ): Promise<Material> {
    return this.updateMaterialUseCase.execute(id, body);
  } */

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteMaterialUseCase.execute(id);
  }
}