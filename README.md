# Genesis Core API | Enterprise Scaffolding Engine

**Versão:** 1.0.0-SNAPSHOT  
**Ambiente:** Produção / Desenvolvimento

---

## 🔭 Visão Geral do Projeto

O **Genesis Core** é uma arquitetura de referência (boilerplate) de alto desempenho, projetada para acelerar a entrega de aplicações web corporativas customizadas.

Diferente de CMSs monolíticos tradicionais (como WordPress) ou soluções SaaS genéricas, o Genesis opera no modelo de **Fábrica de Software Single-Tenant**. Isso significa que ele combina a agilidade de setup de um template com a robustez, segurança e isolamento de dados de um desenvolvimento sob medida em Java.

O objetivo deste motor é eliminar as tarefas repetitivas de configuração de infraestrutura (Autenticação, Segurança, ORM, Logs), permitindo que a equipe de engenharia foque 100% nas regras de negócio específicas do cliente desde o primeiro dia.

## 💎 Diferenciais Estratégicos

### 1. Arquitetura de Isolamento (Single-Tenant)
Cada instância do Genesis opera com seu próprio banco de dados e contexto de execução.
* **Benefício:** Elimina riscos de vazamento de dados entre clientes (Cross-tenant data leak) e permite customizações profundas sem afetar outros projetos.

### 2. Segurança "Zero-Trust"
Implementação de segurança de nível bancário nativa.
* Autenticação **Stateless via JWT** (JSON Web Token).
* Criptografia de senhas com **BCrypt**.
* Proteção contra ataques comuns (CORS, CSRF, SQL Injection) mitigados pelo framework.

### 3. Performance e Escalabilidade
Construído sobre o **Spring Boot 3**, aproveitando a JVM para processamento pesado.
* Preparado para ambientes containerizados (Docker/Kubernetes).
* API RESTful otimizada para consumo por Front-ends modernos (React/Next.js/Mobile).

---

## 🚀 Tech Stack

A escolha tecnológica prioriza longevidade, tipagem forte e suporte corporativo.

* **Core:** Java 17 (LTS) + Spring Boot 3.x
* **Database:** PostgreSQL (Relational Persistence)
* **Security:** Spring Security + Auth0 JWT
* **Data Access:** Spring Data JPA (Hibernate)
* **Build Tool:** Maven
* **Utilities:** Lombok, Spring DevTools

---

## ⚙️ Módulos do Sistema

O backend está modularizado seguindo o padrão **Layered Architecture** para facilitar manutenção:

### 🔐 Auth & Security Module
Responsável pelo ciclo de vida do usuário e proteção de rotas.
* **Filter Chain:** Interceptação de requisições HTTP para validação de token.
* **Role-Based Access Control (RBAC):** Gestão granular de permissões (ADMIN vs USER).

### 🎨 System Config Module
API dinâmica para gerenciamento de identidade visual (White-label).
* Permite que o Front-end renderize temas, logotipos e metadados baseados na configuração persistida no banco, sem necessidade de novos deploys para mudanças visuais simples.

---

## 🛠️ Guia de Instalação (Local)

### Pré-requisitos
* JDK 17+ instalado.
* PostgreSQL rodando na porta `5433`.
* Maven (opcional, o projeto inclui o wrapper `mvnw`).

### 1. Configuração do Banco de Dados
Crie um banco de dados vazio no PostgreSQL chamado `genesis_db`.
Verifique o arquivo `src/main/resources/application.properties` e ajuste as credenciais se necessário:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/genesis_db
spring.datasource.username=postgres
spring.datasource.password=sua_senha

Na raiz do projeto, execute:

Bash

# Linux/Mac
./mvnw spring-boot:run

# Windows
.\mvnw.cmd spring-boot:run
A API estará disponível em: http://localhost:8080

Método,Rota,Descrição,Acesso
POST,/auth/register,Cria um novo usuário Admin,Público
POST,/auth/login,Retorna o Token JWT de acesso,Público

Método,Rota,Descrição,Acesso
GET,/api/config,"Retorna dados do site (Logo, Cores)",Público
POST,/api/config,Atualiza dados do site,Token Bearer (Admin)