import { DashboardNav } from "@/components/dashboard-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeSwitch } from "@/components/theme-switch";
import { UserModeToggle } from "@/components/user-mode-toggle";
import { UserNav } from "@/components/user-nav";
import { UserModeProvider } from "@/context/user-mode-context";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <UserModeProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="flex h-16 items-center px-4 sm:px-6">
            <div className="font-bold text-xl mr-6">CreatorSub</div>
            <MobileNav />
            <div className="ml-auto flex items-center space-x-4">
              <UserModeToggle />
              <ThemeSwitch />
              <UserNav user={session.user} />
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r bg-background md:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <DashboardNav vertical />
            </div>
          </aside>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </UserModeProvider>
  );
}
