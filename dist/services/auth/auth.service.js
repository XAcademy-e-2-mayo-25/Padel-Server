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
    usuariosService;
    jwtService;
    constructor(usuariosService, jwtService) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
    }
    async validateGoogleUser(profile) {
        const existente = await this.usuariosService.findByEmail(profile.email);
        let user;
        if (existente) {
            user = existente;
            console.log('Usuario existente encontrado:', user.idUsuario, user.email);
        }
        else {
            const resultado = await this.usuariosService.crearUsuario({
                email: profile.email,
                nombres: profile.nombres,
                apellidos: profile.apellidos,
                fotoPerfil: profile.fotoPerfil,
            });
            user = resultado.usuario;
            console.log('Usuario nuevo creado:', user.idUsuario, user.email);
        }
        const payload = { sub: user.idUsuario, email: user.email };
        console.log('Payload para JWT:', payload);
        const token = this.jwtService.sign(payload);
        console.log('Token generado:', token.substring(0, 50) + '...');
        return { user, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map