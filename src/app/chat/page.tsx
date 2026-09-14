import Chat from "@/components/chat/Chat";
export default function ChatPage() {
  return (
    <main className="flex-1 bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Сільпо Family AI
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Плануємо ваше меню
          </h1>

          <p className="mt-2 text-gray-600">
            Розкажіть, що ви хочете приготувати, а я допоможу з меню та покупками.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Chat />
        </div>
      </section>
    </main>
  );
}
