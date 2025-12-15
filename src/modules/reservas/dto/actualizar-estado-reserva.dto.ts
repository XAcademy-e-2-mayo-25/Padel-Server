import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { ReservaEstado } from '../../../database/models/reserva.model';

const ESTADOS_PERMITIDOS: ReservaEstado[] = ['pendiente', 'confirmada', 'cancelada', 'finalizada'];

export class ActualizarEstadoReservaDto {
  @IsOptional()
  @IsIn(ESTADOS_PERMITIDOS)
  estado?: ReservaEstado;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return value;
  })
  @IsBoolean()
  pagada?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  observaciones?: string;
}
