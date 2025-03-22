import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateCategoryProductUseCase } from '../application/create.application';
import { GetCategoryProductsUseCase } from '../application/get-all.application';
/* import { UpdateCategoryProductUseCase } from '../application/update.application'; */
import { DeleteCategoryProductUseCase } from '../application/delete.application';
import { CategoryProduct } from '../domain/entities/category-product.entity';
import { UpdateCategoryProductDto } from './dto/update.dto';
import { CreateCategoryProductDto } from './dto/create.dto';

@Controller('category-products')
export class CategoryProductsController {
  constructor(
    private readonly createCategoryProductUseCase: CreateCategoryProductUseCase,
    private readonly getCategoryProductsUseCase: GetCategoryProductsUseCase,
    /* private readonly updateCategoryProductUseCase: UpdateCategoryProductUseCase, */
    private readonly deleteCategoryProductUseCase: DeleteCategoryProductUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateCategoryProductDto): Promise<CategoryProduct> {
    try {
      return this.createCategoryProductUseCase.execute(body);
    }catch(error) {
      console.log(error)
    }
    
  }

  @Get()
  async findAll(): Promise<CategoryProduct[]> {
    return this.getCategoryProductsUseCase.execute();
  }

/*   @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCategoryProductDto,
  ): Promise<CategoryProduct> {
    return this.updateCategoryProductUseCase.execute(id, body);
  } */

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.deleteCategoryProductUseCase.execute(id);
  }
}