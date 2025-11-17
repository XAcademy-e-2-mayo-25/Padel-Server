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
exports.CrearUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CrearUsuarioDto {
    nombres;
    apellidos;
    dni;
    email;
    fotoPerfil;
    provincia;
    localidad;
    idCategoria;
}
exports.CrearUsuarioDto = CrearUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Carlos Alberto',
        description: 'Nombres del usuario. Longitud entre 1 y 100 caracteres.',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "nombres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Gómez',
        description: 'Apellidos del usuario. Longitud entre 1 y 100 caracteres.',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "apellidos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '40100200',
        description: 'DNI del usuario. Campo opcional (1 a 20 caracteres).',
        minLength: 1,
        maxLength: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'carlos.gomez@mail.com',
        description: 'Email válido del usuario.',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://mi-servidor.com/perfiles/carlos.jpg',
        description: 'URL a la foto de perfil del usuario (opcional).',
        minLength: 1,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "fotoPerfil", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Córdoba',
        description: 'Provincia del usuario (opcional).',
        minLength: 1,
        maxLength: 80,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 80),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "provincia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Río Cuarto',
        description: 'Localidad del usuario (opcional).',
        minLength: 1,
        maxLength: 120,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 120),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "localidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "1ra",
        description: 'Categoría del usuario (texto o código). Ahora se acepta como string.',
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "idCategoria", void 0);
//# sourceMappingURL=crear-usuario.dto.js.map