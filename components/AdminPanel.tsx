import React, { useState, useEffect } from "react";
import { Product } from "../types";

interface AdminPanelProps {
  productToEdit: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  productToEdit,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: Math.random().toString(36).substr(2, 9),
    name: "",
    description: "",
    price: "R$ ",
    oldPrice: "",
    discountPercent: undefined,
    volume: "100ml",
    gender: "Masculino",
    intensity: "Intensa",
    image: "",
    installments: 6,
    installmentInterest: false,
  });
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<string | null>(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...formData,
        ...productToEdit,
        oldPrice: productToEdit.oldPrice || "",
        discountPercent: productToEdit.discountPercent ?? undefined,
        installments: productToEdit.installments ?? 6,
        installmentInterest: productToEdit.installmentInterest ?? false,
      });
    }
  }, [productToEdit]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image && !imageFile) {
      alert("Por favor, adicione uma foto do perfume.");
      return;
    }

    try {
      setUploading(true);
      // Salva a imagem como base64 diretamente no Firestore (sem Storage)
      onSave(formData);
    } catch (error) {
      alert("Erro ao salvar produto. Tente novamente.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageFile(base64);
        setFormData({ ...formData, image: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/98 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[#0a0a0a] border border-[#d4af37]/40 p-6 md:p-10 rounded-sm shadow-2xl overflow-y-auto max-h-[95vh] animate-fade-in">
        <h2 className="text-xl md:text-2xl font-serif gold-text uppercase tracking-widest text-center mb-8">
          {productToEdit ? "Editar Perfume" : "Novo Perfume"}
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Nome do Perfume
              </label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-[#d4af37] text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Preço Atual (ex: R$ 199,00)
              </label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-[#d4af37] text-white"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Preço Antigo (opcional)
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-[#d4af37] text-white"
                value={formData.oldPrice || ""}
                onChange={(e) =>
                  setFormData({ ...formData, oldPrice: e.target.value })
                }
                placeholder="R$ 250,00"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Desconto (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-[#d4af37] text-white"
                value={formData.discountPercent ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercent: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                placeholder="10"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Parcelas
              </label>
              <input
                type="number"
                min={1}
                max={12}
                className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-[#d4af37] text-white"
                value={formData.installments ?? 6}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    installments: Number(e.target.value),
                  })
                }
                placeholder="6"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Com Juros?
              </label>
              <select
                className="w-full bg-black border border-[#d4af37] p-3 text-sm outline-none focus:border-[#d4af37] text-white placeholder:text-zinc-400"
                value={formData.installmentInterest ? "true" : "false"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    installmentInterest: e.target.value === "true",
                  })
                }
              >
                <option value="false">Sem Juros</option>
                <option value="true">Com Juros</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
              Descrição Completa
            </label>
            <textarea
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none focus:border-[#d4af37] text-white leading-relaxed"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Volume
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none text-white"
                value={formData.volume}
                onChange={(e) =>
                  setFormData({ ...formData, volume: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Gênero
              </label>
              <select
                className="w-full bg-black border border-[#d4af37] p-3 text-sm outline-none focus:border-[#d4af37] text-white appearance-none"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value as any })
                }
              >
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Unissex">Unissex</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
                Intensidade
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 p-3 text-sm outline-none text-white"
                value={formData.intensity}
                onChange={(e) =>
                  setFormData({ ...formData, intensity: e.target.value })
                }
                placeholder="ex: Marcante"
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-widest text-zinc-500 mb-2 block font-bold">
              Foto do Produto
            </label>
            <div className="border border-dashed border-white/10 p-6 text-center bg-white/5 relative group">
              {formData.image ? (
                <div className="relative inline-block">
                  <img
                    src={formData.image}
                    className="w-32 h-32 object-cover mb-4 border border-[#d4af37]/30"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[8px] text-white uppercase font-bold tracking-widest">
                      Trocar Foto
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-4">
                  <svg
                    className="w-8 h-8 text-zinc-700 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-widest">
                    Clique para selecionar imagem
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 gold-gradient py-4 text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading
                ? "Fazendo Upload..."
                : productToEdit
                  ? "Salvar Alterações"
                  : "Publicar no Catálogo"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="flex-1 border border-white/10 py-4 text-zinc-400 uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
