import { Card } from "@/components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Розкажіть про сім'ю",
    description:
      "Вкажіть кількість членів сім'ї, їхній вік, смаки, алергії та продукти, які вже є вдома.",
  },
  {
    number: "02",
    title: "AI створює план",
    description:
      "AI аналізує ваші потреби, бюджет та вподобання і створює меню на весь тиждень.",
  },
  {
    number: "03",
    title: "Додайте в кошик",
    description:
      "Отримайте готовий список продуктів і додайте потрібні товари до кошика Сільпо.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#00A651]">
            Як це працює
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#222] md:text-4xl">
            Три кроки до готового кошика
          </h2>

          <p className="mt-4 text-[#666]">
            Ніяких складних налаштувань. Просто розкажіть
            про свою сім'ю — решту зробить AI.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="group relative overflow-hidden rounded-2xl border border-[#eeeeee] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#CDEDDD] hover:shadow-lg"
            >
              {/* Number */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-sm font-bold text-[#00A651] transition-colors group-hover:bg-[#00A651] group-hover:text-white">
                {step.number}
              </div>

              <h3 className="mt-7 text-xl font-bold tracking-tight text-[#222]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#666]">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

