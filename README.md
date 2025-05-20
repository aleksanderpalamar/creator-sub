# CreatorSub

CreatorSub é uma aplicação web desenvolvida com Next.js, voltada para criadores de conteúdo que desejam oferecer planos de assinatura aos seus seguidores. A seguir, você encontrará uma visão geral do projeto, sua estrutura e funcionalidades principais.

## 🔑 Funcionalidade principal

Permite que criadores ofereçam assinaturas, com recursos como:

- Dashboard de gestão
- Criação de planos
- Pagamentos integrados
- Gerenciamento de assinantes
- Sistema de notificações
- Integra autenticação com NextAuth e pagamentos (ex: MercadoPago, via webhooks).
- Possui um painel administrativo completo para os criadores.

## 📁 Estrutura de pastas

- app/: Rotas da aplicação, usando o App Router do Next.js. Inclui páginas públicas (home, login, register, docs) e privadas (dashboard, analytics, settings etc).
- components/: Componentes reutilizáveis da UI — botões, tabelas, navegação, formulários, entre outros.
- context/ e hooks/: Contextos e hooks personalizados para gerenciamento de estado e lógica compartilhada.
- lib/: Funções utilitárias e integrações externas (autenticação, notificações, pagamentos, acesso ao banco via Prisma).
- prisma/: Definição do schema e configuração do banco de dados.
- providers/: Providers globais, como sessão e tema.
- public/: Arquivos estáticos e assets.

## 🔐 Fluxo de autenticação.

Usuários não autenticados acessam a página inicial com informações sobre o serviço.
Após o login, são redirecionados automaticamente para o dashboard.

## 🚀 Funcionalidades principais

Dashboard com overview de assinaturas, receitas e planos ativos.
Gerenciamento de planos, assinantes, configurações e métricas de uso.
Integração com provedores de pagamento e webhooks para atualização de status.
Sistema de notificações e suporte a temas (ex: claro/escuro).

## 🛠️ Tecnologias utilizadas

- Next.js with (App Router)
- TypeScript
- NextAuth (autenticação)
- Prisma ORM
- Tailwind CSS
- Integração com serviços de pagamento (ex: MercadoPago)
