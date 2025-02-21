// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartbuyInfrastructureRepository } from './cartbuy/infrastructure/cartbuy.repository'
import { Cartbuy, CartbuySchema  } from './cartbuy/infrastructure/schemas/cartbuy.schema'; 
import { Itembuy, ItembuySchema  } from './cartbuy/infrastructure/schemas/itembuy.schema'; 
import { CartbuysController } from './cartbuy/infrastructure/cartbuy.controller';
import { DeleteCartbuyUseCase} from './cartbuy/application/delete.application'
import { ConfigModule } from '@nestjs/config';
import { CreateCartbuyUseCase } from './cartbuy/application/create.application';
import { GetListCartbuyUseCase } from './cartbuy/application/getList.application';
import { GetCartbuyUseCase } from './cartbuy/application/get.application';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Esto hará que las variables estén disponibles globalmente
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    //MongooseModule.forRoot('mongodb://root:example@localhost:27017/shop?authSource=admin'), // Configura la conexión a MongoDB
    MongooseModule.forFeature(
      [
        { name: Cartbuy.name, schema: CartbuySchema },
        { name: Itembuy.name, schema: ItembuySchema}
      ]
    ), // Define el esquema de Product
  ],
  controllers: [
    CartbuysController
  ],
  providers: [
    CreateCartbuyUseCase,
    DeleteCartbuyUseCase,
    GetListCartbuyUseCase,
    GetCartbuyUseCase,
    {
      provide: 'ICartbuyRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: CartbuyInfrastructureRepository, // Implementación que usa Mongoose
    }
  ],
})
export class PaymentModule {}