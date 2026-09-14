"use client";

import { useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export default function Chat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привіт! 👋 Розкажіть, що ви хочете приготувати, і я допоможу спланувати меню.",
      sender: "ai",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setMessage("");
  };

  return (
    <div className="flex min-h-[500px] flex-col">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.map((item) => (
          <div
            key={item.id}
            className={
              item.sender === "user"
                ? "ml-auto max-w-xl rounded-2xl bg-green-600 p-4 text-white"
                : "max-w-xl rounded-2xl bg-gray-100 p-4"
            }
          >
            <p className="text-sm font-semibold">
              {item.sender === "user" ? "Ви" : "Family AI"}
            </p>

            <p className="mt-2">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Напишіть ваше повідомлення..."
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-green-500"
        />

        <button
          type="button"
          onClick={handleSend}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Надіслати
        </button>
      </div>
    </div>
  );
}

