📙 README — Genesis Core API (Backend)

Backend em Java Spring Boot • White-label • JWT • API oficial do Genesis

# Genesis Core API | Backend Oficial do Projeto Genesis

**Versão:** 1.0.0  
**Tecnologia:** Java 17 + Spring Boot  
**Função:** API central para o ecossistema Genesis  
**Status:** Em desenvolvimento

---

## 🔭 Visão Geral

O **Genesis Core API** é o backend responsável por fornecer todos os serviços necessários para o funcionamento do sistema Genesis.  
Ele é totalmente integrado ao Frontend (SPA React) e oferece suporte a:

- Autenticação e autorização com JWT
- Configuração White-label (cores, logo, textos…)
- Painel administrativo (CMS)
- Gestão de usuários
- Informações públicas do site
- Comunicação centralizada com a interface web

O propósito dessa API é garantir que **um único backend** consiga atender **várias empresas**, cada uma com sua própria identidade visual, sem necessidade de múltiplas instalações.

---

## ⚙️ Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3**
- **Spring Web**
- **Spring Security + JWT**
- **Spring Data JPA / Hibernate**
- **MySQL ou PostgreSQL**
- **ModelMapper para conversões**
- **Lombok para simplificar o código**

---

## 🧩 Funcionalidades Principais

### 1. 🎨 Sistema White-label
O backend é responsável por entregar ao Frontend toda a identidade visual configurada pelo cliente:

- Cores personalizadas
- Logo principal
- Slogan
- Textos do site
- Configurações gerais

Rotas principais:

- **GET** `/api/config/public`  
  → Usado pelo Frontend ao iniciar a aplicação para montar o layout.

- **POST** `/api/config`  
  → Usado no painel administrativo para atualizar as informações do cliente.

---

### 2. 🔐 Autenticação com JWT
Sistema completo de login com proteção de rotas.

- Login retorna token JWT
- Usuário autenticado acessa rotas protegidas
- Interceptor do Frontend insere o token automaticamente

Endpoints:

- **POST** `/auth/login`
- **GET** `/auth/me`

---

### 3. 🧑‍💼 Módulo de Usuários
Inclui:

- CRUD completo
- Perfis de acesso (ROLE_USER, ROLE_ADMIN)
- Controle de permissões utilizando Spring Security

---

## 🗂️ Estrutura do Projeto



src/
├── controller/ → Controladores REST
├── service/ → Regras de negócio
├── repository/ → Camada de acesso ao banco
├── model/ → Entidades JPA
├── dto/ → Objetos de transferência
├── mapper/ → Conversões DTO ↔ Entity
└── config/ → Segurança, CORS, Beans, JWT etc.


---

## 🏗️ Como rodar o projeto

### Pré-requisitos
- Java 17 instalado
- Maven 3.8 ou superior
- Banco MySQL ou PostgreSQL em execução

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/genesis-backend.git
cd genesis-backend

2. Configurar o arquivo application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/genesis
spring.datasource.username=root
spring.datasource.password=123456

# Permitir o Frontend acessar a API
genesis.frontend.cors=http://localhost:5173

3. Executar
mvn spring-boot:run


A API será iniciada em:

http://localhost:8080

🔌 Integração Direta com o Frontend

O Frontend (SPA React) consome diretamente estes endpoints:

/auth/login – autenticação

/api/config/public – carregamento do tema

/api/config – painel admin

/api/users/ – gestão de usuários

/api/dashboard – dados internos

Toda a comunicação é feita via JSON.

🤝 Repositórios Relacionados

Frontend (React + Vite):
https://github.com/FernandoBack/genesis-frontend