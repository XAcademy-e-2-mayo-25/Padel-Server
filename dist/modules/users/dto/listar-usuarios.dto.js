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
exports.ListarUsuariosDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ListarUsuariosDto {
    page = 1;
    limit = 10;
    sortBy = 'idUsuario';
    sortDir = 'ASC';
    nombre;
    email;
    idCategoria;
    idRol;
    idEstado;
    idPosicion;
}
exports.ListarUsuariosDto = ListarUsuariosDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Número de página para paginación. Valor mínimo 1.',
        minimum: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListarUsuariosDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: 'Cantidad de registros por página. Valor mínimo 1.',
        minimum: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListarUsuariosDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'apellidos',
        description: 'Campo para ordenar los resultados. Valores permitidos: idUsuario, nombres, apellidos, email, idCategoria.',
        enum: ['idUsuario', 'nombres', 'apellidos', 'email', 'idCategoria'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['idUsuario', 'nombres', 'apellidos', 'email', 'idCategoria']),
    __metadata("design:type", String)
], ListarUsuariosDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'ASC',
        description: 'Dirección del ordenamiento. Valores permitidos: ASC, DESC (mayúsculas o minúsculas).',
        enum: ['ASC', 'DESC', 'asc', 'desc'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ASC', 'DESC', 'asc', 'desc']),
    __metadata("design:type", String)
], ListarUsuariosDto.prototype, "sortDir", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'gomez',
        description: 'Filtro por nombre o apellido (búsqueda parcial).',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ListarUsuariosDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'test@mail.com',
        description: 'Filtro de búsqueda parcial por email.',
        minLength: 1,
        maxLength: 150,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 150),
    __metadata("design:type", String)
], ListarUsuariosDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Filtro por categoría. Valor entero >= 1.',
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListarUsuariosDto.prototype, "idCategoria", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 2,
        description: 'Filtro por rol del usuario. Valor entero >= 1.',
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListarUsuariosDto.prototype, "idRol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: 'Filtro por estado del usuario. Valor entero >= 1.',
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListarUsuariosDto.prototype, "idEstado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 2,
        description: 'Filtro por posición del jugador. Valor entero >= 1.',
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListarUsuariosDto.prototype, "idPosicion", void 0);
//# sourceMappingURL=listar-usuarios.dto.js.map