import Link from "next/link";
import { ThemeSwitch } from "../theme-switch";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b">
      <Logo />
      <nav className="flex items-center ml-auto gap-4 sm:gap-6">
        <ThemeSwitch />
        <Link
          href="/login"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Registrar
        </Link>
      </nav>
    </header>
  );
};
