
import React, { useState } from 'react';

interface FooterProps {
  onLoginTrigger?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLoginTrigger }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 2 && onLoginTrigger) {
      onLoginTrigger();
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 1000);
  };

  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 items-start">
          
          <div className="flex flex-col space-y-6 text-center md:text-left">
            <div onClick={handleLogoClick} className="cursor-pointer select-none group">
              <h2 className="text-2xl font-serif font-bold gold-text tracking-[0.2em] uppercase leading-none group-hover:brightness-125 transition-all">
                SHALOM
              </h2>
              <span className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] mt-2 block">Premium Fragrances</span>
            </div>
            <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-xs mx-auto md:mx-0">
              A essência do luxo oriental ao seu alcance. Fragrâncias selecionadas que definem presença e sofisticação.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white uppercase tracking-[0.3em] text-[10px] font-black mb-8 border-b border-[#d4af37]/30 pb-2">Redes Sociais</h4>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-[#d4af37] text-zinc-400 hover:text-[#d4af37] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-[#d4af37] text-zinc-400 hover:text-[#d4af37] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:border-[#d4af37] text-zinc-400 hover:text-[#d4af37] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.39-2.82-.14-.49.13-.95.36-1.35.66-.51.4-.85.96-.99 1.59-.1.4-.1.82-.01 1.22.17.86.72 1.63 1.49 2.06.59.34 1.28.47 1.96.4.78-.11 1.5-.52 2.02-1.11.53-.64.83-1.46.84-2.29.08-4.46.06-8.92.07-13.38z"/></svg>
              </a>
            </div>
          </div>

          <div className="text-center md:text-left flex flex-col">
            <h4 className="text-white uppercase tracking-[0.3em] text-[10px] font-black mb-8 border-b border-[#d4af37]/30 pb-2 inline-block self-center md:self-start">Atendimento</h4>
            <ul className="space-y-4 text-zinc-500 text-xs font-light">
              <li>contato@shalomfragrancias.com.br</li>
              <li>Brasil - Envio via Sedex Prioritário</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center md:text-left">
          <p className="text-zinc-700 text-[9px] uppercase tracking-[0.4em] font-medium">
            © 2026 Shalom Fragrâncias. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
