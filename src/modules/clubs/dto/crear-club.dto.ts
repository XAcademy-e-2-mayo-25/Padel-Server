import { IsEmail, IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class CrearClubDto {
  @IsInt()
  @IsPositive()
  idUsuario!: number; // FK al usuario dueño del club

  @IsOptional()
  @IsString()
  @Length(1, 150)
  razonSocial?: string;

  @IsOptional()
  @IsString()
  @Length(1, 150)
  nombreFantasia?: string;

  @IsString()
  @Length(1, 20)
  cuitCuil!: string; // UNIQUE por BD para control

  @IsString()
  @Length(1, 50)
  provincia!: string;

  @IsString()
  @Length(1, 100)
  localidad!: string;

  @IsString()
  @Length(1, 300)
  direccion!: string;

  // Por defecto el back debe setear PENDIENTE (1)
  @IsOptional()
  @IsInt()
  @IsPositive()
  idEstadoClub?: number; // 1=PENDIENTE, 2=HABILITADO, 3=BANEADO
}
