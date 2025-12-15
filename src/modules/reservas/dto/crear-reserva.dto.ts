import { IsDateString, IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CrearReservaDto {
  @IsInt()
  @IsPositive()
  idUsuario!: number;

  @IsInt()
  @IsPositive()
  idCanchaTurno!: number;

  @IsDateString()
  fechaReserva!: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  metodoPago?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  observaciones?: string;
}
