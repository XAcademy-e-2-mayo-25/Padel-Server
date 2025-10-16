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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../../modules/users/usuarios.service");
let AuthService = class AuthService {
    UsuariosService;
    jwtService;
    constructor(UsuariosService, jwtService) {
        this.UsuariosService = UsuariosService;
        this.jwtService = jwtService;
    }
    async validarUsuarioPorEmail(email) {
        const usr = await this.UsuariosService.obtenerUsuarioPorEmail(email);
        if (!usr) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        return {
            id: usr.id,
            email: usr.email,
            nombre: usr.nombres,
        };
    }
    login(usrId) {
        const payload = {
            sub: usrId
        };
        return this.jwtService.sign(payload);
    }
    async validateUsuarioGoogle(usuario) {
        const usr = await this.UsuariosService.obtenerUsuarioPorEmail(usuario.email);
        if (usr)
            return usr;
        return await this.UsuariosService.crearUsuario(usuario);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map