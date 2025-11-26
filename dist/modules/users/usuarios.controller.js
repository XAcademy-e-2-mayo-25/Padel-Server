"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const crear_usuario_dto_1 = require("./dto/crear-usuario.dto");
const baja_usuario_dto_1 = require("./dto/baja-usuario.dto");
const unban_usuario_dto_1 = require("./dto/unban-usuario.dto");
const editar_usuario_dto_1 = require("./dto/editar-usuario.dto");
const editar_posiciones_dto_1 = require("./dto/editar-posiciones.dto");
const editar_roles_dto_1 = require("./dto/editar-roles.dto");
const listar_usuarios_dto_1 = require("./dto/listar-usuarios.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let UsuariosController = class UsuariosController {
    usuariosService;
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async crear(dto) {
        return this.usuariosService.crearUsuario(dto);
    }
    debug(body) {
        return { recibido: body };
    }
    async banear(id, dto) {
        return this.usuariosService.banUsuario(Number(id), dto);
    }
    async desbanear(id, dto) {
        return this.usuariosService.unbanUsuario(Number(id), dto);
    }
    async editar(id, dto) {
        return this.usuariosService.editarUsuario(id, dto);
    }
    actualizarPosiciones(id, dto) {
        return this.usuariosService.actualizarPosiciones(id, dto);
    }
    actualizarRoles(id, dto) {
        return this.usuariosService.actualizarRoles(id, dto);
    }
    obtenerUno(id) {
        return this.usuariosService.obtenerUsuario(id);
    }
    listar(query) {
        return this.usuariosService.listarUsuarios(query);
    }
    felicidades(req) {
        return {
            mensaje: `Felicidades ${req.user.email}, estás registrado y autenticado!`,
            usuario: req.user,
        };
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear usuario' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Usuario creado correctamente.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos.' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Email ya registrado.' }),
    (0, swagger_1.ApiBody)({ type: crear_usuario_dto_1.CrearUsuarioDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_usuario_dto_1.CrearUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "crear", null);
__decorate([
    (0, common_1.Post)('debug-body'),
    (0, swagger_1.ApiOperation)({ summary: 'Echo de body (debug)', description: 'Devuelve el body recibido. Solo para pruebas.' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Body recibido.' }),
    (0, swagger_1.ApiBody)({ schema: { example: { cualquier: 'cosa' } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "debug", null);
__decorate([
    (0, common_1.Patch)(':id/ban'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Banear usuario (baja por rol o total)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del usuario' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Usuario baneado/baja aplicada.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuario no encontrado.' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Estado/rol en conflicto.' }),
    (0, swagger_1.ApiBody)({ type: baja_usuario_dto_1.BajaUsuarioDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, baja_usuario_dto_1.BajaUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "banear", null);
__decorate([
    (0, common_1.Patch)(':id/unban'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Desbanear usuario (por rol o total)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del usuario' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Usuario desbaneado.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuario no encontrado.' }),
    (0, swagger_1.ApiBody)({ type: unban_usuario_dto_1.UnbanUsuarioDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, unban_usuario_dto_1.UnbanUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "desbanear", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Editar datos del usuario' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del usuario' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Usuario actualizado correctamente.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuario no encontrado.' }),
    (0, swagger_1.ApiBody)({ type: editar_usuario_dto_1.EditarUsuarioDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editar_usuario_dto_1.EditarUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "editar", null);
__decorate([
    (0, common_1.Put)(':id/posiciones'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar posiciones del jugador (reemplazo total)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del usuario' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Posiciones actualizadas correctamente.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuario no encontrado.' }),
    (0, swagger_1.ApiBody)({ type: editar_posiciones_dto_1.EditarPosicionesDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editar_posiciones_dto_1.EditarPosicionesDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "actualizarPosiciones", null);
__decorate([
    (0, common_1.Put)(':id/roles'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar roles (y estados por rol) del usuario' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del usuario' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Roles/estados actualizados correctamente.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Datos inválidos.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuario no encontrado.' }),
    (0, swagger_1.ApiBody)({ type: editar_roles_dto_1.EditarRolesDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editar_roles_dto_1.EditarRolesDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "actualizarRoles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle de usuario' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del usuario' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Usuario encontrado.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuario no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "obtenerUno", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Listar usuarios con filtros, orden y paginación' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listado de usuarios devuelto correctamente.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parámetros de búsqueda inválidos.' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, enum: ['idUsuario', 'nombres', 'apellidos', 'email', 'idCategoria'], example: 'apellidos' }),
    (0, swagger_1.ApiQuery)({ name: 'sortDir', required: false, enum: ['ASC', 'DESC', 'asc', 'desc'], example: 'ASC' }),
    (0, swagger_1.ApiQuery)({ name: 'nombre', required: false, type: String, example: 'gomez' }),
    (0, swagger_1.ApiQuery)({ name: 'email', required: false, type: String, example: 'test@mail.com' }),
    (0, swagger_1.ApiQuery)({ name: 'idCategoria', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'idRol', required: false, type: Number, example: 2 }),
    (0, swagger_1.ApiQuery)({ name: 'idEstado', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'idPosicion', required: false, type: Number, example: 2 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [listar_usuarios_dto_1.ListarUsuariosDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "listar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint protegido de prueba' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Autenticado correctamente.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "felicidades", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map