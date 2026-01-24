
import React, { useState, useEffect } from 'react';

interface LoginModalProps {
  onLogin: (password: string) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  // Focus input on mount
  useEffect(() => {
    const input = document.getElementById('pin-input');
    if (input) input.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 backdrop-blur-md bg-black/80">
      <div className="w-full max-w-sm bg-[#0a0a0a] border border-[#d4af37]/30 p-8 rounded-sm shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 border border-[#d4af37]/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-lg font-serif gold-text uppercase tracking-widest font-bold">Acesso Restrito</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">Área Administrativa Shalom</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[9px] uppercase tracking-widest text-zinc-600 mb-3 block font-bold text-center">Digite o PIN de Acesso</label>
            <input 
              id="pin-input"
              type="password" 
              required
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} p-4 text-center text-xl tracking-[1em] outline-none focus:border-[#d4af37] text-white transition-all`}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit" 
              className="w-full gold-gradient py-4 text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-xl active:scale-95 transition-all"
            >
              Entrar no Painel
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="w-full py-2 text-zinc-600 uppercase tracking-[0.2em] text-[8px] hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
