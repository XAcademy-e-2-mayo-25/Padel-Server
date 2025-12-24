import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class ActualizarTurnoCanchaDto {
  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio?: number;
}
