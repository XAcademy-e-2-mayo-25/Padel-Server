import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditarPosicionesDto {
  //Datos validos para este dto es un array no vacio, puede ser de 1 a 3 elementos enteros, donde el minimo es 1 y el maximo es 3
  @ApiProperty({
    example: [1, 2],
    description:
      'Lista de posiciones del jugador. Debe contener entre 1 y 3 elementos, con valores entre 1 y 3. Acepta [2], ["2"], 2 o "2".',
    minItems: 1,
    maxItems: 3,
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(3, { each: true })
  @Transform(({ value }) => {
    // Acepta [2], ["2"], 2, "2"
    if (Array.isArray(value)) return value.map((v) => Number(v));
    if (value === undefined || value === null) return [];
    return [Number(value)];
  })
  posiciones!: number[];
}

