import { PartialType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from './crear-usuario.dto';

//Utiliza el dto de crearUsuario con utilidad parcial
export class EditarUsuarioDto extends PartialType(CrearUsuarioDto) {}
