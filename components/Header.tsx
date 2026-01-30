import React, { useState } from "react";
import { toggleTheme } from "../toggleTheme";

interface HeaderProps {
  isAdmin: boolean;
  onLogout: () => void;
  onLoginTrigger: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isAdmin,
  onLogout,
  onLoginTrigger,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (id === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300
          ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("shalom_theme") === "light"
              ? "bg-white/95 border-black/10 text-black"
              : "bg-[#050505]/95 border-white/5 text-white"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#d4af37] z-50"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div
            className="flex flex-col items-center md:items-start cursor-pointer select-none"
            onClick={() => scrollTo("inicio")}
          >
            <h1 className="text-xl md:text-3xl font-serif font-bold gold-text tracking-[0.2em] uppercase leading-none">
              SHALOM
            </h1>
            <span className="text-[7px] md:text-[10px] text-zinc-500 tracking-[0.4em] uppercase mt-1">
              Fragrâncias Orientais
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-[9px] font-black tracking-[0.2em] uppercase">
            <button
              onClick={() => scrollTo("inicio")}
              className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Início
            </button>
            <button
              onClick={() => scrollTo("catalog")}
              className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Catálogo
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Diferenciais
            </button>
            <button
              onClick={() => scrollTo("testimonials")}
              className="hover:text-[#d4af37] transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Depoimentos
            </button>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Botão alternar tema */}
            <button
              onClick={toggleTheme}
              className="border border-[#d4af37] text-[#d4af37] p-2 rounded-sm hover:bg-[#d4af37] hover:text-black transition-all shadow-lg"
              title="Alternar tema claro/escuro"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
            {isAdmin ? (
              <button
                onClick={onLogout}
                className="bg-red-600/20 text-red-500 border border-red-500/30 px-3 md:px-5 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg"
              >
                Sair
              </button>
            ) : (
              <button
                onClick={onLoginTrigger}
                className="text-zinc-500 hover:text-[#d4af37] p-3 transition-all group flex items-center gap-1.5 border border-transparent hover:border-white/5 rounded-sm"
                title="Acesso Restrito"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="hidden lg:inline text-[8px] uppercase tracking-[0.2em] font-bold">
                  Painel
                </span>
              </button>
            )}

            <button
              onClick={() => scrollTo("catalog")}
              className="gold-gradient px-4 md:px-8 py-2 md:py-2.5 rounded-sm text-black font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] hover:brightness-110 transition-all shadow-xl active:scale-95"
            >
              Comprar
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[40] bg-[#050505] transition-all duration-500 md:hidden flex flex-col items-center justify-start pt-32 space-y-10 ${isMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="w-8 h-[1px] bg-[#d4af37]/30 mb-2"></div>
        <button
          onClick={() => scrollTo("inicio")}
          className="text-2xl font-serif gold-text uppercase tracking-[0.2em] hover:scale-110 transition-transform flex items-center gap-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Início
        </button>
        <button
          onClick={() => scrollTo("catalog")}
          className="text-2xl font-serif gold-text uppercase tracking-[0.2em] hover:scale-110 transition-transform flex items-center gap-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Catálogo
        </button>
        <button
          onClick={() => scrollTo("features")}
          className="text-2xl font-serif gold-text uppercase tracking-[0.2em] hover:scale-110 transition-transform flex items-center gap-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Diferenciais
        </button>
        <button
          onClick={() => scrollTo("testimonials")}
          className="text-2xl font-serif gold-text uppercase tracking-[0.2em] hover:scale-110 transition-transform flex items-center gap-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Depoimentos
        </button>
        <div className="w-8 h-[1px] bg-[#d4af37]/30 mt-2"></div>

        <p className="text-[8px] text-zinc-700 uppercase tracking-[0.5em] pt-10">
          Shalom Fragrâncias
        </p>
      </div>
    </>
  );
};

export default Header;
