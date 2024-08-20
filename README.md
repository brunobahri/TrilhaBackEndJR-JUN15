![Código Certo Coders](https://utfs.io/f/3b2340e8-5523-4aca-a549-0688fd07450e-j4edu.jfif)

# 📚 Trilha Inicial BackEnd Jr
Este projeto tem como objetivo desenvolver uma API RESTful para gerenciamento de tarefas, proporcionando funcionalidades de CRUD (Create, Read, Update, Delete) de tarefas, autenticação de usuários e armazenamento dos dados em um banco de dados.

Para testar a API sem clonar o repositorio: 

https://trilhabackendjr-jun15.fly.dev/api-docs/

# Documentação da API

Esta API fornece funcionalidades de gerenciamento de usuários e tarefas. A autenticação é feita usando tokens JWT.

## Endpoints de Usuários

### Criar um novo usuário

**Endpoint:** `/api/user/register`

**Método:** `POST`

**Corpo da Requisição:**

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

### Resposta de Sucesso:

    Status: 201 Created
    Corpo:


```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "username": "testuser"
  }
}
```
### Erros Possíveis:

    Status: 400 Bad Request
    Corpo:

```json
{
  "message": "Usuário já existe"
}
```
### Login de um usuário

**Endpoint:** /api/user/login

**Método:** POST

Corpo da Requisição:

```json
{
  "username": "loginuser",
  "password": "testpassword"
}
```
Resposta de Sucesso:

    Status: 200 OK
    Corpo:

```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```
Erros Possíveis:

    Status: 401 Unauthorized
    Corpo:

```json
{
  "message": "Senha inválida"
}
```
Logout de um usuário

**Endpoint:** /api/user/logout

**Método:** GET

Resposta de Sucesso:

    Status: 200 OK
    Corpo:

```json
{
  "message": "Logout realizado com sucesso"
}
```
## Endpoints de Tarefas

### Criar uma nova tarefa

**Endpoint:** /api/tasks

**Método:** POST

Autenticação: Necessário token JWT no cabeçalho Authorization (Bearer <token>)

Corpo da Requisição:

```json
{
  "title": "Minha tarefa de teste",
  "description": "Descrição da tarefa de teste"
}
```
Resposta de Sucesso:

    Status: 201 Created
    Corpo:

```json
{
  "message": "Tarefa criada com sucesso",
  "task": {
    "title": "Minha tarefa de teste",
    "userId": 1
  }
}
```
Buscar todas as tarefas do usuário autenticado

**Endpoint:** /api/tasks

**Método:** GET

Autenticação: Necessário token JWT no cabeçalho Authorization (Bearer <token>)

Resposta de Sucesso:

    Status: 200 OK
    Corpo:

```json
[
  {
    "id": 1,
    "title": "Tarefa de teste",
    "description": "Descrição da tarefa",
    "completed": false,
    "userId": 1,
    "createdAt": "2024-08-20T01:53:47.956Z",
    "updatedAt": "2024-08-20T01:53:47.956Z"
  }
]
```
Atualizar uma tarefa

Endpoint: /api/tasks/:id

**Método:** PUT

Autenticação: Necessário token JWT no cabeçalho Authorization (Bearer <token>)

Corpo da Requisição:

```json
{
  "completed": true
}
```
Resposta de Sucesso:

    Status: 200 OK
    Corpo:

```json
{
  "message": "Tarefa atualizada com sucesso",
  "task": {
    "completed": true,
    "userId": 1
  }
}
```
## Deletar uma tarefa

**Endpoint:** /api/tasks/:id

**Método:** DELETE

Autenticação: Necessário token JWT no cabeçalho Authorization (Bearer <token>)

Resposta de Sucesso:

    Status: 200 OK
    Corpo:

```json
{
  "message": "Tarefa deletada com sucesso"
}
```