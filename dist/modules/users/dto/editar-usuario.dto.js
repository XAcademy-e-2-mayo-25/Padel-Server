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
exports.EditarUsuarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const crear_usuario_dto_1 = require("./crear-usuario.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EditarUsuarioDto extends (0, swagger_1.PartialType)(crear_usuario_dto_1.CrearUsuarioDto) {
    telefono;
    direccion;
}
exports.EditarUsuarioDto = EditarUsuarioDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: '3515123456',
        description: 'Teléfono del usuario (opcional)',
        minLength: 5,
        maxLength: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    __metadata("design:type", String)
], EditarUsuarioDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({
        example: 'Av. San Martín 1234',
        description: 'Dirección del usuario (opcional)',
        minLength: 1,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], EditarUsuarioDto.prototype, "direccion", void 0);
//# sourceMappingURL=editar-usuario.dto.js.map