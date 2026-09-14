export function Footer() {
    return (
      <footer className="border-t border-[#eeeeee] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[#777] md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            © {new Date().getFullYear()} Сільпо AI Planner
          </div>
  
          <div className="flex gap-6">
            <span>Розумне планування</span>
            <span>Для всієї сім'ї</span>
          </div>
        </div>
      </footer>
    );
  }