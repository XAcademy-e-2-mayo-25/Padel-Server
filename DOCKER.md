# Docker Setup - Padel Backend

## Primera Vez (Setup Inicial)

```bash
# 1. Construir y levantar los contenedores
docker-compose up --build

# 2. En otra terminal, ejecutar los seeders (datos iniciales)
docker exec padel-backend npm run db:seed
```

Esto creará:
- ✅ Base de datos MySQL en el puerto 3309
- ✅ Backend NestJS en el puerto 3000
- ✅ Tablas de la base de datos (migraciones automáticas)
- ✅ Datos iniciales (roles, categorías, posiciones, estados)

## Uso Diario

### Iniciar los contenedores
```bash
docker-compose up
```

### Detener los contenedores
```bash
docker-compose down
```

**Nota:** Esto preserva todos los datos en la base de datos.

## Solución de Problemas

### El backend se cae al reiniciar
**Causa:** Ya no se necesita ejecutar seeders cada vez porque están hechos idempotentes.

**Solución:** Solo usa `docker-compose up`, las migraciones se ejecutan automáticamente.

### Necesito datos frescos (reset completo)
```bash
# Detener y eliminar todo (incluyendo volúmenes)
docker-compose down -v

# Levantar de nuevo
docker-compose up --build

# Ejecutar seeders
docker exec padel-backend npm run db:seed
```

### Necesito ejecutar seeders de nuevo
```bash
# Los seeders son idempotentes, puedes ejecutarlos múltiples veces
docker exec padel-backend npm run db:seed
```

### Ver logs del backend
```bash
docker logs padel-backend -f
```

### Acceder a la base de datos
```bash
# Desde tu máquina (puerto externo 3309)
mysql -h 127.0.0.1 -P 3309 -u padel -p
# Password: padel

# O usando un cliente GUI
Host: 127.0.0.1
Port: 3309
User: padel
Password: padel
Database: padel
```

### Ejecutar comandos dentro del contenedor
```bash
# Shell interactivo
docker exec -it padel-backend sh

# Ejecutar migraciones
docker exec padel-backend npm run db:migrate

# Ver estado de migraciones
docker exec padel-backend npx sequelize-cli db:migrate:status
```

## Estructura de Archivos Importantes

- `.env` - Variables de entorno (DB_HOST debe ser "db" para Docker)
- `docker-compose.yml` - Configuración de servicios
- `Dockerfile` - Imagen del backend
- `.sequelizerc` - Configuración de Sequelize CLI
- `config/config.js` - Configuración de base de datos
- `migrations/` - Migraciones de esquema
- `seeders/` - Datos iniciales (idempotentes)

## URLs Disponibles

- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/docs
- **MySQL:** localhost:3309

## Diferencia entre .env para Docker vs Local

### Para Docker (docker-compose up)
```
DB_HOST=db
DB_PORT=3306
```

### Para desarrollo local (npm run start:dev)
```
DB_HOST=localhost
DB_PORT=3309
```

## Scripts Disponibles

Dentro del contenedor o localmente:

```bash
npm run db:migrate         # Ejecutar migraciones pendientes
npm run db:migrate:undo    # Deshacer última migración
npm run db:seed            # Ejecutar todos los seeders
npm run db:seed:undo       # Deshacer todos los seeders
npm run db:reset           # Reset completo: undo all, migrate, seed
```
