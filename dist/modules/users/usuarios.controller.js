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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_usuario_dto_1.CrearUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "crear", null);
__decorate([
    (0, common_1.Post)('debug-body'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "debug", null);
__decorate([
    (0, common_1.Patch)(':id/ban'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, baja_usuario_dto_1.BajaUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "banear", null);
__decorate([
    (0, common_1.Patch)(':id/unban'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, unban_usuario_dto_1.UnbanUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "desbanear", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editar_usuario_dto_1.EditarUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "editar", null);
__decorate([
    (0, common_1.Put)(':id/posiciones'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editar_posiciones_dto_1.EditarPosicionesDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "actualizarPosiciones", null);
__decorate([
    (0, common_1.Put)(':id/roles'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editar_roles_dto_1.EditarRolesDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "actualizarRoles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "obtenerUno", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [listar_usuarios_dto_1.ListarUsuariosDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "listar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "felicidades", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map