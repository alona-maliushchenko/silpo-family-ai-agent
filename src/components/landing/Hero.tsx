import Image from "next/image";
import Link from "next/link";
import { AIAssistantButton } from "@/components/landing/AI Assistant/AIAssistantButton";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#F7F8F6]">
      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-18">

        {/* LEFT */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#E8F7EF] px-4 py-2 text-sm font-medium text-[#00A651]">
            ✨ Розумне планування харчування
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#222] md:text-6xl">
            Менше думати про їжу.
            <br />
            <span className="text-[#00A651]">
              Більше часу для сім'ї.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#666]">
            Розкажіть про свою сім'ю, бюджет та вподобання —
            AI створить персональний план харчування
            та список покупок у Сільпо.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/onboarding">
              <Button size="lg">
                Почати планування
                <span>→</span>
              </Button>
            </Link>

            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                Як це працює
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#777]">
            <span>✓ Під ваш бюджет</span>
            <span>✓ Враховує вподобання</span>
            <span>✓ Економить час</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center">

          {/* Main image */}
          <Image
            src="/images/hero_picture_nobg.png"
            alt="Збалансоване харчування для всієї сім'ї"
            width={700}
            height={700}
            className="h-auto w-full max-w-[680px] object-contain"
            priority
          />

          {/* AI Assistant */}
          <AIAssistantButton />

        </div>
      </div>
    </section>
  );
}