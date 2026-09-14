import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Benefits } from "@/components/landing/Benefits";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <HowItWorks />

        <Benefits />

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}