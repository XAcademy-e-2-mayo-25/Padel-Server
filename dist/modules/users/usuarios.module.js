"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const usuarios_controller_1 = require("./usuarios.controller");
const usuarios_service_1 = require("./usuarios.service");
const usuario_model_1 = require("../../database/models/usuario.model");
const usuariorol_model_1 = require("../../database/models/usuariorol.model");
const usuarioposicion_model_1 = require("../../database/models/usuarioposicion.model");
const posicion_model_1 = require("../../database/models/posicion.model");
const rol_model_1 = require("../../database/models/rol.model");
const Estado_model_1 = require("../../database/models/Estado.model");
const Categoria_model_1 = require("../../database/models/Categoria.model");
const clubs_module_1 = require("../clubs/clubs.module");
let UsuariosModule = class UsuariosModule {
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([usuario_model_1.Usuario, usuariorol_model_1.UsuarioRol, usuarioposicion_model_1.UsuarioPosicion, posicion_model_1.Posicion, rol_model_1.Rol, Estado_model_1.Estado, Categoria_model_1.Categoria]), clubs_module_1.ClubsModule],
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [usuarios_service_1.UsuariosService],
        exports: [usuarios_service_1.UsuariosService],
    })
], UsuariosModule);
//# sourceMappingURL=usuarios.module.js.map