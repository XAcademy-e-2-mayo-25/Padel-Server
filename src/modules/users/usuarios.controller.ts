//Contrlador HTTP para Usuarios, se definen las rutas y se delega la logica al service.ts

import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put, ParseIntPipe, Get, Query, UseGuards, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { BajaUsuarioDto } from './dto/baja-usuario.dto';
import { UnbanUsuarioDto } from './dto/unban-usuario.dto';
import { EditarUsuarioDto } from './dto/editar-usuario.dto';
import { EditarPosicionesDto } from './dto/editar-posiciones.dto';
import { EditarRolesDto } from './dto/editar-roles.dto';
import { ListarUsuariosDto } from './dto/listar-usuarios.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

//Swagger
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

//prefijo de ruta /usuarios
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //Crear usuario con POST
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiCreatedResponse({ description: 'Usuario creado correctamente.' })
  @ApiBadRequestResponse({ description: 'Datos inválidos.' })
  @ApiConflictResponse({ description: 'Email ya registrado.' })
  @ApiBody({ type: CrearUsuarioDto })
  async crear(@Body() dto: CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(dto);
  }

  //endpoint para debug test
  @Post('debug-body')
  @ApiOperation({ summary: 'Echo de body (debug)', description: 'Devuelve el body recibido. Solo para pruebas.' })
  @ApiOkResponse({ description: 'Body recibido.' })
  @ApiBody({ schema: { example: { cualquier: 'cosa' } } })
  debug(@Body() body: any) {
    return { recibido: body };
  }

  //Ban/baja de usuario con id como parametro con PATCH
  @Patch(':id/ban')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Banear usuario (baja por rol o total)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario baneado/baja aplicada.' })
  @ApiBadRequestResponse({ description: 'Datos inválidos.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiConflictResponse({ description: 'Estado/rol en conflicto.' })
  @ApiBody({ type: BajaUsuarioDto })
  async banear(
    @Param('id') id: string,
    @Body() dto: BajaUsuarioDto,) {
    return this.usuariosService.banUsuario(Number(id), dto);
  }

  //Unban/desbanear usuario con id como parametro
  @Patch(':id/unban')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desbanear usuario (por rol o total)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario desbaneado.' })
  @ApiBadRequestResponse({ description: 'Datos inválidos.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiBody({ type: UnbanUsuarioDto })
  async desbanear(@Param('id') id: string, @Body() dto: UnbanUsuarioDto) {
    return this.usuariosService.unbanUsuario(Number(id), dto);
  }

  //editar datos de usuario, requiere de id como parametro, se controla el parametro
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Editar datos del usuario' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario actualizado correctamente.' })
  @ApiBadRequestResponse({ description: 'Datos inválidos.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiBody({ type: EditarUsuarioDto })
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarUsuarioDto, ) {
    return this.usuariosService.editarUsuario(id, dto);
  }

  //editar posicion de un usuario con id como parametro, reemplazo total
  @Put(':id/posiciones')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar posiciones del jugador (reemplazo total)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Posiciones actualizadas correctamente.' })
  @ApiBadRequestResponse({ description: 'Datos inválidos.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiBody({ type: EditarPosicionesDto })
  actualizarPosiciones(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarPosicionesDto, ) {
    return this.usuariosService.actualizarPosiciones(id, dto);
  }

  //Editar roles de un usuario segun su id con PUT hace un reemplazo total
  @Put(':id/roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar roles (y estados por rol) del usuario' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Roles/estados actualizados correctamente.' })
  @ApiBadRequestResponse({ description: 'Datos inválidos.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  @ApiBody({ type: EditarRolesDto })
  actualizarRoles(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarRolesDto) {
    return this.usuariosService.actualizarRoles(id, dto);
  }

  //obtener un usuario con GET y id como parametro
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener detalle de usuario' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario encontrado.' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerUsuario(id);
  }

  //listar usuarios, se mapea con Query si hay parametros en la URL
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar usuarios con filtros, orden y paginación' })
  @ApiOkResponse({ description: 'Listado de usuarios devuelto correctamente.' })
  @ApiBadRequestResponse({ description: 'Parámetros de búsqueda inválidos.' })
  // (Opcional) explicitar queries para mejor UI en Swagger:
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['idUsuario', 'nombres', 'apellidos', 'email', 'idCategoria'], example: 'apellidos' })
  @ApiQuery({ name: 'sortDir', required: false, enum: ['ASC', 'DESC', 'asc', 'desc'], example: 'ASC' })
  @ApiQuery({ name: 'nombre', required: false, type: String, example: 'gomez' })
  @ApiQuery({ name: 'email', required: false, type: String, example: 'test@mail.com' })
  @ApiQuery({ name: 'idCategoria', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'idRol', required: false, type: Number, example: 2 })
  @ApiQuery({ name: 'idEstado', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'idPosicion', required: false, type: Number, example: 2 })
  listar(@Query() query: ListarUsuariosDto) {
    return this.usuariosService.listarUsuarios(query);
  }

  // prueba
  @UseGuards(JwtAuthGuard)
  @Get('test')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Endpoint protegido de prueba' })
  @ApiOkResponse({ description: 'Autenticado correctamente.' })
  felicidades(@Req() req: any) {
    // req.user viene del payload del JWT
    return {
      mensaje: `Felicidades ${req.user.email}, estás registrado y autenticado!`,
      usuario: req.user,
    };
  }

}

