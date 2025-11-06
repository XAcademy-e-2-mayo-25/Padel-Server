//incorporar aca todos los modelos y el modulo propio de los negocios, por el momento esta solo el de usuarios
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './database/models/usuario.model';
import { Categoria } from './database/models/Categoria.model';
import { Rol } from './database/models/rol.model';
import { Posicion } from './database/models/posicion.model';
import { Estado } from './database/models/Estado.model';
import { UsuarioRol } from './database/models/usuariorol.model';
import { UsuarioPosicion } from './database/models/usuarioposicion.model';
import { UsuariosModule } from './modules/users/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ),
      database: process.env.DB_NAME ,
      username: process.env.DB_USER,
      password: process.env.DB_PASS ,
      models: [Usuario, Categoria, Rol, Posicion, Estado, UsuarioRol, UsuarioPosicion],
      autoLoadModels: false,
      synchronize: false,
      logging: false,
      dialectOptions: {
    allowPublicKeyRetrieval: true,
  },
    }),
    UsuariosModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
