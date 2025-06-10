import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ativar Conta | CreatorSub",
  description: "Ative sua conta no CreatorSub",
};

export default function ActivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
