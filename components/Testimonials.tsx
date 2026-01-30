import React, { useEffect } from "react";
import Toast from "./Toast";
import * as testimonialService from "../services/testimonialService";

const Testimonials: React.FC = () => {
  const isLight =
    typeof window !== "undefined" &&
    window.localStorage.getItem("shalom_theme") === "light";
  const [showForm, setShowForm] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [newReview, setNewReview] = React.useState({
    name: "",
    content: "",
    role: "",
    stars: 5,
  });
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  // Tenta pegar avatar do navegador (Google profile) se disponível
  const userAvatar =
    typeof window !== "undefined" &&
    window.localStorage.getItem("profile.avatar");

  async function handleAddReview() {
    if (!newReview.name || !newReview.content) return;
    const reviewToSave = {
      ...newReview,
      avatar: userAvatar || null,
      stars: newReview.stars || 5,
    };
    try {
      await testimonialService.addTestimonial(reviewToSave);
      await fetchReviews();
      setShowForm(false);
      setNewReview({ name: "", content: "", role: "", stars: 5 });
      setToast({ message: "Avaliação enviada com sucesso!", type: "success" });
    } catch (e) {
      setToast({ message: "Erro ao salvar avaliação. Tente novamente.", type: "error" });
    }
  }

  async function fetchReviews() {
    setLoading(true);
    try {
      const data = await testimonialService.getTestimonials();
      setReviews(data);
    } catch (e) {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, []);

  return (
    <section
      id="testimonials"
      className={`py-12 md:py-16 px-4 scroll-mt-20 transition-colors duration-300 ${isLight ? "bg-white" : "bg-[#050505]"}`}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-10 gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-1">
              Social Proof
            </h3>
            <h2
              className={`text-xl md:text-2xl font-serif font-bold ${isLight ? "text-black" : "text-white"}`}
            >
              Avaliações de Clientes
            </h2>
          </div>
          <button
            className="px-6 py-2 rounded-sm gold-gradient text-black font-black uppercase tracking-widest shadow-md hover:brightness-110 transition-all text-[10px]"
            onClick={() => setShowForm((v) => !v)}
          >
            Avaliar
          </button>
        </div>

        {showForm && (
          <div className="mb-8 flex flex-col md:flex-row md:items-end gap-4 bg-black/5 p-4 rounded-md border border-[#d4af37]/20">
            <div className="text-xs text-zinc-500 mb-2">Para aparecer sua foto do Google, salve a URL da imagem do seu perfil no localStorage como <b>profile.avatar</b>. Exemplo: <code>localStorage.setItem('profile.avatar', 'URL_DA_FOTO')</code></div>
            <input
              className="flex-1 px-3 py-2 rounded-sm border border-zinc-200 text-sm"
              placeholder="Seu nome"
              value={newReview.name}
              onChange={(e) =>
                setNewReview((r) => ({ ...r, name: e.target.value }))
              }
            />
            <input
              className="flex-1 px-3 py-2 rounded-sm border border-zinc-200 text-sm"
              placeholder="Profissão ou relação (opcional)"
              value={newReview.role}
              onChange={(e) =>
                setNewReview((r) => ({ ...r, role: e.target.value }))
              }
            />
            <textarea
              className="flex-[2] px-3 py-2 rounded-sm border border-zinc-200 text-sm"
              placeholder="Sua avaliação..."
              value={newReview.content}
              onChange={(e) =>
                setNewReview((r) => ({ ...r, content: e.target.value }))
              }
            />
            <button
              className="px-6 py-2 rounded-sm gold-gradient text-black font-black uppercase tracking-widest shadow-md hover:brightness-110 transition-all text-[10px]"
              onClick={handleAddReview}
            >
              Enviar
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-zinc-400 text-sm">
            Carregando avaliações...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((t) => (
              <div
                key={t.id}
                className={`glass-card p-5 md:p-7 relative group hover-gold transition-all flex flex-col gap-4 items-start ${isLight ? "bg-white/80 border-black/10" : "bg-white/5 border-white/10"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {t.avatar && (
                    <img
                      src={t.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-[#d4af37]/40"
                    />
                  )}
                  <div className="flex text-[#d4af37]">
                    {[...Array(t.stars)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p
                  className={`font-light italic leading-relaxed ${isLight ? "text-zinc-700" : "text-zinc-300"}`}
                >
                  "{t.content}"
                </p>
                <div>
                  <p
                    className={`font-serif font-bold uppercase tracking-widest text-sm ${isLight ? "text-black" : "text-white"}`}
                  >
                    {t.name}
                  </p>
                  {t.role && (
                    <p
                      className={`text-[10px] uppercase tracking-widest mt-1 ${isLight ? "text-zinc-500" : "text-zinc-500"}`}
                    >
                      {t.role}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
