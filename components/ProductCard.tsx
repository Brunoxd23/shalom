import React from "react";
import { Product } from "../types";
import { WHATSAPP_NUMBER } from "../constants";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Funções auxiliares para cálculo de desconto e parcelas
  function parsePrice(priceStr?: string): number {
    if (!priceStr) return 0;
    // Aceita formatos "R$ 199,00" ou "199,00"
    const cleaned = priceStr.replace(/[^0-9,\.]/g, "").replace(",", ".");
    return parseFloat(cleaned) || 0;
  }

  const price = parsePrice(product.price);
  const oldPrice = parsePrice(product.oldPrice);
  const discountPercent =
    product.discountPercent ||
    (oldPrice && price
      ? Math.round(100 - (price / oldPrice) * 100)
      : undefined);
  const priceWithDiscount = discountPercent
    ? price * (1 - discountPercent / 100)
    : price;
  const showDiscount = !!discountPercent && discountPercent > 0;
  const showOldPrice = !!product.oldPrice && oldPrice > price;
  const installments = product.installments || 6;
  const hasInterest = !!product.installmentInterest;
  // Exemplo: 2% ao mês para "com juros"
  const interestRate = hasInterest ? 0.02 : 0;
  let installmentValue = priceWithDiscount / installments;
  if (hasInterest && interestRate > 0) {
    // Fórmula de parcela fixa: P = V * (i * (1+i)^n) / ((1+i)^n - 1)
    const i = interestRate;
    const n = installments;
    installmentValue =
      (priceWithDiscount * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
  }

  const handleWhatsAppClick = () => {
    const desc = product.description;
    let msg = `*SHALOM | FRAGRÂNCIAS DE LUXO*\n-----------------------------------\n\n*PRODUTO:* ${product.name.toUpperCase()}\n*VOLUME:* ${product.volume}`;
    if (showOldPrice) msg += `\n*VALOR ANTIGO:* ${product.oldPrice}`;
    msg += `\n*VALOR ATUAL:* ${product.price}`;
    if (showDiscount)
      msg += `\n*VALOR COM DESCONTO:* R$ ${priceWithDiscount.toFixed(2).replace(".", ",")} (${discountPercent}% OFF)`;
    msg += `\n*PARCELAMENTO:* ${installments}x de R$ ${installmentValue.toFixed(2).replace(".", ",")} ${hasInterest ? "com juros" : "sem juros"}`;
    msg += `\n\n*NOTAS OLFATIVAS:*\n_${desc}_\n\n-----------------------------------\n\n*TENHO INTERESSE EM:*\n- Formas de Pagamento\n- Prazo de Entrega\n- Disponibilidade em Estoque\n\n_Enviado via Catálogo Digital Shalom_`;
    const encodedMessage = encodeURIComponent(msg);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <div className="group relative glass-card rounded-sm overflow-hidden border border-white/5 hover:border-[#d4af37]/40 transition-all duration-500 flex flex-col h-full animate-fade-in">
      <div className="relative aspect-[1/1] overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

        {/* Badge de desconto flutuante */}
        {showDiscount && (
          <div
            className="absolute top-4 left-4 bg-[#d4af37] text-black font-extrabold text-[13px] px-4 py-1.5 rounded-md shadow-2xl z-20 border-2 border-white/30 tracking-widest select-none"
            style={{ letterSpacing: "0.08em" }}
          >
            {discountPercent}% OFF
          </div>
        )}

        {/* Gender Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full">
          <span className="text-[8px] uppercase tracking-widest text-zinc-300 font-bold">
            {product.gender}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 relative flex flex-col flex-grow">
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#d4af37] font-black">
            {product.intensity || "Fragrância Exclusiva"}
          </span>
          <div className="flex flex-col gap-1 mt-1">
            <h4 className="text-xl font-serif font-bold text-white tracking-wide">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-2">
              {showOldPrice && (
                <span className="text-zinc-400 text-[15px] line-through font-serif">
                  {product.oldPrice}
                </span>
              )}
              <span className="text-lg font-serif gold-text font-bold whitespace-nowrap">
                {product.price}
              </span>
            </div>
            {showDiscount && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#d4af37] text-[13px] font-bold">
                  R$ {priceWithDiscount.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-[10px] text-zinc-400">
                  com {discountPercent}% OFF
                </span>
              </div>
            )}
            <div className="mt-1">
              <span
                className="text-[13px] font-bold"
                style={{ color: "#d4af37" }}
              >
                {installments}x de R${" "}
                {installmentValue.toFixed(2).replace(".", ",")}{" "}
                {hasInterest ? "com juros" : "sem juros"}
              </span>
            </div>
          </div>
        </div>

        <p className="text-zinc-400 text-[11px] md:text-xs font-light leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
          <span className="text-[9px] text-zinc-500 tracking-[0.2em] uppercase font-bold">
            {product.volume}
          </span>
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-2.5 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207l-.695 2.54 2.599-.682c.887.481 1.727.813 2.839.813 3.18 0 5.767-2.586 5.767-5.766 0-3.18-2.587-5.766-5.767-5.766zm3.376 8.21c-.131.37-.751.706-1.041.751-.284.045-.544.074-1.543-.326-1.01-.403-1.636-1.428-1.686-1.494-.05-.067-.403-.537-.403-1.027 0-.49.255-.731.346-.831.091-.099.199-.124.266-.124.066 0 .132.001.189.003.06.002.141-.022.221.171.08.194.275.671.299.721.025.05.041.107.008.173-.033.066-.074.143-.146.221-.073.078-.153.174-.219.233-.073.066-.149.138-.064.284.084.145.374.618.805 1.002.553.493 1.019.646 1.166.721.147.075.234.062.321-.038.087-.1.371-.433.471-.581.099-.149.199-.124.332-.074.132.05.84.396.985.469.144.073.24.108.273.165.033.058.033.336-.098.706z" />
            </svg>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
