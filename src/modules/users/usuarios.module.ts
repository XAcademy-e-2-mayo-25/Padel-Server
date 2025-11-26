//imports necesarios para unir todo el modulo usuarios

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRol } from '../../database/models/usuariorol.model';
import { UsuarioPosicion } from '../../database/models/usuarioposicion.model';
import { Posicion } from '../../database/models/posicion.model';

//composicion del modulo con los model que actuan en la creacion de un usuario, el controlador y los servicios
@Module({
  imports: [SequelizeModule.forFeature([Usuario, UsuarioRol, UsuarioPosicion, Posicion])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
