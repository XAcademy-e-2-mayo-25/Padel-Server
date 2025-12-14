import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CrearDatosPagoDto {
  @IsInt()
  @IsPositive()
  idClub!: number;

  @IsString()
  @Length(1, 80)
  metodoPago!: string; // TRANSFERENCIA

  @IsOptional()
  @IsString()
  @Length(1, 22)
  cbu?: string;

  @IsOptional()
  @IsString()
  @Length(1, 22)
  cvu?: string;

  @IsOptional()
  @IsString()
  @Length(1, 60)
  alias?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  dniCuitCuil?: string;

  @IsOptional()
  @IsString()
  @Length(1, 150)
  titular?: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  banco?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  tipoCuenta?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  numeroCuenta?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean = true;
}
