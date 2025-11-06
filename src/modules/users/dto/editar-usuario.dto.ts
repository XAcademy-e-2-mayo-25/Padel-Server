import { PartialType } from '@nestjs/swagger';
import { CrearUsuarioDto } from './crear-usuario.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsInt, IsPositive } from 'class-validator';

export class EditarUsuarioDto extends PartialType(CrearUsuarioDto) {
  @ApiPropertyOptional({
    example: '3515123456',
    description: 'Teléfono del usuario (opcional)',
    minLength: 5,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  telefono?: string;

  @ApiPropertyOptional({
    example: 'Av. San Martín 1234',
    description: 'Dirección del usuario (opcional)',
    minLength: 1,
    maxLength: 40,
  })
  @IsOptional()
  @IsString()
  @Length(1, 40)
  direccion?: string;

  @ApiPropertyOptional({
    example: 3,
    description: 'ID de posición del usuario (opcional)',
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  idPosicion?: number;
}
