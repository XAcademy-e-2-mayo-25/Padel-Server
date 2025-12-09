//imports necesarios para unir todo el modulo usuarios
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

//Dto´s
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRol } from '../../database/models/usuariorol.model';
import { UsuarioPosicion } from '../../database/models/usuarioposicion.model';
import { Posicion } from '../../database/models/posicion.model';
import { Rol } from '../../database/models/rol.model';
import { Estado } from '../../database/models/Estado.model';
import { Categoria } from 'src/database/models/Categoria.model';

//composicion del modulo con los model que actuan en la creacion de un usuario, el controlador y los servicios
@Module({
  imports: [SequelizeModule.forFeature([Usuario, UsuarioRol, UsuarioPosicion, Posicion, Rol, Estado, Categoria])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
