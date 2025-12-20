import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Reserva, ReservaEstado } from '../../database/models/reserva.model';
import { CanchaTurno } from '../../database/models/canchaTurno.model';
import { Usuario } from '../../database/models/usuario.model';
import { Club } from '../../database/models/club.model';
import { Cancha } from '../../database/models/cancha.model';
import { Turno } from '../../database/models/turno.model';
import {
  ActualizarEstadoReservaDto,
  CrearReservaDto,
  ListarReservasDto,
} from './dto';

const ESTADO_CANCELADA: ReservaEstado = 'cancelada';

@Injectable()
export class ReservasService {
  constructor(
    @InjectModel(Reserva) private readonly reservaModel: typeof Reserva,
    @InjectModel(CanchaTurno) private readonly canchaTurnoModel: typeof CanchaTurno,
    @InjectModel(Usuario) private readonly usuarioModel: typeof Usuario,
    @InjectModel(Turno) private readonly turnoModel: typeof Turno,
    @InjectModel(Cancha) private readonly canchaModel: typeof Cancha,
  ) {}

  private readonly includeReserva = [
    { model: Usuario },
    { model: Club },
    { model: Cancha },
    { model: Turno },
    {
      model: CanchaTurno,
      include: [Club, Cancha, Turno],
    },
  ];

  async crearReserva(dto: CrearReservaDto) {
    const usuario = await this.usuarioModel.findByPk(dto.idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const canchaTurno = await this.canchaTurnoModel.findByPk(dto.idCanchaTurno, {
      include: [Cancha, Turno, Club],
    });
    if (!canchaTurno) throw new NotFoundException('Turno de cancha no encontrado');
    if (!canchaTurno.disponible) {
      throw new BadRequestException('El turno indicado no se encuentra disponible');
    }

    const turno = canchaTurno.turno ?? (await this.turnoModel.findByPk(canchaTurno.idTurno));
    if (!turno) throw new NotFoundException('Turno asociado no encontrado');

    if (turno.fecha && turno.fecha !== dto.fechaReserva) {
      throw new BadRequestException('La fecha seleccionada no coincide con la definida en el turno');
    }

    const existente = await this.reservaModel.findOne({
      where: {
        idCanchaTurno: dto.idCanchaTurno,
        fechaReserva: dto.fechaReserva,
        estado: { [Op.ne]: ESTADO_CANCELADA },
      },
    });

    if (existente) {
      throw new BadRequestException('Ya existe una reserva activa para ese turno en esa fecha');
    }

    const reserva = await this.reservaModel.create({
      idUsuario: dto.idUsuario,
      idClub: canchaTurno.idClub,
      idCancha: canchaTurno.idCancha,
      idTurno: canchaTurno.idTurno,
      idCanchaTurno: dto.idCanchaTurno,
      fechaReserva: dto.fechaReserva,
      precio: canchaTurno.precio,
      metodoPago: dto.metodoPago ?? null,
      observaciones: dto.observaciones ?? null,
    });

    const conRelaciones = await this.reservaModel.findByPk(reserva.idReserva, {
      include: this.includeReserva,
    });

    return {
      mensaje: 'Reserva creada correctamente',
      reserva: conRelaciones,
    };
  }

  async listarReservas(q: ListarReservasDto) {
    const page = q.page ?? 1;
    const limit = q.limit ?? 10;
    const offset = (page - 1) * limit;
    const sortField = q.sortBy ?? 'fechaReserva';
    const sortDir = (q.sortDir ?? 'DESC').toUpperCase();
    const order: any[] = [[sortField, sortDir]];

    const where: any = {};
    if (q.idUsuario) where.idUsuario = q.idUsuario;
    if (q.idClub) where.idClub = q.idClub;
    if (q.idCancha) where.idCancha = q.idCancha;
    if (q.idTurno) where.idTurno = q.idTurno;
    if (q.estado) where.estado = q.estado;
    if (typeof q.pagada === 'boolean') where.pagada = q.pagada;

    if (q.fechaDesde && q.fechaHasta) {
      where.fechaReserva = { [Op.between]: [q.fechaDesde, q.fechaHasta] };
    } else if (q.fechaDesde) {
      where.fechaReserva = { [Op.gte]: q.fechaDesde };
    } else if (q.fechaHasta) {
      where.fechaReserva = { [Op.lte]: q.fechaHasta };
    }

    const { rows, count } = await this.reservaModel.findAndCountAll({
      where,
      include: this.includeReserva,
      distinct: true,
      order,
      limit,
      offset,
    });

    return {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      items: rows,
    };
  }

  async obtenerReserva(idReserva: number) {
    const reserva = await this.reservaModel.findByPk(idReserva, {
      include: this.includeReserva,
    });
    if (!reserva) throw new NotFoundException('Reserva no encontrada');
    return reserva;
  }

  async actualizarEstado(idReserva: number, dto: ActualizarEstadoReservaDto) {
    const reserva = await this.reservaModel.findByPk(idReserva);
    if (!reserva) throw new NotFoundException('Reserva no encontrada');

    const cambios: Partial<Reserva> = {};

    if (dto.estado && dto.estado !== reserva.estado) {
      cambios.estado = dto.estado;
    }
    if (typeof dto.pagada === 'boolean') {
      cambios.pagada = dto.pagada;
    }
    if (dto.observaciones !== undefined) {
      cambios.observaciones = dto.observaciones ?? null;
    }

    if (Object.keys(cambios).length === 0) {
      return {
        mensaje: 'No se registraron cambios en la reserva',
        reserva: await this.obtenerReserva(idReserva),
      };
    }

    await this.reservaModel.update(cambios, { where: { idReserva } });
    const actualizada = await this.obtenerReserva(idReserva);

    return {
      mensaje: 'Reserva actualizada correctamente',
      reserva: actualizada,
    };
  }

  async listarCanchasRegistradas() {
    const canchas = await this.canchaModel.findAll({
      include: [{ model: Club }],
      order: [['idCancha', 'ASC']],
    });
    return {
      total: canchas.length,
      items: canchas,
    };
  }
}
