# PathForge — Learning Path Platform

Plataforma web para descubrir caminos profesionales en tecnología, seguir rutas de aprendizaje personalizadas y practicar con ejercicios de código evaluados automáticamente.


## Stack Tecnológico

**Backend:** Node.js 20 + TypeScript, AWS Lambda + API Gateway, CloudWatch, Prisma ORM  
**Base de datos:** PostgreSQL
**Infraestructura:** Serverless Framework v4, AWS SQS, S3, EventBridge, Cognito, Docker
**Frontend:** React 18 + TypeScript, Tailwind CSS, shadcn/ui *(en desarrollo)*



## Casos de Uso

- **Career Discovery** — Algoritmo de scoring que recomienda caminos profesionales según el perfil del usuario
- **Learning Paths** — Rutas de aprendizaje personalizadas con módulos, prerequisitos y tracking de progreso  
- **Code Execution** — Editor integrado con evaluación automática de código en sandbox Docker

## Desarrollo Local

### Prerequisitos
- Node.js 20+
- Docker Desktop
- AWS CLI configurado

### Setup
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL

# Levantar PostgreSQL local
docker-compose up -d

# Correr migraciones
npm run db:migrate

# Generar cliente Prisma
npm run db:generate

# Iniciar servidor local
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor local con serverless-offline |
| `npm run build` | Verificar tipos TypeScript |
| `npm run deploy:dev` | Deploy a AWS (stage dev) |
| `npm run deploy:prod` | Deploy a AWS (stage prod) |
| `npm run db:migrate` | Correr migraciones de base de datos |
| `npm run db:generate` | Regenerar cliente Prisma |
| `npm run db:studio` | Abrir Prisma Studio |
| `npm run db:seed` | correr el seed generado de base de datos |
  



## Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:
```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/pathforge"
STAGE=dev
```

## Estado del Proyecto

- [x] Estructura base del proyecto
- [x] Schema de base de datos completo
- [x] Entorno de desarrollo local
- [ ] Autenticación con Cognito
- [ ] Career Discovery
- [ ] Learning Paths
- [ ] Code Execution Engine
- [ ] CI/CD con GitHub Actions