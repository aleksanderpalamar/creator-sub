import { ThemeSwitch } from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
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
    <div className="flex min-h-screen flex-col">
      <header className="stick top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <h1 className="font-bold text-xl mr-6">CreatorSub</h1>
          <nav className="hidden md:flex flex-1 items-center space-x-4 lg:space-x-6">
            {/*<DashboardNav /> */}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav user={session.user} />
          </div>
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            {/* <DashboardNav /> */}
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
            {children}
        </main>
      </div>
    </div>
  );
}
