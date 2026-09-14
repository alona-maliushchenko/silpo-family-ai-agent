export default function ShoppingListPage() {
    return (
      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Family AI
          </p>
  
          <h1 className="mt-2 text-3xl font-bold">
            Список покупок
          </h1>
  
          <p className="mt-2 text-gray-600">
            Тут буде автоматично сформований список продуктів.
          </p>
  
          <div className="mt-8 rounded-2xl border bg-white p-8">
            <p className="text-gray-500">
              Список покупок поки порожній.
            </p>
          </div>
        </section>
      </main>
    );
  }