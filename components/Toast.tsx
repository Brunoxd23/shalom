import React, { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Anima a barra de progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / 40; // 4000ms / 100ms = 40 intervalos
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    // Inicia a animação de saída antes do tempo total expirar
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 3500);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(leaveTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const handleManualClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 500);
  };

  const icons = {
    success: (
      <svg
        className="w-4 h-4 text-[#d4af37]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    error: (
      <svg
        className="w-4 h-4 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    info: (
      <svg
        className="w-4 h-4 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  const progressColors = {
    success: "bg-[#d4af37]",
    error: "bg-red-500",
    info: "bg-blue-400",
  };

  return (
    <div
      className={`fixed z-[300] flex flex-col bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 border-l-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-md overflow-hidden
        top-6 right-6 w-full max-w-[380px] md:max-w-[400px]
        transition-all duration-500 ease-out
        ${isLeaving ? "translate-x-[calc(100%+2rem)] opacity-0" : "translate-x-0 opacity-100"}
        ${type === "success" ? "border-l-[#d4af37]" : type === "error" ? "border-l-red-500" : "border-l-blue-400"}`}
    >
      {/* Conteúdo do Toast */}
      <div className="flex items-center gap-4 py-4 px-6">
        <div className="shrink-0 bg-white/5 p-2 rounded-full">
          {icons[type]}
        </div>
        <div className="flex-grow">
          <p className="text-[10px] uppercase tracking-[0.15em] font-black text-white leading-tight">
            {message}
          </p>
        </div>
        <button
          onClick={handleManualClose}
          className="text-zinc-600 hover:text-[#d4af37] transition-colors p-1 ml-2"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Barra de Progresso */}
      <div className="h-1 bg-white/5 w-full">
        <div
          className={`h-full transition-all duration-100 ease-linear ${progressColors[type]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
