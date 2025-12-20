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
import { ReservasService } from './reservas.service';
import {
  ActualizarEstadoReservaDto,
  CrearReservaDto,
  ListarReservasDto,
} from './dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  crearReserva(@Body() dto: CrearReservaDto) {
    return this.reservasService.crearReserva(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  listarReservas(@Query() query: ListarReservasDto) {
    return this.reservasService.listarReservas(query);
  }

  @Get('canchas')
  @HttpCode(HttpStatus.OK)
  listarCanchasRegistradas() {
    return this.reservasService.listarCanchasRegistradas();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  obtenerReserva(@Param('id', ParseIntPipe) idReserva: number) {
    return this.reservasService.obtenerReserva(idReserva);
  }

  @Patch(':id/estado')
  @HttpCode(HttpStatus.OK)
  actualizarEstado(
    @Param('id', ParseIntPipe) idReserva: number,
    @Body() dto: ActualizarEstadoReservaDto,
  ) {
    return this.reservasService.actualizarEstado(idReserva, dto);
  }
}
