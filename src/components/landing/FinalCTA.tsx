import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-[#F7F8F6] px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#00A651] px-6 py-14 text-center shadow-sm md:px-12 md:py-20">
        
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 text-4xl text-white">
            ✦
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Готові спробувати?
          </h2>

          <p className="mt-4 text-white/90 md:text-lg">
            Розкажіть про свою сім'ю та отримайте
            персональний план харчування всього за кілька хвилин.
          </p>

          <div className="mt-8">
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-white text-[#00A651] shadow-md hover:bg-[#E8F7EF]"
              >
                Створити мій план
                <span>→</span>
              </Button>
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/75">
            Безкоштовно • Без складних налаштувань
          </p>
        </div>
      </div>
    </section>
  );
}

