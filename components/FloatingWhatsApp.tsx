
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25" />
      <div className="relative bg-[#25D366] hover:bg-[#128C7E] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207l-.695 2.54 2.599-.682c.887.481 1.727.813 2.839.813 3.18 0 5.767-2.586 5.767-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.376 8.21c-.131.37-.751.706-1.041.751-.284.045-.544.074-1.543-.326-1.01-.403-1.636-1.428-1.686-1.494-.05-.067-.403-.537-.403-1.027 0-.49.255-.731.346-.831.091-.099.199-.124.266-.124.066 0 .132.001.189.003.06.002.141-.022.221.171.08.194.275.671.299.721.025.05.041.107.008.173-.033.066-.074.143-.146.221-.073.078-.153.174-.219.233-.073.066-.149.138-.064.284.084.145.374.618.805 1.002.553.493 1.019.646 1.166.721.147.075.234.062.321-.038.087-.1.371-.433.471-.581.099-.149.199-.124.332-.074.132.05.84.396.985.469.144.073.24.108.273.165.033.058.033.336-.098.706z"/>
        </svg>
      </div>
      {/* Label popup on hover */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm whitespace-nowrap opacity-0 translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shadow-xl">
        Atendimento VIP
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
