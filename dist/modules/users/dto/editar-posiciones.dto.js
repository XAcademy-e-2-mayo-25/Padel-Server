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
exports.EditarPosicionesDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class EditarPosicionesDto {
    posiciones;
}
exports.EditarPosicionesDto = EditarPosicionesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2],
        description: 'Lista de posiciones del jugador. Debe contener entre 1 y 3 elementos, con valores entre 1 y 3. Acepta [2], ["2"], 2 o "2".',
        minItems: 1,
        maxItems: 3,
        isArray: true,
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
], EditarPosicionesDto.prototype, "posiciones", void 0);
//# sourceMappingURL=editar-posiciones.dto.js.map