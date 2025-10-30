import { IsEmail, IsOptional, IsString, Length, IsInt, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @ApiProperty({
    example: 'Carlos Alberto',
    description: 'Nombres del usuario. Longitud entre 1 y 100 caracteres.',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  nombres!: string;

  @ApiProperty({
    example: 'Gómez',
    description: 'Apellidos del usuario. Longitud entre 1 y 100 caracteres.',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @Length(1, 100)
  apellidos!: string;

  @ApiPropertyOptional({
    example: '40100200',
    description: 'DNI del usuario. Campo opcional (1 a 20 caracteres).',
    minLength: 1,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  dni?: string;

  @ApiProperty({
    example: 'carlos.gomez@mail.com',
    description: 'Email válido del usuario.',
  })
  @IsEmail()
  email!: string;

  //lo puse como String, normalmente es una URL, despues vemos como lo adaptamos
  @ApiPropertyOptional({
    example: 'https://mi-servidor.com/perfiles/carlos.jpg',
    description: 'URL a la foto de perfil del usuario (opcional).',
    minLength: 1,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  fotoPerfil?: string;

  //Provincia y localidad estaria bueno usar alguna libreria que incluya todas las provincias y todas las localidades
  //para evitar tipeo
  @ApiPropertyOptional({
    example: 'Córdoba',
    description: 'Provincia del usuario (opcional).',
    minLength: 1,
    maxLength: 80,
  })
  @IsOptional()
  @IsString()
  @Length(1, 80)
  provincia?: string;

  @ApiPropertyOptional({
    example: 'Río Cuarto',
    description: 'Localidad del usuario (opcional).',
    minLength: 1,
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  localidad?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID de categoría del usuario (opcional). Debe ser entero y positivo.',
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  idCategoria?: number;
}

