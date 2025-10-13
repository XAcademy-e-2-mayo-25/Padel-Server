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
exports.UsuarioRol = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const usuario_model_1 = require("./usuario.model");
const rol_model_1 = require("./rol.model");
const Estado_model_1 = require("./Estado.model");
let UsuarioRol = class UsuarioRol extends sequelize_typescript_1.Model {
    idUsuario;
    idRol;
    idEstado;
    descripcion;
    usuario;
    rol;
    estado;
};
exports.UsuarioRol = UsuarioRol;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => usuario_model_1.Usuario),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UsuarioRol.prototype, "idUsuario", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => rol_model_1.Rol),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UsuarioRol.prototype, "idRol", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Estado_model_1.Estado),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UsuarioRol.prototype, "idEstado", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(300)),
    __metadata("design:type", Object)
], UsuarioRol.prototype, "descripcion", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => usuario_model_1.Usuario),
    __metadata("design:type", usuario_model_1.Usuario)
], UsuarioRol.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => rol_model_1.Rol),
    __metadata("design:type", rol_model_1.Rol)
], UsuarioRol.prototype, "rol", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Estado_model_1.Estado),
    __metadata("design:type", Estado_model_1.Estado)
], UsuarioRol.prototype, "estado", void 0);
exports.UsuarioRol = UsuarioRol = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'UsuarioRol', timestamps: false })
], UsuarioRol);
//# sourceMappingURL=usuariorol.model.js.map