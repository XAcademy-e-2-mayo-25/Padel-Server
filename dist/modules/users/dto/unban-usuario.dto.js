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
exports.UnbanUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UnbanUsuarioDto {
    idRol;
    applyAllRoles = false;
    descripcion;
}
exports.UnbanUsuarioDto = UnbanUsuarioDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: 'ID del rol a desbanear. Si se usa applyAllRoles=true, este campo es ignorado.',
        minimum: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UnbanUsuarioDto.prototype, "idRol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        default: false,
        description: 'Si es true, se desbanean todos los roles del usuario e ignora idRol.',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UnbanUsuarioDto.prototype, "applyAllRoles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Revisión realizada. Se revierte la sanción.',
        description: 'Motivo del desbaneo (opcional, longitud 1 a 300 caracteres).',
        minLength: 1,
        maxLength: 300,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 300),
    __metadata("design:type", String)
], UnbanUsuarioDto.prototype, "descripcion", void 0);
//# sourceMappingURL=unban-usuario.dto.js.map