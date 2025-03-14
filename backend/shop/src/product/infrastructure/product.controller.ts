import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateProductUseCase } from '../application/create.application';
import { GetProductsUseCase } from '../application/get-all.application';
/* import { UpdateProductUseCase } from '../application/update.application'; */
import { DeleteProductUseCase } from '../application/delete.application';
import { Product } from '../domain/entities/product.entity';
import { CreateProductDto } from './dto/create.dto';
import { GetProductsByParamsUseCase } from '../application/get-by-params.application';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    /* private readonly updateProductUseCase: UpdateProductUseCase, */
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getProductsByParamsUseCase: GetProductsByParamsUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateProductDto): Promise<Product> {
    return this.createProductUseCase.execute(body);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.getProductsUseCase.execute();
  }

  @Get('filters')
  async findByFilters(
    @Query() queryParams: Record<string, string>
  ): Promise<Product[]> {
    if (queryParams.color) {
      queryParams.color = decodeURIComponent(queryParams.color);
    }
    console.log("🔍 Filtros decodificados:", queryParams);
    return this.getProductsByParamsUseCase.execute(queryParams);
  }

/*   @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ): Promise<Product> {
    return this.updateProductUseCase.execute(id, body.name);
  } */

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteProductUseCase.execute(id);
  }
}