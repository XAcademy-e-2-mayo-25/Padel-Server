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
const usuarios_module_1 = require("./modules/users/usuarios.module");
const auth_module_1 = require("./modules/auth/auth.module");
const clubs_module_1 = require("./modules/clubs/clubs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: process.env.DB_HOST || 'db',
                port: Number(process.env.DB_PORT || 3306),
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                autoLoadModels: true,
                synchronize: false,
                logging: false,
                dialectOptions: {
                    allowPublicKeyRetrieval: true,
                },
            }),
            usuarios_module_1.UsuariosModule,
            clubs_module_1.ClubsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map