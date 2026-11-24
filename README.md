# Taskly API

API REST para gerenciamento de tarefas, desenvolvida com Node.js, TypeScript e PostgreSQL, utilizando arquitetura em camadas, persistência de dados, testes automatizados e documentação interativa.

O projeto foi desenvolvido com o objetivo de aprofundar conhecimentos em desenvolvimento backend, arquitetura de software, bancos de dados relacionais e deploy de aplicações na nuvem.

## Demonstração online

A aplicação está hospedada no Render e utiliza PostgreSQL na nuvem através do Neon.

**Documentação interativa (Swagger UI):**
https://taskly-gerenciador-de-tarefas.onrender.com/docs/

- Permite testar todas as operações da API diretamente pelo navegador.

**Listagem de tarefas (JSON):**
https://taskly-gerenciador-de-tarefas.onrender.com/tarefas

- Permite visualizar os registros armazenados no banco de dados, incluindo as tarefas cadastradas através do Swagger.

> Por utilizar hospedagem gratuita, a primeira requisição após um período de inatividade pode demorar cerca de um minuto.

### Como testar a API

1. Acesse a documentação interativa do Swagger.
2. Selecione o endpoint desejado.
3. Clique em **Try it out**.
4. Preencha os parâmetros ou o corpo da requisição, quando necessário.
5. Clique em **Execute**.
6. Consulte o código HTTP e os dados retornados em **Server response**.

### Persistência de dados

Na interface do Swagger:

- **Example Value:** apresenta um exemplo estático definido na documentação.
- **Response body:** apresenta os dados reais retornados pela API após a execução de uma requisição.

Ao atualizar a página, o Swagger limpa as respostas das requisições anteriores. Entretanto, os dados cadastrados permanecem armazenados no PostgreSQL.

Para consultar os registros atualizados, execute novamente o endpoint `GET /tarefas` ou acesse o link de listagem de tarefas.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Swagger UI / OpenAPI
- Vitest
- Supertest
- Render
- Neon
- Git e GitHub

## Funcionalidades

- Criação de tarefas
- Listagem de tarefas
- Busca de tarefas por ID
- Atualização completa de tarefas
- Atualização parcial de status
- Exclusão de tarefas
- Validação de dados
- Tratamento centralizado de erros
- Registro de requisições HTTP
- Persistência de dados
- Documentação interativa
- Testes automatizados

## Arquitetura do projeto

O projeto utiliza uma arquitetura em camadas, promovendo a separação de responsabilidades, organização e manutenibilidade do código.

```text
taskly/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   ├── docs/
│   │   └── swagger.ts
│   ├── app.ts
│   ├── prisma.ts
│   └── server.ts
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

### Fluxo de uma requisição

```text
Requisição HTTP
      ↓
    Routes
      ↓
  Controllers
      ↓
    Services
      ↓
   Prisma ORM
      ↓
   PostgreSQL
```

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/tarefas` | Listar todas as tarefas |
| GET | `/tarefas/:id` | Buscar tarefa por ID |
| POST | `/tarefas` | Criar tarefa |
| PUT | `/tarefas/:id` | Atualizar tarefa |
| PATCH | `/tarefas/:id` | Atualizar status |
| DELETE | `/tarefas/:id` | Excluir tarefa |

### Exemplo de requisição

**POST /tarefas**

```json
{
    "titulo": "Estudar backend"
}
```

**Resposta — 201 Created**

```json
{
    "id": 1,
    "titulo": "Estudar backend",
    "concluida": false
}
```

## Executando o projeto localmente

Caso queira executar o Taskly em sua própria máquina, siga as instruções de instalação e configuração abaixo.

### Pré-requisitos

- Node.js compatível com Prisma 7
- PostgreSQL
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/camilasantos25/TASKLY_gerenciador_de_tarefas.git
cd TASKLY_gerenciador_de_tarefas
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um banco de dados chamado `taskly` no PostgreSQL.

Crie um arquivo `.env` na raiz do projeto utilizando o arquivo `.env.example` como referência.

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/taskly?schema=public"
PORT=3000
```

Substitua os valores pelas suas credenciais locais.

### 4. Configure o banco de dados

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Compile e execute a aplicação

```bash
npx tsc
node dist/server.js
```

A documentação interativa estará disponível em:
http://localhost:3000/docs/

## Testes automatizados

Os testes foram desenvolvidos utilizando Vitest e Supertest, com mocks da camada de serviços para verificar o comportamento dos endpoints sem depender de operações reais no banco de dados.

Para executar os testes:

```bash
npx vitest run
```

## Infraestrutura e deploy

| Tecnologia | Responsabilidade |
|---|---|
| Render | Hospedagem da aplicação backend |
| Neon | Banco de dados PostgreSQL na nuvem |
| Swagger UI | Documentação interativa da API |
| GitHub | Versionamento do código-fonte |

O ambiente de produção é independente do ambiente de desenvolvimento local, permitindo que a API permaneça disponível sem depender do computador utilizado durante seu desenvolvimento.

## Observações

O Taskly é um projeto educacional e de portfólio.

A API pública não possui autenticação e utiliza um banco de dados compartilhado. Todos os usuários podem consultar, cadastrar, modificar e excluir tarefas. Portanto, utilize exclusivamente dados fictícios.