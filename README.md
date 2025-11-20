# Genesis Core API

Backend robusto desenvolvido para suportar a geração e gestão de aplicações web corporativas de alto desempenho. O sistema utiliza arquitetura **Single-Tenant** com foco em segurança, escalabilidade e isolamento de dados.

## 🚀 Tech Stack

* **Java 17+** (LTS)
* **Spring Boot 3.x** (Web, Data JPA, Security, Validation)
* **PostgreSQL** (Persistence)
* **JWT (JSON Web Token)** (Stateless Authentication)
* **Lombok** (Boilerplate reduction)
* **Maven** (Dependency Management)

## ⚙️ Arquitetura e Módulos

O projeto segue o padrão **Layered Architecture** (Controller -> Service -> Repository), garantindo separação de responsabilidades e testabilidade.

### 1. Módulo de Segurança (Security Core)
Implementação customizada do Spring Security filter chain.
* Autenticação via **JWT (HMAC256)**.
* Criptografia de senhas com **BCrypt**.
* Controle de Acesso Baseado em Funções (RBAC - Role Based Access Control).
* Endpoints públicos (Leitura) vs Privados (Escrita).

### 2. Gestão de Configuração (System Config)
Gerenciamento centralizado da identidade visual e metadados da aplicação cliente. Permite alteração dinâmica de:
* Paleta de cores (Theme Engine).
* Assets de marca (Logo, Slogans).
* Dados de contato e SEO.

## 🛠️ Setup e Instalação

### Pré-requisitos
* JDK 17 ou superior.
* PostgreSQL rodando na porta `5433`.
* Maven.

### Configuração de Banco de Dados
As configurações padrão estão em `src/main/resources/application.properties`. Para ambientes locais:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/genesis_db
spring.datasource.username=postgres
spring.datasource.password=admin