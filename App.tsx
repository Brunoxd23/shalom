import React, { useState, useCallback, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import AdminPanel from "./components/AdminPanel";
import LoginModal from "./components/LoginModal";
import Toast, { ToastType } from "./components/Toast";
import { Product } from "./types";
import { ADMIN_PIN_HASH } from "./constants";
import * as productService from "./services/productService";

interface ToastState {
  message: string;
  type: ToastType;
}

// 🔒 Função para criar hash SHA-256 da senha digitada
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("shalom_admin") === "true",
  );

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [genderFilter, setGenderFilter] = useState<
    "Todos" | "Masculino" | "Feminino" | "Unissex"
  >("Todos");

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
  };

  // Carregar produtos do Firebase ao iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      showToast("Erro ao carregar produtos. Verifique sua conexão.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginAttempt = async (password: string) => {
    // Cria hash da senha digitada e compara com o hash armazenado
    const inputHash = await hashPassword(password);

    if (inputHash === ADMIN_PIN_HASH) {
      setIsAdmin(true);
      sessionStorage.setItem("shalom_admin", "true");
      setShowLoginModal(false);
      showToast("Acesso autorizado. Bem-vindo ao painel.", "success");
    } else {
      showToast("PIN de acesso incorreto. Tente novamente.", "error");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("shalom_admin");
    showToast("Sessão encerrada com sucesso.", "info");
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowAdminModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAdminModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    const productToRemove = products.find((p) => p.id === id);

    // Mostra toast de confirmação
    const confirmed = confirm(
      `⚠️ ATENÇÃO\n\nDeseja realmente excluir o perfume "${productToRemove?.name}"?\n\nEsta ação não pode ser desfeita.`,
    );

    if (confirmed) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        showToast(
          `Perfume "${productToRemove?.name}" removido com sucesso`,
          "success",
        );
      } catch (error) {
        showToast("Erro ao excluir produto. Tente novamente.", "error");
      }
    } else {
      showToast("Exclusão cancelada", "info");
    }
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      const exists = products.find((p) => p.id === updatedProduct.id);

      if (exists) {
        // Atualizar produto existente
        await productService.updateProduct(updatedProduct.id, updatedProduct);
        setProducts(
          products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p,
          ),
        );
        showToast("Alterações salvas com sucesso.", "success");
      } else {
        // Adicionar novo produto
        const { id, ...productData } = updatedProduct;
        const newProduct = await productService.addProduct(productData);
        setProducts([...products, newProduct]);
        showToast("Novo perfume adicionado ao catálogo.", "success");
      }

      setShowAdminModal(false);
    } catch (error) {
      showToast("Erro ao salvar produto. Tente novamente.", "error");
    }
  };

  // Filtra produtos baseado no gênero selecionado
  const filteredProducts =
    genderFilter === "Todos"
      ? products
      : products.filter((p) => p.gender === genderFilter);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${typeof window !== "undefined" && window.localStorage.getItem("shalom_theme") === "light" ? "bg-white text-black" : "bg-[#050505] text-white"}`}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Header
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onLoginTrigger={() => setShowLoginModal(true)}
      />

      <main>
        <Hero />

        <div id="catalog" className="relative">
          {isAdmin && (
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
              <button
                onClick={handleAddProduct}
                className="gold-gradient text-black px-10 py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
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
                    strokeWidth={3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Adicionar Novo Perfume
              </button>
            </div>
          )}

          <ProductGrid
            products={filteredProducts}
            isAdmin={isAdmin}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            genderFilter={genderFilter}
            onFilterChange={setGenderFilter}
            loading={loading}
          />
        </div>

        <Features />
        <Testimonials />
      </main>

      {showLoginModal && (
        <LoginModal
          onLogin={handleLoginAttempt}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {showAdminModal && (
        <AdminPanel
          productToEdit={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      <Footer />
      {!isAdmin && <FloatingWhatsApp />}
    </div>
  );
};

export default App;
