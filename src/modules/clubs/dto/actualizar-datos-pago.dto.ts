import { PartialType } from '@nestjs/mapped-types';
import { CrearDatosPagoDto } from './crear-datos-pago.dto';

export class ActualizarDatosPagoDto extends PartialType(CrearDatosPagoDto) {}