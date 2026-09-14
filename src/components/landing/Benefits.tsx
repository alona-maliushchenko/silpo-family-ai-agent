import { Card } from "@/components/ui/Card";

const benefits = [
  {
    title: "Економія часу",
    description:
      "Більше не потрібно щотижня вигадувати, що приготувати та що купити.",
  },
  {
    title: "Контроль бюджету",
    description:
      "AI планує покупки відповідно до бюджету та допомагає уникати зайвих витрат.",
  },
  {
    title: "Для всієї сім'ї",
    description:
      "Меню враховує кількість людей, вік дітей, смаки та особливі потреби.",
  },
  {
    title: "Розумні рекомендації",
    description:
      "AI комбінує страви та продукти так, щоб покупки були максимально практичними.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-[#16a34a]">
            Переваги
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#222] md:text-4xl">
            Планування, яке працює на вас
          </h2>

          <p className="mt-4 text-[#777]">
            AI допомагає організувати харчування сім'ї,
            контролювати бюджет і скоротити час на покупки.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-6">
              <h3 className="font-bold text-[#222]">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#777]">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}