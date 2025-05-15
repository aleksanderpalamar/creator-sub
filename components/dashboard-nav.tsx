"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Settings,
  BarChart,
  PlusCircle,
} from "lucide-react";

interface NavProps {
  vertical?: boolean;
}

export function DashboardNav({ vertical = false }: NavProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isCreator = session?.user?.isCreator;

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
  ];

  // Rotas específicas para criadores
  if (isCreator) {
    routes.push(
      {
        href: "/dashboard/plans",
        label: "Assinaturas",
        icon: CreditCard,
        active:
          pathname === "/dashboard/plans" ||
          pathname.startsWith("/dashboard/plans/"),
      },
      {
        href: "/dashboard/subscribers",
        label: "Assinantes",
        icon: Users,
        active: pathname === "/dashboard/subscribers",
      },
      {
        href: "/dashboard/analytics",
        label: "Estatísticas",
        icon: BarChart,
        active: pathname === "/dashboard/analytics",
      },
      {
        href: "/dashboard/overlay",
        label: "Overlay",
        icon: PlusCircle,
        active: pathname === "/dashboard/overlay",
      }
    );
  } else {
    // Rotas para assinantes
    routes.push({
      href: "/dashboard/subscriptions",
      label: "Minhas Assinaturas",
      icon: CreditCard,
      active: pathname === "/dashboard/subscriptions",
    });

    routes.push({
      href: "/dashboard/discover",
      label: "Descobrir Criadores",
      icon: PlusCircle,
      active:
        pathname === "/dashboard/discover" ||
        pathname.startsWith("/dashboard/creator/"),
    });
  }

  // Configurações para todos os usuários
  routes.push({
    href: "/dashboard/settings",
    label: "Configurações",
    icon: Settings,
    active: pathname === "/dashboard/settings",
  });

  // Estilo para navegação vertical (sidebar)
  if (vertical) {
    return (
      <nav className="flex flex-col space-y-1 w-full">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                route.active
                  ? "bg-violet-500 text-primary-foreground"
                  : "text-muted-foreground hover:bg-violet-50 hover:text-violet-500"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  // Estilo para navegação horizontal (header)
  return (
    <nav className="flex items-center space-x-4">
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
              route.active
                ? "bg-violet-500 text-primary-foreground"
                : "text-muted-foreground hover:bg-violet-50 hover:text-violet-500"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{route.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
