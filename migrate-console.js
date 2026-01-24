// Script de Migração - Execute no Console do Navegador
// Aperte F12 → Console → Cole este código → Enter

async function migrarParaFirebase() {
  console.log("🔄 Iniciando migração...");

  try {
    // Importar serviços necessários
    const { addProduct } = await import("./services/productService");

    // Buscar dados do localStorage
    const LOCAL_STORAGE_KEY = "shalom_perfumes_db_v4";
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedData) {
      console.log("❌ Nenhum dado encontrado no localStorage");
      return;
    }

    const products = JSON.parse(savedData);
    console.log(`📦 Encontrados ${products.length} produtos para migrar`);

    // Migrar cada produto
    let sucesso = 0;
    let erros = 0;

    for (const produto of products) {
      try {
        // Remove o ID temporário do localStorage
        const { id, ...dadosProduto } = produto;

        // Adiciona no Firebase
        await addProduct(dadosProduto);
        sucesso++;
        console.log(`✅ Migrado: ${produto.name}`);
      } catch (erro) {
        erros++;
        console.error(`❌ Erro em ${produto.name}:`, erro);
      }
    }

    console.log("\n🎉 MIGRAÇÃO CONCLUÍDA!");
    console.log(`✅ Sucesso: ${sucesso} produtos`);
    console.log(`❌ Erros: ${erros} produtos`);
    console.log("\n💡 Recarregue a página para ver os produtos do Firebase!");

    return { sucesso, erros, total: products.length };
  } catch (erro) {
    console.error("❌ Erro na migração:", erro);
    throw erro;
  }
}

// Exportar para usar
window.migrarParaFirebase = migrarParaFirebase;
console.log("✅ Script carregado! Digite: migrarParaFirebase()");
