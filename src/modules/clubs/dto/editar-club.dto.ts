import { PartialType } from '@nestjs/mapped-types';
import { CrearClubDto } from './crear-club.dto';

export class EditarClubDto extends PartialType(CrearClubDto) {}
