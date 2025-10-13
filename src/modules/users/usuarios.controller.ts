//Contrlador HTTP para Usuarios, se definen las rutas y se delega la logica al service.ts

import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put, ParseIntPipe, Get, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { BajaUsuarioDto } from './dto/baja-usuario.dto';
import { UnbanUsuarioDto } from './dto/unban-usuario.dto';
import { EditarUsuarioDto } from './dto/editar-usuario.dto';
import { EditarPosicionesDto } from './dto/editar-posiciones.dto';
import { EditarRolesDto } from './dto/editar-roles.dto';
import { ListarUsuariosDto } from './dto/listar-usuarios.dto';

//prefijo de ruta /usuarios
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //Crear usuario con POST
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(dto);
  }

  //endpoint para debug test
  @Post('debug-body')
  debug(@Body() body: any) {
    return { recibido: body };
  }

  //Ban/baja de usuario con id como parametro con PATCH
  @Patch(':id/ban')
  @HttpCode(HttpStatus.OK)
  async banear(
    @Param('id') id: string,
    @Body() dto: BajaUsuarioDto,) {
    return this.usuariosService.banUsuario(Number(id), dto);
  }

  //Unban/desbanear usuario con id como parametro
  @Patch(':id/unban')
  @HttpCode(HttpStatus.OK)
  async desbanear(@Param('id') id: string, @Body() dto: UnbanUsuarioDto) {
    return this.usuariosService.unbanUsuario(Number(id), dto);
  }

  //editar datos de usuario, requiere de id como parametro, se controla el parametro
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarUsuarioDto, ) {
    return this.usuariosService.editarUsuario(id, dto);
  }

  //editar posicion de un usuario con id como parametro, reemplazo total
  @Put(':id/posiciones')
  @HttpCode(HttpStatus.OK)
  actualizarPosiciones(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarPosicionesDto, ) {
    return this.usuariosService.actualizarPosiciones(id, dto);
  }

  //Editar roles de un usuario segun su id con PUT hace un reemplazo total
  @Put(':id/roles')
  @HttpCode(HttpStatus.OK)
  actualizarRoles(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarRolesDto) {
    return this.usuariosService.actualizarRoles(id, dto);
  }

  //obtener un usuario con GET y id como parametro
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerUsuario(id);
  }

  //listar usuarios, se mapea con Query si hay parametros en la URL
  @Get()
  @HttpCode(HttpStatus.OK)
  listar(@Query() query: ListarUsuariosDto) {
    return this.usuariosService.listarUsuarios(query);
  }
}
