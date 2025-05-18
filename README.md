# 🏨 Hotel Booking Backend

Este é o backend de um serviço de reservas de hotéis, desenvolvido com [NestJS](https://nestjs.com/) e integrado a diversas bibliotecas e ferramentas modernas para oferecer uma arquitetura escalável, modular e performática.

---

## 🚀 Tecnologias Utilizadas

- **NestJS** – Framework backend modular
- **Prisma ORM** – Abstração de banco de dados
- **TypeScript** – Superset do JavaScript
- **ESLint & Prettier** – Padronização e formatação
- **Redis & ioredis** – Cache e filas
- **Cache Manager** – Gerenciamento de cache
- **Mailer** – Envio de e-mails
- **JWT & Passport** – Autenticação segura
- **bcrypt** – Criptografia de senhas
- **class-transformer & class-validator** – DTOs e validação
- **date-fns** – Manipulação de datas
- **rxjs** – Programação reativa
- **uuid** – Identificadores únicos
- **reflect-metadata** – Metaprogramação

---

## 🧱 Estrutura do Projeto

```bash
├── src
│   ├── modules
│   │   ├── auth
│   │   │   ├── domain
│   │   │   ├── infra
│   │   │   ├── services
│   │   │   ├── utils
│   │   │   └── auth.module.ts
│   │   ├── prisma
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── users
│   │   ├── hotels
│   │   └── reservations
│   ├── shared
│   │   ├── decorators
│   │   ├── guards
│   │   └── middlewares
│   └── main.ts
│
├── test
├── .env
├── .env.example
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Funcionalidades

### Autenticação
- Login e registro com JWT
- Hash de senhas com bcrypt
- Refresh Token
- Passport strategies

### Usuários
- Cadastro, login e perfil
- Recuperação de senha por e-mail

### Hotéis
- Registro, listagem e detalhes
- Busca por filtros

### Reservas
- Criar, listar e cancelar reservas
- Validação de disponibilidade

### Utilitários
- Cache com Redis
- Validação de entrada (DTOs)
- Middlewares, guards e decorators customizados

---

## 📦 Instalação e Execução

### 🐳 Usando Docker

```bash
# Subir containers
docker-compose up -d

# Acessar o container da aplicação
docker exec -it hotel-api-backend sh

# Instalar dependências (se necessário)
yarn install

# Gerar cliente Prisma
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Iniciar aplicação
yarn start:dev
```

---

### 💻 Ambiente Local (sem Docker)

```bash
# Instale as dependências
yarn install

# Configure o .env
cp .env.example .env

# Suba o Redis e o banco com Docker
docker-compose up -d redis postgres

# Gere o Prisma Client
npx prisma generate

# Rode as migrations
npx prisma migrate dev

# Execute a aplicação
yarn start:dev
```

---

## 🧪 Testes

```bash
# Unitários
yarn test

# End-to-end
yarn test:e2e

# Cobertura
yarn test:cov
```

---

## 📁 Variáveis de Ambiente

### `.env.example`

```env
# Banco de dados
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hotel_db

# JWT
JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=3600s

# Email
MAILER_HOST=smtp.mailtrap.io
MAILER_PORT=2525
MAILER_USER=your_user
MAILER_PASS=your_password

# Redis
REDIS_URL=redis://localhost:6379
```

---

## 🐳 docker-compose.yml

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:15
    container_name: hotel-api-postgres
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: hotel_db
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    container_name: hotel-api-redis
    ports:
      - '6379:6379'

  app:
    container_name: hotel-api-backend
    build: .
    ports:
      - '3000:3000'
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app
    env_file:
      - .env
    command: sh -c "yarn install && yarn start:dev"

volumes:
  pgdata:
```

---

## ✅ Boas Práticas Adotadas

- Arquitetura por domínio: `domain`, `infra`, `services`, `utils`
- Validação com DTOs e `class-validator`
- Autenticação segura com JWT e `passport`
- Cache eficiente com Redis
- Separação de responsabilidades
- Padrões SOLID
- Testes automatizados

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---
