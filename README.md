# 🚀 TEN-DASH - To-Do List

**Stack**: NestJS (Backend) + Next.js (Frontend) + Docker + TypeScript
### 1️⃣ Pré-requisitos
```bash
# Instale o Node.js 18+ (se não tiver)
# https://nodejs.org

# Instale o pnpm globalmente
$ npm install -g pnpm
```

### 2️⃣ Configure o Docker
**Windows/Mac:**
1. Baixe e instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Abra o Docker Desktop e aguarde inicializar
3. Verifique se está funcionando: `docker --version`

### 3️⃣ Execute
```bash
# Acesse o repositório
$ cd ten-dash

# Instale dependências (importante!)
$ pnpm install

# Execute via Docker (isso pode levar alguns minutos na primeira vez)
$ docker compose up --build

# ✅ Pronto! Acesse:
# 🎨 Frontend: http://localhost:3000
# 🔧 Backend:  http://localhost:4000
```

### 4️⃣ Rodar Testes
```bash
# 🧪 Backend - Testes Unitários
$ cd apps/backend
$ pnpm test                    # Todos os testes
$ pnpm test:watch             # Modo watch (reexecuta ao salvar)
$ pnpm test:cov               # Com cobertura

# 🎨 Frontend - Testes de Componentes  
$ cd apps/frontend
$ pnpm test                    # Todos os testes
$ pnpm test:watch             # Modo watch
$ pnpm test -- --coverage    # Com cobertura
```

### 5️⃣ Verificar se está funcionando
- Abra http://localhost:3000
- Você deve ver a interface do To-Do List
- Teste criar uma nova tarefa
- Teste marcar como concluída na actions da table

**Para parar:** `Ctrl+C` ou `docker compose down`

---

## Description
Containers:
Optei por um monorepo com docker

Para este case usei NestJs para BackEnd e NextJs para front.

### Backend - Arquitetura Modular

No Backend optei por uma estrutura simples de arquitetura modular, assim cada módulo possui seu próprio contexto e suas dependências:

```
apps/backend/src/
├── main.ts                          # Entry point da aplicação
├── app.module.ts                    # Módulo principal do NestJS
├── app.controller.ts                # Controller raiz
├── app.service.ts                   # Service raiz
├── utils/                           # Utilitários compartilhados
│   └── base-entity.ts              # Entidade base com ID e timestamps
│
└── modules/                         # Módulos de domínio
    └── tasks/                       # Módulo de Tasks
        ├── controller/              # Camada de apresentação
        │   └── task.controller.ts   # Endpoints REST (GET, POST, PATCH)
        │
        ├── use-cases/               # Camada de aplicação
        │   ├── task.service.ts      # Regras de negócio e orquestração
        │   ├── task.service.spec.ts # Testes unitários
        │   └── task.module.ts       # Configuração do módulo
        │
        ├── domain/                  # Camada de domínio
        │   ├── entities/            # Entidades de negócio
        │   │   └── task.ts          # Entidade Task com status
        │   ├── dtos/                # Data Transfer Objects
        │   │   └── task-dto.ts      # DTO para criação de tasks
        │   ├── enum.ts              # Enums (TaskStatus: PENDING/COMPLETED)
        │   └── abstracts/           # Interfaces e abstrações
        │       └── base-repository.ts # Interface do repositório
        │
        └── repository/              # Camada de infraestrutura
            ├── base-in-memory-repository.ts # Implementação base CRUD
            └── task-in-memory-repository.ts # Repositório com toggle status
```

**Princípios aplicados**: Clean Architecture, SOLID, Inversão de Dependência, Separação de Responsabilidades.

### Frontend - Arquitetura Feature-Driven

Já no front, apesar de estar usando NextJs, eu não implementei à nível de server components por não haver necessidade ao meu ver, usei Next apenas à nível de proximidade com a stack da vaga e por gostar mesmo:

```
apps/frontend/
├── app/                             # App Router do Next.js 15
│   ├── layout.tsx                   # Layout raiz com providers
│   ├── page.tsx                     # Página inicial com TaskTable
│   ├── providers.tsx                # React Query Provider
│   ├── globals.css                  # Estilos globais + Tailwind
│   │
│   ├── config/                      # Configurações centralizadas
│   │   ├── index.ts                 # Config da API
│   │   └── query-config.ts          # Configuração do React Query
│   │
│   └── features/                    # Features organizadas por domínio
│       └── task/                    # Feature de Tasks
│           ├── components/          # Componentes da feature
│           │   ├── task-table/      # Tabela com colunas e ações
│           │   │   ├── task-table.tsx           # Componente principal
│           │   │   ├── task-table-columns.tsx   # Definição das colunas
│           │   │   ├── task-table-actions.tsx   # Ações (toggle status)
│           │   │   └── task-table-states.tsx    # Estados (loading/error)
│           │   │
│           │   └── create-task/     # Modal de criação
│           │       ├── create-task-dialog.tsx   # Dialog wrapper
│           │       ├── task-form.tsx            # Formulário validado
│           │       └── task-form-simple.test.tsx # Testes
│           │
│           ├── services/            # Hooks de integração com API
│           │   ├── use-create-task.tsx          # Mutation para criar
│           │   ├── use-change-task-status.tsx   # Mutation para status
│           │   ├── use-get-tasks.tsx            # Query para listar
│           │   └── index.ts         # Barrel exports
│           │
│           └── types/               # Tipagem TypeScript
│               ├── task.ts          # Interface Task
│               ├── table.ts         # Tipos para React Table
│               └── index.ts         # Exports centralizados
│
├── components/                      # Componentes reutilizáveis
│   ├── ui/                         # Design System (shadcn/ui)
│   │   ├── button.tsx              # Botões com variants
│   │   ├── input.tsx               # Inputs validados
│   │   ├── table.tsx               # Componentes de tabela
│   │   ├── dialog.tsx              # Modais e overlays
│   │   ├── tooltip.tsx             # Tooltips acessíveis
│   │   └── ...                     # Outros componentes UI
│   │
│   └── custom/                     # Componentes customizados
│       ├── container.tsx           # Layout responsivo com header/footer
│       └── index.ts                # Exports organizados
│
├── lib/                            # Utilitários e helpers
│   └── utils.ts                    # Função cn() para classes CSS
│
├── jest.config.js                  # Configuração de testes
├── jest.setup.ts                   # Setup com polyfills
├── next.config.ts                  # Config Next.js com imagens
└── tailwind.config.ts              # Config Tailwind CSS
```

**Princípios aplicados**: Feature-Driven Development, Component Composition, Custom Hooks, Tipagem Forte, Testes

## 🧪 Executar Testes

### Backend - Testes Unitários
```bash
# Navegar para o backend
$ cd apps/backend

# Todos os testes unitários
$ pnpm run test

# Testes em modo watch (desenvolvimento)
$ pnpm run test:watch

# Testes com coverage
$ pnpm run test:cov

# Teste específico (ex: TaskService)
$ pnpm run test task.service.spec.ts

# Testes e2e
$ pnpm run test:e2e
```

### Frontend - Testes de Componentes
```bash
# Navegar para o frontend
$ cd apps/frontend

# Todos os testes
$ pnpm run test

# Testes em modo watch
$ pnpm run test:watch

# Teste específico (ex: TaskForm)
$ pnpm run test task-form-simple.test.tsx

# Testes com coverage
$ pnpm run test -- --coverage
```

### 🎯 Destaques dos Testes
- **Backend**: Testes unitários com padrões(comentários em português, cenários realistas)
- **Frontend**: Testes de componentes com simulação real de usuário via Testing Library
- **Cobertura**: Ambos incluem casos extremos e validações de acessibilidade

## 🛠️ Comandos Úteis

### Docker
```bash
# Parar containers
$ docker compose down

# Rebuild completo (limpa cache)
$ docker compose down && docker compose up --build --force-recreate

# Ver logs
$ docker compose logs -f

# Ver logs específicos
$ docker compose logs -f backend
$ docker compose logs -f frontend
```

### Desenvolvimento
```bash
# Instalar dependência em workspace específico
$ pnpm add <package> --filter backend
$ pnpm add <package> --filter frontend

# Executar script específico
$ pnpm --filter backend run test
$ pnpm --filter frontend run build
```

## 📋 Funcionalidades Implementadas

### ✅ Backend (NestJS)
- **CRUD de Tasks**: Criar, listar e alterar status
- **Arquitetura Modular**: Clean Architecture com separação de camadas
- **Repository Pattern**: Implementação in-memory com interface abstrata
- **Testes Unitários**: Cobertura completa com padrões
- **Validação**: DTOs com validação de entrada
- **CORS**: Configurado para frontend local

### ✅ Frontend (Next.js)
- **Interface Responsiva**: Design adaptável com Tailwind CSS
- **Gerenciamento de Estado**: React Query para cache e sincronização
- **Componentes Reutilizáveis**: Design system com shadcn/ui
- **Formulários Validados**: Criação de tasks com validação real-time
- **Tabela Interativa**: React Table com sorting, filtros e ações
- **Testes de Componente**: Testing Library com cenários realistas
- **Tooltips e UX**: Melhorias de usabilidade

### 🔧 DevOps & Qualidade
- **Monorepo**: Workspace organizado com pnpm
- **Docker**: Containerização completa com multi-stage builds
- **TypeScript**: Tipagem forte em ambas aplicações
- **ESLint**: Linting consistente
- **Testes**: Unitários (backend) + Componentes (frontend)

**Desenvolvido com ❤️ usando NestJS + Next.js**
