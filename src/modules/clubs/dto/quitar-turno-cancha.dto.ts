import { IsInt, IsPositive } from 'class-validator';

export class QuitarTurnoCanchaDto {
  @IsInt()
  @IsPositive()
  idCancha!: number;

  @IsInt()
  @IsPositive()
  idTurno!: number;
}
