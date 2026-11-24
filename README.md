# Taskly API

API REST para gerenciamento de tarefas, desenvolvida com Node.js, TypeScript, Express e PostgreSQL.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento backend, organização de código, arquitetura em camadas, persistência de dados e testes automatizados.

## Objetivo do projeto

Consolidar conhecimentos em desenvolvimento backend, APIs REST, bancos de dados relacionais, arquitetura de software e qualidade de código.

## Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Vitest
- Supertest
- Git

## Funcionalidades

- Cadastro de tarefas
- Listagem de tarefas
- Busca por ID
- Atualização de tarefas
- Atualização de status
- Exclusão de tarefas
- Validação de dados
- Tratamento centralizado de erros
- Registro de requisições
- Testes automatizados

## Arquitetura

```text
src/
├── controllers/
│   └── tarefa.controller.ts
├── services/
│   └── tarefa.service.ts
├── routes/
│   └── tarefa.routes.ts
├── middlewares/
│   ├── logger.middleware.ts
│   ├── error.middleware.ts
│   └── notFound.middleware.ts
├── prisma.ts
├── app.ts
└── server.ts
```

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /tarefas | Listar tarefas |
| GET | /tarefas/:id | Buscar tarefa por ID |
| POST | /tarefas | Criar tarefa |
| PUT | /tarefas/:id | Atualizar tarefa |
| PATCH | /tarefas/:id | Atualizar status |
| DELETE | /tarefas/:id | Excluir tarefa |

## Executando localmente

É necessário possuir Node.js e PostgreSQL instalados.

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example` e configure a conexão com o PostgreSQL.

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/taskly?schema=public"
PORT=3000
```

### 3. Execute as migrations

```bash
npx prisma migrate dev
```

### 4. Gere o Prisma Client

```bash
npx prisma generate
```

### 5. Compile e execute a aplicação

```bash
npx tsc
node dist/server.js
```

A API estará disponível em `http://localhost:3000`, considerando a porta padrão.

## Exemplo de requisição

**POST /tarefas**

```json
{
    "titulo": "Estudar desenvolvimento backend"
}
```

Resposta esperada: `201 Created`.

```json
{
    "id": 1,
    "titulo": "Estudar desenvolvimento backend",
    "concluida": false
}
```

## Testes automatizados

Para executar os testes:

```bash
npx vitest run
```

Os testes utilizam Vitest e Supertest, com mocks da camada de Service para verificar o comportamento das rotas sem modificar os dados do banco.
