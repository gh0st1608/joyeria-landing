// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartbuyInfrastructureRepository } from './cartbuy/infrastructure/cartbuy.repository'
import { Cartbuy, CartbuySchema  } from './cartbuy/infrastructure/schemas/cartbuy.schema'; 
import { Itembuy, ItembuySchema  } from './itembuy/infrastructure/schemas/itembuy.schema'; 
import { Order, OrderSchema  } from './order/infrastructure/schemas/order.schema'; 
import { CartbuyController } from './cartbuy/infrastructure/cartbuy.controller';
import { DeleteCartbuyUseCase} from './cartbuy/application/delete.application'
import { ConfigModule } from '@nestjs/config';
import { CreateCartbuyUseCase } from './cartbuy/application/create.application';
import { GetListCartbuyUseCase } from './cartbuy/application/getList.application';
import { GetCartbuyUseCase } from './cartbuy/application/get.application';
import { CreateItembuyUseCase } from './itembuy/application/create.application';
import { DeleteItembuyUseCase } from './itembuy/application/delete.application';
import { GetListItembuyUseCase } from './itembuy/application/getList.application';
import { GetItembuyUseCase } from './itembuy/application/get.application';
import { ItembuyInfrastructureRepository } from './itembuy/infrastructure/itembuy.repository';
import { ItembuyController } from './itembuy/infrastructure/itembuy.controller';
import { OrderController } from './order/infrastructure/order.controller';
import { CreateOrderUseCase } from './order/application/create.application';
import { OrderInfrastructureRepository } from './order/infrastructure/order.repository';


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
        { name: Itembuy.name, schema: ItembuySchema},
        { name: Order.name, schema: OrderSchema}
      ]
    ), // Define el esquema de Product
  ],
  controllers: [
    CartbuyController,
    ItembuyController,
    OrderController
  ],
  providers: [
    CreateCartbuyUseCase,
    DeleteCartbuyUseCase,
    GetListCartbuyUseCase,
    GetCartbuyUseCase,
    CreateItembuyUseCase,
    DeleteItembuyUseCase,
    GetListItembuyUseCase,
    GetItembuyUseCase,
    CreateOrderUseCase,
    {
      provide: 'ICartbuyRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: CartbuyInfrastructureRepository, // Implementación que usa Mongoose
    },
    {
      provide: 'IItembuyRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: ItembuyInfrastructureRepository, // Implementación que usa Mongoose
    },
    {
      provide: 'IOrderRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: OrderInfrastructureRepository, // Implementación que usa Mongoose
    }
  ],
})
export class PaymentModule {}