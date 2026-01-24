import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import { db } from "../firebase.config";
import { Product } from "../types";

const storage = getStorage();

const COLLECTION_NAME = "products";

// Buscar todos os produtos
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("name"));
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      } as Product);
    });

    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

// Upload de imagem para Firebase Storage
export const uploadProductImage = async (
  file: File,
  productId: string,
): Promise<string> => {
  try {
    const timestamp = Date.now();
    const fileName = `products/${productId}_${timestamp}.${file.name.split(".").pop()}`;
    const storageRef = ref(storage, fileName);

    // Upload do arquivo
    await uploadBytes(storageRef, file);

    // Obter URL pública da imagem
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw error;
  }
};

// Upload de imagem base64 (para manter compatibilidade)
export const uploadBase64Image = async (
  base64: string,
  productId: string,
): Promise<string> => {
  try {
    // Converte base64 para Blob
    const response = await fetch(base64);
    const blob = await response.blob();

    const timestamp = Date.now();
    const fileName = `products/${productId}_${timestamp}.jpg`;
    const storageRef = ref(storage, fileName);

    // Upload do arquivo
    await uploadBytes(storageRef, blob);

    // Obter URL pública da imagem
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw error;
  }
};

// Adicionar novo produto
export const addProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...product,
      createdAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...product,
    };
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
};

// Atualizar produto existente
export const updateProduct = async (
  id: string,
  product: Partial<Product>,
): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};

// Deletar produto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};
