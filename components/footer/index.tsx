import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        © 2024 CreatorSub. Todos os direitos reservados.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/docs"
        >
          Documentação
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Termos de Serviço
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Política de Privacidade
        </Link>
      </nav>
    </footer>
  );
};
