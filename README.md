# Dashboard Content Creator Platform

Uma plataforma moderna para criadores de conteúdo gerenciarem suas assinaturas e assinantes.

## 🌟 Funcionalidades

### Para Criadores de Conteúdo
- Dashboard personalizado com métricas importantes
- Gerenciamento de planos de assinatura
- Visualização de assinantes ativos
- Integração com pagamentos via PIX
- Configurações de perfil e conta
- Sistema de notificações

### Para Assinantes
- Interface intuitiva para gerenciar assinaturas
- Visualização de planos disponíveis
- Pagamento simplificado via PIX
- Gerenciamento de conta e preferências

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - Next.js 15+ (App Router)
  - Tailwind CSS
  - Shadcn/ui

- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - SQLite (desenvolvimento)

- **Autenticação:**
  - NextAuth.js
  - Credenciais (email/senha)
  - Proteção de rotas

- **Pagamentos:**
  - Integração PIX

## 💻 Pré-requisitos

- Node.js 18+ 
- npm, yarn, ou pnpm

## 🛠️ Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="seu-secret-aqui"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
├── app/                  # Rotas e páginas da aplicação
│   ├── api/             # Rotas da API
│   ├── dashboard/       # Área do dashboard
│   ├── login/          # Página de login
│   └── register/       # Página de registro
├── components/          # Componentes reutilizáveis
├── lib/                # Utilitários e configurações
├── prisma/             # Schema e migrações do banco
└── types/              # Definições de tipos TypeScript
```

## 🔐 Autenticação

O sistema utiliza NextAuth.js para autenticação, suportando:
- Autenticação com email/senha
- Sessões seguras
- Proteção de rotas
- Diferentes níveis de acesso (criador/assinante)

## 💳 Sistema de Pagamentos

- Integração com PIX para pagamentos
- Gestão de assinaturas recorrentes
- Histórico de transações

## ⚙️ Configurações Disponíveis

### Criadores
- Gerenciamento de planos de assinatura
- Configuração de chave PIX
- Preferências de notificação
- Configurações de segurança

### Assinantes
- Gerenciamento de assinaturas ativas
- Preferências de conta
- Configurações de notificação
- Alteração de senha

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
