import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';

export class CrearSlotDto {
  @IsInt()
  @IsPositive()
  idClub!: number;

  @IsInt()
  @IsPositive()
  idCancha!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  idTurno?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  diaSemana?: number;

  @ValidateIf((o) => !o.idTurno)
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaDesde?: string;

  @ValidateIf((o) => !o.idTurno)
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  horaHasta?: string;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean = true;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio?: number = 0;
}
