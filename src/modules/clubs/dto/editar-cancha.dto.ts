import { PartialType } from '@nestjs/mapped-types';
import { CrearCanchaDto } from './crear-cancha.dto';

export class EditarCanchaDto extends PartialType(CrearCanchaDto) {}
