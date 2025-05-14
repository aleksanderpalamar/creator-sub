"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Code,
  Database,
  FileCode,
  FileText,
  GitBranch,
  Globe,
  Home,
  Layers,
  Lock,
  Server,
  Settings,
  Smartphone,
  Zap,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function DocsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6">
      <Header />
      <main className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            {/* Título da Documentação */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Documentação CreatorSub
              </h1>
              <p className="text-xl text-muted-foreground">
                Guia completo para entender e utilizar a plataforma CreatorSub
              </p>
              <Separator />
            </div>
            {/* Navegação por Tabs */}
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden md:inline">Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger
                  value="architecture"
                  className="flex items-center gap-2"
                >
                  <Layers className="h-4 w-4" />
                  <span className="hidden md:inline">Arquitetura</span>
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  <span className="hidden md:inline">API</span>
                </TabsTrigger>
                <TabsTrigger
                  value="database"
                  className="flex items-center gap-2"
                >
                  <Database className="h-4 w-4" />
                  <span className="hidden md:inline">Banco de Dados</span>
                </TabsTrigger>
                <TabsTrigger
                  value="frontend"
                  className="flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="hidden md:inline">Frontend</span>
                </TabsTrigger>
                <TabsTrigger
                  value="integration"
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  <span className="hidden md:inline">Integrações</span>
                </TabsTrigger>
                <TabsTrigger
                  value="deployment"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden md:inline">Implantação</span>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  <span className="hidden md:inline">Segurança</span>
                </TabsTrigger>
              </TabsList>

              {/* Conteúdo da Tab: Visão Geral */}
              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre o CreatorSub</CardTitle>
                      <CardDescription>
                        Visão geral da plataforma
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        O CreatorSub é uma plataforma brasileira que permite que
                        criadores de conteúdo monetizem seu trabalho através de
                        assinaturas, sem depender das políticas de monetização
                        das grandes plataformas como YouTube e Twitch.
                      </p>
                      <p>
                        A plataforma oferece uma solução completa para
                        gerenciamento de assinaturas, processamento de
                        pagamentos via Pix, e ferramentas para engajamento com
                        os assinantes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tecnologias Principais</CardTitle>
                      <CardDescription>
                        Stack tecnológico do projeto
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-primary" />
                          <span>Next.js 15 (App Router)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-primary" />
                          <span>TypeScript</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-primary" />
                          <span>Tailwind CSS</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Database className="h-5 w-5 text-primary" />
                          <span>Prisma ORM</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-primary" />
                          <span>NextAuth.js</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          <span>Mercado Pago API (Pix)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Estrutura do Projeto</CardTitle>
                    <CardDescription>
                      Organização dos diretórios principais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        {`📂 app                   # Diretórios e arquivos da aplicação Next.js (App Router)
                              ┣ 📂 api                # Rotas de API (Server-side)
                              ┣ 📂 dashboard          # Páginas do dashboard (área logada)
                              ┣ 📂 overlay            # Páginas do overlay para streams
                              ┣ 📂 login              # Página de login
                              ┣ 📂 register           # Página de registro
                              ┣ 📂 about              # Página sobre o projeto
                              ┣ 📂 docs               # Documentação
                              ┣ 📜 layout.tsx         # Layout principal da aplicação
                              ┣ 📜 page.tsx           # Página inicial
                              ┗ 📜 globals.css        # Estilos globais

                            📂 components            # Componentes React reutilizáveis
                              ┣ 📂 ui                 # Componentes de UI (shadcn/ui)
                              ┣ 📂 overlay            # Componentes do overlay para streams
                              ┗ 📜 ...                # Outros componentes

                            📂 lib                   # Bibliotecas e utilitários
                              ┣ 📜 prisma.ts          # Cliente Prisma
                              ┣ 📜 pix.ts             # Utilitários para integração com Pix
                              ┣ 📜 utils.ts           # Funções utilitárias
                              ┗ 📜 ...                # Outros utilitários

                            📂 types                 # Definições de tipos TypeScript
                            📂 hooks                 # React Hooks personalizados
                            📂 context               # Contextos React
                            📂 providers             # Providers React
                            📂 prisma                # Configuração do Prisma e schema do banco de dados
                            📂 public                # Arquivos estáticos`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fluxos Principais</CardTitle>
                    <CardDescription>
                      Principais fluxos de usuário na plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Fluxo do Criador
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>Registro e login na plataforma</li>
                        <li>Ativação do modo criador nas configurações</li>
                        <li>Configuração da chave Pix para recebimento</li>
                        <li>Criação de planos de assinatura</li>
                        <li>Configuração do overlay para streams (opcional)</li>
                        <li>Monitoramento de assinantes e pagamentos</li>
                        <li>Visualização de estatísticas e relatórios</li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Fluxo do Assinante
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>Registro e login na plataforma</li>
                        <li>Descoberta de criadores</li>
                        <li>Visualização dos planos disponíveis</li>
                        <li>Seleção e assinatura de um plano</li>
                        <li>Pagamento via Pix</li>
                        <li>Acesso ao conteúdo exclusivo</li>
                        <li>Gerenciamento de assinaturas ativas</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conteúdo da Tab: Arquitetura */}
              <TabsContent value="architecture" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Arquitetura do Sistema</CardTitle>
                    <CardDescription>
                      Visão geral da arquitetura do CreatorSub
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      O CreatorSub utiliza uma arquitetura moderna baseada em
                      Next.js, combinando renderização do lado do servidor (SSR)
                      e componentes do lado do cliente para oferecer uma
                      experiência de usuário rápida e responsiva.
                    </p>

                    <div className="overflow-x-auto">
                      <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        {`
                              ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
                              │                 │     │                 │     │                 │
                              │  Cliente Web    │◄────┤  Next.js App    │◄────┤  API Routes     │
                              │  (React)        │     │  (SSR/CSR)      │     │  (Serverless)   │
                              │                 │     │                 │     │                 │
                              └─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                                                       │
                                                                                       ▼
                                                                                ┌─────────────────┐
                                                                                │                 │
                                                                                │  Prisma ORM     │
                                                                                │                 │
                                                                                └────────┬────────┘
                                                                                         │
                                    ┌───────────────────────────────┬────────────────────┼──────┐
                                    │                               │                           │
                                    ▼                               ▼                           ▼
                            ┌─────────────────┐             ┌─────────────────┐         ┌─────────────────┐
                            │                 │             │                 │         │                 │
                            │  Banco de Dados │             │  Mercado Pago   │         │  Serviços de    │
                            │  (PostgreSQL)   │             │  API (Pix)      │         │  Notificação    │
                            │                 │             │                 │         │                 │
                            └─────────────────┘             └─────────────────┘         └─────────────────┘
                        `}
                      </pre>
                    </div>

                    <h3 className="text-lg font-semibold mt-6">
                      Componentes Principais
                    </h3>
                    <ul className="space-y-2">
                      <li className="space-y-1">
                        <span className="font-medium">Frontend (Next.js):</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Responsável pela interface do usuário, utilizando
                          React com Next.js para renderização híbrida (SSR/CSR).
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">API Routes:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Endpoints serverless que processam requisições,
                          autenticação e integração com serviços externos.
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">Prisma ORM:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Camada de acesso ao banco de dados, fornecendo uma API
                          type-safe para operações de CRUD.
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">Banco de Dados:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          PostgreSQL para armazenamento persistente de dados
                          (usuários, planos, assinaturas, pagamentos).
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">
                          Integração de Pagamentos:
                        </span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Integração com a API do Mercado Pago para
                          processamento de pagamentos via Pix.
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">
                          Serviço de Notificações:
                        </span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Sistema de eventos em tempo real para notificações de
                          assinaturas e overlay para streams.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Padrões de Design</CardTitle>
                    <CardDescription>
                      Padrões arquiteturais utilizados no projeto
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Server Components
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Utilizamos React Server Components do Next.js para
                        renderização no servidor, melhorando o desempenho e
                        reduzindo o JavaScript enviado ao cliente.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Server Actions</h3>
                      <p className="text-sm text-muted-foreground">
                        Implementamos Server Actions para processamento de
                        formulários e mutações de dados diretamente no servidor,
                        eliminando a necessidade de endpoints API separados.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Padrão Repository
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Abstraímos o acesso ao banco de dados através do Prisma,
                        implementando um padrão similar ao Repository para
                        separar a lógica de negócios da camada de persistência.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Context API</h3>
                      <p className="text-sm text-muted-foreground">
                        Utilizamos React Context para gerenciar estados globais,
                        como o modo do usuário (criador/assinante) e
                        notificações.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Server-Sent Events (SSE)
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Implementamos SSE para comunicação em tempo real
                        unidirecional do servidor para o cliente, especialmente
                        para o sistema de overlay de notificações.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conteúdo da Tab: API */}
              <TabsContent value="api" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Endpoints da API</CardTitle>
                    <CardDescription>
                      Documentação dos endpoints disponíveis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Autenticação</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-4">
                                  Endpoint
                                </th>
                                <th className="text-left py-2 px-4">Método</th>
                                <th className="text-left py-2 px-4">
                                  Descrição
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/auth/[...nextauth]</code>
                                </td>
                                <td className="py-2 px-4">GET/POST</td>
                                <td className="py-2 px-4">
                                  Endpoints do NextAuth.js para autenticação
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/register</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Registro de novos usuários
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/user/change-password</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Alteração de senha do usuário
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/user/settings</code>
                                </td>
                                <td className="py-2 px-4">PUT</td>
                                <td className="py-2 px-4">
                                  Atualização das configurações do usuário
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                          Planos de Assinatura
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-4">
                                  Endpoint
                                </th>
                                <th className="text-left py-2 px-4">Método</th>
                                <th className="text-left py-2 px-4">
                                  Descrição
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/plans</code>
                                </td>
                                <td className="py-2 px-4">GET</td>
                                <td className="py-2 px-4">
                                  Listar planos de assinatura
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/plans</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Criar novo plano de assinatura
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/plans/[id]</code>
                                </td>
                                <td className="py-2 px-4">GET</td>
                                <td className="py-2 px-4">
                                  Obter detalhes de um plano específico
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/plans/[id]</code>
                                </td>
                                <td className="py-2 px-4">PUT</td>
                                <td className="py-2 px-4">
                                  Atualizar um plano existente
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/plans/[id]</code>
                                </td>
                                <td className="py-2 px-4">DELETE</td>
                                <td className="py-2 px-4">Excluir um plano</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Assinaturas</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-4">
                                  Endpoint
                                </th>
                                <th className="text-left py-2 px-4">Método</th>
                                <th className="text-left py-2 px-4">
                                  Descrição
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/subscribe</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Criar nova assinatura
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/subscriptions/[id]/cancel</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Cancelar uma assinatura
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Pagamentos</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-4">
                                  Endpoint
                                </th>
                                <th className="text-left py-2 px-4">Método</th>
                                <th className="text-left py-2 px-4">
                                  Descrição
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/payments/check-status</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Verificar status de um pagamento
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/webhooks/mercadopago</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Webhook para notificações do Mercado Pago
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Overlay</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-4">
                                  Endpoint
                                </th>
                                <th className="text-left py-2 px-4">Método</th>
                                <th className="text-left py-2 px-4">
                                  Descrição
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/overlay/config</code>
                                </td>
                                <td className="py-2 px-4">GET</td>
                                <td className="py-2 px-4">
                                  Obter configurações do overlay
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/overlay/config</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Salvar configurações do overlay
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/overlay/events</code>
                                </td>
                                <td className="py-2 px-4">GET</td>
                                <td className="py-2 px-4">
                                  Stream de eventos SSE para o overlay
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-2 px-4">
                                  <code>/api/overlay/test-notification</code>
                                </td>
                                <td className="py-2 px-4">POST</td>
                                <td className="py-2 px-4">
                                  Enviar notificação de teste para o overlay
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Exemplo de Uso da API</CardTitle>
                    <CardDescription>
                      Exemplos de requisições para os endpoints principais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Criar um Plano de Assinatura
                      </h3>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`// Requisição
                          POST /api/plans
                          Content-Type: application/json
                          Authorization: Bearer {token}

                          {
                            "name": "Plano Premium",
                            "description": "Acesso a todo o conteúdo exclusivo",
                            "price": 29.90,
                            "benefits": "Acesso antecipado a vídeos\\nChat exclusivo\\nSorteios mensais"
                          }

                          // Resposta
                          {
                            "plan": {
                              "id": "clz123abc456",
                              "name": "Plano Premium",
                              "description": "Acesso a todo o conteúdo exclusivo",
                              "price": 29.90,
                              "benefits": "Acesso antecipado a vídeos\\nChat exclusivo\\nSorteios mensais",
                              "creatorId": "usr789xyz012",
                              "createdAt": "2024-05-14T12:34:56.789Z",
                              "updatedAt": "2024-05-14T12:34:56.789Z"
                            },
                            "message": "Plano criado com sucesso"
                          }`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Assinar um Plano
                      </h3>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`// Requisição
                            POST /api/subscribe
                            Content-Type: application/json
                            Authorization: Bearer {token}

                            {
                              "creatorId": "usr789xyz012",
                              "planId": "clz123abc456"
                            }

                            // Resposta
                            {
                              "subscription": {
                                "id": "sub456def789",
                                "subscriberId": "usr345uvw678",
                                "creatorId": "usr789xyz012",
                                "subscriptionPlanId": "clz123abc456",
                                "status": "pending",
                                "startDate": "2024-05-14T12:34:56.789Z",
                                "nextPaymentDate": "2024-06-14T12:34:56.789Z",
                                "createdAt": "2024-05-14T12:34:56.789Z",
                                "updatedAt": "2024-05-14T12:34:56.789Z"
                              },
                              "payment": {
                                "id": "pay789ghi012",
                                "pixCode": "00020101021226...",
                                "pixQrCodeBase64": "iVBORw0KGgoAAAANSUhEUgAA...",
                                "pixExpiration": "2024-05-14T13:34:56.789Z"
                              },
                              "message": "Assinatura criada com sucesso"
                            }`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Verificar Status de Pagamento
                      </h3>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`// Requisição
                          POST /api/payments/check-status
                          Content-Type: application/json
                          Authorization: Bearer {token}

                          {
                            "paymentId": "pay789ghi012"
                          }

                          // Resposta
                          {
                            "status": "approved",
                            "payment": {
                              "id": "pay789ghi012",
                              "status": "completed",
                              "updatedAt": "2024-05-14T12:45:23.456Z"
                            }
                          }`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conteúdo da Tab: Banco de Dados */}
              <TabsContent value="database" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Modelo de Dados</CardTitle>
                    <CardDescription>
                      Estrutura do banco de dados e relacionamentos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      O CreatorSub utiliza o Prisma ORM para interagir com o
                      banco de dados PostgreSQL. Abaixo está o esquema do banco
                      de dados com as principais entidades e seus
                      relacionamentos.
                    </p>

                    <div className="overflow-x-auto">
                      <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        {`// Schema Prisma simplificado

                        model User {
                          id            String    @id @default(cuid())
                          name          String?
                          email         String?   @unique
                          emailVerified DateTime?
                          image         String?
                          password      String?
                          accounts      Account[]
                          sessions      Session[]

                          // Campos específicos para criadores
                          isCreator     Boolean   @default(false)
                          pixKey        String?
                          pixKeyType    String?   // cpf, email, telefone, chave aleatória

                          // Relacionamentos
                          subscriptionPlans    SubscriptionPlan[]
                          subscriptions        Subscription[]     @relation("Subscriber")
                          creatorSubscriptions Subscription[]     @relation("Creator")
                          overlayConfig        OverlayConfig?
                        }

                        model SubscriptionPlan {
                          id          String   @id @default(cuid())
                          creatorId   String
                          name        String
                          description String?
                          price       Float
                          benefits    String?
                          createdAt   DateTime @default(now())
                          updatedAt   DateTime @updatedAt

                          creator       User           @relation(fields: [creatorId], references: [id], onDelete: Cascade)
                          subscriptions Subscription[]
                        }

                        model Subscription {
                          id                 String    @id @default(cuid())
                          subscriberId       String
                          creatorId          String
                          subscriptionPlanId String
                          status             String    // active, cancelled, pending
                          startDate          DateTime  @default(now())
                          endDate            DateTime?
                          lastPaymentDate    DateTime?
                          nextPaymentDate    DateTime?
                          createdAt          DateTime  @default(now())
                          updatedAt          DateTime  @updatedAt

                          subscriber       User             @relation("Subscriber", fields: [subscriberId], references: [id])
                          creator          User             @relation("Creator", fields: [creatorId], references: [id])
                          subscriptionPlan SubscriptionPlan @relation(fields: [subscriptionPlanId], references: [id])
                          payments         Payment[]
                        }

                        model Payment {
                          id              String    @id @default(cuid())
                          subscriptionId  String
                          amount          Float
                          status          String    // pending, completed, failed
                          paymentMethod   String    // pix
                          pixCode         String?   // Código Pix copia e cola
                          pixQrCodeBase64 String?   // Código Pix em base64
                          pixExpiration   DateTime? // Data de expiração do Código Pix
                          externalId      String?   // ID da transação no provedor de pagamento
                          createdAt       DateTime  @default(now())
                          updatedAt       DateTime  @updatedAt

                          subscription Subscription @relation(fields: [subscriptionId], references: [id])
                        }

                        model OverlayConfig {
                          id        String   @id @default(cuid())
                          creatorId String   @unique
                          config    Json
                          createdAt DateTime @default(now())
                          updatedAt DateTime @updatedAt

                          creator User @relation(fields: [creatorId], references: [id], onDelete: Cascade)
                        }`}
                      </pre>
                    </div>

                    <h3 className="text-lg font-semibold mt-6">
                      Principais Entidades
                    </h3>
                    <ul className="space-y-2">
                      <li className="space-y-1">
                        <span className="font-medium">User:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Armazena informações dos usuários, incluindo criadores
                          e assinantes. Um usuário pode ser tanto criador quanto
                          assinante.
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">SubscriptionPlan:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Representa os planos de assinatura criados pelos
                          criadores, com preço, descrição e benefícios.
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">Subscription:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Registra as assinaturas dos usuários a planos
                          específicos, com status e datas de pagamento.
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">Payment:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Armazena informações sobre pagamentos, incluindo
                          códigos Pix e status de processamento.
                        </p>
                      </li>
                      <li className="space-y-1">
                        <span className="font-medium">OverlayConfig:</span>
                        <p className="text-sm text-muted-foreground pl-4">
                          Configurações personalizadas do overlay de
                          notificações para streams.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Migrações e Gerenciamento</CardTitle>
                    <CardDescription>
                      Gerenciamento do banco de dados com Prisma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Comandos Prisma</h3>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`# Gerar migrações a partir de alterações no schema
                              npx prisma migrate dev --name nome_da_migracao

                              # Aplicar migrações em ambiente de produção
                              npx prisma migrate deploy

                              # Gerar cliente Prisma atualizado
                              npx prisma generate

                              # Visualizar e editar dados no Prisma Studio
                              npx prisma studio

                              # Resetar o banco de dados (apenas em desenvolvimento)
                              npx prisma migrate reset`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Boas Práticas</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Sempre crie migrações para alterações no schema,
                            evitando modificações diretas no banco de dados.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Utilize transações para operações que envolvem
                            múltiplas entidades, garantindo a integridade dos
                            dados.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Implemente validações tanto no cliente quanto no
                            servidor antes de persistir dados.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Utilize o cliente Prisma como singleton para evitar
                            múltiplas conexões desnecessárias.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conteúdo da Tab: Frontend */}
              <TabsContent value="frontend" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Componentes e UI</CardTitle>
                    <CardDescription>
                      Estrutura de componentes e interface do usuário
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      O frontend do CreatorSub é construído com Next.js e
                      utiliza componentes do shadcn/ui, uma biblioteca de
                      componentes baseada em Radix UI e Tailwind CSS.
                    </p>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Estrutura de Componentes
                      </h3>
                      <ul className="space-y-2">
                        <li className="space-y-1">
                          <span className="font-medium">
                            Componentes de UI Base:
                          </span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Componentes reutilizáveis como Button, Card, Input,
                            etc., localizados em <code>components/ui/</code>.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <span className="font-medium">
                            Componentes de Layout:
                          </span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Componentes que definem a estrutura da página, como
                            header, footer, sidebar, etc.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <span className="font-medium">
                            Componentes de Funcionalidade:
                          </span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Componentes específicos para funcionalidades como
                            UserNav, DashboardNav, SubscribeButton, etc.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <span className="font-medium">
                            Componentes de Overlay:
                          </span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Componentes específicos para o sistema de overlay de
                            notificações em streams.
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Principais Páginas
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Home (app/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Página inicial com apresentação da plataforma.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Login/Register (app/login/page.tsx,
                              app/register/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Páginas de autenticação e registro.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Dashboard (app/dashboard/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Dashboard principal com visão geral para criadores
                              e assinantes.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Planos (app/dashboard/plans/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Gerenciamento de planos de assinatura para
                              criadores.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Assinantes (app/dashboard/subscribers/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Lista de assinantes para criadores.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Assinaturas
                              (app/dashboard/subscriptions/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Gerenciamento de assinaturas para assinantes.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Configurações (app/dashboard/settings/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Configurações de conta e preferências.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Overlay (app/dashboard/overlay/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Configuração do overlay para streams.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Overlay Público
                              (app/overlay/[creatorId]/page.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Página pública do overlay para ser incorporada em
                              streams.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hooks e Contextos</CardTitle>
                    <CardDescription>
                      Hooks personalizados e contextos React
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Hooks Personalizados
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              useToast (hooks/use-toast.ts):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Hook para exibir notificações toast na interface.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              useMobile (hooks/use-mobile.ts):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Hook para detectar se o dispositivo é móvel.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              useUserMode (context/user-mode-context.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Hook para gerenciar o modo do usuário
                              (criador/assinante).
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Contextos</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              ToastContext (context/toast-context.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Contexto para gerenciar notificações toast em toda
                              a aplicação.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              UserModeContext (context/user-mode-context.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Contexto para alternar entre os modos de criador e
                              assinante.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              ThemeProvider (providers/theme-provider.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Provider para gerenciar o tema claro/escuro da
                              aplicação.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              SessionProvider (providers/session-provider.tsx):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Provider do NextAuth para gerenciar a sessão do
                              usuário.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conteúdo da Tab: Integrações */}
              <TabsContent value="integration" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Integração com Mercado Pago</CardTitle>
                    <CardDescription>
                      Processamento de pagamentos via Pix
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      O CreatorSub utiliza a API do Mercado Pago para processar
                      pagamentos via Pix. A integração é implementada no módulo{" "}
                      <code>lib/pix.ts</code>.
                    </p>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Configuração</h3>
                      <p className="text-sm text-muted-foreground">
                        Para utilizar a integração com o Mercado Pago, é
                        necessário configurar a variável de ambiente
                        <code>MERCADO_PAGO_ACCESS_TOKEN</code> com o token de
                        acesso da sua conta Mercado Pago.
                      </p>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`# .env
                            MERCADO_PAGO_ACCESS_TOKEN="TEST-1234567890abcdef1234567890abcdef-123456789"
                          `}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Principais Funções
                      </h3>
                      <ul className="space-y-2">
                        <li className="space-y-1">
                          <span className="font-medium">generatePixCode:</span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Gera um código Pix para pagamento, incluindo o QR
                            code em base64.
                          </p>
                          <div className="overflow-x-auto pl-4">
                            <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                              {`
                                export async function generatePixCode(
                                  amount: number,
                                  description: string,
                                  payerEmail?: string,
                                  expirationMinutes = 30,
                                ): Promise<PixResult> {
                                   // Implementação
                                }
                              `}
                            </pre>
                          </div>
                        </li>
                        <li className="space-y-1">
                          <span className="font-medium">
                            checkPixPaymentStatus:
                          </span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Verifica o status de um pagamento Pix no Mercado
                            Pago.
                          </p>
                          <div className="overflow-x-auto pl-4">
                            <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                              {`export async function checkPixPaymentStatus(
                                externalId: string
                              ): Promise<"approved" | "pending" | "rejected"> {
                                // Implementação
                              }`}
                            </pre>
                          </div>
                        </li>
                        <li className="space-y-1">
                          <span className="font-medium">validatePixKey:</span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Valida uma chave Pix com base no tipo (CPF, email,
                            telefone, chave aleatória).
                          </p>
                          <div className="overflow-x-auto pl-4">
                            <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                              {`export function validatePixKey(
                                pixKey: string, 
                                pixKeyType: PixKeyType
                              ): boolean {
                                // Implementação
                              }`}
                            </pre>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Fluxo de Pagamento
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>
                          Usuário seleciona um plano de assinatura e clica em
                          "Assinar".
                        </li>
                        <li>
                          Sistema gera um código Pix usando a função{" "}
                          <code>generatePixCode</code>.
                        </li>
                        <li>
                          Código Pix e QR code são exibidos para o usuário.
                        </li>
                        <li>
                          Usuário realiza o pagamento usando seu aplicativo
                          bancário.
                        </li>
                        <li>
                          Sistema verifica periodicamente o status do pagamento
                          usando <code>checkPixPaymentStatus</code>.
                        </li>
                        <li>
                          Quando o pagamento é confirmado, a assinatura é
                          ativada.
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sistema de Notificações em Tempo Real</CardTitle>
                    <CardDescription>
                      Overlay para streams e notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      O CreatorSub implementa um sistema de notificações em
                      tempo real para exibir alertas quando novos assinantes se
                      juntam. Este sistema é especialmente útil para criadores
                      que desejam exibir notificações durante suas transmissões
                      ao vivo.
                    </p>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Arquitetura</h3>
                      <p className="text-sm text-muted-foreground">
                        O sistema utiliza Server-Sent Events (SSE) para enviar
                        notificações do servidor para o cliente em tempo real.
                        As notificações são armazenadas em memória e enviadas
                        para todos os clientes conectados ao overlay do criador.
                      </p>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`// lib/notification-service.ts

                          // Armazenar conexões ativas por criador
                          const connections = new Map<string, Set<ReadableStreamController<Uint8Array>>>()

                          // Função para enviar notificação para um criador específico
                          export async function notifySubscription(creatorId: string, data: any) {
                            const creatorConnections = connections.get(creatorId)

                            if (!creatorConnections) return

                            const message = \`data: \${JSON.stringify(data)}\n\n\`

                            for (const controller of creatorConnections) {
                              try {
                                controller.enqueue(new TextEncoder().encode(message))
                              } catch (error) {
                                console.error("Erro ao enviar notificação:", error)
                              }
                            }
                          }

                          // Função para adicionar uma conexão
                          export function addConnection(creatorId: string, controller: ReadableStreamController<Uint8Array>) {
                            if (!connections.has(creatorId)) {
                              connections.set(creatorId, new Set())
                            }
                            connections.get(creatorId)!.add(controller)
                          }

                          // Função para remover uma conexão
                          export function removeConnection(creatorId: string, controller: ReadableStreamController<Uint8Array>) {
                            const creatorConnections = connections.get(creatorId)
                            if (creatorConnections) {
                              creatorConnections.delete(controller)
                              if (creatorConnections.size === 0) {
                                connections.delete(creatorId)
                              }
                            }
                          }`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Componentes do Overlay
                      </h3>
                      <ul className="space-y-2">
                        <li className="space-y-1">
                          <span className="font-medium">
                            SubscriptionNotification:
                          </span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Componente que exibe a notificação de nova
                            assinatura no overlay.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <span className="font-medium">Overlay Page:</span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Página pública que exibe o overlay com as
                            notificações, acessível em
                            <code>/overlay/[creatorId]</code>. acessível em
                            <code>/overlay/[creatorId]</code>.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <span className="font-medium">
                            Configuração do Overlay:
                          </span>
                          <p className="text-sm text-muted-foreground pl-4">
                            Interface para personalizar a aparência e
                            comportamento das notificações, disponível em
                            <code>/dashboard/overlay</code>.
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Uso no OBS Studio
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>
                          No OBS Studio, adicione uma nova fonte do tipo
                          "Navegador".
                        </li>
                        <li>
                          Insira a URL do overlay:{" "}
                          <code>
                            https://seu-dominio.com/overlay/[creatorId]
                          </code>
                          .
                        </li>
                        <li>
                          Configure a largura e altura de acordo com sua
                          resolução de transmissão.
                        </li>
                        <li>
                          Marque a opção "Fundo transparente" para que apenas as
                          notificações sejam exibidas.
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Conteúdo da Tab: Implantação */}
              <TabsContent value="deployment" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Implantação em Produção</CardTitle>
                    <CardDescription>
                      Guia para implantar o CreatorSub em produção
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Requisitos</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Server className="h-5 w-5 text-primary mt-0.5" />
                          <span>Node.js 18.x ou superior</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Database className="h-5 w-5 text-primary mt-0.5" />
                          <span>PostgreSQL 14.x ou superior</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <GitBranch className="h-5 w-5 text-primary mt-0.5" />
                          <span>Git</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Globe className="h-5 w-5 text-primary mt-0.5" />
                          <span>Domínio e certificado SSL</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Variáveis de Ambiente
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Configure as seguintes variáveis de ambiente no seu
                        servidor de produção:
                      </p>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`# Configuração do banco de dados
                          DATABASE_URL="postgresql://usuario:senha@localhost:5432/creatorsub"

                          # Configuração do NextAuth
                          NEXTAUTH_URL="https://seu-dominio.com"
                          NEXTAUTH_SECRET="sua-chave-secreta-gerada-com-openssl"

                          # Configuração do Mercado Pago
                          MERCADO_PAGO_ACCESS_TOKEN="seu-token-de-acesso-do-mercado-pago"

                          # Configuração do Google OAuth (opcional)
                          GOOGLE_CLIENT_ID="seu-client-id-do-google"
                          GOOGLE_CLIENT_SECRET="seu-client-secret-do-google"`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Implantação na Vercel
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        A forma mais simples de implantar o CreatorSub é
                        utilizando a plataforma Vercel:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>
                          Crie uma conta na Vercel e conecte seu repositório
                          Git.
                        </li>
                        <li>Importe o projeto do repositório.</li>
                        <li>
                          Configure as variáveis de ambiente mencionadas acima.
                        </li>
                        <li>
                          Adicione a integração do Vercel Postgres ou configure
                          um banco de dados PostgreSQL externo.
                        </li>
                        <li>
                          Clique em "Deploy" e aguarde a conclusão da
                          implantação.
                        </li>
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Implantação Manual
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Para implantar manualmente em um servidor:
                      </p>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`# Clone o repositório
                          git clone https://github.com/seu-usuario/creatorsub.git
                          cd creatorsub
                          
                          # Instale as dependências
                          npm install
                          
                          # Configure as variáveis de ambiente
                          cp .env.example .env
                          # Edite o arquivo .env com suas configurações
                          
                          # Gere o cliente Prisma
                          npx prisma generate
                          
                          # Execute as migrações do banco de dados
                          npx prisma migrate deploy
                          
                          # Construa a aplicação
                          npm run build
                          
                          # Inicie o servidor
                          npm start`}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Configuração do Webhook do Mercado Pago
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Para receber notificações de pagamento em tempo real,
                        configure o webhook do Mercado Pago:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li>
                          Acesse o painel do Mercado Pago e vá para
                          "Configurações - Webhooks".
                        </li>
                        <li>
                          Adicione um novo webhook com a URL:{" "}
                          <code>
                            https://seu-dominio.com/api/webhooks/mercadopago
                          </code>
                          .
                        </li>
                        <li>
                          Selecione os eventos "payment.created",
                          "payment.updated" e "payment.approved".
                        </li>
                        <li>Salve as configurações e teste o webhook.</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monitoramento e Manutenção</CardTitle>
                    <CardDescription>
                      Práticas recomendadas para manter a aplicação em produção
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Monitoramento</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Settings className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Logs da Aplicação:
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Monitore os logs da aplicação para identificar
                              erros e problemas.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Settings className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Monitoramento de Desempenho:
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Utilize ferramentas como New Relic, Datadog ou
                              Vercel Analytics para monitorar o desempenho.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Settings className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">Alertas:</span>
                            <p className="text-sm text-muted-foreground">
                              Configure alertas para ser notificado sobre
                              problemas críticos.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    gs da aplicação para identificar erros e problemas.
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Backups</h3>
                      <p className="text-sm text-muted-foreground">
                        Implemente uma estratégia de backup para o banco de
                        dados:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Database className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Realize backups diários do banco de dados
                            PostgreSQL.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Database className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Armazene backups em locais seguros e geograficamente
                            distribuídos.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Database className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Teste regularmente a restauração dos backups para
                            garantir sua integridade.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Atualizações</h3>
                      <p className="text-sm text-muted-foreground">
                        Mantenha a aplicação atualizada e segura:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <GitBranch className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Atualize regularmente as dependências para corrigir
                            vulnerabilidades de segurança.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <GitBranch className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Implemente um pipeline de CI/CD para automatizar
                            testes e implantações.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <GitBranch className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Utilize ambientes de staging para testar
                            atualizações antes de aplicá-las em produção.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Autenticação e Autorização</CardTitle>
                    <CardDescription>
                      Segurança de acesso e permissões
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">NextAuth.js</h3>
                      <p className="text-sm text-muted-foreground">
                        O CreatorSub utiliza NextAuth.js para autenticação,
                        oferecendo suporte a múltiplos provedores:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Autenticação por email/senha com bcrypt para hash de
                            senhas.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>Autenticação OAuth com Google (opcional).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Sessões baseadas em JWT para autenticação stateless.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Controle de Acesso
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        O sistema implementa controle de acesso baseado em
                        funções:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Verificação de sessão em rotas protegidas usando{" "}
                            <code>getServerSession</code>.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Redirecionamento para página de login quando não
                            autenticado.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Verificação de permissões específicas para criadores
                            e assinantes.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Exemplo de Proteção de Rota
                      </h3>
                      <div className="overflow-x-auto">
                        <pre className="text-sm p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                          {`// Exemplo de proteção de rota no servidor
                          import { getServerSession } from "next-auth"
                          import { redirect } from "next/navigation"
                          import { authOptions } from "@/utils/authOptions"

                          export default async function ProtectedPage() {
                            const session = await getServerSession(authOptions)

                            if (!session) {
                              redirect("/login")
                            }

                            // Verificação adicional para rotas específicas de criadores
                            if (requiredCreatorAccess && !session.user.isCreator) {
                              redirect("/dashboard")
                            }

                            // Conteúdo da página protegida
                            return <div>Conteúdo protegido</div>
                          }`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Proteção de Dados</CardTitle>
                    <CardDescription>
                      Segurança de dados e conformidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Senhas e Dados Sensíveis
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Senhas armazenadas com hash usando bcrypt com salt.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Dados sensíveis como tokens de acesso nunca são
                            expostos ao cliente.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <span>
                            Variáveis de ambiente para armazenar segredos e
                            chaves de API.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Proteção contra Ataques Comuns
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              CSRF (Cross-Site Request Forgery):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Proteção automática pelo Next.js com tokens CSRF
                              em formulários.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              XSS (Cross-Site Scripting):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Escape automático de conteúdo pelo React e
                              validação de entrada.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">Injeção SQL:</span>
                            <p className="text-sm text-muted-foreground">
                              Prevenção através do uso do Prisma ORM com
                              parâmetros parametrizados.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">Rate Limiting:</span>
                            <p className="text-sm text-muted-foreground">
                              Implementação de limitação de taxa em endpoints
                              sensíveis.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        Conformidade e Privacidade
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              LGPD (Lei Geral de Proteção de Dados):
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Conformidade com a legislação brasileira de
                              proteção de dados.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Política de Privacidade:
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Documentação clara sobre coleta e uso de dados dos
                              usuários.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <span className="font-medium">
                              Direito ao Esquecimento:
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Funcionalidade para usuários excluírem seus dados.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
