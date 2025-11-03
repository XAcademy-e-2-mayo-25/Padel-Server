"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const usuario_model_1 = require("./database/models/usuario.model");
const Categoria_model_1 = require("./database/models/Categoria.model");
const rol_model_1 = require("./database/models/rol.model");
const posicion_model_1 = require("./database/models/posicion.model");
const Estado_model_1 = require("./database/models/Estado.model");
const usuariorol_model_1 = require("./database/models/usuariorol.model");
const usuarioposicion_model_1 = require("./database/models/usuarioposicion.model");
const usuarios_module_1 = require("./modules/users/usuarios.module");
const auth_module_1 = require("./modules/auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                models: [usuario_model_1.Usuario, Categoria_model_1.Categoria, rol_model_1.Rol, posicion_model_1.Posicion, Estado_model_1.Estado, usuariorol_model_1.UsuarioRol, usuarioposicion_model_1.UsuarioPosicion],
                autoLoadModels: false,
                synchronize: false,
                logging: false,
            }),
            usuarios_module_1.UsuariosModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map