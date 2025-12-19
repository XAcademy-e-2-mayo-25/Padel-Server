import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CrearCanchaDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  idClub!: number;

  @IsString()
  @Length(1, 200)
  denominacion!: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined) return undefined;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  cubierta?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  observaciones?: string;

  // nuevos campos

  // bitmask de días con numero de 7 bits (0 a 127)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(127)
  diasSemana!: number;

  // HH:mm o HH:mm:ss
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaDesde!: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaHasta!: string;

  // tamaño del slot en minutos (30 o 60)
  @Type(() => Number)
  @IsInt()
  @IsIn([30, 60])
  rangoSlotMinutos!: number;

  // precio entero (>0)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  precio!: number;
}
