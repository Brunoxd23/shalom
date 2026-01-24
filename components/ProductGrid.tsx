import React from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  genderFilter: "Todos" | "Masculino" | "Feminino" | "Unissex";
  onFilterChange: (
    filter: "Todos" | "Masculino" | "Feminino" | "Unissex",
  ) => void;
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isAdmin,
  onEdit,
  onDelete,
  genderFilter,
  onFilterChange,
  loading = false,
}) => {
  const filters: Array<"Todos" | "Masculino" | "Feminino" | "Unissex"> = [
    "Todos",
    "Masculino",
    "Feminino",
    "Unissex",
  ];

  return (
    <section
      id="catalog"
      className="py-12 md:py-24 px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="text-center mb-16 md:mb-20">
        <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#d4af37] mb-3 font-bold">
          Obras-Primas do Oriente
        </h3>
        <h2 className="text-3xl md:text-5xl font-serif font-bold">
          Nosso <span className="italic">Catálogo</span>
        </h2>
        <div className="w-16 h-[1px] gold-gradient mx-auto mt-6" />
      </div>

      {/* Filtros de Gênero */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] 
              transition-all duration-300 border
              ${
                genderFilter === filter
                  ? "gold-gradient text-black border-[#d4af37] shadow-lg scale-105"
                  : "bg-white/5 text-zinc-400 border-white/10 hover:border-[#d4af37]/50 hover:text-white"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Contador de Resultados */}
      {genderFilter !== "Todos" && (
        <div className="text-center mb-8">
          <p className="text-[9px] uppercase tracking-widest text-zinc-500">
            {products.length}{" "}
            {products.length === 1
              ? "perfume encontrado"
              : "perfumes encontrados"}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-zinc-500 uppercase tracking-widest text-[10px]">
            Carregando produtos...
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
            {products.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />

                {isAdmin && (
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-30">
                    <button
                      onClick={() => onEdit?.(product)}
                      className="bg-blue-600 text-white p-3 rounded-full shadow-2xl hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100"
                      title="Editar Perfume"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete?.(product.id)}
                      className="bg-red-600 text-white p-3 rounded-full shadow-2xl hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100"
                      title="Excluir Perfume"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {products.length === 0 && !loading && (
            <div className="text-center py-32 border border-dashed border-white/10 rounded-sm">
              <p className="text-zinc-600 uppercase tracking-widest text-[10px]">
                Aguardando novos tesouros orientais...
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductGrid;
