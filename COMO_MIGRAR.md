# 🚀 Como Migrar Dados para o Firebase

## ✅ Método Simples (Via Navegador)

### Passo 1: Inicie o servidor

```bash
npm run dev
```

### Passo 2: Abra o site no navegador

Acesse: http://localhost:5173

### Passo 3: Abra o Console do Navegador

Pressione **F12** ou:

- Windows/Linux: `Ctrl + Shift + J`
- Mac: `Cmd + Option + J`

### Passo 4: Cole e Execute este Código

```javascript
// 🔥 Script de Migração Rápida
async function migrarParaFirebase() {
  console.log("🔄 Iniciando migração para Firebase...\n");

  try {
    // 1. Buscar dados do localStorage
    const LOCAL_STORAGE_KEY = "shalom_perfumes_db_v4";
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedData) {
      console.log("⚠️  Nenhum dado no localStorage");
      console.log("💡 Adicionando produtos de exemplo...\n");

      // Produtos de exemplo
      const exemplos = [
        {
          name: "Oud Elegance",
          description:
            "Fragrância sofisticada com notas de oud, âmbar e baunilha.",
          price: "R$ 350,00",
          volume: "100ml",
          gender: "Masculino",
          intensity: "Intensa",
          image:
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23d4af37' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='black' text-anchor='middle' dominant-baseline='middle'%3EOud Elegance%3C/text%3E%3C/svg%3E",
        },
        {
          name: "Rose Garden",
          description:
            "Delicada composição floral com rosas búlgaras e jasmim.",
          price: "R$ 290,00",
          volume: "100ml",
          gender: "Feminino",
          intensity: "Moderada",
          image:
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23ff69b4' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='20' fill='white' text-anchor='middle' dominant-baseline='middle'%3ERose Garden%3C/text%3E%3C/svg%3E",
        },
      ];

      // Importar Firebase dinamicamente
      const { collection, addDoc } =
        await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
      const { db } = await import("./firebase.config.js");

      for (const produto of exemplos) {
        await addDoc(collection(db, "products"), {
          ...produto,
          createdAt: new Date().toISOString(),
        });
        console.log(`✅ ${produto.name}`);
      }

      console.log("\n🎉 Produtos de exemplo adicionados!");
      console.log("💡 Recarregue a página para ver os produtos!");
      return;
    }

    // 2. Parse dos dados
    const produtos = JSON.parse(savedData);
    console.log(`📦 ${produtos.length} produtos encontrados no localStorage\n`);

    // 3. Importar Firebase dinamicamente
    const { collection, addDoc } =
      await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
    const { db } = await import("./firebase.config.js");

    // 4. Migrar cada produto
    let sucesso = 0;
    let erros = 0;

    for (const produto of produtos) {
      try {
        const { id, ...dados } = produto;

        await addDoc(collection(db, "products"), {
          ...dados,
          createdAt: new Date().toISOString(),
        });

        sucesso++;
        console.log(`✅ ${produto.name}`);
      } catch (erro) {
        erros++;
        console.error(`❌ ${produto.name}:`, erro.message);
      }
    }

    // 5. Resultado
    console.log(`\n🎉 MIGRAÇÃO CONCLUÍDA!`);
    console.log(`✅ Sucesso: ${sucesso} produtos`);
    if (erros > 0) console.log(`❌ Erros: ${erros} produtos`);
    console.log(
      "\n💡 Recarregue a página (F5) para ver os produtos do Firebase!",
    );
  } catch (erro) {
    console.error("❌ Erro na migração:", erro);
  }
}

// Executar a migração
migrarParaFirebase();
```

---

## ✅ OPÇÃO 1: Via Terminal (Mais Rápido)

### 1. Execute o comando:

```bash
npm run migrate
```

### 2. Pronto!

- ✅ Produtos migrados para o Firebase
- ✅ Imagens incluídas
- ✅ Acesse seu site para conferir

---

## ✅ OPÇÃO 2: Via Console do Navegador

### 1. Inicie o servidor:

```bash
npm run dev
```

### 2. Abra o site no navegador

### 3. Abra o Console (F12)

### 4. Cole este código:

```javascript
// Função de migração
async function migrarDados() {
  console.log("🔄 Iniciando migração...");

  // Buscar dados do localStorage
  const LOCAL_STORAGE_KEY = "shalom_perfumes_db_v4";
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!savedData) {
    console.log("❌ Nenhum dado para migrar");
    return;
  }

  const produtos = JSON.parse(savedData);
  console.log(`📦 ${produtos.length} produtos encontrados`);

  // Importar Firebase
  const { collection, addDoc } = await import("firebase/firestore");
  const { db } = await import("./firebase.config.js");

  // Migrar cada produto
  let sucesso = 0;
  for (const produto of produtos) {
    try {
      const { id, ...dados } = produto;
      await addDoc(collection(db, "products"), {
        ...dados,
        createdAt: new Date().toISOString(),
      });
      sucesso++;
      console.log(`✅ ${produto.name}`);
    } catch (erro) {
      console.error(`❌ ${produto.name}:`, erro);
    }
  }

  console.log(`\n🎉 ${sucesso}/${produtos.length} produtos migrados!`);
  console.log("💡 Recarregue a página!");
}

// Executar
migrarDados();
```

### 5. Aperte Enter

### 6. Aguarde a migração

### 7. Recarregue a página (F5)

---

## 🔍 Verificar se Funcionou

1. **No Firebase Console:**
   - Acesse: https://console.firebase.google.com
   - Vá em **Firestore Database**
   - Veja a coleção `products`
   - ✅ Seus produtos devem estar lá!

2. **No Seu Site:**
   - Recarregue a página
   - ✅ Produtos devem aparecer
   - Abra em navegação anônima
   - ✅ Produtos aparecem para todos!

---

## 📊 Produtos de Exemplo

Se você **NÃO** tem produtos no localStorage, o script adiciona produtos de exemplo automaticamente!

---

## ❓ Problemas?

**"Nenhum dado encontrado"**

- Verifique se você tem produtos salvos
- Use a Opção 1 (Terminal) para adicionar produtos de exemplo

**"Erro ao adicionar"**

- Verifique as credenciais no `firebase.config.ts`
- Confirme as regras do Firestore

**"Permission denied"**

- Atualize as regras do Firestore:

```javascript
match /products/{productId} {
  allow read: if true;
  allow write: if false;
}
```

---

## 🎯 Depois da Migração

✅ Seus produtos estão no Firebase
✅ Aparecem para todos os visitantes
✅ Pode limpar o localStorage (opcional):

```javascript
localStorage.removeItem("shalom_perfumes_db_v4");
```

---

## 💡 Dica

Após migrar, você pode **continuar usando o painel admin** normalmente. Todos os novos produtos serão salvos direto no Firebase!

---

🎉 **Pronto!** Seus dados estão na nuvem!
