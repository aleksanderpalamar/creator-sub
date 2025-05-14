import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import { Hero } from "@/components/home/hero";
import { CreatorSub } from "@/components/home/creator-sub";
import { HowItWorks } from "@/components/home/how-it-works";
import { Resource } from "@/components/home/resource";
import { WhoIsItFor } from "@/components/home/who-is-it-for";
import { CallToActions } from "@/components/home/cta";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6">
      <Header />
      <main className="w-full py-12 md:py-24">
        <Hero />
        <CreatorSub />
        <HowItWorks />
        <Resource />
        <WhoIsItFor />
        <CallToActions />
      </main>
      <Footer />
    </div>
  );
}
