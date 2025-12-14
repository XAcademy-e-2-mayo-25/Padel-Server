import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class AsignarTurnoCanchaDto {
  @IsInt()
  @IsPositive()
  idCancha!: number;

  @IsInt()
  @IsPositive()
  idTurno!: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean = true;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio?: number = 0;
}
