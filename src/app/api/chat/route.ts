import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = body.message;

    if (!message) {
      return NextResponse.json(
        {
          error: "Повідомлення не може бути порожнім",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      reply: `Я отримав ваше повідомлення: "${message}". Зараз я ще навчаюся планувати меню 😊`,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Не вдалося обробити запит",
      },
      {
        status: 500,
      }
    );
  }
}