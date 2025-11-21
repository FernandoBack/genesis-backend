📘 README — Genesis Client Interface (Frontend)

Frontend React + Vite • White-label • Integração com Genesis Core API

# Genesis Client Interface | Frontend Oficial do Projeto Genesis

**Versão:** 1.0.0  
**Tecnologia:** React + Vite  
**Arquitetura:** Atomic Design  
**Status:** Em desenvolvimento  
**Dependência principal:** Genesis Core API (Java Spring Boot)

---

## 🔭 Visão Geral

O **Genesis Client** é a aplicação frontend oficial do ecossistema Genesis.  
Ele funciona como:

- Interface pública do site  
- Painel administrativo (CMS)  
- Interface de login e autenticação  
- Cliente de consumo da API de Configurações White-label  

O grande diferencial deste frontend é o sistema de **tema dinâmico**:  
assim que o usuário abre o site, a aplicação consulta a API (`/api/config/public`) e aplica cores, logo e textos específicos do cliente — **sem necessidade de rebuild**.

---

## 🚀 Tecnologias Utilizadas

- **React 18 (Hooks, Functional Components)**
- **Vite (ESBuild — alta performance)**
- **TailwindCSS (com variáveis CSS personalizadas)**
- **Axios (com interceptors JWT)**
- **React Router DOM 6**
- **Lucide Icons**
- **Arquitetura Atomic Design**

---

## 🧩 Estrutura de Pastas



src/
├── components/
│ ├── atoms/ → Botões, inputs, labels
│ ├── molecules/ → FormFields, Cards etc.
│ ├── organisms/ → Navbar, Footer, LoginForm
│ └── templates/ → Layouts principais (Auth, Dashboard)
│
├── pages/ → Páginas roteáveis (Home, Login, Dashboard)
├── services/ → Axios + AuthService + ConfigService
├── routes/ → Rotas protegidas (PrivateRoute)
├── config/ → Variáveis de tema e constantes
└── hooks/ → Estados reutilizáveis (useAuth, useTheme)


---

## 🎨 Sistema White-label (Tema Dinâmico)

O frontend aplica o tema via:

- Variáveis CSS (`--primary-color`, `--secondary-color`)
- Tailwind configurado com `extend` no `tailwind.config.js`
- Função `applyTheme()` chamada ao iniciar o app

Fluxo:



Frontend inicia

Faz GET /api/config/public

Recebe cores + logo + textos

Aplica no DOM (CSS Variables)

Interface muda automaticamente


---

## 🔐 Autenticação com JWT

- Login no `/auth/login`  
- Token salvo no LocalStorage  
- Axios Interceptor adiciona automaticamente:  
  `Authorization: Bearer <token>`  
- Rotas privadas exigem autenticação  
- Logout limpa o token e redireciona para `/login`

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node 18+
- API Genesis rodando na porta **8080**

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/genesis-frontend.git
cd genesis-frontend

2. Instalar dependências
npm install

3. Configurar a URL da API (se necessário)

Arquivo: src/services/api.js

export const api = axios.create({
  baseURL: "http://localhost:8080"
});

4. Executar o servidor de desenvolvimento
npm run dev


Acesse:

http://localhost:5173

🔌 Integração Backend (Genesis Core API)

O frontend depende diretamente do backend para funcionar.
Principais endpoints consumidos:

Método	Rota	Finalidade
POST	/auth/login	Autenticação via JWT
GET	/auth/me	Dados do usuário logado
GET	/api/config/public	Tema e identidade visual
POST	/api/config	CMS — atualizar tema/cores/logo
CRUD	/api/users	Gestão de usuários
🤝 Repositórios Relacionados

Backend (Spring Boot - API Oficial):
https://github.com/FernandoBack/genesis-backend