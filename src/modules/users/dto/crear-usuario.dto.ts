import { IsEmail, IsOptional, IsString, Length, IsInt, IsPositive } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @Length(1, 100)
  nombres!: string;

  @IsString()
  @Length(1, 100)
  apellidos!: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  dni?: string;

  @IsEmail()
  email!: string;

  //lo puse como String, normalmente es una URL, despues vemos como lo adaptamos
  @IsOptional()
  @IsString()
  @Length(1, 255)
  fotoPerfil?: string;

  //Provincia y localidad estaria bueno usar alguna libreria que incluya todas las provincias y todas las localidades
  //para evitar tipeo
  @IsOptional()
  @IsString()
  @Length(1, 80)
  provincia?: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  localidad?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  idCategoria?: number;
}
