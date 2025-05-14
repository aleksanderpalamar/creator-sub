import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex space-x-1">
      <h1 className="font-bold text-xl text-yellow-500">
        Creator
        <span className="text-violet-500">Sub</span>
      </h1>
      <div className="text-zinc-500 dark:text-zinc-50 text-[0.65rem] p-1 items-start">
        Alpha v1
      </div>
    </Link>
  );
};
