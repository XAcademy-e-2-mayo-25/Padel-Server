import { CrearUsuarioDto } from './crear-usuario.dto';
declare const EditarUsuarioDto_base: import("@nestjs/common").Type<Partial<CrearUsuarioDto>>;
export declare class EditarUsuarioDto extends EditarUsuarioDto_base {
    telefono?: string;
    direccion?: string;
}
export {};
