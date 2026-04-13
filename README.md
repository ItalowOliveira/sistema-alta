# Sistema Alta

Aplicacao full stack para gestao de altas hospitalares, com foco em fluxo multiprofissional.

O sistema permite:
- autenticar usuarios por sessao (cookie);
- cadastrar e consultar pacientes;
- gerenciar registros de alta;
- preencher documentos clinicos (PTS e PTAs por especialidade);
- acompanhar indicadores no dashboard;
- controlar acesso por perfil de usuario.

## Resumo do projeto

O projeto esta organizado em dois modulos:
- `backend/`: API REST em Node.js + Express + TypeScript, conectada ao PostgreSQL.
- `frontend/`: SPA em React + TypeScript (Vite), com Tailwind CSS e React Router.

A API expoe recursos para usuarios, pacientes, dashboard, altas, PTS e PTAs (enfermagem, fisioterapia, nutricao, psicologia e servico social).
No frontend, as telas principais cobrem login, dashboard, cadastro de pacientes, gerenciamento de usuarios, impressoes e altas.

## Funcionalidades principais

- Autenticacao e sessao
  - Login (`/usuarios/login`)
  - Logout (`/usuarios/logout`)
  - Consulta da sessao atual (`/usuarios/me`)
  - Protecao de rotas no frontend (`ProtectedRoute` e `RoleProtectedRoute`)

- Gestao de usuarios
  - Criacao de usuario
  - Listagem de usuarios com restricao por papeis (`Admin` e `Medico`)

- Gestao de pacientes
  - Cadastro de pacientes
  - Listagem de pacientes

- Dashboard
  - Quantitativo geral
  - Metricas agregadas (pacientes, medicos, altas totais e pendentes)

- Gestao de altas
  - Criar alta
  - Listar altas
  - Finalizar alta
  - Paginacao e busca no frontend

- Documentos assistenciais
  - PTS: criacao e consulta por id
  - PTA por especialidade:
    - Enfermagem
    - Fisioterapia
    - Nutricao
    - Psicologia
    - Servico Social

- Interface
  - Layout com navbar e sidebar
  - Controle de acesso por perfil
  - Modais para preenchimento dos PTAs

## Tecnologias usadas

### Backend
- Node.js
- TypeScript
- Express
- PostgreSQL (`pg`)
- CORS
- bcrypt
- ts-node-dev (dev)

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4
- Axios
- Lucide React (icones)

## Estrutura de pastas

```text
sistema-alta-main/
  backend/
    src/
      controllers/
      middleware/
      repositories/
      routes/
      services/
    sql/
  frontend/
    src/
      api/
      componentes/
      pages/
```

## Endpoints principais (backend)

Base URL local: `http://localhost:3000`

- Usuarios
  - `POST /usuarios`
  - `GET /usuarios`
  - `POST /usuarios/login`
  - `POST /usuarios/logout`
  - `GET /usuarios/me`

- Pacientes
  - `POST /pacientes`
  - `GET /pacientes`

- Dashboard
  - `GET /dashboard`
  - `GET /dashboard/metrics`

- Altas
  - `POST /altas`
  - `GET /altas`
  - `POST /altas/:id/finalizar`

- PTS
  - `POST /pts`
  - `GET /pts/:id`

- PTAs
  - `POST /ptas/enfermagem` e `GET /ptas/enfermagem/:id`
  - `POST /ptas/fisioterapia` e `GET /ptas/fisioterapia/:id`
  - `POST /ptas/nutricao` e `GET /ptas/nutricao/:id`
  - `POST /ptas/psicologia` e `GET /ptas/psicologia/:id`
  - `POST /ptas/servicosocial` e `GET /ptas/servicosocial/:id`

## Como executar localmente

## 1. Pre-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm

## 2. Banco de dados
1. Crie o banco `sistema_saude` no PostgreSQL.
2. Ajuste as credenciais em `backend/src/db.ts` (usuario, senha, host, porta).
3. Execute os scripts SQL necessarios em `backend/sql/`.

## 3. Backend
```bash
cd backend
npm install
npm run dev
```

Servidor padrao: `http://localhost:3000`

## 4. Frontend
1. Crie o arquivo `.env` em `frontend/`:
```env
VITE_API_URL=http://localhost:3000
```
2. Execute:
```bash
cd frontend
npm install
npm run dev
```

Frontend padrao: `http://localhost:5173`

## Scripts

### Backend
- `npm run dev`: sobe API com `ts-node-dev`

### Frontend
- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producao
- `npm run preview`: preview local do build
- `npm run lint`: analise de lint

## Observacoes

- O backend usa armazenamento de sessao em memoria (`sessionStore.ts`), adequado para desenvolvimento.
- A configuracao de CORS esta apontada para `http://localhost:5173`.
- Recomenda-se mover credenciais do banco para variaveis de ambiente antes de publicar em producao.

## Estado atual

Projeto funcional para operacao local e evolucao incremental. Boa base para:
- endurecimento de seguranca (sessao persistente e segredos em env);
- padronizacao de chamadas de API no frontend;
- cobertura de testes automatizados.
