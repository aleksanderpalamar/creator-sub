# Dashboard Content Creator Platform

Este projeto é uma solução “tudo‑em‑um” para criadores de conteúdo montarem e gerenciarem seu próprio sistema de assinaturas,
oferecendo tanto uma área administrativa para o criador quanto uma interface para os assinantes.

### Resumo geral

    * Plataforma web construída sobre Next.js (App Router)
    * Permite ao criador:
      • Definir e editar planos de assinatura (valores, intervalos, descrições)
      • Visualizar métricas e lista de assinantes ativos
      • Configurar dados de pagamento (PIX) e notificações
      • Ajustar perfil, segurança e preferências
      * Permite ao assinante:
      • Navegar entre planos disponíveis
      • Assinar/desassinar com pagamento via PIX
      • Gerenciar conta (dados pessoais, mudança de senha, notificações)


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
   MERCADO_PAGO_ACCESS_TOKEN="seu-access-token-aqui"
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
  • app/           → rotas e páginas (páginas públicas, dashboard do criador, API endpoints)
  • components/    → componentes React reutilizáveis (UI, navegação, botões, etc.)
  • lib/           → configurações e helpers (Prisma, autenticação, utilidades)
  • prisma/        → schema do banco e migrações
  • hooks/, context/ → gerenciamento de estado (toasts, tema, modo de usuário)
  • public/        → assets estáticos (imagens, favicon)
  • utils/, types/ → funções utilitárias e definições TypeScript
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

## Fluxo de uso

   1. Usuário (criador) se cadastra e configura seus planos no dashboard
   2. Visitante vê planos públicos e escolhe um para assinar
   3. Pagamento é processado via PIX e webhook notifica o sistema
   4. Plano ativo e acesso concedido ao assinante; criador visualiza nova assinatura no dashboard

   Em resumo, é uma base pronta para quem quer oferecer conteúdo sob assinatura recorrente, com todo o fluxo de cadastro,
   autenticação, cobrança e gestão de assinantes já implementado.

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
2. Crie uma branch para sua feature (`git checkout -b feature/NewFeature`)
3. Commit suas mudanças (`git commit -m 'Add some NewFeature'`)
4. Push para a branch (`git push origin feature/NewFeature`)
5. Abra um Pull Request
