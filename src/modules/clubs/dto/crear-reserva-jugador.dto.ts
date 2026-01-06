import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsPositive, Min, IsBoolean } from 'class-validator';

export class CrearReservaJugadorDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  idCancha!: number;

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
