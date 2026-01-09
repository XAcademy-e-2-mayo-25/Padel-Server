"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = require("sequelize");
const usuario_model_1 = require("../../database/models/usuario.model");
const usuariorol_model_1 = require("../../database/models/usuariorol.model");
const usuarioposicion_model_1 = require("../../database/models/usuarioposicion.model");
const rol_model_1 = require("../../database/models/rol.model");
const Estado_model_1 = require("../../database/models/Estado.model");
const posicion_model_1 = require("../../database/models/posicion.model");
const ROL_JUGADOR = 2;
const ESTADO_HABILITADO = 2;
const POSICION_NO_DEFINIDA = 1;
const ESTADO_BANEADO = 3;
const POS_NO_DEFINIDO = 1;
const POS_DRIVE = 2;
const POS_REVES = 3;
const ESTADO_PENDIENTE = 1;
let UsuariosService = class UsuariosService {
    usuarioModel;
    usuarioRolModel;
    usuarioPosModel;
    posicionModel;
    rolModel;
    estadoModel;
    categoriaModel;
    sequelize;
    constructor(usuarioModel, usuarioRolModel, usuarioPosModel, posicionModel, rolModel, estadoModel, categoriaModel, sequelize) {
        this.usuarioModel = usuarioModel;
        this.usuarioRolModel = usuarioRolModel;
        this.usuarioPosModel = usuarioPosModel;
        this.posicionModel = posicionModel;
        this.rolModel = rolModel;
        this.estadoModel = estadoModel;
        this.categoriaModel = categoriaModel;
        this.sequelize = sequelize;
    }
    async findByEmail(email) {
        return this.usuarioModel.findOne({ where: { email } });
    }
    async crearUsuario(dto) {
        const existente = await this.usuarioModel.findOne({ where: { email: dto.email } });
        if (existente)
            throw new common_1.BadRequestException('El email ya está registrado');
        const usr = await this.sequelize.transaction(async (t) => {
            const nuevo = await this.usuarioModel.create({
                nombres: dto.nombres,
                apellidos: dto.apellidos,
                dni: dto.dni ?? null,
                email: dto.email,
                fotoPerfil: dto.fotoPerfil ?? null,
                provincia: dto.provincia ?? null,
                localidad: dto.localidad ?? null,
                idCategoria: dto.idCategoria ?? null,
            }, { transaction: t });
            await this.usuarioRolModel.create({ idUsuario: nuevo.idUsuario, idRol: ROL_JUGADOR, idEstado: ESTADO_HABILITADO, descripcion: null }, { transaction: t });
            await this.usuarioPosModel.create({ idUsuario: nuevo.idUsuario, idPosicion: POSICION_NO_DEFINIDA }, { transaction: t });
            return nuevo;
        });
        const withRels = await this.usuarioModel.findByPk(usr.idUsuario, {
            include: [
                { model: usuariorol_model_1.UsuarioRol, include: [rol_model_1.Rol, Estado_model_1.Estado] },
                { model: usuarioposicion_model_1.UsuarioPosicion, include: [posicion_model_1.Posicion] },
            ],
        });
        return {
            mensaje: 'Usuario creado correctamente',
            usuario: withRels,
        };
    }
    async banUsuario(idUsuario, dto) {
        const usuario = await this.usuarioModel.findByPk(idUsuario);
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (!dto.applyAllRoles && !dto.idRol) {
            throw new common_1.BadRequestException('Debe indicar idRol o applyAllRoles=true');
        }
        return this.sequelize.transaction(async (t) => {
            if (dto.applyAllRoles) {
                const [affected] = await this.usuarioRolModel.update({ idEstado: ESTADO_BANEADO, descripcion: dto.descripcion }, { where: { idUsuario }, transaction: t });
                if (affected === 0) {
                    throw new common_1.BadRequestException('El usuario no tiene roles asignados para banear');
                }
                return { idUsuario, rolesBaneados: affected };
            }
            else {
                const [affected] = await this.usuarioRolModel.update({ idEstado: ESTADO_BANEADO, descripcion: dto.descripcion }, { where: { idUsuario, idRol: dto.idRol }, transaction: t });
                if (affected === 0) {
                    throw new common_1.NotFoundException('No existe ese rol para el usuario');
                }
                return { idUsuario, idRol: dto.idRol, estado: 'BANEADO' };
            }
        });
    }
    async unbanUsuario(idUsuario, dto) {
        const usuario = await this.usuarioModel.findByPk(idUsuario);
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (!dto.applyAllRoles && !dto.idRol) {
            throw new common_1.BadRequestException('Debe indicar idRol o applyAllRoles=true');
        }
        return this.sequelize.transaction(async (t) => {
            if (dto.applyAllRoles) {
                const [affected] = await this.usuarioRolModel.update({ idEstado: ESTADO_HABILITADO, descripcion: dto.descripcion ?? null }, { where: { idUsuario }, transaction: t });
                if (affected === 0) {
                    throw new common_1.BadRequestException('El usuario no tiene roles para actualizar');
                }
                return { idUsuario, rolesHabilitados: affected };
            }
            else {
                const [affected] = await this.usuarioRolModel.update({ idEstado: ESTADO_HABILITADO, descripcion: dto.descripcion ?? null }, { where: { idUsuario, idRol: dto.idRol }, transaction: t });
                if (affected === 0) {
                    throw new common_1.NotFoundException('No existe ese rol para el usuario');
                }
                return { idUsuario, idRol: dto.idRol, estado: 'HABILITADO' };
            }
        });
    }
    async editarUsuario(idUsuario, dto) {
        const usuario = await this.usuarioModel.findByPk(idUsuario);
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        const cambios = {
            nombres: dto.nombres ?? usuario.nombres,
            apellidos: dto.apellidos ?? usuario.apellidos,
            dni: dto.dni ?? usuario.dni,
            fotoPerfil: dto.fotoPerfil ?? usuario.fotoPerfil,
            provincia: dto.provincia ?? usuario.provincia,
            localidad: dto.localidad ?? usuario.localidad,
            idCategoria: dto.idCategoria ?? usuario.idCategoria,
            telefono: dto.telefono ?? usuario.telefono,
            direccion: dto.direccion ?? usuario.direccion,
        };
        await this.usuarioModel.update(cambios, { where: { idUsuario } });
        if (dto.idPosicion) {
            await this.usuarioPosModel.destroy({ where: { idUsuario } });
            await this.usuarioPosModel.create({ idUsuario, idPosicion: dto.idPosicion });
        }
        const actualizado = await this.usuarioModel.findByPk(idUsuario, {
            include: [
                { model: usuariorol_model_1.UsuarioRol, include: [rol_model_1.Rol, Estado_model_1.Estado] },
                { model: usuarioposicion_model_1.UsuarioPosicion, include: [posicion_model_1.Posicion] },
            ],
        });
        return {
            mensaje: 'Usuario actualizado correctamente',
            usuario: actualizado,
        };
    }
    async actualizarPosiciones(idUsuario, dto) {
        const usuario = await this.usuarioModel.findByPk(idUsuario);
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        const set = Array.from(new Set((dto.posiciones ?? []).map(n => Number(n))));
        if (set.length === 0)
            throw new common_1.BadRequestException('Debe indicar al menos una posición');
        if (set.includes(POS_NO_DEFINIDO) && set.length > 1) {
            throw new common_1.BadRequestException('Si se elige NO DEFINIDO, no puede combinarse con otras posiciones');
        }
        const validos = [POS_NO_DEFINIDO, POS_DRIVE, POS_REVES];
        const invalidos = set.filter(id => !validos.includes(id));
        if (invalidos.length > 0)
            throw new common_1.BadRequestException('Posiciones inválidas: ${invalidos.join(\', \')}');
        await this.sequelize.transaction(async (t) => {
            await this.usuarioPosModel.destroy({ where: { idUsuario }, transaction: t });
            await this.usuarioPosModel.bulkCreate(set.map(idPosicion => ({ idUsuario, idPosicion })), { transaction: t });
        });
        const actualizado = await this.usuarioModel.findByPk(idUsuario, {
            include: [
                { model: usuariorol_model_1.UsuarioRol, include: [rol_model_1.Rol, Estado_model_1.Estado] },
                { model: usuarioposicion_model_1.UsuarioPosicion, include: [posicion_model_1.Posicion] },
            ],
        });
        return {
            mensaje: 'Posiciones actualizadas correctamente',
            usuario: actualizado,
        };
    }
    async actualizarRoles(idUsuario, dto) {
        const usuario = await this.usuarioModel.findByPk(idUsuario);
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        const nuevo = Array.from(new Set((dto.roles ?? []).map(Number)));
        if (nuevo.length === 0)
            throw new common_1.BadRequestException('Debe indicar al menos un rol');
        const rolesValidos = [1, 2, 3];
        const invalidos = nuevo.filter((r) => !rolesValidos.includes(r));
        if (invalidos.length)
            throw new common_1.BadRequestException('Roles inválidos: ${invalidos.join(\', \')}');
        const mapa = new Map();
        (dto.estados ?? []).forEach((e) => mapa.set(e.idRol, { idEstado: e.idEstado, descripcion: e.descripcion }));
        const defaultEstado = dto.defaultEstado ?? ESTADO_PENDIENTE;
        const actuales = await this.usuarioRolModel.findAll({ where: { idUsuario } });
        const actualesSet = new Set(actuales.map((ur) => ur.idRol));
        const toAdd = nuevo.filter((r) => !actualesSet.has(r));
        const toKeep = nuevo.filter((r) => actualesSet.has(r));
        const toRemove = [...actualesSet].filter((r) => !nuevo.includes(r));
        await this.sequelize.transaction(async (t) => {
            if (toRemove.length) {
                await this.usuarioRolModel.destroy({
                    where: { idUsuario, idRol: { [sequelize_2.Op.in]: toRemove } },
                    transaction: t,
                });
            }
            if (toAdd.length) {
                const rows = toAdd.map((idRol) => {
                    const override = mapa.get(idRol);
                    return {
                        idUsuario,
                        idRol,
                        idEstado: override?.idEstado ?? defaultEstado,
                        descripcion: override?.descripcion ?? null,
                    };
                });
                await this.usuarioRolModel.bulkCreate(rows, {
                    transaction: t,
                    updateOnDuplicate: ['idEstado', 'descripcion'],
                });
            }
            const toUpdate = toKeep.filter((idRol) => mapa.has(idRol));
            for (const idRol of toUpdate) {
                const { idEstado, descripcion } = mapa.get(idRol);
                await this.usuarioRolModel.update({ idEstado, descripcion: descripcion ?? null }, { where: { idUsuario, idRol }, transaction: t });
            }
        });
        let actualizado = null;
        try {
            actualizado = await this.usuarioModel.findByPk(idUsuario, {
                include: [
                    { model: usuariorol_model_1.UsuarioRol, include: [rol_model_1.Rol, Estado_model_1.Estado] },
                    { model: usuarioposicion_model_1.UsuarioPosicion, include: [posicion_model_1.Posicion] },
                ],
            });
        }
        catch (e) {
            actualizado = await this.usuarioModel.findByPk(idUsuario);
        }
        return {
            mensaje: 'Roles actualizados correctamente',
            usuario: actualizado,
        };
    }
    async obtenerUsuario(idUsuario) {
        const usuario = await this.usuarioModel.findByPk(idUsuario, {
            include: [
                { model: usuariorol_model_1.UsuarioRol, include: [rol_model_1.Rol, Estado_model_1.Estado] },
                { model: usuarioposicion_model_1.UsuarioPosicion, include: [posicion_model_1.Posicion] },
            ],
        });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return usuario;
    }
    async listarUsuarios(q) {
        const page = q.page ?? 1;
        const limit = q.limit ?? 10;
        const offset = (page - 1) * limit;
        const order = [[q.sortBy ?? 'idUsuario', (q.sortDir ?? 'ASC').toUpperCase()]];
        const whereUsuario = {};
        if (q.email) {
            whereUsuario.email = { [sequelize_2.Op.like]: `%${q.email}%` };
        }
        if (q.nombre) {
            whereUsuario[sequelize_2.Op.or] = [
                { nombres: { [sequelize_2.Op.like]: `%${q.nombre}%` } },
                { apellidos: { [sequelize_2.Op.like]: `%${q.nombre}%` } },
            ];
        }
        if (q.idCategoria) {
            whereUsuario.idCategoria = q.idCategoria;
        }
        const include = [
            {
                model: usuariorol_model_1.UsuarioRol,
                include: [rol_model_1.Rol, Estado_model_1.Estado],
                required: !!(q.idRol || q.idEstado),
                where: {
                    ...(q.idRol ? { idRol: q.idRol } : {}),
                    ...(q.idEstado ? { idEstado: q.idEstado } : {}),
                },
            },
            {
                model: usuarioposicion_model_1.UsuarioPosicion,
                include: [posicion_model_1.Posicion],
                required: !!q.idPosicion,
                where: {
                    ...(q.idPosicion ? { idPosicion: q.idPosicion } : {}),
                },
            },
        ];
        const { rows, count } = await this.usuarioModel.findAndCountAll({
            where: whereUsuario,
            include,
            order,
            limit,
            offset,
            distinct: true,
        });
        return {
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit),
            items: rows,
        };
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(usuario_model_1.Usuario)),
    __param(1, (0, sequelize_1.InjectModel)(usuariorol_model_1.UsuarioRol)),
    __param(2, (0, sequelize_1.InjectModel)(usuarioposicion_model_1.UsuarioPosicion)),
    __param(3, (0, sequelize_1.InjectModel)(posicion_model_1.Posicion)),
    __param(4, (0, sequelize_1.InjectModel)(rol_model_1.Rol)),
    __param(5, (0, sequelize_1.InjectModel)(Estado_model_1.Estado)),
    __param(6, (0, sequelize_1.InjectModel)(Estado_model_1.Estado)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, sequelize_typescript_1.Sequelize])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map