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
exports.Usuario = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Categoria_model_1 = require("./Categoria.model");
const usuariorol_model_1 = require("./usuariorol.model");
const usuarioposicion_model_1 = require("./usuarioposicion.model");
let Usuario = class Usuario extends sequelize_typescript_1.Model {
    idUsuario;
    nombres;
    apellidos;
    dni;
    email;
    fotoPerfil;
    provincia;
    localidad;
    telefono;
    direccion;
    idCategoria;
    categoria;
    roles;
    posiciones;
};
exports.Usuario = Usuario;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Usuario.prototype, "idUsuario", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Usuario.prototype, "nombres", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], Usuario.prototype, "apellidos", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", Object)
], Usuario.prototype, "dni", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(160)),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", Object)
], Usuario.prototype, "fotoPerfil", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(80)),
    __metadata("design:type", Object)
], Usuario.prototype, "provincia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(120)),
    __metadata("design:type", Object)
], Usuario.prototype, "localidad", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", Object)
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", Object)
], Usuario.prototype, "direccion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Categoria_model_1.Categoria),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", Object)
], Usuario.prototype, "idCategoria", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Categoria_model_1.Categoria),
    __metadata("design:type", Categoria_model_1.Categoria)
], Usuario.prototype, "categoria", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => usuariorol_model_1.UsuarioRol),
    __metadata("design:type", Array)
], Usuario.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => usuarioposicion_model_1.UsuarioPosicion),
    __metadata("design:type", Array)
], Usuario.prototype, "posiciones", void 0);
exports.Usuario = Usuario = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Usuario', timestamps: false })
], Usuario);
//# sourceMappingURL=usuario.model.js.map