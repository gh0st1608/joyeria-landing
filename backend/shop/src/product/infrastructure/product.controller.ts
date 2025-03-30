import { Controller, Get, Post, Body, Param, Put, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductUseCase } from '../application/create.application';
import { GetProductsUseCase } from '../application/get-all.application';
/* import { UpdateProductUseCase } from '../application/update.application'; */
import { DeleteProductUseCase } from '../application/delete.application';
import { Product } from '../domain/entities/product.entity';
import { CreateProductDto } from './dto/create.dto';
import { GetProductsByParamsUseCase } from '../application/get-by-params.application';
import { S3Service } from './services/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetProductsByIdUseCase } from '../application/get-by-Id.application';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    /* private readonly updateProductUseCase: UpdateProductUseCase, */
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getProductsByParamsUseCase: GetProductsByParamsUseCase,
    private readonly getProductByIdUseCase: GetProductsByIdUseCase,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) 
  async create(
    @Body() body: CreateProductDto,
    @UploadedFile() file: Express.Multer.File, ): Promise<Product> {
    let imageUrl = '';
    if (file) {
      const uploadResult = await this.s3Service.uploadFile(file);
      imageUrl = uploadResult; // URL del archivo en S3
    }
    const productData = { ...body, image: imageUrl };
    console.log('productData',productData)
    return this.createProductUseCase.execute(productData);
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
    return this.getProductsByParamsUseCase.execute(queryParams);
  }

  @Get(':idProduct')
  async update(
    @Param('idProduct') idProduct: string,
  ): Promise<Product> {
    return this.getProductByIdUseCase.execute(idProduct);
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