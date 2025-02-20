// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryProductInfrastructureRepository} from './category-product/infrastructure/category-product.repository'
import { ProductInfrastructureRepository} from './product/infrastructure/product.repository'
import { Product, ProductSchema } from './product/infrastructure/schemas/product.schema'; // Importa el esquema de usuario
import { CategoryProduct, CategoryProductSchema } from './category-product/infrastructure/schemas/category-product.schema'; 
import { CategoryProductsController } from './category-product/infrastructure/category-product.controller';
import { CreateCategoryProductUseCase } from './category-product/application/create.application';
import { GetCategoryProductsUseCase } from './category-product/application/get-all.application';
import { DeleteCategoryProductUseCase } from './category-product/application/delete.application';
import { CreateProductUseCase } from './product/application/create.application'
import { GetProductsUseCase } from './product/application/get-all.application'
import { DeleteProductUseCase} from './product/application/delete.application'
import { ProductsController } from './product/infrastructure/product.controller';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    //MongooseModule.forRoot('mongodb://root:example@localhost:27017/shop?authSource=admin'), // Configura la conexión a MongoDB
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema },
        { name: CategoryProduct.name, schema: CategoryProductSchema}
      ]
    ), // Define el esquema de Product
  ],
  controllers: [
    CategoryProductsController,
    ProductsController
  ],
  providers: [
    CreateCategoryProductUseCase,
    GetCategoryProductsUseCase,
    DeleteCategoryProductUseCase,
    CreateProductUseCase,
    GetProductsUseCase,
    DeleteProductUseCase,
    {
      provide: 'ICategoryProductRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: CategoryProductInfrastructureRepository, // Implementación que usa Mongoose
    },
    {
      provide: 'IProductRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: ProductInfrastructureRepository, // Implementación que usa Mongoose
    },
  ],
})
export class AppModule {}