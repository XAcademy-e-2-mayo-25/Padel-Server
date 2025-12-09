import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ClubsService } from './clubs.service';

// DTOs
import {
  CrearClubDto,
  EditarClubDto,
  CrearCanchaDto,
  EditarCanchaDto,
  CrearTurnoDto,
  EditarTurnoDto,
  AsignarTurnoCanchaDto,
  QuitarTurnoCanchaDto,
  ActualizarTurnoCanchaDto,
  CrearDatosPagoDto,
  ActualizarDatosPagoDto,
  ListarCanchasDto,
  ListarClubsDto,
  ListarDatosPagosDto,
  ListarTurnosDto,
  ListarTurnosCanchasDto,
} from './dto';

//Todos los endpoint de este controller carecen de guards/roles, falta configurarlos
//y luego agregarlos a los endpoint (UseGuard y Roles), ya que todos estos pueden ser accedidos desde rol ADMIN/CLUB

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

// Endpoints CLUB

  // Crear club
  @Post()
  @HttpCode(HttpStatus.CREATED)
  crearClub(@Body() dto: CrearClubDto) {
    return this.clubsService.crearClub(dto);
  }

  // Listar clubs con filtros y paginacion
  @Get()
  @HttpCode(HttpStatus.OK)
  listarClubs(@Query() query: ListarClubsDto) {
    return this.clubsService.listarClubs(query);
  }

  // Obtener club por id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  obtenerClub(@Param('id', ParseIntPipe) id: number) {
    return this.clubsService.obtenerClub(id);
  }

  // Editar club
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  editarClub(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarClubDto) {
    return this.clubsService.editarClub(id, dto);
  }

// Endpoints CANCHA

  // Crear cancha
  @Post('canchas')
  @HttpCode(HttpStatus.CREATED)
  crearCancha(@Body() dto: CrearCanchaDto) {
    return this.clubsService.crearCancha(dto);
  }

  // Listar canchas
  @Get('canchas')
  @HttpCode(HttpStatus.OK)
  listarCanchas(@Query() query: ListarCanchasDto) {
    return this.clubsService.listarCanchas(query);
  }

  // Editar cancha
  @Patch('canchas/:id')
  @HttpCode(HttpStatus.OK)
  editarCancha(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarCanchaDto) {
    return this.clubsService.editarCancha(id, dto);
  }

// Endpoints TURNO

  // Crear turno
  @Post('turnos')
  @HttpCode(HttpStatus.CREATED)
  crearTurno(@Body() dto: CrearTurnoDto) {
    return this.clubsService.crearTurno(dto);
  }

  // Listar turnos
  @Get('turnos')
  @HttpCode(HttpStatus.OK)
  listarTurnos(@Query() query: ListarTurnosDto) {
    return this.clubsService.listarTurnos(query);
  }

  // Editar turno
  @Patch('turnos/:id')
  @HttpCode(HttpStatus.OK)
  editarTurno(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarTurnoDto) {
    return this.clubsService.editarTurno(id, dto);
  }

// Endpoints CANCHA–TURNO

  // Asignar un turno a una cancha
  @Post('turnos/asignar')
  @HttpCode(HttpStatus.CREATED)
  asignarTurnoCancha(@Body() dto: AsignarTurnoCanchaDto) {
    return this.clubsService.asignarTurnoCancha(dto);
  }

  // Listar turnos por cancha
  @Get('turnos/canchas')
  @HttpCode(HttpStatus.OK)
  listarTurnosCancha(@Query() query: ListarTurnosCanchasDto) {
    return this.clubsService.listarTurnosCancha(query);
  }

  // Actualizar relación cancha-turno
  @Patch('turnos/cancha/:idCancha/:idTurno')
  @HttpCode(HttpStatus.OK)
  actualizarTurnoCancha(
    @Param('idCancha', ParseIntPipe) idCancha: number,
    @Param('idTurno', ParseIntPipe) idTurno: number,
    @Body() dto: ActualizarTurnoCanchaDto,
  ) {
    return this.clubsService.actualizarTurnoCancha(idCancha, idTurno, dto);
  }

  // Quitar un turno de una cancha
  @Post('turnos/desasignar')
  @HttpCode(HttpStatus.OK)
  quitarTurnoCancha(@Body() dto: QuitarTurnoCanchaDto) {
    return this.clubsService.quitarTurnoCancha(dto);
  }

  // Endpoints DATOS DE PAGO

  // Crear método de pago
  @Post('datos-pago')
  @HttpCode(HttpStatus.CREATED)
  crearDatosPago(@Body() dto: CrearDatosPagoDto) {
    return this.clubsService.crearDatosPago(dto);
  }

  // Listar métodos de pago
  @Get('datos-pago')
  @HttpCode(HttpStatus.OK)
  listarDatosPagos(@Query() query: ListarDatosPagosDto) {
    return this.clubsService.listarDatosPagos(query);
  }

  // Actualizar método de pago
  @Patch('datos-pago/:id')
  @HttpCode(HttpStatus.OK)
  actualizarDatosPago(
    @Param('id', ParseIntPipe) idDatosPago: number,
    @Body() dto: ActualizarDatosPagoDto,
  ) {
    return this.clubsService.actualizarDatosPago(idDatosPago, dto);
  }
}
