"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarUsuarioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const crear_usuario_dto_1 = require("./crear-usuario.dto");
const swagger_1 = require("@nestjs/swagger");
let EditarUsuarioDto = class EditarUsuarioDto extends (0, mapped_types_1.PartialType)(crear_usuario_dto_1.CrearUsuarioDto) {
};
exports.EditarUsuarioDto = EditarUsuarioDto;
exports.EditarUsuarioDto = EditarUsuarioDto = __decorate([
    (0, swagger_1.ApiExtraModels)(crear_usuario_dto_1.CrearUsuarioDto)
], EditarUsuarioDto);
//# sourceMappingURL=editar-usuario.dto.js.map