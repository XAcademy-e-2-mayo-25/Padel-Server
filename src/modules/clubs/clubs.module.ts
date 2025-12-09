import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';

// modelos Sequelize
import { Club } from '../../database/models/club.model';
import { Cancha } from '../../database/models/cancha.model';
import { Turno } from '../../database/models/turno.model';
import { CanchaTurno } from '../../database/models/canchaTurno.model';
import { DatosPago } from '../../database/models/datosPago.model';
import { Usuario } from '../../database/models/usuario.model';
import { Estado } from '../../database/models/Estado.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Club,
      Cancha,
      Turno,
      CanchaTurno,
      DatosPago,
      Usuario,
      Estado,
    ]),
  ],
  controllers: [ClubsController],
  providers: [ClubsService],
  exports: [ClubsService],
})
export class ClubsModule {}
