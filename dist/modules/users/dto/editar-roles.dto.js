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
exports.EditarRolesDto = exports.EstadoDescripcionPorRol = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_transformer_2 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class EstadoDescripcionPorRol {
    idRol;
    idEstado;
    descripcion;
}
exports.EstadoDescripcionPorRol = EstadoDescripcionPorRol;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'ID del rol (semilla). Debe ser entero ≥ 1.',
        minimum: 1,
        type: Number,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], EstadoDescripcionPorRol.prototype, "idRol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID de estado (semilla). Rango permitido: 1 a 3.',
        minimum: 1,
        maximum: 3,
        type: Number,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], EstadoDescripcionPorRol.prototype, "idEstado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Asignado temporalmente por el administrador.',
        description: 'Motivo/nota opcional asociado al cambio de estado.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EstadoDescripcionPorRol.prototype, "descripcion", void 0);
let EditarRolesDto = class EditarRolesDto {
    roles;
    estados;
    defaultEstado;
};
exports.EditarRolesDto = EditarRolesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2],
        description: 'Lista de roles a asignar. Debe ser un array no vacío de enteros entre 1 y 3. Acepta [1,2], ["1","2"], 1, "1" (se transforman a números).',
        isArray: true,
        minItems: 1,
        type: Number,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(1, { each: true }),
    (0, class_validator_1.Max)(3, { each: true }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value))
            return value.map((v) => Number(v));
        if (value === undefined || value === null)
            return [];
        return [Number(value)];
    }),
    __metadata("design:type", Array)
], EditarRolesDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Estados específicos por rol (opcional). Si se envía, cada item debe incluir idRol (≥1), idEstado (1..3) y una descripción opcional.',
        isArray: true,
        type: () => EstadoDescripcionPorRol,
        example: [
            { idRol: 1, idEstado: 2, descripcion: 'Verificado por admin' },
            { idRol: 2, idEstado: 1 },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_2.Type)(() => EstadoDescripcionPorRol),
    __metadata("design:type", Array)
], EditarRolesDto.prototype, "estados", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Estado por defecto para roles nuevos si no se indicó en "estados". Rango permitido: 1 a 3. Si no viene, se usará PENDIENTE (1).',
        minimum: 1,
        maximum: 3,
        type: Number,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], EditarRolesDto.prototype, "defaultEstado", void 0);
exports.EditarRolesDto = EditarRolesDto = __decorate([
    (0, swagger_1.ApiExtraModels)(EstadoDescripcionPorRol)
], EditarRolesDto);
//# sourceMappingURL=editar-roles.dto.js.map