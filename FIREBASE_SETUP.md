# 🔥 Configuração do Firebase

## Passo 1: Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `shalom-perfumes` (ou o que preferir)
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar projeto"**

## Passo 2: Registrar App Web

1. No painel do projeto, clique no ícone **Web** `</>`
2. Nome do app: `Shalom Perfumes`
3. **NÃO** marque "Firebase Hosting"
4. Clique em **"Registrar app"**
5. **COPIE** as credenciais que aparecem

## Passo 3: Configurar Credenciais

Abra o arquivo `firebase.config.ts` e substitua os valores:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Cole aqui
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

## Passo 4: Ativar Firestore Database

1. No menu lateral, vá em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Escolha o local: `southamerica-east1` (São Paulo)
4. Modo: **"Iniciar em modo de teste"** (por enquanto)
5. Clique em **"Ativar"**

### ⚠️ Configurar Regras de Segurança

Clique na aba **"Regras"** e cole isso:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura pública dos produtos
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // Apenas via admin autenticado
    }
  }
}
```

Clique em **"Publicar"**

## Passo 5: Testar

1. Salve todas as alterações
2. Execute: `npm run dev`
3. Faça login no painel admin
4. Tente adicionar um perfume
5. Abra em outra janela anônima - o produto deve aparecer!

## 🎉 Pronto!

Agora seus produtos são salvos no Firebase e aparecem para todos os usuários em tempo real!

## 📊 Verificar Dados

- **Ver produtos**: Firebase Console → Firestore Database
- **Monitorar uso**: Firebase Console → Uso

> 💡 **Nota**: As imagens são salvas como base64 diretamente no Firestore para evitar custos com Storage.

## 🔒 Próximos Passos (Segurança)

Quando estiver pronto para produção:

1. Ativar autenticação do Firebase
2. Atualizar regras para apenas admin autenticado poder escrever
3. Configurar domínio autorizado nas configurações do projeto

## ❓ Problemas Comuns

**Erro: "Missing or insufficient permissions"**

- Verifique as regras do Firestore
- Certifique-se que `allow read: if true;` está configurado

**Produtos não carregam**

- Abra o Console do navegador (F12)
- Veja se há erros de conexão
- Verifique as credenciais no firebase.config.ts
