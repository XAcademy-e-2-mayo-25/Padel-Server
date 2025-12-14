//incorporar aca todos los modelos y el modulo propio de los negocios, por el momento esta solo el de usuarios
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosModule } from './modules/users/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClubsModule } from './modules/clubs/clubs.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME ,
      username: process.env.DB_USER,
      password: process.env.DB_PASS ,
      autoLoadModels: true,
      synchronize: false,
      logging: false,
      dialectOptions: {
    allowPublicKeyRetrieval: true,
  },
    }),
    UsuariosModule,
    ClubsModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
