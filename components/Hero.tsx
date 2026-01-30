import React from "react";

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const isLight =
    typeof window !== "undefined" &&
    window.localStorage.getItem("shalom_theme") === "light";
  return (
    <section
      id="inicio"
      className="relative h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 z-10 transition-colors duration-300 ${isLight ? "bg-gradient-to-b from-white/95 via-white/60 to-white" : "bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-[#050505]"}`}
        />
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2000&auto=format&fit=crop"
          alt="Frasco de Perfume de Luxo Árabe"
          className="w-full h-full object-cover object-center scale-100"
        />
      </div>

      <div className="relative z-20 max-w-3xl px-6 text-center">
        <div
          className={`inline-flex items-center gap-3 px-4 py-1 border border-[#d4af37]/30 rounded-full mb-6 backdrop-blur-md ${isLight ? "bg-white/80" : "bg-black/50"}`}
        >
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-[#d4af37] font-bold">
            Alta Perfumaria Oriental
          </span>
        </div>

        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-5 leading-tight tracking-tight ${isLight ? "text-black" : "text-white"}`}
        >
          Perfumes Árabes <br className="hidden md:block" />
          <span
            className="gold-text italic"
            style={{ textShadow: "0 2px 8px rgba(180,140,20,0.18)" }}
          >
            Exclusividade & Presença
          </span>
        </h2>

        <p
          className={`text-xs md:text-base mb-10 max-w-md mx-auto font-light tracking-wide leading-relaxed opacity-80 ${isLight ? "text-zinc-700" : "text-zinc-400"}`}
        >
          Fragrâncias intensas e sofisticadas importadas diretamente dos
          Emirados. Encontre sua assinatura olfativa única na Shalom.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("catalog")}
            className="w-full sm:w-auto px-10 py-3.5 gold-gradient text-black font-black uppercase tracking-[0.15em] hover:brightness-110 hover:scale-[1.02] transition-all shadow-[0_10px_40px_rgba(212,175,55,0.2)] text-[10px]"
          >
            Ver Catálogo
          </button>
          <button
            onClick={() => window.open("https://wa.me/5511964494147", "_blank")}
            className={`w-full sm:w-auto px-10 py-3.5 font-bold uppercase tracking-[0.15em] transition-all text-[10px] border backdrop-blur-md
              ${isLight ? "border-[#d4af37]/40 text-[#b8860b] bg-white/80 hover:bg-[#fffbe6] shadow-[0_2px_16px_rgba(180,140,20,0.10)]" : "border-white/10 text-white hover:bg-white/5"}
            `}
          >
            Falar com Especialista
          </button>
        </div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
