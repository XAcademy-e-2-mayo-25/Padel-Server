import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { Reserva } from '../../database/models/reserva.model';
import { Usuario } from '../../database/models/usuario.model';
import { Club } from '../../database/models/club.model';
import { Cancha } from '../../database/models/cancha.model';
import { Turno } from '../../database/models/turno.model';
import { CanchaTurno } from '../../database/models/canchaTurno.model';

@Module({
  imports: [SequelizeModule.forFeature([Reserva, Usuario, Club, Cancha, Turno, CanchaTurno])],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}
