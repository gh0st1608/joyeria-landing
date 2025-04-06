import { Controller, Get, Post, Body, Param, Put, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductUseCase } from '../application/create.application';
import { GetProductsUseCase } from '../application/get-all.application';
/* import { UpdateProductUseCase } from '../application/update.application'; */
import { DeleteProductUseCase } from '../application/delete.application';
import { Product } from '../domain/entities/product.entity';
import { CreateProductDto } from './dto/create.dto';
import { GetProductsByParamsUseCase } from '../application/get-by-params.application';
import { S3Service } from './services/s3.service';
import { FileUploadInterceptor } from './services/interceptor.service';
import { GetProductsByIdUseCase } from '../application/get-by-id.application';

interface S3File extends Express.Multer.File {
  location: string;  // Esta propiedad es proporcionada por multer-s3 cuando el archivo se carga en S3
}


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
  @UseInterceptors(FileUploadInterceptor) // Usamos nuestro interceptor personalizado
  async create(
    @Body() body: CreateProductDto,
    @UploadedFile() file: S3File
  ): Promise<any> {
    // Verifica si el archivo tiene la propiedad 'location'
    if (!file?.location) {
      throw new Error('No se pudo obtener la URL de la imagen cargada en S3');
    }

    // Accede a la URL del archivo subido en S3
    const imageUrl = file.location;

    // Combina los datos del producto con la URL de la imagen
    const productData = { ...body, image: imageUrl };

    // Aquí puedes procesar el producto, guardarlo en la base de datos, etc.
    return this.createProductUseCase.execute(productData);; // Retorna el producto con la URL de la imagen
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