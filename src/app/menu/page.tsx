export default function MenuPage() {
    return (
      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Family AI
          </p>
  
          <h1 className="mt-2 text-3xl font-bold">
            Моє меню
          </h1>
  
          <p className="mt-2 text-gray-600">
            Тут буде згенероване AI меню для вашої сім&apos;ї.
          </p>
  
          <div className="mt-8 rounded-2xl border bg-white p-8">
            <p className="text-gray-500">
              Меню поки порожнє.
            </p>
          </div>
        </section>
      </main>
    );
  }