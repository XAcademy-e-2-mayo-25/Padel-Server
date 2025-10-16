import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, Max, Min } from 'class-validator';

export class EditarPosicionesDto {
  //Datos validos para este dto es un array no vacio, puede ser de 1 a 3 elementos enteros, donde el minimo es 1 y el maximo es 3
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
