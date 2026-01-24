
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Produtos 100% Originais',
      desc: 'Importação direta dos produtores mais renomados dos Emirados Árabes.',
      icon: (
        <svg className="w-8 h-8 gold-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Fragrâncias Exclusivas',
      desc: 'Notas raras de Oud, Âmbar e Almíscar que você não encontra em perfumarias comuns.',
      icon: (
        <svg className="w-8 h-8 gold-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Envio Prioritário',
      desc: 'Logística otimizada para garantir que seu perfume chegue com rapidez e segurança.',
      icon: (
        <svg className="w-8 h-8 gold-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Suporte VIP via WhatsApp',
      desc: 'Consultores especializados para ajudar você a escolher a fragrância ideal.',
      icon: (
        <svg className="w-8 h-8 gold-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:-translate-y-2">
                {f.icon}
              </div>
              <h4 className="text-lg font-serif font-bold mb-4 tracking-wide uppercase">{f.title}</h4>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
