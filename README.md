# DevPath - Learning Path Platform + Code Execution

Plataforma cloud-native serverless que demuestra AWS Serverless Architecture.

## 🛠️ Tech Stack
**Frontend**: React 18 + TypeScript + Tailwind + shadcn/ui + Monaco Editor  
**Backend**: Node.js 20 + Express + Prisma + AWS Lambda + API Gateway  
**Database**: PostgreSQL (Neon Serverless Prod | Docker Local Dev)  
**Auth**: AWS Cognito  
**Code Execution**: Lambda + Docker Sandbox + SQS  
**Infra**: Serverless Framework + GitHub Actions + CloudWatch + X-Ray

## 🚀 Quickstart
```bash
# Database local
docker compose up postgres -d

# Backend dev
cd backend && npm i && npm run dev

# Frontend dev  
cd ../frontend && npm i && npm run dev:client

cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2026 DevPath Team

Permission is hereby granted, free of charge...
