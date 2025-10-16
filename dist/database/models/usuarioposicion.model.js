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
exports.UsuarioPosicion = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const usuario_model_1 = require("./usuario.model");
const posicion_model_1 = require("./posicion.model");
let UsuarioPosicion = class UsuarioPosicion extends sequelize_typescript_1.Model {
    idUsuario;
    idPosicion;
    usuario;
    posicion;
};
exports.UsuarioPosicion = UsuarioPosicion;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => usuario_model_1.Usuario),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UsuarioPosicion.prototype, "idUsuario", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => posicion_model_1.Posicion),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UsuarioPosicion.prototype, "idPosicion", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => usuario_model_1.Usuario),
    __metadata("design:type", usuario_model_1.Usuario)
], UsuarioPosicion.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => posicion_model_1.Posicion),
    __metadata("design:type", posicion_model_1.Posicion)
], UsuarioPosicion.prototype, "posicion", void 0);
exports.UsuarioPosicion = UsuarioPosicion = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'UsuarioPosicion', timestamps: false })
], UsuarioPosicion);
//# sourceMappingURL=usuarioposicion.model.js.map