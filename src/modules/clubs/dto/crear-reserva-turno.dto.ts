import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class CrearReservaTurnoDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  idCancha!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  idJugador!: number;

  @IsDateString()
  fecha!: string; // YYYY-MM-DD

  @Type(() => Number)
  @IsInt()
  @Min(0)
  slotIndexDesde!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  slotCount!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  precioAplicado?: number;

  @IsOptional()
  @IsBoolean()
  pagado?: boolean;
}
