import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class PagarReservaTurnoDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idReservaTurno?: number;

  @IsOptional()
  @IsBoolean()
  pagado?: boolean;
}
