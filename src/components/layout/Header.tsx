import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eeeeee] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#how-it-works"
            className="text-sm text-[#555] transition hover:text-[#00A651]"
          >
            Як це працює
          </Link>

          <Link
            href="#benefits"
            className="text-sm text-[#555] transition hover:text-[#00A651]"
          >
            Переваги
          </Link>

          <Link
            href="#reviews"
            className="text-sm text-[#555] transition hover:text-[#00A651]"
          >
            Відгуки
          </Link>
        </nav>

        <Link href="/onboarding">
          <Button size="md">
            Створити план
          </Button>
        </Link>
      </div>
    </header>
  );
}

