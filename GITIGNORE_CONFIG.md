# .gitignore Configuration - Ten Dash Monorepo

## ✅ Configurações Implementadas

### 📦 **Node.js & Package Managers**

- ✅ `node_modules/` - Todas as dependências (raiz e subprojetos)
- ✅ `**/node_modules/` - Dependências em qualquer nível
- ✅ `apps/backend/node_modules/` - Específico do backend
- ✅ `apps/frontend/node_modules/` - Específico do frontend (quando criado)
- ✅ `package-lock.json` - Lock file do npm
- ✅ `yarn.lock` - Lock file do yarn
- ✅ `.pnpm-store/` - Cache do pnpm

### 🏗️ **Builds & Outputs**

- ✅ `dist/` - Builds compilados
- ✅ `apps/backend/dist/` - Build específico do backend
- ✅ `apps/frontend/.next/` - Build do Next.js
- ✅ `apps/frontend/out/` - Export estático do Next.js
- ✅ `build/` - Builds genéricos

### 📊 **Testes & Coverage**

- ✅ `coverage/` - Relatórios de cobertura
- ✅ `**/coverage/` - Coverage em subprojetos
- ✅ `.nyc_output/` - NYC coverage output
- ✅ `test-results/` - Resultados de testes

### 🔧 **Cache & Temporários**

- ✅ `.cache/` - Cache geral
- ✅ `.next/` - Cache do Next.js
- ✅ `.temp/`, `.tmp/` - Arquivos temporários

### 💻 **Editores & IDEs**

- ✅ `.vscode/*` (mantém configurações importantes)
- ✅ `.idea/` - JetBrains IDEs
- ✅ `*.sublime-*` - Sublime Text

### 🌍 **Environment Variables**

- ✅ `.env*` - Todos os arquivos de ambiente
- ✅ `.env.local` - Desenvolvimento local
- ✅ `.env.*.local` - Ambientes específicos

### 🖥️ **Sistema Operacional**

- ✅ `.DS_Store` - macOS
- ✅ `Thumbs.db` - Windows
- ✅ `*~` - Linux backup files

## 🎯 **Benefícios desta Configuração:**

1. **Segurança**: Evita commit de:
   - Dependências (node_modules)
   - Secrets (arquivos .env)
   - Builds (podem ser regenerados)

2. **Performance**: Reduz tamanho do repositório:
   - node_modules podem ter centenas de MB
   - Builds são regeneráveis

3. **Colaboração**: Evita conflitos:
   - Configurações específicas de IDE
   - Arquivos de sistema operacional
   - Caches pessoais

4. **Monorepo Ready**: Suporta:
   - Backend (NestJS)
   - Frontend (Next.js)
   - Packages compartilhados

## 🔍 **Arquivos que SERÃO commitados:**

- ✅ `pnpm-lock.yaml` - Lock file do pnpm
- ✅ `package.json` - Configuração de dependências
- ✅ `src/**` - Código fonte
- ✅ `tsconfig.json` - Configuração TypeScript
- ✅ `*.config.js` - Configurações de ferramentas
- ✅ `.vscode/settings.json` - Configurações compartilhadas do VS Code

## 🚫 **Arquivos que NÃO SERÃO commitados:**

- ❌ `node_modules/` - Dependências
- ❌ `dist/` - Builds
- ❌ `.env*` - Variáveis de ambiente
- ❌ `coverage/` - Relatórios de teste
- ❌ `.cache/` - Arquivos de cache
