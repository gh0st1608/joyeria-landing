import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateCartbuyUseCase } from '../application/create.application';
import { Cartbuy } from '../domain/entities/cartbuy.entity';
import { CreateCartbuyDto } from './dto/cartbuy/create.dto';
import { DeleteCartbuyUseCase } from '../application/delete.application';
import { GetCartbuyUseCase } from '../application/get.application';
import { GetListCartbuyUseCase } from '../application/getList.application';

@Controller('cartbuy')
export class CartbuysController {
  constructor(
    private readonly createCartbuyUseCase: CreateCartbuyUseCase,
    private readonly getCartbuysUseCase: GetCartbuyUseCase,
    private readonly getListCartbuysUseCase: GetListCartbuyUseCase,
    private readonly deleteCartbuyUseCase: DeleteCartbuyUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateCartbuyDto): Promise<Cartbuy> {
    return this.createCartbuyUseCase.execute(body);
  }

  @Get()
  async getList(): Promise<Cartbuy[]> {
    return this.getListCartbuysUseCase.execute();
  }

  @Get(':idCartbuy')
  async get(
    @Param('idCartbuy') idCartbuy : string
  ): Promise<Cartbuy> {
    return this.getCartbuysUseCase.execute(idCartbuy);
  }


/*   @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ): Promise<Cartbuy> {
    return this.updateCartbuyUseCase.execute(id, body.name);
  } */

  @Delete(':idCartbuy')
  async remove(@Param('idCartbuy') idCartbuy: string): Promise<void> {
    return this.deleteCartbuyUseCase.execute(idCartbuy);
  }
}