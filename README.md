# Gestão de Finanças

Uma aplicação para gerenciamento de finanças pessoais, despesas, investimentos e fundos de viagem. Permite acompanhar gastos, investimentos e planejar viagens com múltiplos usuários.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend**: API REST desenvolvida com Node.js, Express e MongoDB
- **Frontend**: Interface de usuário desenvolvida com Next.js e React

## Recursos Principais

- Dashboard com visão geral do mês atual
- Gerenciamento de despesas por categoria
- Acompanhamento de investimentos com cotações em tempo real (via Alpha Vantage API)
- Fundos de viagem compartilhados
- Suporte a múltiplas moedas (EUR, USD, GBP, BRL)
- Modo escuro/claro
- Visualização de dados por período (mensal/anual)

## Requisitos

- Node.js 16+
- MongoDB
- npm ou yarn
- Chave de API Alpha Vantage (para cotações de investimentos)

## Configuração e Execução

### Backend

1. Navegue até a pasta do backend:
   ```
   cd backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do backend (ou use o existente)
   - Configure as variáveis necessárias (MONGODB_URI, PORT)

4. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

### Frontend

1. Navegue até a pasta do frontend:
   ```
   cd frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do frontend (ou use o existente)
   - Configure as variáveis:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:4000/api
     NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=sua_chave_aqui
     ```

4. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```

5. Acesse a aplicação em `http://localhost:3000`

## Funcionalidades

- Cadastro e gerenciamento de usuários com salários
- Registro e visualização de despesas com categorias
- Visualização de gráficos de despesas por categoria e período
- Gerenciamento de investimentos com cotações em tempo real
- Cálculo de lucro/prejuízo em investimentos
- Gerenciamento de fundos de viagem compartilhados
- Dashboard com visão geral financeira
- Suporte a múltiplas moedas (EUR, USD, GBP, BRL)
- Modo escuro/claro para melhor experiência visual
- Visualização de dados anuais (01/25 a 12/25)

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS (com suporte a modo escuro)
- Recharts (para gráficos)
- React Toastify (para notificações)
- Alpha Vantage API (para cotações de investimentos)

## Implantação

- Backend: Render
- Frontend: Vercel
- Versionamento: GitHub