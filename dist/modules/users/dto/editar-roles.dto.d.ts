export declare class EstadoDescripcionPorRol {
    idRol: number;
    idEstado: number;
    descripcion?: string;
}
export declare class EditarRolesDto {
    roles: number[];
    estados?: EstadoDescripcionPorRol[];
    defaultEstado?: number;
}
