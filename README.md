# AguaFix API

API para que los ciudadanos reporten fugas de agua en la vía pública. Al crear un reporte,
el sistema lo guarda en base de datos y envía un correo de aviso a la cuadrilla de
mantenimiento con los datos de la fuga.

## Tecnologías

- NestJS 11 + TypeScript
- PostgreSQL + TypeORM (migraciones, `synchronize: false`)
- `env-var` + `dotenv` para variables de entorno
- `bcryptjs` para el hasheo de contraseñas
- `nodemailer` para el envío de correos

## Configuración

1. Copia `.env.example` a `.env` y ajusta los valores según tu entorno (necesitas una
   instancia de PostgreSQL y credenciales SMTP disponibles).
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta las migraciones:

   ```bash
   npm run migration:run
   ```

4. Inicia la API en modo desarrollo:

   ```bash
   npm run start:dev
   ```

## Endpoints

### Autenticación

- `POST /auth/register` — crea un usuario del sistema (`CreateUserDto`).
- `POST /auth/login` — inicia sesión (`LoginDto`). Si las credenciales son inválidas
  responde con `400 Bad Request`.

### Reportes de fugas

- `POST /reports` — crea un reporte de fuga (`CreateReportDto`), lo guarda en la base
  de datos y envía un correo a la cuadrilla de mantenimiento con los datos de la fuga.
- `GET /reports` — lista todos los reportes registrados.

## Pruebas

```bash
npm run test
```
