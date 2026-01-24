import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.config";

/**
 * Script de Migração Rápida
 * Execute: npm run migrate
 */

const PRODUTOS_EXEMPLO = [
  {
    name: "Oud Elegance",
    description:
      "Uma fragrância sofisticada que combina notas de oud, âmbar e baunilha, proporcionando uma experiência sensorial única e marcante.",
    price: "R$ 350,00",
    volume: "100ml",
    gender: "Masculino",
    intensity: "Intensa",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
  },
  {
    name: "Rose Garden",
    description:
      "Delicada composição floral com rosas búlgaras e jasmim, ideal para mulheres que apreciam elegância e feminilidade.",
    price: "R$ 290,00",
    volume: "100ml",
    gender: "Feminino",
    intensity: "Moderada",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
  },
];

async function migrar() {
  console.log("🔄 Iniciando migração...\n");

  try {
    // Verificar localStorage
    const localStorage =
      typeof window !== "undefined" ? window.localStorage : null;

    if (!localStorage) {
      console.log("⚠️  Rodando em Node.js - usando produtos de exemplo\n");

      // Migrar produtos de exemplo
      for (const produto of PRODUTOS_EXEMPLO) {
        try {
          const docRef = await addDoc(collection(db, "products"), {
            ...produto,
            createdAt: new Date().toISOString(),
          });
          console.log(`✅ Migrado: ${produto.name} (ID: ${docRef.id})`);
        } catch (erro) {
          console.error(`❌ Erro em ${produto.name}:`, erro.message);
        }
      }
    } else {
      // Buscar do localStorage
      const LOCAL_STORAGE_KEY = "shalom_perfumes_db_v4";
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!savedData) {
        console.log("❌ Nenhum dado encontrado no localStorage\n");
        console.log(
          "💡 Use os produtos de exemplo? Execute novamente sem localStorage",
        );
        return;
      }

      const produtos = JSON.parse(savedData);
      console.log(`📦 Encontrados ${produtos.length} produtos\n`);

      // Migrar cada produto
      let sucesso = 0;
      let erros = 0;

      for (const produto of produtos) {
        try {
          const { id, ...dadosProduto } = produto;

          const docRef = await addDoc(collection(db, "products"), {
            ...dadosProduto,
            createdAt: new Date().toISOString(),
          });

          sucesso++;
          console.log(`✅ Migrado: ${produto.name} (ID: ${docRef.id})`);
        } catch (erro) {
          erros++;
          console.error(`❌ Erro em ${produto.name}:`, erro.message);
        }
      }

      console.log(`\n🎉 MIGRAÇÃO CONCLUÍDA!`);
      console.log(`✅ Sucesso: ${sucesso} produtos`);
      console.log(`❌ Erros: ${erros} produtos\n`);
    }

    console.log("💡 Acesse seu site para ver os produtos migrados!");
    process.exit(0);
  } catch (erro) {
    console.error("\n❌ Erro na migração:", erro);
    process.exit(1);
  }
}

// Executar
migrar();
