# Padel Server - backend

Produccion de backend para proyecto Padel de XAcademy Santex

---

# Tecnologías utilizadas

→ NestJS: Framework de Node.js para el desarrollo de aplicaciones del lado del servidor con arquitectura modular, inyección de dependencias y soporte nativo para TypeScript.

→ TypeScript: Como lenguaje tipado que mejora la mantenibilidad y escalabilidad del código.

→ MySQL: Base de datos relacional.

→ Sequelize: ORM para definir modelos y relaciones entre entidades, y realizar operaciones SQL desde código JavaScript/TypeScript.

→ Clases Validator y Transformer: Para validación y transformación automática de DTOs.

→ Dotenv: Como gestor central de variables de entorno.

→ Firebase Authentication (Google Sign-In): Módulo de autenticación utilizado para el inicio de sesión con cuentas de Google, gestionando tokens y roles de usuario.

→ WebSockets: Canal de comunicación en tiempo real para notificaciones entre servidor y clientes conectados.

→ Docker: Contenerización del backend y servicios asociados.

→ Docker Compose: Como orquestador de múltiples contenedores.

→ Git & GitHub: Control de versiones y colaboración en equipo.

→ Swagger: Soft para generar documentación. 
 http://localhost:3000/docs
 Esté es la URL de la documentación swagger del proyecto 

→ Postman: Herramienta para pruebas y validación de endpoints durante el desarrollo.

---

# Variables de entorno para archivo .env

# App
NODE_ENV=development
APP_PORT=3000

# Base de datos
DB_HOST=db
DB_PORT=3306
DB_NAME=padel
DB_USER=padel
DB_PASS=padel
DB_DIALECT=mysql

# Autenticación Google (Ver rama oAuth-Google-JWT)
GOOGLE_CLIENT_ID=Pegar la client ID del servicio 
GOOGLE_CLIENT_SECRET=Pegar la cliente Secret del servicio
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# JWT
JWT_SECRET=Pegar KEY JWT

---

# Compilación y ejecución

1- Clona el repositorio: https://github.com/XAcademy-e-2-mayo-25/Padel-Server.git

2- Desde la raiz del repo /Padel-Server ejecutar: npm install (para instalar dependencias de Node)

3- Crear archivo .env y configurar variables de entorno

4- Crear y levantar contenedores por primera vez: docker compose up --build (levanta contenedores back + base de datos e integra a datos semillas a las tablas configuradas)

5- Si los contenedores ya fueron creados y se han sembrado las seeds en las tablas levantar proyecto con: docker compose up

6- Para eliminar los contenedores (por si se necesitan reconstruir en caso de modificar tablas/seeds o algun otro archivo que requiera reconstuir), usar los comandos:
    6.A - docker compose down -v (borra todo el volumen completo)
    6.B - docker compose build (compilación completa del back)
    6.C - docker compose up (levanta el contenedor backend)
    6.D - docker compose exec api npx sequelize-cli db:seed:all (desde otra consola para resembrar las seeds)
    6.E - De aqui en adelante, solo levantar con docker compose up o docker compose up --build (en caso de instalar algo nuevo en el back) para mantener la persistencia en la bd.

NOTA: Todos los comandos deben ser ejecutados desde la raiz del backend (donde se encuentra el archivo docker-compose.yml del back)
