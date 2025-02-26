import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateItembuyUseCase } from '../application/create.application';
import { CreateItembuyDto } from './dto/itembuy/create.dto';
import { DeleteItembuyUseCase } from '../application/delete.application';
import { GetItembuyUseCase } from '../application/get.application';
import { GetListItembuyUseCase } from '../application/getList.application';
import { Itembuy } from '../domain/entities/itembuy.entity';

@Controller('itembuy')
export class ItembuyController {
  constructor(
    private readonly createItembuyUseCase: CreateItembuyUseCase,
    private readonly getItembuyUseCase: GetItembuyUseCase,
    private readonly getListItembuyUseCase: GetListItembuyUseCase,
    private readonly deleteItembuyUseCase: DeleteItembuyUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateItembuyDto): Promise<Itembuy> {
    return this.createItembuyUseCase.execute(body);
  }

  @Get()
  async getList(): Promise<Itembuy[]> {
    return this.getListItembuyUseCase.execute();
  }

  @Get(':idItembuy')
  async get(
    @Param('idItembuy') idItembuy : string
  ): Promise<Itembuy> {
    return this.getItembuyUseCase.execute(idItembuy);
  }


/*   @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ): Promise<Cartbuy> {
    return this.updateCartbuyUseCase.execute(id, body.name);
  } */

  @Delete(':idItembuy')
  async remove(@Param('idItembuy') idItembuy: string): Promise<void> {
    return this.deleteItembuyUseCase.execute(idItembuy);
  }
}