import { PartialType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from './crear-usuario.dto';
import { ApiExtraModels } from '@nestjs/swagger';

//Utiliza el dto de crearUsuario con utilidad parcial
@ApiExtraModels(CrearUsuarioDto)
export class EditarUsuarioDto extends PartialType(CrearUsuarioDto) {}

