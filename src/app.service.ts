//este service tambien se puede eliminar para limpiar el proyecto, vamos a hacer todo por modulos
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
