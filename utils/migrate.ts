import { INITIAL_PRODUCTS } from "../constants";
import * as productService from "../services/productService";

/**
 * Script de migração opcional
 * Use este script para migrar produtos do localStorage para Firebase
 * Execute no console do navegador quando estiver logado como admin
 */

export const migrateLocalStorageToFirebase = async () => {
  try {
    console.log("🔄 Iniciando migração de produtos...");

    // Buscar produtos do localStorage
    const LOCAL_STORAGE_KEY = "shalom_perfumes_db_v4";
    const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const products = savedProducts
      ? JSON.parse(savedProducts)
      : INITIAL_PRODUCTS;

    console.log(`📦 Encontrados ${products.length} produtos para migrar`);

    // Migrar cada produto
    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
      try {
        const { id, ...productData } = product;
        await productService.addProduct(productData);
        successCount++;
        console.log(`✅ Produto migrado: ${product.name}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Erro ao migrar ${product.name}:`, error);
      }
    }

    console.log(`\n🎉 Migração concluída!`);
    console.log(`✅ Sucesso: ${successCount} produtos`);
    console.log(`❌ Erros: ${errorCount} produtos`);

    if (successCount > 0) {
      console.log(
        "\n💡 Dica: Recarregue a página para ver os produtos do Firebase",
      );
    }

    return { successCount, errorCount, total: products.length };
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    throw error;
  }
};

// Exportar para usar no console do navegador
if (typeof window !== "undefined") {
  (window as any).migrateToFirebase = migrateLocalStorageToFirebase;
  console.log(
    "💡 Para migrar dados do localStorage para Firebase, execute: migrateToFirebase()",
  );
}
