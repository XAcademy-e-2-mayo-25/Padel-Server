import { PartialType } from '@nestjs/mapped-types';
import { CrearReservaTurnoDto } from './crear-reserva-turno.dto';

export class EditarReservaTurnoDto extends PartialType(CrearReservaTurnoDto) {}
