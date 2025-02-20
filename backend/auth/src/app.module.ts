// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './infrastructure/schemas/auth.schema'; // Importa el esquema de usuario
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { LoginUseCase } from './application/login.application'
import { GetNewAccessTokenUseCase } from './application/getRefreshToken.application'
import { AuthController } from './infrastructure/auth.controller';
import { AuthInfrastructureRepository } from './infrastructure/auth.repository';
import { UserInfrastructureRepository } from './infrastructure/user.repository';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Esto hará que las variables estén disponibles globalmente
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    //MongooseModule.forRoot('mongodb://root:example@localhost:27017/shop?authSource=admin'), // Configura la conexión a MongoDB
    MongooseModule.forFeature(
      [
        { name: Auth.name, schema: AuthSchema },
        { name: User.name, schema: UserSchema}
      ]
    ), // Define el esquema de Product
  ],
  controllers: [
    AuthController
  ],
  providers: [
    LoginUseCase,
    GetNewAccessTokenUseCase,
    {
      provide: 'IAuthRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: AuthInfrastructureRepository, // Implementación que usa Mongoose
    },
    {
      provide: 'IUserRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: UserInfrastructureRepository, // Implementación que usa Mongoose
    },
  ],
})
export class AppModule {}