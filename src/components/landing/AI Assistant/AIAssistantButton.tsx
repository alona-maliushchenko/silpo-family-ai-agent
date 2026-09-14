"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function AIAssistantButton() {
  const handleClick = () => {
    console.log("AI Assistant clicked");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Відкрити AI Assistant"
      className="group absolute bottom-4 right-2 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-gradient-to-br from-[#00A651] via-[#7DDEA9] to-[#E8F7EF] p-[3px] shadow-[0_8px_30px_rgba(0,166,81,0.25)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_35px_rgba(0,166,81,0.35)]"
    >
      {/* Inner ring */}
      <span className="flex h-full w-full items-center justify-center rounded-full bg-white p-[2px]">
        {/* Soft green glow */}
        <span className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#E8F7EF] via-white to-[#D5F3E3]">
          <DotLottieReact
            src="/animations/ai-robot.lottie"
            autoplay
            loop
            style={{
              width: 120,
              height: 120,
            }}
          />
        </span>
      </span>
    </button>
  );
}
