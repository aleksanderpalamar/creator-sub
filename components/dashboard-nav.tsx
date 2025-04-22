"use client";

import { useUserMode } from "@/context/user-mode-context";
import { cn } from "@/lib/utils";
import {
  BarChart,
  CreditCard,
  LayoutDashboard,
  PlusCircle,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  vertical?: boolean;
}

export function DashboardNav({ vertical = false }: NavProps) {
  const pathname = usePathname();
  const { mode } = useUserMode();

  const isCreator = mode === "creator";
  const isSubscriber = mode === "subscriber";
  const { data: session } = useSession();

  const navItems = [
    ...(mode === "creator"
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            active: pathname === "/dashboard",
          },
          {
            href: `/dashboard/creator/${session?.user?.id}`,
            label: "Meu Perfil",
            icon: User,
            active: pathname === `/dashboard/creator/${session?.user?.id}`,
          },
          {
            href: "/dashboard/subscribers",
            label: "Assinantes",
            icon: Users,
            active: pathname === "/dashboard/subscribers",
          },
          {
            href: "/dashboard/analytics",
            label: "Estatisticas",
            icon: BarChart,
            active: pathname === "/dashboard/analytics",
          },
        ]
      : []),
    ...(mode === "subscriber"
      ? [
          {
            href: "/dashboard/discover",
            label: "Descobrir Criadores",
            icon: PlusCircle,
            active: pathname === "/dashboard/discover",
          },
          {
            href: "/dashboard/subscriptions",
            label: "Minhas Assinaturas",
            icon: CreditCard,
            active: pathname === "/dashboard/subscriptions",
          },
        ]
      : []),
  ];

  const routes = isCreator
    ? navItems
    : isSubscriber
    ? navItems
    : [];

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
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
