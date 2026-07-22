# XML Processor - NF-e

Sistema Full Stack para processamento, armazenamento e consulta de arquivos XML de Nota Fiscal Eletrônica (NF-e).

A aplicação permite realizar upload de arquivos XML, extrair informações das notas fiscais, armazenar os dados processados e disponibilizar consultas através de uma interface web com dashboard.

Projeto desenvolvido como teste técnico Full Stack.

---

# Funcionalidades

* Upload de múltiplos arquivos XML de NF-e
* Armazenamento dos arquivos enviados
* Leitura e extração de informações do XML
* Processamento dos dados da nota fiscal
* Persistência das informações processadas
* Dashboard com resumo das notas
* Listagem de notas fiscais processadas
* Consulta de notas não identificadas
* API documentada utilizando Swagger
* Logs estruturados utilizando Pino

---

# Arquitetura da Aplicação

O projeto é dividido em duas aplicações independentes:

```text
xml-processor
│
├── backend
│   │
│   ├── config
│   │   ├── database
│   │   ├── logger
│   │   └── swagger
|   |   └── queue
│   │
│   ├── controllers
│   │
│   ├── routes
│   │
│   ├── services
│   │
│   ├── models
│   │
│   ├── middlewares
|   |
|   ├──consumers
│   │
|   ├── repositories
|   |
│   └── uploads
│
└── frontend
    │
    ├── components
    ├── views
    ├── stores
    ├── services
    └── router
```

---

# Fluxo da Aplicação
```text
Usuário
   |
   | Upload XML
   ↓
Frontend Vue
   |
   | Requisição HTTP
   ↓
API Express
   |
   | Recebimento do arquivo
   ↓
Multer
   |
   | Leitura e validação
   ↓
Fast XML Parser
   |
   | Extração dos dados da NF-e
   ↓
Camada de Serviços
   |
   ↓
Persistência no Banco
   |
   ↓
Dashboard Web
```
---

# Frontend

## Tecnologias utilizadas

* Vue 3
* Vite
* Pinia
* Tailwind CSS
* Axios

---

## Instalação

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

---

# Backend

## Tecnologias utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* Multer
* Fast XML Parser
* Axios
* BullMQ
* Redis
* Pino Logger
* Swagger
* dotenv

---

# Instalação

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

# Configuração de ambiente

Crie um arquivo `.env`:

```env
PORT=3001

MONGODB_URI=sua_connection_string

CLIENTES_API=sua_connection_string
```

---

# Executando o backend

```bash
npm start
```

Servidor disponível em:

```text
http://localhost:3001
```

---

# Documentação da API

A documentação dos endpoints está disponível através do Swagger:

```text
http://localhost:3001/api-docs
```

A documentação permite visualizar e testar as rotas diretamente pelo navegador.

---

# Endpoints

## Upload de XML

### POST

```http
/xml/upload
```

Responsável pelo envio dos arquivos XML de NF-e.

Formato:

```text
multipart/form-data
```

Campo:

```text
xml
```

Aceita múltiplos arquivos.

---

## Listar notas fiscais

### GET

```http
/xml/notas
```

Retorna todas as notas fiscais processadas e armazenadas.

Exemplo de retorno:

```json
[
  {
    "numero": "123",
    "emitente": "Empresa Exemplo",
    "valorTotal": 1500.50,
    "status": "PROCESSADA"
  }
]
```

---

## Listar notas não identificadas

### GET

```http
/xml/nao-identificados
```

Retorna notas que não possuem identificação completa.

Exemplo:

```json
[
  {
    "numero": "456",
    "status": "NÃO IDENTIFICADA",
    "motivo": "Cliente não encontrado"
  }
]
```

---

## Resumo do dashboard

### GET

```http
/dashboard/resumo
```

Retorna informações consolidadas para exibição no dashboard.

---

# Processamento de XML

Os arquivos XML são processados seguindo as etapas:

1. Recebimento do arquivo através do upload.
2. Armazenamento temporário do XML.
3. Leitura utilizando `fast-xml-parser`.
4. Extração dos dados relevantes da NF-e.
5. Validação das informações.
6. Persistência dos dados processados.
7. Disponibilização através da API REST.

---

# Processamento assíncrono

A aplicação possui estrutura preparada para processamento assíncrono utilizando:

* BullMQ
* Redis

Essa abordagem permite:

* Processar grandes volumes de XML;
* Evitar bloqueio das requisições;
* Controlar filas de processamento;
* Realizar novas tentativas em caso de falha.

---

# Tratamento de erros

A aplicação possui:

* Middleware global de erros;
* Logs estruturados;
* Tratamento de falhas no processamento;
* Validação de arquivos enviados;
* Controle de erros de integração.

---

# Banco de Dados

## MongoDB

Utilizado para armazenamento das informações das notas fiscais processadas.

Biblioteca:

```text
Mongoose
```

---

## PostgreSQL

Dependência disponível para integrações futuras ou persistência alternativa.

Biblioteca:

```text
pg
```

---

# Melhorias futuras

* Autenticação e autorização de usuários
* Histórico de processamento dos arquivos
* Exportação de relatórios
* Testes automatizados
* Dockerização da aplicação
* Monitoramento de filas
* Deploy em ambiente cloud

---

# Requisitos

* Node.js 20+
* MongoDB
* Redis (para processamento por fila)

---

# Desenvolvedor

**Miguel Santos**

Projeto desenvolvido como teste técnico Full Stack com foco em processamento de XML de NF-e, arquitetura backend, integração frontend e organização de APIs.
