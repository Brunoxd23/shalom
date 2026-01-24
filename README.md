# 🌟 Shalom Perfumes - E-commerce de Fragrâncias Orientais

Sistema completo de e-commerce para perfumes com painel administrativo e integração Firebase.

## 🚀 Características

### 🎨 Frontend

- ✨ Design luxuoso e elegante
- 📱 Totalmente responsivo
- 🎭 Animações suaves
- 🔍 Sistema de filtros por gênero
- 💬 Integração WhatsApp
- 🎯 Toast notifications animados

### 👨‍💼 Painel Administrativo

- 🔒 Login protegido por PIN
- ➕ Adicionar novos perfumes
- ✏️ Editar produtos existentes
- 🗑️ Excluir com confirmação
- 📸 Upload de imagens (base64)
- ⚡ Atualizações em tempo real

### 🔥 Backend (Firebase)

- 📦 Firestore Database para produtos
- 🖼️ Imagens em base64 (sem custos de Storage)
- ☁️ Dados sincronizados na nuvem
- 🌍 Acessível de qualquer lugar
- 💰 100% gratuito no plano Spark

## 📦 Instalação

### 1. Clone e Instale

```bash
npm install
```

### 2. Configure o Firebase

Siga o guia completo em [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

**Resumo rápido:**

1. Crie projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative Firestore Database
3. Ative Storage
4. Copie as credenciais para `firebase.config.ts`

### 3. Execute o Projeto

```bash
npm run dev
```

## 🔑 Acesso Administrativo

- **PIN padrão**: `1234` (configurável em `constants.tsx`)
- Clique no ícone de cadeado no header
- Digite o PIN para acessar o painel

## 📁 Estrutura do Projeto

```
shalomPerfumes/
├── components/          # Componentes React
│   ├── Header.tsx      # Navegação com ícones
│   ├── ProductGrid.tsx # Grid de produtos + filtros
│   ├── AdminPanel.tsx  # Painel de administração
│   ├── Toast.tsx       # Notificações animadas
│   └── ...
├── services/           # Serviços Firebase
│   └── productService.ts
├── firebase.config.ts  # Configuração Firebase
├── App.tsx            # Componente principal
└── types.ts           # TypeScript types

```

## 🎯 Funcionalidades Principais

### Para Clientes

- 🛍️ Navegar catálogo de perfumes
- 🔍 Filtrar por gênero (Todos/Masculino/Feminino/Unissex)
- 📱 Contato direto via WhatsApp
- 🎨 Experiência visual luxuosa

### Para Administradores

- ➕ Adicionar produtos com foto
- ✏️ Editar informações
- 🗑️ Excluir com confirmação
- 📊 Ver produtos em tempo real
- 🖼️ Upload automático de imagens

## 🔒 Segurança

**Configurações Firestore:**

```javascript
// Leitura pública, escrita apenas autenticada
match /products/{productId} {
  allow read: if true;
  allow write: if false;
}
```

**Configurações Storage:**

```javascript
// Leitura pública de imagens
match /products/{allPaths=**} {
  allow read: if true;
  allow write: if false;
}
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
# Configure variáveis de ambiente no Vercel
```

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## 🆘 Problemas Comuns

**Produtos não carregam?**

- ✅ Verifique credenciais no `firebase.config.ts`
- ✅ Confirme regras do Firestore
- ✅ Abra console do navegador (F12) para ver erros

**Imagens não aparecem?**

- ✅ Verifique regras do Storage
- ✅ Confirme bucket correto
- ✅ Teste upload manual no console Firebase

**Erro de permissão?**

- ✅ Revise regras de segurança
- ✅ Certifique-se que `allow read: if true;`

## 📚 Documentação

- 📖 [Guia de Setup Firebase](FIREBASE_SETUP.md)
- 🔧 [Firebase Console](https://console.firebase.google.com)
- 📦 [Firebase Docs](https://firebase.google.com/docs)

## 🛠️ Tecnologias

- ⚛️ React + TypeScript
- 🔥 Firebase (Firestore + Storage)
- 🎨 Tailwind CSS
- ⚡ Vite
- 📱 Responsive Design

## 📝 Licença

MIT License - Sinta-se livre para usar em seus projetos!

---

Desenvolvido com ❤️ para Shalom Perfumes
