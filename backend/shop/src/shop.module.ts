// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryProductInfrastructureRepository} from './category-product/infrastructure/category-product.repository'
import { ProductInfrastructureRepository} from './product/infrastructure/product.repository'
import { ColorInfrastructureRepository } from './color/infrastructure/color.repository';
import { MaterialInfrastructureRepository } from './material/infrastructure/material.repository';
import { Product, ProductSchema } from './product/infrastructure/schemas/product.schema'; // Importa el esquema de usuario
import { Material, MaterialSchema } from './material/infrastructure/schemas/color.schema';
import { CategoryProduct, CategoryProductSchema } from './category-product/infrastructure/schemas/category-product.schema';
import { Color, ColorSchema } from './color/infrastructure/schemas/color.schema'; 
import { CreateCategoryProductUseCase } from './category-product/application/create.application';
import { GetCategoryProductsUseCase } from './category-product/application/get-all.application';
import { DeleteCategoryProductUseCase } from './category-product/application/delete.application';
import { CreateProductUseCase } from './product/application/create.application'
import { GetProductsUseCase } from './product/application/get-all.application'
import { DeleteProductUseCase} from './product/application/delete.application'
import { CreateColorUseCase } from './color/application/create.application';
import { GetColorUseCase } from './color/application/get-all.application';
import { DeleteColorUseCase } from './color/application/delete.application';
import { ProductsController } from './product/infrastructure/product.controller';
import { CategoryProductsController } from './category-product/infrastructure/category-product.controller';
import { ColorsController } from './color/infrastructure/color.controller';
import { ConfigModule } from '@nestjs/config';
import { MaterialsController } from './material/infrastructure/material.controller';
import { GetMaterialUseCase } from './material/application/get-all.application';
import { CreateMaterialUseCase } from './material/application/create.application';
import { DeleteMaterialUseCase } from './material/application/delete.application';
import { GetProductsByParamsUseCase } from './product/application/get-by-params.application';
import { S3Service } from './product/infrastructure/services/s3.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Esto hará que las variables estén disponibles globalmente
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    //MongooseModule.forRoot('mongodb://root:example@localhost:27017/shop?authSource=admin'), // Configura la conexión a MongoDB
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema },
        { name: CategoryProduct.name, schema: CategoryProductSchema},
        { name: Color.name, schema: ColorSchema},
        { name: Material.name, schema: MaterialSchema}
      ]
    ), // Define el esquema de Product
  ],
  controllers: [
    CategoryProductsController,
    ProductsController,
    ColorsController,
    MaterialsController
  ],
  providers: [
    CreateCategoryProductUseCase,
    GetCategoryProductsUseCase,
    DeleteCategoryProductUseCase,
    CreateProductUseCase,
    GetProductsUseCase,
    DeleteProductUseCase,
    CreateColorUseCase,
    GetColorUseCase,
    DeleteColorUseCase,
    GetMaterialUseCase,
    CreateMaterialUseCase,
    DeleteMaterialUseCase,
    GetProductsByParamsUseCase,
    S3Service,
    {
      provide: 'ICategoryProductRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: CategoryProductInfrastructureRepository, // Implementación que usa Mongoose
    },
    {
      provide: 'IProductRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: ProductInfrastructureRepository, // Implementación que usa Mongoose
    },
    {
      provide: 'IColorRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: ColorInfrastructureRepository, // Implementación que usa Mongoose
    },
    {
      provide: 'IMaterialRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: MaterialInfrastructureRepository, // Implementación que usa Mongoose
    },
  ],
})
export class ShopModule {}