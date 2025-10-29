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
exports.BajaUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class BajaUsuarioDto {
    idRol;
    applyAllRoles = false;
    descripcion;
}
exports.BajaUsuarioDto = BajaUsuarioDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: 'ID del rol a dar de baja. Si se usa applyAllRoles=true, este campo se ignora.',
        minimum: 1,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BajaUsuarioDto.prototype, "idRol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        default: false,
        description: 'Si es true, aplica la baja para todos los roles del usuario e ignora idRol.',
        type: Boolean,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BajaUsuarioDto.prototype, "applyAllRoles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Incumplimiento de normas en reiteradas ocasiones.',
        description: 'Motivo de la baja. Longitud entre 1 y 300 caracteres.',
        minLength: 1,
        maxLength: 300,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 300),
    __metadata("design:type", String)
], BajaUsuarioDto.prototype, "descripcion", void 0);
//# sourceMappingURL=baja-usuario.dto.js.map